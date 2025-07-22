"use client";

import React, { useCallback, useEffect, useState } from "react";

interface CDNLayer {
  name: string;
  hit: boolean;
  latency: number;
  enabled: boolean;
  description: string;
}

interface CDNLayerVisualizerProps {
  strategy: "no-cache" | "private" | "public" | "max-age";
  isRequestActive?: boolean;
}

export const CDNLayerVisualizer: React.FC<CDNLayerVisualizerProps> = ({
  strategy,
  isRequestActive = false,
}) => {
  const [activeLayer, setActiveLayer] = useState(-1);
  const [cacheHits, setCacheHits] = useState<boolean[]>([false, false, false, false]);

  const getLayers = useCallback((): CDNLayer[] => {
    const isPublic = strategy === "public";
    const isPrivate = strategy === "private";
    const isNoCache = strategy === "no-cache";

    return [
      {
        name: "Browser Cache",
        hit: !isNoCache && cacheHits[0],
        latency: 0,
        enabled: true,
        description: isPrivate
          ? "개인 브라우저 캐시만 사용"
          : isNoCache
          ? "캐시 사용 안 함"
          : "브라우저 로컬 캐시",
      },
      {
        name: "Edge Server",
        hit: isPublic && cacheHits[1],
        latency: 10,
        enabled: isPublic,
        description: isPublic
          ? "가장 가까운 CDN 서버"
          : "Private 캐시는 CDN 우회",
      },
      {
        name: "Regional Cache",
        hit: isPublic && cacheHits[2],
        latency: 50,
        enabled: isPublic,
        description: isPublic
          ? "지역별 중앙 캐시 서버"
          : "Private 캐시는 사용 불가",
      },
      {
        name: "Origin Server",
        hit: true,
        latency: 200,
        enabled: true,
        description: "원본 서버 (항상 최신 데이터)",
      },
    ];
  }, [strategy, cacheHits]);

  useEffect(() => {
    if (!isRequestActive) {
      setActiveLayer(-1);
      return;
    }

    // Simulate request flow through layers
    const layers = getLayers();
    let currentLayer = 0;
    const maxLayer = layers.findIndex((layer) => layer.hit) || layers.length - 1;

    const interval = setInterval(() => {
      if (currentLayer <= maxLayer) {
        setActiveLayer(currentLayer);
        currentLayer++;
      } else {
        setActiveLayer(-1);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isRequestActive, strategy, getLayers]);

  // Simulate cache hit patterns based on strategy
  useEffect(() => {
    if (strategy === "public") {
      setCacheHits([
        Math.random() > 0.3, // Browser cache hit 70%
        Math.random() > 0.4, // Edge cache hit 60%
        Math.random() > 0.6, // Regional cache hit 40%
        false, // Origin always processes
      ]);
    } else if (strategy === "private" || strategy === "max-age") {
      setCacheHits([
        Math.random() > 0.3, // Browser cache hit 70%
        false, // No CDN for private
        false, // No CDN for private
        false, // Origin always processes
      ]);
    } else {
      setCacheHits([false, false, false, false]); // no-cache
    }
  }, [strategy, isRequestActive]);

  const layers = getLayers();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">CDN 캐싱 계층</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">현재 전략:</span>
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              strategy === "public"
                ? "bg-green-100 text-green-800"
                : strategy === "private"
                ? "bg-orange-100 text-orange-800"
                : strategy === "no-cache"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {strategy}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Connection lines */}
        <div className="absolute inset-0 flex items-center">
          {layers.slice(0, -1).map((layer, index) => (
            <div
              key={index}
              className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                layer.enabled && layers[index + 1].enabled
                  ? activeLayer === index || activeLayer === index + 1
                    ? "bg-blue-500"
                    : "bg-gray-300"
                  : "bg-gray-200 border-b-2 border-dashed border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Layer nodes */}
        <div className="relative flex items-center justify-between">
          {layers.map((layer, index) => (
            <div key={layer.name} className="text-center relative z-10">
              <div className="relative">
                <div
                  className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center text-white font-bold transition-all duration-300 ${
                    !layer.enabled
                      ? "bg-gray-300 opacity-50"
                      : layer.hit
                      ? "bg-green-500"
                      : activeLayer === index
                      ? "bg-blue-500 scale-110 shadow-lg"
                      : "bg-gray-400"
                  } ${
                    layer.enabled ? "cursor-pointer hover:scale-105" : ""
                  }`}
                  role="button"
                  tabIndex={layer.enabled ? 0 : -1}
                  aria-label={`${layer.name} - ${layer.description}`}
                  aria-disabled={!layer.enabled}
                >
                  <div className="text-xs mb-1">
                    {layer.hit && layer.enabled ? "캐시 히트!" : layer.name}
                  </div>
                  <div className="text-2xl">
                    {index === 0
                      ? "💻"
                      : index === 1
                      ? "🌐"
                      : index === 2
                      ? "🏢"
                      : "🖥️"}
                  </div>
                </div>

                {/* Disabled indicator for Private cache on CDN layers */}
                {!layer.enabled && index > 0 && index < 3 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-red-500 text-4xl font-bold">✕</div>
                  </div>
                )}

                {/* Cache hit indicator */}
                {layer.hit && layer.enabled && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    ✓
                  </div>
                )}
              </div>

              <div className="mt-2">
                <div className="text-sm font-medium text-gray-700">
                  {layer.name}
                </div>
                <div className="text-xs text-gray-500">{layer.latency}ms</div>
                <div className="text-xs text-gray-600 mt-1 max-w-[100px] mx-auto">
                  {layer.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy explanation */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm">
            {strategy === "public" && (
              <div className="space-y-2">
                <p className="font-medium text-green-700">
                  Public 캐시 동작 방식:
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    모든 캐시 계층 활용 가능 (브라우저 → CDN → Origin)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    한 사용자의 요청이 다른 사용자에게도 도움
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    전 세계적으로 분산된 캐시 활용
                  </li>
                </ul>
              </div>
            )}
            {strategy === "private" && (
              <div className="space-y-2">
                <p className="font-medium text-orange-700">
                  Private 캐시 동작 방식:
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    브라우저 캐시만 사용 (CDN 계층 우회)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    개인정보 보호를 위해 공유 캐시 사용 안 함
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    사용자별로 독립적인 캐시 관리
                  </li>
                </ul>
              </div>
            )}
            {strategy === "no-cache" && (
              <div className="space-y-2">
                <p className="font-medium text-red-700">
                  No-Cache 동작 방식:
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    매번 Origin 서버에 재검증 요청
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    항상 최신 데이터 보장
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    성능보다 정확성이 중요한 경우 사용
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDNLayerVisualizer;