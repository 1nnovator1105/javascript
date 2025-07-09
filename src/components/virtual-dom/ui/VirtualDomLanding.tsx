"use client";

import React, { useState, useEffect, useMemo } from "react";

interface DOMNode {
  type: string;
  props: Record<string, string | number>;
  children: (DOMNode | string)[];
  id: string;
}

interface VirtualDomState {
  realDomOperations: number;
  virtualDomOperations: number;
  currentStep: string;
  isRunning: boolean;
  domNodes: DOMNode[];
  changedNodes: string[];
  performanceMetrics: {
    realDomTime: number;
    virtualDomTime: number;
  };
}

// DOM 노드 시각화 컴포넌트
const DOMNodeVisualization: React.FC<{
  node: DOMNode;
  isChanged?: boolean;
  isVirtual?: boolean;
  changedNodes?: string[];
}> = ({ node, isChanged = false, isVirtual = false, changedNodes = [] }) => {
  // 현재 노드나 자식 노드 중 하나라도 변경되었는지 확인
  const isNodeChanged = isChanged || changedNodes.includes(node.id);

  // 자식 노드 중 변경된 것이 있는지 재귀적으로 확인
  const hasChangedChild = (currentNode: DOMNode): boolean => {
    if (changedNodes.includes(currentNode.id)) return true;
    return currentNode.children.some(
      (child) => typeof child !== "string" && hasChangedChild(child)
    );
  };

  const nodeOrChildChanged = isNodeChanged || hasChangedChild(node);
  return (
    <div
      className={`
        p-3 m-1 rounded-lg border-2 transition-all duration-700
        ${
          isNodeChanged
            ? "border-orange-500 bg-gradient-to-r from-yellow-200 to-orange-200 shadow-lg animate-pulse  ring-2 ring-orange-300"
            : nodeOrChildChanged
            ? "border-yellow-400 bg-yellow-50 shadow-md"
            : isVirtual
            ? "border-blue-400 bg-blue-50"
            : "border-green-400 bg-green-50"
        }
      `}
    >
      <div className="font-mono text-sm">
        <span className="text-purple-600 font-bold">&lt;{node.type}</span>
        {Object.entries(node.props).map(([key, value]) => (
          <span key={key} className="text-orange-600">
            {" "}
            {key}=&quot;{value}&quot;
          </span>
        ))}
        <span className="text-purple-600 font-bold">&gt;</span>
      </div>
      <div className="ml-4 mt-2">
        {node.children.map((child, idx) => (
          <div key={idx}>
            {typeof child === "string" ? (
              <span
                className={`text-gray-700 font-mono text-sm ${
                  isNodeChanged ? "animate-pulse text-orange-700 font-bold" : ""
                }`}
              >
                {child}
              </span>
            ) : (
              <DOMNodeVisualization
                node={child}
                isVirtual={isVirtual}
                isChanged={changedNodes.includes(child.id)}
                changedNodes={changedNodes}
              />
            )}
          </div>
        ))}
      </div>
      <div className="font-mono text-sm mt-1">
        <span className="text-purple-600 font-bold">&lt;/{node.type}&gt;</span>
      </div>
    </div>
  );
};

// 성능 비교 컴포넌트

