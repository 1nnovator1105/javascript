"use client";

import React, { useState } from "react";
import { getColorClasses } from "@/utils/colorMigration";

interface ValidationRule {
  name: string;
  description: string;
  validate: (input: string) => { isValid: boolean; message: string };
  example: { valid: string; invalid: string };
}

const validationRules: ValidationRule[] = [
  {
    name: "이메일 검증",
    description: "올바른 이메일 형식인지 확인합니다.",
    validate: (input: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(input);
      return {
        isValid,
        message: isValid ? "✅ 올바른 이메일 형식입니다." : "❌ 잘못된 이메일 형식입니다.",
      };
    },
    example: {
      valid: "user@example.com",
      invalid: "user@invalid",
    },
  },
  {
    name: "URL 검증",
    description: "안전한 URL 형식인지 확인하고 위험한 프로토콜을 차단합니다.",
    validate: (input: string) => {
      try {
        const url = new URL(input);
        const allowedProtocols = ["http:", "https:"];
        if (!allowedProtocols.includes(url.protocol)) {
          return {
            isValid: false,
            message: `❌ 허용되지 않은 프로토콜: ${url.protocol}`,
          };
        }
        return {
          isValid: true,
          message: "✅ 안전한 URL입니다.",
        };
      } catch {
        return {
          isValid: false,
          message: "❌ 잘못된 URL 형식입니다.",
        };
      }
    },
    example: {
      valid: "https://example.com",
      invalid: "javascript:alert('XSS')",
    },
  },
  {
    name: "HTML 태그 차단",
    description: "HTML 태그를 감지하고 차단합니다.",
    validate: (input: string) => {
      const htmlTagRegex = /<[^>]*>/g;
      const hasHtmlTags = htmlTagRegex.test(input);
      return {
        isValid: !hasHtmlTags,
        message: hasHtmlTags
          ? "❌ HTML 태그가 감지되었습니다. 보안상 허용되지 않습니다."
          : "✅ 안전한 텍스트입니다.",
      };
    },
    example: {
      valid: "안전한 텍스트입니다",
      invalid: "<script>alert('XSS')</script>",
    },
  },
  {
    name: "SQL 인젝션 패턴 감지",
    description: "일반적인 SQL 인젝션 패턴을 감지합니다.",
    validate: (input: string) => {
      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|CREATE|ALTER)\b)/i,
        /(--|#|\/\*|\*\/)/,
        /('|"|`)/,
        /(OR\s+\d+\s*=\s*\d+)/i,
      ];
      
      const hasSqlPattern = sqlPatterns.some(pattern => pattern.test(input));
      return {
        isValid: !hasSqlPattern,
        message: hasSqlPattern
          ? "❌ SQL 인젝션 패턴이 감지되었습니다!"
          : "✅ SQL 인젝션 패턴이 없습니다.",
      };
    },
    example: {
      valid: "John Doe",
      invalid: "' OR '1'='1",
    },
  },
  {
    name: "파일 경로 순회 차단",
    description: "디렉토리 순회 공격을 방지합니다.",
    validate: (input: string) => {
      const pathTraversalPatterns = [
        /\.\./,
        /\.\.%2[fF]/,
        /\.\.%5[cC]/,
        /\.\.\\/, 
      ];
      
      const hasPathTraversal = pathTraversalPatterns.some(pattern => pattern.test(input));
      return {
        isValid: !hasPathTraversal,
        message: hasPathTraversal
          ? "❌ 경로 순회 패턴이 감지되었습니다!"
          : "✅ 안전한 파일명입니다.",
      };
    },
    example: {
      valid: "document.pdf",
      invalid: "../../etc/passwd",
    },
  },
];

