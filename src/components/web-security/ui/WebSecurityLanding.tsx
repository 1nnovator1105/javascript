"use client";

import React, { useState } from "react";
import { getColorClass, getColorClasses } from "@/utils/colorMigration";

type TabType = "xss" | "csrf" | "headers" | "validation";

interface Tab {
  id: TabType;
  label: string;
  icon: string;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "xss",
    label: "XSS 공격",
    icon: "💉",
    description: "Cross-Site Scripting 공격의 원리와 방어법",
  },
  {
    id: "csrf",
    label: "CSRF 공격",
    icon: "🎭",
    description: "Cross-Site Request Forgery 공격과 방어",
  },
  {
    id: "headers",
    label: "보안 헤더",
    icon: "🔒",
    description: "HTTP 보안 헤더로 웹 애플리케이션 보호하기",
  },
  {
    id: "validation",
    label: "입력 검증",
    icon: "✅",
    description: "안전한 입력 처리와 데이터 검증 방법",
  },
];

const WebSecurityLanding = () => {
  const [activeTab, setActiveTab] = useState<TabType>("xss");

  const renderTabContent = () => {
    switch (activeTab) {
      case "xss":
        return <XSSSection />;
      case "csrf":
        return <CSRFSection />;
      case "headers":
        return <SecurityHeadersSection />;
      case "validation":
        return <InputValidationSection />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 탭 네비게이션 */}
      <div className="bg-gray-50 rounded-xl p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  activeTab === tab.id
                    ? `bg-white ${getColorClasses(
                        "text-indigo-600"
                      )} shadow-md ring-2 ${getColorClass(
                        "ring-indigo-500"
                      )} ring-opacity-50`
                    : "text-gray-600 hover:bg-white hover:shadow-sm"
                }
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 활성 탭 설명 */}
      <div
        className={`bg-gradient-to-r ${getColorClasses(
          "from-indigo-50 to-purple-50",
          "border-indigo-200"
        )} p-4 rounded-lg border`}
      >
        <p className="text-gray-700 text-sm md:text-base text-center">
          {tabs.find((tab) => tab.id === activeTab)?.description}
        </p>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="min-h-[600px]">{renderTabContent()}</div>

      {/* 보안 체크리스트 */}
      <div
        className={`bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white`}
      >
        <h3 className="text-xl font-bold mb-4">🔐 웹 보안 체크리스트</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 text-yellow-400">
              프론트엔드 보안
            </h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>✓ 사용자 입력은 항상 이스케이프 처리</li>
              <li>✓ innerHTML 대신 textContent 사용</li>
              <li>✓ 외부 스크립트는 integrity 속성 추가</li>
              <li>✓ 민감한 정보는 클라이언트에 저장하지 않기</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-yellow-400">백엔드 협업</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>✓ HTTPS 사용 필수</li>
              <li>✓ 적절한 CORS 정책 설정</li>
              <li>✓ 보안 헤더 구성 확인</li>
              <li>✓ API 인증 및 권한 검증</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// XSS 섹션
const XSSSection = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-indigo-50 to-purple-50",
          "border-indigo-200"
        )} rounded-xl p-6 border`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          💉 XSS (Cross-Site Scripting) 공격 이해하기
        </h3>
        <p className="text-gray-600 mb-4">
          XSS는 공격자가 웹 페이지에 악성 스크립트를 삽입하는 공격입니다. 사용자의 브라우저에서
          악성 코드가 실행되어 쿠키 탈취, 세션 하이재킹, 피싱 등의 피해를 입힐 수 있습니다.
        </p>

        {/* XSS 방어 방법 */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">🛡️ XSS 방어 방법</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">입력값 검증 및 이스케이프:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  모든 사용자 입력은 화이트리스트 기반으로 검증하고, HTML 엔티티로 이스케이프 처리합니다.
                  React의 경우 기본적으로 XSS 방어가 되어 있지만, dangerouslySetInnerHTML 사용 시 주의가 필요합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">CSP (Content Security Policy) 설정:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  CSP 헤더를 통해 실행 가능한 스크립트의 출처를 제한합니다. 
                  인라인 스크립트를 차단하고 신뢰할 수 있는 도메인의 스크립트만 허용하세요.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">HttpOnly 쿠키 사용:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  세션 쿠키에 HttpOnly 플래그를 설정하여 JavaScript로 쿠키에 접근하는 것을 차단합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">DOM 기반 XSS 방지:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  innerHTML 대신 textContent 사용, URL 파라미터 처리 시 주의, 
                  eval() 함수 사용 금지 등의 안전한 코딩 관행을 따릅니다.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* 예제 코드 */}
        <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <h4 className="text-white font-semibold mb-2">안전한 코드 예제</h4>
          <pre className="text-sm text-gray-300">
            <code>{`// ❌ 위험한 코드
