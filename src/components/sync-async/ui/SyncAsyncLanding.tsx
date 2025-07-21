"use client";

import React, { useState } from "react";

const SyncAsyncLanding = () => {
  const [activeTab, setActiveTab] = useState<"concept" | "timeline" | "patterns">("concept");
  const [executionMode, setExecutionMode] = useState<"sync" | "async">("sync");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [asyncPattern, setAsyncPattern] = useState<"callback" | "promise" | "async-await">("callback");

  // 실행 시뮬레이션
  const runSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    const totalSteps = executionMode === "sync" ? 3 : 5;
    const stepDelay = executionMode === "sync" ? 1000 : 800;
    
    for (let i = 1; i <= totalSteps; i++) {
      setTimeout(() => {
        setCurrentStep(i);
        if (i === totalSteps) {
          setTimeout(() => {
            setIsRunning(false);
            setCurrentStep(0);
          }, 1000);
        }
      }, i * stepDelay);
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
                코드가 순차적으로 실행되며, 한 작업이 끝나야 다음 작업이 시작됩니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">⏳</span>
                  <div>
                    <div className="font-semibold text-gray-800">블로킹 동작</div>
                    <div className="text-sm text-gray-600">작업이 완료될 때까지 다음 코드 실행 대기</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">📊</span>
                  <div>
                    <div className="font-semibold text-gray-800">예측 가능한 흐름</div>
                    <div className="text-sm text-gray-600">코드 실행 순서가 작성 순서와 동일</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">🐌</span>
                  <div>
                    <div className="font-semibold text-gray-800">성능 이슈</div>
                    <div className="text-sm text-gray-600">긴 작업이 전체 프로그램을 멈춤</div>
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
                작업을 병렬로 처리하며, 완료를 기다리지 않고 다음 코드를 실행합니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">🚀</span>
                  <div>
                    <div className="font-semibold text-gray-800">논블로킹 동작</div>
                    <div className="text-sm text-gray-600">작업을 시작하고 즉시 다음 코드 실행</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">⚡</span>
                  <div>
                    <div className="font-semibold text-gray-800">효율적인 처리</div>
                    <div className="text-sm text-gray-600">I/O 작업 중에도 다른 작업 가능</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">🧩</span>
                  <div>
                    <div className="font-semibold text-gray-800">복잡성 증가</div>
                    <div className="text-sm text-gray-600">콜백, 에러 처리 등 관리 필요</div>
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
            <h2 className="text-2xl font-bold text-purple-800 mb-4">⚙️ JavaScript의 비동기 처리 메커니즘</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-purple-700 mb-2">📚 Call Stack</h3>
                <p className="text-sm text-gray-600">
                  현재 실행 중인 함수들의 스택. LIFO(Last In First Out) 구조로 동작.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-purple-700 mb-2">🔄 Event Loop</h3>
                <p className="text-sm text-gray-600">
                  Call Stack이 비어있을 때 Task Queue의 작업을 Call Stack으로 이동.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-purple-700 mb-2">📋 Task Queue</h3>
                <p className="text-sm text-gray-600">
                  비동기 작업의 콜백이 대기하는 큐. FIFO(First In First Out) 구조.
                </p>
              </div>
            </div>
          </div>

          {/* 비동기가 필요한 상황 */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">🎯 비동기가 필요한 상황</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h3 className="font-semibold text-green-700 mb-2">🌐 네트워크 요청</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• API 호출</li>
                  <li>• 파일 다운로드/업로드</li>
                  <li>• 데이터베이스 쿼리</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h3 className="font-semibold text-green-700 mb-2">📁 파일 시스템</h3>
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
                <h3 className="font-semibold text-green-700 mb-2">👤 사용자 인터랙션</h3>
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
            <div className="mb-6 bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm">
              {executionMode === "sync" ? (
                <div>
                  <div className={currentStep === 1 ? "text-yellow-400 bg-yellow-900/30" : ""}>
                    console.log(&quot;작업 1 시작&quot;);
                  </div>
                  <div className={currentStep === 2 ? "text-yellow-400 bg-yellow-900/30" : ""}>
                    heavyWork(); // 2초 소요
                  </div>
                  <div className={currentStep === 3 ? "text-yellow-400 bg-yellow-900/30" : ""}>
                    console.log(&quot;작업 1 완료&quot;);
                  </div>
                </div>
              ) : (
                <div>
                  <div className={currentStep === 1 ? "text-blue-400 bg-blue-900/30" : ""}>
                    console.log(&quot;작업 1 시작&quot;);
                  </div>
                  <div className={currentStep === 2 ? "text-blue-400 bg-blue-900/30" : ""}>
                    setTimeout(() =&gt; {"{"} console.log(&quot;비동기 작업 완료&quot;); {"}"}, 2000);
                  </div>
                  <div className={currentStep === 3 ? "text-blue-400 bg-blue-900/30" : ""}>
                    console.log(&quot;다음 작업 진행&quot;);
                  </div>
                  <div className={currentStep === 4 ? "text-green-400 bg-green-900/30" : ""}>
                    {`// (2초 후) "비동기 작업 완료" 출력`}
                  </div>
                </div>
              )}
            </div>

            {/* 타임라인 시각화 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="relative">
                {/* 시간 축 */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300"></div>
                
                {/* 동기 실행 타임라인 */}
                {executionMode === "sync" && (
                  <div className="space-y-4 pl-8">
                    <div className={`flex items-center gap-4 transition-all ${
                      currentStep >= 1 ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1 bg-yellow-100 p-3 rounded">
                        <div className="font-semibold">0ms: 작업 1 시작</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-4 transition-all ${
                      currentStep >= 2 ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1 bg-yellow-100 p-3 rounded">
                        <div className="font-semibold">100ms: heavyWork() 실행 중...</div>
                        <div className="text-sm text-gray-600">🚫 다른 작업 블로킹</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-4 transition-all ${
                      currentStep >= 3 ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1 bg-yellow-100 p-3 rounded">
                        <div className="font-semibold">2100ms: 작업 1 완료</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 비동기 실행 타임라인 */}
                {executionMode === "async" && (
                  <div className="space-y-4 pl-8">
                    <div className={`flex items-center gap-4 transition-all ${
                      currentStep >= 1 ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="flex-1 bg-blue-100 p-3 rounded">
                        <div className="font-semibold">0ms: 작업 1 시작</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-4 transition-all ${
                      currentStep >= 2 ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="flex-1 bg-blue-100 p-3 rounded">
                        <div className="font-semibold">100ms: setTimeout 등록</div>
                        <div className="text-sm text-gray-600">✅ 논블로킹, 즉시 다음 진행</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-4 transition-all ${
                      currentStep >= 3 ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="flex-1 bg-blue-100 p-3 rounded">
                        <div className="font-semibold">150ms: 다음 작업 진행</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-4 transition-all ${
                      currentStep >= 4 ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div className="flex-1 bg-green-100 p-3 rounded">
                        <div className="font-semibold">2100ms: 비동기 작업 완료</div>
                        <div className="text-sm text-gray-600">콜백 실행</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 실행 버튼 */}
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`mt-6 w-full py-3 rounded-lg font-medium transition-all ${
                isRunning
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isRunning ? "실행 중..." : "시뮬레이션 시작"}
            </button>
          </div>
        </div>
      )}

      {/* 비동기 패턴 탭 */}
      {activeTab === "patterns" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔄 JavaScript 비동기 패턴의 진화</h2>
            
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
                  <h3 className="font-semibold text-orange-800 mb-2">📞 Callback 패턴</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    함수를 인자로 전달하여 비동기 작업 완료 후 실행되도록 하는 패턴
                  </p>
                  
                  <div className="bg-gray-900 text-orange-400 p-4 rounded font-mono text-sm">
                    <div>{`// 기본 콜백 예제`}</div>
                    <div>function fetchData(callback) {"{"}</div>
                    <div className="pl-4">setTimeout(() =&gt; {"{"}</div>
                    <div className="pl-8">const data = &quot;서버 데이터&quot;;</div>
                    <div className="pl-8">callback(data);</div>
                    <div className="pl-4">{"}"}, 1000);</div>
                    <div>{"}"}</div>
                    <div className="mt-2">fetchData((data) =&gt; {"{"}</div>
                    <div className="pl-4">console.log(data); // &quot;서버 데이터&quot;</div>
                    <div>{"}"});</div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-red-100 rounded border border-red-300">
                    <h4 className="font-semibold text-red-800 mb-1">⚠️ Callback Hell</h4>
                    <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-xs">
                      <div>getData((a) =&gt; {"{"}</div>
                      <div className="pl-4">getMoreData(a, (b) =&gt; {"{"}</div>
                      <div className="pl-8">getMoreData(b, (c) =&gt; {"{"}</div>
                      <div className="pl-12">getMoreData(c, (d) =&gt; {"{"}</div>
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
                  <h3 className="font-semibold text-blue-800 mb-2">🤝 Promise 패턴</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    비동기 작업의 최종 완료 또는 실패를 나타내는 객체
                  </p>
                  
                  <div className="bg-gray-900 text-blue-400 p-4 rounded font-mono text-sm">
                    <div>{`// Promise 체이닝`}</div>
                    <div>fetch(&apos;/api/user&apos;)</div>
                    <div className="pl-4">.then(response =&gt; response.json())</div>
                    <div className="pl-4">.then(user =&gt; fetch(`/api/posts/${"{"}<span className="text-green-400">user.id</span>{"}"}`))</div>
                    <div className="pl-4">.then(response =&gt; response.json())</div>
                    <div className="pl-4">.then(posts =&gt; console.log(posts))</div>
                    <div className="pl-4">.catch(error =&gt; console.error(error));</div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-blue-300">
                      <div className="font-semibold text-blue-700">Pending</div>
                      <div className="text-xs text-gray-600">대기 상태</div>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <div className="font-semibold text-green-700">Fulfilled</div>
                      <div className="text-xs text-gray-600">이행 완료</div>
                    </div>
                    <div className="bg-white p-3 rounded border border-red-300">
                      <div className="font-semibold text-red-700">Rejected</div>
                      <div className="text-xs text-gray-600">거부됨</div>
                    </div>
                  </div>

                  <div className="mt-4 bg-purple-100 p-3 rounded border border-purple-300">
                    <h4 className="font-semibold text-purple-800 mb-1">✨ Promise 유틸리티</h4>
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
                  <h3 className="font-semibold text-green-800 mb-2">⚡ Async/Await 패턴</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Promise를 더 읽기 쉽게 작성할 수 있는 문법적 설탕
                  </p>
                  
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                    <div>{`// 동기 코드처럼 작성`}</div>
                    <div>async function fetchUserPosts() {"{"}</div>
                    <div className="pl-4">try {"{"}</div>
                    <div className="pl-8">const userResponse = await fetch(&apos;/api/user&apos;);</div>
                    <div className="pl-8">const user = await userResponse.json();</div>
                    <div className="pl-8"></div>
                    <div className="pl-8">const postsResponse = await fetch(`/api/posts/${"{"}<span className="text-blue-400">user.id</span>{"}"}`);</div>
                    <div className="pl-8">const posts = await postsResponse.json();</div>
                    <div className="pl-8"></div>
                    <div className="pl-8">return posts;</div>
                    <div className="pl-4">{"}"} catch (error) {"{"}</div>
                    <div className="pl-8">console.error(&apos;Error:&apos;, error);</div>
                    <div className="pl-4">{"}"}</div>
                    <div>{"}"}</div>
                  </div>
                  
                  <div className="mt-4 bg-yellow-100 p-3 rounded border border-yellow-300">
                    <h4 className="font-semibold text-yellow-800 mb-1">💡 장점</h4>
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
                  <h4 className="font-semibold text-gray-800 mb-2">Async/Await</h4>
                  <div className="bg-gray-900 text-gray-400 p-2 rounded font-mono text-xs">
                    <div>try {"{"}</div>
                    <div className="pl-4">const data = await promise;</div>
                    <div>{"}"} catch (err) {"{"}</div>
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