"use client";

import React, { useState } from "react";

interface RenderingStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
  duration: number;
}

interface VisualizationState {
  currentStep: number;
  isRunning: boolean;
  isPaused: boolean;
  completedSteps: Set<number>;
  animationSpeed: number;
}

const renderingSteps: RenderingStep[] = [
  {
    id: "html-request",
    name: "HTML 요청",
    description: "브라우저가 서버에 HTML 문서를 요청합니다",
    icon: "📡",
    color: "blue",
    details: [
      "사용자가 URL을 입력하거나 링크를 클릭",
      "브라우저가 DNS 조회를 통해 서버 주소 확인",
      "TCP 연결 수립 및 HTTP 요청 전송",
    ],
    duration: 1000,
  },
  {
    id: "html-parsing",
    name: "HTML 파싱",
    description: "받은 HTML을 파싱하여 DOM 트리를 구성합니다",
    icon: "📄",
    color: "green",
    details: [
      "HTML 문서를 토큰 단위로 분석",
      "토큰을 노드로 변환",
      "노드들을 계층 구조의 DOM 트리로 구성",
      "파싱 중 CSS와 JavaScript 리소스 발견 시 추가 요청",
    ],
    duration: 1500,
  },
  {
    id: "css-parsing",
    name: "CSS 파싱",
    description: "CSS 스타일시트를 파싱하여 CSSOM을 생성합니다",
    icon: "🎨",
    color: "purple",
    details: [
      "CSS 파일 다운로드 (렌더링 차단 리소스)",
      "CSS 규칙을 파싱하여 CSSOM 트리 구성",
      "선택자 우선순위 계산",
      "상속 및 계층 구조 적용",
    ],
    duration: 1200,
  },
  {
    id: "render-tree",
    name: "렌더 트리 구성",
    description: "DOM과 CSSOM을 결합하여 렌더 트리를 생성합니다",
    icon: "🌳",
    color: "emerald",
    details: [
      "DOM 트리의 각 노드에 CSSOM 스타일 적용",
      "display: none 등 숨겨진 요소 제외",
      "의사 요소(::before, ::after) 추가",
      "렌더링할 요소들만으로 트리 구성",
    ],
    duration: 800,
  },
  {
    id: "layout",
    name: "레이아웃 (리플로우)",
    description: "각 요소의 정확한 위치와 크기를 계산합니다",
    icon: "📐",
    color: "orange",
    details: [
      "뷰포트 크기 기준으로 요소 크기 계산",
      "박스 모델 적용 (content, padding, border, margin)",
      "플렉스박스, 그리드 등 레이아웃 알고리즘 실행",
      "텍스트 줄바꿈 및 폰트 메트릭 계산",
    ],
    duration: 1000,
  },
  {
    id: "paint",
    name: "페인트 (리페인트)",
    description: "레이어별로 실제 픽셀을 그립니다",
    icon: "🖌️",
    color: "red",
    details: [
      "레이어 분리 (transform, opacity 등)",
      "각 레이어에 픽셀 그리기",
      "텍스트, 색상, 이미지, 경계선 등 렌더링",
      "그림자, 그라디언트 등 복잡한 효과 처리",
    ],
    duration: 1300,
  },
  {
    id: "composite",
    name: "합성 (컴포지트)",
    description: "모든 레이어를 합성하여 최종 화면을 구성합니다",
    icon: "🎬",
    color: "violet",
    details: [
      "GPU 레이어 활용",
      "레이어 순서에 따른 합성",
      "투명도 및 블렌딩 모드 적용",
      "최종 프레임 버퍼에 출력",
    ],
    duration: 600,
  },
];

