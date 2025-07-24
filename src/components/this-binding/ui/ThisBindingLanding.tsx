"use client";

import React, { useState } from "react";
import { StudyPageLayout } from "@/components/share/ui/StudyPageLayout";
import { getColorClass } from "@/utils/colorMigration";

interface CodeExample {
  code: string;
  result: string;
  explanation: string;
  bindingType: "default" | "implicit" | "explicit" | "new" | "arrow";
}

const ThisBindingLanding = () => {
  const [selectedRule, setSelectedRule] = useState<
    "default" | "implicit" | "explicit" | "new" | "arrow"
  >("default");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_executionContext, setExecutionContext] = useState<string>("");
  const [thisValue, setThisValue] = useState<string>("undefined");

  // this 바인딩 규칙들
  const bindingRules = {
    default: {
      title: "기본 바인딩",
      description: "독립 함수 호출 시 this는 전역 객체(strict mode에서는 undefined)",
      priority: 4,
      color: "gray",
    },
    implicit: {
      title: "암시적 바인딩",
      description: "객체의 메서드로 호출 시 this는 해당 객체",
      priority: 3,
      color: "blue",
    },
    explicit: {
      title: "명시적 바인딩",
      description: "call, apply, bind로 this를 명시적으로 지정",
      priority: 2,
      color: "blue",
    },
    new: {
      title: "new 바인딩",
      description: "생성자 함수로 호출 시 this는 새로 생성된 객체",
      priority: 1,
      color: "green",
    },
    arrow: {
      title: "화살표 함수",
      description: "렉시컬 스코프의 this를 사용 (바인딩 불가)",
      priority: 0,
      color: "orange",
    },
  };

  // 코드 예제들
  const codeExamples: Record<string, CodeExample> = {
    default: {
      code: `function showThis() {
  console.log(this);
}

showThis(); // 독립 함수 호출

// strict mode
"use strict";
function strictShowThis() {
  console.log(this);
}
strictShowThis();`,
      result: `// 일반 모드: window (브라우저) 또는 global (Node.js)
// strict 모드: undefined`,
      explanation:
        "독립적으로 호출된 함수의 this는 기본적으로 전역 객체를 가리킵니다. strict mode에서는 undefined가 됩니다.",
      bindingType: "default",
    },
    implicit: {
      code: `const obj = {
  name: "JavaScript",
  greet: function() {
    console.log(\`Hello from \${this.name}\`);
  }
};

obj.greet(); // 메서드 호출

// this를 잃는 경우
const greet = obj.greet;
greet(); // this가 전역 객체로 변경됨`,
      result: `// obj.greet(): "Hello from JavaScript"
// greet(): "Hello from undefined"`,
      explanation:
        "메서드로 호출될 때 this는 호출한 객체를 가리킵니다. 하지만 메서드를 변수에 할당하면 암시적 바인딩이 사라집니다.",
      bindingType: "implicit",
    },
    explicit: {
      code: `function introduce(greeting, punctuation) {
  console.log(\`\${greeting}, I'm \${this.name}\${punctuation}\`);
}

const person = { name: "Alice" };

// call - 인자를 개별적으로 전달
introduce.call(person, "Hello", "!");

// apply - 인자를 배열로 전달
introduce.apply(person, ["Hi", "."]);

// bind - 새로운 함수 생성
const boundIntroduce = introduce.bind(person);
boundIntroduce("Hey", "~");`,
      result: `// call: "Hello, I'm Alice!"
// apply: "Hi, I'm Alice."
// bind: "Hey, I'm Alice~"`,
      explanation:
        "call과 apply는 즉시 함수를 실행하며 this를 지정합니다. bind는 this가 영구적으로 바인딩된 새 함수를 반환합니다.",
      bindingType: "explicit",
    },
    new: {
      code: `function Person(name, age) {
  // 1. 새 객체가 생성됨
  // 2. this가 새 객체에 바인딩됨
  this.name = name;
  this.age = age;
  // 3. 프로토타입 연결
  // 4. this 반환 (명시적 반환이 없으면)
}

const alice = new Person("Alice", 25);
console.log(alice.name); // "Alice"

// new 바인딩은 명시적 바인딩보다 우선순위가 높음
const obj = {};
const boundPerson = Person.bind(obj);
const bob = new boundPerson("Bob", 30);
console.log(bob.name); // "Bob" (obj가 아닌 새 객체)`,
      result: `// alice: Person { name: "Alice", age: 25 }
// bob: Person { name: "Bob", age: 30 }`,
      explanation:
        "new 키워드로 함수를 호출하면 새 객체가 생성되고, this는 그 새 객체에 바인딩됩니다. new 바인딩은 가장 높은 우선순위를 가집니다.",
      bindingType: "new",
    },
    arrow: {
      code: `const obj = {
  name: "Outer",
  regular: function() {
    console.log("Regular:", this.name);
    
    const arrow = () => {
      console.log("Arrow:", this.name);
    };
    arrow();
  },
  arrow: () => {
    console.log("Method Arrow:", this.name);
  }
};

obj.regular();
obj.arrow();

// 화살표 함수는 bind로도 this를 변경할 수 없음
const boundArrow = obj.arrow.bind({ name: "Bound" });
boundArrow();`,
      result: `// Regular: "Outer"
// Arrow: "Outer" (렉시컬 this)
// Method Arrow: undefined (전역 this)
// boundArrow: undefined (bind 무시됨)`,
      explanation:
        "화살표 함수는 자신만의 this를 가지지 않고, 렉시컬 스코프의 this를 사용합니다. bind, call, apply로도 this를 변경할 수 없습니다.",
      bindingType: "arrow",
    },
  };

  // this 값 시뮬레이터
  const simulateThisBinding = (code: string, bindingType: string) => {
    setExecutionContext(code);
    
    switch (bindingType) {
      case "default":
        setThisValue("window (또는 undefined in strict mode)");
        break;
      case "implicit":
        setThisValue("{ 호출한 객체 }");
        break;
      case "explicit":
        setThisValue("{ call/apply/bind로 지정한 객체 }");
        break;
      case "new":
        setThisValue("{ 새로 생성된 객체 }");
        break;
      case "arrow":
        setThisValue("{ 렉시컬 스코프의 this }");
        break;
    }
  };

  // this 결정 플로우차트
  const [currentStep, setCurrentStep] = useState(0);
  const flowchartSteps = [
    { question: "함수가 화살표 함수인가?", yes: "arrow", no: 1 },
    { question: "new로 호출되었는가?", yes: "new", no: 2 },
    { question: "call/apply/bind로 호출되었는가?", yes: "explicit", no: 3 },
    { question: "객체의 메서드로 호출되었는가?", yes: "implicit", no: "default" },
  ];

  return (
    <StudyPageLayout
      title="JavaScript this 바인딩의 모든 것"
      subtitle="this 키워드가 결정되는 4가지 규칙을 인터랙티브하게 학습합니다"
      showBackButton
    >
      <div className="space-y-8">
        {/* this 바인딩 규칙 선택 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">this 바인딩 규칙</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(bindingRules).map(([key, rule]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedRule(
                    key as "default" | "implicit" | "explicit" | "new" | "arrow"
                  );
                  simulateThisBinding(
                    codeExamples[key].code,
                    codeExamples[key].bindingType
                  );
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRule === key
                    ? key === 'explicit' 
                      ? `border-blue-500 ${getColorClass('bg-purple-50')}`
                      : `border-${rule.color}-500 bg-${rule.color}-50`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-lg font-bold mb-1">{rule.title}</div>
                <div className="text-xs text-gray-600">
                  우선순위: {rule.priority}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              {bindingRules[selectedRule].description}
            </p>
          </div>
        </div>

        {/* 코드 예제와 설명 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 코드 예제 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">코드 예제</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>{codeExamples[selectedRule].code}</pre>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">실행 결과</h4>
              <pre className="font-mono text-sm text-gray-700">
                {codeExamples[selectedRule].result}
              </pre>
            </div>
          </div>

          {/* this 값 시각화 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">this 값 추적기</h3>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold mb-2">현재 this 값</h4>
                <div className="font-mono text-lg text-yellow-800">
                  {thisValue}
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">설명</h4>
                <p className="text-sm text-blue-800">
                  {codeExamples[selectedRule].explanation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* this 결정 플로우차트 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">
            this 결정 플로우차트 (인터랙티브)
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              {currentStep < flowchartSteps.length && (
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-6 mb-4">
                    <h4 className="text-xl font-semibold mb-4">
                      {
                        flowchartSteps[
                          typeof currentStep === "number" ? currentStep : 0
                        ].question
                      }
                    </h4>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          const step = flowchartSteps[currentStep];
                          if (typeof step.yes === "string") {
                            setSelectedRule(
                              step.yes as
                                | "default"
                                | "implicit"
                                | "explicit"
                                | "new"
                                | "arrow"
                            );
                            setCurrentStep(0);
                          } else {
                            setCurrentStep(step.yes);
                          }
                        }}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        예
                      </button>
                      <button
                        onClick={() => {
                          const step = flowchartSteps[currentStep];
                          if (typeof step.no === "string") {
                            setSelectedRule(
                              step.no as
                                | "default"
                                | "implicit"
                                | "explicit"
                                | "new"
                                | "arrow"
                            );
                            setCurrentStep(0);
                          } else {
                            setCurrentStep(step.no);
                          }
                        }}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        아니오
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    처음부터 다시
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 실전 퀴즈 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">실전 퀴즈</h3>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">문제 1</h4>
              <pre className="font-mono text-sm mb-4">{`const obj = {
  name: "Test",
  method: function() {
    setTimeout(function() {
      console.log(this.name);
    }, 100);
  }
};
obj.method(); // 출력 결과는?`}</pre>
              <details className="cursor-pointer">
                <summary className="text-blue-600 hover:text-blue-800">
                  정답 보기
                </summary>
                <div className="mt-2 p-3 bg-blue-50 rounded">
                  <p className="text-sm">
                    <strong>undefined</strong> - setTimeout의 콜백 함수는
                    나중에 독립적으로 호출되므로 기본 바인딩이 적용됩니다.
                  </p>
                </div>
              </details>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">문제 2</h4>
              <pre className="font-mono text-sm mb-4">{`const obj = {
  name: "Test",
  method: function() {
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  }
};
obj.method(); // 출력 결과는?`}</pre>
              <details className="cursor-pointer">
                <summary className="text-blue-600 hover:text-blue-800">
                  정답 보기
                </summary>
                <div className="mt-2 p-3 bg-blue-50 rounded">
                  <p className="text-sm">
                    <strong>&quot;Test&quot;</strong> - 화살표 함수는 렉시컬 this를
                    사용하므로 method의 this(obj)를 그대로 사용합니다.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* 우선순위 정리 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">this 바인딩 우선순위</h3>
          <div className="space-y-2">
            {[
              { rule: "화살표 함수", desc: "렉시컬 바인딩 (변경 불가)" },
              { rule: "new 바인딩", desc: "가장 높은 우선순위" },
              { rule: "명시적 바인딩", desc: "call, apply, bind" },
              { rule: "암시적 바인딩", desc: "객체 메서드 호출" },
              { rule: "기본 바인딩", desc: "가장 낮은 우선순위" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded ${
                  index === 0
                    ? "bg-orange-50"
                    : index === 1
                    ? "bg-green-50"
                    : index === 2
                    ? getColorClass('bg-purple-50')
                    : index === 3
                    ? "bg-blue-50"
                    : "bg-gray-50"
                }`}
              >
                <div className="text-2xl font-bold mr-4 text-gray-400">
                  {index === 0 ? "특별" : index}
                </div>
                <div>
                  <div className="font-semibold">{item.rule}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
};

export default ThisBindingLanding;