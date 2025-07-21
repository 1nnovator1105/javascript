import Link from "next/link";

const HomeLanding = () => {
  const studyPages = [
    // 초급 레벨
    {
      title: "📝 JavaScript 변수 선언 & 호이스팅",
      description:
        "var, let, const의 차이점과 스코프, 호이스팅, TDZ를 인터랙티브 시뮬레이터로 학습",
      path: "/variable",
      difficulty: "초급",
      topics: ["var", "let", "const", "스코프", "호이스팅", "TDZ"],
      icon: "📋",
    },
    {
      title: "⚖️ JavaScript 동등 연산자 (== vs ===)",
      description:
        "동등 연산자와 일치 연산자의 차이점을 실습과 예제로 명확하게 학습",
      path: "/equality-operators",
      difficulty: "초급",
      topics: ["동등 연산자", "일치 연산자", "타입 변환", "비교"],
      icon: "⚖️",
    },
    {
      title: "🌐 웹 렌더링 전략 시뮬레이터",
      description:
        "CSR, SSR, ISR, SSG의 차이점과 특징을 시각적 시뮬레이터로 학습",
      path: "/rendering-strategies",
      difficulty: "초급",
      topics: ["CSR", "SSR", "ISR", "SSG", "렌더링", "성능 최적화"],
      icon: "🌐",
    },
    {
      title: "🎨 브라우저 렌더링 과정",
      description:
        "HTML과 CSS가 화면에 그려지는 전체 과정을 시각적으로 학습하고 성능 최적화 기법 마스터",
      path: "/browser-rendering",
      difficulty: "초급",
      topics: [
        "DOM",
        "CSSOM",
        "Critical Rendering Path",
        "성능 최적화",
        "리플로우",
        "리페인트",
      ],
      icon: "🎨",
    },
    {
      title: "🔧 브라우저별 CSS 호환성 해결",
      description:
        "개발자가 자주 마주하는 CSS 호환성 이슈 해결 방법과 실무 사례를 체계적으로 학습",
      path: "/css-compatibility",
      difficulty: "초급",
      topics: [
        "Vendor Prefix",
        "Progressive Enhancement",
        "Feature Detection",
        "Cross Browser",
        "Polyfill",
        "학습 가이드",
      ],
      icon: "🔧",
    },

    // 초급-중급 레벨
    {
      title: "⏱️ JavaScript Debounce & Throttle",
      description:
        "이벤트 호출 빈도 제어 기법과 성능 최적화를 인터랙티브 시뮬레이터로 학습",
      path: "/debounce-throttle",
      difficulty: "초급-중급",
      topics: [
        "Debounce",
        "Throttle",
        "성능 최적화",
        "이벤트 제어",
        "사용자 경험",
      ],
      icon: "⏱️",
    },

    // 중급 레벨
    {
      title: "🚀 병렬 Promise 응답 순서",
      description:
        "여러 Promise가 병렬로 실행될 때 응답 받는 순서를 시각적으로 학습",
      path: "/parallel-promise",
      difficulty: "중급",
      topics: ["Promise", "비동기 처리", "병렬 실행"],
      icon: "🔄",
    },
    {
      title: "🧠 JavaScript 실행 컨텍스트",
      description:
        "실행 컨텍스트와 스택, 스코프 체인의 작동 원리를 단계별 시각화로 학습",
      path: "/execution-context",
      difficulty: "중급",
      topics: ["실행 컨텍스트", "스택", "스코프 체인", "호이스팅", "변수 환경"],
      icon: "🧠",
    },
    {
      title: "🔍 JavaScript Scope & Closure",
      description:
        "클로저와 스코프 체인을 통한 변수 캡처 메커니즘을 시각적 시뮬레이터로 학습",
      path: "/closure",
      difficulty: "중급",
      topics: ["Closure", "Scope", "Variable Capture", "React State"],
      icon: "🎯",
    },
    {
      title: "🧬 JavaScript Prototype & 상속",
      description: "프로토타입 체인과 상속 메커니즘을 시각적 시뮬레이터로 학습",
      path: "/prototype",
      difficulty: "중급",
      topics: ["Prototype", "상속", "생성자 함수", "클래스", "프로토타입 체인"],
      icon: "🧬",
    },
    {
      title: "🎯 Event Delegation & 이벤트 위임",
      description:
        "효율적인 이벤트 처리와 DOM 이벤트 전파 메커니즘을 인터랙티브 시뮬레이터로 학습",
      path: "/event-delegation",
      difficulty: "중급",
      topics: [
        "Event Delegation",
        "Event Bubbling",
        "Performance",
        "DOM Management",
      ],
      icon: "🎪",
    },
    {
      title: "⚛️ React Virtual DOM",
      description:
        "Virtual DOM의 작동 원리와 Diffing 알고리즘을 시각적 시뮬레이터로 학습",
      path: "/virtual-dom",
      difficulty: "중급",
      topics: [
        "Virtual DOM",
        "Diffing",
        "Reconciliation",
        "React",
        "성능 최적화",
      ],
      icon: "⚛️",
    },
    {
      title: "🧱 JavaScript 이벤트 루프",
      description:
        "Call Stack, Task Queue, Microtask Queue의 작동 원리를 시뮬레이션으로 학습",
      path: "/event-loop",
      difficulty: "중급",
      topics: ["Event Loop", "Call Stack", "Queue"],
      icon: "⚡",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "초급":
      case "기초 필수":
        return "bg-green-100 text-green-800 border-green-200";
      case "초급-중급":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "중급":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "고급":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div>
      {/* 소개 섹션 */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          🌟 학습 가이드
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h3 className="font-medium mb-2">📚 난이도별 학습 순서 추천</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-green-700 mb-1">
                  🟢 초급 (기초 개념)
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs ml-3">
                  <li>JavaScript 변수 선언 & 호이스팅</li>
                  <li>동등 연산자 (== vs ===)</li>
                  <li>웹 렌더링 전략</li>
                  <li>브라우저 렌더링 과정</li>
                  <li>CSS 호환성 해결</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-emerald-700 mb-1">
                  🟡 초급-중급 (응용)
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs ml-3">
                  <li>Debounce & Throttle</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-yellow-700 mb-1">
                  🔴 중급 (심화 개념)
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs ml-3">
                  <li>병렬 Promise 응답 순서</li>
                  <li>JavaScript 실행 컨텍스트</li>
                  <li>Scope & Closure</li>
                  <li>Prototype & 상속</li>
                  <li>Event Delegation</li>
                  <li>React Virtual DOM</li>
                  <li>JavaScript 이벤트 루프</li>
                </ol>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">💡 학습 팁</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>실제 코드와 시뮬레이션을 병행 학습</li>
              <li>브라우저 개발자 도구 활용</li>
              <li>다양한 시나리오로 실험</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 학습 코스 */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studyPages.map((course, index) => (
            <Link
              key={index}
              href={course.path}
              className="group block bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:border-indigo-300 rounded-xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{course.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        course.difficulty
                      )}`}
                    >
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-indigo-500 group-hover:text-indigo-700 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 더 많은 주제 준비 중 */}
      <div className="mt-12">
        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📚</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                더 많은 학습 주제 준비 중
              </h3>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">•</span>
              <span>브라우저 보안 정책 (CSP, SOP)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">•</span>
              <span>브라우저 렌더링 파이프라인</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">•</span>
              <span>JavaScript 엔진 동작 원리</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">•</span>
              <span>웹 성능 최적화 기법</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">•</span>
              <span>모던 웹 보안 (XSS, CSRF, SQL Injection)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 기술 스택 정보 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          🛠 기술 스택
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
            Next.js
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
            TypeScript
          </span>
          <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded">
            Tailwind CSS
          </span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
            React
          </span>
        </div>
      </div>
    </div>
  );
};

export { HomeLanding };