element.innerHTML = userInput; // XSS 취약점!
document.write(userInput);     // XSS 취약점!

// ✅ 안전한 코드
element.textContent = userInput; // 텍스트로만 삽입

// React에서의 안전한 처리
function SafeComponent({ userContent }) {
  return <div>{userContent}</div>; // React가 자동으로 이스케이프
}

// HTML 이스케이프 함수
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}`}</code>
          </pre>
        </div>
      </div>

      {/* XSS 종류 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`bg-gradient-to-br ${getColorClasses(
            "from-purple-50 to-pink-50",
            "border-purple-200"
          )} rounded-lg p-4 border`}
        >
          <h4 className="font-semibold text-purple-800 mb-2">반사형 XSS</h4>
          <p className="text-sm text-purple-700">
            URL 파라미터나 폼 입력을 통해 즉시 실행되는 공격. 주로 피싱 링크를
            통해 전파됩니다.
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${getColorClasses(
            "from-purple-50 to-pink-50",
            "border-purple-200"
          )} rounded-lg p-4 border`}
        >
          <h4 className="font-semibold text-red-800 mb-2">저장형 XSS</h4>
          <p className="text-sm text-red-700">
            데이터베이스에 악성 스크립트가 저장되어 다른 사용자에게도 영향을
            미치는 가장 위험한 유형.
          </p>
        </div>

        <div
          className={`bg-gradient-to-br ${getColorClasses(
            "from-purple-50 to-pink-50",
            "border-purple-200"
          )} rounded-lg p-4 border`}
        >
          <h4 className="font-semibold text-purple-800 mb-2">DOM 기반 XSS</h4>
          <p className="text-sm text-purple-700">
            클라이언트 측 JavaScript에서 DOM을 조작할 때 발생하는 공격. SPA에서
            특히 주의해야 합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// CSRF 섹션
const CSRFSection = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-indigo-50 to-purple-50",
          "border-indigo-200"
        )} rounded-xl p-6 border`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🎭 CSRF (Cross-Site Request Forgery) 공격 이해하기
        </h3>
        <p className="text-gray-600 mb-4">
          CSRF는 인증된 사용자의 권한을 도용하여 원하지 않는 액션을 수행하게
          하는 공격입니다. 공격자는 사용자가 의도하지 않은 요청을 서버로 전송하도록 유도합니다.
        </p>

        {/* CSRF 공격 시나리오 */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
          <h4 className="font-semibold text-gray-800 mb-3">🎯 CSRF 공격 시나리오</h4>
          <ol className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">1.</span>
              <p className="text-gray-700">
                사용자가 은행 사이트에 로그인하여 인증 쿠키를 받습니다.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">2.</span>
              <p className="text-gray-700">
                공격자가 악성 링크나 이미지를 포함한 웹페이지/이메일을 생성합니다.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">3.</span>
              <p className="text-gray-700">
                사용자가 해당 페이지를 방문하면 자동으로 은행 사이트로 요청이 전송됩니다.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">4.</span>
              <p className="text-gray-700">
                브라우저가 자동으로 인증 쿠키를 포함하여 전송하므로 요청이 성공합니다.
              </p>
            </li>
          </ol>
        </div>

        {/* CSRF 방어 방법 */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">🛡️ CSRF 방어 방법</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">CSRF 토큰 사용:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  각 세션마다 고유한 토큰을 생성하여 폼이나 AJAX 요청에 포함시킵니다.
                  서버에서 토큰을 검증하여 정상적인 요청인지 확인합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">SameSite 쿠키 속성:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  쿠키에 SameSite=Strict 또는 SameSite=Lax 속성을 설정하여
                  크로스 사이트 요청에서 쿠키가 전송되지 않도록 합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">Referer 검증:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  요청의 Referer 헤더를 확인하여 신뢰할 수 있는 도메인에서 온 요청인지 검증합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <strong className="text-gray-700">사용자 인터랙션 요구:</strong>
                <p className="text-sm text-gray-600 mt-1">
                  중요한 작업은 재인증, CAPTCHA, 또는 추가 확인 단계를 요구합니다.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* 예제 코드 */}
        <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <h4 className="text-white font-semibold mb-2">CSRF 토큰 구현 예제</h4>
          <pre className="text-sm text-gray-300">
            <code>{`// Express.js에서 CSRF 토큰 설정
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// 폼에 CSRF 토큰 포함
app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

