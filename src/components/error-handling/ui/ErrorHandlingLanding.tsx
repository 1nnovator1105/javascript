"use client";

import React, { useState } from "react";
import { getColorClass, getColorClasses } from "@/utils/colorMigration";
import { ErrorTypeSimulator } from "./ErrorTypeSimulator";
import { AsyncErrorVisualizer } from "./AsyncErrorVisualizer";
import { DebuggingPlayground } from "./DebuggingPlayground";

type TabType = "basics" | "async" | "debugging" | "production";

interface Tab {
  id: TabType;
  label: string;
  icon: string;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "basics",
    label: "기본 에러 처리",
    icon: "🎯",
    description: "JavaScript 에러 타입과 try-catch 패턴 학습",
  },
  {
    id: "async",
    label: "비동기 에러",
    icon: "⚡",
    description: "Promise와 async/await 에러 처리",
  },
  {
    id: "debugging",
    label: "디버깅 기법",
    icon: "🔍",
    description: "개발자 도구와 디버깅 전략",
  },
  {
    id: "production",
    label: "실무 패턴",
    icon: "🚀",
    description: "프로덕션 에러 처리 모범 사례",
  },
];

const ErrorHandlingLanding = () => {
  const [activeTab, setActiveTab] = useState<TabType>("basics");

  const renderTabContent = () => {
    switch (activeTab) {
      case "basics":
        return <BasicErrorHandling />;
      case "async":
        return <AsyncErrorHandling />;
      case "debugging":
        return <DebuggingTechniques />;
      case "production":
        return <ProductionPatterns />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 탭 네비게이션 */}
      <div className="bg-gray-50 rounded-xl p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  activeTab === tab.id
                    ? `bg-white ${getColorClasses(
                        "text-indigo-600"
                      )} shadow-md ring-2 ${getColorClass(
                        "ring-indigo-500"
                      )} ring-opacity-50`
                    : "text-gray-600 hover:bg-white hover:shadow-sm"
                }
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 활성 탭 설명 */}
      <div
        className={`bg-gradient-to-r ${getColorClasses(
          "from-indigo-50 to-purple-50",
          "border-indigo-200"
        )} p-4 rounded-lg border`}
      >
        <p className="text-gray-700 text-sm md:text-base text-center">
          {tabs.find((tab) => tab.id === activeTab)?.description}
        </p>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="min-h-[600px]">{renderTabContent()}</div>
    </div>
  );
};

// 기본 에러 처리 섹션
const BasicErrorHandling = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-indigo-50 to-purple-50",
          "border-indigo-200"
        )} rounded-xl p-6 border`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🎯 JavaScript 에러 타입 이해하기
        </h3>
        <p className="text-gray-600 mb-4">
          JavaScript에는 여러 종류의 내장 에러 타입이 있습니다. 각 에러 타입을
          이해하고 적절히 처리하는 방법을 배워봅시다.
        </p>

        {/* 에러 타입 시뮬레이터 */}
        <ErrorTypeSimulator />
      </div>
    </div>
  );
};

// 비동기 에러 처리 섹션
const AsyncErrorHandling = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-purple-50 to-pink-50",
          "border-purple-200"
        )} rounded-xl p-6 border`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ⚡ 비동기 작업의 에러 처리
        </h3>
        <p className="text-gray-600 mb-4">
          Promise, async/await에서 발생하는 에러를 효과적으로 처리하는 방법을
          시각적으로 학습해보세요.
        </p>

        {/* 비동기 에러 비주얼라이저 */}
        <AsyncErrorVisualizer />
      </div>
    </div>
  );
};

// 디버깅 기법 섹션
const DebuggingTechniques = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-blue-50 to-indigo-50"
        )} rounded-xl p-6 border border-blue-200`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🔍 효과적인 디버깅 전략
        </h3>
        <p className="text-gray-600 mb-4">
          개발자 도구를 활용한 디버깅 기법과 문제 해결 전략을 실습을 통해
          익혀보세요.
        </p>

        {/* 디버깅 플레이그라운드 */}
        <DebuggingPlayground />
      </div>
    </div>
  );
};

// 실무 패턴 섹션
const ProductionPatterns = () => {
  return (
    <div className="space-y-6">
      <div
        className={`bg-gradient-to-br ${getColorClasses(
          "from-violet-50 to-purple-50",
          "border-violet-200"
        )} rounded-xl p-6 border`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🚀 프로덕션 에러 처리 모범 사례
        </h3>
        <p className="text-gray-600 mb-4">
          실제 서비스에서 사용하는 에러 처리 패턴과 모니터링 전략을 알아봅시다.
        </p>

        {/* 실무 패턴 예제 */}
        <div className="space-y-6">
          {/* 에러 바운더리 */}
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-3">
              1. React Error Boundary
            </h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-3">
              <pre>{`class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // 에러 로깅 서비스로 전송
    console.error('에러 발생:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}`}</pre>
            </div>
            <p className="text-sm text-gray-600">
              React 앱에서 컴포넌트 에러를 잡아 전체 앱이 중단되는 것을
              방지합니다.
            </p>
          </div>

          {/* 글로벌 에러 핸들러 */}
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-3">
              2. 글로벌 에러 핸들러
            </h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-3">
              <pre>{`// 처리되지 않은 Promise rejection 처리
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // 에러 추적 서비스로 전송
  trackError(event.reason);
});

// 일반 JavaScript 에러 처리
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // 에러 추적 서비스로 전송
  trackError(event.error);
});`}</pre>
            </div>
            <p className="text-sm text-gray-600">
              예상치 못한 에러를 포착하여 모니터링 서비스로 전송합니다.
            </p>
          </div>

          {/* 재시도 메커니즘 */}
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-3">
              3. 자동 재시도 패턴
            </h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-3">
              <pre>{`async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      // 지수 백오프: 1초, 2초, 4초...
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}`}</pre>
            </div>
            <p className="text-sm text-gray-600">
              네트워크 요청 실패 시 자동으로 재시도하여 일시적인 문제를
              해결합니다.
            </p>
          </div>

          {/* 에러 로깅 전략 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`bg-gradient-to-br ${getColorClasses(
                "from-purple-50 to-pink-50",
                "border-purple-200"
              )} rounded-lg p-4 border`}
            >
              <h5 className="font-semibold text-purple-800 mb-2">
                📊 에러 모니터링 도구
              </h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>
                  • <strong>Sentry:</strong> 실시간 에러 추적
                </li>
                <li>
                  • <strong>LogRocket:</strong> 세션 재생 기능
                </li>
                <li>
                  • <strong>DataDog:</strong> 통합 모니터링
                </li>
                <li>
                  • <strong>New Relic:</strong> 성능 & 에러 분석
                </li>
              </ul>
            </div>

            <div
              className={`bg-gradient-to-br ${getColorClasses(
                "from-blue-50 to-indigo-50"
              )} rounded-lg p-4 border border-blue-200`}
            >
              <h5 className="font-semibold text-blue-800 mb-2">
                🔐 에러 처리 체크리스트
              </h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 민감한 정보 노출 방지</li>
                <li>• 사용자 친화적 에러 메시지</li>
                <li>• 에러 발생 시 복구 방법 제공</li>
                <li>• 에러 빈도 및 패턴 분석</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ErrorHandlingLanding };