const VirtualDomLanding: React.FC = () => {
  const [state, setState] = useState<VirtualDomState>({
    realDomOperations: 0,
    virtualDomOperations: 0,
    currentStep:
      "🎯 각 시뮬레이션 버튼을 눌러서 Real DOM과 Virtual DOM의 성능을 개별적으로 측정해보세요!",
    isRunning: false,
    domNodes: [],
    changedNodes: [],
    performanceMetrics: {
      realDomTime: 0,
      virtualDomTime: 0,
    },
  });

  const [selectedDemo, setSelectedDemo] = useState<string>("simulation");
  const [simulationState, setSimulationState] = useState<
    "idle" | "real-dom" | "virtual-dom" | "completed"
  >("idle");

  // 초기 DOM 트리 생성 (useMemo로 최적화)
  const initialDomTree: DOMNode[] = useMemo(
    () => [
      {
        type: "div",
        props: { className: "container", id: "root" },
        children: [
          {
            type: "h1",
            props: { className: "title" },
            children: ["Hello World"],
            id: "title-1",
          },
          {
            type: "ul",
            props: { className: "list" },
            children: [
              {
                type: "li",
                props: { key: "1" },
                children: ["Item 1"],
                id: "item-1",
              },
              {
                type: "li",
                props: { key: "2" },
                children: ["Item 2"],
                id: "item-2",
              },
            ],
            id: "list-1",
          },
        ],
        id: "root-1",
      },
    ],
    []
  );

  useEffect(() => {
    setState((prev) => ({ ...prev, domNodes: initialDomTree }));
  }, [initialDomTree]);

  // Real DOM 시뮬레이션 함수
  const runRealDomSimulation = async () => {
    if (state.isRunning) return;

    // Real DOM 초기화
    setState((prev) => ({
      ...prev,
      realDomOperations: 0,
      changedNodes: [],
    }));

    setSimulationState("real-dom");
    setState((prev) => ({
      ...prev,
      isRunning: true,
      currentStep: "🐌 Real DOM 방식 - 전체를 다시 렌더링합니다...",
    }));

    const realDomStart = performance.now();

    // Real DOM은 모든 노드를 업데이트
    const allNodeIds = ["root-1", "title-1", "list-1", "item-1", "item-2"];
    let realDomOps = 0;

    for (let i = 0; i < allNodeIds.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // 느리게
      realDomOps++;
      setState((prev) => ({
        ...prev,
        changedNodes: allNodeIds.slice(0, realDomOps), // 순차적으로 모든 노드 추가
        realDomOperations: realDomOps,
        currentStep: `Real DOM: ${realDomOps}/${allNodeIds.length} 노드 업데이트 (전체 재렌더링)`,
      }));
    }

    const realDomEnd = performance.now();
    const realDomTime = realDomEnd - realDomStart;

    setState((prev) => ({
      ...prev,
      performanceMetrics: { ...prev.performanceMetrics, realDomTime },
      currentStep: `Real DOM 완료: ${realDomTime.toFixed(
        2
      )}ms (${realDomOps} 노드 업데이트)`,
    }));

    // 완료 후 2초 대기
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        changedNodes: [],
        isRunning: false,
        currentStep:
          "🐌 Real DOM 시뮬레이션 완료! 모든 노드를 다시 렌더링했습니다.",
      }));
      setSimulationState("idle");
    }, 2000);
  };

  // Virtual DOM 시뮬레이션 함수
  const runVirtualDomSimulation = async () => {
    if (state.isRunning) return;

    // Virtual DOM 초기화
    setState((prev) => ({
      ...prev,
      virtualDomOperations: 0,
      changedNodes: [],
    }));

    setSimulationState("virtual-dom");
    setState((prev) => ({
      ...prev,
      isRunning: true,
      currentStep:
        "⚡ Virtual DOM 방식 - 변경된 부분만 찾아서 업데이트합니다...",
    }));

    const virtualDomStart = performance.now();

    // Diffing 과정
    setState((prev) => ({
      ...prev,
      currentStep: "Virtual DOM: Diffing 알고리즘 실행 중...",
    }));
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Virtual DOM은 변경된 노드만 업데이트
    const changedNodeIds = ["title-1"]; // 실제로는 제목만 변경됨
    let virtualDomOps = 0;

    setState((prev) => ({
      ...prev,
      currentStep: "Virtual DOM: 변경된 노드만 업데이트 중...",
    }));

    for (const nodeId of changedNodeIds) {
      await new Promise((resolve) => setTimeout(resolve, 200)); // 빠르게
      virtualDomOps++;
      setState((prev) => ({
        ...prev,
        changedNodes: [nodeId],
        virtualDomOperations: virtualDomOps,
        currentStep: `Virtual DOM: ${virtualDomOps}/${changedNodeIds.length} 노드 업데이트 (변경된 부분만)`,
      }));
    }

    const virtualDomEnd = performance.now();
    const virtualDomTime = virtualDomEnd - virtualDomStart;

    setState((prev) => ({
      ...prev,
      performanceMetrics: { ...prev.performanceMetrics, virtualDomTime },
      currentStep: `Virtual DOM 완료: ${virtualDomTime.toFixed(
        2
      )}ms (${virtualDomOps} 노드 업데이트)`,
    }));

    // 완료 후 2초 대기
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        changedNodes: [],
        isRunning: false,
        currentStep:
          "⚡ Virtual DOM 시뮬레이션 완료! 변경된 부분만 효율적으로 업데이트했습니다.",
      }));
      setSimulationState("idle");
    }, 2000);
  };

  const resetSimulation = () => {
    setSimulationState("idle");
    setState({
      realDomOperations: 0,
      virtualDomOperations: 0,
      currentStep:
        "🎯 각 시뮬레이션 버튼을 눌러서 Real DOM과 Virtual DOM의 성능을 개별적으로 측정해보세요!",
      isRunning: false,
      domNodes: initialDomTree,
      changedNodes: [],
      performanceMetrics: {
        realDomTime: 0,
        virtualDomTime: 0,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* 개념 설명 섹션 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
        <h2 className="text-xl font-semibold mb-4 text-purple-800">
          🧠 Virtual DOM이란? (쉽게 이해하기)
        </h2>

        {/* 쉬운 비유 설명 */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-purple-200">
          <h3 className="font-semibold mb-3 text-purple-700 flex items-center gap-2">
            🏠 쉬운 비유로 이해하기
          </h3>
          <div className="text-sm text-purple-600 space-y-2">
            <p>
              <strong>🎨 건축 설계도 vs 실제 건물:</strong>
            </p>
            <div className="ml-4 space-y-1">
              <p>
                • <strong>Real DOM</strong> = 실제 건물 (변경하려면 공사가
                필요하고 시간이 오래 걸림)
              </p>
              <p>
                • <strong>Virtual DOM</strong> = 설계도 (종이 위에서 빠르게 수정
                가능)
              </p>
              <p>
                • <strong>React의 역할</strong> = 설계도의 변경사항만 골라서
                실제 건물에 적용
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-purple-700">
              📱 실생활 예시
            </h3>
            <div className="space-y-2 text-sm text-purple-600">
              <p>
                <strong>Instagram 좋아요 버튼을 눌렀을 때:</strong>
              </p>
              <div className="ml-4 space-y-1">
                <p>
                  🐌 <strong>예전 방식:</strong> 전체 페이지를 다시 불러옴
                </p>
                <p>
                  ⚡ <strong>React 방식:</strong> 좋아요 숫자만 바뀜
                </p>
                <p>💡 Virtual DOM이 어느 부분만 바꿀지 미리 계산!</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-purple-700">
              🎯 왜 빠를까?
            </h3>
            <div className="space-y-2 text-sm text-purple-600">
              <p>
                <strong>Real DOM 조작은 느려요:</strong>
              </p>
              <div className="ml-4 space-y-1">
                <p>• 화면을 다시 그리기 (Repaint)</p>
                <p>• 레이아웃을 다시 계산 (Reflow)</p>
                <p>• 매번 브라우저 엔진과 소통</p>
              </div>
              <p className="mt-2">
                <strong>
                  Virtual DOM은 JavaScript 메모리에서 처리되어 빨라요!
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 시뮬레이션 가이드 */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800">
          🎮 지금부터 실험해볼 것들
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <div className="text-lg mb-2">🏁 성능 비교</div>
            <div className="text-sm text-indigo-600">
              <p className="font-semibold mb-1">무엇을 보여주나요?</p>
              <p>
                똑같은 작업을 할 때 Real DOM과 Virtual DOM 중 누가 더 빠른지
                시간을 재서 비교해봅니다.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <div className="text-lg mb-2">🌳 DOM 트리</div>
            <div className="text-sm text-indigo-600">
              <p className="font-semibold mb-1">무엇을 보여주나요?</p>
              <p>
                웹페이지의 구조를 나무 형태로 보여주고, 어느 부분이 바뀌는지
                깜빡이는 효과로 확인할 수 있어요.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <div className="text-lg mb-2">🔍 변경사항 찾기</div>
            <div className="text-sm text-indigo-600">
              <p className="font-semibold mb-1">무엇을 보여주나요?</p>
              <p>
                이전 상태와 새로운 상태를 비교해서 정확히 어떤 부분이 바뀌었는지
                찾아주는 과정을 보여줍니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 데모 선택 탭 */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
        {[
          {
            id: "simulation",
            label: "🎭 실시간 시뮬레이션",
            desc: "Real DOM vs Virtual DOM 비교",
            icon: "🎯",
          },
          {
            id: "explanation",
            label: "📚 상세 설명",
            desc: "개념과 작동 원리",
            icon: "💡",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedDemo(tab.id)}
            className={`
              group flex-1 p-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 border-2
              ${
                selectedDemo === tab.id
                  ? "bg-white text-indigo-600 shadow-lg border-indigo-300 "
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:shadow-md hover:scale-102 border-transparent hover:border-gray-200"
              }
            `}
          >
            <div className="flex items-center gap-2 justify-center">
              <span>{tab.label}</span>
              <span
                className={`text-xs transition-all duration-200 ${
                  selectedDemo === tab.id
                    ? "opacity-100"
                    : "opacity-60 group-hover:opacity-100"
                }`}
              >
                {tab.icon}
              </span>
            </div>
            <div
              className={`text-xs transition-all duration-200 ${
                selectedDemo === tab.id
                  ? "opacity-80"
                  : "opacity-70 group-hover:opacity-90"
              }`}
            >
              {tab.desc}
            </div>
          </button>
        ))}
      </div>

      {/* 현재 단계 표시 */}
      <div className="bg-gray-800 text-gray-50 p-4 rounded-lg text-center font-semibold">
        🎯 현재 단계: {state.currentStep}
      </div>

      {/* 실시간 시뮬레이션 */}
      {selectedDemo === "simulation" && (
        <div className="space-y-6">
          {/* 실험 설명 */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-3 text-blue-800">🧪 실험 내용</h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>
                <strong>시나리오:</strong> 웹페이지에서 텍스트를 하나 변경하는
                상황
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="bg-red-100 p-3 rounded border border-red-200">
                  <p>
                    <strong>🐌 Real DOM 방식:</strong>
                  </p>
                  <p className="mt-1">
                    전체 페이지를 다시 확인하고 모든 요소를 업데이트 (비효율적)
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded border border-green-200">
                  <p>
                    <strong>⚡ Virtual DOM 방식:</strong>
                  </p>
                  <p className="mt-1">
                    변경된 부분만 찾아서 그 부분만 업데이트 (효율적)
                  </p>
                </div>
              </div>
              <p className="text-center font-semibold mt-3">
                👇 각 버튼을 눌러서 Real DOM과 Virtual DOM 방식을 개별적으로
                체험해보세요!
              </p>
            </div>
          </div>

          {/* 컴팩트 성능 대시보드 */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                📊 성능 대시보드
              </h3>
            </div>

            {/* 컴팩트 성능 결과 */}
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-white p-2 rounded border">
                <div className="text-lg font-bold text-red-600">
                  {state.realDomOperations > 0
                    ? `${state.realDomOperations}`
                    : "--"}
                </div>
                <div className="text-xs text-gray-600">Real DOM</div>
                <div className="text-xs text-red-500">
                  {state.performanceMetrics.realDomTime > 0
                    ? `${state.performanceMetrics.realDomTime.toFixed(1)}ms`
                    : "미실행"}
                </div>
              </div>

              <div className="bg-white p-2 rounded border">
                <div className="text-lg font-bold text-green-600">
                  {state.virtualDomOperations > 0
                    ? `${state.virtualDomOperations}`
                    : "--"}
                </div>
                <div className="text-xs text-gray-600">Virtual DOM</div>
                <div className="text-xs text-green-500">
                  {state.performanceMetrics.virtualDomTime > 0
                    ? `${state.performanceMetrics.virtualDomTime.toFixed(1)}ms`
                    : "미실행"}
                </div>
              </div>

              <div className="bg-white p-2 rounded border">
                <div className="text-lg font-bold text-blue-600">
                  {state.performanceMetrics.realDomTime > 0 &&
                  state.performanceMetrics.virtualDomTime > 0
                    ? `${(
                        state.performanceMetrics.realDomTime /
                        state.performanceMetrics.virtualDomTime
                      ).toFixed(1)}x`
                    : "--"}
                </div>
                <div className="text-xs text-gray-600">속도 차이</div>
                <div className="text-xs text-blue-500">
                  {state.performanceMetrics.realDomTime > 0 &&
                  state.performanceMetrics.virtualDomTime > 0
                    ? "Virtual DOM 승리!"
                    : "비교 대기"}
                </div>
              </div>
            </div>

            {/* 최종 결론 (양쪽 모두 실행된 경우에만) */}
            {state.performanceMetrics.realDomTime > 0 &&
              state.performanceMetrics.virtualDomTime > 0 && (
                <div className="mt-3 p-2 bg-green-100 rounded border border-green-200">
                  <div className="text-center text-xs text-green-700">
                    🏆 Virtual DOM이{" "}
                    {(
                      state.performanceMetrics.realDomTime /
                      state.performanceMetrics.virtualDomTime
                    ).toFixed(1)}
                    배 더 빠르게 완료!
                  </div>
                </div>
              )}
          </div>

          {/* DOM 트리 시각화 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real DOM */}
            <div
              className={`bg-green-50 p-4 rounded-xl border border-green-200 transition-all duration-300 shadow-sm hover:shadow-md ${
                simulationState === "real-dom"
                  ? "ring-2 ring-red-400 bg-red-50 shadow-red-100"
                  : "hover:border-green-300"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                  🌳 Real DOM
                  <span className="text-xs bg-green-200 px-2 py-1 rounded">
                    실제 화면
                  </span>
                  {simulationState === "real-dom" && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded animate-pulse">
                      진행 중
                    </span>
                  )}
                </h3>
                {/* 실시간 진행률 표시 */}
                <div className="text-right">
                  <div className="text-sm font-mono text-red-600">
                    {state.realDomOperations}/5 노드
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-red-500 h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${(state.realDomOperations / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  {state.performanceMetrics.realDomTime > 0 && (
                    <div className="text-xs text-red-500 mt-1">
                      {state.performanceMetrics.realDomTime.toFixed(1)}ms
                    </div>
                  )}
                </div>
              </div>
              <div className="overflow-y-auto">
                {state.domNodes.map((node, idx) => (
                  <DOMNodeVisualization
                    key={idx}
                    node={node}
                    isChanged={
                      simulationState === "real-dom" &&
                      state.changedNodes.includes(node.id)
                    }
                    isVirtual={false}
                    changedNodes={
                      simulationState === "real-dom" ? state.changedNodes : []
                    }
                  />
                ))}
              </div>
              <div className="mt-3 text-xs text-green-600">
                💡 Real DOM: 모든 노드가 순차적으로 업데이트
              </div>
            </div>

            {/* Virtual DOM */}
            <div
              className={`bg-blue-50 p-4 rounded-xl border border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md ${
                simulationState === "virtual-dom"
                  ? "ring-2 ring-green-400 bg-green-50 shadow-green-100"
                  : "hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                  ⚛️ Virtual DOM
                  <span className="text-xs bg-blue-200 px-2 py-1 rounded">
                    메모리 속
                  </span>
                  {simulationState === "virtual-dom" && (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded animate-pulse">
                      진행 중
                    </span>
                  )}
                </h3>
                {/* 실시간 진행률 표시 */}
                <div className="text-right">
                  <div className="text-sm font-mono text-green-600">
                    {state.virtualDomOperations}/1 노드
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-green-500 h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${(state.virtualDomOperations / 1) * 100}%`,
                      }}
                    ></div>
                  </div>
                  {state.performanceMetrics.virtualDomTime > 0 && (
                    <div className="text-xs text-green-500 mt-1">
                      {state.performanceMetrics.virtualDomTime.toFixed(1)}ms
                    </div>
                  )}
                </div>
              </div>
              <div className="overflow-y-auto">
                {state.domNodes.map((node, idx) => (
                  <DOMNodeVisualization
                    key={idx}
                    node={node}
                    isChanged={
                      simulationState === "virtual-dom" &&
                      state.changedNodes.includes(node.id)
                    }
                    isVirtual={true}
                    changedNodes={
                      simulationState === "virtual-dom"
                        ? state.changedNodes
                        : []
                    }
                  />
                ))}
              </div>
              <div className="mt-3 text-xs text-blue-600">
                💡 Virtual DOM: 변경된 노드만 업데이트
              </div>
            </div>
          </div>

          {/* 제어 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={runRealDomSimulation}
              disabled={state.isRunning}
              className="group px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold cursor-pointer hover:from-red-600 hover:to-orange-600 hover:shadow-xl  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg transition-all duration-200 shadow-lg border-2 border-transparent hover:border-red-300 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg group-hover:animate-pulse">🐌</span>
                <span>Real DOM 시뮬레이션</span>
                <span className="text-sm opacity-80 group-hover:opacity-100">
                  ▶
                </span>
              </span>
            </button>
            <button
              onClick={runVirtualDomSimulation}
              disabled={state.isRunning}
              className="group px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold cursor-pointer hover:from-green-600 hover:to-emerald-600 hover:shadow-xl  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg transition-all duration-200 shadow-lg border-2 border-transparent hover:border-green-300 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg group-hover:animate-pulse">⚡</span>
                <span>Virtual DOM 시뮬레이션</span>
                <span className="text-sm opacity-80 group-hover:opacity-100">
                  ▶
                </span>
              </span>
            </button>
            <button
              onClick={resetSimulation}
              disabled={state.isRunning}
              className="group px-6 py-4 bg-gray-500 text-white rounded-lg font-semibold cursor-pointer hover:bg-gray-600 hover:shadow-xl  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg transition-all duration-200 shadow-lg border-2 border-transparent hover:border-gray-300 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg group-hover:animate-spin">🔄</span>
                <span>결과 초기화</span>
                <span className="text-sm opacity-80 group-hover:opacity-100">
                  ↺
                </span>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 상세 설명 */}
      {selectedDemo === "explanation" && (
        <div className="space-y-6">
          {/* Virtual DOM 개념 설명 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              💡 Virtual DOM이란?
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🏗️ 건물 설계로 이해하기
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p>
                      <strong>🌳 Real DOM = 실제 건물</strong>
                    </p>
                    <p>• 브라우저가 실제로 화면에 보여주는 구조</p>
                    <p>• 변경할 때마다 실제 벽돌을 옮겨야 함</p>
                    <p>• 느리고 비용이 많이 듦</p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>⚛️ Virtual DOM = 설계도</strong>
                    </p>
                    <p>• React가 메모리에서 관리하는 복사본</p>
                    <p>• 종이 위에서 먼저 수정해보기</p>
                    <p>• 빠르고 효율적</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  🎯 실제 예시: 인스타그램 좋아요
                </h4>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>상황:</strong> 사용자가 인스타그램에서 좋아요 버튼을
                    누름
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <p>
                        <strong>🐌 Real DOM 방식 (과거)</strong>
                      </p>
                      <p>1. 전체 페이지를 다시 확인</p>
                      <p>2. 모든 게시글을 다시 그리기</p>
                      <p>3. 좋아요 숫자만 바뀌었는데 전체 새로고침</p>
                      <p className="text-red-600 font-semibold">
                        → 느리고 깜빡임
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p>
                        <strong>⚡ Virtual DOM 방식 (현재)</strong>
                      </p>
                      <p>1. 메모리에서 빠르게 비교</p>
                      <p>2. 좋아요 버튼만 변경된 것 발견</p>
                      <p>3. 그 부분만 실제 화면에 업데이트</p>
                      <p className="text-green-600 font-semibold">
                        → 빠르고 부드러움
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diffing 알고리즘 설명 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              🔍 Diffing 알고리즘 - 변경사항 찾기
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-purple-800 mb-2">
                  🕵️ 탐정이 되어보기
                </h4>
                <div className="text-sm space-y-2">
                  <p>
                    Virtual DOM의 핵심은{" "}
                    <strong>&quot;변경사항 찾기&quot;</strong>입니다.
                  </p>
                  <p>
                    마치 탐정이 두 장의 사진을 비교해서 차이점을 찾는 것과
                    같아요!
                  </p>

                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mt-3">
                    <p>
                      <strong>📸 비교 과정:</strong>
                    </p>
                    <p>
                      1. <strong>이전 사진 (Before)</strong>: 변경 전 Virtual
                      DOM
                    </p>
                    <p>
                      2. <strong>새로운 사진 (After)</strong>: 변경 후 Virtual
                      DOM
                    </p>
                    <p>
                      3. <strong>차이점 찾기</strong>: 어떤 부분이 바뀌었는지
                      비교
                    </p>
                    <p>
                      4. <strong>필요한 부분만 수정</strong>: 바뀐 부분만 Real
                      DOM에 적용
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-indigo-800 mb-2">
                  ⚙️ Diffing 과정 단계별 설명
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <div>
                      <p>
                        <strong>트리 비교 (Tree Comparison)</strong>
                      </p>
                      <p>두 Virtual DOM 트리를 위에서부터 아래로 비교합니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <div>
                      <p>
                        <strong>타입 확인 (Type Check)</strong>
                      </p>
                      <p>노드의 타입이 같은지 확인 (div → div? h1 → h1?)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <div>
                      <p>
                        <strong>속성 비교 (Props Comparison)</strong>
                      </p>
                      <p>같은 타입이면 속성값들이 바뀌었는지 확인</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <div>
                      <p>
                        <strong>자식 요소 비교 (Children Comparison)</strong>
                      </p>
                      <p>자식 요소들도 재귀적으로 같은 과정 반복</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    <div>
                      <p>
                        <strong>최적화된 업데이트 (Optimized Update)</strong>
                      </p>
                      <p>변경된 부분만 Real DOM에 적용</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-emerald-800 mb-2">
                  🚀 실제 사례: 쇼핑몰 장바구니
                </h4>
                <div className="text-sm">
                  <p className="mb-2">
                    <strong>상황:</strong> 사용자가 상품을 장바구니에 추가
                  </p>

                  <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
                    <p>
                      <strong>Diffing이 찾아내는 변경사항:</strong>
                    </p>
                    <p>• 장바구니 아이콘의 숫자: 2 → 3</p>
                    <p>• 장바구니 목록에 새 상품 1개 추가</p>
                    <p>• 총 가격: 50,000원 → 75,000원</p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2">
                    <p>
                      <strong>결과:</strong>
                    </p>
                    <p>
                      전체 페이지를 다시 그리는 대신, 위 3부분만 빠르게
                      업데이트!
                    </p>
                    <p>→ 사용자는 부드러운 경험을 얻게 됩니다 ✨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 정리 */}
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              📚 핵심 정리
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300  transition-all duration-300 cursor-default group">
                <h4 className="font-semibold text-blue-800 mb-2 group-hover:text-blue-900 transition-colors">
                  💡 Virtual DOM
                </h4>
                <p className="text-sm group-hover:text-gray-700 transition-colors">
                  React가 메모리에서 관리하는 가상의 DOM 트리
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-300  transition-all duration-300 cursor-default group">
                <h4 className="font-semibold text-green-800 mb-2 group-hover:text-green-900 transition-colors">
                  🔍 Diffing
                </h4>
                <p className="text-sm group-hover:text-gray-700 transition-colors">
                  이전과 현재 Virtual DOM을 비교해서 변경사항 찾기
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300  transition-all duration-300 cursor-default group">
                <h4 className="font-semibold text-purple-800 mb-2 group-hover:text-purple-900 transition-colors">
                  ⚡ 성능
                </h4>
                <p className="text-sm group-hover:text-gray-700 transition-colors">
                  변경된 부분만 업데이트해서 빠른 렌더링
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200 shadow-sm hover:shadow-md hover:scale-102 transition-all duration-300 cursor-pointer hover:border-green-300">
              <p className="text-center font-semibold text-gray-800 hover:text-gray-900 transition-colors">
                🎉 이제 위의 시뮬레이션 탭에서 실제로 확인해보세요!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { VirtualDomLanding };
