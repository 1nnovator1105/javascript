"use client";

import React, { useState } from "react";
import { getColorClasses } from "@/utils/colorMigration";

interface ErrorExample {
  type: string;
  name: string;
  description: string;
  code: string;
  triggerCode: string;
  fix: string;
  explanation: string;
}

const errorExamples: ErrorExample[] = [
  {
    type: "SyntaxError",
    name: "문법 에러",
    description: "코드 구문이 잘못되었을 때 발생",
    code: `// 잘못된 문법 예제
const obj = {
  name: "Kim"
  age: 25  // 쉼표가 빠짐
};`,
    triggerCode: `const obj = { name: "Kim" age: 25 };`,
    fix: `const obj = {
  name: "Kim",  // 쉼표 추가
  age: 25
};`,
    explanation: "객체 리터럴에서 속성 사이에 쉼표가 누락되었습니다.",
  },
  {
    type: "ReferenceError",
    name: "참조 에러",
    description: "존재하지 않는 변수를 참조할 때 발생",
    code: `// 선언되지 않은 변수 사용
console.log(userName);
// userName is not defined`,
    triggerCode: `console.log(userName);`,
    fix: `const userName = "홍길동";
console.log(userName);`,
    explanation: "선언되지 않은 변수 'userName'을 참조하려고 했습니다.",
  },
  {
    type: "TypeError",
    name: "타입 에러",
    description: "잘못된 타입에 대한 연산을 수행할 때 발생",
    code: `// null 값에 메서드 호출
const user = null;
user.getName();
// Cannot read property 'getName' of null`,
    triggerCode: `const user = null; user.getName();`,
    fix: `const user = { getName: () => "홍길동" };
user?.getName(); // 옵셔널 체이닝 사용`,
    explanation: "null 값에 메서드를 호출하려고 했습니다.",
  },
  {
    type: "RangeError",
    name: "범위 에러",
    description: "유효한 범위를 벗어난 값을 사용할 때 발생",
    code: `// 무한 재귀 호출
function recursiveCall() {
  recursiveCall();
}
recursiveCall(); // Maximum call stack size exceeded`,
    triggerCode: `function recursiveCall() { recursiveCall(); } recursiveCall();`,
    fix: `function recursiveCall(count = 0) {
  if (count > 10) return; // 종료 조건
  recursiveCall(count + 1);
}`,
    explanation: "재귀 함수에 종료 조건이 없어 스택 오버플로우가 발생했습니다.",
  },
];

const ErrorTypeSimulator = () => {
  const [selectedError, setSelectedError] = useState<ErrorExample>(errorExamples[0]);

  return (
    <div className="space-y-6">
      {/* 에러 타입 선택 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">에러 타입 선택</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {errorExamples.map((error) => (
            <button
              key={error.type}
              onClick={() => setSelectedError(error)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200
                ${
                  selectedError.type === error.type
                    ? `${getColorClasses(
                        'border-red-500',
                        'bg-red-50',
                        'text-red-700'
                      )}`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="font-semibold text-sm">{error.type}</div>
              <div className="text-xs text-gray-600 mt-1">{error.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 에러 설명 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-gray-50 to-gray-100'
      )} rounded-lg p-4`}>
        <h5 className="font-semibold text-gray-800 mb-2">{selectedError.name}</h5>
        <p className="text-sm text-gray-600">{selectedError.description}</p>
      </div>

      {/* 코드 비교 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 문제가 있는 코드 */}
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-red-500">❌</span>
            문제 코드
          </h5>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto ring-2 ring-red-500">
            <pre>{selectedError.code}</pre>
          </div>
          
          {/* 에러 메시지 */}
          <div className={`
            ${getColorClasses('bg-red-100', 'border-red-500', 'text-red-700')}
            border-2 rounded-lg p-4
          `}>
            <div className="flex items-start gap-2">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-semibold">에러 발생!</div>
                <div className="text-sm mt-1">
                  <strong>{selectedError.type}:</strong> {selectedError.explanation}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 수정된 코드 */}
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-green-500">✅</span>
            수정된 코드
          </h5>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto ring-2 ring-green-500">
            <pre>{selectedError.fix}</pre>
          </div>
          
          {/* 성공 메시지 */}
          <div className={`
            ${getColorClasses('bg-green-100', 'border-green-500', 'text-green-700')}
            border-2 rounded-lg p-4
          `}>
            <div className="flex items-start gap-2">
              <span className="text-2xl">✅</span>
              <div>
                <div className="font-semibold">수정 완료!</div>
                <div className="text-sm mt-1">
                  에러가 성공적으로 해결되었습니다. 코드가 정상적으로 실행됩니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 학습 팁 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-blue-50 to-indigo-50'
      )} rounded-lg p-4 border border-blue-200`}>
        <h5 className="font-semibold text-blue-800 mb-2">💡 학습 팁</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 에러 메시지를 자세히 읽어보세요. 문제의 원인이 담겨 있습니다.</li>
          <li>• 에러가 발생한 줄 번호와 파일명을 확인하세요.</li>
          <li>• 콘솔에서 스택 트레이스를 따라가며 에러의 흐름을 파악하세요.</li>
        </ul>
      </div>
    </div>
  );
};

export { ErrorTypeSimulator };