const RenderingProcessVisualizer = () => {
  const [visualState, setVisualState] = useState<VisualizationState>({
    currentStep: -1,
    isRunning: false,
    isPaused: false,
    completedSteps: new Set(),
    animationSpeed: 1,
  });

  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const startAnimation = async () => {
    // 애니메이션 시작 시 수동 선택 해제
    setSelectedStep(null);

    setVisualState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      currentStep: -1,
      completedSteps: new Set(),
    }));

    for (let i = 0; i < renderingSteps.length; i++) {
      setVisualState((prev) => ({ ...prev, currentStep: i }));

      await new Promise((resolve) =>
        setTimeout(
          resolve,
          renderingSteps[i].duration / visualState.animationSpeed
        )
      );

      setVisualState((prev) => ({
        ...prev,
        completedSteps: new Set([...prev.completedSteps, i]),
      }));
    }

    // 애니메이션 완료 후 마지막 단계를 계속 표시
    setVisualState((prev) => ({
      ...prev,
      isRunning: false,
      currentStep: renderingSteps.length - 1, // 마지막 단계 유지
    }));
  };

  const resetAnimation = () => {
    setSelectedStep(null);
    setVisualState({
      currentStep: -1,
      isRunning: false,
      isPaused: false,
      completedSteps: new Set(),
      animationSpeed: visualState.animationSpeed,
    });
  };

  const getStepStatus = (index: number) => {
    if (visualState.completedSteps.has(index)) return "completed";
    if (visualState.currentStep === index) return "active";
    return "pending";
  };

  const getStepColor = (step: RenderingStep, status: string) => {
    const colors = {
      blue:
        status === "active"
          ? "bg-blue-500"
          : status === "completed"
          ? "bg-blue-400"
          : "bg-gray-200",
      green:
        status === "active"
          ? "bg-green-500"
          : status === "completed"
          ? "bg-green-400"
          : "bg-gray-200",
      purple:
        status === "active"
          ? "bg-purple-500"
          : status === "completed"
          ? "bg-purple-400"
          : "bg-gray-200",
      emerald:
        status === "active"
          ? "bg-emerald-500"
          : status === "completed"
          ? "bg-emerald-400"
          : "bg-gray-200",
      orange:
        status === "active"
          ? "bg-orange-500"
          : status === "completed"
          ? "bg-orange-400"
          : "bg-gray-200",
      red:
        status === "active"
          ? "bg-red-500"
          : status === "completed"
          ? "bg-red-400"
          : "bg-gray-200",
      violet:
        status === "active"
          ? "bg-violet-500"
          : status === "completed"
          ? "bg-violet-400"
          : "bg-gray-200",
    };
    return colors[step.color as keyof typeof colors] || colors.blue;
  };

  const getBorderColor = (step: RenderingStep, status: string) => {
    const colors = {
      blue:
        status === "active"
          ? "border-blue-600"
          : status === "completed"
          ? "border-blue-500"
          : "border-gray-300",
      green:
        status === "active"
          ? "border-green-600"
          : status === "completed"
          ? "border-green-500"
          : "border-gray-300",
      purple:
        status === "active"
          ? "border-purple-600"
          : status === "completed"
          ? "border-purple-500"
          : "border-gray-300",
      emerald:
        status === "active"
          ? "border-emerald-600"
          : status === "completed"
          ? "border-emerald-500"
          : "border-gray-300",
      orange:
        status === "active"
          ? "border-orange-600"
          : status === "completed"
          ? "border-orange-500"
          : "border-gray-300",
      red:
        status === "active"
          ? "border-red-600"
          : status === "completed"
          ? "border-red-500"
          : "border-gray-300",
      violet:
        status === "active"
          ? "border-violet-600"
          : status === "completed"
          ? "border-violet-500"
          : "border-gray-300",
    };
    return colors[step.color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-8">
      {/* Header Controls */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🔍 Critical Rendering Path 시각화
          </h2>
          <div className="flex gap-3">
            <button
              onClick={startAnimation}
              disabled={visualState.isRunning}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {visualState.isRunning ? "실행 중..." : "애니메이션 시작"}
            </button>
            <button
              onClick={resetAnimation}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-4 mb-6">
          <label className="text-sm font-medium text-gray-600">
            애니메이션 속도:
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={visualState.animationSpeed}
            onChange={(e) =>
              setVisualState((prev) => ({
                ...prev,
                animationSpeed: parseFloat(e.target.value),
              }))
            }
            className="w-32"
          />
          <span className="text-sm text-gray-600">
            {visualState.animationSpeed}x
          </span>
        </div>
      </div>

      {/* Rendering Steps Visualization */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {renderingSteps.map((step, index) => {
            const status = getStepStatus(index);
            const isSelected = selectedStep === index;

            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < renderingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300 z-0" />
                )}

                {/* Step Card */}
                <div
                  className={`
                    relative z-10 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${getBorderColor(step, status)}
                    ${status === "active" ? "shadow-lg scale-105" : ""}
                    ${isSelected ? "ring-2 ring-blue-400" : ""}
                  `}
                  onClick={() => setSelectedStep(isSelected ? null : index)}
                >
                  {/* Step Icon */}
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mb-3 mx-auto
                    ${getStepColor(step, status)}
                    ${status === "active" ? "animate-pulse" : ""}
                  `}
                  >
                    {step.icon}
                  </div>

                  {/* Step Info */}
                  <h3 className="font-semibold text-center text-sm mb-2 text-gray-800">
                    {step.name}
                  </h3>
                  <p className="text-xs text-gray-600 text-center leading-tight">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  {status === "active" && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded animate-pulse" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Information */}
      {(selectedStep !== null || visualState.currentStep >= 0) && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          {(() => {
            // 사용자가 수동으로 선택한 단계가 있으면 그것을 사용, 없으면 현재 애니메이션 단계 사용
            const displayStep =
              selectedStep !== null ? selectedStep : visualState.currentStep;
            const step = renderingSteps[displayStep];

            if (!step) return null;

            return (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-white text-lg
                    ${getStepColor(step, getStepStatus(displayStep))}
                  `}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {step.name}
                      </h3>
                      {selectedStep === null && visualState.isRunning && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full animate-pulse">
                          진행 중
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    상세 과정:
                  </h4>
                  {step.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Performance Tips */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-bold text-amber-800 mb-4">
          ⚡ 성능 최적화 팁
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-amber-700">
              Critical Resource 최적화
            </h4>
            <ul className="text-sm text-amber-600 space-y-1">
              <li>• CSS는 &lt;head&gt;에 배치</li>
              <li>• 중요한 CSS는 인라인으로</li>
              <li>• JavaScript는 &lt;/body&gt; 직전에</li>
              <li>• async/defer 속성 활용</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-amber-700">레이아웃 성능 개선</h4>
            <ul className="text-sm text-amber-600 space-y-1">
              <li>• transform/opacity로 애니메이션</li>
              <li>• will-change 신중하게 사용</li>
              <li>• 복잡한 선택자 피하기</li>
              <li>• 레이아웃 스래싱 방지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { RenderingProcessVisualizer };
