"use client";

import React, { useEffect, useState } from "react";

interface CacheFlowDiagramProps {
  strategy: "private" | "public";
  isActive?: boolean;
}

export const CacheFlowDiagram: React.FC<CacheFlowDiagramProps> = ({
  strategy,
  isActive = false,
}) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setAnimationStep(0);
      return;
    }

    const steps = strategy === "public" ? 4 : 2;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % (steps + 1);
      setAnimationStep(currentStep);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, strategy]);

  const nodes = {
    browser: { x: 50, y: 200, label: "브라우저", icon: "💻" },
    edge: { x: 250, y: 200, label: "Edge 서버", icon: "🌐" },
    regional: { x: 450, y: 200, label: "지역 캐시", icon: "🏢" },
    origin: { x: 650, y: 200, label: "Origin 서버", icon: "🖥️" },
  };

  const getPathColor = () => {
    return strategy === "private" ? "#f97316" : "#10b981";
  };

  const isNodeActive = (nodeIndex: number) => {
    if (!isActive) return false;
    if (strategy === "private") {
      return animationStep === 1 || animationStep === 2;
    }
    return animationStep >= nodeIndex && animationStep <= 4;
  };

  const isPathActive = (pathIndex: number) => {
    if (!isActive) return false;
    if (strategy === "private") {
      return animationStep === 1 || animationStep === 2;
    }
    return animationStep === pathIndex || animationStep === pathIndex + 1;
  };

  return (
    <div className="relative w-full h-80 bg-gray-50 rounded-lg p-4">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 700 400"
        aria-label={`${strategy === "private" ? "Private" : "Public"} 캐시 요청 흐름도`}
      >
        {/* Paths */}
        {strategy === "private" ? (
          <path
            d={`M ${nodes.browser.x} ${nodes.browser.y} Q 350 100 ${nodes.origin.x} ${nodes.origin.y}`}
            fill="none"
            stroke={getPathColor()}
            strokeWidth="3"
            strokeDasharray={isPathActive(1) ? "0" : "10 5"}
            opacity={isPathActive(1) ? 1 : 0.3}
            className="transition-all duration-300"
          >
            {isPathActive(1) && (
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </path>
        ) : (
          <>
            <line
              x1={nodes.browser.x}
              y1={nodes.browser.y}
              x2={nodes.edge.x}
              y2={nodes.edge.y}
              stroke={getPathColor()}
              strokeWidth="3"
              strokeDasharray={isPathActive(1) ? "0" : "10 5"}
              opacity={isPathActive(1) ? 1 : 0.3}
              className="transition-all duration-300"
            />
            <line
              x1={nodes.edge.x}
              y1={nodes.edge.y}
              x2={nodes.regional.x}
              y2={nodes.regional.y}
              stroke={getPathColor()}
              strokeWidth="3"
              strokeDasharray={isPathActive(2) ? "0" : "10 5"}
              opacity={isPathActive(2) ? 1 : 0.3}
              className="transition-all duration-300"
            />
            <line
              x1={nodes.regional.x}
              y1={nodes.regional.y}
              x2={nodes.origin.x}
              y2={nodes.origin.y}
              stroke={getPathColor()}
              strokeWidth="3"
              strokeDasharray={isPathActive(3) ? "0" : "10 5"}
              opacity={isPathActive(3) ? 1 : 0.3}
              className="transition-all duration-300"
            />
          </>
        )}

        {/* CDN 비활성화 표시 (Private) */}
        {strategy === "private" && (
          <>
            <g opacity="0.3">
              <circle
                cx={nodes.edge.x}
                cy={nodes.edge.y}
                r="40"
                fill="#e5e7eb"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <line
                x1={nodes.edge.x - 30}
                y1={nodes.edge.y - 30}
                x2={nodes.edge.x + 30}
                y2={nodes.edge.y + 30}
                stroke="#ef4444"
                strokeWidth="3"
              />
              <line
                x1={nodes.edge.x + 30}
                y1={nodes.edge.y - 30}
                x2={nodes.edge.x - 30}
                y2={nodes.edge.y + 30}
                stroke="#ef4444"
                strokeWidth="3"
              />
            </g>
            <g opacity="0.3">
              <circle
                cx={nodes.regional.x}
                cy={nodes.regional.y}
                r="40"
                fill="#e5e7eb"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <line
                x1={nodes.regional.x - 30}
                y1={nodes.regional.y - 30}
                x2={nodes.regional.x + 30}
                y2={nodes.regional.y + 30}
                stroke="#ef4444"
                strokeWidth="3"
              />
              <line
                x1={nodes.regional.x + 30}
                y1={nodes.regional.y - 30}
                x2={nodes.regional.x - 30}
                y2={nodes.regional.y + 30}
                stroke="#ef4444"
                strokeWidth="3"
              />
            </g>
          </>
        )}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0">
        {/* Browser */}
        <div
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            isNodeActive(1) ? "scale-110" : "scale-100"
          }`}
          style={{ left: nodes.browser.x, top: nodes.browser.y }}
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
              isNodeActive(1)
                ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                : "bg-white border-2 border-gray-300"
            }`}
          >
            {nodes.browser.icon}
          </div>
          <div className="text-center mt-2 text-sm font-medium">
            {nodes.browser.label}
          </div>
        </div>

        {/* Edge Server */}
        {strategy === "public" && (
          <div
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isNodeActive(2) ? "scale-110" : "scale-100"
            }`}
            style={{ left: nodes.edge.x, top: nodes.edge.y }}
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
                isNodeActive(2)
                  ? "bg-green-500 shadow-lg shadow-green-500/50"
                  : "bg-white border-2 border-gray-300"
              }`}
            >
              {nodes.edge.icon}
            </div>
            <div className="text-center mt-2 text-sm font-medium">
              {nodes.edge.label}
            </div>
          </div>
        )}

        {/* Regional Cache */}
        {strategy === "public" && (
          <div
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isNodeActive(3) ? "scale-110" : "scale-100"
            }`}
            style={{ left: nodes.regional.x, top: nodes.regional.y }}
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
                isNodeActive(3)
                  ? "bg-green-500 shadow-lg shadow-green-500/50"
                  : "bg-white border-2 border-gray-300"
              }`}
            >
              {nodes.regional.icon}
            </div>
            <div className="text-center mt-2 text-sm font-medium">
              {nodes.regional.label}
            </div>
          </div>
        )}

        {/* Origin Server */}
        <div
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            isNodeActive(4) ? "scale-110" : "scale-100"
          }`}
          style={{ left: nodes.origin.x, top: nodes.origin.y }}
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
              isNodeActive(4)
                ? strategy === "private"
                  ? "bg-orange-500 shadow-lg shadow-orange-500/50"
                  : "bg-green-500 shadow-lg shadow-green-500/50"
                : "bg-white border-2 border-gray-300"
            }`}
          >
            {nodes.origin.icon}
          </div>
          <div className="text-center mt-2 text-sm font-medium">
            {nodes.origin.label}
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="absolute bottom-4 left-4 right-4">
        <div
          className={`text-center p-2 rounded-lg font-medium ${
            strategy === "private"
              ? "bg-orange-100 text-orange-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {strategy === "private"
            ? "Private: 브라우저에서 Origin 서버로 직접 연결 (CDN 우회)"
            : "Public: CDN을 통한 다단계 캐시 활용"}
        </div>
      </div>
    </div>
  );
};

export default CacheFlowDiagram;