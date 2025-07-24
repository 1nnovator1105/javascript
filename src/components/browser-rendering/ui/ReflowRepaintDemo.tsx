"use client";

import React, { useState, useRef } from "react";
import { getColorClass } from "@/utils/colorMigration";

interface PerformanceLog {
  id: string;
  action: string;
  type: "reflow" | "repaint" | "composite";
  duration: number;
  timestamp: number;
  cost: "low" | "medium" | "high";
}

const ReflowRepaintDemo = () => {
  const [performanceLogs, setPerformanceLogs] = useState<PerformanceLog[]>([]);
  const [selectedDemo, setSelectedDemo] = useState<
    "reflow" | "repaint" | "composite"
  >("reflow");
  const [isAnimating, setIsAnimating] = useState(false);

  const animationRef = useRef<HTMLDivElement>(null);
  const logIdCounter = useRef(0);

  // 성능 로그 추가
  const addPerformanceLog = (
    action: string,
    type: "reflow" | "repaint" | "composite",
    duration: number,
    cost: "low" | "medium" | "high"
  ) => {
    const log: PerformanceLog = {
      id: `log-${++logIdCounter.current}`,
      action,
      type,
      duration,
      timestamp: Date.now(),
      cost,
    };
    setPerformanceLogs((prev) => [log, ...prev.slice(0, 9)]); // 최근 10개만 유지
  };

  // 리플로우를 발생시키는 작업들
  const reflowOperations = [
    {
      name: "width/height 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-box"
        ) as HTMLElement;
        if (element) {
          const currentWidth = element.offsetWidth;
          element.style.width = currentWidth === 200 ? "300px" : "200px";
          element.style.height = currentWidth === 200 ? "150px" : "100px";
          addPerformanceLog("width/height 변경", "reflow", 15.6, "high");
        }
      },
      description: "요소의 크기를 변경하면 레이아웃 재계산이 필요합니다.",
    },
    {
      name: "margin/padding 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-box"
        ) as HTMLElement;
        if (element) {
          const currentMargin = element.style.margin || "20px";
          element.style.margin = currentMargin === "20px" ? "40px" : "20px";
          element.style.padding = currentMargin === "20px" ? "30px" : "20px";
          addPerformanceLog("margin/padding 변경", "reflow", 12.3, "high");
        }
      },
      description: "여백 변경은 주변 요소의 위치에도 영향을 줍니다.",
    },
    {
      name: "display 속성 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-hidden"
        ) as HTMLElement;
        if (element) {
          element.style.display =
            element.style.display === "none" ? "block" : "none";
          addPerformanceLog("display 속성 변경", "reflow", 18.9, "high");
        }
      },
      description: "display 변경은 DOM 트리 구조를 재계산합니다.",
    },
    {
      name: "font-size 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-text"
        ) as HTMLElement;
        if (element) {
          const currentSize = element.style.fontSize || "16px";
          element.style.fontSize = currentSize === "16px" ? "24px" : "16px";
          addPerformanceLog("font-size 변경", "reflow", 8.7, "medium");
        }
      },
      description: "폰트 크기 변경은 텍스트 레이아웃을 재계산합니다.",
    },
  ];

  // 리페인트만 발생시키는 작업들
  const repaintOperations = [
    {
      name: "background-color 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-box"
        ) as HTMLElement;
        if (element) {
          const colors = [
            "#3b82f6",
            "#ef4444",
            "#10b981",
            "#f59e0b",
            "#8b5cf6",
          ];
          const newColor = colors[Math.floor(Math.random() * colors.length)];
          element.style.backgroundColor = newColor;
          addPerformanceLog("background-color 변경", "repaint", 3.2, "low");
        }
      },
      description: "색상 변경은 레이아웃에 영향없이 픽셀만 다시 그립니다.",
    },
    {
      name: "color 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-text"
        ) as HTMLElement;
        if (element) {
          const colors = ["#1f2937", "#dc2626", "#059669", "#7c2d12"];
          const newColor = colors[Math.floor(Math.random() * colors.length)];
          element.style.color = newColor;
          addPerformanceLog("color 변경", "repaint", 2.1, "low");
        }
      },
      description:
        "텍스트 색상 변경은 레이아웃 계산 없이 리페인트만 발생합니다.",
    },
    {
      name: "border-color 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-box"
        ) as HTMLElement;
        if (element) {
          const colors = ["#dc2626", "#059669", "#7c3aed", "#ea580c"];
          const newColor = colors[Math.floor(Math.random() * colors.length)];
          element.style.borderColor = newColor;
          addPerformanceLog("border-color 변경", "repaint", 2.8, "low");
        }
      },
      description: "테두리 색상만 변경하면 리페인트만 발생합니다.",
    },
    {
      name: "box-shadow 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-box"
        ) as HTMLElement;
        if (element) {
          const shadows = [
            "0 4px 6px rgba(0, 0, 0, 0.1)",
            "0 10px 15px rgba(0, 0, 0, 0.2)",
            "0 20px 25px rgba(0, 0, 0, 0.3)",
            "none",
          ];
          const newShadow = shadows[Math.floor(Math.random() * shadows.length)];
          element.style.boxShadow = newShadow;
          addPerformanceLog("box-shadow 변경", "repaint", 4.5, "medium");
        }
      },
      description: "그림자 효과는 GPU를 활용하지 않으면 리페인트가 발생합니다.",
    },
  ];

  // 컴포지트만 발생시키는 작업들 (GPU 가속)
  const compositeOperations = [
    {
      name: "transform 애니메이션",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-transform"
        ) as HTMLElement;
        if (element) {
          const isTransformed = element.style.transform.includes("scale");
          element.style.transform = isTransformed
            ? "translateX(0) rotate(0deg) scale(1)"
            : "translateX(50px) rotate(15deg) scale(1.1)";
          addPerformanceLog("transform 애니메이션", "composite", 1.2, "low");
        }
      },
      description: "transform은 GPU 레이어에서 처리되어 매우 효율적입니다.",
    },
    {
      name: "opacity 변경",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-opacity"
        ) as HTMLElement;
        if (element) {
          const currentOpacity = parseFloat(element.style.opacity || "1");
          element.style.opacity = currentOpacity === 1 ? "0.5" : "1";
          addPerformanceLog("opacity 변경", "composite", 0.8, "low");
        }
      },
      description: "opacity는 별도 레이어에서 합성되어 성능이 우수합니다.",
    },
    {
      name: "filter 효과",
      action: () => {
        const element = animationRef.current?.querySelector(
          ".demo-filter"
        ) as HTMLElement;
        if (element) {
          const filters = [
            "none",
            "blur(2px)",
            "brightness(1.5)",
            "contrast(1.5)",
            "hue-rotate(90deg)",
          ];
          const newFilter = filters[Math.floor(Math.random() * filters.length)];
          element.style.filter = newFilter;
          addPerformanceLog("filter 효과", "composite", 1.5, "low");
        }
      },
      description: "CSS 필터는 GPU에서 처리되어 효율적입니다.",
    },
  ];

  // 현재 선택된 데모의 조작 함수들
  const getCurrentOperations = () => {
    switch (selectedDemo) {
      case "reflow":
        return reflowOperations;
      case "repaint":
        return repaintOperations;
      case "composite":
        return compositeOperations;
      default:
        return reflowOperations;
    }
  };

  // 자동 애니메이션 실행
  const runAutoAnimation = async () => {
    setIsAnimating(true);
    const operations = getCurrentOperations();

    for (let i = 0; i < operations.length; i++) {
      operations[i].action();
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setIsAnimating(false);
  };

  // 성능 로그 클리어
  const clearLogs = () => {
    setPerformanceLogs([]);
  };

  // 성능 비용 색상
  const getCostColor = (cost: string) => {
    switch (cost) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reflow":
        return "text-red-600 bg-red-100";
      case "repaint":
        return "text-orange-600 bg-orange-100";
      case "composite":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🔄 리플로우 vs 리페인트 vs 컴포지트 체험
        </h2>
        <p className="text-gray-600 mb-6">
          DOM 조작이 렌더링 성능에 미치는 영향을 실시간으로 체험해보세요.
        </p>

        {/* 데모 선택 탭 */}
        <div className="flex mb-6 bg-white rounded-lg p-1 border border-gray-200">
          {[
            {
              id: "reflow",
              label: "리플로우",
              icon: "📐",
              description: "레이아웃 재계산",
            },
            {
              id: "repaint",
              label: "리페인트",
              icon: "🎨",
              description: "픽셀 다시 그리기",
            },
            {
              id: "composite",
              label: "컴포지트",
              icon: "⚡",
              description: "GPU 레이어 합성",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setSelectedDemo(tab.id as "reflow" | "repaint" | "composite")
              }
              className={`
                flex-1 py-3 px-4 rounded-md text-center transition-colors
                ${
                  selectedDemo === tab.id
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }
              `}
            >
              <div className="text-lg">{tab.icon}</div>
              <div className="font-semibold">{tab.label}</div>
              <div className="text-xs opacity-80">{tab.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 데모 영역 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                시각화 데모 영역
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={runAutoAnimation}
                  disabled={isAnimating}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                >
                  {isAnimating ? "실행 중..." : "자동 데모"}
                </button>
                <button
                  onClick={clearLogs}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  로그 클리어
                </button>
              </div>
            </div>

            {/* 데모 요소들 */}
            <div
              ref={animationRef}
              className="min-h-[400px] bg-gray-50 rounded-lg p-6 relative"
            >
              {/* 공통 데모 박스 */}
              <div
                className="demo-box inline-block bg-blue-500 text-white p-4 rounded-lg border-2 border-blue-600 transition-all duration-300"
                style={{ width: "200px", height: "100px", margin: "20px" }}
              >
                데모 박스
              </div>

              {/* 텍스트 요소 */}
              <div
                className="demo-text text-gray-800 font-semibold mb-4"
                style={{ fontSize: "16px" }}
              >
                렌더링 테스트 텍스트
              </div>

              {/* 숨김/표시 요소 */}
              <div
                className="demo-hidden bg-green-500 text-white p-3 rounded mb-4"
                style={{ display: "block" }}
              >
                숨김/표시 테스트 요소
              </div>

              {/* Transform 데모 요소 */}
              <div
                className={`demo-transform ${getColorClass('bg-purple-500')} text-white p-4 rounded-lg inline-block transition-transform duration-300`}
                style={{ transform: "translateX(0) rotate(0deg) scale(1)" }}
              >
                Transform 데모
              </div>

              {/* Opacity 데모 요소 */}
              <div
                className="demo-opacity bg-orange-500 text-white p-4 rounded-lg inline-block ml-4 transition-opacity duration-300"
                style={{ opacity: 1 }}
              >
                Opacity 데모
              </div>

              {/* Filter 데모 요소 */}
              <div
                className="demo-filter bg-pink-500 text-white p-4 rounded-lg inline-block ml-4 transition-all duration-300"
                style={{ filter: "none" }}
              >
                Filter 데모
              </div>
            </div>

            {/* 조작 버튼들 */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                {selectedDemo === "reflow"
                  ? "리플로우"
                  : selectedDemo === "repaint"
                  ? "리페인트"
                  : "컴포지트"}{" "}
                조작
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {getCurrentOperations().map((operation, index) => (
                  <button
                    key={index}
                    onClick={operation.action}
                    className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                  >
                    <div className="font-medium text-gray-800">
                      {operation.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {operation.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 성능 로그 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📊 성능 로그
          </h3>

          {performanceLogs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              아직 기록된 로그가 없습니다.
              <br />
              위의 버튼들을 클릭해보세요!
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {performanceLogs.map((log) => (
                <div key={log.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">
                      {log.action}
                    </span>
                    <div className="flex gap-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                          log.type
                        )}`}
                      >
                        {log.type}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getCostColor(
                          log.cost
                        )}`}
                      >
                        {log.cost}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{log.duration}ms</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 성능 비교 가이드 */}
      <div className={`mt-8 bg-gradient-to-r ${getColorClass('from-indigo-50')} ${getColorClass('to-purple-50')} rounded-xl p-6 border ${getColorClass('border-indigo-200')}`}>
        <h3 className={`text-lg font-bold ${getColorClass('text-indigo-800')} mb-4`}>
          📚 성능 최적화 핵심 원리
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📐</span>
              <h4 className="font-semibold text-red-700">리플로우 (Reflow)</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              요소의 크기나 위치가 변경될 때 발생하는 가장 비용이 큰 연산입니다.
            </p>
            <div className="text-xs text-red-600">
              <strong>발생 속성:</strong> width, height, margin, padding,
              display, position
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎨</span>
              <h4 className="font-semibold text-orange-700">
                리페인트 (Repaint)
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              요소의 외관이 변경될 때 발생하며, 레이아웃 계산은 불필요합니다.
            </p>
            <div className="text-xs text-orange-600">
              <strong>발생 속성:</strong> color, background-color, border-color,
              box-shadow
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚡</span>
              <h4 className="font-semibold text-green-700">
                컴포지트 (Composite)
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              GPU 레이어에서 처리되는 가장 효율적인 연산입니다.
            </p>
            <div className="text-xs text-green-600">
              <strong>발생 속성:</strong> transform, opacity, filter,
              will-change
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReflowRepaintDemo };
