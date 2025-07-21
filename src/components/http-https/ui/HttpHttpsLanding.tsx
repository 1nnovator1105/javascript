"use client";

import React, { useState } from "react";

const HttpHttpsLanding = () => {
  const [activeTab, setActiveTab] = useState<"concept" | "encryption" | "security">("concept");
  const [connectionType, setConnectionType] = useState<"http" | "https">("http");
  const [handshakeStep, setHandshakeStep] = useState(0);
  const [isHandshakeActive, setIsHandshakeActive] = useState(false);
  const [showAttack, setShowAttack] = useState(false);

  // SSL/TLS 핸드셰이크 시뮬레이션
  const startHandshake = () => {
    setIsHandshakeActive(true);
    setHandshakeStep(0);
    
    const steps = [1, 2, 3, 4, 5];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setHandshakeStep(step);
        if (step === 5) {
          setTimeout(() => {
            setIsHandshakeActive(false);
            setHandshakeStep(0);
          }, 2000);
        }
      }, (index + 1) * 1500);
    });
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
          onClick={() => setActiveTab("encryption")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "encryption"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🔐 암호화 시각화
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "security"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🛡️ 보안 위협
        </button>
      </div>

      {/* 개념 설명 탭 */}
      {activeTab === "concept" && (
        <div className="space-y-6">
          {/* HTTP vs HTTPS 비교 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">🌐</span> HTTP
              </h2>
              <p className="text-gray-700 mb-4">
                HyperText Transfer Protocol - 웹에서 데이터를 주고받는 기본 프로토콜
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <div className="font-semibold text-gray-800">평문 전송</div>
                    <div className="text-sm text-gray-600">데이터가 암호화되지 않아 중간에서 읽을 수 있음</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <div className="font-semibold text-gray-800">보안 취약</div>
                    <div className="text-sm text-gray-600">중간자 공격, 도청, 데이터 변조 가능</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold text-gray-800">빠른 속도</div>
                    <div className="text-sm text-gray-600">암호화 과정이 없어 상대적으로 빠름</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                <div className="font-mono text-sm">포트: 80 (기본값)</div>
                <div className="font-mono text-sm">URL: http://example.com</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">🔒</span> HTTPS
              </h2>
              <p className="text-gray-700 mb-4">
                HTTP Secure - SSL/TLS 암호화가 추가된 안전한 HTTP
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold text-gray-800">암호화 전송</div>
                    <div className="text-sm text-gray-600">SSL/TLS로 데이터를 암호화하여 전송</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold text-gray-800">보안 강화</div>
                    <div className="text-sm text-gray-600">인증서로 신원 확인, 데이터 무결성 보장</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold text-gray-800">SEO 이점</div>
                    <div className="text-sm text-gray-600">구글 등 검색엔진에서 우선순위 부여</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                <div className="font-mono text-sm">포트: 443 (기본값)</div>
                <div className="font-mono text-sm">URL: https://example.com</div>
              </div>
            </div>
          </div>

          {/* SSL/TLS 인증서 설명 */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">🏆 SSL/TLS 인증서</h2>
            <p className="text-gray-700 mb-4">
              웹사이트의 신원을 증명하고 암호화 통신을 위한 디지털 인증서입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-300">
                <h3 className="font-semibold text-blue-700 mb-2">DV (Domain Validation)</h3>
                <p className="text-sm text-gray-600 mb-2">도메인 소유권만 확인</p>
                <div className="text-xs bg-blue-100 px-2 py-1 rounded inline-block">기본 수준</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-300">
                <h3 className="font-semibold text-blue-700 mb-2">OV (Organization Validation)</h3>
                <p className="text-sm text-gray-600 mb-2">조직 정보까지 확인</p>
                <div className="text-xs bg-blue-100 px-2 py-1 rounded inline-block">중간 수준</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-300">
                <h3 className="font-semibold text-blue-700 mb-2">EV (Extended Validation)</h3>
                <p className="text-sm text-gray-600 mb-2">엄격한 신원 확인</p>
                <div className="text-xs bg-green-100 px-2 py-1 rounded inline-block">최고 수준</div>
              </div>
            </div>
          </div>

          {/* Mixed Content 경고 */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ Mixed Content 문제</h2>
            <p className="text-gray-700 mb-4">
              HTTPS 페이지에서 HTTP 리소스를 로드할 때 발생하는 보안 문제입니다.
            </p>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm">
              <div className="mb-2">Mixed Content: The page at &apos;https://example.com&apos; was loaded over HTTPS,</div>
              <div>but requested an insecure resource &apos;http://example.com/image.jpg&apos;.</div>
              <div className="mt-2 text-red-400">This request has been blocked; the content must be served over HTTPS.</div>
            </div>
          </div>
        </div>
      )}

      {/* 암호화 시각화 탭 */}
      {activeTab === "encryption" && (
        <div className="space-y-6">
          {/* 연결 타입 선택 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔐 데이터 전송 시각화</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setConnectionType("http")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  connectionType === "http"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                HTTP (암호화 없음)
              </button>
              <button
                onClick={() => setConnectionType("https")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  connectionType === "https"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                HTTPS (암호화)
              </button>
            </div>

            {/* 데이터 전송 시각화 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4">
                <div className="font-semibold mb-2">전송할 데이터:</div>
                <div className="bg-white p-3 rounded border border-gray-300 font-mono text-sm">
                  password: &quot;mySecretPassword123&quot;
                </div>
              </div>

              <div className="mb-4">
                <div className="font-semibold mb-2">네트워크에서 보이는 모습:</div>
                <div className={`p-3 rounded font-mono text-sm ${
                  connectionType === "http" 
                    ? "bg-red-100 border border-red-300 text-red-800"
                    : "bg-green-100 border border-green-300 text-green-800"
                }`}>
                  {connectionType === "http" 
                    ? 'password: "mySecretPassword123"'
                    : 'gJ8kL2nP9qR5tX3yB7mC4wF6hA1sD0eI...'}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                connectionType === "http"
                  ? "bg-red-50 border border-red-300"
                  : "bg-green-50 border border-green-300"
              }`}>
                {connectionType === "http" ? (
                  <div className="text-red-700">
                    <strong>⚠️ 위험:</strong> 네트워크를 모니터링하는 누구나 비밀번호를 볼 수 있습니다!
                  </div>
                ) : (
                  <div className="text-green-700">
                    <strong>✅ 안전:</strong> 데이터가 암호화되어 있어 열쇠 없이는 읽을 수 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SSL/TLS 핸드셰이크 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🤝 SSL/TLS 핸드셰이크 과정</h2>
            
            <div className="mb-6">
              <button
                onClick={startHandshake}
                disabled={isHandshakeActive}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  isHandshakeActive
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isHandshakeActive ? "핸드셰이크 진행 중..." : "핸드셰이크 시작"}
              </button>
            </div>

            <div className="space-y-4">
              {/* Step 1: Client Hello */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                handshakeStep >= 1 ? "border-blue-400 bg-blue-50" : "border-gray-200"
              }`}>
                <h3 className="font-semibold mb-2">1. Client Hello</h3>
                <p className="text-sm text-gray-600">
                  클라이언트가 지원하는 암호화 방식과 랜덤 데이터를 서버에 전송
                </p>
                {handshakeStep >= 1 && (
                  <div className="mt-2 text-xs font-mono bg-white p-2 rounded">
                    → TLS 1.3, 암호화 스위트 목록, Client Random
                  </div>
                )}
              </div>

              {/* Step 2: Server Hello */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                handshakeStep >= 2 ? "border-green-400 bg-green-50" : "border-gray-200"
              }`}>
                <h3 className="font-semibold mb-2">2. Server Hello + Certificate</h3>
                <p className="text-sm text-gray-600">
                  서버가 선택한 암호화 방식, 인증서, Server Random 전송
                </p>
                {handshakeStep >= 2 && (
                  <div className="mt-2 text-xs font-mono bg-white p-2 rounded">
                    ← TLS 1.3 선택, 서버 인증서, Server Random
                  </div>
                )}
              </div>

              {/* Step 3: Client Verification */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                handshakeStep >= 3 ? "border-purple-400 bg-purple-50" : "border-gray-200"
              }`}>
                <h3 className="font-semibold mb-2">3. Certificate Verification</h3>
                <p className="text-sm text-gray-600">
                  클라이언트가 서버 인증서를 검증하고 Pre-Master Secret 생성
                </p>
                {handshakeStep >= 3 && (
                  <div className="mt-2 text-xs font-mono bg-white p-2 rounded">
                    ✓ 인증서 유효성 확인, Pre-Master Secret 암호화
                  </div>
                )}
              </div>

              {/* Step 4: Key Exchange */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                handshakeStep >= 4 ? "border-orange-400 bg-orange-50" : "border-gray-200"
              }`}>
                <h3 className="font-semibold mb-2">4. Key Exchange</h3>
                <p className="text-sm text-gray-600">
                  양쪽이 Master Secret을 생성하고 세션 키 도출
                </p>
                {handshakeStep >= 4 && (
                  <div className="mt-2 text-xs font-mono bg-white p-2 rounded">
                    🔑 세션 키 생성 완료
                  </div>
                )}
              </div>

              {/* Step 5: Secure Connection */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                handshakeStep >= 5 ? "border-green-500 bg-green-100" : "border-gray-200"
              }`}>
                <h3 className="font-semibold mb-2">5. Secure Connection Established</h3>
                <p className="text-sm text-gray-600">
                  암호화된 연결 확립, 이제 안전하게 데이터 전송 가능
                </p>
                {handshakeStep >= 5 && (
                  <div className="mt-2 text-xs font-mono bg-white p-2 rounded">
                    🔒 HTTPS 연결 성공!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 보안 위협 탭 */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* 중간자 공격 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">👨‍💻 중간자 공격 (MITM Attack)</h2>
            
            <div className="mb-6">
              <button
                onClick={() => setShowAttack(!showAttack)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
              >
                {showAttack ? "공격 중지" : "공격 시뮬레이션"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 사용자 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-blue-500 rounded-lg flex items-center justify-center text-white text-5xl mb-4">
                  👤
                </div>
                <h3 className="font-semibold">사용자</h3>
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                  로그인 정보 전송
                </div>
              </div>

              {/* 공격자 */}
              {showAttack && (
                <div className="text-center animate-pulse">
                  <div className="w-32 h-32 mx-auto bg-red-500 rounded-lg flex items-center justify-center text-white text-5xl mb-4">
                    😈
                  </div>
                  <h3 className="font-semibold text-red-600">공격자</h3>
                  <div className="mt-2 p-2 bg-red-100 rounded text-sm">
                    데이터 가로채기!
                  </div>
                </div>
              )}

              {/* 서버 */}
              <div className={`text-center ${showAttack ? "" : "md:col-start-3"}`}>
                <div className="w-32 h-32 mx-auto bg-green-500 rounded-lg flex items-center justify-center text-white text-5xl mb-4">
                  🖥️
                </div>
                <h3 className="font-semibold">서버</h3>
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                  웹 서비스
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ HTTP의 위험성</h4>
              <p className="text-sm text-gray-700">
                HTTP 연결에서는 중간자가 데이터를 읽고 변조할 수 있습니다. 
                HTTPS는 암호화를 통해 이러한 공격을 방지합니다.
              </p>
            </div>
          </div>

          {/* 보안 체크리스트 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">✅ HTTPS 보안 체크리스트</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <div className="font-semibold">모든 페이지를 HTTPS로 제공</div>
                  <div className="text-sm text-gray-600">HTTP와 HTTPS를 혼용하지 않기</div>
                </div>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <div className="font-semibold">HSTS (HTTP Strict Transport Security) 활성화</div>
                  <div className="text-sm text-gray-600">브라우저가 항상 HTTPS로 접속하도록 강제</div>
                </div>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <div className="font-semibold">Mixed Content 제거</div>
                  <div className="text-sm text-gray-600">모든 리소스를 HTTPS로 로드</div>
                </div>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <div className="font-semibold">인증서 유효기간 관리</div>
                  <div className="text-sm text-gray-600">만료 전 갱신, Let&apos;s Encrypt 자동 갱신 활용</div>
                </div>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <div className="font-semibold">최신 TLS 버전 사용</div>
                  <div className="text-sm text-gray-600">TLS 1.2 이상 사용, 구버전 비활성화</div>
                </div>
              </label>
            </div>
          </div>

          {/* 브라우저 보안 표시 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">🌐 브라우저 보안 표시</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-300">
                <div className="text-3xl">🔒</div>
                <div>
                  <div className="font-semibold text-green-800">안전한 연결</div>
                  <div className="text-sm text-gray-600">유효한 인증서를 가진 HTTPS 사이트</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                <div className="text-3xl">⚠️</div>
                <div>
                  <div className="font-semibold text-yellow-800">Mixed Content 경고</div>
                  <div className="text-sm text-gray-600">HTTPS 페이지에서 HTTP 리소스 로드</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-300">
                <div className="text-3xl">🚫</div>
                <div>
                  <div className="font-semibold text-red-800">안전하지 않음</div>
                  <div className="text-sm text-gray-600">HTTP 사이트 또는 인증서 문제</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { HttpHttpsLanding };