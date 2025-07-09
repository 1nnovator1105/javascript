"use client";

import React, { useState } from "react";

// 프로토타입 체인 노드 인터페이스
interface PrototypeNode {
  id: string;
  name: string;
  type: string;
  properties: Record<string, string>;
  description: string;
}

// 개념 설명 인터페이스
interface ConceptSection {
  title: string;
  content: string;
  example?: string;
  visual?: string;
}

// 실습 예제 인터페이스
interface PracticeExample {
  title: string;
  description: string;
  code: string;
  result: string;
  explanation: string;
}

const PrototypeLanding = () => {
  // 상태 관리
  const [selectedConcept, setSelectedConcept] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [animationState, setAnimationState] = useState({
    isSearching: false,
    currentStep: 0,
    highlightedNodes: [] as string[],
  });
  const [searchProperty, setSearchProperty] = useState("name");
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    path: string[];
    value: string;
  } | null>(null);

  // 개념 설명 데이터
  const concepts: ConceptSection[] = [
    {
      title: "프로토타입이란?",
      content:
        "프로토타입은 JavaScript 객체가 다른 객체로부터 기능을 '물려받는' 방식입니다. 마치 부모님으로부터 특징을 물려받는 것과 같습니다.",
      visual: "👨‍👩‍👧‍👦",
    },
    {
      title: "프로토타입 체인",
      content:
        "객체에서 찾는 기능이 없으면, 부모 객체에서 찾고, 거기에도 없으면 할아버지 객체에서 찾습니다. 이런 연결고리를 '프로토타입 체인'이라고 합니다.",
      visual: "🔗",
    },
    {
      title: "왜 필요한가?",
      content:
        "모든 객체마다 같은 기능을 복사하지 않고, 한 곳에서 관리하면 메모리도 절약하고 코드도 깔끔해집니다.",
      visual: "💡",
    },
    {
      title: "실제 사용 예시",
      content:
        "Array의 push(), pop() 메서드나 Object의 toString() 메서드 등이 모두 프로토타입을 통해 제공됩니다.",
      visual: "⚡",
    },
  ];

  // 프로토타입 체인 데이터 (단순화)
  const prototypeChain: PrototypeNode[] = [
    {
      id: "myDog",
      name: "myDog",
      type: "객체 인스턴스",
      description: "실제로 만들어진 강아지 객체",
      properties: {
        name: '"멍멍이"',
        age: "3",
        breed: '"골든 리트리버"',
      },
    },
    {
      id: "Dog.prototype",
      name: "Dog.prototype",
      type: "생성자 프로토타입",
      description: "모든 강아지가 공통으로 가지는 기능",
      properties: {
        bark: 'function() { return this.name + "이 멍멍!"; }',
        eat: 'function() { return this.name + "이 먹는다"; }',
      },
    },
    {
      id: "Animal.prototype",
      name: "Animal.prototype",
      type: "부모 프로토타입",
      description: "모든 동물이 공통으로 가지는 기능",
      properties: {
        breathe: 'function() { return this.name + "이 숨을 쉰다"; }',
        sleep: 'function() { return this.name + "이 잠을 잔다"; }',
      },
    },
    {
      id: "Object.prototype",
      name: "Object.prototype",
      type: "최상위 프로토타입",
      description: "모든 객체가 공통으로 가지는 기본 기능",
      properties: {
        toString: 'function() { return "[object Object]"; }',
        hasOwnProperty: "function(prop) { ... }",
      },
    },
  ];

  // 실습 예제 데이터
  const practiceExamples: PracticeExample[] = [
    {
      title: "기본 객체 생성",
      description:
        "생성자 함수로 객체를 만들고 프로토타입에 메서드를 추가하는 기본 방법",
      code: `// 1. 생성자 함수 정의
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

// 2. 프로토타입에 메서드 추가
Dog.prototype.bark = function() {
  return this.name + "이 멍멍!";
};

// 3. 객체 생성 및 사용
const myDog = new Dog("멍멍이", "골든 리트리버");
console.log(myDog.bark());`,
      result: "멍멍이가 멍멍!",
      explanation:
        "생성자 함수로 만든 모든 객체는 자동으로 프로토타입의 메서드를 사용할 수 있습니다.",
    },
    {
      title: "상속 관계 만들기",
      description: "Animal을 상속받는 Dog를 만들어 계층 구조를 이해해봅시다",
      code: `// 1. 부모 생성자
function Animal(name) {
  this.name = name;
}

Animal.prototype.breathe = function() {
  return this.name + "이 숨을 쉰다";
};

// 2. 자식 생성자
function Dog(name, breed) {
  Animal.call(this, name); // 부모 생성자 호출
  this.breed = breed;
}

// 3. 상속 설정
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 4. 자식만의 메서드 추가
Dog.prototype.bark = function() {
  return this.name + "이 멍멍!";
};

const myDog = new Dog("멍멍이", "골든 리트리버");
console.log(myDog.breathe()); // 부모 메서드
console.log(myDog.bark());    // 자식 메서드`,
      result: "멍멍이가 숨을 쉰다\n멍멍이가 멍멍!",
      explanation:
        "Object.create()를 사용하여 프로토타입 상속을 구현할 수 있습니다.",
    },
    {
      title: "프로토타입 확인하기",
      description:
        "객체의 프로토타입 관계를 확인하는 다양한 방법들을 알아봅시다",
      code: `const myDog = new Dog("멍멍이", "골든 리트리버");

// 1. instanceof 연산자
console.log(myDog instanceof Dog);     // true
console.log(myDog instanceof Animal);  // true
console.log(myDog instanceof Object);  // true

// 2. isPrototypeOf 메서드
console.log(Dog.prototype.isPrototypeOf(myDog));     // true
console.log(Animal.prototype.isPrototypeOf(myDog));  // true

// 3. 프로토타입 체인 확인
console.log(Object.getPrototypeOf(myDog) === Dog.prototype);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);

// 4. 프로퍼티 소유 확인
console.log(myDog.hasOwnProperty('name'));  // true
console.log(myDog.hasOwnProperty('bark'));  // false (프로토타입 메서드)`,
      result: "true\ntrue\ntrue\ntrue\ntrue\ntrue\ntrue\ntrue\nfalse",
      explanation:
        "다양한 방법으로 프로토타입 관계와 프로퍼티 소유를 확인할 수 있습니다.",
    },
  ];

  // 애니메이션 검색 함수
  const searchWithAnimation = (property: string) => {
    setSearchResult(null);
    setAnimationState({
      isSearching: true,
      currentStep: 0,
      highlightedNodes: [],
    });

    const steps = [
      "myDog",
      "Dog.prototype",
      "Animal.prototype",
      "Object.prototype",
    ];
    let currentStep = 0;

    const animate = () => {
      if (currentStep < steps.length) {
        setAnimationState((prev) => ({
          ...prev,
          currentStep,
          highlightedNodes: [steps[currentStep]],
        }));

        const currentNode = prototypeChain[currentStep];
        if (currentNode && currentNode.properties[property] !== undefined) {
          setTimeout(() => {
            setSearchResult({
              found: true,
              path: steps.slice(0, currentStep + 1),
              value: currentNode.properties[property],
            });

            setAnimationState({
              isSearching: false,
              currentStep: currentStep,
              highlightedNodes: [steps[currentStep]],
            });
          }, 800);
          return;
        }

        currentStep++;

        if (currentStep < steps.length) {
          setTimeout(animate, 1000);
        } else {
          setTimeout(() => {
            setSearchResult({
              found: false,
              path: steps,
              value: "",
            });

            setAnimationState({
              isSearching: false,
              currentStep: 0,
              highlightedNodes: [],
            });
          }, 800);
        }
      }
    };

    animate();
  };

  const resetSearch = () => {
    setSearchResult(null);
    setAnimationState({
      isSearching: false,
      currentStep: 0,
      highlightedNodes: [],
    });
  };

  return (
    <div className="space-y-12">
      {/* 인트로 섹션 */}
      <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">
          🧬 JavaScript 프로토타입 쉽게 이해하기
        </h1>
        <p className="text-lg text-purple-600 mb-6">
          복잡해 보이는 프로토타입을 실생활 예시와 시각적 설명으로 쉽게
          배워보세요!
        </p>
        <div className="flex justify-center items-center gap-4 text-purple-700">
          <span className="text-2xl">👨‍👩‍👧‍👦</span>
          <span className="text-xl">→</span>
          <span className="text-2xl">🔗</span>
          <span className="text-xl">→</span>
          <span className="text-2xl">💡</span>
        </div>
      </div>

      {/* 개념 이해 섹션 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800 flex items-center gap-2">
          🤔 개념 이해하기
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {concepts.map((concept, index) => (
            <button
              key={index}
              onClick={() => setSelectedConcept(index)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedConcept === index
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-blue-200 hover:border-blue-300 text-blue-700"
              }`}
            >
              <div className="text-2xl mb-2">{concept.visual}</div>
              <div className="font-medium">{concept.title}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
            <span className="text-2xl">{concepts[selectedConcept].visual}</span>
            {concepts[selectedConcept].title}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {concepts[selectedConcept].content}
          </p>
        </div>
      </div>

      {/* 실생활 비유 섹션 */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <h2 className="text-2xl font-semibold mb-6 text-green-800 flex items-center gap-2">
          🏠 실생활 비유로 이해하기
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border-2 border-green-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
              🚗 자동차로 이해하기
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚙</span>
                <div>
                  <div className="font-medium">
                    모든 교통수단 (Object.prototype)
                  </div>
                  <div className="text-sm">이동수단이 가지는 기본 특성</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚗</span>
                <div>
                  <div className="font-medium">자동차 (Animal.prototype)</div>
                  <div className="text-sm">엔진으로 움직이는 차량의 특성</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚙</span>
                <div>
                  <div className="font-medium">SUV (Dog.prototype)</div>
                  <div className="text-sm">SUV 타입 차량만의 특성</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚐</span>
                <div>
                  <div className="font-medium">내 차 (myDog)</div>
                  <div className="text-sm">
                    구체적인 번호판을 가진 실제 차량
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-green-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
              🐕 강아지로 이해하기
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <div className="font-medium">모든 생명체</div>
                  <div className="text-sm">생명이 있는 모든 것의 기본 특성</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐾</span>
                <div>
                  <div className="font-medium">동물</div>
                  <div className="text-sm">동물들이 공통으로 가지는 특성</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐕</span>
                <div>
                  <div className="font-medium">강아지</div>
                  <div className="text-sm">강아지 종류가 가지는 특성</div>
                </div>
              </div>
              <div className="ml-4 text-gray-400">↓</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🦮</span>
                <div>
                  <div className="font-medium">멍멍이</div>
                  <div className="text-sm">
                    구체적인 이름을 가진 실제 강아지
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 프로토타입 체인 시각화 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <h2 className="text-2xl font-semibold mb-6 text-purple-800 flex items-center gap-2">
          🔍 프로토타입 체인 탐색 체험하기
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 체인 시각화 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                프로토타입 체인 구조
              </h3>
              <div className="space-y-4">
                {prototypeChain.map((node, index) => (
                  <div
                    key={node.id}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-500 ${
                      animationState.highlightedNodes.includes(node.name)
                        ? "border-green-500 bg-green-100 scale-105 shadow-lg animate-pulse"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    {/* 연결선 */}
                    {index > 0 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="text-purple-400 text-2xl">↑</div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-purple-800 mb-1">
                          {node.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {node.description}
                        </p>
                        <div className="space-y-1">
                          {Object.entries(node.properties).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="font-mono text-purple-600">
                                  {key}:
                                </span>
                                <span className="text-gray-700 truncate">
                                  {value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 탐색 컨트롤 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                프로퍼티 탐색하기
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    찾고 싶은 기능
                  </label>
                  <input
                    type="text"
                    value={searchProperty}
                    onChange={(e) => setSearchProperty(e.target.value)}
                    placeholder="예: name, bark, breathe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  onClick={() =>
                    searchProperty.trim() &&
                    searchWithAnimation(searchProperty.trim())
                  }
                  disabled={
                    animationState.isSearching || !searchProperty.trim()
                  }
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {animationState.isSearching
                    ? "🔍 탐색 중..."
                    : "🔍 탐색 시작"}
                </button>

                {/* 빠른 탐색 버튼 */}
                <div className="flex flex-wrap gap-2">
                  {["name", "bark", "breathe", "toString"].map((prop) => (
                    <button
                      key={prop}
                      onClick={() => searchWithAnimation(prop)}
                      disabled={animationState.isSearching}
                      className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 disabled:opacity-50 transition-colors"
                    >
                      {prop}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 탐색 결과 */}
            {searchResult && (
              <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
                <h3 className="text-lg font-semibold mb-3 text-purple-700">
                  탐색 결과
                </h3>
                <div
                  className={`p-4 rounded-lg border-2 ${
                    searchResult.found
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  }`}
                >
                  {searchResult.found ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-800">
                        <span className="text-xl">✅</span>
                        <span className="font-medium">찾았습니다!</span>
                      </div>
                      <div className="text-sm text-green-700">
                        <span className="font-medium">위치:</span>{" "}
                        {searchResult.path.join(" → ")}
                      </div>
                      <div className="text-sm text-green-700">
                        <span className="font-medium">값:</span>{" "}
                        {searchResult.value}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-800">
                      <span className="text-xl">❌</span>
                      <span className="font-medium">찾을 수 없습니다</span>
                    </div>
                  )}
                  <button
                    onClick={resetSearch}
                    className="mt-3 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    다시 탐색
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 실습 예제 */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-800 flex items-center gap-2">
          💻 실습으로 배우기
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 예제 선택 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-orange-700 mb-3">
              단계별 학습
            </h3>
            {practiceExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedExample === index
                    ? "border-orange-500 bg-orange-50 text-orange-800"
                    : "border-orange-200 hover:border-orange-300 text-orange-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
            <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
              <h3 className="text-lg font-semibold mb-4 text-orange-700">
                코드 예제
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{practiceExamples[selectedExample].code}</pre>
              </div>
            </div>
          </div>

          {/* 결과 및 설명 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
              <h3 className="text-lg font-semibold mb-3 text-orange-700">
                실행 결과
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <pre className="text-sm text-green-800 font-mono whitespace-pre-wrap">
                  {practiceExamples[selectedExample].result}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
              <h3 className="text-lg font-semibold mb-3 text-orange-700">
                설명
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {practiceExamples[selectedExample].explanation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 포인트 */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
        <h2 className="text-2xl font-semibold mb-6 text-red-800 flex items-center gap-2">
          ⚠️ 주의사항 & 핵심 포인트
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border-2 border-red-200 p-4">
            <h3 className="text-lg font-semibold mb-4 text-red-700 flex items-center gap-2">
              🚨 흔한 실수들
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg">❌</span>
                <div>
                  <div className="font-medium text-red-800">
                    prototype vs __proto__
                  </div>
                  <div className="text-sm text-red-600">
                    prototype은 함수의 속성, __proto__는 객체의 숨겨진 링크
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg">❌</span>
                <div>
                  <div className="font-medium text-red-800">
                    프로토타입 오염
                  </div>
                  <div className="text-sm text-red-600">
                    Object.prototype 수정하면 모든 객체에 영향
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg">❌</span>
                <div>
                  <div className="font-medium text-red-800">성능 문제</div>
                  <div className="text-sm text-red-600">
                    긴 프로토타입 체인은 속도 저하 가능
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-green-200 p-4">
            <h3 className="text-lg font-semibold mb-4 text-green-700 flex items-center gap-2">
              💡 핵심 기억할 점
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-lg">✅</span>
                <div>
                  <div className="font-medium text-green-800">상속의 핵심</div>
                  <div className="text-sm text-green-600">
                    코드 재사용과 메모리 효율성
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-lg">✅</span>
                <div>
                  <div className="font-medium text-green-800">탐색 순서</div>
                  <div className="text-sm text-green-600">
                    자신 → 프로토타입 → 부모 → 최상위
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-lg">✅</span>
                <div>
                  <div className="font-medium text-green-800">현실 사용</div>
                  <div className="text-sm text-green-600">
                    Array, Object 등 내장 객체도 프로토타입 활용
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 마무리 */}
      <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">
          🎉 축하합니다!
        </h2>
        <p className="text-lg text-indigo-600 mb-6">
          JavaScript 프로토타입의 기본 개념을 이해했습니다!
        </p>
        <div className="flex justify-center items-center gap-4 text-indigo-700">
          <div className="text-center">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-sm">더 공부하기</div>
          </div>
          <span className="text-xl">→</span>
          <div className="text-center">
            <div className="text-2xl mb-1">💻</div>
            <div className="text-sm">실습 해보기</div>
          </div>
          <span className="text-xl">→</span>
          <div className="text-center">
            <div className="text-2xl mb-1">🚀</div>
            <div className="text-sm">프로젝트 적용</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PrototypeLanding };
