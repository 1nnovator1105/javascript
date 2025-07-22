"use client";

import React, { useState, useEffect } from "react";

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  rating: "good" | "needs-improvement" | "poor";
  description: string;
}

interface OptimizationTechnique {
  category: string;
  techniques: {
    name: string;
    impact: "high" | "medium" | "low";
    difficulty: "easy" | "medium" | "hard";
    description: string;
    code?: string;
  }[];
}

const WebPerformanceLanding = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>("lcp");
  const [isLoading, setIsLoading] = useState(false);
  const [showOptimizations, setShowOptimizations] = useState(false);

  // Core Web Vitals
  const coreWebVitals: Record<string, PerformanceMetric> = {
    lcp: {
      name: "Largest Contentful Paint (LCP)",
      value: 2.5,
      unit: "s",
      rating: "good",
      description: "페이지의 가장 큰 콘텐츠 요소가 렌더링되는 시간"
    },
    fid: {
      name: "First Input Delay (FID)",
      value: 100,
      unit: "ms",
      rating: "good",
      description: "사용자가 페이지와 처음 상호작용할 때까지의 지연 시간"
    },
    cls: {
      name: "Cumulative Layout Shift (CLS)",
      value: 0.1,
      unit: "",
      rating: "good",
      description: "페이지 로드 중 발생하는 예기치 않은 레이아웃 이동"
    },
    ttfb: {
      name: "Time to First Byte (TTFB)",
      value: 800,
      unit: "ms",
      rating: "needs-improvement",
      description: "서버가 첫 번째 바이트를 응답하는 시간"
    },
    fcp: {
      name: "First Contentful Paint (FCP)",
      value: 1.8,
      unit: "s",
      rating: "good",
      description: "첫 번째 콘텐츠가 화면에 렌더링되는 시간"
    },
    inp: {
      name: "Interaction to Next Paint (INP)",
      value: 200,
      unit: "ms",
      rating: "good",
      description: "사용자 상호작용에 대한 페이지의 전반적인 반응성"
    }
  };

  const optimizationCategories: OptimizationTechnique[] = [
    {
      category: "이미지 최적화",
      techniques: [
        {
          name: "차세대 이미지 포맷 사용",
          impact: "high",
          difficulty: "easy",
          description: "WebP, AVIF 등 효율적인 이미지 포맷 사용",
          code: `<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>`
        },
        {
          name: "이미지 레이지 로딩",
          impact: "high",
          difficulty: "easy",
          description: "뷰포트 밖의 이미지는 나중에 로드",
          code: `<img src="image.jpg" loading="lazy" alt="Description">`
        },
        {
          name: "반응형 이미지",
          impact: "medium",
          difficulty: "medium",
          description: "디바이스에 맞는 적절한 크기의 이미지 제공",
          code: `<img 
  srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
  src="medium.jpg" 
  alt="Description"
>`
        }
      ]
    },
    {
      category: "JavaScript 최적화",
      techniques: [
        {
          name: "코드 스플리팅",
          impact: "high",
          difficulty: "medium",
          description: "필요한 코드만 로드하여 초기 번들 크기 감소",
          code: `// React lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <HeavyComponent />
    </React.Suspense>
  );
}`
        },
        {
          name: "Tree Shaking",
          impact: "medium",
          difficulty: "easy",
          description: "사용하지 않는 코드 제거",
          code: `// Bad - 전체 라이브러리 import
import _ from 'lodash';

// Good - 필요한 함수만 import
import debounce from 'lodash/debounce';`
        },
        {
          name: "번들 압축",
          impact: "high",
          difficulty: "easy",
          description: "Gzip/Brotli 압축 적용",
          code: `// Next.js config
module.exports = {
  compress: true,
  // Brotli 압축 우선 사용
}`
        }
      ]
    },
    {
      category: "리소스 로딩 최적화",
      techniques: [
        {
          name: "리소스 힌트 사용",
          impact: "medium",
          difficulty: "easy",
          description: "preconnect, prefetch, preload로 리소스 로딩 최적화",
          code: `<!-- DNS 사전 연결 -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- 중요 리소스 사전 로드 -->
<link rel="preload" href="critical.css" as="style">

<!-- 다음 페이지 사전 가져오기 -->
<link rel="prefetch" href="/next-page.js">`
        },
        {
          name: "Critical CSS 인라인",
          impact: "high",
          difficulty: "hard",
          description: "초기 렌더링에 필요한 CSS만 인라인으로 포함",
          code: `<style>
  /* Critical CSS - above the fold styles */
  body { margin: 0; font-family: system-ui; }
  .hero { background: #f0f0f0; padding: 2rem; }
</style>

<!-- Non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">`
        }
      ]
    },
    {
      category: "렌더링 최적화",
      techniques: [
        {
          name: "Layout Shift 방지",
          impact: "high",
          difficulty: "easy",
          description: "이미지와 광고에 명시적 크기 지정",
          code: `<!-- 이미지에 width, height 지정 -->
<img src="hero.jpg" width="1200" height="600" alt="Hero">

<!-- 또는 aspect-ratio 사용 -->
<style>
  .image-container {
    aspect-ratio: 16 / 9;
  }
</style>`
        },
        {
          name: "Font Loading 최적화",
          impact: "medium",
          difficulty: "medium",
          description: "폰트 로딩으로 인한 레이아웃 변경 방지",
          code: `@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* 또는 optional */
}`
        }
      ]
    }
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-600 bg-green-100 border-green-200";
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "poor":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-orange-100 text-orange-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const simulatePerformanceTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOptimizations(true);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Core Web Vitals 대시보드 */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-900 mb-6">Core Web Vitals 대시보드</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(coreWebVitals).map(([key, metric]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedMetric === key
                  ? "border-orange-500 bg-white shadow-lg"
                  : "border-orange-200 bg-white/50 hover:border-orange-300"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{metric.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getRatingColor(metric.rating)}`}>
                  {metric.rating === "good" ? "좋음" : metric.rating === "needs-improvement" ? "개선 필요" : "나쁨"}
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {metric.value}{metric.unit}
              </div>
              <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
            </button>
          ))}
        </div>

        {/* 성능 테스트 시뮬레이션 */}
        <button
          onClick={simulatePerformanceTest}
          disabled={isLoading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-orange-300"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              성능 측정 중...
            </span>
          ) : (
            "🚀 성능 테스트 실행"
          )}
        </button>
      </div>

      {/* 최적화 기법 */}
      {showOptimizations && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">성능 최적화 기법</h2>
          
          {optimizationCategories.map((category) => (
            <div key={category.category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">{category.category}</h3>
              </div>
              
              <div className="p-6 space-y-4">
                {category.techniques.map((technique, index) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{technique.name}</h4>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(technique.impact)}`}>
                          영향도: {technique.impact === "high" ? "높음" : technique.impact === "medium" ? "중간" : "낮음"}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(technique.difficulty)}`}>
                          난이도: {technique.difficulty === "easy" ? "쉬움" : technique.difficulty === "medium" ? "보통" : "어려움"}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{technique.description}</p>
                    
                    {technique.code && (
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
                        <code>{technique.code}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 성능 모니터링 도구 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">🔧 성능 모니터링 도구</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Chrome DevTools</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Lighthouse 성능 감사</li>
              <li>• Performance 탭 프로파일링</li>
              <li>• Network 탭 리소스 분석</li>
              <li>• Coverage 탭 미사용 코드 확인</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">온라인 도구</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• PageSpeed Insights</li>
              <li>• WebPageTest</li>
              <li>• GTmetrix</li>
              <li>• Chrome User Experience Report</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 체크리스트 */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">✅ 성능 최적화 체크리스트</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">초기 로딩 최적화</h4>
            <ul className="space-y-1 text-gray-600">
              <li>☐ Critical CSS 인라인화</li>
              <li>☐ JavaScript 비동기 로딩</li>
              <li>☐ 이미지 최적화 및 레이지 로딩</li>
              <li>☐ 리소스 힌트 활용</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">런타임 성능</h4>
            <ul className="space-y-1 text-gray-600">
              <li>☐ 불필요한 리렌더링 방지</li>
              <li>☐ 이벤트 리스너 최적화</li>
              <li>☐ 애니메이션 GPU 가속</li>
              <li>☐ 메모리 누수 방지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { WebPerformanceLanding };