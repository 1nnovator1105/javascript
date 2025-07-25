"use client";

import React, { useState } from "react";
import { getColorClasses } from "@/utils/colorMigration";

interface CSRFStep {
  id: number;
  actor: "user" | "attacker" | "server";
  action: string;
  description: string;
  isVulnerable: boolean;
}

const csrfSteps: CSRFStep[] = [
  {
    id: 1,
    actor: "user",
    action: "은행 사이트 로그인",
    description: "사용자가 정상적으로 은행 사이트에 로그인합니다. 세션 쿠키가 생성됩니다.",
    isVulnerable: false,
  },
  {
    id: 2,
    actor: "attacker",
    action: "악성 사이트 준비",
    description: "공격자가 은행 송금 요청을 자동으로 보내는 악성 웹사이트를 만듭니다.",
    isVulnerable: true,
  },
  {
    id: 3,
    actor: "user",
    action: "악성 사이트 방문",
    description: "로그인 상태에서 공격자의 악성 사이트를 방문합니다.",
    isVulnerable: true,
  },
  {
    id: 4,
    actor: "attacker",
    action: "자동 송금 요청",
    description: "악성 사이트가 사용자 모르게 은행 서버로 송금 요청을 전송합니다.",
    isVulnerable: true,
  },
  {
    id: 5,
    actor: "server",
    action: "요청 처리",
    description: "서버는 유효한 세션 쿠키를 확인하고 송금을 처리합니다.",
    isVulnerable: true,
  },
];

const CSRFVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProtected, setIsProtected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= csrfSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const getActorColor = (actor: string) => {
    switch (actor) {
      case "user": return "bg-blue-500";
      case "attacker": return "bg-red-500";
      case "server": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getActorIcon = (actor: string) => {
    switch (actor) {
      case "user": return "👤";
      case "attacker": return "🦹‍♂️";
      case "server": return "🖥️";
      default: return "❓";
    }
  };

  return (
    <div className="space-y-6">
      {/* 보호 모드 설정 */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isProtected}
            onChange={(e) => setIsProtected(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-medium">CSRF 토큰 보호 활성화</span>
        </label>
        <div className="flex gap-2">
          <button
            onClick={playAnimation}
            disabled={isPlaying}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              isPlaying
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : getColorClasses('bg-purple-500', 'text-white', 'hover:bg-purple-600')
            }`}
          >
            {isPlaying ? '재생 중...' : '공격 시뮬레이션 ▶️'}
          </button>
          <button
            onClick={resetAnimation}
            className={`px-4 py-2 rounded-lg font-medium text-sm ${getColorClasses(
              'bg-gray-500',
              'text-white',
              'hover:bg-gray-600'
            )}`}
          >
            리셋
          </button>
        </div>
      </div>

      {/* CSRF 공격 흐름 시각화 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-gray-50 to-gray-100'
      )} rounded-lg p-6`}>
        <div className="relative">
          {/* 행위자들 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                currentStep > 0 && csrfSteps[currentStep]?.actor === "user" 
                  ? 'ring-4 ring-blue-300 animate-pulse' 
                  : ''
              } bg-blue-100`}>
                <span className="text-2xl">👤</span>
              </div>
              <p className="mt-2 font-medium">사용자</p>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                currentStep > 0 && csrfSteps[currentStep]?.actor === "attacker" 
                  ? 'ring-4 ring-red-300 animate-pulse' 
                  : ''
              } bg-red-100`}>
                <span className="text-2xl">🦹‍♂️</span>
              </div>
              <p className="mt-2 font-medium">공격자</p>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                currentStep > 0 && csrfSteps[currentStep]?.actor === "server" 
                  ? 'ring-4 ring-green-300 animate-pulse' 
                  : ''
              } bg-green-100`}>
                <span className="text-2xl">🖥️</span>
              </div>
              <p className="mt-2 font-medium">서버</p>
            </div>
          </div>

          {/* 단계별 흐름 */}
          <div className="space-y-3">
            {csrfSteps.map((step, index) => (
              <div
                key={step.id}
                className={`
                  flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-300
                  ${
                    index <= currentStep
                      ? step.isVulnerable && !isProtected
                        ? 'border-red-300 bg-red-50'
                        : 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white opacity-50'
                  }
                `}
              >
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                  ${index <= currentStep ? getActorColor(step.actor) : 'bg-gray-300'}
                `}>
                  {step.id}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{step.action}</div>
                  <div className="text-sm text-gray-600 mt-1">{step.description}</div>
                  {isProtected && step.id === 4 && (
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      ✅ CSRF 토큰 검증 실패 - 요청 차단됨!
                    </div>
                  )}
                </div>
                <div className="text-2xl">{getActorIcon(step.actor)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSRF 방어 메커니즘 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-gradient-to-br ${getColorClasses(
          'from-purple-50 to-indigo-50',
          'border-purple-200'
        )} rounded-lg p-4 border`}>
          <h5 className="font-semibold text-purple-800 mb-3">🔐 CSRF 토큰 방식</h5>
          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm mb-3">
            <pre>{`// 서버에서 CSRF 토큰 생성
const csrfToken = generateRandomToken();
session.csrfToken = csrfToken;

// 폼에 토큰 포함
<form method="POST" action="/transfer">
  <input type="hidden" 
         name="csrf_token" 
         value="{csrfToken}" />
  <!-- 나머지 폼 필드 -->
</form>`}</pre>
          </div>
          <p className="text-sm text-purple-700">
            각 요청마다 고유한 토큰을 검증하여 외부 사이트의 요청을 차단합니다.
          </p>
        </div>

        <div className={`bg-gradient-to-br ${getColorClasses(
          'from-blue-50 to-cyan-50'
        )} rounded-lg p-4 border border-blue-200`}>
          <h5 className="font-semibold text-blue-800 mb-3">🍪 SameSite 쿠키</h5>
          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm mb-3">
            <pre>{`// SameSite 속성으로 CSRF 방어
Set-Cookie: sessionId=abc123; 
  SameSite=Strict; 
  Secure; 
  HttpOnly

// JavaScript에서 설정
document.cookie = 
  "session=abc123; SameSite=Strict";`}</pre>
          </div>
          <p className="text-sm text-blue-700">
            크로스 사이트 요청 시 쿠키 전송을 제한하여 CSRF를 방지합니다.
          </p>
        </div>
      </div>

      {/* 추가 방어 기법 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-yellow-50 to-orange-50',
        'border-yellow-200'
      )} rounded-lg p-4 border`}>
        <h5 className="font-semibold text-orange-800 mb-3">🛡️ 추가 CSRF 방어 기법</h5>
        <ul className="text-sm text-orange-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            <span><strong>Referer 검증:</strong> 요청의 출처를 확인하여 신뢰할 수 있는 도메인에서만 허용</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            <span><strong>Double Submit Cookie:</strong> 쿠키와 요청 파라미터에 동일한 토큰 포함</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            <span><strong>사용자 인증 재확인:</strong> 중요한 작업 시 비밀번호 재입력 요구</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            <span><strong>CAPTCHA:</strong> 자동화된 요청 차단</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { CSRFVisualizer };