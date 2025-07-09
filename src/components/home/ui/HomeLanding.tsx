import Link from "next/link";

const HomeLanding = () => {
  const studyPages = [
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
      title: "🚀 병렬 Promise 응답 순서",
      description:
        "여러 Promise가 병렬로 실행될 때 응답 받는 순서를 시각적으로 학습",
      path: "/parallel-promise",
      difficulty: "초급",
      topics: ["Promise", "비동기 처리", "병렬 실행"],
      icon: "🔄",
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
      title: "🧬 JavaScript Prototype & 상속",
      description: "프로토타입 체인과 상속 메커니즘을 시각적 시뮬레이터로 학습",
      path: "/prototype",
      difficulty: "중급",
      topics: ["Prototype", "상속", "생성자 함수", "클래스", "프로토타입 체인"],
      icon: "🧬",
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
      title: "🌐 웹 렌더링 전략 시뮬레이터",
      description:
        "CSR, SSR, ISR, SSG의 차이점과 특징을 시각적 시뮬레이터로 학습",
      path: "/rendering-strategies",
      difficulty: "중급",
      topics: ["CSR", "SSR", "ISR", "SSG", "렌더링", "성능 최적화"],
      icon: "🌐",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "초급":
        return "bg-green-100 text-green-800 border-green-200";
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
            <h3 className="font-medium mb-2">📚 학습 순서 추천</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>JavaScript 변수 선언 & 호이스팅 (기초)</li>
              <li>병렬 Promise 응답 순서 (기초)</li>
              <li>JavaScript 실행 컨텍스트 (중급)</li>
              <li>JavaScript Scope & Closure (중급)</li>
              <li>JavaScript Prototype & 상속 (중급)</li>
              <li>Event Delegation & 이벤트 위임 (중급)</li>
              <li>JavaScript 이벤트 루프 (심화)</li>
            </ol>
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

      {/* 학습 페이지 카드들 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📖 학습 코스</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studyPages.map((page, index) => (
            <Link
              key={index}
              href={page.path}
              className="group block bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-indigo-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{page.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {page.title}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        page.difficulty
                      )}`}
                    >
                      {page.difficulty}
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
                {page.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {page.topics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 추가 정보 섹션 */}
      <div className="mt-12 bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
        <h3 className="text-lg font-semibold mb-4 text-emerald-800">
          🚀 학습 완료 후
        </h3>
        <div className="text-sm text-emerald-700 space-y-2">
          <p>• 실제 프로젝트에서 비동기 처리 패턴을 적용해보세요</p>
          <p>• 클로저를 활용한 모듈 패턴과 캡슐화를 실습해보세요</p>
          <p>• async/await vs Promise.then() 비교 학습을 진행해보세요</p>
          <p>• 에러 처리(try/catch, .catch())에 대해 학습해보세요</p>
          <p>• 성능 최적화를 위한 JavaScript 패턴들을 탐구해보세요</p>
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
