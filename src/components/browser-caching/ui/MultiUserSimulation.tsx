"use client";

import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  location: string;
  requesting: boolean;
  cacheHit: boolean;
}

interface MultiUserSimulationProps {
  strategy: "private" | "public";
}

export const MultiUserSimulation: React.FC<MultiUserSimulationProps> = ({
  strategy,
}) => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "사용자 A", location: "서울", requesting: false, cacheHit: false },
    { id: 2, name: "사용자 B", location: "부산", requesting: false, cacheHit: false },
    { id: 3, name: "사용자 C", location: "대구", requesting: false, cacheHit: false },
    { id: 4, name: "사용자 D", location: "광주", requesting: false, cacheHit: false },
  ]);

  const [cdnCacheStatus, setCdnCacheStatus] = useState({
    cached: false,
    accessCount: 0,
    savedBandwidth: 0,
  });

  const [activeSimulation, setActiveSimulation] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const simulateUserRequest = (userId: number) => {
    setActiveSimulation(true);
    setSimulationStep(0);

    // Step 1: User starts request
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, requesting: true, cacheHit: false } : user
      )
    );

    setTimeout(() => {
      if (strategy === "public" && cdnCacheStatus.cached) {
        // Public cache hit scenario
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, cacheHit: true, requesting: false } : user
          )
        );
        setCdnCacheStatus((prev) => ({
          ...prev,
          accessCount: prev.accessCount + 1,
          savedBandwidth: prev.savedBandwidth + 500, // 500KB saved
        }));
        setSimulationStep(2); // Cache hit
      } else {
        // Cache miss or private cache
        setSimulationStep(1); // Going to origin
        
        setTimeout(() => {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === userId ? { ...user, cacheHit: false, requesting: false } : user
            )
          );

          // If public and first request, populate CDN cache
          if (strategy === "public" && !cdnCacheStatus.cached) {
            setCdnCacheStatus({
              cached: true,
              accessCount: 1,
              savedBandwidth: 0,
            });
          }
          setSimulationStep(3); // Complete
        }, 1000);
      }
      
      setTimeout(() => {
        setActiveSimulation(false);
      }, 2000);
    }, 1000);
  };

  const resetSimulation = () => {
    setUsers(users.map((user) => ({ ...user, requesting: false, cacheHit: false })));
    setCdnCacheStatus({ cached: false, accessCount: 0, savedBandwidth: 0 });
    setSimulationStep(0);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">다중 사용자 캐시 시뮬레이션</h3>
        <button
          onClick={resetSimulation}
          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          초기화
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">사용자들</h4>
          <div className="grid grid-cols-2 gap-3">
            {users.map((user) => (
              <div
                key={user.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  user.requesting
                    ? "border-blue-500 bg-blue-50"
                    : user.cacheHit
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl">👤</div>
                  {user.cacheHit && (
                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                      캐시 히트!
                    </span>
                  )}
                </div>
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">{user.location}</div>
                <button
                  onClick={() => simulateUserRequest(user.id)}
                  disabled={activeSimulation}
                  className="mt-2 w-full px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  리소스 요청
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CDN Status */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            {strategy === "public" ? "CDN 캐시 상태" : "캐시 동작"}
          </h4>
          
          {strategy === "public" ? (
            <div className="space-y-4">
              <div
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  cdnCacheStatus.cached
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">🌐</div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cdnCacheStatus.cached
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {cdnCacheStatus.cached ? "캐시됨" : "비어있음"}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">접근 횟수:</span>
                    <span className="font-medium">{cdnCacheStatus.accessCount}회</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">절약된 대역폭:</span>
                    <span className="font-medium text-green-600">
                      {cdnCacheStatus.savedBandwidth}KB
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Public 캐시 효과:</strong> 첫 사용자의 요청이 CDN에
                  캐시되면, 다른 모든 사용자들이 빠르게 접근할 수 있습니다.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-6 rounded-lg border-2 border-orange-500 bg-orange-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">🔒</div>
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium">
                    개별 캐시
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-orange-800">
                    각 사용자는 자신의 브라우저 캐시만 사용합니다.
                  </p>
                  <p className="text-orange-700">
                    CDN 캐시 공유 불가 - 모든 요청이 Origin으로 전달됩니다.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Private 캐시 특징:</strong> 개인정보 보호를 위해 캐시가
                  공유되지 않으며, 각 사용자가 독립적으로 리소스를 요청합니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulation Status */}
      {activeSimulation && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm font-medium text-gray-700">
              {simulationStep === 0 && "요청 시작 중..."}
              {simulationStep === 1 && "Origin 서버로 요청 중..."}
              {simulationStep === 2 && "CDN 캐시에서 응답!"}
              {simulationStep === 3 && "요청 완료"}
            </span>
          </div>
        </div>
      )}

      {/* Strategy Comparison */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-semibold text-sm mb-2">
            {strategy === "public" ? "현재 전략의 장점" : "Public 전략의 장점"}
          </h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              전역 캐시 공유로 대역폭 절약
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              빠른 응답 시간 (CDN 엣지)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              서버 부하 감소
            </li>
          </ul>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-semibold text-sm mb-2">
            {strategy === "private" ? "현재 전략의 장점" : "Private 전략의 장점"}
          </h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-500">✓</span>
              개인정보 보호 보장
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">✓</span>
              사용자별 맞춤 콘텐츠
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">✓</span>
              항상 최신 데이터 제공
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiUserSimulation;