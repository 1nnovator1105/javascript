"use client";

import { useState, useEffect } from "react";

interface StorageItem {
  key: string;
  value: string;
  type: "local" | "session" | "cookie";
  expiresAt?: Date;
}

interface StorageMethod {
  name: string;
  icon: React.ReactNode;
  capacity: string;
  persistence: string;
  scope: string;
  security: string;
  pros: string[];
  cons: string[];
  color: string;
}

export const WebStorageLanding = () => {
  const [activeTab, setActiveTab] = useState<"concept" | "visual" | "practice">(
    "concept"
  );
  const [selectedStorage, setSelectedStorage] = useState<
    "localStorage" | "sessionStorage" | "cookie" | "indexedDB"
  >("localStorage");
  const [storageItems, setStorageItems] = useState<StorageItem[]>([]);
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cookieExpiry, setCookieExpiry] = useState(7);

  const storageMethods: Record<string, StorageMethod> = {
    localStorage: {
      name: "LocalStorage",
      icon: "🗄️",
      capacity: "5-10MB",
      persistence: "영구 저장",
      scope: "동일 출처",
      security: "XSS 취약",
      pros: ["간단한 API", "영구 저장", "동기적 접근"],
      cons: ["XSS 취약", "문자열만 저장", "용량 제한"],
      color: "blue",
    },
    sessionStorage: {
      name: "SessionStorage",
      icon: "⏰",
      capacity: "5-10MB",
      persistence: "탭/창 닫을 때까지",
      scope: "탭/창 단위",
      security: "XSS 취약",
      pros: ["탭별 독립적", "임시 저장", "간단한 API"],
      cons: ["XSS 취약", "짧은 수명", "문자열만 저장"],
      color: "green",
    },
    cookie: {
      name: "Cookie",
      icon: "📄",
      capacity: "4KB",
      persistence: "설정 가능",
      scope: "도메인/경로",
      security: "HttpOnly 옵션",
      pros: ["서버 전송", "보안 옵션", "만료 설정"],
      cons: ["용량 작음", "매 요청 전송", "복잡한 API"],
      color: "yellow",
    },
    indexedDB: {
      name: "IndexedDB",
      icon: "📦",
      capacity: "무제한*",
      persistence: "영구 저장",
      scope: "동일 출처",
      security: "XSS 취약",
      pros: ["대용량", "비동기", "구조화된 데이터"],
      cons: ["복잡한 API", "학습곡선", "브라우저 차이"],
      color: "purple",
    },
  };

  // 실제 브라우저 스토리지 읽기
  useEffect(() => {
    loadStorageItems();
  }, []);

  const loadStorageItems = () => {
    const items: StorageItem[] = [];

    // LocalStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("ws-demo-")) {
          items.push({
            key: key.replace("ws-demo-", ""),
            value: localStorage.getItem(key) || "",
            type: "local",
          });
        }
      }
    } catch (e) {
      console.error("LocalStorage 읽기 실패:", e);
    }

    // SessionStorage
    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("ws-demo-")) {
          items.push({
            key: key.replace("ws-demo-", ""),
            value: sessionStorage.getItem(key) || "",
            type: "session",
          });
        }
      }
    } catch (e) {
      console.error("SessionStorage 읽기 실패:", e);
    }

    // Cookies
    try {
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const [key, value] = cookie.trim().split("=");
        if (key && key.startsWith("ws-demo-")) {
          items.push({
            key: key.replace("ws-demo-", ""),
            value: decodeURIComponent(value || ""),
            type: "cookie",
          });
        }
      });
    } catch (e) {
      console.error("Cookie 읽기 실패:", e);
    }

    setStorageItems(items);
  };

  const saveToStorage = () => {
    if (!inputKey || !inputValue) return;

    const prefixedKey = `ws-demo-${inputKey}`;

    try {
      switch (selectedStorage) {
        case "localStorage":
          localStorage.setItem(prefixedKey, inputValue);
          break;
        case "sessionStorage":
          sessionStorage.setItem(prefixedKey, inputValue);
          break;
        case "cookie":
          const expires = new Date();
          expires.setDate(expires.getDate() + cookieExpiry);
          document.cookie = `${prefixedKey}=${encodeURIComponent(
            inputValue
          )}; expires=${expires.toUTCString()}; path=/`;
          break;
        case "indexedDB":
          // IndexedDB는 더 복잡하므로 시뮬레이션만
          alert(
            "IndexedDB는 비동기 API를 사용합니다. 실제 구현에서는 더 복잡한 코드가 필요합니다."
          );
          return;
      }

      setInputKey("");
      setInputValue("");
      loadStorageItems();
    } catch (e) {
      console.error("저장 실패:", e);
      alert("저장에 실패했습니다: " + (e as Error).message);
    }
  };

  const deleteItem = (item: StorageItem) => {
    const prefixedKey = `ws-demo-${item.key}`;

    try {
      switch (item.type) {
        case "local":
          localStorage.removeItem(prefixedKey);
          break;
        case "session":
          sessionStorage.removeItem(prefixedKey);
          break;
        case "cookie":
          document.cookie = `${prefixedKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          break;
      }
      loadStorageItems();
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  };

  const clearAllStorage = () => {
    if (!confirm("모든 데모 데이터를 삭제하시겠습니까?")) return;

    // LocalStorage
    const localKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("ws-demo-")) {
        localKeys.push(key);
      }
    }
    localKeys.forEach((key) => localStorage.removeItem(key));

    // SessionStorage
    const sessionKeys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith("ws-demo-")) {
        sessionKeys.push(key);
      }
    }
    sessionKeys.forEach((key) => sessionStorage.removeItem(key));

    // Cookies
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const [key] = cookie.trim().split("=");
      if (key && key.startsWith("ws-demo-")) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });

    loadStorageItems();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTab("concept")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "concept"
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          💡 개념 이해
        </button>
        <button
          onClick={() => setActiveTab("visual")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "visual"
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🎨 시각적 학습
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "practice"
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🛠️ 실습하기
        </button>
      </div>

      {/* 개념 이해 탭 */}
      {activeTab === "concept" && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">웹 스토리지란?</h3>
            <p className="text-gray-700 mb-4">
              웹 애플리케이션에서 클라이언트 측에 데이터를 저장하는
              방법들입니다. 각각의 방식은 용량, 수명, 보안, 사용 편의성 면에서
              차이가 있습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-blue-600 mb-2">
                  동기식 스토리지
                </h4>
                <p className="text-sm text-gray-600">
                  LocalStorage, SessionStorage, Cookie는 동기적으로 작동하여
                  즉시 읽고 쓸 수 있지만, 대용량 데이터 처리 시 성능 문제가
                  발생할 수 있습니다.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-purple-600 mb-2">
                  비동기식 스토리지
                </h4>
                <p className="text-sm text-gray-600">
                  IndexedDB는 비동기적으로 작동하여 대용량 데이터를 효율적으로
                  처리할 수 있지만, API가 복잡하고 학습 곡선이 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 스토리지 비교 테이블 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">스토리지 방식 비교</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">특성</th>
                      <th className="text-center py-3 px-4">LocalStorage</th>
                      <th className="text-center py-3 px-4">SessionStorage</th>
                      <th className="text-center py-3 px-4">Cookie</th>
                      <th className="text-center py-3 px-4">IndexedDB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">용량</td>
                      <td className="text-center py-3 px-4">5-10MB</td>
                      <td className="text-center py-3 px-4">5-10MB</td>
                      <td className="text-center py-3 px-4">4KB</td>
                      <td className="text-center py-3 px-4">무제한*</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">수명</td>
                      <td className="text-center py-3 px-4">영구</td>
                      <td className="text-center py-3 px-4">탭/창</td>
                      <td className="text-center py-3 px-4">설정 가능</td>
                      <td className="text-center py-3 px-4">영구</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">서버 전송</td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">❌</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">API 복잡도</td>
                      <td className="text-center py-3 px-4">⭐</td>
                      <td className="text-center py-3 px-4">⭐</td>
                      <td className="text-center py-3 px-4">⭐⭐</td>
                      <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                * IndexedDB 용량은 디스크 공간에 따라 제한됨
              </p>
            </div>
          </div>

          {/* 사용 시나리오 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                LocalStorage 사용 시나리오
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>사용자 설정 (테마, 언어 등)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>장바구니 데이터 (비로그인)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>폼 데이터 임시 저장</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                SessionStorage 사용 시나리오
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>다단계 폼 진행 상태</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>임시 인증 토큰</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>탭별 독립적인 상태</span>
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">
                Cookie 사용 시나리오
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>인증 토큰 (HttpOnly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>서버 세션 ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>추적/분석 데이터</span>
                </li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-800">
                IndexedDB 사용 시나리오
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>오프라인 앱 데이터</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>대용량 미디어 캐시</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5">
                    ✅
                  </span>
                  <span>복잡한 구조화 데이터</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 시각적 학습 탭 */}
      {activeTab === "visual" && (
        <div className="space-y-8">
          {/* 스토리지 메서드 카드 */}
          <div>
            <h3 className="text-xl font-bold mb-4">스토리지 방식 시각화</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(storageMethods).map(([key, method]) => (
                <div
                  key={key}
                  className={`bg-${
                    method.color
                  }-50 rounded-xl p-6 border-2 border-${
                    method.color
                  }-200 hover:border-${
                    method.color
                  }-400 transition-all cursor-pointer ${
                    selectedStorage === key
                      ? `ring-4 ring-${method.color}-300`
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedStorage(
                      key as
                        | "localStorage"
                        | "sessionStorage"
                        | "cookie"
                        | "indexedDB"
                    )
                  }
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-${method.color}-100 rounded-lg text-${method.color}-600`}
                    >
                      {method.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{method.name}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">용량</p>
                      <p className="font-medium">{method.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">지속성</p>
                      <p className="font-medium">{method.persistence}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">범위</p>
                      <p className="font-medium">{method.scope}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">보안</p>
                      <p className="font-medium">{method.security}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">
                        장점
                      </p>
                      <ul className="text-xs space-y-1">
                        {method.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="w-3 h-3 text-green-500">✅</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-700 mb-1">
                        단점
                      </p>
                      <ul className="text-xs space-y-1">
                        {method.cons.map((con, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="w-3 h-3 text-red-500">❌</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 데이터 플로우 시각화 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">데이터 흐름 비교</h3>
            <div className="space-y-6">
              {/* LocalStorage/SessionStorage 플로우 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-blue-800">
                  LocalStorage/SessionStorage
                </h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    JavaScript
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-blue-100 rounded-lg px-4 py-2 shadow-sm">
                    Web Storage API
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-blue-200 rounded-lg px-4 py-2 shadow-sm">
                    브라우저 저장소
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  클라이언트 전용, 서버로 전송되지 않음
                </p>
              </div>

              {/* Cookie 플로우 */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-yellow-800">Cookie</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    JavaScript/Server
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-yellow-100 rounded-lg px-4 py-2 shadow-sm">
                    Set-Cookie Header
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-yellow-200 rounded-lg px-4 py-2 shadow-sm">
                    브라우저 쿠키 저장소
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-yellow-300 rounded-lg px-4 py-2 shadow-sm">
                    매 요청시 서버로 전송
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  클라이언트-서버 양방향 통신, 자동 전송
                </p>
              </div>

              {/* IndexedDB 플로우 */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-purple-800">
                  IndexedDB
                </h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                    JavaScript
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-purple-100 rounded-lg px-4 py-2 shadow-sm">
                    IndexedDB API
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-purple-200 rounded-lg px-4 py-2 shadow-sm">
                    트랜잭션
                  </div>
                  <span className="w-5 h-5 text-gray-400">→</span>
                  <div className="bg-purple-300 rounded-lg px-4 py-2 shadow-sm">
                    객체 저장소
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  비동기 처리, 대용량 구조화 데이터
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 실습하기 탭 */}
      {activeTab === "practice" && (
        <div className="space-y-8">
          {/* 스토리지 테스터 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">스토리지 테스터</h3>
              <button
                onClick={clearAllStorage}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                <span>🗑️</span>
                모두 삭제
              </button>
            </div>

            {/* 저장 폼 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold mb-3">데이터 저장하기</h4>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    저장 방식
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(storageMethods).map(([key, method]) => (
                      <button
                        key={key}
                        onClick={() =>
                          setSelectedStorage(
                            key as
                              | "localStorage"
                              | "sessionStorage"
                              | "cookie"
                              | "indexedDB"
                          )
                        }
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedStorage === key
                            ? `bg-${method.color}-500 text-white`
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {method.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      키(Key)
                    </label>
                    <input
                      type="text"
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      placeholder="예: userName"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      값(Value)
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="예: John Doe"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {selectedStorage === "cookie" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      만료 기간 (일)
                    </label>
                    <input
                      type="number"
                      value={cookieExpiry}
                      onChange={(e) => setCookieExpiry(Number(e.target.value))}
                      min="0"
                      max="365"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}

                <button
                  onClick={saveToStorage}
                  disabled={!inputKey || !inputValue}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  저장하기
                </button>
              </div>
            </div>

            {/* 저장된 데이터 목록 */}
            <div>
              <h4 className="font-semibold mb-3">저장된 데이터</h4>
              {storageItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  저장된 데이터가 없습니다
                </p>
              ) : (
                <div className="space-y-2">
                  {storageItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            item.type === "local"
                              ? "bg-blue-100 text-blue-700"
                              : item.type === "session"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.type === "local"
                            ? "Local"
                            : item.type === "session"
                            ? "Session"
                            : "Cookie"}
                        </span>
                        <div>
                          <p className="font-medium">{item.key}</p>
                          <p className="text-sm text-gray-600">{item.value}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteItem(item)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 코드 예제 */}
          <div className="bg-gray-900 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">코드 예제</h3>
            <div className="space-y-6">
              {/* LocalStorage 예제 */}
              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-400">
                  LocalStorage
                </h4>
                <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`// 저장
localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));

// 읽기
const user = JSON.parse(localStorage.getItem('user') || '{}');

// 삭제
localStorage.removeItem('user');

// 전체 삭제
localStorage.clear();`}</code>
                </pre>
              </div>

              {/* Cookie 예제 */}
              <div>
                <h4 className="text-lg font-semibold mb-2 text-yellow-400">
                  Cookie
                </h4>
                <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`// 저장 (7일 만료)
const expires = new Date();
expires.setDate(expires.getDate() + 7);
document.cookie = \`token=abc123; expires=\${expires.toUTCString()}; path=/\`;

// HttpOnly 쿠키 (서버에서만 설정 가능)
res.setHeader('Set-Cookie', 
  'session=xyz789; HttpOnly; Secure; SameSite=Strict'
);

// 읽기
const getCookie = (name) => {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};`}</code>
                </pre>
              </div>

              {/* IndexedDB 예제 */}
              <div>
                <h4 className="text-lg font-semibold mb-2 text-purple-400">
                  IndexedDB
                </h4>
                <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`// 데이터베이스 열기
const request = indexedDB.open('MyDB', 1);

request.onsuccess = (event) => {
  const db = event.target.result;
  
  // 트랜잭션 시작
  const transaction = db.transaction(['users'], 'readwrite');
  const store = transaction.objectStore('users');
  
  // 데이터 저장
  store.add({ id: 1, name: 'John', email: 'john@example.com' });
};

// 스키마 정의 (업그레이드 시)
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id' });
  objectStore.createIndex('email', 'email', { unique: true });
};`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* 보안 고려사항 */}
          <div className="bg-red-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-red-800">
              🔒 보안 고려사항
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  XSS 취약점
                </h4>
                <p className="text-sm text-gray-700">
                  LocalStorage와 SessionStorage는 JavaScript로 접근 가능하므로
                  XSS 공격에 취약합니다. 민감한 정보는 저장하지 마세요.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🛡️</span>
                  HttpOnly Cookie
                </h4>
                <p className="text-sm text-gray-700">
                  인증 토큰 등 민감한 정보는 HttpOnly 쿠키로 저장하여 JavaScript
                  접근을 차단하세요.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🔑</span>
                  데이터 암호화
                </h4>
                <p className="text-sm text-gray-700">
                  클라이언트 저장소에 민감한 데이터를 저장해야 한다면 반드시
                  암호화하여 저장하세요.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🌐</span>
                  동일 출처 정책
                </h4>
                <p className="text-sm text-gray-700">
                  스토리지는 동일 출처 정책에 따라 격리되지만, 하위 도메인 간
                  쿠키 공유 설정에 주의하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
