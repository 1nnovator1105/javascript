"use client";

import React, { useState, useEffect, useRef } from "react";
import { getColorClass } from "@/utils/colors";

const AuthMethodsLanding = () => {
  const [activeTab, setActiveTab] = useState<
    "concept" | "comparison" | "implementation"
  >("concept");
  const [selectedMethod, setSelectedMethod] = useState<
    "cookie" | "session" | "jwt"
  >("cookie");
  const [flowStepIndex, setFlowStepIndex] = useState(-1); // -1: idle, 0-3: steps, 4: finished
  const [jwtDecoded, setJwtDecoded] = useState(false);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const flowSteps = {
    cookie: [
      { id: 1, text: "1. 로그인 요청 (ID/PW)", location: "arrow-to-server" },
      { id: 2, text: "2. 서버: 사용자 확인 후 쿠키 생성", location: "server" },
      {
        id: 3,
        text: "3. 응답: Set-Cookie 헤더 전송",
        location: "arrow-to-client",
      },
      {
        id: 4,
        text: "4. 클라이언트: 브라우저에 쿠키 자동 저장",
        location: "client",
      },
    ],
    session: [
      { id: 1, text: "1. 로그인 요청 (ID/PW)", location: "arrow-to-server" },
      { id: 2, text: "2. 서버: 세션 생성 및 세션 ID 발급", location: "server" },
      {
        id: 3,
        text: "3. 응답: Set-Cookie (세션 ID)",
        location: "arrow-to-client",
      },
      { id: 4, text: "4. 클라이언트: 세션 ID 쿠키 저장", location: "client" },
    ],
    jwt: [
      { id: 1, text: "1. 로그인 요청 (ID/PW)", location: "arrow-to-server" },
      { id: 2, text: "2. 서버: JWT 생성 및 서명", location: "server" },
      {
        id: 3,
        text: "3. 응답: JSON에 JWT 포함하여 전송",
        location: "arrow-to-client",
      },
      {
        id: 4,
        text: "4. 클라이언트: JWT를 LocalStorage/메모리에 저장",
        location: "client",
      },
    ],
  };

  const clearTimeouts = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
  };

  useEffect(() => {
    setFlowStepIndex(-1);
    clearTimeouts();
  }, [selectedMethod]);

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  // 샘플 JWT
  const sampleJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  // 로그인 플로우 시뮬레이션
  const simulateLogin = () => {
    const steps = flowSteps[selectedMethod];
    if (flowStepIndex > -1 && flowStepIndex < steps.length) return;

    clearTimeouts();
    setFlowStepIndex(0);
    const stepTime = 1500;
    for (let i = 1; i <= steps.length; i++) {
      const id = setTimeout(() => setFlowStepIndex(i), i * stepTime);
      timeoutIdsRef.current.push(id);
    }
  };

  const currentFlow = flowSteps[selectedMethod];
  const clientStep = currentFlow.find((s) => s.location === "client");
  const clientStepIndex = currentFlow.findIndex((s) => s.location === "client");
  const serverStep = currentFlow.find((s) => s.location === "server");
  const serverStepIndex = currentFlow.findIndex((s) => s.location === "server");
  const arrowToServerStep = currentFlow.find(
    (s) => s.location === "arrow-to-server"
  );
  const arrowToServerStepIndex = currentFlow.findIndex(
    (s) => s.location === "arrow-to-server"
  );
  const arrowToClientStep = currentFlow.find(
    (s) => s.location === "arrow-to-client"
  );
  const arrowToClientStepIndex = currentFlow.findIndex(
    (s) => s.location === "arrow-to-client"
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("concept")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "concept"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          📚 개념 이해
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "comparison"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🔄 방식 비교
        </button>
        <button
          onClick={() => setActiveTab("implementation")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "implementation"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          💻 구현 예제
        </button>
      </div>

      {/* 개념 설명 탭 */}
      {activeTab === "concept" && (
        <div className="space-y-6">
          {/* 세 가지 인증 방식 개요 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cookie */}
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🍪</div>
                <h2 className="text-xl font-bold text-orange-800">Cookie</h2>
              </div>
              <p className="text-gray-700 mb-4">
                브라우저가 자동으로 관리하는 작은 데이터 조각으로, HTTP 요청 시
                자동으로 전송됩니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>브라우저가 자동 관리</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>HttpOnly로 XSS 방어</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>CSRF 공격 취약</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>4KB 크기 제한</span>
                </div>
              </div>
            </div>

            {/* Session */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">💾</div>
                <h2 className="text-xl font-bold text-blue-800">Session</h2>
              </div>
              <p className="text-gray-700 mb-4">
                서버에 저장되는 인증 정보로, 클라이언트는 세션 ID만 쿠키로
                보유합니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>서버에서 완전 제어</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>민감한 정보 서버 보관</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>서버 메모리 사용</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>확장성 문제</span>
                </div>
              </div>
            </div>

            {/* JWT */}
            <div className={`${getColorClass('purple', 50, 'bg')} rounded-lg p-6 border ${getColorClass('purple', 200, 'border')}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🎫</div>
                <h2 className={`text-xl font-bold ${getColorClass('purple', 800, 'text')}`}>JWT</h2>
              </div>
              <p className="text-gray-700 mb-4">
                자체 포함적(self-contained) 토큰으로, 서명된 JSON 형태의 인증
                정보입니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Stateless (서버 부담 없음)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>확장성 우수</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>크기가 큼</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>토큰 폐기 어려움</span>
                </div>
              </div>
            </div>
          </div>

          {/* 인증 플로우 시각화 */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🔄 인증 플로우 비교
            </h2>

            {/* 방식 선택 */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setSelectedMethod("cookie")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedMethod === "cookie"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🍪 Cookie
              </button>
              <button
                onClick={() => setSelectedMethod("session")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedMethod === "session"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                💾 Session
              </button>
              <button
                onClick={() => setSelectedMethod("jwt")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedMethod === "jwt"
                    ? `${getColorClass('purple', 500, 'bg')} text-white`
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🎫 JWT
              </button>
            </div>

            {/* 플로우 다이어그램 */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-start">
                {/* 클라이언트 */}
                <div className="text-center w-40">
                  <div
                    className={`w-32 h-32 mx-auto ${getColorClass('indigo', 500, 'bg')} rounded-lg flex items-center justify-center text-white text-5xl mb-2 transition-all ${
                      clientStepIndex <= flowStepIndex
                        ? `ring-4 ${getColorClass('indigo', 300, 'ring')}`
                        : ""
                    } ${
                      clientStepIndex === flowStepIndex ? "animate-pulse" : ""
                    }`}
                  >
                    💻
                  </div>
                  <h3 className="font-semibold">클라이언트</h3>
                  <div className="h-20 mt-2 flex items-center justify-center">
                    {clientStepIndex <= flowStepIndex ? (
                      <div className={`p-2 rounded shadow-lg ${getColorClass('indigo', 100, 'bg')} text-sm w-full`}>
                        {clientStep?.text}
                      </div>
                    ) : (
                      <div className="text-sm bg-gray-100 p-2 rounded w-full">
                        {selectedMethod === "cookie" && "쿠키 자동 전송"}
                        {selectedMethod === "session" && "Session ID 쿠키"}
                        {selectedMethod === "jwt" && "JWT 토큰 저장"}
                      </div>
                    )}
                  </div>
                </div>

                {/* 화살표 */}
                <div className="flex-1 px-4 pt-16">
                  <div className="relative h-16">
                    {/* 화살표 to Server */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300"></div>
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-300"></div>

                    {arrowToServerStepIndex <= flowStepIndex && (
                      <div
                        className={`absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap ${
                          selectedMethod === "cookie"
                            ? "bg-orange-100"
                            : selectedMethod === "session"
                            ? "bg-blue-100"
                            : getColorClass('purple', 100, 'bg')
                        } ${
                          arrowToServerStepIndex === flowStepIndex
                            ? "animate-pulse"
                            : ""
                        }`}
                      >
                        {arrowToServerStep?.text}
                      </div>
                    )}

                    {/* 화살표 to Client */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-300"></div>

                    {arrowToClientStepIndex <= flowStepIndex && (
                      <div
                        className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap ${
                          selectedMethod === "cookie"
                            ? "bg-orange-100"
                            : selectedMethod === "session"
                            ? "bg-blue-100"
                            : getColorClass('purple', 100, 'bg')
                        } ${
                          arrowToClientStepIndex === flowStepIndex
                            ? "animate-pulse"
                            : ""
                        }`}
                      >
                        {arrowToClientStep?.text}
                      </div>
                    )}
                  </div>
                </div>

                {/* 서버 */}
                <div className="text-center w-40">
                  <div
                    className={`w-32 h-32 mx-auto bg-green-500 rounded-lg flex items-center justify-center text-white text-5xl mb-2 transition-all ${
                      serverStepIndex <= flowStepIndex
                        ? "ring-4 ring-green-300"
                        : ""
                    } ${
                      serverStepIndex === flowStepIndex ? "animate-pulse" : ""
                    }`}
                  >
                    🖥️
                  </div>
                  <h3 className="font-semibold">서버</h3>
                  <div className="h-20 mt-2 flex items-center justify-center">
                    {serverStepIndex <= flowStepIndex ? (
                      <div className="p-2 rounded shadow-lg bg-green-100 text-sm w-full">
                        {serverStep?.text}
                      </div>
                    ) : (
                      <div className="text-sm bg-gray-100 p-2 rounded w-full">
                        {selectedMethod === "cookie" && "쿠키 검증"}
                        {selectedMethod === "session" && "세션 저장소"}
                        {selectedMethod === "jwt" && "JWT 서명 검증"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 시뮬레이션 버튼 */}
              <button
                onClick={simulateLogin}
                disabled={
                  flowStepIndex > -1 && flowStepIndex < currentFlow.length
                }
                className={`mt-6 w-full py-3 rounded-lg font-medium transition-all ${
                  flowStepIndex > -1 && flowStepIndex < currentFlow.length
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : `${getColorClass('indigo', 500, 'bg')} text-white hover:${getColorClass('indigo', 600, 'bg')}`
                }`}
              >
                {flowStepIndex > -1 && flowStepIndex < currentFlow.length
                  ? "인증 진행 중..."
                  : flowStepIndex === currentFlow.length
                  ? "다시 시작"
                  : "로그인 시뮬레이션"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 방식 비교 탭 */}
      {activeTab === "comparison" && (
        <div className="space-y-6">
          {/* 상세 비교 표 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold p-6 bg-gray-50">
              📊 상세 비교표
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      항목
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-orange-700">
                      🍪 Cookie
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-blue-700">
                      💾 Session
                    </th>
                    <th className={`px-6 py-3 text-left text-sm font-medium ${getColorClass('purple', 700, 'text')}`}>
                      🎫 JWT
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">저장 위치</td>
                    <td className="px-6 py-4">클라이언트 (브라우저)</td>
                    <td className="px-6 py-4">서버 (메모리/DB)</td>
                    <td className="px-6 py-4">
                      클라이언트 (LocalStorage/Cookie)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">크기 제한</td>
                    <td className="px-6 py-4">4KB</td>
                    <td className="px-6 py-4">제한 없음 (서버)</td>
                    <td className="px-6 py-4">제한 없음 (주의 필요)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">보안성</td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-600">중간</span>
                      <div className="text-xs text-gray-500">CSRF 취약</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600">높음</span>
                      <div className="text-xs text-gray-500">서버 제어</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-600">중간</span>
                      <div className="text-xs text-gray-500">XSS 취약</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">확장성</td>
                    <td className="px-6 py-4">
                      <span className="text-green-600">좋음</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-red-600">나쁨</span>
                      <div className="text-xs text-gray-500">
                        서버 간 공유 필요
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600">매우 좋음</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">만료 처리</td>
                    <td className="px-6 py-4">브라우저 자동 처리</td>
                    <td className="px-6 py-4">서버에서 관리</td>
                    <td className="px-6 py-4">토큰에 포함 (변경 불가)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 사용 시나리오 가이드 */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🎯 언제 무엇을 사용할까?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-orange-100 p-6 rounded-lg border border-orange-300">
                <h3 className="font-bold text-orange-800 mb-3">
                  Cookie 추천 상황
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>단순한 사용자 설정 저장</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>서버 사이드 렌더링 (SSR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>작은 데이터 저장</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>브라우저 자동 관리 선호</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-100 p-6 rounded-lg border border-blue-300">
                <h3 className="font-bold text-blue-800 mb-3">
                  Session 추천 상황
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>민감한 정보 다룰 때</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>즉시 로그아웃 필요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>단일 서버 환경</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>복잡한 권한 관리</span>
                  </li>
                </ul>
              </div>

              <div className={`${getColorClass('purple', 100, 'bg')} p-6 rounded-lg border ${getColorClass('purple', 300, 'border')}`}>
                <h3 className={`font-bold ${getColorClass('purple', 800, 'text')} mb-3`}>
                  JWT 추천 상황
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>마이크로서비스 아키텍처</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>모바일 앱 API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>서버 간 인증 공유</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Stateless 선호</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* JWT 디코딩 도구 */}
          <div className={`${getColorClass('purple', 50, 'bg')} rounded-lg p-6 border ${getColorClass('purple', 200, 'border')}`}>
            <h2 className={`text-2xl font-bold ${getColorClass('purple', 800, 'text')} mb-6`}>
              🔍 JWT 디코더
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JWT 토큰 입력:
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
                  rows={3}
                  defaultValue={sampleJWT}
                  placeholder="JWT 토큰을 붙여넣으세요..."
                />
              </div>

              <button
                onClick={() => setJwtDecoded(!jwtDecoded)}
                className={`px-6 py-2 ${getColorClass('purple', 500, 'bg')} text-white rounded-lg font-medium hover:${getColorClass('purple', 600, 'bg')} transition-colors`}
              >
                {jwtDecoded ? "원본 보기" : "디코딩하기"}
              </button>

              {jwtDecoded && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">Header</h4>
                    <pre className="text-xs font-mono">
                      {`{
  "alg": "HS256",
  "typ": "JWT"
}`}
                    </pre>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">
                      Payload
                    </h4>
                    <pre className="text-xs font-mono">
                      {`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`}
                    </pre>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">
                      Signature
                    </h4>
                    <pre className="text-xs font-mono break-all">
                      SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 구현 예제 탭 */}
      {activeTab === "implementation" && (
        <div className="space-y-6">
          {/* Cookie 구현 */}
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-4">
              🍪 Cookie 구현 예제
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">서버 (Express.js)</h4>
                <pre className="bg-gray-900 text-orange-400 p-4 rounded-lg text-sm overflow-x-auto">
                  {`// 쿠키 설정
app.post('/login', (req, res) => {
  // 인증 로직...
  res.cookie('authToken', token, {
    httpOnly: true,  // XSS 방어
    secure: true,    // HTTPS only
    sameSite: 'strict', // CSRF 방어
    maxAge: 3600000  // 1시간
  });
  res.json({ success: true });
});

// 쿠키 검증
app.get('/profile', (req, res) => {
  const token = req.cookies.authToken;
  // 토큰 검증...
});`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">클라이언트</h4>
                <pre className="bg-gray-900 text-orange-400 p-4 rounded-lg text-sm overflow-x-auto">
                  {`// 쿠키는 자동으로 전송됨
fetch('/api/profile', {
  credentials: 'include' // 쿠키 포함
})
.then(res => res.json())
.then(data => console.log(data));

// JavaScript로 쿠키 읽기 (HttpOnly 아닌 경우)
const getCookie = (name) => {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) 
    return parts.pop().split(';').shift();
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Session 구현 */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              💾 Session 구현 예제
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">서버 (Express.js)</h4>
                <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-sm overflow-x-auto">
                  {`const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,
    httpOnly: true,
    maxAge: 3600000 
  }
}));

// 로그인
app.post('/login', (req, res) => {
  // 인증 로직...
  req.session.userId = user.id;
  req.session.userName = user.name;
  res.json({ success: true });
});

// 세션 확인
app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ 
    id: req.session.userId,
    name: req.session.userName 
  });
});`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">클라이언트</h4>
                <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-sm overflow-x-auto">
                  {`// 세션은 서버에서 관리, 클라이언트는 세션 ID만 쿠키로 보유
fetch('/api/login', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'user@example.com',
    password: 'password'
  })
});

// 로그아웃
fetch('/api/logout', {
  method: 'POST',
  credentials: 'include'
});`}
                </pre>
              </div>
            </div>
          </div>

          {/* JWT 구현 */}
          <div className={`${getColorClass('purple', 50, 'bg')} rounded-lg p-6 border ${getColorClass('purple', 200, 'border')}`}>
            <h3 className={`text-xl font-bold ${getColorClass('purple', 800, 'text')} mb-4`}>
              🎫 JWT 구현 예제
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">서버 (Express.js)</h4>
                <pre className={`bg-gray-900 ${getColorClass('purple', 400, 'text')} p-4 rounded-lg text-sm overflow-x-auto`}>
                  {`const jwt = require('jsonwebtoken');

// JWT 생성
app.post('/login', (req, res) => {
  // 인증 로직...
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// JWT 검증 미들웨어
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.get('/profile', verifyToken, (req, res) => {
  res.json({ user: req.user });
});`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">클라이언트</h4>
                <pre className={`bg-gray-900 ${getColorClass('purple', 400, 'text')} p-4 rounded-lg text-sm overflow-x-auto`}>
                  {`// JWT 저장 (LocalStorage 또는 메모리)
const login = async () => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const { token } = await res.json();
  
  // 저장 옵션 1: LocalStorage (XSS 취약)
  localStorage.setItem('token', token);
  
  // 저장 옵션 2: 메모리 (새로고침 시 사라짐)
  window.authToken = token;
};

// JWT 사용
const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/profile', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  return res.json();
};`}
                </pre>
              </div>
            </div>
          </div>

          {/* 보안 팁 */}
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-4">
              🔒 보안 Best Practices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-700 mb-2">
                  ⚠️ 하지 말아야 할 것
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>민감한 정보를 JWT payload에 저장</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>LocalStorage에 민감한 토큰 저장</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>HTTPS 없이 인증 구현</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>CSRF 토큰 없이 쿠키 사용</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">
                  ✅ 권장 사항
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✅</span>
                    <span>HttpOnly, Secure, SameSite 쿠키 옵션</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✅</span>
                    <span>토큰 만료 시간 설정</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Refresh Token 패턴 사용</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Rate Limiting 적용</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { AuthMethodsLanding };
