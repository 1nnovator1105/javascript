"use client";

import React, { useState } from "react";
import { RenderingProcessVisualizer } from "./RenderingProcessVisualizer";
import { InteractiveCodeEditor } from "./InteractiveCodeEditor";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { ReflowRepaintDemo } from "./ReflowRepaintDemo";

type TabType = "visualizer" | "interactive" | "performance" | "reflow";

const BrowserRenderingLanding = () => {
  const [activeTab, setActiveTab] = useState<TabType>("visualizer");

  const tabs = [
    {
      id: "visualizer" as TabType,
      label: "🔍 렌더링 과정",
      icon: "🌐",
      description: "브라우저가 HTML/CSS를 화면에 그리는 과정을 단계별로 시각화",
    },
    {
      id: "interactive" as TabType,
      label: "⚡ 인터랙티브 에디터",
      icon: "💻",
      description: "실시간으로 코드를 편집하며 렌더링 과정 체험",
    },
    {
      id: "performance" as TabType,
      label: "📊 성능 메트릭",
      icon: "⚡",
      description: "Core Web Vitals와 렌더링 성능 지표 측정",
    },
    {
      id: "reflow" as TabType,
      label: "🔄 리플로우/리페인트",
      icon: "🎨",
      description: "DOM 조작이 렌더링 성능에 미치는 영향 체험",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "visualizer":
        return <RenderingProcessVisualizer />;
      case "interactive":
        return <InteractiveCodeEditor />;
      case "performance":
        return <PerformanceMetrics />;
      case "reflow":
        return <ReflowRepaintDemo />;
      default:
        return <RenderingProcessVisualizer />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-300 text-left
                ${
                  activeTab === tab.id
                    ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tab.icon}</span>
                <h3
                  className={`font-semibold ${
                    activeTab === tab.id ? "text-blue-700" : "text-gray-700"
                  }`}
                >
                  {tab.label}
                </h3>
              </div>
              <p
                className={`text-sm ${
                  activeTab === tab.id ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {tab.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {renderContent()}
        </div>
      </div>

      {/* Key Concepts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            🧠 핵심 개념 요약
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🌳</div>
              <h3 className="font-semibold text-gray-800 mb-2">DOM 트리</h3>
              <p className="text-sm text-gray-600">
                HTML을 파싱하여 브라우저가 이해할 수 있는 트리 구조로 변환
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-gray-800 mb-2">CSSOM</h3>
              <p className="text-sm text-gray-600">
                CSS 규칙을 파싱하여 스타일 정보를 담은 객체 모델 생성
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">📐</div>
              <h3 className="font-semibold text-gray-800 mb-2">레이아웃</h3>
              <p className="text-sm text-gray-600">
                각 요소의 정확한 크기와 위치를 계산하는 단계
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🖌️</div>
              <h3 className="font-semibold text-gray-800 mb-2">페인트</h3>
              <p className="text-sm text-gray-600">
                실제 픽셀을 화면에 그리고 레이어를 합성하는 최종 단계
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BrowserRenderingLanding };
