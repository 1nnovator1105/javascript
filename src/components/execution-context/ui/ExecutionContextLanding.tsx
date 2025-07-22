"use client";

import { useState } from "react";

// 개념 섹션 인터페이스
interface ConceptSection {
  title: string;
  content: string;
  visual: string;
}

// 실습 예제 인터페이스
interface PracticeExample {
  title: string;
  description: string;
  code: string;
  result: string;
  explanation: string;
  keyPoints: string[];
}

const ExecutionContextLanding = () => {
  // 상태 관리
  const [selectedConcept, setSelectedConcept] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // 개념 설명 데이터
  const concepts: ConceptSection[] = [
    {
      title: "실행 컨텍스트란?",
      content:
        "JavaScript가 코드를 실행하기 위해 만드는 환경입니다. 마치 요리사가 요리를 하기 위해 필요한 모든 도구와 재료를 준비하는 것과 같습니다.",
      visual: "📋",
    },
    {
      title: "실행 컨텍스트 스택",
      content:
        "함수 호출 시 새로운 실행 컨텍스트가 스택에 쌓입니다. 책을 쌓아 올리듯이 가장 나중에 들어온 것이 가장 먼저 나갑니다 (LIFO).",
      visual: "📚",
    },
    {
      title: "생성 단계 vs 실행 단계",
      content:
        "실행 컨텍스트는 생성 단계에서 변수를 메모리에 할당하고, 실행 단계에서 실제 코드를 실행합니다.",
      visual: "⚡",
    },
    {
      title: "스코프 체인",
      content:
        "변수를 찾을 때 현재 스코프부터 시작해서 외부 스코프로 차례대로 올라가며 검색하는 연결고리입니다.",
      visual: "🔗",
    },
  ];

  // 실습 예제 데이터
  const practiceExamples: PracticeExample[] = [
    {
      title: "기본 실행 컨텍스트",
      description: "전역 실행 컨텍스트가 어떻게 생성되고 실행되는지 알아봅시다",
      code: `// 전역 실행 컨텍스트 생성
var globalVar = 'I am global';
let globalLet = 'I am also global';
const globalConst = 'I am constant';

console.log(globalVar);
console.log(globalLet);
console.log(globalConst);`,
      result: "I am global\nI am also global\nI am constant",
      explanation:
        "전역 실행 컨텍스트는 JavaScript 실행 시 가장 먼저 생성되며, 전역 변수들을 관리합니다.",
      keyPoints: [
        "전역 실행 컨텍스트는 프로그램 시작과 함께 생성됩니다",
        "var 변수는 생성 단계에서 undefined로 초기화됩니다",
        "let/const는 생성 단계에서 TDZ(Temporal Dead Zone)에 배치됩니다",
        "실행 단계에서 실제 값이 할당됩니다",
      ],
    },
    {
      title: "함수 실행 컨텍스트",
      description:
        "함수 호출 시 새로운 실행 컨텍스트가 어떻게 생성되는지 살펴봅시다",
      code: `function greet(name) {
  var message = 'Hello, ';
  let greeting = message + name;
  const punctuation = '!';
  
  return greeting + punctuation;
}

var result = greet('JavaScript');
console.log(result);`,
      result: "Hello, JavaScript!",
      explanation:
        "함수 호출 시 새로운 실행 컨텍스트가 스택에 추가되고, 함수 종료 시 제거됩니다.",
      keyPoints: [
        "함수 호출마다 새로운 실행 컨텍스트가 생성됩니다",
        "함수 매개변수는 지역 변수로 취급됩니다",
        "함수 실행 컨텍스트는 스택의 맨 위에 추가됩니다",
        "함수 실행 완료 시 컨텍스트는 스택에서 제거됩니다",
      ],
    },
    {
      title: "중첩 함수와 스코프 체인",
      description:
        "중첩된 함수에서 스코프 체인이 어떻게 작동하는지 확인해봅시다",
      code: `var global = 'global';

function outer() {
  var outer = 'outer';
  
  function inner() {
    var inner = 'inner';
    console.log(inner);  // inner 스코프
    console.log(outer);  // outer 스코프
    console.log(global); // global 스코프
  }
  
  inner();
}

outer();`,
      result: "inner\nouter\nglobal",
      explanation:
        "중첩 함수는 자신의 스코프부터 시작해서 외부 스코프로 차례대로 변수를 검색합니다.",
      keyPoints: [
        "내부 함수는 외부 함수의 변수에 접근할 수 있습니다",
        "변수 검색은 가장 가까운 스코프부터 시작됩니다",
        "스코프 체인을 통해 외부 스코프로 순차적으로 검색합니다",
        "같은 이름의 변수가 있으면 가까운 스코프의 변수가 우선됩니다",
      ],
    },
    {
      title: "호이스팅과 실행 컨텍스트",
      description:
        "호이스팅이 실행 컨텍스트의 생성 단계에서 어떻게 발생하는지 살펴봅시다",
      code: `console.log(hoisted); // undefined (not error)
console.log(notHoisted); // ReferenceError

var hoisted = 'I am hoisted';
let notHoisted = 'I am not hoisted';

function hoistedFunc() {
  return 'I am a hoisted function';
}

console.log(hoistedFunc());`,
      result:
        "undefined\nReferenceError: Cannot access 'notHoisted' before initialization\nI am a hoisted function",
      explanation:
        "var 변수와 함수 선언은 생성 단계에서 호이스팅되지만, let/const는 TDZ에 있어 접근할 수 없습니다.",
      keyPoints: [
        "var 변수는 undefined로 호이스팅됩니다",
        "함수 선언은 완전히 호이스팅됩니다",
        "let/const는 TDZ(Temporal Dead Zone)에 배치됩니다",
        "호이스팅은 실행 컨텍스트의 생성 단계에서 발생합니다",
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* 인트로 섹션 */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          🧠 JavaScript 실행 컨텍스트 완벽 이해하기
        </h1>
        <p className="text-lg text-blue-600 mb-6">
          JavaScript 엔진의 핵심 동작 원리를 차근차근 배워보세요!
        </p>
        <div className="flex justify-center items-center gap-4 text-blue-700">
          <span className="text-2xl">📝</span>
          <span className="text-xl">→</span>
          <span className="text-2xl">🧠</span>
          <span className="text-xl">→</span>
          <span className="text-2xl">⚡</span>
          <span className="text-xl">→</span>
          <span className="text-2xl">💡</span>
        </div>
      </div>

      {/* 개념 이해 섹션 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <h2 className="text-2xl font-semibold mb-6 text-purple-800 flex items-center gap-2">
          🎯 핵심 개념 이해하기
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {concepts.map((concept, index) => (
            <button
              key={index}
              onClick={() => setSelectedConcept(index)}
              className={`p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
                selectedConcept === index
                  ? "border-purple-500 bg-purple-100 shadow-lg"
                  : "border-purple-200 hover:border-purple-300 bg-white"
              }`}
            >
              <div className="text-3xl mb-2">{concept.visual}</div>
              <div className="font-semibold text-purple-800 mb-1">
                {concept.title}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border-2 border-purple-200 p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-800 flex items-center gap-2">
            {concepts[selectedConcept].visual} {concepts[selectedConcept].title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {concepts[selectedConcept].content}
          </p>
        </div>
      </div>

      {/* 실행 컨텍스트 구성 요소 */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <h2 className="text-2xl font-semibold mb-6 text-green-800 flex items-center gap-2">
          🏗️ 실행 컨텍스트 구성 요소
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border-2 border-green-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
              📦 Variable Environment
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="text-sm font-medium text-green-700">특징:</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>var 변수와 함수 선언 저장</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>호이스팅 발생</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>함수 스코프 적용</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-green-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
              🌿 Lexical Environment
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="text-sm font-medium text-green-700">특징:</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>let/const 변수 저장</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>TDZ(Temporal Dead Zone) 관리</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>블록 스코프 적용</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-green-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
              🎯 this Binding
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="text-sm font-medium text-green-700">특징:</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>함수 호출 방식에 따라 결정</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>전역: window 객체</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>메서드: 호출 객체</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 실생활 비유 섹션 */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-800 flex items-center gap-2">
          🏠 실생활 비유로 이해하기
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border-2 border-orange-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-orange-800 flex items-center gap-2">
              🍽️ 식당 주방 비유
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <div className="font-medium">주문서 (실행 컨텍스트)</div>
                  <div className="text-sm">요리에 필요한 모든 정보</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">👨‍🍳</span>
                <div>
                  <div className="font-medium">요리사 (JavaScript 엔진)</div>
                  <div className="text-sm">주문서에 따라 요리 실행</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍽️</span>
                <div>
                  <div className="font-medium">완성된 요리 (실행 결과)</div>
                  <div className="text-sm">최종 결과물</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-orange-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-orange-800 flex items-center gap-2">
              📚 도서관 비유
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <div className="font-medium">책장 (스코프)</div>
                  <div className="text-sm">변수들이 저장된 공간</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">👩‍🏫</span>
                <div>
                  <div className="font-medium">사서 (스코프 체인)</div>
                  <div className="text-sm">책을 찾는 경로와 순서</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <div className="font-medium">책 찾기 (변수 검색)</div>
                  <div className="text-sm">가까운 책장부터 차례대로</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 단계별 학습 섹션 */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center gap-2">
          📚 단계별 학습
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 예제 선택 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-indigo-700 mb-3">
              학습 단계
            </h3>
            {practiceExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedExample === index
                    ? "border-indigo-500 bg-indigo-50 text-indigo-800"
                    : "border-indigo-200 hover:border-indigo-300 text-indigo-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium">{example.title}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {example.description}
                </div>
              </button>
            ))}
          </div>

          {/* 코드 예제 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border-2 border-indigo-200 p-4">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4">
                코드 예제
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{practiceExamples[selectedExample].code}</pre>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-lg border-2 border-indigo-200 p-4">
              <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                실행 결과
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <pre className="text-sm text-green-800 font-mono whitespace-pre-wrap">
                  {practiceExamples[selectedExample].result}
                </pre>
              </div>
            </div>
          </div>

          {/* 설명 및 핵심 포인트 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border-2 border-indigo-200 p-4">
              <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                설명
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {practiceExamples[selectedExample].explanation}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-indigo-200 p-4">
              <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                핵심 포인트
              </h3>
              <div className="space-y-2">
                {practiceExamples[selectedExample].keyPoints.map(
                  (point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-2 bg-indigo-50 rounded"
                    >
                      <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm text-indigo-800">{point}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 실행 컨텍스트 생성과 실행 과정 */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200">
        <h2 className="text-2xl font-semibold mb-6 text-teal-800 flex items-center gap-2">
          ⚡ 실행 컨텍스트 생성과 실행 과정
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border-2 border-teal-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-teal-700 flex items-center gap-2">
              🏗️ 생성 단계 (Creation Phase)
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-teal-500 text-lg">1️⃣</span>
                <div>
                  <div className="font-medium text-teal-800">
                    Variable Environment 생성
                  </div>
                  <div className="text-sm text-teal-600">
                    var 변수와 함수 선언을 undefined로 초기화
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-500 text-lg">2️⃣</span>
                <div>
                  <div className="font-medium text-teal-800">
                    Lexical Environment 생성
                  </div>
                  <div className="text-sm text-teal-600">
                    let/const 변수를 TDZ에 배치
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-500 text-lg">3️⃣</span>
                <div>
                  <div className="font-medium text-teal-800">
                    this 바인딩 결정
                  </div>
                  <div className="text-sm text-teal-600">
                    호출 방식에 따라 this 값 설정
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-teal-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-teal-700 flex items-center gap-2">
              🚀 실행 단계 (Execution Phase)
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-teal-500 text-lg">1️⃣</span>
                <div>
                  <div className="font-medium text-teal-800">
                    코드 한 줄씩 실행
                  </div>
                  <div className="text-sm text-teal-600">
                    선언된 순서대로 코드 실행
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-500 text-lg">2️⃣</span>
                <div>
                  <div className="font-medium text-teal-800">
                    변수에 실제 값 할당
                  </div>
                  <div className="text-sm text-teal-600">
                    let/const는 TDZ에서 해제
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-500 text-lg">3️⃣</span>
                <div>
                  <div className="font-medium text-teal-800">
                    함수 호출 시 새 컨텍스트 생성
                  </div>
                  <div className="text-sm text-teal-600">
                    호출 스택에 새 컨텍스트 추가
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 포인트 */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200">
        <h2 className="text-2xl font-semibold mb-6 text-violet-800 flex items-center gap-2">
          🎯 핵심 포인트
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border-2 border-violet-200 p-4">
            <h3 className="text-lg font-semibold mb-4 text-violet-700 flex items-center gap-2">
              ⚠️ 주의할 점
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg">❌</span>
                <div>
                  <div className="font-medium text-red-800">호이스팅 오해</div>
                  <div className="text-sm text-red-600">
                    var는 undefined로 초기화되지만 let/const는 TDZ에 있음
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg">❌</span>
                <div>
                  <div className="font-medium text-red-800">
                    스코프 체인 무시
                  </div>
                  <div className="text-sm text-red-600">
                    변수 검색은 가장 가까운 스코프부터 시작
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg">❌</span>
                <div>
                  <div className="font-medium text-red-800">
                    this 바인딩 혼동
                  </div>
                  <div className="text-sm text-red-600">
                    함수 호출 방식에 따라 this가 결정됨
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-violet-200 p-4">
            <h3 className="text-lg font-semibold mb-4 text-violet-700 flex items-center gap-2">
              💡 핵심 기억할 점
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-lg">✅</span>
                <div>
                  <div className="font-medium text-green-800">
                    실행 컨텍스트는 환경
                  </div>
                  <div className="text-sm text-green-600">
                    코드 실행에 필요한 모든 정보를 담고 있음
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-lg">✅</span>
                <div>
                  <div className="font-medium text-green-800">
                    스택 구조 (LIFO)
                  </div>
                  <div className="text-sm text-green-600">
                    나중에 들어온 것이 먼저 나가는 구조
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-lg">✅</span>
                <div>
                  <div className="font-medium text-green-800">
                    생성 → 실행 단계
                  </div>
                  <div className="text-sm text-green-600">
                    변수 선언 → 코드 실행의 2단계 과정
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ExecutionContextLanding };
