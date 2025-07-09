"use client";

import React, { useState, useRef } from "react";

interface RenderingStrategy {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  color: string;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  performance: {
    initialLoad: number;
    navigation: number;
    seo: number;
    ttfb: number;
  };
}

interface SimulationStep {
  step: number;
  title: string;
  description: string;
  timing: number;
  highlight?: string[];
}

const renderingStrategies: RenderingStrategy[] = [
  {
    id: "csr",
    name: "CSR",
    fullName: "Client-Side Rendering",
    description: "브라우저에서 JavaScript로 페이지를 동적으로 렌더링",
    icon: "💻",
    color: "blue",
    advantages: [
      "빠른 페이지 간 네비게이션",
      "풍부한 사용자 상호작용",
      "서버 부하 감소",
    ],
    disadvantages: [
      "초기 로딩 시간이 길음",
      "SEO에 불리함",
      "JavaScript 비활성화 시 작동 안함",
      "검색엔진 크롤링 어려움",
    ],
    useCases: [
      "관리자 대시보드",
      "실시간 채팅 앱",
      "온라인 게임",
      "복잡한 웹 애플리케이션",
    ],
    performance: {
      initialLoad: 3,
      navigation: 9,
      seo: 2,
      ttfb: 8,
    },
  },
  {
    id: "ssr",
    name: "SSR",
    fullName: "Server-Side Rendering",
    description: "서버에서 HTML을 생성하여 완성된 페이지를 클라이언트에 전송",
    icon: "🖥️",
    color: "green",
    advantages: [
      "빠른 초기 페이지 로딩",
      "SEO 최적화",
      "JavaScript 없이도 콘텐츠 표시",
      "소셜 미디어 메타 태그 지원",
    ],
    disadvantages: [
      "서버 부하 증가",
      "페이지 간 전환이 느림",
      "복잡한 캐싱 전략 필요",
      "서버 설정 복잡성",
    ],
    useCases: [
      "블로그 사이트",
      "뉴스 웹사이트",
      "전자상거래 제품 페이지",
      "기업 웹사이트",
    ],
    performance: {
      initialLoad: 9,
      navigation: 3,
      seo: 9,
      ttfb: 6,
    },
  },
  {
    id: "ssg",
    name: "SSG",
    fullName: "Static Site Generation",
    description: "빌드 타임에 미리 HTML을 생성하여 정적 파일로 서빙",
    icon: "📄",
    color: "purple",
    advantages: [
      "매우 빠른 로딩 속도",
      "우수한 SEO",
      "높은 보안성",
      "CDN 캐싱 최적화",
    ],
    disadvantages: [
      "동적 콘텐츠 제한",
      "빌드 시간 증가",
      "실시간 데이터 반영 어려움",
      "개인화된 콘텐츠 제한",
    ],
    useCases: [
      "문서 사이트",
      "포트폴리오 웹사이트",
      "마케팅 랜딩 페이지",
      "블로그",
    ],
    performance: {
      initialLoad: 10,
      navigation: 8,
      seo: 10,
      ttfb: 10,
    },
  },
  {
    id: "isr",
    name: "ISR",
    fullName: "Incremental Static Regeneration",
    description: "정적 생성과 서버 렌더링의 장점을 결합한 하이브리드 방식",
    icon: "🔄",
    color: "orange",
    advantages: [
      "빠른 초기 로딩",
      "자동 콘텐츠 업데이트",
      "확장 가능한 아키텍처",
      "SEO 최적화",
    ],
    disadvantages: [
      "복잡한 캐싱 로직",
      "설정 복잡성",
      "스테일 콘텐츠 가능성",
      "Next.js 등 특정 프레임워크 의존",
    ],
    useCases: [
      "전자상거래 사이트",
      "뉴스 사이트",
      "제품 카탈로그",
      "콘텐츠 관리 시스템",
    ],
    performance: {
      initialLoad: 8,
      navigation: 7,
      seo: 9,
      ttfb: 8,
    },
  },
];

