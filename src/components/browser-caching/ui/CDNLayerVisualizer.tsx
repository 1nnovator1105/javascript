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

interface PacketPosition {
  layerIndex: number;
  progress: number; // 0 to 1
}

export const CDNLayerVisualizer: React.FC<CDNLayerVisualizerProps> = ({
  strategy,
  isRequestActive = false,
}) => {
  const [activeLayer, setActiveLayer] = useState(-1);
  const [cacheHits, setCacheHits] = useState<boolean[]>([false, false, false, false]);
  const [packetPosition, setPacketPosition] = useState<PacketPosition | null>(null);
  const [hitAnimations, setHitAnimations] = useState<number[]>([]);
  const [missAnimations, setMissAnimations] = useState<number[]>([]);

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
      setPacketPosition(null);
      return;
    }

    // Simulate request flow through layers
    const layers = getLayers();
    let currentLayer = 0;
    const maxLayer = layers.findIndex((layer) => layer.hit) !== -1 
      ? layers.findIndex((layer) => layer.hit) 
      : layers.length - 1;

    // Animate packet movement
    let progress = 0;
    let animationFrame: number;

    const animatePacket = () => {
      progress += 0.02; // Adjust speed

      if (progress >= 1) {
        progress = 0;
        currentLayer++;

        if (currentLayer > maxLayer) {
          setActiveLayer(-1);
          setPacketPosition(null);
          
          // Trigger hit animation for the final layer
          if (layers[maxLayer].hit) {
            setHitAnimations(prev => [...prev, maxLayer]);
            setTimeout(() => {
              setHitAnimations(prev => prev.filter(i => i !== maxLayer));
            }, 1000);
          }
          return;
        }

        // Check for cache miss animation
        if (currentLayer > 0 && !layers[currentLayer - 1].hit && layers[currentLayer - 1].enabled) {
          setMissAnimations(prev => [...prev, currentLayer - 1]);
          setTimeout(() => {
            setMissAnimations(prev => prev.filter(i => i !== currentLayer - 1));
          }, 600);
        }
      }

      setActiveLayer(currentLayer);
      setPacketPosition({ layerIndex: currentLayer, progress });

      animationFrame = requestAnimationFrame(animatePacket);
    };

    animationFrame = requestAnimationFrame(animatePacket);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRequestActive, strategy, getLayers]);

  // Simulate cache hit patterns based on strategy
  useEffect(() => {
    // Add a small delay for smooth transition effect
    const timer = setTimeout(() => {
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
    }, 100);

    return () => clearTimeout(timer);
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

      {/* Layer descriptions */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">캐싱 계층 설명</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-lg">💻</span>
            <div>
              <strong className="text-blue-800">Browser Cache</strong>
              <p className="text-gray-700">사용자의 브라우저에 저장되는 로컬 캐시. 가장 빠른 응답 속도(0ms)를 제공하며 네트워크 요청 없이 즉시 콘텐츠를 제공합니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">🌐</span>
            <div>
              <strong className="text-blue-800">Edge Server</strong>
              <p className="text-gray-700">사용자와 가장 가까운 CDN 서버. 전 세계에 분산되어 있으며 지리적으로 가까운 사용자에게 빠른 응답(~10ms)을 제공합니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">🏢</span>
            <div>
              <strong className="text-blue-800">Regional Cache</strong>
              <p className="text-gray-700">지역별 중앙 캐시 서버. Edge Server가 캐시를 갖고 있지 않을 때 사용되며 중간 수준의 응답 속도(~50ms)를 제공합니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">🖥️</span>
            <div>
              <strong className="text-blue-800">Origin Server</strong>
              <p className="text-gray-700">원본 콘텐츠를 제공하는 실제 웹 서버. 캐시가 없거나 만료된 경우 여기서 최신 데이터를 가져옵니다(~200ms).</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Connection lines */}
        <div className="absolute inset-0 flex items-center">
          {layers.slice(0, -1).map((layer, index) => (
            <div
              key={index}
              className={`flex-1 h-1 mx-4 transition-all duration-500 relative overflow-hidden ${
                layer.enabled && layers[index + 1].enabled
                  ? activeLayer === index || activeLayer === index + 1
                    ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400"
                    : "bg-gray-300"
                  : "bg-transparent"
              }`}
            >
              {/* Dashed line for disabled connections */}
              {(!layer.enabled || !layers[index + 1].enabled) && (
                <div className="absolute inset-0 border-b-2 border-dashed border-gray-300" />
              )}
              
              {/* Flowing animation for active connections */}
              {layer.enabled && layers[index + 1].enabled && (activeLayer === index || activeLayer === index + 1) && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-flow" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Animated packet */}
        {packetPosition && layers[packetPosition.layerIndex] && layers[packetPosition.layerIndex + 1] && (
          <div className="absolute inset-0 flex items-center pointer-events-none">
            <div 
              className="absolute w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg transform -translate-y-1/2 z-20 flex items-center justify-center"
              style={{
                left: `calc(${(packetPosition.layerIndex + packetPosition.progress) * 25}% - 1rem)`,
                top: '50%',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
              }}
            >
              <div className="w-6 h-6 bg-white rounded-full animate-pulse opacity-40" />
              <div className="absolute text-xs font-bold">📦</div>
            </div>
          </div>
        )}

        {/* Layer nodes */}
        <div className="relative flex items-center justify-between">
          {layers.map((layer, index) => (
            <div key={layer.name} className="text-center relative z-10">
              <div className="relative">
                {/* Ripple effect for active layer */}
                {activeLayer === index && layer.enabled && (
                  <div className="absolute inset-0 rounded-lg animate-ping bg-blue-400 opacity-75" />
                )}
                
                {/* Hit burst effect */}
                {hitAnimations.includes(index) && (
                  <div className="absolute inset-0 rounded-lg animate-burst bg-green-400" />
                )}
                
                {/* Miss shake effect */}
                <div
                  className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center text-white font-bold transition-all duration-500 ease-in-out transform ${
                    missAnimations.includes(index) ? "animate-shake" : ""
                  } ${
                    !layer.enabled
                      ? "bg-gray-300 opacity-50 scale-95"
                      : layer.hit
                      ? hitAnimations.includes(index)
                        ? "bg-green-500 scale-125 shadow-2xl ring-4 ring-green-300 ring-opacity-50"
                        : "bg-green-500 shadow-lg"
                      : activeLayer === index
                      ? "bg-blue-500 scale-110 shadow-xl animate-pulse ring-2 ring-blue-300 ring-opacity-75"
                      : "bg-gray-400 shadow-md"
                  } ${
                    layer.enabled ? "cursor-pointer hover:scale-105 hover:shadow-xl transition-transform" : ""
                  }`}
                  role="button"
                  tabIndex={layer.enabled ? 0 : -1}
                  aria-label={`${layer.name} - ${layer.description}`}
                  aria-disabled={!layer.enabled}
                >
                  {/* Loading spinner for active layer */}
                  {activeLayer === index && !layer.hit && layer.enabled && (
                    <div className="absolute inset-0 rounded-lg bg-black bg-opacity-10 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  
                  <div className="text-xs mb-1">
                    {layer.hit && layer.enabled ? "캐시 히트!" : layer.name}
                  </div>
                  <div className="text-2xl relative">
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
                {layer.hit && layer.enabled && !hitAnimations.includes(index) && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-bounce">
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