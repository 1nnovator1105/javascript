import Link from "next/link";

const HomeLanding = () => {
  const learningPaths = [
    {
      phase: 1,
      title: "Phase 1: 웹 프론트엔드 기초",
      description:
        "웹 개발자라면 반드시 알아야 할 핵심적인 CS 기초 지식을 학습합니다.",
      courses: [
        {
          title: "동기 vs 비동기 프로그래밍",
          description:
            "JavaScript의 핵심인 동기/비동기 처리 방식을 시각적 타임라인으로 완벽 이해",
          path: "/sync-async",
          difficulty: "기초 필수",
          topics: ["콜백", "Promise", "async/await"],
          icon: "⏱️",
          colorTheme: "indigo",
        },
        {
          title: "HTTP vs HTTPS",
          description:
            "웹 보안의 기초인 HTTP와 HTTPS의 차이점, SSL/TLS 동작 원리를 시각적으로 학습합니다",
          path: "/http-https",
          difficulty: "기초 필수",
          topics: ["암호화", "SSL/TLS", "인증서"],
          icon: "🔒",
          colorTheme: "emerald",
        },
        {
          title: "CORS (Cross-Origin Resource Sharing)",
          description:
            "브라우저의 보안 정책과 CORS 동작 원리를 시각적으로 학습하고, 실무에서 자주 마주치는 에러 해결법을 익혀보세요",
          path: "/cors",
          difficulty: "기초 필수",
          topics: ["Same-Origin Policy", "Preflight Request", "CORS Headers"],
          icon: "🌐",
          colorTheme: "orange",
        },
        {
          title: "인증 방식 비교 (Cookie vs Session vs JWT)",
          description:
            "웹 인증의 핵심 방식들을 비교하고, 각각의 장단점과 적합한 사용 사례를 학습합니다",
          path: "/auth-methods",
          difficulty: "기초 필수",
          topics: ["Cookie", "Session", "JWT"],
          icon: "🔐",
          colorTheme: "purple",
        },
        {
          title: "웹소켓 vs HTTP 통신",
          description:
            "실시간 통신을 위한 WebSocket과 전통적인 HTTP 통신의 차이점을 시각적으로 학습합니다",
          path: "/websocket-http",
          difficulty: "기초 필수",
          topics: ["실시간 통신", "양방향 통신", "Polling/SSE"],
          icon: "🔌",
          colorTheme: "cyan",
        },
        {
          title: "RESTful API 설계 원칙",
          description:
            "REST 아키텍처 스타일과 API 설계 모범 사례를 시각적으로 학습하고 실습합니다",
          path: "/restful-api",
          difficulty: "기초 필수",
          topics: ["HTTP Methods", "Status Codes", "Best Practices"],
          icon: "🔄",
          colorTheme: "rose",
        },
        {
          title: "웹 스토리지 완벽 가이드",
          description:
            "LocalStorage, SessionStorage, Cookie, IndexedDB의 차이점과 활용법을 실습으로 학습합니다",
          path: "/web-storage",
          difficulty: "기초 필수",
          topics: ["LocalStorage", "Cookie", "IndexedDB"],
          icon: "💾",
          colorTheme: "amber",
        },
      ],
    },
    {
      phase: 2,
      title: "Phase 2: JavaScript 핵심 마스터리",
      description:
        "JavaScript의 내부 동작 원리를 깊이 있게 파고들어 고급 개발자로 거듭납니다.",
      courses: [
        {
          title: "📝 JavaScript 변수 선언 & 호이스팅",
          description:
            "var, let, const의 차이점과 스코프, 호이스팅, TDZ를 인터랙티브 시뮬레이터로 학습",
          path: "/variable",
          difficulty: "초급",
          topics: ["var", "let", "const", "스코프", "호이스팅", "TDZ"],
          icon: "📋",
          colorTheme: "rose",
        },
        {
          title: "🚀 병렬 Promise 응답 순서",
          description:
            "여러 Promise가 병렬로 실행될 때 응답 받는 순서를 시각적으로 학습",
          path: "/parallel-promise",
          difficulty: "초급",
          topics: ["Promise", "비동기 처리", "병렬 실행"],
          icon: "🔄",
          colorTheme: "cyan",
        },
        {
          title: "🧠 JavaScript 실행 컨텍스트",
          description:
            "실행 컨텍스트와 스택, 스코프 체인의 작동 원리를 단계별 시각화로 학습",
          path: "/execution-context",
          difficulty: "중급",
          topics: [
            "실행 컨텍스트",
            "스택",
            "스코프 체인",
            "호이스팅",
            "변수 환경",
          ],
          icon: "🧠",
          colorTheme: "purple",
        },
        {
          title: "🔍 JavaScript Scope & Closure",
          description:
            "클로저와 스코프 체인을 통한 변수 캡처 메커니즘을 시각적 시뮬레이터로 학습",
          path: "/closure",
          difficulty: "중급",
          topics: ["Closure", "Scope", "Variable Capture", "React State"],
          icon: "🎯",
          colorTheme: "amber",
        },
        {
          title: "🧬 JavaScript Prototype & 상속",
          description:
            "프로토타입 체인과 상속 메커니즘을 시각적 시뮬레이터로 학습",
          path: "/prototype",
          difficulty: "중급",
          topics: [
            "Prototype",
            "상속",
            "생성자 함수",
            "클래스",
            "프로토타입 체인",
          ],
          icon: "🧬",
          colorTheme: "orange",
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
          colorTheme: "emerald",
        },
        {
          title: "🧱 JavaScript 이벤트 루프",
          description:
            "Call Stack, Task Queue, Microtask Queue의 작동 원리를 시뮬레이션으로 학습",
          path: "/event-loop",
          difficulty: "중급",
          topics: ["Event Loop", "Call Stack", "Queue"],
          icon: "⚡",
          colorTheme: "indigo",
        },
      ],
    },
    {
      phase: 3,
      title: "Phase 3: React & 웹 심화",
      description:
        "모던 웹 개발의 핵심인 React와 브라우저 렌더링에 대한 심도 있는 내용을 학습합니다.",
      courses: [
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
          colorTheme: "purple",
        },
        {
          title: "🌐 웹 렌더링 전략 시뮬레이터",
          description:
            "CSR, SSR, ISR, SSG의 차이점과 특징을 시각적 시뮬레이터로 학습",
          path: "/rendering-strategies",
          difficulty: "중급",
          topics: ["CSR", "SSR", "ISR", "SSG", "렌더링", "성능 최적화"],
          icon: "🌐",
          colorTheme: "rose",
        },
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "초급":
      case "기초 필수":
        return "bg-green-100 text-green-800 border-green-200";
      case "중급":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "고급":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCardColors = (colorTheme: string | undefined) => {
    switch (colorTheme) {
      case "indigo":
        return "from-indigo-50 to-blue-50 border-indigo-200 hover:border-indigo-300";
      case "emerald":
        return "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300";
      case "orange":
        return "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-300";
      case "purple":
        return "from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300";
      case "cyan":
        return "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300";
      case "rose":
        return "from-rose-50 to-orange-50 border-rose-200 hover:border-rose-300";
      case "amber":
        return "from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300";
      default:
        return "from-slate-50 to-slate-100 border-slate-200 hover:border-indigo-300";
    }
  };

  const getTopicColors = (colorTheme: string | undefined) => {
    switch (colorTheme) {
      case "indigo":
        return "bg-indigo-100 text-indigo-700";
      case "emerald":
        return "bg-emerald-100 text-emerald-700";
      case "orange":
        return "bg-orange-100 text-orange-700";
      case "purple":
        return "bg-purple-100 text-purple-700";
      case "cyan":
        return "bg-cyan-100 text-cyan-700";
      case "rose":
        return "bg-rose-100 text-rose-700";
      case "amber":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-indigo-100 text-indigo-700";
    }
  };

  return (
    <div>
      {/* 소개 섹션 */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Interactive JavaScript
        </h1>
        <p className="text-blue-800 text-lg">
          복잡한 JavaScript 개념과 웹 개발 지식을 인터랙티브 시뮬레이터로 쉽고
          재미있게 학습하세요.
        </p>
      </div>

      {/* 학습 코스 */}
      <div className="space-y-12">
        {learningPaths.map((path) => (
          <div key={path.phase}>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {path.title}
              </h2>
              <p className="text-gray-600">{path.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {path.courses.map((course, index) => (
                <Link
                  key={index}
                  href={course.path}
                  className={`group block bg-gradient-to-br rounded-xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${getCardColors(
                    course.colorTheme
                  )}`}
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
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTopicColors(
                          course.colorTheme
                        )}`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
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