const simulationSteps: { [key: string]: SimulationStep[] } = {
  csr: [
    {
      step: 1,
      title: "HTML 요청",
      description: "브라우저가 서버에 HTML을 요청합니다",
      timing: 100,
      highlight: ["browser", "server"],
    },
    {
      step: 2,
      title: "기본 HTML 응답",
      description: "거의 빈 HTML과 JavaScript 번들을 받습니다",
      timing: 200,
      highlight: ["server", "browser"],
    },
    {
      step: 3,
      title: "JavaScript 다운로드",
      description: "JavaScript 파일들을 다운로드합니다",
      timing: 800,
      highlight: ["browser"],
    },
    {
      step: 4,
      title: "JavaScript 실행",
      description: "JavaScript가 DOM을 생성하고 렌더링합니다",
      timing: 500,
      highlight: ["browser"],
    },
    {
      step: 5,
      title: "API 호출",
      description: "필요한 데이터를 API에서 가져옵니다",
      timing: 300,
      highlight: ["browser", "api"],
    },
    {
      step: 6,
      title: "렌더링 완료",
      description: "최종 페이지가 사용자에게 표시됩니다",
      timing: 100,
      highlight: ["browser"],
    },
  ],
  ssr: [
    {
      step: 1,
      title: "HTML 요청",
      description: "브라우저가 서버에 HTML을 요청합니다",
      timing: 100,
      highlight: ["browser", "server"],
    },
    {
      step: 2,
      title: "서버에서 렌더링",
      description: "서버가 데이터를 가져와 HTML을 생성합니다",
      timing: 600,
      highlight: ["server", "database"],
    },
    {
      step: 3,
      title: "완성된 HTML 응답",
      description: "완전히 렌더링된 HTML을 브라우저에 전송합니다",
      timing: 200,
      highlight: ["server", "browser"],
    },
    {
      step: 4,
      title: "JavaScript 하이드레이션",
      description: "클라이언트에서 JavaScript가 이벤트를 연결합니다",
      timing: 400,
      highlight: ["browser"],
    },
    {
      step: 5,
      title: "인터랙티브 완료",
      description: "페이지가 완전히 인터랙티브해집니다",
      timing: 100,
      highlight: ["browser"],
    },
  ],
  ssg: [
    {
      step: 1,
      title: "빌드 타임 생성",
      description: "빌드 시점에 모든 페이지가 미리 생성됩니다",
      timing: 0,
      highlight: ["build"],
    },
    {
      step: 2,
      title: "HTML 요청",
      description: "브라우저가 CDN/서버에 HTML을 요청합니다",
      timing: 50,
      highlight: ["browser", "cdn"],
    },
    {
      step: 3,
      title: "정적 HTML 응답",
      description: "미리 생성된 HTML이 즉시 응답됩니다",
      timing: 100,
      highlight: ["cdn", "browser"],
    },
    {
      step: 4,
      title: "JavaScript 로드",
      description: "필요한 JavaScript가 로드됩니다",
      timing: 200,
      highlight: ["browser"],
    },
    {
      step: 5,
      title: "하이드레이션",
      description: "정적 HTML에 인터랙티브 기능이 추가됩니다",
      timing: 150,
      highlight: ["browser"],
    },
  ],
  isr: [
    {
      step: 1,
      title: "초기 빌드",
      description: "일부 페이지가 빌드 타임에 생성됩니다",
      timing: 0,
      highlight: ["build"],
    },
    {
      step: 2,
      title: "HTML 요청",
      description: "브라우저가 페이지를 요청합니다",
      timing: 100,
      highlight: ["browser", "server"],
    },
    {
      step: 3,
      title: "캐시 확인",
      description: "서버가 캐시된 페이지를 확인합니다",
      timing: 50,
      highlight: ["server", "cache"],
    },
    {
      step: 4,
      title: "캐시된 HTML 응답",
      description: "캐시된 HTML을 즉시 제공합니다",
      timing: 100,
      highlight: ["cache", "browser"],
    },
    {
      step: 5,
      title: "백그라운드 재생성",
      description: "백그라운드에서 페이지를 다시 생성합니다",
      timing: 500,
      highlight: ["server", "database"],
    },
    {
      step: 6,
      title: "캐시 업데이트",
      description: "새로운 버전으로 캐시를 업데이트합니다",
      timing: 100,
      highlight: ["server", "cache"],
    },
  ],
};

