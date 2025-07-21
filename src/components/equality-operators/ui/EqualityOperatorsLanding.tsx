"use client";

import React, { useState, useCallback } from "react";

interface ComparisonResult {
  id: string;
  leftValue: string;
  rightValue: string;
  leftType: string;
  rightType: string;
  doubleEqualsResult: boolean;
  tripleEqualsResult: boolean;
  explanation: string;
  timestamp: string;
}

interface TestCase {
  left: unknown;
  right: unknown;
  leftDisplay: string;
  rightDisplay: string;
  description: string;
}

const EqualityOperatorsLanding = () => {
  const [leftValue, setLeftValue] = useState("");
  const [rightValue, setRightValue] = useState("");
  const [comparisonHistory, setComparisonHistory] = useState<
    ComparisonResult[]
  >([]);
  const [selectedTab, setSelectedTab] = useState<
    "compare" | "examples" | "theory"
  >("theory");

  // 미리 정의된 테스트 케이스들
  const testCases: TestCase[] = [
    {
      left: 5,
      right: "5",
      leftDisplay: "5",
      rightDisplay: '"5"',
      description: "숫자와 문자열",
    },
    {
      left: true,
      right: 1,
      leftDisplay: "true",
      rightDisplay: "1",
      description: "불린과 숫자",
    },
    {
      left: false,
      right: 0,
      leftDisplay: "false",
      rightDisplay: "0",
      description: "불린과 숫자",
    },
    {
      left: null,
      right: undefined,
      leftDisplay: "null",
      rightDisplay: "undefined",
      description: "null과 undefined",
    },
    {
      left: "",
      right: 0,
      leftDisplay: '""',
      rightDisplay: "0",
      description: "빈 문자열과 숫자",
    },
    {
      left: " ",
      right: 0,
      leftDisplay: '" "',
      rightDisplay: "0",
      description: "공백 문자열과 숫자",
    },
    {
      left: [],
      right: "",
      leftDisplay: "[]",
      rightDisplay: '""',
      description: "빈 배열과 빈 문자열",
    },
    {
      left: [1, 2],
      right: "1,2",
      leftDisplay: "[1, 2]",
      rightDisplay: '"1,2"',
      description: "배열과 문자열",
    },
  ];

  const getJavaScriptType = (value: string): string => {
    if (value === "") return "string";
    if (value === "null") return "object";
    if (value === "undefined") return "undefined";
    if (value === "true" || value === "false") return "boolean";
    if (value.startsWith('"') && value.endsWith('"')) return "string";
    if (value.startsWith("[") && value.endsWith("]")) return "object";
    if (value.startsWith("{") && value.endsWith("}")) return "object";
    if (!isNaN(Number(value)) && value !== "") return "number";
    return "string";
  };

  const parseValue = (input: string): unknown => {
    if (input === "null") return null;
    if (input === "undefined") return undefined;
    if (input === "true") return true;
    if (input === "false") return false;
    if (input === '""' || input === "") return "";
    if (input.startsWith('"') && input.endsWith('"')) {
      return input.slice(1, -1);
    }
    if (input === "[]") return [];
    if (input.startsWith("[") && input.endsWith("]")) {
      try {
        return JSON.parse(input);
      } catch {
        return input;
      }
    }
    if (!isNaN(Number(input)) && input !== "") return Number(input);
    return input;
  };

  const getExplanation = (
    left: unknown,
    right: unknown,
    leftType: string,
    rightType: string
  ): string => {
    const doubleEquals = left == right;
    const tripleEquals = left === right;

    if (tripleEquals) {
      return "두 값이 타입과 값이 모두 동일하므로 === 연산에서 true를 반환합니다.";
    }

    if (doubleEquals && !tripleEquals) {
      if (leftType !== rightType) {
        return `타입이 다르지만(${leftType} vs ${rightType}) == 연산자가 타입 변환을 수행하여 true를 반환합니다.`;
      } else {
        return "값은 같지만 참조가 다르거나 특별한 경우입니다.";
      }
    }

    return `두 값이 타입 변환 후에도 다르므로 == 연산에서 false를 반환합니다.`;
  };

  const compareValues = useCallback(() => {
    if (leftValue === "" || rightValue === "") return;

    const parsedLeft = parseValue(leftValue);
    const parsedRight = parseValue(rightValue);
    const leftType = getJavaScriptType(leftValue);
    const rightType = getJavaScriptType(rightValue);

    const doubleEqualsResult = parsedLeft == parsedRight;
    const tripleEqualsResult = parsedLeft === parsedRight;
    const explanation = getExplanation(
      parsedLeft,
      parsedRight,
      leftType,
      rightType
    );

    const result: ComparisonResult = {
      id: Date.now().toString(),
      leftValue,
      rightValue,
      leftType,
      rightType,
      doubleEqualsResult,
      tripleEqualsResult,
      explanation,
      timestamp: new Date().toLocaleTimeString(),
    };

    setComparisonHistory((prev) => [result, ...prev].slice(0, 10));
  }, [leftValue, rightValue]);

  const runTestCase = (testCase: TestCase) => {
    const leftType = typeof testCase.left;
    const rightType = typeof testCase.right;
    const doubleEqualsResult = testCase.left == testCase.right;
    const tripleEqualsResult = testCase.left === testCase.right;
    const explanation = getExplanation(
      testCase.left,
      testCase.right,
      leftType,
      rightType
    );

    const result: ComparisonResult = {
      id: Date.now().toString(),
      leftValue: testCase.leftDisplay,
      rightValue: testCase.rightDisplay,
      leftType,
      rightType,
      doubleEqualsResult,
      tripleEqualsResult,
      explanation,
      timestamp: new Date().toLocaleTimeString(),
    };

    setComparisonHistory((prev) => [result, ...prev].slice(0, 10));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "number":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "string":
        return "bg-green-100 text-green-800 border-green-200";
      case "boolean":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "object":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "undefined":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
        {[
          { key: "theory", label: "📚 이론", icon: "📚" },
          { key: "compare", label: "🧪 비교 실험", icon: "🧪" },
          { key: "examples", label: "📋 예제 모음", icon: "📋" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setSelectedTab(tab.key as "compare" | "examples" | "theory")
            }
            className={`flex-1 min-w-[120px] px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              selectedTab === tab.key
                ? "bg-white text-indigo-600 shadow-sm border border-indigo-200"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 이론 탭 */}
      {selectedTab === "theory" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* == 연산자 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">==</span>
                동등 연산자 (느슨한 비교)
              </h3>
              <div className="space-y-3 text-sm text-yellow-700">
                <p>• 값만 비교하고 타입은 무시</p>
                <p>• 타입이 다르면 자동으로 타입 변환 수행</p>
                <p>• 예상치 못한 결과가 나올 수 있음</p>
                <div className="bg-yellow-100 p-3 rounded border border-yellow-300 mt-4">
                  <p className="font-mono text-xs">
                    5 == &quot;5&quot; → true
                    <br />
                    true == 1 → true
                    <br />
                    null == undefined → true
                  </p>
                </div>
              </div>
            </div>

            {/* === 연산자 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">===</span>
                일치 연산자 (엄격한 비교)
              </h3>
              <div className="space-y-3 text-sm text-green-700">
                <p>• 값과 타입을 모두 비교</p>
                <p>• 타입 변환을 수행하지 않음</p>
                <p>• 예측 가능하고 명확한 결과</p>
                <div className="bg-green-100 p-3 rounded border border-green-300 mt-4">
                  <p className="font-mono text-xs">
                    5 === &quot;5&quot; → false
                    <br />
                    true === 1 → false
                    <br />
                    null === undefined → false
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 권장사항 */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">
              💡 권장사항
            </h3>
            <div className="text-sm text-indigo-700 space-y-2">
              <p>
                • <strong>일반적으로 === 사용을 권장합니다</strong>
              </p>
              <p>• 타입 변환이 명확히 필요한 경우에만 == 사용</p>
              <p>• ESLint 같은 도구에서도 === 사용을 권장</p>
              <p>• 버그를 예방하고 코드의 의도를 명확하게 표현</p>
            </div>
          </div>
        </div>
      )}

      {/* 비교 실험 탭 */}
      {selectedTab === "compare" && (
        <div className="space-y-6">
          {/* 입력 섹션 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              직접 비교해보기
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  왼쪽 값
                </label>
                <input
                  type="text"
                  value={leftValue}
                  onChange={(e) => setLeftValue(e.target.value)}
                  placeholder='예: 5, "5", true, null, []'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  타입:{" "}
                  <span
                    className={`px-2 py-1 rounded border text-xs ${getTypeColor(
                      getJavaScriptType(leftValue)
                    )}`}
                  >
                    {getJavaScriptType(leftValue)}
                  </span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  오른쪽 값
                </label>
                <input
                  type="text"
                  value={rightValue}
                  onChange={(e) => setRightValue(e.target.value)}
                  placeholder='예: 5, "5", true, null, []'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  타입:{" "}
                  <span
                    className={`px-2 py-1 rounded border text-xs ${getTypeColor(
                      getJavaScriptType(rightValue)
                    )}`}
                  >
                    {getJavaScriptType(rightValue)}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={compareValues}
              disabled={!leftValue || !rightValue}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              비교하기
            </button>
          </div>

          {/* 비교 결과 히스토리 */}
          {comparisonHistory.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">비교 결과</h3>
              {comparisonHistory.map((result) => (
                <div
                  key={result.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-lg">
                        {result.leftValue}
                        <span className="mx-2 text-gray-400">vs</span>
                        {result.rightValue}
                      </span>
                      <span className="text-xs text-gray-500">
                        {result.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div
                      className={`p-3 rounded-lg border-2 ${
                        result.doubleEqualsResult
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">==</span>
                        <span
                          className={`font-bold ${
                            result.doubleEqualsResult
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {result.doubleEqualsResult ? "true" : "false"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg border-2 ${
                        result.tripleEqualsResult
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">===</span>
                        <span
                          className={`font-bold ${
                            result.tripleEqualsResult
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {result.tripleEqualsResult ? "true" : "false"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <strong>설명:</strong> {result.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 예제 모음 탭 */}
      {selectedTab === "examples" && (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              자주 헷갈리는 예제들
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              아래 예제들을 클릭하여 실제 비교 결과를 확인해보세요!
            </p>

            <div className="grid gap-3">
              {testCases.map((testCase, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-lg">
                        {testCase.leftDisplay} vs {testCase.rightDisplay}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({testCase.description})
                      </span>
                    </div>
                    <button
                      onClick={() => runTestCase(testCase)}
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 text-sm font-medium transition-colors duration-200"
                    >
                      테스트
                    </button>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    예상 결과: == 는{" "}
                    {testCase.left == testCase.right ? "true" : "false"}, === 는{" "}
                    {testCase.left === testCase.right ? "true" : "false"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 타입 변환 규칙 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-800 mb-4">
              == 연산자의 타입 변환 규칙
            </h3>
            <div className="space-y-3 text-sm text-blue-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">falsy 값들</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• false, 0, &quot;&quot;, null, undefined, NaN</li>
                    <li>• 이들은 서로 == 비교에서 true (단, NaN 제외)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">특별한 경우</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• null == undefined → true</li>
                    <li>• 객체는 primitive로 변환됨</li>
                    <li>• 문자열과 숫자는 숫자로 변환</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { EqualityOperatorsLanding };