// HTML 폼
<form action="/process" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
  <!-- 다른 폼 필드들 -->
</form>

// React에서 CSRF 토큰 처리
function SecureForm() {
  const [csrfToken, setCsrfToken] = useState('');
  
  useEffect(() => {
    // 서버에서 CSRF 토큰 가져오기
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token));
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/secure-action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ /* 데이터 */ })
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// 보안 헤더 섹션
const SecurityHeadersSection = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-blue-50 to-indigo-50"
        )} rounded-xl p-6 border border-blue-200`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🔒 HTTP 보안 헤더로 웹 애플리케이션 보호하기
        </h3>
        <p className="text-gray-600 mb-4">
          적절한 보안 헤더 설정으로 다양한 공격을 예방할 수 있습니다. 각 헤더의
          역할과 설정 방법을 알아보세요.
        </p>

        {/* 주요 보안 헤더 목록 */}
        <div className="space-y-4">
          {/* Content-Security-Policy */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Content-Security-Policy (CSP)</h4>
            <p className="text-sm text-gray-600 mb-2">
              웹 페이지에서 실행 가능한 리소스의 출처를 제한하여 XSS 공격을 방지합니다.
            </p>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              {`Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted.cdn.com; style-src 'self' 'unsafe-inline';`}
            </div>
          </div>

          {/* X-Frame-Options */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">X-Frame-Options</h4>
            <p className="text-sm text-gray-600 mb-2">
              웹 페이지가 iframe에 포함되는 것을 제어하여 클릭재킹 공격을 방지합니다.
            </p>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              X-Frame-Options: DENY | SAMEORIGIN | ALLOW-FROM https://example.com
            </div>
          </div>

          {/* X-Content-Type-Options */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">X-Content-Type-Options</h4>
            <p className="text-sm text-gray-600 mb-2">
              브라우저가 MIME 타입을 스니핑하는 것을 방지하여 잘못된 콘텐츠 실행을 막습니다.
            </p>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              X-Content-Type-Options: nosniff
            </div>
          </div>

          {/* Strict-Transport-Security */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Strict-Transport-Security (HSTS)</h4>
            <p className="text-sm text-gray-600 mb-2">
              브라우저가 항상 HTTPS로 연결하도록 강제하여 중간자 공격을 방지합니다.
            </p>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
            </div>
          </div>

          {/* Referrer-Policy */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Referrer-Policy</h4>
            <p className="text-sm text-gray-600 mb-2">
              외부 사이트로 전송되는 리퍼러 정보를 제어하여 민감한 정보 유출을 방지합니다.
            </p>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              Referrer-Policy: no-referrer | origin | strict-origin-when-cross-origin
            </div>
          </div>
        </div>

        {/* 구현 예제 */}
        <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <h4 className="text-white font-semibold mb-2">보안 헤더 설정 예제</h4>
          <pre className="text-sm text-gray-300">
            <code>{`// Express.js에서 helmet 사용
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted.cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Next.js에서 보안 헤더 설정
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// 입력 검증 섹션
const InputValidationSection = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-violet-50 to-purple-50",
          "border-violet-200"
        )} rounded-xl p-6 border`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✅ 안전한 입력 처리와 데이터 검증
        </h3>
        <p className="text-gray-600 mb-4">
          사용자 입력을 안전하게 처리하는 것은 웹 보안의 첫걸음입니다. 다양한
          검증 기법과 이스케이프 방법을 알아보세요.
        </p>

        {/* 입력 검증 원칙 */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
          <h4 className="font-semibold text-gray-800 mb-3">🎯 입력 검증 원칙</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">1.</span>
              <div>
                <strong className="text-gray-700">모든 입력은 신뢰할 수 없다</strong>
                <p className="text-sm text-gray-600">
                  사용자 입력, URL 파라미터, 쿠키, 헤더 등 모든 외부 데이터는 검증이 필요합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">2.</span>
              <div>
                <strong className="text-gray-700">화이트리스트 검증 우선</strong>
                <p className="text-sm text-gray-600">
                  허용된 값만 받아들이는 화이트리스트 방식이 블랙리스트보다 안전합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">3.</span>
              <div>
                <strong className="text-gray-700">클라이언트와 서버 모두에서 검증</strong>
                <p className="text-sm text-gray-600">
                  클라이언트 검증은 UX를 위한 것이며, 실제 보안은 서버에서 담당합니다.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">4.</span>
              <div>
                <strong className="text-gray-700">컨텍스트에 맞는 이스케이프</strong>
                <p className="text-sm text-gray-600">
                  HTML, JavaScript, SQL, URL 등 사용되는 컨텍스트에 따라 적절한 이스케이프를 적용합니다.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* 검증 기법 예제 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2">📧 이메일 검증</h5>
            <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">
              <code>{`// 정규식을 이용한 이메일 검증
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || email.length > 254) {
    return false;
  }
  return emailRegex.test(email);
}