const RenderingStrategiesLanding: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("csr");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // useRef를 사용하여 최신 상태 추적
  const simulationRef = useRef<{
    isRunning: boolean;
    isPaused: boolean;
    currentStep: number;
  }>({
    isRunning: false,
    isPaused: false,
    currentStep: 0,
  });

  const currentStrategyData = renderingStrategies.find(
    (s) => s.id === selectedStrategy
  )!;
  const currentSteps = simulationSteps[selectedStrategy];

  // 시뮬레이션 실행 - 완전히 새로운 접근법
  const runSimulation = async () => {
    if (simulationRef.current.isRunning) {
      console.log("시뮬레이션이 이미 실행 중입니다.");
      return;
    }

    console.log(
      "시뮬레이션 시작:",
      selectedStrategy,
      currentSteps.length,
      "단계"
    );

    // 초기 상태 설정
    simulationRef.current = {
      isRunning: true,
      isPaused: false,
      currentStep: 0,
    };

    setIsSimulating(true);
    setCurrentStep(0);
    setIsPaused(false);

    // 잠시 대기 후 첫 번째 단계부터 시작
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let i = 0; i < currentSteps.length; i++) {
      // 중단 체크
      if (!simulationRef.current.isRunning) {
        console.log("시뮬레이션이 중단되었습니다.");
        break;
      }

      // 일시정지 체크
      while (
        simulationRef.current.isPaused &&
        simulationRef.current.isRunning
      ) {
        console.log("시뮬레이션 일시정지 중...");
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      if (!simulationRef.current.isRunning) break;

      console.log(
        `단계 ${i + 1}/${currentSteps.length} 실행 중:`,
        currentSteps[i].title
      );

      // 현재 단계 업데이트
      simulationRef.current.currentStep = i + 1;
      setCurrentStep(i + 1);

      // 단계별 대기 시간
      const baseDelay = 2000;
      const adjustedDelay = baseDelay / simulationSpeed;

      console.log(`${adjustedDelay}ms 대기 중...`);
      await new Promise((resolve) => setTimeout(resolve, adjustedDelay));
    }

    // 시뮬레이션 완료
    if (simulationRef.current.isRunning) {
      console.log("시뮬레이션 완료");
      setTimeout(() => {
        simulationRef.current.isRunning = false;
        setIsSimulating(false);
        setCurrentStep(0);
        setIsPaused(false);
      }, 1000);
    }
  };

  const stopSimulation = () => {
    console.log("시뮬레이션 중단");
    simulationRef.current.isRunning = false;
    simulationRef.current.isPaused = false;
    simulationRef.current.currentStep = 0;

    setIsSimulating(false);
    setCurrentStep(0);
    setIsPaused(false);
  };

  const togglePause = () => {
    const newPausedState = !simulationRef.current.isPaused;
    simulationRef.current.isPaused = newPausedState;
    setIsPaused(newPausedState);
    console.log("일시정지 상태:", newPausedState);
  };

  // 성능 점수 바 컴포넌트
  const PerformanceBar: React.FC<{
    label: string;
    value: number;
    color: string;
  }> = ({ label, value, color }) => (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{value}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${value * 10}%`,
            backgroundColor:
              color === "blue"
                ? "#3b82f6"
                : color === "green"
                ? "#10b981"
                : color === "purple"
                ? "#8b5cf6"
                : color === "orange"
                ? "#f59e0b"
                : "#6b7280",
          }}
        />
      </div>
    </div>
  );

  // 시뮬레이션 시각화 컴포넌트
  const SimulationVisualizer: React.FC = () => {
    const getComponentStyle = (component: string) => {
      // currentStep이 0보다 클 때만 하이라이트 체크
      const currentStepData =
        currentStep > 0 ? currentSteps[currentStep - 1] : null;
      const isHighlighted =
        currentStepData?.highlight?.includes(component) || false;

      const baseStyles =
        "w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold transition-all duration-500 relative";

      if (isHighlighted) {
        return `${baseStyles} bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg transform scale-110 animate-pulse z-10 ring-4 ring-yellow-300`;
      }

      switch (component) {
        case "browser":
          return `${baseStyles} bg-blue-100 text-blue-800 border-2 border-blue-300 hover:shadow-md`;
        case "server":
          return `${baseStyles} bg-green-100 text-green-800 border-2 border-green-300 hover:shadow-md`;
        case "database":
          return `${baseStyles} bg-purple-100 text-purple-800 border-2 border-purple-300 hover:shadow-md`;
        case "cdn":
          return `${baseStyles} bg-orange-100 text-orange-800 border-2 border-orange-300 hover:shadow-md`;
        case "cache":
          return `${baseStyles} bg-gray-100 text-gray-800 border-2 border-gray-300 hover:shadow-md`;
        case "api":
          return `${baseStyles} bg-pink-100 text-pink-800 border-2 border-pink-300 hover:shadow-md`;
        case "build":
          return `${baseStyles} bg-indigo-100 text-indigo-800 border-2 border-indigo-300 hover:shadow-md`;
        default:
          return baseStyles;
      }
    };

    return (
      <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-center">
          {currentStrategyData.name} 시뮬레이션
        </h3>

        {/* 현재 단계 표시 */}
        <div className="mb-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">
              {isSimulating
                ? isPaused
                  ? "⏸️ 일시정지"
                  : "▶️ 진행 중"
                : "⏹️ 시뮬레이션 준비"}
            </span>
            <div className="text-sm text-blue-600 flex items-center gap-2">
              <span>
                {currentStep}/{currentSteps.length} 단계
              </span>
              <span className="text-xs bg-blue-200 px-2 py-1 rounded-full">
                {simulationSpeed}x
              </span>
            </div>
          </div>

          {currentStep > 0 && currentStep <= currentSteps.length && (
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">
                {currentSteps[currentStep - 1].title}
              </h4>
              <p className="text-xs md:text-sm text-blue-700 mt-1">
                {currentSteps[currentStep - 1].description}
              </p>
            </div>
          )}

          {currentStep === 0 && !isSimulating && (
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">
                시뮬레이션 시작 대기 중
              </h4>
              <p className="text-xs md:text-sm text-blue-700 mt-1">
                &apos;시뮬레이션 시작&apos; 버튼을 눌러{" "}
                {currentStrategyData.name} 렌더링 과정을 확인해보세요.
              </p>
            </div>
          )}
        </div>

        {/* 컴포넌트 다이어그램 - 개선된 레이아웃 */}
        <div className="relative mb-6">
          {/* 상단 row: Browser, API, Build */}
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="flex flex-col items-center space-y-2">
              <div className={getComponentStyle("browser")}>🌐</div>
              <span className="text-xs text-center font-medium">Browser</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className={getComponentStyle("api")}>🔗</div>
              <span className="text-xs text-center font-medium">API</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className={getComponentStyle("build")}>🔧</div>
              <span className="text-xs text-center font-medium">Build</span>
            </div>
          </div>

          {/* 중앙 row: Server, Cache */}
          <div className="flex justify-center items-center space-x-8 md:space-x-12 mb-6 md:mb-8">
            <div className="flex flex-col items-center space-y-2">
              <div className={getComponentStyle("server")}>🖥️</div>
              <span className="text-xs text-center font-medium">Server</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className={getComponentStyle("cache")}>💾</div>
              <span className="text-xs text-center font-medium">Cache</span>
            </div>
          </div>

          {/* 하단 row: Database, CDN */}
          <div className="flex justify-center items-center space-x-8 md:space-x-12">
            <div className="flex flex-col items-center space-y-2">
              <div className={getComponentStyle("database")}>🗄️</div>
              <span className="text-xs text-center font-medium">Database</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className={getComponentStyle("cdn")}>☁️</div>
              <span className="text-xs text-center font-medium">CDN</span>
            </div>
          </div>
        </div>

        {/* 진행 바 */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>진행률</span>
            <span>
              {Math.round((currentStep / currentSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${(currentStep / currentSteps.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* 개요 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          🌐 웹 렌더링 전략이란?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          웹 렌더링 전략은 웹 페이지가 어떻게, 언제, 어디서 생성되어 사용자에게
          전달되는지를 결정하는 방법입니다. 각 전략은 성능, SEO, 사용자 경험,
          개발 복잡성 등에서 서로 다른 특징을 가지고 있습니다.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <span className="text-blue-600 font-semibold">CSR</span>
            <p className="text-gray-600">클라이언트 렌더링</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <span className="text-green-600 font-semibold">SSR</span>
            <p className="text-gray-600">서버 사이드 렌더링</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <span className="text-purple-600 font-semibold">SSG</span>
            <p className="text-gray-600">정적 사이트 생성</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <span className="text-orange-600 font-semibold">ISR</span>
            <p className="text-gray-600">점진적 정적 재생성</p>
          </div>
        </div>
      </div>

      {/* 전략 선택 탭 */}
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        <div className="flex overflow-x-auto">
          {renderingStrategies.map((strategy) => (
            <button
              key={strategy.id}
              onClick={() => setSelectedStrategy(strategy.id)}
              className={`flex-1 min-w-[200px] p-4 font-medium transition-all duration-200 ${
                selectedStrategy === strategy.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-blue-50"
              }`}
              style={{
                backgroundColor:
                  selectedStrategy === strategy.id
                    ? strategy.color === "blue"
                      ? "#3b82f6"
                      : strategy.color === "green"
                      ? "#10b981"
                      : strategy.color === "purple"
                      ? "#8b5cf6"
                      : strategy.color === "orange"
                      ? "#f59e0b"
                      : "#6b7280"
                    : undefined,
              }}
            >
              <div className="text-2xl mb-1">{strategy.icon}</div>
              <div className="font-bold">{strategy.name}</div>
              <div className="text-sm opacity-90">{strategy.fullName}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 시뮬레이션을 상단에 배치 */}
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 시뮬레이션 시각화 */}
          <div className="flex-1">
            <SimulationVisualizer />
          </div>

          {/* 시뮬레이션 제어 */}
          <div className="lg:w-80 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">🎮 시뮬레이션 제어</h3>

              {/* 속도 조절 */}
              <div className="mb-4">
                <span className="text-sm text-gray-600 block mb-2">
                  속도 조절:
                </span>
                <div className="flex bg-gray-200 rounded-lg p-1">
                  {[0.5, 1, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setSimulationSpeed(speed)}
                      disabled={isSimulating}
                      className={`flex-1 px-3 py-2 rounded text-sm transition-all ${
                        simulationSpeed === speed
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-300"
                      } ${isSimulating ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* 제어 버튼들 */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    console.log("시뮬레이션 시작 버튼 클릭됨");
                    console.log("현재 전략:", selectedStrategy);
                    console.log("현재 단계들:", currentSteps);
                    console.log("현재 상태:", {
                      isSimulating,
                      currentStep,
                      isPaused,
                    });
                    runSimulation();
                  }}
                  disabled={isSimulating}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isSimulating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
                  }`}
                >
                  {isSimulating ? "진행 중..." : "▶️ 시뮬레이션 시작"}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      console.log("일시정지/재개 버튼 클릭됨");
                      togglePause();
                    }}
                    disabled={!isSimulating}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                      !isSimulating
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isPaused
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {isPaused ? "▶️ 재개" : "⏸️ 일시정지"}
                  </button>

                  <button
                    onClick={() => {
                      console.log("중단 버튼 클릭됨");
                      stopSimulation();
                    }}
                    disabled={!isSimulating}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                      !isSimulating
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg"
                    }`}
                  >
                    ⏹️ 중단
                  </button>
                </div>
              </div>
            </div>

            {/* 단계별 설명 */}
            <div className="bg-gray-50 p-4 rounded-lg overflow-y-auto">
              <h4 className="font-medium text-gray-700 mb-3">렌더링 단계:</h4>
              <div className="space-y-2">
                {currentSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded border transition-all duration-200 text-sm ${
                      currentStep === step.step
                        ? "bg-blue-50 border-blue-300"
                        : currentStep > step.step
                        ? "bg-green-50 border-green-300"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          currentStep >= step.step
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {step.step}
                      </span>
                      <span className="font-medium">{step.title}</span>
                    </div>
                    <p className="text-xs text-gray-600 ml-7">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 전략 상세 정보와 성능 지표 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 전략 상세 정보 */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{currentStrategyData.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {currentStrategyData.fullName}
              </h3>
              <p className="text-gray-600">{currentStrategyData.description}</p>
            </div>
          </div>

          {/* 장단점 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">✅ 장점</h4>
              <ul className="space-y-1 text-sm">
                {currentStrategyData.advantages.map((advantage, index) => (
                  <li key={index} className="text-gray-700">
                    • {advantage}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">❌ 단점</h4>
              <ul className="space-y-1 text-sm">
                {currentStrategyData.disadvantages.map(
                  (disadvantage, index) => (
                    <li key={index} className="text-gray-700">
                      • {disadvantage}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* 사용 사례 */}
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              🎯 적합한 사용 사례
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentStrategyData.useCases.map((useCase, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 성능 지표 */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
          <h3 className="text-lg font-semibold mb-4">📊 성능 지표</h3>
          <PerformanceBar
            label="초기 로딩 속도"
            value={currentStrategyData.performance.initialLoad}
            color={currentStrategyData.color}
          />
          <PerformanceBar
            label="페이지 간 네비게이션"
            value={currentStrategyData.performance.navigation}
            color={currentStrategyData.color}
          />
          <PerformanceBar
            label="SEO 최적화"
            value={currentStrategyData.performance.seo}
            color={currentStrategyData.color}
          />
          <PerformanceBar
            label="TTFB (Time to First Byte)"
            value={currentStrategyData.performance.ttfb}
            color={currentStrategyData.color}
          />
        </div>
      </div>

      {/* 비교 섹션 */}
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            📊 렌더링 전략 비교
          </h3>
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {comparisonMode ? "차트 보기" : "표 보기"}
          </button>
        </div>

        {comparisonMode ? (
          /* 표 형태 비교 */
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">전략</th>
                  <th className="border border-gray-300 p-3 text-center">
                    초기 로딩
                  </th>
                  <th className="border border-gray-300 p-3 text-center">
                    네비게이션
                  </th>
                  <th className="border border-gray-300 p-3 text-center">
                    SEO
                  </th>
                  <th className="border border-gray-300 p-3 text-center">
                    TTFB
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderingStrategies.map((strategy) => (
                  <tr key={strategy.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{strategy.icon}</span>
                        <span className="font-medium">{strategy.name}</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {strategy.performance.initialLoad}/10
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {strategy.performance.navigation}/10
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {strategy.performance.seo}/10
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {strategy.performance.ttfb}/10
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* 차트 형태 비교 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderingStrategies.map((strategy) => (
              <div key={strategy.id} className="text-center">
                <div className="text-3xl mb-2">{strategy.icon}</div>
                <h4 className="font-semibold mb-3">{strategy.name}</h4>
                <div className="space-y-2">
                  <PerformanceBar
                    label="초기 로딩"
                    value={strategy.performance.initialLoad}
                    color={strategy.color}
                  />
                  <PerformanceBar
                    label="네비게이션"
                    value={strategy.performance.navigation}
                    color={strategy.color}
                  />
                  <PerformanceBar
                    label="SEO"
                    value={strategy.performance.seo}
                    color={strategy.color}
                  />
                  <PerformanceBar
                    label="TTFB"
                    value={strategy.performance.ttfb}
                    color={strategy.color}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 실제 코드 예시 섹션 */}
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          💻 실제 구현 예시
        </h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            {selectedStrategy === "csr" &&
              `// CSR
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data ? data.title : 'Loading...'}</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));`}

            {selectedStrategy === "ssr" &&
              `// SSR (Next.js)
export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();
  
  return {
    props: { data }
  };
}

function Page({ data }) {
  return <div>{data.title}</div>;
}

export default Page;`}

            {selectedStrategy === "ssg" &&
              `// SSG (Next.js)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: false // 빌드 타임에만 생성
  };
}

function Page({ data }) {
  return <div>{data.title}</div>;
}

export default Page;`}

            {selectedStrategy === "isr" &&
              `// ISR (Next.js)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 60 // 60초마다 재생성
  };
}

export async function getStaticPaths() {
  return {
    paths: ['/page/1', '/page/2'],
    fallback: 'blocking'
  };
}

function Page({ data }) {
  return <div>{data.title}</div>;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export { RenderingStrategiesLanding };
