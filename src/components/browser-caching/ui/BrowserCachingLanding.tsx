"use client";

import React, { useState, useEffect } from "react";
import { StudyPageLayout } from "@/components/share/ui/StudyPageLayout";
import { CacheFlowDiagram } from "./CacheFlowDiagram";
import { CacheComparisonCards } from "./CacheComparisonCards";
import { CDNLayerVisualizer } from "./CDNLayerVisualizer";
import { MultiUserSimulation } from "./MultiUserSimulation";

interface CacheEntry {
  url: string;
  headers: {
    "cache-control"?: string;
    etag?: string;
    "last-modified"?: string;
  };
  status: "hit" | "miss" | "revalidated";
  size: number;
  ttl?: number;
  timestamp: number;
}

interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  status: number;
  cached: boolean;
  time: number;
  size: number;
  headers: Record<string, string>;
}

const BrowserCachingLanding = () => {
  const [cache, setCache] = useState<CacheEntry[]>([]);
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<
    "no-cache" | "private" | "public" | "max-age"
  >("max-age");
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
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

  // 네트워크 요청 시뮬레이션
  const simulateNetworkRequest = (
    url: string,
    useCache: boolean = true
  ) => {
    const requestId = Date.now().toString();
    const cachedEntry = cache.find((entry) => entry.url === url);
    const now = Date.now();
    
    // CDN 시각화 활성화
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);

    // 캐시 확인
    if (useCache && cachedEntry) {
      const isExpired =
        cachedEntry.ttl &&
        now - cachedEntry.timestamp > cachedEntry.ttl * 1000;

      if (!isExpired) {
        // 캐시 히트
        const request: NetworkRequest = {
          id: requestId,
          url,
          method: "GET",
          status: 200,
          cached: true,
          time: 0,
          size: 0,
          headers: { "X-Cache": "HIT" },
        };
        setNetworkRequests((prev) => [...prev, request]);
        return;
      }
    }

    // 캐시 미스 또는 만료 - 실제 네트워크 요청
    const request: NetworkRequest = {
      id: requestId,
      url,
      method: "GET",
      status: 200,
      cached: false,
      time: Math.random() * 200 + 50,
      size: Math.floor(Math.random() * 500) + 100,
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": cacheStrategies[selectedStrategy].header,
      },
    };

    setNetworkRequests((prev) => [...prev, request]);

    // 캐시 업데이트
    if (selectedStrategy !== "no-cache") {
      const newCacheEntry: CacheEntry = {
        url,
        headers: {
          "cache-control": cacheStrategies[selectedStrategy].header,
          etag: `"${Date.now()}"`,
        },
        status: "miss",
        size: request.size,
        ttl: selectedStrategy === "max-age" ? 300 : 3600,
        timestamp: now,
      };
      setCache((prev) => [
        ...prev.filter((e) => e.url !== url),
        newCacheEntry,
      ]);
    }
  };

  // ETag 시뮬레이션
  const simulateETagValidation = () => {
    setIsSimulating(true);
    const url = "/api/data.json";
    const existingEntry = cache.find((e) => e.url === url);

    if (existingEntry?.headers.etag) {
      // 304 Not Modified 응답
      const request: NetworkRequest = {
        id: Date.now().toString(),
        url,
        method: "GET",
        status: 304,
        cached: false,
        time: 20,
        size: 0,
        headers: {
          "If-None-Match": existingEntry.headers.etag,
          "X-Cache": "REVALIDATED",
        },
      };
      setNetworkRequests((prev) => [...prev, request]);

      // 캐시 엔트리 업데이트
      setCache((prev) =>
        prev.map((e) =>
          e.url === url ? { ...e, status: "revalidated" } : e
        )
      );
    }

    setTimeout(() => setIsSimulating(false), 1000);
  };

  // CDN 캐싱 시각화
  const [cdnLayers] = useState([
    { name: "Browser Cache", hit: false, latency: 0 },
    { name: "Edge Server", hit: false, latency: 10 },
    { name: "Regional Cache", hit: false, latency: 50 },
    { name: "Origin Server", hit: true, latency: 200 },
  ]);

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="radiogroup" aria-label="캐시 전략 선택">
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
                aria-pressed={selectedStrategy === key}
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
          <h2 className="text-xl font-bold mb-4">Private vs Public 캐시 비교</h2>
          <CacheComparisonCards selectedStrategy={selectedStrategy === "private" || selectedStrategy === "public" ? selectedStrategy : undefined} />
        </div>

        {/* 캐시 시뮬레이터 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 브라우저 캐시 상태 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">브라우저 캐시</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto" role="region" aria-label="브라우저 캐시 상태" aria-live="polite">
              {cache.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  캐시가 비어있습니다
                </div>
              ) : (
                cache.map((entry, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded border ${
                      entry.status === "hit"
                        ? "bg-green-50 border-green-200"
                        : entry.status === "revalidated"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="font-mono text-sm">{entry.url}</div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-gray-600">
                        크기: {entry.size}KB
                      </span>
                      {entry.ttl && (
                        <span className="text-gray-600">
                          TTL: {entry.ttl}초
                        </span>
                      )}
                      {entry.headers.etag && (
                        <span className="text-gray-600">
                          ETag: {entry.headers.etag}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 네트워크 요청 타임라인 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">네트워크 요청</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto" role="region" aria-label="네트워크 요청 기록" aria-live="polite">
              {networkRequests.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  요청 기록이 없습니다
                </div>
              ) : (
                networkRequests.map((request) => (
                  <div
                    key={request.id}
                    className={`p-3 rounded border ${
                      request.cached
                        ? "bg-green-50 border-green-200"
                        : request.status === 304
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-mono text-sm">{request.url}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {request.method} • {request.status} •{" "}
                          {request.headers["X-Cache"]}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {request.time.toFixed(0)}ms
                        </div>
                        {request.size > 0 && (
                          <div className="text-xs text-gray-600">
                            {request.size}KB
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 시뮬레이션 컨트롤 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">시뮬레이션 컨트롤</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => simulateNetworkRequest("/api/users.json")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="/api/users.json 파일 요청 시뮬레이션"
            >
              /api/users.json 요청
            </button>
            <button
              onClick={() => simulateNetworkRequest("/static/style.css")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="/static/style.css 파일 요청 시뮬레이션"
            >
              /static/style.css 요청
            </button>
            <button
              onClick={() => simulateNetworkRequest("/images/logo.png")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="/images/logo.png 파일 요청 시뮬레이션"
            >
              /images/logo.png 요청
            </button>
            <button
              onClick={simulateETagValidation}
              disabled={isSimulating}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="ETag 검증 시뮬레이션"
              aria-disabled={isSimulating}
            >
              ETag 검증 시뮬레이션
            </button>
            <button
              onClick={() => {
                setCache([]);
                setNetworkRequests([]);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="캐시 및 네트워크 요청 기록 초기화"
            >
              초기화
            </button>
          </div>
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
                  <td className="py-2 text-sm text-red-600">
                    업데이트 지연
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-sm">immutable</td>
                  <td className="py-2 text-sm">버전된 리소스</td>
                  <td className="py-2 text-sm text-green-600">최고 성능</td>
                  <td className="py-2 text-sm text-red-600">
                    URL 변경 필요
                  </td>
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