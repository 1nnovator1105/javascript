"use client";

import React, { useState } from "react";
import { getColorClasses } from "@/utils/colorMigration";

interface SecurityHeader {
  name: string;
  description: string;
  example: string;
  protection: string[];
  level: "essential" | "recommended" | "advanced";
}

const securityHeaders: SecurityHeader[] = [
  {
    name: "Content-Security-Policy (CSP)",
    description: "웹 페이지에서 실행할 수 있는 리소스를 제한하여 XSS 및 기타 인젝션 공격을 방지합니다.",
    example: `Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://trusted-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;`,
    protection: ["XSS 공격 방지", "데이터 인젝션 공격 차단", "믹스드 콘텐츠 방지"],
    level: "essential",
  },
  {
    name: "X-Frame-Options",
    description: "웹 페이지가 iframe으로 포함되는 것을 제어하여 클릭재킹 공격을 방지합니다.",
    example: `X-Frame-Options: DENY
# 또는
X-Frame-Options: SAMEORIGIN
# 또는
X-Frame-Options: ALLOW-FROM https://trusted-site.com`,
    protection: ["클릭재킹 공격 방지", "UI 변조 공격 차단"],
    level: "essential",
  },
  {
    name: "Strict-Transport-Security (HSTS)",
    description: "브라우저가 항상 HTTPS를 통해서만 사이트에 접속하도록 강제합니다.",
    example: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`,
    protection: ["중간자 공격(MITM) 방지", "프로토콜 다운그레이드 공격 차단", "세션 하이재킹 방지"],
    level: "essential",
  },
  {
    name: "X-Content-Type-Options",
    description: "브라우저가 MIME 타입을 추측하지 못하도록 하여 MIME 스니핑 공격을 방지합니다.",
    example: `X-Content-Type-Options: nosniff`,
    protection: ["MIME 타입 스니핑 공격 방지", "악성 파일 실행 차단"],
    level: "recommended",
  },
  {
    name: "Referrer-Policy",
    description: "다른 도메인으로 요청을 보낼 때 Referer 헤더에 포함되는 정보를 제어합니다.",
    example: `Referrer-Policy: strict-origin-when-cross-origin
# 또는
Referrer-Policy: no-referrer`,
    protection: ["민감한 URL 정보 유출 방지", "프라이버시 보호"],
    level: "recommended",
  },
  {
    name: "Permissions-Policy",
    description: "브라우저 기능과 API 사용을 제한하여 악의적인 기능 사용을 방지합니다.",
    example: `Permissions-Policy: 
  camera=(),
  microphone=(),
  geolocation=(self),
  payment=()`,
    protection: ["권한 남용 방지", "프라이버시 보호", "악성 기능 실행 차단"],
    level: "advanced",
  },
];

const SecurityHeadersExplorer = () => {
  const [selectedHeader, setSelectedHeader] = useState<SecurityHeader>(securityHeaders[0]);
  const [showImplementation, setShowImplementation] = useState(false);

  const getLevelColor = (level: SecurityHeader["level"]) => {
    switch (level) {
      case "essential": return "bg-red-100 text-red-700 border-red-300";
      case "recommended": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "advanced": return "bg-green-100 text-green-700 border-green-300";
    }
  };

  const getLevelLabel = (level: SecurityHeader["level"]) => {
    switch (level) {
      case "essential": return "필수";
      case "recommended": return "권장";
      case "advanced": return "고급";
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 선택 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">보안 헤더 탐색</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {securityHeaders.map((header) => (
            <button
              key={header.name}
              onClick={() => {
                setSelectedHeader(header);
                setShowImplementation(false);
              }}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${
                  selectedHeader.name === header.name
                    ? `${getColorClasses(
                        'border-blue-500',
                        'bg-blue-50'
                      )}`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-semibold text-sm">{header.name}</h5>
                <span className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(header.level)}`}>
                  {getLevelLabel(header.level)}
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{header.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 선택된 헤더 상세 정보 */}
      <div className={`bg-gradient-to-br ${getColorClasses(
        'from-blue-50 to-indigo-50'
      )} rounded-xl p-6 border border-blue-200`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{selectedHeader.name}</h3>
            <span className={`inline-block mt-2 text-sm px-3 py-1 rounded-full border ${getLevelColor(selectedHeader.level)}`}>
              {getLevelLabel(selectedHeader.level)} 보안 헤더
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">{selectedHeader.description}</p>

        {/* 보호 기능 */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">🛡️ 보호 기능</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedHeader.protection.map((item, index) => (
              <div
                key={index}
                className={`${getColorClasses(
                  'bg-green-100',
                  'border-green-300',
                  'text-green-800'
                )} rounded-lg px-4 py-2 border text-sm font-medium`}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

        {/* 예제 코드 */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">📝 헤더 설정 예제</h4>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{selectedHeader.example}</pre>
          </div>
        </div>

        {/* 구현 방법 */}
        <button
          onClick={() => setShowImplementation(!showImplementation)}
          className={`mt-4 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${getColorClasses(
            'bg-blue-500',
            'text-white',
            'hover:bg-blue-600'
          )}`}
        >
          {showImplementation ? '구현 방법 숨기기' : '구현 방법 보기'}
        </button>
      </div>

      {/* 구현 방법 */}
      {showImplementation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Express.js (Node.js)</h5>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>{`// helmet 라이브러리 사용
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));`}</pre>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Nginx 설정</h5>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>{`# nginx.conf
server {
  # CSP 헤더
  add_header Content-Security-Policy 
    "default-src 'self'; script-src 'self' 'unsafe-inline';" 
    always;
  
  # 기타 보안 헤더
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header Strict-Transport-Security 
    "max-age=31536000; includeSubDomains" always;
}`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* 보안 헤더 체크리스트 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-gray-800 to-gray-900'
      )} rounded-lg p-6 text-white`}>
        <h4 className="text-lg font-bold mb-4">✅ 보안 헤더 구현 체크리스트</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-yellow-400 mb-3">구현 전 준비사항</h5>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>□ 현재 사용 중인 외부 리소스 목록 작성</li>
              <li>□ 인라인 스크립트/스타일 사용 여부 확인</li>
              <li>□ iframe 사용 정책 결정</li>
              <li>□ HTTPS 전환 완료 확인</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-400 mb-3">테스트 및 모니터링</h5>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>□ 개발 환경에서 헤더 테스트</li>
              <li>□ CSP 위반 리포트 설정</li>
              <li>□ 브라우저 개발자 도구로 검증</li>
              <li>□ securityheaders.com에서 점검</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SecurityHeadersExplorer };