const InputValidationPlayground = () => {
  const [selectedRule, setSelectedRule] = useState<ValidationRule>(validationRules[0]);
  const [inputValue, setInputValue] = useState("");
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [showEscaping, setShowEscaping] = useState(false);

  const validateInput = () => {
    const result = selectedRule.validate(inputValue);
    setValidationResult(result);
  };

  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const escapeJs = (unsafe: string): string => {
    return JSON.stringify(unsafe).slice(1, -1);
  };

  const escapeUrl = (unsafe: string): string => {
    return encodeURIComponent(unsafe);
  };

  return (
    <div className="space-y-6">
      {/* 검증 규칙 선택 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">검증 규칙 선택</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {validationRules.map((rule) => (
            <button
              key={rule.name}
              onClick={() => {
                setSelectedRule(rule);
                setInputValue("");
                setValidationResult(null);
              }}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${
                  selectedRule.name === rule.name
                    ? `${getColorClasses(
                        'border-green-500',
                        'bg-green-50'
                      )}`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <h5 className="font-semibold text-sm mb-1">{rule.name}</h5>
              <p className="text-xs text-gray-600">{rule.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 입력 검증 테스트 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-gray-50 to-gray-100'
      )} rounded-lg p-6`}>
        <div className="space-y-4">
          {/* 예제 */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className={`${getColorClasses(
              'bg-green-100',
              'border-green-300'
            )} rounded-lg p-3 border`}>
              <div className="font-semibold text-green-800 mb-1">✅ 유효한 예제</div>
              <code className="text-green-700">{selectedRule.example.valid}</code>
            </div>
            <div className={`${getColorClasses(
              'bg-red-100',
              'border-red-300'
            )} rounded-lg p-3 border`}>
              <div className="font-semibold text-red-800 mb-1">❌ 위험한 예제</div>
              <code className="text-red-700">{selectedRule.example.invalid}</code>
            </div>
          </div>

          {/* 입력 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              입력값 테스트
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setValidationResult(null);
                }}
                placeholder="여기에 테스트할 값을 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => setInputValue(selectedRule.example.invalid)}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${getColorClasses(
                  'bg-red-500',
                  'text-white',
                  'hover:bg-red-600'
                )}`}
              >
                위험한 입력
              </button>
              <button
                onClick={validateInput}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${getColorClasses(
                  'bg-green-500',
                  'text-white',
                  'hover:bg-green-600'
                )}`}
              >
                검증하기
              </button>
            </div>
          </div>

          {/* 검증 결과 */}
          {validationResult && (
            <div className={`
              p-4 rounded-lg border-2 font-medium
              ${
                validationResult.isValid
                  ? `${getColorClasses('bg-green-50', 'border-green-300', 'text-green-800')}`
                  : `${getColorClasses('bg-red-50', 'border-red-300', 'text-red-800')}`
              }
            `}>
              {validationResult.message}
            </div>
          )}
        </div>
      </div>

      {/* 이스케이프 처리 */}
      <div>
        <button
          onClick={() => setShowEscaping(!showEscaping)}
          className={`mb-4 px-4 py-2 rounded-lg font-medium text-sm ${getColorClasses(
            'bg-blue-500',
            'text-white',
            'hover:bg-blue-600'
          )}`}
        >
          {showEscaping ? '이스케이프 처리 숨기기' : '이스케이프 처리 보기'}
        </button>

        {showEscaping && inputValue && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-2">HTML 이스케이프</h5>
              <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm break-all">
                {escapeHtml(inputValue)}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-2">JavaScript 이스케이프</h5>
              <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm break-all">
                {escapeJs(inputValue)}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h5 className="font-semibold text-gray-800 mb-2">URL 인코딩</h5>
              <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm break-all">
                {escapeUrl(inputValue)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 입력 검증 모범 사례 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-blue-50 to-indigo-50'
      )} rounded-lg p-6 border border-blue-200`}>
        <h4 className="font-semibold text-blue-800 mb-4">📋 입력 검증 모범 사례</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">✅ 화이트리스트 방식</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 허용된 문자만 받아들이기</li>
              <li>• 정규식으로 유효한 패턴 정의</li>
              <li>• 길이 제한 설정</li>
              <li>• 타입 검증 (숫자, 문자열 등)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">🔒 다층 방어</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 클라이언트 측 검증 (UX)</li>
              <li>• 서버 측 검증 (필수)</li>
              <li>• 데이터베이스 파라미터 바인딩</li>
              <li>• 출력 시 이스케이프 처리</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ 중요:</strong> 클라이언트 측 검증은 사용자 경험을 위한 것입니다. 
            보안을 위해서는 반드시 서버 측에서도 검증해야 합니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export { InputValidationPlayground };