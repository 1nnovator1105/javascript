"use client";

import React, { useState } from "react";
import { StudyPageLayout } from "@/components/share/ui/StudyPageLayout";
import { CacheFlowDiagram } from "./CacheFlowDiagram";
import { CacheComparisonCards } from "./CacheComparisonCards";
import { CDNLayerVisualizer } from "./CDNLayerVisualizer";
import { MultiUserSimulation } from "./MultiUserSimulation";

const BrowserCachingLanding = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<
    "no-cache" | "private" | "public" | "max-age"
  >("max-age");
  const [isSimulating] = useState(false);
  const [isFlowActive, setIsFlowActive] = useState(false);

  // 캐시 전략별 설명
  const cacheStrategies = {
    "no-cache": {
      title: "no-cache",
      description: "매번 서버에 재검증 요청",
      header: "Cache-Control: no-cache",
      color: "red",
    },
    private: {
      title: "private",
      description: "브라우저만 캐싱 가능 (CDN 불가)",
      header: "Cache-Control: private, max-age=3600",
      color: "orange",
    },
    public: {
      title: "public",
      description: "모든 캐시에 저장 가능 (CDN 포함)",
      header: "Cache-Control: public, max-age=86400",
      color: "green",
    },
    "max-age": {
      title: "max-age",
      description: "지정된 시간 동안 캐싱",
      header: "Cache-Control: max-age=300",
      color: "blue",
    },
  };

  return (
    <StudyPageLayout
      title="브라우저 캐싱 전략"
      subtitle="HTTP 캐싱의 작동 원리를 시각적으로 학습합니다"
      showBackButton
    >
      <div className="space-y-8">
        {/* 캐시 전략 선택 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">캐시 전략 선택</h2>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            role="radiogroup"
            aria-label="캐시 전략 선택"
          >
            {Object.entries(cacheStrategies).map(([key, strategy]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedStrategy(
                    key as "no-cache" | "private" | "public" | "max-age"
                  );
                  setIsFlowActive(true);
                  setTimeout(() => setIsFlowActive(false), 5000);
                }}
                aria-label={`${strategy.title} 캐시 전략 선택: ${strategy.description}`}
                aria-checked={selectedStrategy === key}
                role="radio"
                className={`p-4 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedStrategy === key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-mono text-sm font-bold mb-1">
                  {strategy.title}
                </div>
                <div className="text-xs text-gray-600">
                  {strategy.description}
                </div>
                <div className="mt-2 text-xs font-mono text-gray-500">
                  {strategy.header}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 요청 흐름 시각화 */}
        {(selectedStrategy === "private" || selectedStrategy === "public") && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">요청 흐름 시각화</h2>
            <CacheFlowDiagram
              strategy={selectedStrategy}
              isActive={isFlowActive}
            />
          </div>
        )}

        {/* Private vs Public 비교 카드 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Private vs Public 캐시 비교
          </h2>
          <CacheComparisonCards
            selectedStrategy={
              selectedStrategy === "private" || selectedStrategy === "public"
                ? selectedStrategy
                : undefined
            }
          />
        </div>

        {/* CDN 캐싱 계층 시각화 */}
        <CDNLayerVisualizer
          strategy={selectedStrategy}
          isRequestActive={isSimulating}
        />

        {/* 다중 사용자 시뮬레이션 */}
        {(selectedStrategy === "private" || selectedStrategy === "public") && (
          <MultiUserSimulation strategy={selectedStrategy} />
        )}

        {/* Service Worker 캐시 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Service Worker Cache API</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
            <pre>{`// Service Worker에서 캐시 사용하기
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // 캐시에서 찾으면 반환
      if (response) {
        return response;
      }
      
      // 없으면 네트워크 요청
      return fetch(event.request).then(response => {
        // 응답을 캐시에 저장
        return caches.open('v1').then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});`}</pre>
          </div>
        </div>

        {/* 캐싱 전략 비교 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">캐싱 전략 비교</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">전략</th>
                  <th className="text-left py-2">사용 사례</th>
                  <th className="text-left py-2">장점</th>
                  <th className="text-left py-2">단점</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-mono text-sm">no-cache</td>
                  <td className="py-2 text-sm">동적 콘텐츠</td>
                  <td className="py-2 text-sm text-green-600">항상 최신</td>
                  <td className="py-2 text-sm text-red-600">느린 성능</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-mono text-sm">private</td>
                  <td className="py-2 text-sm">개인 데이터</td>
                  <td className="py-2 text-sm text-green-600">보안성</td>
                  <td className="py-2 text-sm text-red-600">CDN 활용 불가</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-mono text-sm">public</td>
                  <td className="py-2 text-sm">정적 리소스</td>
                  <td className="py-2 text-sm text-green-600">CDN 활용</td>
                  <td className="py-2 text-sm text-red-600">업데이트 지연</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-sm">immutable</td>
                  <td className="py-2 text-sm">버전된 리소스</td>
                  <td className="py-2 text-sm text-green-600">최고 성능</td>
                  <td className="py-2 text-sm text-red-600">URL 변경 필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
};

export default BrowserCachingLanding;