// 추가 검증
if (email.includes('..') || 
    email.startsWith('.') || 
    email.endsWith('.')) {
  return false;
}`}</code>
            </pre>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2">🔢 숫자 범위 검증</h5>
            <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">
              <code>{`// 안전한 숫자 검증
function validateNumber(input, min, max) {
  const num = Number(input);
  
  // NaN, Infinity 체크
  if (!Number.isFinite(num)) {
    return false;
  }
  
  // 범위 체크
  if (num < min || num > max) {
    return false;
  }
  
  return true;
}`}</code>
            </pre>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2">📝 텍스트 입력 처리</h5>
            <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">
              <code>{`// 안전한 텍스트 처리
function sanitizeText(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  // 길이 제한
  const trimmed = input.trim().slice(0, 1000);
  
  // 특수문자 이스케이프
  return trimmed
    .replace(/[<>"'&]/g, (char) => {
      const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
      };
      return escapeMap[char];
    });
}`}</code>
            </pre>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2">🔗 URL 검증</h5>
            <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">
              <code>{`// URL 검증 및 처리
function validateURL(input) {
  try {
    const url = new URL(input);
    
    // 허용된 프로토콜만
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }
    
    // 로컬 네트워크 차단
    const hostname = url.hostname;
    if (hostname === 'localhost' || 
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.')) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}`}</code>
            </pre>
          </div>
        </div>

        {/* 라이브러리 추천 */}
        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">📚 추천 검증 라이브러리</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              <strong>validator.js</strong> - 다양한 검증 함수 제공
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              <strong>DOMPurify</strong> - XSS 방지를 위한 HTML 정화
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              <strong>joi</strong> - 스키마 기반 검증 (서버)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              <strong>yup</strong> - 스키마 검증 (클라이언트/서버)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              <strong>zod</strong> - TypeScript 우선 스키마 검증
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { WebSecurityLanding };
