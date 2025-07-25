"use client";

import React from "react";
import { getColorClasses } from "@/utils/colorMigration";

type AsyncPattern = "callback" | "promise" | "async-await";

interface TimelineEvent {
  timestamp: number;
  type: "start" | "success" | "error" | "catch";
  message: string;
}

interface PatternExample {
  pattern: AsyncPattern;
  title: string;
  code: string;
  successTimeline: TimelineEvent[];
  errorTimeline: TimelineEvent[];
}

const patternExamples: PatternExample[] = [
  {
    pattern: "callback",
    title: "콜백 패턴",
    code: `// 콜백 패턴
fetchData(function(error, data) {
  if (error) {
    console.error('에러 발생:', error);
    return;
  }
  console.log('성공:', data);
});`,
    successTimeline: [
      { timestamp: 0, type: "start", message: "fetchData 호출" },
      { timestamp: 1000, type: "success", message: "데이터 수신 성공" },
    ],
    errorTimeline: [
      { timestamp: 0, type: "start", message: "fetchData 호출" },
      { timestamp: 1000, type: "error", message: "에러 발생" },
      { timestamp: 1100, type: "catch", message: "콜백에서 에러 처리" },
    ],
  },
  {
    pattern: "promise",
    title: "Promise 패턴",
    code: `// Promise 패턴
fetchData()
  .then(data => {
    console.log('성공:', data);
  })
  .catch(error => {
    console.error('에러 발생:', error);
  });`,
    successTimeline: [
      { timestamp: 0, type: "start", message: "Promise 시작" },
      { timestamp: 1000, type: "success", message: "then() 실행" },
    ],
    errorTimeline: [
      { timestamp: 0, type: "start", message: "Promise 시작" },
      { timestamp: 1000, type: "error", message: "Promise rejected" },
      { timestamp: 1100, type: "catch", message: "catch() 실행" },
    ],
  },
  {
    pattern: "async-await",
    title: "Async/Await 패턴",
    code: `// Async/Await 패턴
try {
  const data = await fetchData();
  console.log('성공:', data);
} catch (error) {
  console.error('에러 발생:', error);
}`,
    successTimeline: [
      { timestamp: 0, type: "start", message: "await 시작" },
      { timestamp: 1000, type: "success", message: "데이터 반환" },
    ],
    errorTimeline: [
      { timestamp: 0, type: "start", message: "await 시작" },
      { timestamp: 1000, type: "error", message: "에러 throw" },
      { timestamp: 1100, type: "catch", message: "catch 블록 실행" },
    ],
  },
];

const AsyncErrorVisualizer = () => {
  const getEventColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "start": return "bg-blue-500";
      case "success": return "bg-green-500";
      case "error": return "bg-red-500";
      case "catch": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const renderTimeline = (timeline: TimelineEvent[], title: string, isSuccess: boolean) => {
    return (
      <div className="space-y-4">
        <h5 className={`font-semibold flex items-center gap-2 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
          <span>{isSuccess ? '✅' : '❌'}</span>
          {title}
        </h5>
        
        {/* 단계별 플로우 표시 */}
        <div className="space-y-3">
          {timeline.map((event, index) => {
            const isLast = index === timeline.length - 1;
            
            return (
              <div key={index} className="flex items-center gap-3">
                {/* 단계 번호 */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                  ${getEventColor(event.type)}
                `}>
                  {index + 1}
                </div>
                
                {/* 단계 설명 */}
                <div className="flex-1">
                  <div className={`
                    px-4 py-3 rounded-lg border-l-4
                    ${isSuccess ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}
                  `}>
                    <div className="font-medium text-gray-800">{event.message}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {event.type === 'start' && '함수 실행 시작'}
                      {event.type === 'success' && '정상 처리 완료'}
                      {event.type === 'error' && '에러 발생'}
                      {event.type === 'catch' && '에러 처리 실행'}
                    </div>
                  </div>
                </div>
                
                {/* 화살표 (마지막이 아닌 경우) */}
                {!isLast && (
                  <div className="flex flex-col items-center">
                    <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-400"></div>
                    <div className="w-0.5 h-4 bg-gray-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* 모든 패턴 비교 */}
      {patternExamples.map((example) => (
        <div key={example.pattern} className="space-y-6">
          {/* 패턴 제목 */}
          <div className={`bg-gradient-to-r ${getColorClasses(
            'from-indigo-50 to-purple-50',
            'border-indigo-200'
          )} rounded-lg p-4 border`}>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{example.title}</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="font-mono text-sm overflow-x-auto">{example.code}</pre>
            </div>
          </div>

          {/* 성공/실패 타임라인 비교 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`bg-gradient-to-r ${getColorClasses(
              'from-green-50'
            )} rounded-lg p-4 border border-green-200`}>
              {renderTimeline(example.successTimeline, "성공 시나리오", true)}
            </div>
            <div className={`bg-gradient-to-r ${getColorClasses(
              'from-red-50'
            )} rounded-lg p-4 border border-red-200`}>
              {renderTimeline(example.errorTimeline, "에러 시나리오", false)}
            </div>
          </div>
        </div>
      ))}

      {/* 패턴별 특징 비교 */}
      <div className={`bg-gradient-to-r ${getColorClasses(
        'from-purple-50 to-pink-50',
        'border-purple-200'
      )} rounded-lg p-6 border`}>
        <h5 className="font-semibold text-purple-800 mb-4">🔍 패턴별 특징 비교</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h6 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              콜백 패턴
            </h6>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>간단하고 직관적</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>콜백 지옥 문제</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>에러 처리 누락 위험</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h6 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              Promise 패턴
            </h6>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>체인 가능한 에러 처리</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>중앙화된 catch 처리</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">!</span>
                <span>Unhandled rejection 주의</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h6 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Async/Await 패턴
            </h6>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>동기 코드처럼 작성</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>try-catch로 깔끔한 처리</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>가장 좋은 가독성</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AsyncErrorVisualizer };