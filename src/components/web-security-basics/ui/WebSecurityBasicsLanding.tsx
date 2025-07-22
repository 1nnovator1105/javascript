"use client";

import React, { useState } from "react";
import { StudyPageLayout } from "@/components/share/ui/StudyPageLayout";

interface SecurityLog {
  id: string;
  type: "attack" | "defense" | "info";
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
}

interface Comment {
  id: string;
  author: string;
  content: string;
  safe: boolean;
}

const WebSecurityBasicsLanding = () => {
  const [selectedAttack, setSelectedAttack] = useState<"xss" | "csrf">("xss");
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "사용자1",
      content: "안녕하세요! 좋은 글이네요.",
      safe: true,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isCSPEnabled, setIsCSPEnabled] = useState(false);
  const [isInputSanitized, setIsInputSanitized] = useState(false);
  const [csrfToken] = useState("abc123def456");
  const [isCSRFProtected, setIsCSRFProtected] = useState(false);

  // 보안 로그 추가
  const addSecurityLog = (
    type: "attack" | "defense" | "info",
    message: string,
    severity: "low" | "medium" | "high" | "critical" = "medium"
  ) => {
    const newLog: SecurityLog = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      severity,
    };
    setSecurityLogs((prev) => [newLog, ...prev].slice(0, 10));
  };

  // XSS 공격 시뮬레이션
  const simulateXSSAttack = (type: "stored" | "reflected" | "dom") => {
    const maliciousScript = `<script>alert('XSS 공격 성공!')</script>`;
    
    if (type === "stored") {
      if (isInputSanitized) {
        addSecurityLog(
          "defense",
          "입력값 검증으로 XSS 공격 차단됨",
          "low"
        );
        const safeContent = userInput.replace(/[<>]/g, "");
        setComments([
          ...comments,
          {
            id: Date.now().toString(),
            author: "공격자",
            content: safeContent,
            safe: true,
          },
        ]);
      } else {
        addSecurityLog(
          "attack",
          "Stored XSS 공격 시도 - 악성 스크립트가 DB에 저장됨",
          "critical"
        );
        setComments([
          ...comments,
          {
            id: Date.now().toString(),
            author: "공격자",
            content: userInput,
            safe: false,
          },
        ]);
      }
    } else if (type === "reflected") {
      addSecurityLog(
        "attack",
        "Reflected XSS 공격 시도 - URL 파라미터를 통한 스크립트 삽입",
        "high"
      );
      if (!isInputSanitized) {
        addSecurityLog(
          "info",
          `공격 URL: https://example.com/search?q=${encodeURIComponent(
            maliciousScript
          )}`,
          "high"
        );
      } else {
        addSecurityLog("defense", "URL 파라미터 검증으로 공격 차단", "low");
      }
    } else if (type === "dom") {
      addSecurityLog(
        "attack",
        "DOM-based XSS 공격 시도 - 클라이언트 측 스크립트 조작",
        "high"
      );
      if (isCSPEnabled) {
        addSecurityLog(
          "defense",
          "Content Security Policy로 인라인 스크립트 차단",
          "low"
        );
      }
    }
  };

  // CSRF 공격 시뮬레이션
  const simulateCSRFAttack = () => {
    addSecurityLog(
      "attack",
      "CSRF 공격 시도 - 악성 사이트에서 요청 전송",
      "high"
    );

    if (isCSRFProtected) {
      addSecurityLog(
        "defense",
        `CSRF 토큰 검증 실패 - 요청 차단됨 (기대값: ${csrfToken})`,
        "low"
      );
      addSecurityLog("info", "사용자의 세션은 안전합니다", "low");
    } else {
      addSecurityLog(
        "attack",
        "CSRF 공격 성공! - 사용자 모르게 비밀번호가 변경됨",
        "critical"
      );
      addSecurityLog(
        "info",
        "공격자가 만든 폼이 사용자의 쿠키와 함께 전송됨",
        "high"
      );
    }
  };

  // 입력값 정제 함수 (예시용 - 실제로는 보안 라이브러리 사용 권장)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  // CSP 헤더 예제
  const cspHeader = `Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-2726c7f26c';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;
  frame-src 'none';`;

  // 보안 헤더들
  const securityHeaders = [
    {
      name: "Content-Security-Policy",
      value: "default-src 'self'",
      description: "XSS 공격 방지를 위한 콘텐츠 정책",
      protection: "XSS",
    },
    {
      name: "X-Frame-Options",
      value: "DENY",
      description: "클릭재킹 공격 방지",
      protection: "Clickjacking",
    },
    {
      name: "X-Content-Type-Options",
      value: "nosniff",
      description: "MIME 타입 스니핑 방지",
      protection: "MIME Sniffing",
    },
    {
      name: "Strict-Transport-Security",
      value: "max-age=31536000",
      description: "HTTPS 강제 사용",
      protection: "Protocol Downgrade",
    },
  ];

  return (
    <StudyPageLayout
      title="웹 보안 기초 (XSS, CSRF)"
      subtitle="웹 애플리케이션의 주요 보안 취약점과 방어 방법을 학습합니다"
      showBackButton
    >
      <div className="space-y-8">
        {/* 공격 유형 선택 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">공격 유형 선택</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedAttack("xss")}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAttack === "xss"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <h3 className="font-bold text-lg mb-2">XSS</h3>
              <p className="text-sm text-gray-600">Cross-Site Scripting</p>
              <p className="text-xs text-gray-500 mt-2">
                악성 스크립트를 웹 페이지에 삽입하는 공격
              </p>
            </button>
            <button
              onClick={() => setSelectedAttack("csrf")}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAttack === "csrf"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <h3 className="font-bold text-lg mb-2">CSRF</h3>
              <p className="text-sm text-gray-600">
                Cross-Site Request Forgery
              </p>
              <p className="text-xs text-gray-500 mt-2">
                사용자가 의도하지 않은 요청을 전송하게 하는 공격
              </p>
            </button>
          </div>
        </div>

        {/* XSS 시뮬레이션 */}
        {selectedAttack === "xss" && (
          <>
            {/* XSS 공격 데모 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">XSS 공격 시뮬레이션</h3>
              
              {/* 보안 설정 */}
              <div className="mb-6 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-3">보안 설정</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isInputSanitized}
                      onChange={(e) => setIsInputSanitized(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>입력값 정제 (Sanitization) 활성화</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isCSPEnabled}
                      onChange={(e) => setIsCSPEnabled(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Content Security Policy (CSP) 활성화</span>
                  </label>
                </div>
              </div>

              {/* 댓글 입력 폼 (Stored XSS) */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">댓글 작성 (Stored XSS)</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={() => simulateXSSAttack("stored")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    등록
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  악성 스크립트 예: {`<script>alert('XSS')</script>`}
                </div>
              </div>

              {/* 댓글 목록 */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">댓글 목록</h4>
                <div className="space-y-2">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded border ${
                        comment.safe
                          ? "bg-gray-50 border-gray-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="font-semibold text-sm">
                        {comment.author}
                      </div>
                      <div
                        className="text-sm mt-1"
                        dangerouslySetInnerHTML={
                          comment.safe
                            ? undefined
                            : { __html: comment.content }
                        }
                      >
                        {comment.safe ? comment.content : null}
                      </div>
                      {!comment.safe && (
                        <div className="text-xs text-red-600 mt-1">
                          ⚠️ 이 댓글에는 악성 스크립트가 포함되어 있습니다
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* XSS 공격 유형 */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => simulateXSSAttack("stored")}
                  className="p-3 bg-red-100 rounded hover:bg-red-200 transition-colors"
                >
                  <div className="font-semibold">Stored XSS</div>
                  <div className="text-xs text-gray-600 mt-1">
                    DB에 저장되는 XSS
                  </div>
                </button>
                <button
                  onClick={() => simulateXSSAttack("reflected")}
                  className="p-3 bg-orange-100 rounded hover:bg-orange-200 transition-colors"
                >
                  <div className="font-semibold">Reflected XSS</div>
                  <div className="text-xs text-gray-600 mt-1">
                    URL 파라미터 XSS
                  </div>
                </button>
                <button
                  onClick={() => simulateXSSAttack("dom")}
                  className="p-3 bg-yellow-100 rounded hover:bg-yellow-200 transition-colors"
                >
                  <div className="font-semibold">DOM-based XSS</div>
                  <div className="text-xs text-gray-600 mt-1">
                    클라이언트 측 XSS
                  </div>
                </button>
              </div>
            </div>

            {/* XSS 방어 방법 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">XSS 방어 방법</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded">
                  <h4 className="font-semibold text-green-700 mb-2">
                    1. 입력값 검증 및 정제
                  </h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`function sanitizeInput(input) {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\\//g, "&#x2F;");
}`}
                  </pre>
                </div>
                <div className="p-4 bg-blue-50 rounded">
                  <h4 className="font-semibold text-blue-700 mb-2">
                    2. Content Security Policy (CSP)
                  </h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                    {cspHeader}
                  </pre>
                </div>
                <div className="p-4 bg-purple-50 rounded">
                  <h4 className="font-semibold text-purple-700 mb-2">
                    3. React의 자동 이스케이핑
                  </h4>
                  <p className="text-sm text-gray-700">
                    React는 기본적으로 모든 값을 이스케이핑합니다.
                    dangerouslySetInnerHTML 사용 시 주의!
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CSRF 시뮬레이션 */}
        {selectedAttack === "csrf" && (
          <>
            {/* CSRF 공격 데모 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">CSRF 공격 시뮬레이션</h3>
              
              {/* 보안 설정 */}
              <div className="mb-6 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-3">보안 설정</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isCSRFProtected}
                      onChange={(e) => setIsCSRFProtected(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>CSRF 토큰 검증 활성화</span>
                  </label>
                  {isCSRFProtected && (
                    <div className="ml-6 text-sm text-gray-600">
                      현재 CSRF 토큰: <code>{csrfToken}</code>
                    </div>
                  )}
                </div>
              </div>

              {/* 정상적인 요청 */}
              <div className="mb-6 p-4 bg-blue-50 rounded">
                <h4 className="font-semibold mb-2">정상적인 비밀번호 변경</h4>
                <form className="space-y-2">
                  <input
                    type="password"
                    placeholder="새 비밀번호"
                    className="w-full px-3 py-2 border rounded"
                  />
                  {isCSRFProtected && (
                    <input
                      type="hidden"
                      name="csrf_token"
                      value={csrfToken}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      addSecurityLog(
                        "info",
                        "정상적인 비밀번호 변경 요청",
                        "low"
                      );
                      if (isCSRFProtected) {
                        addSecurityLog(
                          "defense",
                          `CSRF 토큰 검증 성공: ${csrfToken}`,
                          "low"
                        );
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    비밀번호 변경
                  </button>
                </form>
              </div>

              {/* 악성 사이트 시뮬레이션 */}
              <div className="p-4 bg-red-50 rounded">
                <h4 className="font-semibold mb-2">
                  악성 사이트에서의 CSRF 공격
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  공격자가 만든 악성 사이트에 숨겨진 폼:
                </p>
                <pre className="bg-white p-2 rounded text-xs overflow-x-auto mb-3">
{`<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="1000000" />
</form>
<script>document.forms[0].submit();</script>`}
                </pre>
                <button
                  onClick={simulateCSRFAttack}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  CSRF 공격 실행
                </button>
              </div>
            </div>

            {/* CSRF 방어 방법 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">CSRF 방어 방법</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded">
                  <h4 className="font-semibold text-green-700 mb-2">
                    1. CSRF 토큰 사용
                  </h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`// 서버에서 토큰 생성
const csrfToken = crypto.randomBytes(32).toString('hex');
session.csrfToken = csrfToken;

// 클라이언트 폼에 포함
<input type="hidden" name="csrf_token" value={csrfToken} />

// 서버에서 검증
if (req.body.csrf_token !== session.csrfToken) {
  return res.status(403).send('CSRF token invalid');
}`}
                  </pre>
                </div>
                <div className="p-4 bg-blue-50 rounded">
                  <h4 className="font-semibold text-blue-700 mb-2">
                    2. SameSite Cookie 속성
                  </h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`Set-Cookie: sessionId=abc123; SameSite=Strict; Secure; HttpOnly`}
                  </pre>
                </div>
                <div className="p-4 bg-purple-50 rounded">
                  <h4 className="font-semibold text-purple-700 mb-2">
                    3. Referer 검증
                  </h4>
                  <p className="text-sm text-gray-700">
                    요청의 Referer 헤더를 확인하여 같은 도메인에서 온 요청인지
                    검증
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 보안 로그 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">보안 로그</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {securityLogs.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                공격을 시뮬레이션하면 로그가 표시됩니다
              </div>
            ) : (
              securityLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded flex items-start gap-3 ${
                    log.type === "attack"
                      ? "bg-red-50 border border-red-200"
                      : log.type === "defense"
                      ? "bg-green-50 border border-green-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {log.type === "attack" ? "🚨" : log.type === "defense" ? "🛡️" : "ℹ️"}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{log.message}</div>
                    <div className="text-xs text-gray-600">
                      {log.timestamp} • 심각도: {log.severity}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 보안 헤더 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">중요한 보안 헤더</h3>
          <div className="space-y-3">
            {securityHeaders.map((header, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-mono font-semibold text-sm">
                    {header.name}
                  </h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {header.protection}
                  </span>
                </div>
                <code className="text-xs text-gray-700">{header.value}</code>
                <p className="text-xs text-gray-600 mt-2">
                  {header.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 체크리스트 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">웹 보안 체크리스트</h3>
          <div className="space-y-2">
            {[
              "모든 사용자 입력을 검증하고 정제하기",
              "Content Security Policy (CSP) 설정하기",
              "HTTPS 사용하고 보안 쿠키 설정하기",
              "CSRF 토큰 구현하기",
              "보안 헤더 설정하기 (X-Frame-Options, X-Content-Type-Options 등)",
              "정기적인 보안 업데이트 적용하기",
              "민감한 데이터는 클라이언트에 저장하지 않기",
              "에러 메시지에 민감한 정보 노출하지 않기",
            ].map((item, index) => (
              <label key={index} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
};

export default WebSecurityBasicsLanding;