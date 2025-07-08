"use client";

import React, { useState, useRef, useCallback } from "react";
import StudyPageLayout from "../../components/StudyPageLayout";

interface TimeoutInfo {
  id: string;
  capturedValue: number;
  startTime: number;
  timeoutId: NodeJS.Timeout;
}

interface LogEntry {
  timestamp: string;
  action: string;
  beforeValue: number;
  afterValue: number;
  capturedValue?: number;
  type: "immediate" | "timeout" | "timeout-start";
}

export default function ScopePage() {
  const [count, setCount] = useState(0);
  const [pendingTimeouts, setPendingTimeouts] = useState<TimeoutInfo[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [useCorrectMethod, setUseCorrectMethod] = useState(false);
  const timeoutIdRef = useRef(0);

  const addLog = useCallback((entry: Omit<LogEntry, "timestamp">) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { ...entry, timestamp }]);
  }, []);

  const clearTimeouts = useCallback(() => {
    pendingTimeouts.forEach((timeout) => {
      clearTimeout(timeout.timeoutId);
    });
    setPendingTimeouts([]);
  }, [pendingTimeouts]);

  const resetSimulation = useCallback(() => {
    setCount(0);
    clearTimeouts();
    setLogs([]);
    timeoutIdRef.current = 0;
  }, [clearTimeouts]);

  const immediateIncrement = useCallback(() => {
    setCount((prev) => {
      const newValue = prev + 1;
      addLog({
        action: "즉시 증가",
        beforeValue: prev,
        afterValue: newValue,
        type: "immediate",
      });
      return newValue;
    });
  }, [addLog]);

  const delayedIncrement = useCallback(() => {
    const currentCount = count; // 현재 count 값을 캡처
    const timeoutId = `timeout-${++timeoutIdRef.current}`;

    addLog({
      action: "1초 후 증가 시작",
      beforeValue: currentCount,
      afterValue: currentCount,
      capturedValue: currentCount,
      type: "timeout-start",
    });

    const timeout = setTimeout(() => {
      if (useCorrectMethod) {
        // 올바른 방법: 함수형 업데이트 사용
        setCount((prev) => {
          const newValue = prev + 1;
          addLog({
            action: "setTimeout 실행 (올바른 방법)",
            beforeValue: prev,
            afterValue: newValue,
            capturedValue: currentCount,
            type: "timeout",
          });
          return newValue;
        });
      } else {
        // 잘못된 방법: 캡처된 값 사용
        const newValue = currentCount + 1;
        setCount(newValue);
        addLog({
          action: "setTimeout 실행 (잘못된 방법)",
          beforeValue: currentCount,
          afterValue: newValue,
          capturedValue: currentCount,
          type: "timeout",
        });
      }

      // 완료된 timeout 제거
      setPendingTimeouts((prev) => prev.filter((t) => t.id !== timeoutId));
    }, 1000);

    // 진행 중인 timeout 추가
    setPendingTimeouts((prev) => [
      ...prev,
      {
        id: timeoutId,
        capturedValue: currentCount,
        startTime: Date.now(),
        timeoutId: timeout,
      },
    ]);
  }, [count, useCorrectMethod, addLog]);

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <StudyPageLayout
      title="🔍 JavaScript Scope & Closure 시뮬레이터"
      subtitle="클로저와 스코프 체인을 통해 변수 캡처 메커니즘을 시각적으로 학습해보세요"
      maxWidth="full"
      showBackButton={true}
    >
      {/* 메인 시뮬레이터 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 카운터 및 컨트롤 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">{count}</div>
            <div className="text-sm text-blue-500 font-medium">현재 Count</div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <button
                onClick={immediateIncrement}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                ⚡ 즉시 증가
              </button>
              <button
                onClick={delayedIncrement}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                ⏱️ 1초 후 증가
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCorrectMethod}
                  onChange={(e) => setUseCorrectMethod(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  올바른 방법 사용 (함수형 업데이트)
                </span>
              </label>
            </div>

            <button
              onClick={resetSimulation}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
            >
              🔄 리셋
            </button>
          </div>
        </div>

        {/* 실행 중인 setTimeout 표시 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border-2 border-purple-200 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-800 flex items-center gap-2">
            ⏳ 실행 중인 setTimeout
            <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded-full">
              {pendingTimeouts.length}개
            </span>
          </h3>

          {pendingTimeouts.length === 0 ? (
            <div className="text-gray-400 italic text-center p-8">
              실행 중인 setTimeout이 없습니다
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTimeouts.map((timeout) => (
                <div
                  key={timeout.id}
                  className="bg-white p-4 rounded-lg border border-purple-200 animate-pulse"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-purple-800">
                        {timeout.id}
                      </div>
                      <div className="text-sm text-purple-600">
                        캡처된 값: {timeout.capturedValue}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      시작: {new Date(timeout.startTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 실행 로그 섹션 */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border-2 border-slate-200 shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          📋 실행 로그
          <span className="text-sm bg-gray-500 text-white px-2 py-1 rounded-full">
            {logs.length}개
          </span>
          {logs.length > 0 && (
            <button
              onClick={() => setLogs([])}
              className="ml-auto text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              로그 지우기
            </button>
          )}
        </h3>

        <div className="max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-gray-400 italic text-center p-8">
              버튼을 클릭하면 실행 로그가 여기에 표시됩니다
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    log.type === "immediate"
                      ? "bg-green-50 border-green-500"
                      : log.type === "timeout-start"
                      ? "bg-orange-50 border-orange-500"
                      : "bg-red-50 border-red-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {log.action}
                      </div>
                      <div className="text-sm text-gray-600">
                        {log.beforeValue} → {log.afterValue}
                        {log.capturedValue !== undefined && (
                          <span className="ml-2 text-purple-600 font-medium">
                            (캡처된 값: {log.capturedValue})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {formatTime(log.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 문제 시연 섹션 */}
      <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border-2 border-red-200 shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-red-800 flex items-center gap-2">
          🚨 문제 시연: 빠르게 버튼 누르기
        </h3>
        <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
          <p className="text-gray-700 mb-2">
            <strong>실험해보세요:</strong> &quot;올바른 방법 사용&quot;
            체크박스를 <strong>해제</strong>하고 &quot;1초 후 증가&quot; 버튼을
            빠르게 여러 번 클릭해보세요!
          </p>
          <p className="text-red-600 font-medium">
            예상: 클릭한 만큼 증가 | 실제: 1만 증가하는 문제 발생
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-100 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">❌ 잘못된 방법</h4>
            <p className="text-sm text-red-700">
              setTimeout 콜백에서 캡처된 count 값을 사용하면, 모든 콜백이 동일한
              값을 참조하게 됩니다.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              ✅ 올바른 방법
            </h4>
            <p className="text-sm text-green-700">
              함수형 업데이트를 사용하면 최신 상태를 기반으로 올바르게
              증가합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 학습 가이드 섹션 */}
      <div className="border-t border-gray-200 pt-8">
        <div className="text-center mb-8">
          <h2 className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl md:text-3xl">
            📚 학습 가이드: JavaScript Scope & Closure
          </h2>
          <p className="text-gray-500 font-normal m-0 text-sm md:text-base">
            실제 코드와 함께 클로저와 스코프의 작동 원리를 이해해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 문제 코드 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              ❌ 문제가 있는 코드
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <pre>{`const delayedIncrement = () => {
  const currentCount = count; // 현재 값 캡처
  
  setTimeout(() => {
    // 잘못된 방법: 캡처된 값 사용
    const newValue = currentCount + 1;
    setCount(newValue);
  }, 1000);
};

// 빠르게 3번 클릭하면:
// 모든 setTimeout이 동일한 count 값을 캡처
// 결과: 모두 같은 값으로 업데이트 (1만 증가)`}</pre>
            </div>
          </div>

          {/* 해결 코드 */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
              ✅ 올바른 해결 코드
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <pre>{`const delayedIncrement = () => {
  setTimeout(() => {
    // 올바른 방법: 함수형 업데이트 사용
    setCount(prev => prev + 1);
  }, 1000);
};

// 빠르게 3번 클릭하면:
// 각 setTimeout이 실행될 때마다 
// 최신 상태를 기반으로 업데이트
// 결과: 정확히 3만큼 증가`}</pre>
            </div>
          </div>
        </div>

        {/* 핵심 개념 설명 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            🧠 핵심 개념 이해
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  1. 클로저 (Closure)
                </h4>
                <p className="text-sm text-blue-700">
                  함수가 생성될 때 외부 변수에 대한 참조를 &quot;기억&quot;하는
                  메커니즘입니다. setTimeout 콜백은 클로저를 통해 count 변수를
                  캡처합니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  2. 변수 캡처
                </h4>
                <p className="text-sm text-blue-700">
                  setTimeout이 생성되는 순간의 count 값이 캡처되어, 나중에
                  실행될 때도 그 값을 사용하게 됩니다.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  3. 함수형 업데이트
                </h4>
                <p className="text-sm text-blue-700">
                  setCount(prev =&gt; prev + 1)을 사용하면 실행 시점의 최신
                  상태를 받아서 업데이트하므로 클로저 문제를 해결할 수 있습니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  4. 스코프 체인
                </h4>
                <p className="text-sm text-blue-700">
                  JavaScript는 변수를 찾을 때 현재 스코프부터 시작해서 외부
                  스코프로 올라가며 검색합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
}
