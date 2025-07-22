"use client";
import React, { useState, useEffect, useMemo } from "react";

const ArrayMethodsLanding = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("map");
  const [inputArray, setInputArray] = useState<string>("[1, 2, 3, 4, 5]");
  const [currentCode, setCurrentCode] = useState<string>("");
  const [result, setResult] = useState<unknown>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const arrayMethods = useMemo(() => ({
    map: {
      title: "map() - 변환",
      description: "각 요소를 변환하여 새로운 배열을 생성합니다",
      category: "변환",
      difficulty: "초급",
      icon: "🔄",
      color: "blue",
      examples: [
        {
          name: "숫자 두 배로 만들기",
          code: "arr.map(num => num * 2)",
          input: "[1, 2, 3, 4, 5]",
        },
        {
          name: "객체에서 특정 속성 추출",
          code: "arr.map(user => user.name)",
          input:
            '[{"name": "김철수", "age": 25}, {"name": "이영희", "age": 30}]',
        },
        {
          name: "문자열을 대문자로 변환",
          code: "arr.map(str => str.toUpperCase())",
          input: '["hello", "world", "javascript"]',
        },
      ],
      realWorldUse: "API 응답 데이터 가공, 컴포넌트 렌더링, 데이터 포맷 변경",
    },
    filter: {
      title: "filter() - 필터링",
      description: "조건에 맞는 요소들만 골라 새로운 배열을 생성합니다",
      category: "필터링",
      difficulty: "초급",
      icon: "🔍",
      color: "green",
      examples: [
        {
          name: "짝수만 골라내기",
          code: "arr.filter(num => num % 2 === 0)",
          input: "[1, 2, 3, 4, 5, 6, 7, 8]",
        },
        {
          name: "성인만 필터링",
          code: "arr.filter(user => user.age >= 18)",
          input:
            '[{"name": "김철수", "age": 25}, {"name": "이영희", "age": 16}]',
        },
        {
          name: "빈 문자열 제거",
          code: "arr.filter(str => str.length > 0)",
          input: '["hello", "", "world", "", "js"]',
        },
      ],
      realWorldUse: "검색 기능, 조건부 렌더링, 데이터 정제",
    },
    reduce: {
      title: "reduce() - 집계",
      description: "배열의 모든 요소를 하나의 값으로 집계합니다",
      category: "집계",
      difficulty: "중급",
      icon: "📊",
      color: "purple",
      examples: [
        {
          name: "숫자 배열 합계",
          code: "arr.reduce((sum, num) => sum + num, 0)",
          input: "[1, 2, 3, 4, 5]",
        },
        {
          name: "최댓값 찾기",
          code: "arr.reduce((max, num) => Math.max(max, num), 0)",
          input: "[3, 7, 2, 9, 1, 8]",
        },
        {
          name: "객체로 그룹핑",
          code: "arr.reduce((acc, item) => { acc[item.category] = (acc[item.category] || []).concat(item); return acc; }, {})",
          input:
            '[{"name": "사과", "category": "과일"}, {"name": "당근", "category": "채소"}]',
        },
      ],
      realWorldUse: "장바구니 총액 계산, 데이터 통계, 객체 변환",
    },
    find: {
      title: "find() / findIndex()",
      description: "조건에 맞는 첫 번째 요소나 인덱스를 찾습니다",
      category: "검색",
      difficulty: "초급",
      icon: "🎯",
      color: "orange",
      examples: [
        {
          name: "첫 번째 짝수 찾기",
          code: "arr.find(num => num % 2 === 0)",
          input: "[1, 3, 4, 5, 6]",
        },
        {
          name: "특정 ID 가진 사용자 찾기",
          code: "arr.find(user => user.id === 2)",
          input: '[{"id": 1, "name": "김철수"}, {"id": 2, "name": "이영희"}]',
        },
        {
          name: "인덱스 찾기",
          code: "arr.findIndex(item => item === 'target')",
          input: '["first", "target", "last"]',
        },
      ],
      realWorldUse: "사용자 검색, 특정 데이터 조회, 배열에서 요소 위치 찾기",
    },
    some: {
      title: "some() / every()",
      description: "배열의 요소들이 조건을 만족하는지 검사합니다",
      category: "검증",
      difficulty: "초급",
      icon: "✅",
      color: "emerald",
      examples: [
        {
          name: "하나라도 짝수인지 확인",
          code: "arr.some(num => num % 2 === 0)",
          input: "[1, 3, 4, 5]",
        },
        {
          name: "모두 양수인지 확인",
          code: "arr.every(num => num > 0)",
          input: "[1, 2, 3, 4, 5]",
        },
        {
          name: "모든 사용자가 성인인지 확인",
          code: "arr.every(user => user.age >= 18)",
          input: '[{"age": 25}, {"age": 30}, {"age": 17}]',
        },
      ],
      realWorldUse: "폼 유효성 검사, 권한 체크, 조건부 로직",
    },
    sort: {
      title: "sort() - 정렬",
      description: "배열 요소를 정렬합니다 (원본 배열 변경)",
      category: "정렬",
      difficulty: "중급",
      icon: "📶",
      color: "red",
      examples: [
        {
          name: "숫자 오름차순 정렬",
          code: "arr.sort((a, b) => a - b)",
          input: "[3, 1, 4, 1, 5, 9, 2, 6]",
        },
        {
          name: "이름으로 정렬",
          code: "arr.sort((a, b) => a.name.localeCompare(b.name))",
          input: '[{"name": "Charlie"}, {"name": "Alice"}, {"name": "Bob"}]',
        },
        {
          name: "나이 내림차순 정렬",
          code: "arr.sort((a, b) => b.age - a.age)",
          input: '[{"age": 25}, {"age": 30}, {"age": 20}]',
        },
      ],
      realWorldUse: "데이터 테이블 정렬, 검색 결과 정렬, 우선순위 정렬",
    },
  }), []);

  const modernMethods = [
    {
      name: "flat()",
      description: "중첩 배열을 평탄화",
      example: "[1, [2, 3], [4, [5]]].flat(2)",
      result: "[1, 2, 3, 4, 5]",
    },
    {
      name: "flatMap()",
      description: "map + flat을 한 번에",
      example: "['Hello', 'World'].flatMap(word => word.split(''))",
      result: "['H','e','l','l','o','W','o','r','l','d']",
    },
    {
      name: "includes()",
      description: "특정 요소 포함 여부 확인",
      example: "[1, 2, 3].includes(2)",
      result: "true",
    },
    {
      name: "Array.from()",
      description: "유사 배열을 배열로 변환",
      example: "Array.from('Hello')",
      result: "['H', 'e', 'l', 'l', 'o']",
    },
  ];

  const executeCode = () => {
    setIsExecuting(true);
    try {
      JSON.parse(inputArray); // Validate input array format
      const code = `const arr = ${inputArray}; ${currentCode}`;
      const result = eval(code);
      setResult(result);
    } catch (error) {
      setResult(
        `오류: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsExecuting(false);
    }
  };

  const loadExample = (example: { input: string; code: string; name: string }) => {
    setInputArray(example.input);
    setCurrentCode(example.code);
  };

  const getMethodColor = (method: string) => {
    const colors = {
      map: "from-blue-50 to-indigo-50 border-blue-200",
      filter: "from-green-50 to-emerald-50 border-green-200",
      reduce: "from-purple-50 to-violet-50 border-purple-200",
      find: "from-orange-50 to-amber-50 border-orange-200",
      some: "from-emerald-50 to-teal-50 border-emerald-200",
      sort: "from-red-50 to-rose-50 border-red-200",
    };
    return colors[method as keyof typeof colors] || colors.map;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "초급":
        return "bg-green-100 text-green-800 border-green-200";
      case "중급":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  useEffect(() => {
    if (
      selectedMethod &&
      arrayMethods[selectedMethod as keyof typeof arrayMethods]
    ) {
      const method = arrayMethods[selectedMethod as keyof typeof arrayMethods];
      const firstExample = method.examples[0];
      setInputArray(firstExample.input);
      setCurrentCode(firstExample.code);
    }
  }, [selectedMethod, arrayMethods]);

  return (
    <div className="space-y-8">
      {/* 소개 섹션 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <h2 className="text-2xl font-bold text-purple-900 mb-3">
          🎯 JavaScript 배열 메서드 완전 정복
        </h2>
        <p className="text-purple-800 mb-4">
          실무에서 가장 많이 사용하는 배열 메서드들을 인터랙티브 실습으로
          마스터하세요. 각 메서드의 특징과 실제 사용 사례를 통해 함수형
          프로그래밍의 기초를 다집니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/60 rounded-lg p-3">
            <h3 className="font-semibold text-purple-900 mb-1">🔄 변환</h3>
            <p className="text-purple-700">map, flatMap</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <h3 className="font-semibold text-purple-900 mb-1">🔍 필터링</h3>
            <p className="text-purple-700">filter, find</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <h3 className="font-semibold text-purple-900 mb-1">📊 집계</h3>
            <p className="text-purple-700">reduce, sort</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <h3 className="font-semibold text-purple-900 mb-1">✅ 검증</h3>
            <p className="text-purple-700">some, every</p>
          </div>
        </div>
      </div>

      {/* 메서드 선택 탭 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {Object.entries(arrayMethods).map(([key, method]) => (
            <button
              key={key}
              onClick={() => setSelectedMethod(key)}
              className={`p-4 text-center transition-colors border-b-2 ${
                selectedMethod === key
                  ? "bg-blue-50 text-blue-700 border-blue-500"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-transparent"
              }`}
            >
              <div className="text-2xl mb-1">{method.icon}</div>
              <div className="text-sm font-semibold">
                {method.title.split(" ")[0]}
              </div>
            </button>
          ))}
        </div>

        {/* 선택된 메서드 상세 */}
        {selectedMethod &&
          arrayMethods[selectedMethod as keyof typeof arrayMethods] && (
            <div
              className={`p-6 bg-gradient-to-br ${getMethodColor(
                selectedMethod
              )}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {
                      arrayMethods[selectedMethod as keyof typeof arrayMethods]
                        .title
                    }
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {
                      arrayMethods[selectedMethod as keyof typeof arrayMethods]
                        .description
                    }
                  </p>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        arrayMethods[
                          selectedMethod as keyof typeof arrayMethods
                        ].difficulty
                      )}`}
                    >
                      {
                        arrayMethods[
                          selectedMethod as keyof typeof arrayMethods
                        ].difficulty
                      }
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {
                        arrayMethods[
                          selectedMethod as keyof typeof arrayMethods
                        ].category
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* 예제 버튼들 */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  📝 예제 선택:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {arrayMethods[
                    selectedMethod as keyof typeof arrayMethods
                  ].examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadExample(example)}
                      className="px-4 py-2 bg-white/70 hover:bg-white border border-white/50 hover:border-gray-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      {example.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 실습 에리어 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    입력 배열:
                  </h4>
                  <textarea
                    value={inputArray}
                    onChange={(e) => setInputArray(e.target.value)}
                    className="w-full h-20 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="[1, 2, 3, 4, 5]"
                  />

                  <h4 className="font-semibold text-gray-800 mb-3 mt-4">
                    코드:
                  </h4>
                  <textarea
                    value={currentCode}
                    onChange={(e) => setCurrentCode(e.target.value)}
                    className="w-full h-20 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="arr.map(num => num * 2)"
                  />

                  <button
                    onClick={executeCode}
                    disabled={isExecuting}
                    className={`w-full mt-4 px-4 py-3 rounded-lg font-semibold transition-colors ${
                      isExecuting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isExecuting ? "실행 중..." : "🚀 코드 실행"}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    실행 결과:
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4 h-32 overflow-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      {result !== null
                        ? JSON.stringify(result, null, 2)
                        : "코드를 실행해보세요!"}
                    </pre>
                  </div>

                  <div className="mt-4 p-4 bg-white/70 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">
                      💡 실무 활용:
                    </h5>
                    <p className="text-sm text-gray-600">
                      {
                        arrayMethods[
                          selectedMethod as keyof typeof arrayMethods
                        ].realWorldUse
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* 메서드 체이닝 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🔗 메서드 체이닝 (Method Chaining)
        </h3>
        <p className="text-gray-600 mb-4">
          여러 배열 메서드를 연결해서 복잡한 데이터 처리를 간단하게 표현할 수
          있습니다.
        </p>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">
            예제: 사용자 데이터 처리
          </h4>
          <div className="bg-gray-800 rounded-lg p-4 mb-3">
            <pre className="text-green-400 text-sm font-mono overflow-x-auto">
              {`const users = [
  { name: '김철수', age: 25, city: '서울' },
  { name: '이영희', age: 30, city: '부산' },
  { name: '박민수', age: 17, city: '서울' },
  { name: '최지영', age: 28, city: '대구' }
];

// 서울에 사는 성인의 이름만 추출하여 정렬
const result = users
  .filter(user => user.city === '서울')  // 서울 거주자만
  .filter(user => user.age >= 18)        // 성인만
  .map(user => user.name)                // 이름만 추출
  .sort();                               // 가나다순 정렬

// 결과: ['김철수']`}
            </pre>
          </div>
          <p className="text-sm text-gray-600">
            💡 각 메서드는 새로운 배열을 반환하므로 연속해서 호출할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 최신 배열 메서드 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
        <h3 className="text-xl font-bold text-indigo-900 mb-4">
          ⚡ 최신 배열 메서드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modernMethods.map((method, index) => (
            <div key={index} className="bg-white/70 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-2">
                {method.name}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <div className="bg-gray-800 rounded p-2 mb-2">
                <code className="text-green-400 text-xs font-mono">
                  {method.example}
                </code>
              </div>
              <div className="bg-blue-50 rounded p-2">
                <code className="text-blue-700 text-xs font-mono">
                  결과: {method.result}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 성능 팁 */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-4">
          ⚡ 성능 최적화 팁
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-amber-800 mb-3">✅ 좋은 예</h4>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• find()로 첫 번째 요소만 찾기</li>
              <li>• 체이닝 순서 최적화 (filter → map)</li>
              <li>• 큰 배열은 for문 고려</li>
              <li>• 불변성 유지 (원본 배열 보존)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800 mb-3">
              ❌ 피해야 할 것
            </h4>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• filter() 후 불필요한 map()</li>
              <li>• 중첩 반복문과 같은 효과</li>
              <li>• sort() 남용 (원본 배열 변경)</li>
              <li>• 매번 새로운 함수 생성</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ArrayMethodsLanding };
