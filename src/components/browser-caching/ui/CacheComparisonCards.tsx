"use client";

import React from "react";

interface ComparisonItem {
  icon: string;
  label: string;
  description: string;
}

interface CacheComparisonCardsProps {
  selectedStrategy?: "private" | "public";
}

export const CacheComparisonCards: React.FC<CacheComparisonCardsProps> = ({
  selectedStrategy,
}) => {
  const privateFeatures: ComparisonItem[] = [
    {
      icon: "👤",
      label: "단일 사용자",
      description: "개인 브라우저에만 저장",
    },
    {
      icon: "🏠",
      label: "브라우저 전용",
      description: "로컬 캐시만 사용",
    },
    {
      icon: "🔒",
      label: "보안/개인정보",
      description: "민감한 데이터 보호",
    },
    {
      icon: "⚡",
      label: "서버 직접 연결",
      description: "CDN 우회하여 최신 데이터",
    },
  ];

  const publicFeatures: ComparisonItem[] = [
    {
      icon: "👥",
      label: "다중 사용자",
      description: "모든 사용자와 공유",
    },
    {
      icon: "🌐",
      label: "CDN + 브라우저",
      description: "다단계 캐시 활용",
    },
    {
      icon: "📦",
      label: "공유 리소스",
      description: "정적 콘텐츠 최적화",
    },
    {
      icon: "⚡",
      label: "엣지 최적화",
      description: "가까운 서버에서 빠르게",
    },
  ];

  const examples = {
    private: [
      "사용자 프로필 데이터",
      "장바구니 정보",
      "개인 설정값",
      "인증된 API 응답",
    ],
    public: [
      "이미지, CSS, JS 파일",
      "폰트 파일",
      "공개 API 데이터",
      "정적 HTML 페이지",
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Private Cache Card */}
      <div
        className={`bg-white rounded-lg p-6 shadow-sm border-2 transition-all duration-300 ${
          selectedStrategy === "private"
            ? "border-orange-500 shadow-lg shadow-orange-500/20"
            : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Private Cache</h3>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            개인 전용
          </span>
        </div>

        <div className="space-y-4 mb-6">
          {privateFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
              role="listitem"
            >
              <div className="text-2xl flex-shrink-0" aria-hidden="true">
                {feature.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {feature.label}
                </div>
                <div className="text-sm text-gray-600">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            실제 사용 예시:
          </h4>
          <ul className="space-y-1" role="list">
            {examples.private.map((example, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                {example}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <code className="text-xs font-mono text-orange-800">
            Cache-Control: private, max-age=3600
          </code>
        </div>
      </div>

      {/* Public Cache Card */}
      <div
        className={`bg-white rounded-lg p-6 shadow-sm border-2 transition-all duration-300 ${
          selectedStrategy === "public"
            ? "border-green-500 shadow-lg shadow-green-500/20"
            : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Public Cache</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            공유 가능
          </span>
        </div>

        <div className="space-y-4 mb-6">
          {publicFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
              role="listitem"
            >
              <div className="text-2xl flex-shrink-0" aria-hidden="true">
                {feature.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {feature.label}
                </div>
                <div className="text-sm text-gray-600">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            실제 사용 예시:
          </h4>
          <ul className="space-y-1" role="list">
            {examples.public.map((example, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                {example}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <code className="text-xs font-mono text-green-800">
            Cache-Control: public, max-age=86400
          </code>
        </div>
      </div>

      {/* Interactive Tips */}
      <div className="col-span-1 md:col-span-2 mt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 text-xl flex-shrink-0">💡</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                알고 계셨나요?
              </h4>
              <p className="text-sm text-blue-800">
                {selectedStrategy === "private" ? (
                  <>
                    Private 캐시는 사용자별로 격리되어 있어 다른 사용자가
                    접근할 수 없습니다. 로그인 정보나 개인화된 콘텐츠에
                    적합합니다.
                  </>
                ) : selectedStrategy === "public" ? (
                  <>
                    Public 캐시는 CDN에서 공유되어 전 세계 사용자들이 빠르게
                    접근할 수 있습니다. 한 번 캐시되면 모든 사용자가 혜택을
                    받습니다.
                  </>
                ) : (
                  <>
                    캐시 전략을 선택하면 각 전략의 특징과 사용 사례를 자세히
                    확인할 수 있습니다.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacheComparisonCards;