"use client";

import React, { useState } from "react";
import { getColorClass } from "@/utils/colorMigration";

interface WebVitalMetric {
  name: string;
  value: number;
  unit: string;
  status: "good" | "needs-improvement" | "poor";
  description: string;
  threshold: {
    good: number;
    poor: number;
  };
}

interface PerformanceData {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fmp: number; // First Meaningful Paint
}

const PerformanceMetrics = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fmp: 0,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [simulationType, setSimulationType] = useState<
    "good" | "average" | "poor"
  >("average");

  // Web Vitals 임계값 정의
  const getWebVitalStatus = (
    metric: string,
    value: number
  ): "good" | "needs-improvement" | "poor" => {
    const thresholds: { [key: string]: { good: number; poor: number } } = {
      fcp: { good: 1.8, poor: 3.0 },
      lcp: { good: 2.5, poor: 4.0 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
      fmp: { good: 2.0, poor: 4.0 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return "good";

    if (value <= threshold.good) return "good";
    if (value <= threshold.poor) return "needs-improvement";
    return "poor";
  };

  // 웹 바이탈 메트릭 정의
  const webVitalMetrics: WebVitalMetric[] = [
    {
      name: "FCP",
      value: performanceData.fcp,
      unit: "s",
      status: getWebVitalStatus("fcp", performanceData.fcp),
      description:
        "First Contentful Paint - 첫 번째 콘텐츠가 화면에 나타나는 시간",
      threshold: { good: 1.8, poor: 3.0 },
    },
    {
      name: "LCP",
      value: performanceData.lcp,
      unit: "s",
      status: getWebVitalStatus("lcp", performanceData.lcp),
      description:
        "Largest Contentful Paint - 가장 큰 콘텐츠 요소가 렌더링되는 시간",
      threshold: { good: 2.5, poor: 4.0 },
    },
    {
      name: "FID",
      value: performanceData.fid,
      unit: "ms",
      status: getWebVitalStatus("fid", performanceData.fid),
      description: "First Input Delay - 첫 번째 사용자 입력에 대한 응답 시간",
      threshold: { good: 100, poor: 300 },
    },
    {
      name: "CLS",
      value: performanceData.cls,
      unit: "",
      status: getWebVitalStatus("cls", performanceData.cls),
      description: "Cumulative Layout Shift - 예상치 못한 레이아웃 이동의 누적",
      threshold: { good: 0.1, poor: 0.25 },
    },
    {
      name: "TTFB",
      value: performanceData.ttfb,
      unit: "ms",
      status: getWebVitalStatus("ttfb", performanceData.ttfb),
      description: "Time to First Byte - 첫 번째 바이트를 받는 시간",
      threshold: { good: 800, poor: 1800 },
    },
    {
      name: "FMP",
      value: performanceData.fmp,
      unit: "s",
      status: getWebVitalStatus("fmp", performanceData.fmp),
      description:
        "First Meaningful Paint - 의미 있는 콘텐츠가 처음 표시되는 시간",
      threshold: { good: 2.0, poor: 4.0 },
    },
  ];

  // 성능 시뮬레이션
  const simulatePerformance = async () => {
    setIsRunning(true);

    // 시뮬레이션 타입에 따른 기본 값
    const baseValues = {
      good: {
        fcp: 0.8 + Math.random() * 0.8, // 0.8-1.6s
        lcp: 1.2 + Math.random() * 1.0, // 1.2-2.2s
        fid: 20 + Math.random() * 60, // 20-80ms
        cls: 0.02 + Math.random() * 0.06, // 0.02-0.08
        ttfb: 200 + Math.random() * 400, // 200-600ms
        fmp: 1.0 + Math.random() * 0.8, // 1.0-1.8s
      },
      average: {
        fcp: 1.5 + Math.random() * 1.0, // 1.5-2.5s
        lcp: 2.0 + Math.random() * 1.5, // 2.0-3.5s
        fid: 80 + Math.random() * 120, // 80-200ms
        cls: 0.08 + Math.random() * 0.12, // 0.08-0.2
        ttfb: 600 + Math.random() * 800, // 600-1400ms
        fmp: 1.8 + Math.random() * 1.2, // 1.8-3.0s
      },
      poor: {
        fcp: 2.5 + Math.random() * 2.0, // 2.5-4.5s
        lcp: 3.5 + Math.random() * 2.5, // 3.5-6.0s
        fid: 250 + Math.random() * 250, // 250-500ms
        cls: 0.2 + Math.random() * 0.3, // 0.2-0.5
        ttfb: 1500 + Math.random() * 1500, // 1500-3000ms
        fmp: 3.0 + Math.random() * 2.0, // 3.0-5.0s
      },
    };

    const values = baseValues[simulationType];

    // 각 메트릭을 순차적으로 애니메이션
    const metrics = Object.keys(values) as (keyof PerformanceData)[];

    for (let i = 0; i < metrics.length; i++) {
      const metric = metrics[i];
      const targetValue = values[metric];

      // 애니메이션 효과
      const steps = 20;
      const stepValue = targetValue / steps;

      for (let step = 0; step <= steps; step++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setPerformanceData((prev) => ({
          ...prev,
          [metric]: Math.round(stepValue * step * 100) / 100,
        }));
      }
    }

    setIsRunning(false);
  };

  // 실제 성능 측정 (브라우저 API 사용)
  const measureRealPerformance = () => {
    if ("performance" in window && "PerformanceObserver" in window) {
      try {
        // Navigation Timing API
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          setPerformanceData((prev) => ({
            ...prev,
            ttfb: Math.round(
              navigation.responseStart - navigation.requestStart
            ),
          }));
        }

        // Paint Timing API
        const paintEntries = performance.getEntriesByType("paint");
        paintEntries.forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            setPerformanceData((prev) => ({
              ...prev,
              fcp: Math.round(entry.startTime) / 1000,
            }));
          }
        });

        // Layout Shift 시뮬레이션
        setPerformanceData((prev) => ({
          ...prev,
          cls: Math.round(Math.random() * 0.1 * 1000) / 1000,
          fid: Math.round(Math.random() * 50 + 10),
          lcp: Math.round((prev.fcp + Math.random() * 1 + 0.5) * 100) / 100,
          fmp: Math.round((prev.fcp + Math.random() * 0.5 + 0.2) * 100) / 100,
        }));
      } catch (error: unknown) {
        console.error(error);
        console.log("Performance measurement not supported");
        simulatePerformance();
      }
    } else {
      simulatePerformance();
    }
  };

  const resetMetrics = () => {
    setPerformanceData({
      fcp: 0,
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0,
      fmp: 0,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100";
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-100";
      case "poor":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return "✅";
      case "needs-improvement":
        return "⚠️";
      case "poor":
        return "❌";
      default:
        return "⭕";
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "needs-improvement":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const calculateScore = () => {
    const scores = webVitalMetrics.map((metric) => {
      switch (metric.status) {
        case "good":
          return 100;
        case "needs-improvement":
          return 60;
        case "poor":
          return 30;
        default:
          return 0;
      }
    });
    return Math.round(
      scores.reduce((a: number, b: number) => a + b, 0) / scores.length
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📊 Web Vitals & 성능 메트릭
        </h2>
        <p className="text-gray-600 mb-6">
          Core Web Vitals를 측정하고 웹사이트 성능을 종합적으로 분석해보세요.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex gap-2">
            <button
              onClick={measureRealPerformance}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {isRunning ? "측정 중..." : "실제 성능 측정"}
            </button>
            <button
              onClick={simulatePerformance}
              disabled={isRunning}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
            >
              시뮬레이션 실행
            </button>
            <button
              onClick={resetMetrics}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
              시뮬레이션 타입:
            </label>
            <select
              value={simulationType}
              onChange={(e) =>
                setSimulationType(e.target.value as "good" | "average" | "poor")
              }
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="good">우수</option>
              <option value="average">평균</option>
              <option value="poor">개선 필요</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className={`mb-8 bg-gradient-to-r from-blue-50 ${getColorClass('to-indigo-50')} rounded-xl p-6 border border-blue-200`}>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {calculateScore()}
          </div>
          <div className="text-lg text-blue-800 font-medium">
            전체 성능 점수
          </div>
          <div className="text-sm text-blue-600 mt-2">
            Core Web Vitals 기준 종합 평가
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {webVitalMetrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {metric.name}
                </h3>
                <span className="text-xl">{getStatusIcon(metric.status)}</span>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  metric.status
                )}`}
              >
                {metric.status === "good"
                  ? "우수"
                  : metric.status === "needs-improvement"
                  ? "보통"
                  : "개선 필요"}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {metric.value.toFixed(
                  metric.unit === "ms" ? 0 : metric.unit === "" ? 3 : 2
                )}
                <span className="text-lg text-gray-500 ml-1">
                  {metric.unit}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(
                    metric.status
                  )}`}
                  style={{
                    width: `${Math.min(
                      (metric.value / metric.threshold.poor) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>

              {/* Thresholds */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span className="text-green-600">
                  우수: &lt;{metric.threshold.good}
                  {metric.unit}
                </span>
                <span className="text-red-600">
                  나쁨: &gt;{metric.threshold.poor}
                  {metric.unit}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Optimization Tips */}
      <div className={`bg-gradient-to-r ${getColorClass('from-purple-50')} to-pink-50 rounded-xl p-6 border ${getColorClass('border-purple-200')}`}>
        <h3 className={`text-lg font-bold ${getColorClass('text-purple-800')} mb-4`}>
          🚀 성능 최적화 가이드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className={`font-semibold ${getColorClass('text-purple-700')} mb-3`}>
              Core Web Vitals 개선
            </h4>
            <ul className={`text-sm ${getColorClass('text-purple-600')} space-y-2`}>
              <li>
                <strong>FCP 개선:</strong> 중요한 리소스 우선 로딩, 폰트 최적화
              </li>
              <li>
                <strong>LCP 개선:</strong> 이미지 최적화, 서버 응답 시간 단축
              </li>
              <li>
                <strong>FID 개선:</strong> JavaScript 실행 시간 단축, 코드 분할
              </li>
              <li>
                <strong>CLS 개선:</strong> 이미지 크기 명시, 동적 콘텐츠 최소화
              </li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold ${getColorClass('text-purple-700')} mb-3`}>
              일반 성능 최적화
            </h4>
            <ul className={`text-sm ${getColorClass('text-purple-600')} space-y-2`}>
              <li>
                <strong>TTFB 개선:</strong> CDN 사용, 서버 캐싱 활용
              </li>
              <li>
                <strong>FMP 개선:</strong> Critical CSS 인라인, 점진적 렌더링
              </li>
              <li>
                <strong>전체적 개선:</strong> HTTP/2 사용, 압축, 레이지 로딩
              </li>
              <li>
                <strong>모니터링:</strong> Real User Monitoring (RUM) 도구 활용
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PerformanceMetrics };
