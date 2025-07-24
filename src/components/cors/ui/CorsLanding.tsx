"use client";

import React, { useState } from "react";
import { getColorClass } from "@/utils/colors";

const CorsLanding = () => {
  const [activeTab, setActiveTab] = useState<"concept" | "simulator" | "demo">(
    "concept"
  );
  const [selectedScenario, setSelectedScenario] = useState<
    "same-origin" | "cross-origin" | "preflight"
  >("same-origin");
  const [corsHeaders, setCorsHeaders] = useState({
    "Access-Control-Allow-Origin": "",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "false",
  });
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [requestPhase, setRequestPhase] = useState<
    "idle" | "preflight" | "actual" | "response" | "error"
  >("idle");

  // CORS 요청 시뮬레이션
  const simulateRequest = async () => {
    setRequestInProgress(true);
    setRequestPhase("idle");
    const requestOrigin = "https://app.com";

    // 1. Same-Origin: CORS 체크 불필요, 항상 성공
    if (selectedScenario === "same-origin") {
      setRequestPhase("actual");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setRequestPhase("response");
      setTimeout(() => {
        setRequestInProgress(false);
        setRequestPhase("idle");
      }, 2000);
      return;
    }

    // --- Cross-Origin 시나리오 ---

    // 2. Preflight 요청 (필요한 경우)
    if (selectedScenario === "preflight") {
      setRequestPhase("preflight");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isOriginAllowed =
        corsHeaders["Access-Control-Allow-Origin"] === "*" ||
        corsHeaders["Access-Control-Allow-Origin"] === requestOrigin;
      const isMethodAllowed = corsHeaders["Access-Control-Allow-Methods"]
        .toUpperCase()
        .includes("PUT");

      if (!isOriginAllowed || !isMethodAllowed) {
        setRequestPhase("error");
        setTimeout(() => {
          setRequestInProgress(false);
          setRequestPhase("idle");
        }, 2000);
        return;
      }
    }

    // 3. 실제 요청 (Cross-Origin 또는 Preflight 통과 후)
    setRequestPhase("actual");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isOriginAllowed =
      corsHeaders["Access-Control-Allow-Origin"] === "*" ||
      corsHeaders["Access-Control-Allow-Origin"] === requestOrigin;

    if (isOriginAllowed) {
      setRequestPhase("response");
    } else {
      setRequestPhase("error");
    }

    setTimeout(() => {
      setRequestInProgress(false);
      setRequestPhase("idle");
    }, 2000);
  };

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
          onClick={() => setActiveTab("simulator")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "simulator"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🔄 요청 시뮬레이터
        </button>
        <button
          onClick={() => setActiveTab("demo")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "demo"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🧪 실습 데모
        </button>
      </div>

      {/* 개념 설명 탭 */}
      {activeTab === "concept" && (
        <div className="space-y-6">
          {/* CORS란? */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              🌐 CORS란 무엇인가?
            </h2>
            <p className="text-gray-700 mb-4">
              CORS(Cross-Origin Resource Sharing)는 웹 브라우저에서 실행되는
              스크립트가 다른 출처(origin)의 리소스에 접근할 수 있도록 하는
              메커니즘입니다.
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-300">
              <h3 className="font-semibold text-blue-700 mb-2">
                📍 Origin(출처)이란?
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                프로토콜 + 도메인 + 포트번호의 조합
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <div className="bg-green-50 p-3 rounded border border-green-300">
                  <div className="font-mono text-sm text-green-800">
                    https://example.com
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    프로토콜: https
                  </div>
                  <div className="text-xs text-gray-600">
                    도메인: example.com
                  </div>
                  <div className="text-xs text-gray-600">
                    포트: 443 (기본값)
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-300">
                  <div className="font-mono text-sm text-yellow-800">
                    http://example.com:3000
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    프로토콜: http
                  </div>
                  <div className="text-xs text-gray-600">
                    도메인: example.com
                  </div>
                  <div className="text-xs text-gray-600">포트: 3000</div>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-300">
                  <div className="font-mono text-sm text-red-800">
                    https://api.example.com
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    프로토콜: https
                  </div>
                  <div className="text-xs text-gray-600">
                    도메인: api.example.com
                  </div>
                  <div className="text-xs text-gray-600">
                    포트: 443 (기본값)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Same-Origin Policy */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔒 Same-Origin Policy
            </h2>
            <p className="text-gray-700 mb-4">
              브라우저의 기본 보안 정책으로, 한 출처에서 로드된 문서나
              스크립트가 다른 출처의 리소스와 상호작용하는 것을 제한합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                <h3 className="font-semibold text-green-800 mb-2">
                  ✅ 같은 출처 (허용)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-white px-2 py-1 rounded">
                      https://example.com/page1
                    </span>
                    <span>→</span>
                    <span className="font-mono bg-white px-2 py-1 rounded">
                      https://example.com/api/data
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    같은 프로토콜, 도메인, 포트
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-300">
                <h3 className="font-semibold text-red-800 mb-2">
                  ❌ 다른 출처 (차단)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-white px-2 py-1 rounded">
                      https://example.com
                    </span>
                    <span>→</span>
                    <span className="font-mono bg-white px-2 py-1 rounded">
                      https://api.other.com
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">다른 도메인</div>
                </div>
              </div>
            </div>
          </div>

          {/* CORS 동작 방식 */}
          <div className={`${getColorClass('purple', 50, 'bg')} rounded-lg p-6 border ${getColorClass('purple', 200, 'border')}`}>
            <h2 className={`text-2xl font-bold ${getColorClass('purple', 800, 'text')} mb-4`}>
              ⚙️ CORS 동작 방식
            </h2>
            <div className="space-y-4">
              <div className={`bg-white p-4 rounded-lg border ${getColorClass('purple', 300, 'border')}`}>
                <h3 className={`font-semibold ${getColorClass('purple', 700, 'text')} mb-2`}>
                  1. 단순 요청 (Simple Request)
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  GET, HEAD, POST 메서드 중 하나이고, 특정 헤더만 사용하는 경우
                </p>
                <div className="bg-gray-100 p-3 rounded font-mono text-xs">
                  <div className="text-blue-600">{`// 브라우저 → 서버`}</div>
                  <div>GET /api/data HTTP/1.1</div>
                  <div>Origin: https://example.com</div>
                  <div className="mt-2 text-green-600">{`// 서버 → 브라우저`}</div>
                  <div>Access-Control-Allow-Origin: https://example.com</div>
                </div>
              </div>

              <div className={`bg-white p-4 rounded-lg border ${getColorClass('purple', 300, 'border')}`}>
                <h3 className={`font-semibold ${getColorClass('purple', 700, 'text')} mb-2`}>
                  2. 프리플라이트 요청 (Preflight Request)
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  실제 요청이 서버 데이터에 영향을 줄 수 있을 때(예: `PUT`,
                  `DELETE` 메서드 사용) 브라우저는 보안을 위해 먼저 &apos;사전
                  확인(preflight)&apos; 요청을 보냅니다. 이 요청은 `OPTIONS`
                  메서드를 사용하며, 서버에게 실제 요청을 보내도 안전한지 묻는
                  역할을 합니다. 서버가 preflight 요청에 허용하는 헤더로
                  응답해야만, 브라우저는 비로소 실제 요청(예: `PUT` 요청)을
                  보냅니다.
                </p>
                <div className="bg-gray-100 p-3 rounded font-mono text-xs">
                  <div className="text-blue-600">{`// 1. OPTIONS 요청 (Preflight)`}</div>
                  <div>OPTIONS /api/data HTTP/1.1</div>
                  <div>Origin: https://example.com</div>
                  <div>Access-Control-Request-Method: PUT</div>
                  <div className="mt-2 text-green-600">{`// 2. OPTIONS 응답`}</div>
                  <div>Access-Control-Allow-Origin: https://example.com</div>
                  <div>Access-Control-Allow-Methods: PUT, DELETE</div>
                  <div className="mt-2 text-blue-600">{`// 3. 실제 요청`}</div>
                  <div>PUT /api/data HTTP/1.1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 요청 시뮬레이터 탭 */}
      {activeTab === "simulator" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔄 CORS 요청 시뮬레이터</h2>

            {/* 시나리오 선택 */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">시나리오 선택:</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedScenario("same-origin")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedScenario === "same-origin"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Same-Origin 요청
                </button>
                <button
                  onClick={() => setSelectedScenario("cross-origin")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedScenario === "cross-origin"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Cross-Origin 요청
                </button>
                <button
                  onClick={() => setSelectedScenario("preflight")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedScenario === "preflight"
                      ? `${getColorClass('purple', 500, 'bg')} text-white`
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Preflight 요청
                </button>
              </div>
            </div>

            {/* 요청 흐름 시각화 */}
            <div className="mb-6 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                {/* 브라우저 */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white text-4xl mb-2">
                    🌐
                  </div>
                  <div className="font-medium">브라우저</div>
                  <div className="text-sm text-gray-600">https://app.com</div>
                </div>

                {/* 요청 화살표 */}
                <div className="flex-1 px-4">
                  <div className="relative">
                    <div className="h-2 bg-gray-300 rounded-full">
                      {requestInProgress && (
                        <div
                          className="h-full bg-blue-500 rounded-full animate-pulse"
                          style={{
                            width:
                              requestPhase === "preflight"
                                ? "25%"
                                : requestPhase === "actual"
                                ? "50%"
                                : requestPhase === "response"
                                ? "100%"
                                : requestPhase === "error"
                                ? "75%"
                                : "0%",
                            transition: "width 0.5s ease-in-out",
                          }}
                        />
                      )}
                    </div>
                    {requestPhase === "preflight" && (
                      <div className={`absolute -top-8 left-1/4 transform -translate-x-1/2 text-xs ${getColorClass('purple', 100, 'bg')} px-2 py-1 rounded`}>
                        OPTIONS
                      </div>
                    )}
                    {requestPhase === "actual" && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-blue-100 px-2 py-1 rounded">
                        {selectedScenario === "preflight" ? "PUT" : "GET"}
                      </div>
                    )}
                    {requestPhase === "error" && (
                      <div className="absolute -top-8 left-3/4 transform -translate-x-1/2 text-xs bg-red-100 px-2 py-1 rounded">
                        CORS Error!
                      </div>
                    )}
                  </div>
                </div>

                {/* 서버 */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center text-white text-4xl mb-2">
                    🖥️
                  </div>
                  <div className="font-medium">서버</div>
                  <div className="text-sm text-gray-600">
                    {selectedScenario === "same-origin"
                      ? "https://app.com"
                      : "https://api.com"}
                  </div>
                </div>
              </div>
            </div>

            {/* CORS 헤더 설정 */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">서버 CORS 헤더 설정:</h3>
              <div className="space-y-3">
                {Object.entries(corsHeaders).map(([header, value]) => (
                  <div key={header} className="flex items-center gap-3">
                    <label className="font-mono text-sm w-64">{header}:</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setCorsHeaders({
                          ...corsHeaders,
                          [header]: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-1 border border-gray-300 rounded font-mono text-sm"
                      placeholder="헤더 값 입력"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CORS 헤더 설정 가이드 */}
            <div className="mt-6 mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
              <h4 className="font-semibold text-yellow-800 mb-2">
                💡 시뮬레이션 가이드
              </h4>
              <p className="text-sm text-gray-700">
                서버의 CORS 헤더 값을 변경하여 다양한 시나리오를 테스트해보세요.
              </p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>
                  <strong>오류 발생시키기:</strong>{" "}
                  <code className="bg-yellow-200 px-1 rounded">
                    Access-Control-Allow-Origin
                  </code>{" "}
                  값을 비우거나{" "}
                  <code className="bg-yellow-200 px-1 rounded">
                    https://wrong.com
                  </code>
                  과 같이 다른 출처를 입력하세요.
                </li>
                <li>
                  <strong>요청 성공시키기:</strong>{" "}
                  <code className="bg-yellow-200 px-1 rounded">
                    Access-Control-Allow-Origin
                  </code>
                  에{" "}
                  <code className="bg-yellow-200 px-1 rounded">
                    https://app.com
                  </code>{" "}
                  또는 <code className="bg-yellow-200 px-1 rounded">*</code>를
                  입력하세요.
                </li>
                <li>
                  <strong>Preflight 시나리오:</strong>{" "}
                  <code className="bg-yellow-200 px-1 rounded">
                    Access-Control-Allow-Methods
                  </code>
                  에 <code className="bg-yellow-200 px-1 rounded">PUT</code>이
                  포함되어야 요청이 성공합니다.
                </li>
              </ul>
            </div>

            {/* 실행 버튼 */}
            <button
              onClick={simulateRequest}
              disabled={requestInProgress}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                requestInProgress
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {requestInProgress ? "요청 진행 중..." : "요청 시뮬레이션 시작"}
            </button>
          </div>
        </div>
      )}

      {/* 실습 데모 탭 */}
      {activeTab === "demo" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🧪 CORS 실습 데모</h2>

            {/* 일반적인 CORS 에러 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                ❌ 일반적인 CORS 에러
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-300">
                  <h4 className="font-semibold text-red-800 mb-2">
                    1. No &apos;Access-Control-Allow-Origin&apos; header
                  </h4>
                  <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm overflow-x-auto">
                    Access to XMLHttpRequest at
                    &apos;https://api.example.com/data&apos; from origin
                    &apos;https://app.example.com&apos; has been blocked by CORS
                    policy: No &apos;Access-Control-Allow-Origin&apos; header is
                    present on the requested resource.
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    <strong>원인:</strong> 서버가 CORS 헤더를 전송하지 않음
                    <br />
                    <strong>해결:</strong> 서버에서 적절한
                    Access-Control-Allow-Origin 헤더 추가
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    2. Credentials 관련 에러
                  </h4>
                  <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm overflow-x-auto">
                    The value of the
                    &apos;Access-Control-Allow-Credentials&apos; header in the
                    response is &apos;&apos; which must be &apos;true&apos; when
                    the request&apos;s credentials mode is &apos;include&apos;.
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    <strong>원인:</strong> 인증 정보를 포함한 요청인데 서버
                    설정이 잘못됨
                    <br />
                    <strong>해결:</strong> Access-Control-Allow-Credentials:
                    true 설정
                  </div>
                </div>
              </div>
            </div>

            {/* 해결 방법 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">✅ CORS 해결 방법</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                  <h4 className="font-semibold text-green-800 mb-2">
                    서버 측 설정 (권장)
                  </h4>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                    {`// Express.js 예제
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://app.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});`}
                  </pre>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    프록시 서버 사용
                  </h4>
                  <pre className="bg-gray-900 text-blue-400 p-3 rounded text-xs overflow-x-auto">
                    {`// Next.js 설정 예제
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};`}
                  </pre>
                </div>
              </div>
            </div>

            {/* 체크리스트 */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                📋 CORS 문제 해결 체크리스트
              </h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>브라우저 콘솔에서 정확한 에러 메시지 확인</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>요청 Origin과 서버 설정의 Allow-Origin 비교</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Preflight 요청이 필요한지 확인 (메서드, 헤더)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>
                    인증 정보(쿠키, 토큰) 포함 시 Credentials 설정 확인
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>서버 로그에서 OPTIONS 요청 처리 확인</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { CorsLanding };
