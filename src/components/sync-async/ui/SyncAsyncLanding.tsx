"use client";

import React, { useState } from "react";

const SyncAsyncLanding = () => {
  const [activeTab, setActiveTab] = useState<
    "concept" | "timeline" | "patterns"
  >("concept");
  const [executionMode, setExecutionMode] = useState<"sync" | "async">("sync");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mainThreadComplete, setMainThreadComplete] = useState(false);
  const [asyncPattern, setAsyncPattern] = useState<
    "callback" | "promise" | "async-await"
  >("callback");

  // 실행 시뮬레이션
  const runSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setMainThreadComplete(false);

    if (executionMode === "sync") {
      // 동기 실행 시나리오: 실제 블로킹을 시뮬레이션
      setTimeout(() => {
        setCurrentStep(1); // 작업 1 시작
      }, 500);

      setTimeout(() => {
        setCurrentStep(2); // heavyWork() 실행 시작 (2초 동안 블로킹)
      }, 1000);

      // 실제로 2초 후에 완료
      setTimeout(() => {
        setCurrentStep(3); // 작업 1 완료
      }, 3500); // 1000 + 2500 (실제 2초 작업 시간)

      // 시뮬레이션 종료
      setTimeout(() => {
        setIsRunning(false);
        // 결과를 유지하기 위해 currentStep을 초기화하지 않음
      }, 5000);
    } else {
      // 비동기 실행 시나리오: 논블로킹 특성 시뮬레이션
      setTimeout(() => {
        setCurrentStep(1); // 작업 1 시작
      }, 500);

      setTimeout(() => {
        setCurrentStep(2); // setTimeout 등록 (백그라운드 타이머 시작)
      }, 1000);

      setTimeout(() => {
        setCurrentStep(3); // 다음 작업 즉시 진행
      }, 1100);

      setTimeout(() => {
        setCurrentStep(4); // 또 다른 작업 진행
      }, 1400);

      setTimeout(() => {
        setCurrentStep(5); // 더 많은 작업들 진행
        setMainThreadComplete(true); // 메인 스레드 완료
      }, 1700);

      // 5초 후 백그라운드 타이머 완료 (실제 setTimeout 시간 반영)
      setTimeout(() => {
        setCurrentStep(6); // 비동기 작업 완료
      }, 6000); // 1000 + 5000 (실제 5초 후)

      // 시뮬레이션 종료
      setTimeout(() => {
        setIsRunning(false);
        // 결과를 유지하기 위해 currentStep을 초기화하지 않음
      }, 7500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("concept")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "concept"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          📚 개념 이해
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "timeline"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          ⏱️ 실행 타임라인
        </button>
        <button
          onClick={() => setActiveTab("patterns")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "patterns"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🔄 비동기 패턴
        </button>
      </div>

      {/* 개념 설명 탭 */}
      {activeTab === "concept" && (
        <div className="space-y-6">
          {/* 동기 vs 비동기 비교 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">⏸️</span> 동기 (Synchronous)
              </h2>
              <p className="text-gray-700 mb-4">
                코드가 순차적으로 실행되며, 한 작업이 끝나야 다음 작업이
                시작됩니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">⏳</span>
                  <div>
                    <div className="font-semibold text-gray-800">
                      블로킹 동작
                    </div>
                    <div className="text-sm text-gray-600">
                      작업이 완료될 때까지 다음 코드 실행 대기
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">📊</span>
                  <div>
                    <div className="font-semibold text-gray-800">
                      예측 가능한 흐름
                    </div>
                    <div className="text-sm text-gray-600">
                      코드 실행 순서가 작성 순서와 동일
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">🐌</span>
                  <div>
                    <div className="font-semibold text-gray-800">성능 이슈</div>
                    <div className="text-sm text-gray-600">
                      긴 작업이 전체 프로그램을 멈춤
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-900 text-yellow-400 p-3 rounded font-mono text-sm">
                <div>console.log(&quot;1&quot;);</div>
                <div>{`// 3초 대기 (블로킹)`}</div>
                <div>sleep(3000);</div>
                <div>console.log(&quot;2&quot;);</div>
                <div className="mt-2 text-gray-400">{`// 출력: 1 → (3초 후) → 2`}</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">▶️</span> 비동기 (Asynchronous)
              </h2>
              <p className="text-gray-700 mb-4">
                작업을 병렬로 처리하며, 완료를 기다리지 않고 다음 코드를
                실행합니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">🚀</span>
                  <div>
                    <div className="font-semibold text-gray-800">
                      논블로킹 동작
                    </div>
                    <div className="text-sm text-gray-600">
                      작업을 시작하고 즉시 다음 코드 실행
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">⚡</span>
                  <div>
                    <div className="font-semibold text-gray-800">
                      효율적인 처리
                    </div>
                    <div className="text-sm text-gray-600">
                      I/O 작업 중에도 다른 작업 가능
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">🧩</span>
                  <div>
                    <div className="font-semibold text-gray-800">
                      복잡성 증가
                    </div>
                    <div className="text-sm text-gray-600">
                      콜백, 에러 처리 등 관리 필요
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-900 text-blue-400 p-3 rounded font-mono text-sm">
                <div>console.log(&quot;1&quot;);</div>
                <div>setTimeout(() =&gt; {"{"}</div>
                <div className="pl-4">console.log(&quot;2&quot;);</div>
                <div>{"}"}, 3000);</div>
                <div>console.log(&quot;3&quot;);</div>
                <div className="mt-2 text-gray-400">{`// 출력: 1 → 3 → (3초 후) → 2`}</div>
              </div>
            </div>
          </div>

          {/* JavaScript의 비동기 처리 메커니즘 */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              ⚙️ JavaScript의 비동기 처리 메커니즘
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-purple-700 mb-2">
                  📚 Call Stack
                </h3>
                <p className="text-sm text-gray-600">
                  현재 실행 중인 함수들의 스택. LIFO(Last In First Out) 구조로
                  동작.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-purple-700 mb-2">
                  🔄 Event Loop
                </h3>
                <p className="text-sm text-gray-600">
                  Call Stack이 비어있을 때 Task Queue의 작업을 Call Stack으로
                  이동.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-purple-700 mb-2">
                  📋 Task Queue
                </h3>
                <p className="text-sm text-gray-600">
                  비동기 작업의 콜백이 대기하는 큐. FIFO(First In First Out)
                  구조.
                </p>
              </div>
            </div>
          </div>

          {/* 비동기가 필요한 상황 */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              🎯 비동기가 필요한 상황
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h3 className="font-semibold text-green-700 mb-2">
                  🌐 네트워크 요청
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• API 호출</li>
                  <li>• 파일 다운로드/업로드</li>
                  <li>• 데이터베이스 쿼리</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h3 className="font-semibold text-green-700 mb-2">
                  📁 파일 시스템
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 파일 읽기/쓰기</li>
                  <li>• 디렉토리 탐색</li>
                  <li>• 대용량 파일 처리</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h3 className="font-semibold text-green-700 mb-2">⏰ 타이머</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• setTimeout</li>
                  <li>• setInterval</li>
                  <li>• 애니메이션</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h3 className="font-semibold text-green-700 mb-2">
                  👤 사용자 인터랙션
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 클릭 이벤트</li>
                  <li>• 폼 제출</li>
                  <li>• 드래그 앤 드롭</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 실행 타임라인 탭 */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">⏱️ 실행 타임라인 시각화</h2>

            {/* 실행 모드 선택 */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setExecutionMode("sync")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  executionMode === "sync"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                동기 실행
              </button>
              <button
                onClick={() => setExecutionMode("async")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  executionMode === "async"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                비동기 실행
              </button>
            </div>

            {/* 코드 예제 */}
            <div className="mb-6 bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm border-2 border-gray-700">
              {executionMode === "sync" ? (
                <div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 1
                        ? "text-yellow-400 bg-yellow-900/50 border-l-4 border-yellow-400 transform scale-105 shadow-lg"
                        : currentStep > 1
                        ? "text-yellow-300 bg-yellow-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 1 ? "animate-pulse" : ""}>
                      {currentStep === 1 && "▶ "}console.log(&quot;작업 1
                      시작&quot;);
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 2
                        ? "text-yellow-400 bg-yellow-900/50 border-l-4 border-yellow-400 transform scale-105 shadow-lg"
                        : currentStep > 2
                        ? "text-yellow-300 bg-yellow-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 2 ? "animate-pulse" : ""}>
                      {currentStep === 2 && "▶ "}heavyWork(); // 2초 소요 -
                      블로킹!
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 3
                        ? "text-yellow-400 bg-yellow-900/50 border-l-4 border-yellow-400 transform scale-105 shadow-lg"
                        : currentStep > 3
                        ? "text-yellow-300 bg-yellow-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 3 ? "animate-pulse" : ""}>
                      {currentStep === 3 && "▶ "}console.log(&quot;작업 1
                      완료&quot;);
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 1
                        ? "text-blue-400 bg-blue-900/50 border-l-4 border-blue-400 transform scale-105 shadow-lg"
                        : currentStep > 1
                        ? "text-blue-300 bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 1 ? "animate-pulse" : ""}>
                      {currentStep === 1 && "▶ "}console.log(&quot;작업 1
                      시작&quot;);
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 2
                        ? "text-orange-400 bg-orange-900/50 border-l-4 border-orange-400 transform scale-105 shadow-lg"
                        : currentStep > 2
                        ? "text-orange-300 bg-orange-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 2 ? "animate-pulse" : ""}>
                      {currentStep === 2 && "⏰ "}setTimeout(() =&gt; {"{"}{" "}
                      console.log(&quot;비동기 완료&quot;); {"}"}, 5000); //
                      백그라운드 시작
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 3
                        ? "text-blue-400 bg-blue-900/50 border-l-4 border-blue-400 transform scale-105 shadow-lg"
                        : currentStep > 3
                        ? "text-blue-300 bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 3 ? "animate-pulse" : ""}>
                      {currentStep === 3 && "▶ "}console.log(&quot;작업 2
                      진행&quot;); // 즉시 진행
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 4
                        ? "text-blue-400 bg-blue-900/50 border-l-4 border-blue-400 transform scale-105 shadow-lg"
                        : currentStep > 4
                        ? "text-blue-300 bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 4 ? "animate-pulse" : ""}>
                      {currentStep === 4 && "▶ "}console.log(&quot;작업 3
                      진행&quot;); // 계속 진행
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 5
                        ? "text-blue-400 bg-blue-900/50 border-l-4 border-blue-400 transform scale-105 shadow-lg"
                        : currentStep > 5
                        ? "text-blue-300 bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 5 ? "animate-pulse" : ""}>
                      {currentStep === 5 && "▶ "}console.log(&quot;작업 4
                      완료&quot;); // 더 많은 작업
                    </span>
                  </div>
                  <div
                    className={`p-2 rounded transition-all duration-300 ${
                      currentStep === 6
                        ? "text-green-400 bg-green-900/50 border-l-4 border-green-400 transform scale-105 shadow-lg"
                        : currentStep > 6
                        ? "text-green-300 bg-green-900/20"
                        : ""
                    }`}
                  >
                    <span className={currentStep === 6 ? "animate-pulse" : ""}>
                      {currentStep === 6 && "✅ "}
                      {`// (5초 후) "비동기 완료" 출력 - 백그라운드에서!`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 타임라인 시각화 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-gray-200 shadow-inner">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                ⏰ 실행 타임라인
              </h3>
              <div className="relative">
                {/* 시간 축 */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-2 rounded-full transition-all duration-500 ${
                    isRunning
                      ? executionMode === "sync"
                        ? "bg-gradient-to-b from-yellow-400 to-yellow-600"
                        : "bg-gradient-to-b from-blue-400 to-blue-600"
                      : "bg-gray-300"
                  }`}
                ></div>

                {/* 동기 실행 타임라인 */}
                {executionMode === "sync" && (
                  <div className="space-y-6 pl-10">
                    <div
                      className={`flex items-center gap-4 transition-all duration-500 transform ${
                        currentStep >= 1
                          ? "opacity-100 scale-100"
                          : "opacity-40 scale-95"
                      }`}
                    >
                      <div
                        className={`relative transition-all duration-300 ${
                          currentStep === 1
                            ? "w-6 h-6 bg-yellow-500 animate-pulse shadow-lg"
                            : "w-4 h-4 bg-yellow-400"
                        } rounded-full`}
                      >
                        {currentStep === 1 && (
                          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <div
                        className={`flex-1 p-4 rounded-lg border-l-4 transition-all duration-300 ${
                          currentStep === 1
                            ? "bg-yellow-200 border-yellow-500 shadow-lg transform scale-105"
                            : currentStep > 1
                            ? "bg-yellow-100 border-yellow-400"
                            : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        <div
                          className={`font-semibold ${
                            currentStep === 1
                              ? "text-yellow-800"
                              : "text-gray-700"
                          }`}
                        >
                          0ms: 작업 1 시작
                        </div>
                        {currentStep === 1 && (
                          <div className="mt-1 text-sm text-yellow-700 animate-pulse">
                            🟡 실행 중...
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-4 transition-all duration-500 transform ${
                        currentStep >= 2
                          ? "opacity-100 scale-100"
                          : "opacity-40 scale-95"
                      }`}
                    >
                      <div
                        className={`relative transition-all duration-300 ${
                          currentStep === 2
                            ? "w-6 h-6 bg-yellow-500 animate-pulse shadow-lg"
                            : "w-4 h-4 bg-yellow-400"
                        } rounded-full`}
                      >
                        {currentStep === 2 && (
                          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <div
                        className={`flex-1 p-4 rounded-lg border-l-4 transition-all duration-300 ${
                          currentStep === 2
                            ? "bg-red-100 border-red-500 shadow-lg transform scale-105"
                            : currentStep > 2
                            ? "bg-yellow-100 border-yellow-400"
                            : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        <div
                          className={`font-semibold ${
                            currentStep === 2 ? "text-red-800" : "text-gray-700"
                          }`}
                        >
                          100ms: heavyWork() 실행 중... (2초 소요)
                        </div>
                        <div
                          className={`text-sm ${
                            currentStep === 2
                              ? "text-red-700 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          🚫 다른 작업 블로킹 중 - 2초 대기 필요
                        </div>
                        {currentStep === 2 && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-sm text-red-700 animate-pulse">
                                블로킹 상태: 2초간 다른 작업 불가능
                              </span>
                            </div>
                            <div className="w-full bg-red-200 rounded-full h-2">
                              <div className="bg-red-600 h-2 rounded-full animate-pulse w-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-4 transition-all duration-500 transform ${
                        currentStep >= 3
                          ? "opacity-100 scale-100"
                          : "opacity-40 scale-95"
                      }`}
                    >
                      <div
                        className={`relative transition-all duration-300 ${
                          currentStep === 3
                            ? "w-6 h-6 bg-green-500 animate-pulse shadow-lg"
                            : "w-4 h-4 bg-yellow-400"
                        } rounded-full`}
                      >
                        {currentStep === 3 && (
                          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <div
                        className={`flex-1 p-4 rounded-lg border-l-4 transition-all duration-300 ${
                          currentStep === 3
                            ? "bg-green-200 border-green-500 shadow-lg transform scale-105"
                            : currentStep > 3
                            ? "bg-green-100 border-green-400"
                            : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        <div
                          className={`font-semibold ${
                            currentStep === 3
                              ? "text-green-800"
                              : "text-gray-700"
                          }`}
                        >
                          2600ms: 작업 1 완료 (총 2.5초 소요)
                        </div>
                        {currentStep === 3 && (
                          <div className="mt-1 text-sm text-green-700 animate-pulse">
                            ✅ 완료!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 비동기 실행 타임라인 */}
                {executionMode === "async" && (
                  <div className="space-y-4 pl-10">
                    {/* 메인 스레드 작업들 */}
                    <div className="relative">
                      <div
                        className={`absolute -left-8 top-0 bottom-0 w-1 rounded transition-all duration-500 ${
                          mainThreadComplete ? "bg-green-500" : "bg-blue-500"
                        } opacity-50`}
                      ></div>
                      <div
                        className={`text-sm font-medium mb-2 transition-all duration-500 ${
                          mainThreadComplete
                            ? "text-green-700"
                            : "text-blue-700"
                        }`}
                      >
                        {mainThreadComplete
                          ? "✅ 메인 스레드 (완료됨)"
                          : "📘 메인 스레드 (Main Thread)"}
                      </div>

                      <div
                        className={`mb-3 flex items-center gap-4 transition-all duration-500 transform ${
                          currentStep >= 1
                            ? "opacity-100 scale-100"
                            : "opacity-40 scale-95"
                        }`}
                      >
                        <div
                          className={`relative transition-all duration-300 ${
                            currentStep === 1
                              ? "w-5 h-5 bg-blue-500 animate-pulse shadow-lg"
                              : "w-3 h-3 bg-blue-400"
                          } rounded-full`}
                        >
                          {currentStep === 1 && (
                            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                          )}
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border-l-4 transition-all duration-300 ${
                            currentStep === 1
                              ? "bg-blue-200 border-blue-500 shadow-lg"
                              : currentStep > 1
                              ? "bg-blue-100 border-blue-400"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <div
                            className={`text-sm font-semibold ${
                              currentStep === 1
                                ? "text-blue-800"
                                : "text-gray-700"
                            }`}
                          >
                            0ms: 작업 1 시작
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mb-3 flex items-center gap-4 transition-all duration-500 transform ${
                          currentStep >= 2
                            ? "opacity-100 scale-100"
                            : "opacity-40 scale-95"
                        }`}
                      >
                        <div
                          className={`relative transition-all duration-300 ${
                            currentStep === 2
                              ? "w-5 h-5 bg-orange-500 animate-pulse shadow-lg"
                              : "w-3 h-3 bg-orange-400"
                          } rounded-full`}
                        >
                          {currentStep === 2 && (
                            <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping"></div>
                          )}
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border-l-4 transition-all duration-300 ${
                            currentStep === 2
                              ? "bg-orange-200 border-orange-500 shadow-lg"
                              : currentStep > 2
                              ? "bg-orange-100 border-orange-400"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <div
                            className={`text-sm font-semibold ${
                              currentStep === 2
                                ? "text-orange-800"
                                : "text-gray-700"
                            }`}
                          >
                            100ms: setTimeout 등록 → 백그라운드 타이머 시작
                          </div>
                          {currentStep === 2 && (
                            <div className="mt-1 text-xs text-orange-700">
                              ⏰ 5초 후 실행 예약됨
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`mb-3 flex items-center gap-4 transition-all duration-500 transform ${
                          currentStep >= 3
                            ? "opacity-100 scale-100"
                            : "opacity-40 scale-95"
                        }`}
                      >
                        <div
                          className={`relative transition-all duration-300 ${
                            currentStep === 3
                              ? "w-5 h-5 bg-blue-500 animate-pulse shadow-lg"
                              : "w-3 h-3 bg-blue-400"
                          } rounded-full`}
                        >
                          {currentStep === 3 && (
                            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                          )}
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border-l-4 transition-all duration-300 ${
                            currentStep === 3
                              ? "bg-blue-200 border-blue-500 shadow-lg"
                              : currentStep > 3
                              ? "bg-blue-100 border-blue-400"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <div
                            className={`text-sm font-semibold ${
                              currentStep === 3
                                ? "text-blue-800"
                                : "text-gray-700"
                            }`}
                          >
                            120ms: 작업 2 진행 (블로킹 없음!)
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mb-3 flex items-center gap-4 transition-all duration-500 transform ${
                          currentStep >= 4
                            ? "opacity-100 scale-100"
                            : "opacity-40 scale-95"
                        }`}
                      >
                        <div
                          className={`relative transition-all duration-300 ${
                            currentStep === 4
                              ? "w-5 h-5 bg-blue-500 animate-pulse shadow-lg"
                              : "w-3 h-3 bg-blue-400"
                          } rounded-full`}
                        >
                          {currentStep === 4 && (
                            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                          )}
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border-l-4 transition-all duration-300 ${
                            currentStep === 4
                              ? "bg-blue-200 border-blue-500 shadow-lg"
                              : currentStep > 4
                              ? "bg-blue-100 border-blue-400"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <div
                            className={`text-sm font-semibold ${
                              currentStep === 4
                                ? "text-blue-800"
                                : "text-gray-700"
                            }`}
                          >
                            600ms: 작업 3 진행 (계속 실행 중)
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mb-3 flex items-center gap-4 transition-all duration-500 transform ${
                          currentStep >= 5
                            ? "opacity-100 scale-100"
                            : "opacity-40 scale-95"
                        }`}
                      >
                        <div
                          className={`relative transition-all duration-300 ${
                            currentStep === 5 && !mainThreadComplete
                              ? "w-5 h-5 bg-blue-500 animate-pulse shadow-lg"
                              : currentStep >= 5
                              ? "w-4 h-4 bg-green-500"
                              : "w-3 h-3 bg-blue-400"
                          } rounded-full`}
                        >
                          {currentStep === 5 && !mainThreadComplete && (
                            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                          )}
                          {mainThreadComplete && (
                            <svg
                              className="w-full h-full text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border-l-4 transition-all duration-300 ${
                            mainThreadComplete
                              ? "bg-green-100 border-green-500"
                              : currentStep === 5
                              ? "bg-blue-200 border-blue-500 shadow-lg"
                              : currentStep > 5
                              ? "bg-blue-100 border-blue-400"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <div
                            className={`text-sm font-semibold ${
                              mainThreadComplete
                                ? "text-green-800"
                                : currentStep === 5
                                ? "text-blue-800"
                                : "text-gray-700"
                            }`}
                          >
                            1200ms: 작업 4 완료 ✨
                          </div>
                          {currentStep === 5 && (
                            <div
                              className={`mt-1 text-xs ${
                                mainThreadComplete
                                  ? "text-green-700 font-medium"
                                  : "text-blue-700"
                              }`}
                            >
                              {mainThreadComplete
                                ? "✅ 메인 스레드 완료! (총 1.2초)"
                                : "메인 스레드는 블로킹 없이 빠르게 완료!"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 백그라운드 타이머 */}
                    <div
                      className={`relative mt-6 pt-4 border-t-2 border-dashed transition-all duration-500 ${
                        mainThreadComplete
                          ? "border-green-400 bg-green-50/30 rounded-lg p-4"
                          : "border-green-300"
                      }`}
                    >
                      <div className="absolute -left-8 top-4 bottom-0 w-1 bg-green-500 rounded opacity-50"></div>
                      <div className="text-sm font-medium text-green-700 mb-2">
                        🔄 백그라운드 (Timer Queue){" "}
                        {mainThreadComplete &&
                          "(메인 스레드 완료 후에도 계속 실행 중)"}
                      </div>

                      <div
                        className={`flex items-center gap-4 transition-all duration-500 transform ${
                          currentStep >= 2
                            ? "opacity-60 scale-95"
                            : "opacity-30 scale-90"
                        } ${currentStep >= 6 ? "opacity-100 scale-100" : ""}`}
                      >
                        <div
                          className={`relative transition-all duration-300 ${
                            currentStep >= 6
                              ? "w-5 h-5 bg-green-500 animate-pulse shadow-lg"
                              : "w-3 h-3 bg-green-300"
                          } rounded-full`}
                        >
                          {currentStep >= 6 && (
                            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                          )}
                          {currentStep >= 2 && currentStep < 6 && (
                            <div className="absolute inset-0 bg-green-300 rounded-full animate-spin border-2 border-green-500 border-t-transparent"></div>
                          )}
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border-l-4 transition-all duration-300 ${
                            currentStep >= 6
                              ? "bg-green-200 border-green-500 shadow-lg"
                              : currentStep >= 2
                              ? "bg-green-50 border-green-300"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <div
                            className={`text-sm font-semibold ${
                              currentStep >= 6
                                ? "text-green-800"
                                : currentStep >= 2
                                ? "text-green-700"
                                : "text-gray-700"
                            }`}
                          >
                            {currentStep >= 6
                              ? "5100ms: 비동기 작업 완료! 🎉"
                              : "100ms~5100ms: 타이머 대기 중..."}
                          </div>
                          {currentStep >= 2 && currentStep < 6 && (
                            <div className="mt-1 text-xs text-green-600 animate-pulse">
                              ⏳ 백그라운드에서 5초 카운트다운 중...{" "}
                              {mainThreadComplete && "(메인은 이미 완료!)"}
                            </div>
                          )}
                          {currentStep >= 6 && (
                            <div className="mt-2 space-y-1">
                              <div className="text-xs text-green-600">
                                ✅ 콜백 실행 완료
                              </div>
                              <div className="text-xs text-green-500 font-medium">
                                메인 스레드: 1.2초 완료 (동기는 2.6초) |
                                백그라운드: 5초 후 완료
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 진행 상태 표시 */}
            {isRunning && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {executionMode === "sync"
                      ? `동기 처리: ${currentStep}/3단계`
                      : `비동기 처리: ${currentStep}/6단계 ${
                          currentStep >= 6
                            ? "(백그라운드 완료!)"
                            : currentStep >= 2
                            ? "(백그라운드 실행 중...)"
                            : ""
                        }`}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(
                      (currentStep / (executionMode === "sync" ? 3 : 6)) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${
                      executionMode === "sync"
                        ? "bg-gradient-to-r from-yellow-400 to-red-500"
                        : "bg-gradient-to-r from-blue-400 to-green-500"
                    }`}
                    style={{
                      width: `${
                        (currentStep / (executionMode === "sync" ? 3 : 6)) * 100
                      }%`,
                    }}
                  />
                </div>
                {executionMode === "async" &&
                  currentStep >= 2 &&
                  currentStep < 6 && (
                    <div className="mt-2 text-xs text-green-600">
                      💡 메인 스레드는 계속 실행 중, 백그라운드에서 타이머
                      대기...
                    </div>
                  )}
              </div>
            )}

            {/* 완료 후 결과 요약 */}
            {!isRunning && currentStep > 0 && (
              <div
                className={`mt-6 p-4 rounded-lg border-2 ${
                  executionMode === "sync"
                    ? "bg-yellow-50 border-yellow-300"
                    : "bg-gradient-to-br from-blue-50 to-green-50 border-blue-300"
                }`}
              >
                <h4 className="font-semibold text-lg mb-2">
                  {executionMode === "sync"
                    ? "⏸️ 동기 실행 결과"
                    : "▶️ 비동기 실행 결과"}
                </h4>
                {executionMode === "sync" ? (
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      • 총 실행 시간:{" "}
                      <span className="font-semibold text-yellow-700">
                        2.6초
                      </span>
                    </p>
                    <p className="text-gray-700">
                      • 블로킹 시간:{" "}
                      <span className="font-semibold text-red-700">
                        2초 (다른 작업 불가)
                      </span>
                    </p>
                    <p className="text-gray-700">
                      • 특징:{" "}
                      <span className="text-gray-600">
                        순차적 실행, 예측 가능
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      • 메인 스레드 완료:{" "}
                      <span className="font-semibold text-blue-700">1.2초</span>
                    </p>
                    <p className="text-gray-700">
                      • 백그라운드 작업:{" "}
                      <span className="font-semibold text-green-700">
                        5초 후 완료
                      </span>
                    </p>
                    <p className="text-gray-700">
                      • 장점:{" "}
                      <span className="text-gray-600">
                        논블로킹, 효율적인 리소스 활용
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 실행 버튼 */}
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`mt-6 w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                isRunning
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : currentStep > 0
                  ? "bg-green-500 text-white hover:bg-green-600 hover:scale-105 active:scale-95"
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95"
              }`}
            >
              {isRunning ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  실행 중...
                </div>
              ) : currentStep > 0 ? (
                "🔄 다시 시작"
              ) : (
                "🚀 시뮬레이션 시작"
              )}
            </button>
          </div>
        </div>
      )}

      {/* 비동기 패턴 탭 */}
      {activeTab === "patterns" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">
              🔄 JavaScript 비동기 패턴의 진화
            </h2>

            {/* 패턴 선택 */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setAsyncPattern("callback")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  asyncPattern === "callback"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Callback
              </button>
              <button
                onClick={() => setAsyncPattern("promise")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  asyncPattern === "promise"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Promise
              </button>
              <button
                onClick={() => setAsyncPattern("async-await")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  asyncPattern === "async-await"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Async/Await
              </button>
            </div>

            {/* Callback 패턴 */}
            {asyncPattern === "callback" && (
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-300">
                  <h3 className="font-semibold text-orange-800 mb-2">
                    📞 Callback 패턴
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    함수를 인자로 전달하여 비동기 작업 완료 후 실행되도록 하는
                    패턴
                  </p>

                  <div className="bg-gray-900 text-orange-400 p-4 rounded font-mono text-sm">
                    <div>{`// 기본 콜백 예제`}</div>
                    <div>function fetchData(callback) {"{"}</div>
                    <div className="pl-4">setTimeout(() =&gt; {"{"}</div>
                    <div className="pl-8">
                      const data = &quot;서버 데이터&quot;;
                    </div>
                    <div className="pl-8">callback(data);</div>
                    <div className="pl-4">{"}"}, 1000);</div>
                    <div>{"}"}</div>
                    <div className="mt-2">fetchData((data) =&gt; {"{"}</div>
                    <div className="pl-4">
                      console.log(data); // &quot;서버 데이터&quot;
                    </div>
                    <div>{"}"});</div>
                  </div>

                  <div className="mt-4 p-3 bg-red-100 rounded border border-red-300">
                    <h4 className="font-semibold text-red-800 mb-1">
                      ⚠️ Callback Hell
                    </h4>
                    <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-xs">
                      <div>getData((a) =&gt; {"{"}</div>
                      <div className="pl-4">getMoreData(a, (b) =&gt; {"{"}</div>
                      <div className="pl-8">getMoreData(b, (c) =&gt; {"{"}</div>
                      <div className="pl-12">
                        getMoreData(c, (d) =&gt; {"{"}
                      </div>
                      <div className="pl-16">{`// 콜백 지옥...`}</div>
                      <div className="pl-12">{"}"});</div>
                      <div className="pl-8">{"}"});</div>
                      <div className="pl-4">{"}"});</div>
                      <div>{"}"});</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Promise 패턴 */}
            {asyncPattern === "promise" && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    🤝 Promise 패턴
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    비동기 작업의 최종 완료 또는 실패를 나타내는 객체
                  </p>

                  <div className="bg-gray-900 text-blue-400 p-4 rounded font-mono text-sm">
                    <div>{`// Promise 체이닝`}</div>
                    <div>fetch(&apos;/api/user&apos;)</div>
                    <div className="pl-4">
                      .then(response =&gt; response.json())
                    </div>
                    <div className="pl-4">
                      .then(user =&gt; fetch(`/api/posts/${"{"}
                      <span className="text-green-400">user.id</span>
                      {"}"}`))
                    </div>
                    <div className="pl-4">
                      .then(response =&gt; response.json())
                    </div>
                    <div className="pl-4">
                      .then(posts =&gt; console.log(posts))
                    </div>
                    <div className="pl-4">
                      .catch(error =&gt; console.error(error));
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-blue-300">
                      <div className="font-semibold text-blue-700">Pending</div>
                      <div className="text-xs text-gray-600">대기 상태</div>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <div className="font-semibold text-green-700">
                        Fulfilled
                      </div>
                      <div className="text-xs text-gray-600">이행 완료</div>
                    </div>
                    <div className="bg-white p-3 rounded border border-red-300">
                      <div className="font-semibold text-red-700">Rejected</div>
                      <div className="text-xs text-gray-600">거부됨</div>
                    </div>
                  </div>

                  <div className="mt-4 bg-purple-100 p-3 rounded border border-purple-300">
                    <h4 className="font-semibold text-purple-800 mb-1">
                      ✨ Promise 유틸리티
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Promise.all() - 모든 Promise 완료 대기</li>
                      <li>• Promise.race() - 가장 빠른 Promise 결과</li>
                      <li>• Promise.allSettled() - 모든 결과 수집</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Async/Await 패턴 */}
            {asyncPattern === "async-await" && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                  <h3 className="font-semibold text-green-800 mb-2">
                    ⚡ Async/Await 패턴
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Promise를 더 읽기 쉽게 작성할 수 있는 문법적 설탕
                  </p>

                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                    <div>{`// 동기 코드처럼 작성`}</div>
                    <div>async function fetchUserPosts() {"{"}</div>
                    <div className="pl-4">try {"{"}</div>
                    <div className="pl-8">
                      const userResponse = await fetch(&apos;/api/user&apos;);
                    </div>
                    <div className="pl-8">
                      const user = await userResponse.json();
                    </div>
                    <div className="pl-8"></div>
                    <div className="pl-8">
                      const postsResponse = await fetch(`/api/posts/${"{"}
                      <span className="text-blue-400">user.id</span>
                      {"}"}`);
                    </div>
                    <div className="pl-8">
                      const posts = await postsResponse.json();
                    </div>
                    <div className="pl-8"></div>
                    <div className="pl-8">return posts;</div>
                    <div className="pl-4">
                      {"}"} catch (error) {"{"}
                    </div>
                    <div className="pl-8">
                      console.error(&apos;Error:&apos;, error);
                    </div>
                    <div className="pl-4">{"}"}</div>
                    <div>{"}"}</div>
                  </div>

                  <div className="mt-4 bg-yellow-100 p-3 rounded border border-yellow-300">
                    <h4 className="font-semibold text-yellow-800 mb-1">
                      💡 장점
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 동기 코드와 유사한 가독성</li>
                      <li>• try/catch로 에러 처리 통일</li>
                      <li>• 디버깅이 더 쉬움</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 에러 처리 비교 */}
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🚨 에러 처리 비교</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-gray-300">
                  <h4 className="font-semibold text-gray-800 mb-2">Callback</h4>
                  <div className="bg-gray-900 text-gray-400 p-2 rounded font-mono text-xs">
                    <div>callback((err, data) =&gt; {"{"}</div>
                    <div className="pl-4">if (err) return handle(err);</div>
                    <div className="pl-4">{`// 성공 처리`}</div>
                    <div>{"}"});</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300">
                  <h4 className="font-semibold text-gray-800 mb-2">Promise</h4>
                  <div className="bg-gray-900 text-gray-400 p-2 rounded font-mono text-xs">
                    <div>promise</div>
                    <div className="pl-4">.then(data =&gt; {"{}"})</div>
                    <div className="pl-4">.catch(err =&gt; {"{}"})</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Async/Await
                  </h4>
                  <div className="bg-gray-900 text-gray-400 p-2 rounded font-mono text-xs">
                    <div>try {"{"}</div>
                    <div className="pl-4">const data = await promise;</div>
                    <div>
                      {"}"} catch (err) {"{"}
                    </div>
                    <div className="pl-4">{`// 에러 처리`}</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SyncAsyncLanding };
