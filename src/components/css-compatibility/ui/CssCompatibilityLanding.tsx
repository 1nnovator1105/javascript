"use client";

import React, { useState } from "react";

type TabType = "interview" | "concepts" | "examples" | "tools";

interface InterviewQuestion {
  question: string;
  answer: string[];
  keyPoints: string[];
}

interface Concept {
  title: string;
  description: string;
  code?: string;
  icon: string;
}

interface Tool {
  name: string;
  description: string;
  usage: string;
  pros: string[];
  icon: string;
}

const CssCompatibilityLanding = () => {
  const [activeTab, setActiveTab] = useState<TabType>("interview");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedConcept, setSelectedConcept] = useState(0);

  const tabs = [
    {
      id: "interview" as TabType,
      label: "🎯 자주 묻는 질문",
      icon: "💼",
      description: "실제 현업에서 자주 나오는 CSS 호환성 관련 질문과 모범답안",
    },
    {
      id: "concepts" as TabType,
      label: "📚 핵심 개념",
      icon: "💡",
      description: "CSS 호환성 해결에 필요한 핵심 개념들",
    },
    {
      id: "examples" as TabType,
      label: "💻 실무 사례",
      icon: "🔧",
      description: "실제 프로젝트에서 발생한 호환성 문제와 해결 과정",
    },
    {
      id: "tools" as TabType,
      label: "🛠️ 도구 & 방법론",
      icon: "⚙️",
      description: "CSS 호환성 문제를 해결하는 도구와 방법론들",
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      question: "브라우저별 CSS 호환성 이슈를 어떻게 해결했나요?",
      answer: [
        "브라우저 호환성 문제는 <strong>예방</strong>과 <strong>해결</strong> 두 관점에서 접근합니다.",
        "<strong>예방 차원</strong>에서는 개발 초기에 Can I Use로 지원 현황을 확인하고, Autoprefixer 같은 도구로 자동화된 호환성 처리를 구축합니다.",
        "<strong>해결 차원</strong>에서는 @supports를 활용한 feature detection으로 브라우저별 fallback을 제공하고, 필요시 적절한 polyfill을 선택적으로 적용합니다.",
        "특히 <strong>Progressive Enhancement</strong> 원칙을 따라 모든 사용자에게 기본적인 기능을 보장하면서, 최신 브라우저에서는 향상된 경험을 제공하는 방식으로 개발합니다.",
      ],
      keyPoints: [
        "예방과 해결 두 관점으로 접근",
        "Can I Use, Autoprefixer 등 도구 활용",
        "@supports를 이용한 feature detection",
        "Progressive Enhancement 원칙",
        "선택적 polyfill 적용",
      ],
    },
    {
      question: "Vendor Prefix는 무엇이고 어떻게 관리하시나요?",
      answer: [
        "Vendor Prefix는 브라우저별 실험적 CSS 속성에 붙이는 접두사입니다. (-webkit-, -moz-, -ms-, -o-)",
        "<strong>수동 관리의 문제점</strong>: 유지보수가 어렵고, 표준화 이후 불필요한 코드가 남을 수 있습니다.",
        "<strong>Autoprefixer 도구 활용</strong>: PostCSS와 함께 사용하여 자동으로 필요한 prefix만 추가합니다.",
        "<strong>Browserslist 설정</strong>으로 지원할 브라우저 범위를 명시하여 불필요한 prefix를 제거합니다.",
        "빌드 과정에서 자동화하여 개발자는 표준 문법만 작성하고, 배포 시에만 prefix가 추가되도록 구성합니다.",
      ],
      keyPoints: [
        "브라우저별 실험적 속성 접두사",
        "Autoprefixer로 자동화",
        "Browserslist로 타겟 브라우저 관리",
        "빌드 과정에서 자동 처리",
        "표준 문법 우선 작성",
      ],
    },
    {
      question: "Progressive Enhancement와 Graceful Degradation의 차이는?",
      answer: [
        "<strong>Progressive Enhancement(점진적 향상)</strong>:",
        "• 기본 기능을 모든 브라우저에서 동작하도록 구현",
        "• 최신 브라우저에서는 향상된 기능을 점진적으로 추가",
        "• 모든 사용자에게 기본적인 사용자 경험 보장",
        "<strong>Graceful Degradation(우아한 성능 저하)</strong>:",
        "• 최신 기능을 우선 구현",
        "• 구형 브라우저에서는 기능이 단계적으로 제한됨",
        "• 최신 브라우저 사용자에게 최적화된 경험 제공",
        "<strong>실무에서는 Progressive Enhancement를 권장</strong>합니다. 접근성과 포용성 측면에서 더 나은 접근법입니다.",
      ],
      keyPoints: [
        "Progressive Enhancement: 기본 → 향상",
        "Graceful Degradation: 최신 → 제한",
        "모든 사용자 vs 최신 브라우저 우선",
        "접근성과 포용성 고려",
        "실무에서는 Progressive Enhancement 권장",
      ],
    },
    {
      question: "크로스 브라우저 테스트는 어떻게 진행하시나요?",
      answer: [
        "<strong>로컬 개발 환경</strong>: 주요 브라우저(Chrome, Firefox, Safari, Edge)에서 기본 테스트 진행",
        "<strong>클라우드 테스팅 서비스</strong>: BrowserStack, Sauce Labs 등을 활용하여 다양한 OS/브라우저 조합 테스트",
        "<strong>자동화된 테스트</strong>: Playwright, Cypress 등으로 크로스 브라우저 E2E 테스트 구축",
        "<strong>Visual Regression Test</strong>: Chromatic, Percy 등으로 UI 변화 감지",
        "<strong>성능 테스트</strong>: Lighthouse CI로 브라우저별 성능 지표 모니터링",
        "<strong>테스트 우선순위</strong>: 사용자 분석 데이터를 기반으로 주요 브라우저/버전 우선 테스트",
      ],
      keyPoints: [
        "주요 브라우저에서 로컬 테스트",
        "클라우드 서비스로 확장 테스트",
        "자동화된 E2E 테스트",
        "Visual Regression 테스트",
        "사용자 데이터 기반 우선순위",
      ],
    },
  ];

  const concepts: Concept[] = [
    {
      title: "CSS Feature Detection",
      description:
        "@supports 규칙을 사용하여 브라우저가 특정 CSS 속성을 지원하는지 확인하고, 지원 여부에 따라 다른 스타일을 적용하는 방법입니다.",
      code: `@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@supports not (display: grid) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
}`,
      icon: "🔍",
    },
    {
      title: "Vendor Prefix",
      description:
        "브라우저별 실험적 CSS 속성에 붙이는 접두사로, 표준화되기 전의 새로운 기능을 안전하게 사용할 수 있게 해줍니다.",
      code: `-webkit-transform: translateX(100px); /* Safari, Chrome */
-moz-transform: translateX(100px);    /* Firefox */
-ms-transform: translateX(100px);     /* IE, Edge */
transform: translateX(100px);         /* 표준 */`,
      icon: "🏷️",
    },
    {
      title: "CSS Reset/Normalize",
      description:
        "브라우저마다 다른 기본 스타일을 통일하여 일관된 시작점을 제공하는 방법입니다.",
      code: `/* CSS Reset 예시 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 또는 normalize.css 사용 */
@import url('normalize.css');`,
      icon: "🔄",
    },
    {
      title: "Polyfill",
      description:
        "구형 브라우저에서 지원하지 않는 최신 기능을 JavaScript로 구현하여 호환성을 제공하는 방법입니다.",
      code: `// CSS Grid polyfill 예시
if (!CSS.supports('display', 'grid')) {
  // Grid polyfill 로드
  import('css-grid-polyfill').then(() => {
    // 폴리필 적용 후 실행할 코드
  });
}`,
      icon: "🛡️",
    },
    {
      title: "Browserslist",
      description:
        "지원할 브라우저 범위를 명시하여 도구들이 적절한 호환성 처리를 할 수 있도록 설정하는 방법입니다.",
      code: `// package.json
{
  "browserslist": [
    "last 2 versions",
    "> 1%",
    "not dead",
    "not ie 11"
  ]
}`,
      icon: "📋",
    },
    {
      title: "CSS Logical Properties",
      description:
        "물리적 방향 대신 논리적 방향을 사용하여 다양한 언어와 쓰기 방향을 지원하는 CSS 속성입니다.",
      code: `/* 기존 방식 */
margin-left: 10px;
margin-right: 20px;

/* Logical Properties */
margin-inline-start: 10px;
margin-inline-end: 20px;`,
      icon: "🧭",
    },
  ];

  const tools: Tool[] = [
    {
      name: "Autoprefixer",
      description:
        "PostCSS 플러그인으로 CSS에 자동으로 vendor prefix를 추가해주는 도구",
      usage: "Browserslist 설정을 기반으로 필요한 prefix만 선택적으로 추가",
      pros: [
        "자동화된 prefix 관리",
        "불필요한 prefix 제거",
        "Browserslist 연동",
        "빌드 과정에 통합 가능",
      ],
      icon: "🤖",
    },
    {
      name: "Can I Use",
      description:
        "CSS, HTML, JavaScript 기능의 브라우저 지원 현황을 확인할 수 있는 웹사이트",
      usage: "개발 전 기능 지원 현황 확인, API를 통한 자동화된 체크도 가능",
      pros: [
        "실시간 지원 현황",
        "상세한 버전별 정보",
        "사용 통계 제공",
        "API 지원",
      ],
      icon: "📊",
    },
    {
      name: "PostCSS",
      description: "CSS를 JavaScript로 변환하고 처리할 수 있는 도구",
      usage: "다양한 플러그인을 통해 CSS 전처리, 후처리, 최적화 작업 수행",
      pros: [
        "모듈화된 플러그인 시스템",
        "기존 워크플로우와 통합 용이",
        "커스텀 변환 규칙 작성 가능",
        "성능 최적화",
      ],
      icon: "⚡",
    },
    {
      name: "BrowserStack",
      description: "클라우드 기반 크로스 브라우저 테스팅 플랫폼",
      usage: "실제 디바이스와 브라우저에서 웹사이트 테스트 및 디버깅",
      pros: [
        "실제 디바이스 환경",
        "다양한 OS/브라우저 조합",
        "스크린샷 비교",
        "자동화 테스트 지원",
      ],
      icon: "🌐",
    },
  ];

  const realWorldExamples = [
    {
      title: "CSS Grid 대체 방안",
      problem: "IE11에서 CSS Grid 지원 부족",
      solution: "Flexbox와 @supports를 활용한 progressive enhancement",
      code: `@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
}

@supports not (display: grid) {
  .layout {
    display: flex;
    flex-wrap: wrap;
  }
  .layout > * {
    flex: 1 1 250px;
    margin: 10px;
  }
}`,
      impact: "모든 브라우저에서 일관된 레이아웃 경험 제공",
    },
    {
      title: "CSS Custom Properties Polyfill",
      problem: "IE에서 CSS 변수(Custom Properties) 미지원",
      solution: "Sass 변수와 조건부 polyfill 적용",
      code: `// Sass 변수로 fallback
$primary-color: #007bff;

.button {
  background-color: $primary-color;
  background-color: var(--primary-color, #{$primary-color});
}

// JavaScript polyfill 조건부 로드
if (!window.CSS || !CSS.supports('color', 'var(--test)')) {
  import('css-vars-ponyfill').then(cssVars => {
    cssVars.default();
  });
}`,
      impact: "현대적인 CSS 변수 사용 가능, IE 지원 유지",
    },
    {
      title: "Sticky Positioning 대체",
      problem: "구형 브라우저에서 position: sticky 미지원",
      solution: "Intersection Observer API와 JavaScript로 구현",
      code: `/* CSS */
.sticky {
  position: sticky;
  top: 0;
}

.sticky-fallback {
  position: relative;
}

.sticky-fallback.is-stuck {
  position: fixed;
  top: 0;
  z-index: 100;
}

// JavaScript fallback
if (!CSS.supports('position', 'sticky')) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 1) {
        entry.target.classList.add('is-stuck');
      } else {
        entry.target.classList.remove('is-stuck');
      }
    });
  }, { threshold: 1 });
  
  observer.observe(document.querySelector('.sticky-fallback'));
}`,
      impact: "모든 브라우저에서 sticky 헤더 기능 제공",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "interview":
        return (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                💼 자주 묻는 질문 & 모범답안
              </h2>
              <p className="text-gray-600">
                실제 현업에서 자주 나오는 CSS 호환성 관련 질문들과 체계적인 답변
                방법을 학습하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 질문 목록 */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  📝 자주 묻는 질문 목록
                </h3>
                <div className="space-y-2">
                  {interviewQuestions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedQuestion(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedQuestion === index
                          ? "border-blue-500 bg-blue-50 text-blue-800"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium text-sm mb-2">
                        Q{index + 1}. {q.question}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 선택된 질문의 답변 */}
              <div className="lg:col-span-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Q. {interviewQuestions[selectedQuestion].question}
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                      💡 모범답안
                    </h4>
                    <div className="space-y-3">
                      {interviewQuestions[selectedQuestion].answer.map(
                        (paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          ></p>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                      🎯 핵심 포인트
                    </h4>
                    <ul className="space-y-2">
                      {interviewQuestions[selectedQuestion].keyPoints.map(
                        (point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-gray-600">{point}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "concepts":
        return (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📚 핵심 개념
              </h2>
              <p className="text-gray-600">
                CSS 호환성 문제를 해결하기 위해 알아야 할 핵심 개념들을
                학습하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 개념 목록 */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  🧠 개념 목록
                </h3>
                <div className="space-y-2">
                  {concepts.map((concept, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedConcept(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedConcept === index
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{concept.icon}</span>
                        <span className="font-medium text-sm">
                          {concept.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 선택된 개념 설명 */}
              <div className="lg:col-span-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">
                      {concepts[selectedConcept].icon}
                    </span>
                    {concepts[selectedConcept].title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {concepts[selectedConcept].description}
                  </p>

                  {concepts[selectedConcept].code && (
                    <div>
                      <h4 className="text-lg font-medium mb-3 text-gray-700">
                        💻 코드 예시
                      </h4>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{concepts[selectedConcept].code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "examples":
        return (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                💻 실무 사례
              </h2>
              <p className="text-gray-600">
                실제 프로젝트에서 발생한 CSS 호환성 문제와 해결 과정을
                살펴보세요.
              </p>
            </div>

            <div className="space-y-8">
              {realWorldExamples.map((example, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                      <span className="text-lg">🚨</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {example.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-red-700 mb-2">
                            🔴 문제상황
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {example.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-green-700 mb-2">
                            ✅ 해결방안
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {example.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                      💻 해결 코드
                    </h4>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">
                      📈 결과 & 임팩트
                    </h4>
                    <p className="text-green-700 text-sm">{example.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "tools":
        return (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🛠️ 도구 & 방법론
              </h2>
              <p className="text-gray-600">
                CSS 호환성 문제를 효율적으로 해결하는 도구들과 방법론을
                학습하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{tool.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      🎯 활용법
                    </h4>
                    <p className="text-gray-600 text-sm">{tool.usage}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">✨ 장점</h4>
                    <ul className="space-y-1">
                      {tool.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1 text-xs">•</span>
                          <span className="text-gray-600 text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                p-6 rounded-xl border-2 transition-all duration-300 text-left
                ${
                  activeTab === tab.id
                    ? "border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tab.icon}</span>
                <h3
                  className={`font-semibold ${
                    activeTab === tab.id ? "text-orange-700" : "text-gray-700"
                  }`}
                >
                  {tab.label}
                </h3>
              </div>
              <p
                className={`text-sm ${
                  activeTab === tab.id ? "text-orange-600" : "text-gray-500"
                }`}
              >
                {tab.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {renderContent()}
        </div>
      </div>

      {/* Key Tips Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            💡 학습 TIP
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                구체적 사례 준비
              </h3>
              <p className="text-sm text-gray-600">
                실제 프로젝트에서 겪은 호환성 문제와 해결 과정을 기록하고
                분석해보세요.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                도구 활용 경험
              </h3>
              <p className="text-sm text-gray-600">
                Autoprefixer, BrowserStack 등 다양한 도구들을 직접 사용해보고
                경험을 쌓아보세요.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-gray-800 mb-2">팀워크 경험</h3>
              <p className="text-sm text-gray-600">
                팀 내에서 호환성 가이드라인을 수립하고 QA와 협업하는 방법을
                학습해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CssCompatibilityLanding };
