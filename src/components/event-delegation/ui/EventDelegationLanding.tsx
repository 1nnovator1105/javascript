"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface EventLogEntry {
  timestamp: string;
  action: string;
  target: string;
  currentTarget: string;
  eventPath: string[];
  delegationMode: "individual" | "delegation";
  propagationPhase: "capturing" | "target" | "bubbling";
  type: "click" | "change" | "add" | "remove";
}

interface PerformanceMetrics {
  individualListeners: number;
  delegatedListeners: number;
  memoryUsage: string;
  eventCount: number;
}

const EventDelegationLanding = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      id: "1",
      text: "JavaScript 학습하기",
      completed: false,
      createdAt: Date.now(),
    },
    {
      id: "2",
      text: "React 프로젝트 만들기",
      completed: false,
      createdAt: Date.now(),
    },
    {
      id: "3",
      text: "Event Delegation 이해하기",
      completed: true,
      createdAt: Date.now(),
    },
  ]);
  const [newTodoText, setNewTodoText] = useState("");
  const [delegationMode, setDelegationMode] = useState<
    "individual" | "delegation"
  >("delegation");
  const [propagationMode, setPropagationMode] = useState<
    "bubbling" | "capturing-bubbling"
  >("bubbling");
  const [eventLogs, setEventLogs] = useState<EventLogEntry[]>([]);
  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>({
      individualListeners: 0,
      delegatedListeners: 1,
      memoryUsage: "낮음",
      eventCount: 0,
    });
  const [highlightedElement, setHighlightedElement] = useState<string | null>(
    null
  );
  const [currentPhase, setCurrentPhase] = useState<
    "capturing" | "target" | "bubbling" | null
  >(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const todoContainerRef = useRef<HTMLDivElement>(null);
  const eventCountRef = useRef(0);

  const addLog = useCallback((entry: Omit<EventLogEntry, "timestamp">) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLogs((prev) => [{ ...entry, timestamp }, ...prev].slice(0, 20));
    eventCountRef.current++;
  }, []);

  const updatePerformanceMetrics = useCallback(() => {
    const totalItems = todoItems.length;
    const individualCount =
      delegationMode === "individual" ? totalItems * 3 : 0; // 각 아이템마다 완료, 삭제, 클릭 리스너
    const delegatedCount = delegationMode === "delegation" ? 1 : 0;

    setPerformanceMetrics({
      individualListeners: individualCount,
      delegatedListeners: delegatedCount,
      memoryUsage:
        individualCount > 10 ? "높음" : individualCount > 5 ? "보통" : "낮음",
      eventCount: eventCountRef.current,
    });
  }, [todoItems.length, delegationMode]);

  useEffect(() => {
    updatePerformanceMetrics();
  }, [updatePerformanceMetrics]);

  const simulateEventPropagation = useCallback(
    async (targetElement: string, action: string) => {
      setIsSimulating(true);
      const eventPath = [
        "Document",
        "Todo Container",
        "Todo Item",
        targetElement,
      ];

      // Capturing Phase (Document → Target)
      if (propagationMode === "capturing-bubbling") {
        setCurrentPhase("capturing");
        for (let i = 0; i < eventPath.length - 1; i++) {
          setHighlightedElement(eventPath[i]);
          await new Promise((resolve) => setTimeout(resolve, 400));

          addLog({
            action: `Capturing: ${eventPath[i]}에서 이벤트 캐치`,
            target: targetElement,
            currentTarget: eventPath[i],
            eventPath: eventPath.slice(0, i + 1),
            delegationMode,
            propagationPhase: "capturing",
            type: action.includes("완료") ? "change" : "click",
          });
        }
      }

      // Target Phase
      setCurrentPhase("target");
      setHighlightedElement(targetElement);
      await new Promise((resolve) => setTimeout(resolve, 500));

      addLog({
        action: `${action} 이벤트 발생 (Target Phase)`,
        target: targetElement,
        currentTarget: targetElement,
        eventPath: eventPath,
        delegationMode,
        propagationPhase: "target",
        type: action.includes("완료") ? "change" : "click",
      });

      // Bubbling Phase (Target → Document)
      setCurrentPhase("bubbling");
      const bubblingPath = [...eventPath].reverse();
      for (let i = 1; i < bubblingPath.length; i++) {
        setHighlightedElement(bubblingPath[i]);
        await new Promise((resolve) => setTimeout(resolve, 400));

        addLog({
          action: `Bubbling: ${bubblingPath[i]}에서 이벤트 처리`,
          target: targetElement,
          currentTarget: bubblingPath[i],
          eventPath: eventPath,
          delegationMode,
          propagationPhase: "bubbling",
          type: action.includes("완료") ? "change" : "click",
        });
      }

      setHighlightedElement(null);
      setCurrentPhase(null);
      setIsSimulating(false);
    },
    [addLog, delegationMode, propagationMode]
  );

  const handleDelegatedClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const todoId = target
        .closest("[data-todo-id]")
        ?.getAttribute("data-todo-id");

      if (!todoId) return;

      if (target.classList.contains("complete-btn")) {
        await simulateEventPropagation("완료 버튼", "완료 토글");
        setTodoItems((prev) =>
          prev.map((item) =>
            item.id === todoId ? { ...item, completed: !item.completed } : item
          )
        );
      } else if (target.classList.contains("delete-btn")) {
        await simulateEventPropagation("삭제 버튼", "삭제");
        setTodoItems((prev) => prev.filter((item) => item.id !== todoId));
      } else if (target.closest(".todo-item")) {
        await simulateEventPropagation("Todo 아이템", "클릭");
      }
    },
    [simulateEventPropagation]
  );

  const handleIndividualClick = useCallback(
    async (todoId: string, action: string, buttonType: string) => {
      await simulateEventPropagation(buttonType, action);

      if (action.includes("완료")) {
        setTodoItems((prev) =>
          prev.map((item) =>
            item.id === todoId ? { ...item, completed: !item.completed } : item
          )
        );
      } else if (action.includes("삭제")) {
        setTodoItems((prev) => prev.filter((item) => item.id !== todoId));
      }
    },
    [simulateEventPropagation]
  );

  const addTodo = useCallback(async () => {
    if (!newTodoText.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: newTodoText,
      completed: false,
      createdAt: Date.now(),
    };

    setTodoItems((prev) => [...prev, newTodo]);
    setNewTodoText("");

    await simulateEventPropagation("추가 버튼", "새 Todo 추가");
    addLog({
      action: "새 Todo 아이템 추가",
      target: "추가 버튼",
      currentTarget: "Todo Container",
      eventPath: ["추가 버튼", "Todo Container"],
      delegationMode,
      propagationPhase: "bubbling",
      type: "add",
    });
  }, [newTodoText, simulateEventPropagation, addLog, delegationMode]);

  const resetSimulation = useCallback(() => {
    setTodoItems([
      {
        id: "1",
        text: "JavaScript 학습하기",
        completed: false,
        createdAt: Date.now(),
      },
      {
        id: "2",
        text: "React 프로젝트 만들기",
        completed: false,
        createdAt: Date.now(),
      },
      {
        id: "3",
        text: "Event Delegation 이해하기",
        completed: true,
        createdAt: Date.now(),
      },
    ]);
    setEventLogs([]);
    setNewTodoText("");
    eventCountRef.current = 0;
    setHighlightedElement(null);
  }, []);

  const getHighlightClass = (elementName: string) => {
    return highlightedElement === elementName
      ? "ring-4 ring-yellow-400 ring-opacity-75 bg-yellow-100 animate-pulse"
      : "";
  };

  const getButtonHighlightClass = (elementName: string) => {
    return highlightedElement === elementName
      ? "ring-4 ring-yellow-400 ring-opacity-75 animate-pulse shadow-lg shadow-yellow-400/50"
      : "";
  };

  const getDelegationModeColor = (mode: "individual" | "delegation") => {
    return delegationMode === mode
      ? "bg-blue-500 text-white"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";
  };

  return (
    <div>
      {/* 모드 선택 및 컨트롤 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-8">
        <div className="flex flex-col gap-6">
          {/* 이벤트 처리 모드 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                🎯 이벤트 처리 모드
              </h3>
              <p className="text-indigo-600 text-sm">
                다른 방식으로 이벤트를 처리해보고 차이점을 확인해보세요
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setDelegationMode("individual")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${getDelegationModeColor(
                  "individual"
                )}`}
              >
                ❌ 개별 리스너
              </button>
              <button
                onClick={() => setDelegationMode("delegation")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${getDelegationModeColor(
                  "delegation"
                )}`}
              >
                ✅ Event Delegation
              </button>
            </div>
          </div>

          {/* 이벤트 전파 모드 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-indigo-200">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                🔄 이벤트 전파 시뮬레이션
              </h3>
              <p className="text-purple-600 text-sm">
                Event Capturing과 Bubbling 단계를 시각적으로 확인하세요
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPropagationMode("bubbling")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  propagationMode === "bubbling"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                📈 Bubbling만
              </button>
              <button
                onClick={() => setPropagationMode("capturing-bubbling")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  propagationMode === "capturing-bubbling"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🔄 Capturing + Bubbling
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                🔄 리셋
              </button>
            </div>
          </div>

          {/* 현재 이벤트 단계 표시 */}
          {currentPhase && (
            <div className="flex items-center justify-center gap-4 py-3 bg-white rounded-lg border border-purple-200">
              <span className="text-sm font-medium text-gray-600">
                현재 단계:
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentPhase === "capturing"
                      ? "bg-red-500 animate-pulse"
                      : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    currentPhase === "capturing"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  Capturing
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentPhase === "target"
                      ? "bg-green-500 animate-pulse"
                      : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    currentPhase === "target"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  Target
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentPhase === "bubbling"
                      ? "bg-blue-500 animate-pulse"
                      : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    currentPhase === "bubbling"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  Bubbling
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 메인 시뮬레이터 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* DOM 트리 시각화 */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
            🏠 DOM 구조 시각화
            {isSimulating && (
              <span className="text-sm bg-yellow-500 text-white px-2 py-1 rounded-full animate-pulse">
                이벤트 전파 중
              </span>
            )}
          </h3>

          <div
            className={`border-2 border-dashed border-blue-300 rounded-lg p-4 ${getHighlightClass(
              "Document"
            )}`}
          >
            <div className="text-sm text-blue-600 font-medium mb-2">
              📄 Document
            </div>

            <div
              ref={todoContainerRef}
              className={`bg-white rounded-lg p-4 border-2 border-gray-200 ${getHighlightClass(
                "Todo Container"
              )}`}
              onClick={
                delegationMode === "delegation"
                  ? handleDelegatedClick
                  : undefined
              }
            >
              <div className="text-sm text-gray-600 font-medium mb-4 flex items-center justify-between">
                <span>
                  📋 Todo Container{" "}
                  {delegationMode === "delegation" && "(이벤트 리스너 등록됨)"}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {delegationMode === "delegation" ? "위임 모드" : "개별 모드"}
                </span>
              </div>

              {/* Todo 추가 영역 */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    placeholder="새 할일을 입력하세요..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && addTodo()}
                  />
                  <button
                    onClick={addTodo}
                    className={`px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200 ${getButtonHighlightClass(
                      "추가 버튼"
                    )}`}
                  >
                    ➕ 추가
                  </button>
                </div>
              </div>

              {/* Todo 리스트 */}
              <div className="space-y-2">
                {todoItems.map((todo) => (
                  <div
                    key={todo.id}
                    data-todo-id={todo.id}
                    className={`todo-item p-3 border rounded-lg transition-all duration-200 ${
                      todo.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200"
                    } ${getHighlightClass("Todo Item")}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          className={`complete-btn w-5 h-5 rounded border-2 flex items-center justify-center text-xs transition-all duration-200 ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-green-400"
                          } ${getButtonHighlightClass("완료 버튼")}`}
                          onClick={
                            delegationMode === "individual"
                              ? () =>
                                  handleIndividualClick(
                                    todo.id,
                                    "완료 토글",
                                    "완료 버튼"
                                  )
                              : undefined
                          }
                        >
                          {todo.completed && "✓"}
                        </button>
                        <span
                          className={`flex-1 ${
                            todo.completed
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {todo.text}
                        </span>
                        {delegationMode === "individual" && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                            개별 리스너
                          </span>
                        )}
                      </div>
                      <button
                        className={`delete-btn ml-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-all duration-200 ${getButtonHighlightClass(
                          "삭제 버튼"
                        )}`}
                        onClick={
                          delegationMode === "individual"
                            ? () =>
                                handleIndividualClick(
                                  todo.id,
                                  "삭제",
                                  "삭제 버튼"
                                )
                            : undefined
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 성능 메트릭 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border-2 border-green-200 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-green-800">
            📊 성능 메트릭
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 font-medium mb-1">
                이벤트 리스너 개수
              </div>
              <div className="text-2xl font-bold text-green-800">
                {delegationMode === "delegation"
                  ? performanceMetrics.delegatedListeners
                  : performanceMetrics.individualListeners}
              </div>
              <div className="text-xs text-green-500 mt-1">
                {delegationMode === "delegation" ? "위임 방식" : "개별 방식"}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 font-medium mb-1">
                메모리 사용량
              </div>
              <div
                className={`text-lg font-bold ${
                  performanceMetrics.memoryUsage === "높음"
                    ? "text-red-600"
                    : performanceMetrics.memoryUsage === "보통"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {performanceMetrics.memoryUsage}
              </div>
              <div className="text-xs text-gray-500 mt-1">추정 값</div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 font-medium mb-1">
                처리된 이벤트
              </div>
              <div className="text-2xl font-bold text-green-800">
                {performanceMetrics.eventCount}
              </div>
              <div className="text-xs text-green-500 mt-1">총 이벤트 수</div>
            </div>

            <div className="p-3 bg-blue-100 rounded-lg">
              <div className="text-sm font-medium text-blue-800 mb-2">
                💡 성능 비교
              </div>
              <div className="text-xs text-blue-700 space-y-1">
                <div>
                  • <strong>개별 방식:</strong> 각 요소마다 리스너 등록
                </div>
                <div>
                  • <strong>위임 방식:</strong> 부모에서 한 번만 등록
                </div>
                <div>
                  • <strong>메모리 절약:</strong> 위임 방식이 더 효율적
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이벤트 로그 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border-2 border-purple-200 shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-purple-800 flex items-center gap-2">
          📝 실시간 이벤트 로그
          <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded-full">
            {eventLogs.length}개
          </span>
        </h3>

        {eventLogs.length === 0 ? (
          <div className="text-gray-400 italic text-center p-8">
            아직 이벤트가 발생하지 않았습니다. Todo 아이템을 클릭해보세요!
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {eventLogs.map((log, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border text-sm ${
                  log.delegationMode === "delegation"
                    ? "bg-green-50 border-green-200"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-gray-800">
                    {log.action}
                  </span>
                  <span className="text-xs text-gray-500">{log.timestamp}</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>
                    <strong>Target:</strong> {log.target}
                  </div>
                  <div>
                    <strong>Current Target:</strong> {log.currentTarget}
                  </div>
                  <div>
                    <strong>Event Path:</strong> {log.eventPath.join(" → ")}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <strong>Mode:</strong>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          log.delegationMode === "delegation"
                            ? "bg-green-500 text-white"
                            : "bg-orange-500 text-white"
                        }`}
                      >
                        {log.delegationMode === "delegation"
                          ? "위임 방식"
                          : "개별 방식"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Phase:</strong>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          log.propagationPhase === "capturing"
                            ? "bg-red-500 text-white"
                            : log.propagationPhase === "target"
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {log.propagationPhase === "capturing"
                          ? "🔽 Capturing"
                          : log.propagationPhase === "target"
                          ? "🎯 Target"
                          : "🔼 Bubbling"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 실험 가이드 섹션 */}
      <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border-2 border-red-200 shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-red-800 flex items-center gap-2">
          🧪 실험해보기
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">
              🔬 실험 1: 성능 비교
            </h4>
            <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
              <li>개별 리스너 모드로 전환</li>
              <li>새 Todo를 10개 이상 추가</li>
              <li>성능 메트릭에서 리스너 개수 확인</li>
              <li>위임 모드로 전환하여 비교</li>
            </ol>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">
              ⚡ 실험 2: Bubbling 전파
            </h4>
            <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
              <li>"Bubbling만" 모드 선택</li>
              <li>Todo 아이템 클릭</li>
              <li>이벤트 로그에서 Bubbling 단계만 확인</li>
              <li>하이라이트 애니메이션 관찰</li>
            </ol>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">
              🔄 실험 3: Capturing + Bubbling
            </h4>
            <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
              <li>"Capturing + Bubbling" 모드 선택</li>
              <li>Todo 아이템 클릭</li>
              <li>3단계 전파 과정 관찰</li>
              <li>각 단계별 로그와 하이라이트 확인</li>
            </ol>
          </div>
        </div>
      </div>

      {/* 학습 가이드 섹션 */}
      <div className="border-t border-gray-200 pt-8">
        <div className="text-center mb-8">
          <h2 className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl md:text-3xl">
            📚 학습 가이드: Event Delegation
          </h2>
          <p className="text-gray-500 font-normal m-0 text-sm md:text-base">
            실제 코드와 함께 이벤트 위임의 작동 원리를 이해해보세요
          </p>
        </div>

        {/* 작동 원리 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🔍 이벤트 전파와 위임의 작동 원리
          </h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">
                📊 이벤트 전파 3단계
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-800 mb-1">
                    🔽 1. Capturing Phase
                  </div>
                  <div className="text-sm text-red-700">
                    Document → 부모 → 자식 → Target
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-800 mb-1">
                    🎯 2. Target Phase
                  </div>
                  <div className="text-sm text-green-700">
                    실제 이벤트가 발생한 요소에서 처리
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800 mb-1">
                    🔼 3. Bubbling Phase
                  </div>
                  <div className="text-sm text-blue-700">
                    Target → 자식 → 부모 → Document
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-blue-800 mb-3">
              ⚡ Event Delegation 원리
            </h4>
            <ol className="list-decimal list-inside space-y-3 text-sm">
              <li>
                <strong className="text-blue-800">이벤트 전파 활용:</strong>{" "}
                Capturing 또는 Bubbling 단계에서 부모 요소가 자식의 이벤트를
                감지합니다.
              </li>
              <li>
                <strong className="text-blue-800">단일 리스너 등록:</strong>{" "}
                부모 컨테이너에 하나의 이벤트 리스너만 등록합니다.
              </li>
              <li>
                <strong className="text-blue-800">타겟 식별:</strong>{" "}
                event.target으로 실제 클릭된 요소를 확인하고
                event.currentTarget으로 리스너가 등록된 요소를 확인합니다.
              </li>
              <li>
                <strong className="text-blue-800">동적 처리:</strong> 새로
                추가된 요소도 자동으로 이벤트 처리가 가능합니다.
              </li>
              <li>
                <strong className="text-blue-800">메모리 효율:</strong> 개별
                리스너 대신 하나의 리스너로 모든 이벤트를 처리합니다.
              </li>
            </ol>
          </div>
        </div>

        {/* 핵심 코드 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            💻 핵심 코드 분석
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 잘못된 방법 */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                ❌ 개별 이벤트 리스너 방식
              </h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{`// 각 Todo 아이템마다 리스너 등록
todoItems.forEach(item => {
  const element = document.getElementById(item.id);
  
  // 완료 버튼 리스너
  const completeBtn = element.querySelector('.complete');
  completeBtn.addEventListener('click', handleComplete);
  
  // 삭제 버튼 리스너  
  const deleteBtn = element.querySelector('.delete');
  deleteBtn.addEventListener('click', handleDelete);
});

// 문제점:
// - 요소마다 여러 개의 리스너 필요
// - 메모리 사용량 증가
// - 동적 요소에 수동으로 리스너 추가 필요`}</pre>
              </div>
            </div>

            {/* 올바른 방법 */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                ✅ Event Delegation 방식
              </h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{`// 부모 컨테이너에 하나의 리스너만 등록
const todoContainer = document.getElementById('todoContainer');

// Bubbling 단계에서 처리 (기본값)
todoContainer.addEventListener('click', (e) => {
  const target = e.target;          // 실제 클릭된 요소
  const currentTarget = e.currentTarget; // 리스너가 등록된 요소
  const todoId = target.closest('[data-todo-id]')?.getAttribute('data-todo-id');
  
  if (target.classList.contains('complete-btn')) {
    handleComplete(todoId);
  } else if (target.classList.contains('delete-btn')) {
    handleDelete(todoId);
  }
}, false); // false = Bubbling 단계 (기본값)

// Capturing 단계에서 처리하려면:
todoContainer.addEventListener('click', (e) => {
  // 이벤트가 자식으로 전파되기 전에 먼저 처리됨
  console.log('Capturing phase:', e.currentTarget);
}, true); // true = Capturing 단계

// 장점:
// - 하나의 리스너로 모든 이벤트 처리
// - 메모리 효율적
// - 동적 요소 자동 처리
// - Capturing/Bubbling 단계 선택 가능`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 주요 개념 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🎯 주요 개념
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200 shadow-sm">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                🔽 Event Capturing
              </h4>
              <p className="text-sm text-red-700">
                이벤트가 Document에서 시작해서 타겟 요소까지 내려가는
                과정입니다. addEventListener의 세 번째 매개변수를 true로
                설정하면 활용할 수 있습니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 shadow-sm">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                🔼 Event Bubbling
              </h4>
              <p className="text-sm text-yellow-700">
                이벤트가 타겟 요소에서 시작해서 Document까지 올라가는
                과정입니다. 기본 동작이며, Event Delegation에서 주로 활용됩니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                🎯 event.target vs currentTarget
              </h4>
              <p className="text-sm text-green-700">
                target은 실제 클릭된 요소, currentTarget은 이벤트 리스너가
                등록된 요소입니다. 위임에서는 target으로 실제 클릭 요소를
                확인합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200 shadow-sm">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                ⚡ 성능 최적화
              </h4>
              <p className="text-sm text-purple-700">
                하나의 이벤트 리스너로 여러 요소의 이벤트를 처리하여 메모리
                사용량을 줄이고 성능을 향상시킬 수 있습니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                🔄 동적 요소 처리
              </h4>
              <p className="text-sm text-blue-700">
                새로 추가된 요소에 별도의 이벤트 리스너를 등록할 필요 없이
                자동으로 이벤트 처리가 가능합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 shadow-sm">
              <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                🎪 useCapture 매개변수
              </h4>
              <p className="text-sm text-indigo-700">
                addEventListener(event, handler, useCapture)에서 useCapture가
                true면 Capturing 단계, false면 Bubbling 단계에서 처리됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 실제 사용 예시 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🌟 실제 사용 사례
          </h3>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 border-2 border-indigo-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    📋 1. Todo 리스트
                  </h4>
                  <p className="text-sm text-indigo-700 mb-2">
                    동적으로 추가/삭제되는 Todo 아이템들의 이벤트를 효율적으로
                    처리
                  </p>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    <pre>{`// 테이블 행 클릭 처리
table.addEventListener('click', (e) => {
  if (e.target.matches('.edit-btn')) {
    editRow(e.target.closest('tr'));
  }
});`}</pre>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    📊 2. 데이터 테이블
                  </h4>
                  <p className="text-sm text-indigo-700 mb-2">
                    대량의 테이블 행에서 편집, 삭제 버튼 이벤트 처리
                  </p>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    <pre>{`// 내비게이션 메뉴
nav.addEventListener('click', (e) => {
  if (e.target.matches('a[data-page]')) {
    loadPage(e.target.dataset.page);
  }
});`}</pre>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    🎮 3. 게임 인터페이스
                  </h4>
                  <p className="text-sm text-indigo-700 mb-2">
                    게임 보드의 여러 타일이나 버튼들의 클릭 이벤트 처리
                  </p>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    <pre>{`// 게임 보드
gameBoard.addEventListener('click', (e) => {
  const tile = e.target.closest('.tile');
  if (tile) handleTileClick(tile);
});`}</pre>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    🏪 4. 쇼핑몰 상품 목록
                  </h4>
                  <p className="text-sm text-indigo-700 mb-2">
                    상품 카드의 장바구니 추가, 찜하기 등의 버튼 이벤트 처리
                  </p>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    <pre>{`// 상품 목록
productGrid.addEventListener('click', (e) => {
  const productId = e.target.closest('[data-product-id]')?.dataset.productId;
  if (e.target.matches('.add-to-cart')) {
    addToCart(productId);
  }
});`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 성능 최적화 팁 */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 border-2 border-emerald-200">
          <h3 className="text-lg font-semibold mb-4 text-emerald-800">
            🚀 성능 최적화 팁
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-700">
            <div>
              <h4 className="font-medium mb-2">✅ Best Practices</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>가장 가까운 공통 부모에 리스너 등록</li>
                <li>event.target으로 정확한 요소 식별</li>
                <li>closest() 메서드로 조상 요소 찾기</li>
                <li>이벤트 타입별로 적절히 분리</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">⚠️ 주의사항</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>이벤트 전파가 중단되면 작동 안 함</li>
                <li>너무 상위 요소에 등록하면 성능 저하</li>
                <li>복잡한 선택자는 성능에 영향</li>
                <li>필요한 경우 stopPropagation() 사용</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventDelegationLanding };
