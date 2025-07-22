"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";

// Debounce 함수 구현
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle 함수 구현
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

interface EventLog {
  id: number;
  type: "event" | "debounce" | "throttle";
  timestamp: number;
  message: string;
}

const DebounceThrottleLanding = () => {
  const [searchInput, setSearchInput] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<"search" | "scroll">("search");
  const [delayTime, setDelayTime] = useState(1000); // 기본 1초로 설정
  const logIdRef = useRef(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((type: EventLog["type"], message: string) => {
    const newLog: EventLog = {
      id: logIdRef.current++,
      type,
      timestamp: Date.now(),
      message,
    };
    setEventLogs((prev) => [...prev.slice(-9), newLog]);
  }, []);

  // 로그가 추가될 때마다 자동으로 맨 아래로 스크롤
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [eventLogs]);

  const clearLogs = () => {
    setEventLogs([]);
    logIdRef.current = 0;
  };

  // 검색 데모용 함수들
  const normalSearch = (value: string) => {
    addLog("event", `검색 실행: "${value}"`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      addLog("debounce", `Debounced 검색: "${value}"`);
    }, delayTime),
    [addLog, delayTime]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSearch = useCallback(
    throttle((value: string) => {
      addLog("throttle", `Throttled 검색: "${value}"`);
    }, delayTime),
    [addLog, delayTime]
  );

  // 스크롤 데모용 함수들
  const normalScroll = (position: number) => {
    addLog("event", `스크롤 위치: ${position}px`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedScroll = useCallback(
    debounce((position: number) => {
      addLog("debounce", `Debounced 스크롤: ${position}px`);
    }, delayTime),
    [addLog, delayTime]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledScroll = useCallback(
    throttle((position: number) => {
      addLog("throttle", `Throttled 스크롤: ${position}px`);
    }, delayTime),
    [addLog, delayTime]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (isActive) {
      normalSearch(value);
      debouncedSearch(value);
      throttledSearch(value);
    }
  };

  const handleScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.value);
    setScrollPosition(position);

    if (isActive) {
      normalScroll(position);
      debouncedScroll(position);
      throttledScroll(position);
    }
  };

  const getLogTypeColor = (type: EventLog["type"]) => {
    switch (type) {
      case "event":
        return "bg-red-100 text-red-800 border-red-200";
      case "debounce":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "throttle":
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* 개념 설명 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
            🎯 Debounce
          </h3>
          <div className="space-y-3">
            <p className="text-blue-700 text-sm leading-relaxed">
              <strong>연속된 이벤트 중 마지막 이벤트만 실행</strong>
            </p>
            <div className="bg-blue-200 p-3 rounded-lg">
              <p className="text-xs text-blue-800 font-medium">작동 방식:</p>
              <p className="text-xs text-blue-700">
                이벤트가 발생할 때마다 타이머를 재설정하고, 지정된 시간 동안
                추가 이벤트가 없을 때만 함수를 실행
              </p>
            </div>
            <div className="text-xs text-blue-600">
              <p>
                <strong>적합한 사용 사례:</strong>
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>검색 입력 (실시간 검색)</li>
                <li>폼 검증</li>
                <li>자동 저장</li>
                <li>API 호출 최적화</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
            ⚡ Throttle
          </h3>
          <div className="space-y-3">
            <p className="text-green-700 text-sm leading-relaxed">
              <strong>일정 시간 간격으로 함수를 실행</strong>
            </p>
            <div className="bg-green-200 p-3 rounded-lg">
              <p className="text-xs text-green-800 font-medium">작동 방식:</p>
              <p className="text-xs text-green-700">
                함수가 실행된 후 지정된 시간 동안은 추가 호출을 무시하고, 시간이
                지나면 다시 실행 가능
              </p>
            </div>
            <div className="text-xs text-green-600">
              <p>
                <strong>적합한 사용 사례:</strong>
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>스크롤 이벤트</li>
                <li>리사이즈 이벤트</li>
                <li>무한 스크롤</li>
                <li>게임 조작 (연속 클릭)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 어원과 기억법 */}
      <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-6 rounded-xl border border-indigo-200">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800 text-center">
          📚 어원과 기억법
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-indigo-200">
                <th className="text-left p-3 text-indigo-700">단어</th>
                <th className="text-left p-3 text-indigo-700">원래 의미</th>
                <th className="text-left p-3 text-indigo-700">동작 방식</th>
                <th className="text-left p-3 text-indigo-700">기억법 요약</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-indigo-100">
                <td className="p-3 font-medium text-blue-600">Debounce</td>
                <td className="p-3">bounce(튀다) + de(제거)</td>
                <td className="p-3">마지막 입력만 처리</td>
                <td className="p-3 font-medium text-blue-600">
                  튀는 입력 제거 → &quot;끝난 뒤에 한 번만&quot;
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-green-600">Throttle</td>
                <td className="p-3">속도 조절기 (가속 조절 장치)</td>
                <td className="p-3">일정 간격으로 실행</td>
                <td className="p-3 font-medium text-green-600">
                  과도한 입력을 제한 → &quot;주기적으로만&quot;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-indigo-100 rounded-lg">
          <p className="text-sm text-indigo-700">
            💡 <strong>쉬운 기억법:</strong> Debounce는 &quot;공이 튀는 것을
            막아서 마지막에 한 번만&quot;, Throttle은 &quot;자동차 가속을
            조절해서 일정하게&quot;
          </p>
        </div>
      </div>

      {/* 비교 차트 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-xl font-semibold mb-4 text-purple-800 text-center">
          📊 Debounce vs Throttle 비교
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-200">
                <th className="text-left p-3 text-purple-700">구분</th>
                <th className="text-left p-3 text-blue-700">Debounce</th>
                <th className="text-left p-3 text-green-700">Throttle</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-purple-100">
                <td className="p-3 font-medium">실행 패턴</td>
                <td className="p-3">마지막 이벤트만 실행</td>
                <td className="p-3">일정 간격으로 실행</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-3 font-medium">타이머 처리</td>
                <td className="p-3">매번 타이머 재설정</td>
                <td className="p-3">일정 시간 후 재활성화</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-3 font-medium">연속 입력 시</td>
                <td className="p-3">입력이 끝날 때까지 실행 지연</td>
                <td className="p-3">일정 간격으로 중간 실행</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">주요 목적</td>
                <td className="p-3">불필요한 호출 완전 방지</td>
                <td className="p-3">호출 빈도 제한</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 실습 섹션 */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-yellow-800">
            🧪 인터랙티브 시뮬레이터
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentDemo("search")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentDemo === "search"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
              }`}
            >
              검색 데모
            </button>
            <button
              onClick={() => setCurrentDemo("scroll")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentDemo === "scroll"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
              }`}
            >
              스크롤 데모
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 컨트롤 영역 */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsActive(!isActive);
                  if (!isActive) clearLogs();
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {isActive ? "시뮬레이션 중지" : "시뮬레이션 시작"}
              </button>
              <button
                onClick={clearLogs}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                로그 초기화
              </button>
            </div>

            {/* 지연시간 조정 컨트롤 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지연시간 설정: {delayTime}ms
              </label>
              <input
                type="range"
                min="200"
                max="3000"
                step="100"
                value={delayTime}
                onChange={(e) => setDelayTime(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>200ms (빠름)</span>
                <span>1500ms (보통)</span>
                <span>3000ms (느림)</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                💡 더 큰 지연시간으로 설정하면 debounce와 throttle의 차이를 더
                명확하게 확인할 수 있습니다!
              </p>
            </div>

            {currentDemo === "search" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  검색어 입력 (현재 지연: {delayTime}ms)
                </label>
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="여기에 입력해보세요..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  disabled={!isActive}
                />
                <p className="text-xs text-gray-600 mt-2">
                  빠르게 타이핑하며 debounce와 throttle의 차이를 확인해보세요!
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  스크롤 위치 시뮬레이션 (현재 지연: {delayTime}ms)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={scrollPosition}
                  onChange={handleScrollChange}
                  className="w-full"
                  disabled={!isActive}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0px</span>
                  <span className="font-medium">{scrollPosition}px</span>
                  <span>1000px</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  슬라이더를 빠르게 움직여 이벤트 처리 방식의 차이를
                  확인해보세요!
                </p>
              </div>
            )}

            {/* 실행 카운터 */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="text-xs text-red-600 font-medium">
                  일반 이벤트
                </div>
                <div className="text-lg font-bold text-red-700">
                  {eventLogs.filter((log) => log.type === "event").length}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-600 font-medium">
                  Debounce
                </div>
                <div className="text-lg font-bold text-blue-700">
                  {eventLogs.filter((log) => log.type === "debounce").length}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-xs text-green-600 font-medium">
                  Throttle
                </div>
                <div className="text-lg font-bold text-green-700">
                  {eventLogs.filter((log) => log.type === "throttle").length}
                </div>
              </div>
            </div>
          </div>

          {/* 로그 영역 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              🔍 실시간 이벤트 로그
            </h4>
            <div
              ref={logContainerRef}
              className="bg-gray-50 rounded-lg p-4 h-90 overflow-y-auto"
            >
              {eventLogs.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  시뮬레이션을 시작하고 입력해보세요!
                </div>
              ) : (
                <div className="space-y-2">
                  {eventLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`px-3 py-2 rounded border text-xs ${getLogTypeColor(
                        log.type
                      )}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{log.message}</span>
                        <span className="text-xs opacity-75">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 코드 예제 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">
            💡 Debounce 구현 코드
          </h4>
          <pre className="bg-blue-900 text-blue-100 p-4 rounded-lg text-xs overflow-x-auto">
            {`function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// 사용 예제
const debouncedSearch = debounce((query) => {
  console.log('검색:', query);
}, 500);

// 연속 호출해도 마지막 호출만 실행됨
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc'); // 이것만 실행`}
          </pre>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="text-lg font-semibold text-green-800 mb-4">
            ⚡ Throttle 구현 코드
          </h4>
          <pre className="bg-green-900 text-green-100 p-4 rounded-lg text-xs overflow-x-auto">
            {`function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// 사용 예제
const throttledScroll = throttle(() => {
  console.log('스크롤 처리');
}, 100);

// 100ms마다 한 번씩만 실행됨
window.addEventListener('scroll', throttledScroll);`}
          </pre>
        </div>
      </div>

      {/* 실무 활용 팁 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">
          🚀 실무 활용 팁
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-indigo-700 mb-3">
              ✅ 적절한 사용
            </h4>
            <ul className="space-y-2 text-sm text-indigo-600">
              <li>
                • <strong>Debounce:</strong> 사용자 입력 완료 후 처리 (검색,
                검증)
              </li>
              <li>
                • <strong>Throttle:</strong> 지속적인 이벤트 제어 (스크롤,
                리사이즈)
              </li>
              <li>• 적절한 지연 시간 설정 (보통 100-500ms)</li>
              <li>• 사용자 경험을 고려한 시간 조정</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-700 mb-3">⚠️ 주의사항</h4>
            <ul className="space-y-2 text-sm text-indigo-600">
              <li>• 너무 긴 지연 시간은 사용자 경험 저하</li>
              <li>• 메모리 누수 방지를 위한 cleanup 필요</li>
              <li>• React에서는 useCallback과 함께 사용</li>
              <li>• 컴포넌트 언마운트 시 타이머 정리</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DebounceThrottleLanding };
