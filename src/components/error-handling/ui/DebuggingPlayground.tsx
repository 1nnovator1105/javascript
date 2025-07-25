"use client";

import React, { useState } from "react";
import { getColorClasses } from "@/utils/colorMigration";

interface ConsoleExample {
  method: string;
  description: string;
  code: string;
  output: string;
}

const consoleExamples: ConsoleExample[] = [
  {
    method: "console.table()",
    description: "데이터를 표 형식으로 출력",
    code: `const users = [
  { name: "김철수", age: 25, city: "서울" },
  { name: "이영희", age: 30, city: "부산" },
  { name: "박민수", age: 28, city: "대구" }
];
console.table(users);`,
    output: `┌─────────┬──────────┬─────┬────────┐
│ (index) │   name   │ age │  city  │
├─────────┼──────────┼─────┼────────┤
│    0    │ '김철수' │ 25  │ '서울' │
│    1    │ '이영희' │ 30  │ '부산' │
│    2    │ '박민수' │ 28  │ '대구' │
└─────────┴──────────┴─────┴────────┘`,
  },
  {
    method: "console.group()",
    description: "로그를 그룹으로 묶어서 출력",
    code: `console.group("사용자 정보");
console.log("이름: 홍길동");
console.log("나이: 30");
console.groupEnd();`,
    output: `▼ 사용자 정보
    이름: 홍길동
    나이: 30`,
  },
  {
    method: "console.time()",
    description: "코드 실행 시간 측정",
    code: `console.time("루프 실행 시간");
for (let i = 0; i < 1000000; i++) {
  // 무거운 작업
}
console.timeEnd("루프 실행 시간");`,
    output: `루프 실행 시간: 12.345ms`,
  },
  {
    method: "console.trace()",
    description: "호출 스택 추적",
    code: `function firstFunction() {
  secondFunction();
}
function secondFunction() {
  console.trace("호출 스택 추적");
}
firstFunction();`,
    output: `호출 스택 추적
  at secondFunction (script.js:5:11)
  at firstFunction (script.js:2:3)
  at script.js:7:1`,
  },
];

const DebuggingPlayground = () => {
  const [selectedExample, setSelectedExample] = useState<ConsoleExample>(consoleExamples[0]);

  return (
    <div className="space-y-6">
      {/* Console 메서드 선택 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">콘솔 메서드 탐색</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {consoleExamples.map((example) => (
            <button
              key={example.method}
              onClick={() => {
                setSelectedExample(example);
              }}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200
                ${
                  selectedExample.method === example.method
                    ? `${getColorClasses(
                        'border-blue-500',
                        'bg-blue-50',
                        'text-blue-700'
                      )}`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="font-mono text-sm font-semibold">{example.method}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 메서드 설명 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-blue-50 to-indigo-50'
      )} rounded-lg p-4`}>
        <h5 className="font-semibold text-blue-800 mb-2">{selectedExample.method}</h5>
        <p className="text-sm text-blue-700">{selectedExample.description}</p>
      </div>

      {/* 코드 예제와 콘솔 출력 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 코드 예제 */}
        <div>
          <h5 className="font-semibold text-gray-800 mb-2">예제 코드</h5>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{selectedExample.code}</pre>
          </div>
        </div>

        {/* 콘솔 출력 */}
        <div>
          <h5 className="font-semibold text-gray-800 mb-2">콘솔 출력 결과</h5>
          <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{selectedExample.output}</pre>
          </div>
        </div>
      </div>

      {/* 디버깅 팁 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-gradient-to-br ${getColorClasses(
          'from-purple-50 to-pink-50',
          'border-purple-200'
        )} rounded-lg p-4 border`}>
          <h5 className="font-semibold text-purple-800 mb-3">🔍 효과적인 디버깅 전략</h5>
          <ul className="text-sm text-purple-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong>문제 재현:</strong> 에러를 일관되게 재현할 수 있는 최소한의 코드 작성</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong>이진 탐색:</strong> 코드를 반으로 나누어 문제 영역을 좁혀나가기</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong>가정 검증:</strong> console.assert()로 가정이 맞는지 확인</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span><strong>상태 추적:</strong> 변수 값의 변화를 단계별로 로깅</span>
            </li>
          </ul>
        </div>

        <div className={`bg-gradient-to-br ${getColorClasses(
          'from-indigo-50 to-purple-50',
          'border-indigo-200'
        )} rounded-lg p-4 border`}>
          <h5 className="font-semibold text-indigo-800 mb-3">⚡ 개발자 도구 활용</h5>
          <ul className="text-sm text-indigo-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">•</span>
              <span><strong>Breakpoints:</strong> 코드 실행을 중단하고 상태 검사</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">•</span>
              <span><strong>Watch:</strong> 특정 변수의 값 변화 모니터링</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">•</span>
              <span><strong>Call Stack:</strong> 함수 호출 순서 파악</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">•</span>
              <span><strong>Network:</strong> API 요청/응답 검사</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 디버거 시뮬레이션 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-gray-800 to-gray-900'
      )} rounded-lg p-6 text-white`}>
        <h5 className="font-semibold text-lg mb-4">🐛 디버거 사용 예제</h5>
        <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
          <pre>{`function calculateTotal(items) {
  let total = 0;
  
  debugger; // 여기서 실행이 중단됩니다
  
  for (let item of items) {
    total += item.price * item.quantity;
  }
  
  return total;
}`}</pre>
        </div>
        <p className="text-sm text-gray-300 mt-4">
          <strong>💡 팁:</strong> debugger 문을 사용하면 개발자 도구가 열려있을 때 
          해당 지점에서 실행이 자동으로 중단됩니다.
        </p>
      </div>
    </div>
  );
};

export { DebuggingPlayground };