import Link from "next/link";
import { getColorClass, getColorClasses } from "@/utils/colorMigration";

const HomeLanding = () => {
  const learningPaths = [
    {
      phase: 0,
      title: "Phase 0: 실무 워크플로우 재정비",
      description:
        "매일 사용하는 도구와 기술을 더 깊이 이해하고, 협업과 생산성을 극대화하는 실무 워크플로우를 완성합니다.",
      courses: [
        {
          title: "📁 Git & GitHub 실무 워크플로우",
          description:
            "혼자 개발할 때와 팀에서 협업할 때 꼭 알아야 할 Git 명령어와 GitHub 사용법을 학습합니다",
          path: "/git-workflow",
          difficulty: "기초 실무",
          topics: ["브랜치 전략", "충돌 해결", "PR 작성", "이슈 관리"],
          icon: "📁",
          colorTheme: "orange",
        },
        {
          title: "🐛 에러 핸들링 & 고급 디버깅",
          description:
            "비동기 에러 처리, 소스맵 분석 등 복잡한 버그를 체계적으로 추적하고 해결하는 전략을 익힙니다",
          path: "/error-handling",
          difficulty: "실무 필수",
          topics: ["에러 바운더리", "소스맵 분석", "비동기 에러", "디버깅 전략"],
          icon: "🐛",
          colorTheme: "red",
        },
        {
          title: "🛡️ 웹 보안 기초 (XSS & CSRF)",
          description:
            "가장 흔한 웹 취약점의 원리를 이해하고, 프론트엔드 관점에서 효과적인 방어 기법을 적용합니다",
          path: "/web-security",
          difficulty: "실무 필수",
          topics: ["XSS 방어", "CSRF 토큰", "보안 헤더", "입력 검증"],
          icon: "🛡️",
          colorTheme: "red",
        },
        {
          title: "♿ 웹 접근성(A11y) 기초",
          description:
            "시맨틱 마크업과 WAI-ARIA를 활용하여 모두를 위한 웹 서비스를 만드는 실용적인 방법을 학습합니다",
          path: "/accessibility",
          difficulty: "실무 필수",
          topics: ["시맨틱 HTML", "WAI-ARIA", "키보드 탐색", "스크린 리더"],
          icon: "♿",
          colorTheme: "green",
        },
      ],
    },
    {
      phase: 1,
      title: "Phase 1: 웹 프론트엔드 기초",
      description:
        "웹 개발자라면 반드시 알아야 할 핵심적인 CS 기초 지식을 학습합니다.",
      courses: [
        {
          title: "⏱️ 동기 vs 비동기 프로그래밍",
          description:
            "JavaScript의 핵심인 동기/비동기 처리 방식을 시각적 타임라인으로 완벽 이해",
          path: "/sync-async",
          difficulty: "기초 필수",
          topics: ["콜백", "Promise", "async/await"],
          icon: "⏱️",
          colorTheme: "indigo",
        },
        {
          title: "🔒 HTTP vs HTTPS",
          description:
            "웹 보안의 기초인 HTTP와 HTTPS의 차이점, SSL/TLS 동작 원리를 시각적으로 학습합니다",
          path: "/http-https",
          difficulty: "기초 필수",
          topics: ["암호화", "SSL/TLS", "인증서"],
          icon: "🔒",
          colorTheme: "emerald",
        },
        {
          title: "🌐 CORS (Cross-Origin Resource Sharing)",
          description:
            "브라우저의 보안 정책과 CORS 동작 원리를 시각적으로 학습하고, 실무에서 자주 마주치는 에러 해결법을 익혀보세요",
          path: "/cors",
          difficulty: "기초 필수",
          topics: ["Same-Origin Policy", "Preflight Request", "CORS Headers"],
          icon: "🌐",
          colorTheme: "orange",
        },
        {
          title: "🔐 인증 방식 비교 (Cookie vs Session vs JWT)",
          description:
            "웹 인증의 핵심 방식들을 비교하고, 각각의 장단점과 적합한 사용 사례를 학습합니다",
          path: "/auth-methods",
          difficulty: "기초 필수",
          topics: ["Cookie", "Session", "JWT"],
          icon: "🔐",
          colorTheme: "purple",
        },
        {
          title: "🔌 웹소켓 vs HTTP 통신",
          description:
            "실시간 통신을 위한 WebSocket과 전통적인 HTTP 통신의 차이점을 시각적으로 학습합니다",
          path: "/websocket-http",
          difficulty: "기초 필수",
          topics: ["실시간 통신", "양방향 통신", "Polling/SSE"],
          icon: "🔌",
          colorTheme: "cyan",
        },
        {
          title: "🔄 RESTful API 설계 원칙",
          description:
            "REST 아키텍처 스타일과 API 설계 모범 사례를 시각적으로 학습하고 실습합니다",
          path: "/restful-api",
          difficulty: "기초 필수",
          topics: ["HTTP Methods", "Status Codes", "Best Practices"],
          icon: "🔄",
          colorTheme: "rose",
        },
        {
          title: "💾 웹 스토리지 완벽 가이드",
          description:
            "LocalStorage, SessionStorage, Cookie, IndexedDB의 차이점과 활용법을 실습으로 학습합니다",
          path: "/web-storage",
          difficulty: "기초 필수",
          topics: ["LocalStorage", "Cookie", "IndexedDB"],
          icon: "💾",
          colorTheme: "amber",
        },
        {
          title: "🗄️ 브라우저 캐싱 전략",
          description:
            "HTTP 캐싱, 브라우저 캐시, CDN 캐싱의 작동 원리를 시각적으로 학습하고 성능을 최적화합니다",
          path: "/browser-caching",
          difficulty: "기초 필수",
          topics: ["Cache-Control", "ETag", "CDN", "Service Worker Cache"],
          icon: "🗄️",
          colorTheme: "slate",
        },
        {
          title: "📡 GraphQL vs REST",
          description:
            "REST API와 GraphQL의 차이점을 실제 요청/응답 비교로 학습하고 각각의 장단점을 이해합니다",
          path: "/graphql-rest",
          difficulty: "기초 필수",
          topics: ["Over-fetching", "Under-fetching", "Schema", "Resolver"],
          icon: "📡",
          colorTheme: "pink",
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
          title: "⚖️ JavaScript 동등 연산자 (== vs ===)",
          description:
            "동등 연산자와 일치 연산자의 차이점을 실습과 예제로 명확하게 학습",
          path: "/equality-operators",
          difficulty: "초급",
          topics: ["동등 연산자", "일치 연산자", "타입 변환", "비교"],
          icon: "⚖️",
          colorTheme: "blue",
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
        {
          title: "🎯 this 바인딩의 모든 것",
          description:
            "JavaScript의 this 키워드가 결정되는 4가지 규칙을 인터랙티브 예제로 완벽 학습",
          path: "/this-binding",
          difficulty: "중급",
          topics: [
            "암시적 바인딩",
            "명시적 바인딩",
            "new 바인딩",
            "화살표 함수",
          ],
          icon: "🎯",
          colorTheme: "violet",
        },
        {
          title: "🔄 JavaScript 모듈 시스템",
          description:
            "CommonJS, ES Modules, AMD의 차이점과 번들러가 처리하는 과정을 시각화로 학습",
          path: "/module-systems",
          difficulty: "중급",
          topics: ["import/export", "require", "동적 import", "순환 참조"],
          icon: "🔄",
          colorTheme: "teal",
        },
        {
          title: "🎯 JavaScript 배열 메서드 완전 정복",
          description:
            "map, filter, reduce부터 최신 메서드까지 배열 조작의 모든 것을 실습으로 학습",
          path: "/array-methods-mastery",
          difficulty: "초급",
          topics: ["고차함수", "메서드 체이닝", "성능 비교", "실무 패턴"],
          icon: "🎯",
          colorTheme: "purple",
        },
        {
          title: "📊 JavaScript 메모리 관리",
          description:
            "가비지 컬렉션, 메모리 누수, WeakMap/WeakSet의 동작을 시각적으로 학습합니다",
          path: "/memory-management",
          difficulty: "중급",
          topics: ["가비지 컬렉션", "메모리 누수", "힙/스택", "WeakMap"],
          icon: "📊",
          colorTheme: "lime",
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
        {
          title: "🎨 브라우저 렌더링 과정",
          description:
            "HTML과 CSS가 화면에 그려지는 전체 과정을 시각적으로 학습하고 성능 최적화 기법 마스터",
          path: "/browser-rendering",
          difficulty: "중급",
          topics: [
            "DOM",
            "CSSOM",
            "Critical Rendering Path",
            "성능 최적화",
            "리플로우",
            "리페인트",
          ],
          icon: "🎨",
          colorTheme: "emerald",
        },
        {
          title: "🔧 브라우저별 CSS 호환성 해결",
          description:
            "개발자가 자주 마주하는 CSS 호환성 이슈 해결 방법과 실무 사례를 체계적으로 학습",
          path: "/css-compatibility",
          difficulty: "중급",
          topics: [
            "Vendor Prefix",
            "Progressive Enhancement",
            "Feature Detection",
            "Cross Browser",
            "Polyfill",
          ],
          icon: "🔧",
          colorTheme: "cyan",
        },
        {
          title: "⏱️ JavaScript Debounce & Throttle",
          description:
            "이벤트 호출 빈도 제어 기법과 성능 최적화를 인터랙티브 시뮬레이터로 학습",
          path: "/debounce-throttle",
          difficulty: "중급",
          topics: [
            "Debounce",
            "Throttle",
            "성능 최적화",
            "이벤트 제어",
            "사용자 경험",
          ],
          icon: "⏱️",
          colorTheme: "amber",
        },
        {
          title: "🎛️ React 상태 관리 완전 가이드",
          description:
            "useState부터 Context API까지 React의 모든 상태 관리 패턴을 초보자도 쉽게 이해할 수 있도록 단계별로 학습합니다",
          path: "/react-state",
          difficulty: "초급-중급",
          topics: [
            "useState",
            "useEffect",
            "useReducer",
            "Context API",
            "커스텀 훅",
          ],
          icon: "🎛️",
          colorTheme: "blue",
        },
        {
          title: "📱 반응형 웹 디자인 실전",
          description:
            "미디어 쿼리, 플렉스박스, 그리드를 활용한 반응형 레이아웃을 실습으로 구현합니다",
          path: "/responsive-design",
          difficulty: "초급-중급",
          topics: ["미디어 쿼리", "모바일 퍼스트", "터치 이벤트", "뷰포트"],
          icon: "📱",
          colorTheme: "pink",
        },
        {
          title: "⚡ 웹 성능 측정과 개선",
          description:
            "Lighthouse, Web Vitals를 활용한 성능 측정과 실제 개선 방법을 학습합니다",
          path: "/web-performance",
          difficulty: "중급",
          topics: [
            "Core Web Vitals",
            "번들 최적화",
            "이미지 최적화",
            "로딩 전략",
          ],
          icon: "⚡",
          colorTheme: "orange",
        },
        {
          title: "🧪 프론트엔드 테스팅 입문",
          description:
            "Jest와 React Testing Library를 활용한 컴포넌트 테스트 작성법을 학습합니다",
          path: "/frontend-testing",
          difficulty: "중급",
          topics: ["단위 테스트", "통합 테스트", "모킹", "테스트 주도 개발"],
          icon: "🧪",
          colorTheme: "green",
        },
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "실무 필수":
        return "bg-red-100 text-red-800 border-red-200";
      case "기초 실무":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "초급":
      case "기초 필수":
        return "bg-green-100 text-green-800 border-green-200";
      case "초급-중급":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "중급":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "고급":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCardColors = (colorTheme: string | undefined) => {
    switch (colorTheme) {
      case "indigo":
        return `${getColorClass('from-indigo-50 to-purple-50')} ${getColorClasses('border-indigo-200', 'hover:border-indigo-300')}`;
      case "emerald":
        return "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300";
      case "orange":
        return "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-300";
      case "purple":
        return `${getColorClass('from-purple-50 to-pink-50')} ${getColorClasses('border-purple-200', 'hover:border-purple-300')}`;
      case "cyan":
        return "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300";
      case "rose":
        return "from-rose-50 to-orange-50 border-rose-200 hover:border-rose-300";
      case "amber":
        return "from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300";
      case "blue":
        return `${getColorClass('from-blue-50 to-indigo-50')} border-blue-200 hover:border-blue-300`;
      case "slate":
        return "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-300";
      case "pink":
        return "from-pink-50 to-rose-50 border-pink-200 hover:border-pink-300";
      case "red":
        return "from-red-50 to-rose-50 border-red-200 hover:border-red-300";
      case "violet":
        return `${getColorClass('from-violet-50 to-purple-50')} ${getColorClasses('border-violet-200', 'hover:border-violet-300')}`;
      case "teal":
        return "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-300";
      case "lime":
        return "from-lime-50 to-green-50 border-lime-200 hover:border-lime-300";
      case "fuchsia":
        return "from-fuchsia-50 to-pink-50 border-fuchsia-200 hover:border-fuchsia-300";
      case "green":
        return "from-green-50 to-emerald-50 border-green-200 hover:border-green-300";
      default:
        return `${getColorClass('from-slate-50 to-slate-100')} border-slate-200 ${getColorClass('hover:border-indigo-300')}`;
    }
  };

  const getTopicColors = (colorTheme: string | undefined) => {
    switch (colorTheme) {
      case "indigo":
        return `${getColorClasses('bg-indigo-100', 'text-indigo-700')}`;
      case "emerald":
        return "bg-emerald-100 text-emerald-700";
      case "orange":
        return "bg-orange-100 text-orange-700";
      case "purple":
        return `${getColorClasses('bg-purple-100', 'text-purple-700')}`;
      case "cyan":
        return "bg-cyan-100 text-cyan-700";
      case "rose":
        return "bg-rose-100 text-rose-700";
      case "amber":
        return "bg-amber-100 text-amber-700";
      case "blue":
        return "bg-blue-100 text-blue-700";
      case "slate":
        return "bg-slate-100 text-slate-700";
      case "pink":
        return "bg-pink-100 text-pink-700";
      case "red":
        return "bg-red-100 text-red-700";
      case "violet":
        return `${getColorClasses('bg-violet-100', 'text-violet-700')}`;
      case "teal":
        return "bg-teal-100 text-teal-700";
      case "lime":
        return "bg-lime-100 text-lime-700";
      case "fuchsia":
        return "bg-fuchsia-100 text-fuchsia-700";
      case "green":
        return "bg-green-100 text-green-700";
      default:
        return `${getColorClasses('bg-indigo-100', 'text-indigo-700')}`;
    }
  };

  return (
    <div>
      {/* 소개 섹션 */}
      <div className={`mb-12 bg-gradient-to-r ${getColorClasses(
        'from-blue-50 to-indigo-50'
      )} p-8 rounded-xl border border-blue-200`}>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Interactive JavaScript
        </h1>
        <p className="text-blue-800 text-lg">
          복잡한 JavaScript 개념과 웹 개발 지식을 인터랙티브 시뮬레이터로 쉽고
          재미있게 학습하세요.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📚 체계적 학습</h3>
            <p className="text-blue-700">Phase별로 단계적 학습 경로 제공</p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🎮 인터랙티브</h3>
            <p className="text-blue-700">시각적 시뮬레이션과 실습</p>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 실무 중심</h3>
            <p className="text-blue-700">현업에서 필요한 핵심 지식</p>
          </div>
        </div>
      </div>

      {/* 학습 경로 */}
      <div className="space-y-12">
        {learningPaths.map((path) => (
          <div key={path.phase}>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className={`bg-gradient-to-r ${getColorClass('from-indigo-500 to-purple-600')} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg`}>
                  {path.phase}
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {path.title}
                </h2>
              </div>
              <p className="text-gray-600 text-lg ml-16">{path.description}</p>
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
                        <h3 className={`text-lg font-semibold text-gray-800 ${getColorClass('group-hover:text-indigo-600')} transition-colors`}>
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
                    <div className={`${getColorClasses(
                      'text-indigo-500',
                      'group-hover:text-indigo-700'
                    )} transition-colors`}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">🔐 보안 & 성능</h4>
              <ul className="space-y-1">
                <li>• 브라우저 보안 정책 (CSP, SOP)</li>
                <li>• 웹 성능 최적화 기법</li>
                <li>• 모던 웹 보안 (XSS, CSRF)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚡ 고급 개념</h4>
              <ul className="space-y-1">
                <li>• JavaScript 엔진 동작 원리</li>
                <li>• 웹 워커 & 서비스 워커</li>
                <li>• WebAssembly 기초</li>
              </ul>
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
          <span className={`px-2 py-1 ${getColorClasses(
            'bg-purple-100',
            'text-purple-700'
          )} rounded`}>
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
