import Link from "next/link";
import { StudyPageLayout } from "@/components/share/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - 페이지를 찾을 수 없습니다",
  description:
    "요청하신 페이지를 찾을 수 없습니다. JavaScript 학습 센터의 다른 주제들을 확인해보세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <StudyPageLayout
      title="🚨 404 Error"
      subtitle="요청하신 페이지를 찾을 수 없습니다"
      maxWidth="wide"
    >
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* JavaScript 에러 메시지 */}
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-left mb-8 max-w-2xl mx-auto">
            <div className="text-red-400 mb-2">❌ ReferenceError:</div>
            <div className="text-yellow-300 mb-2"> Page is not defined</div>
            <div className="text-gray-400 mb-4">
              {" "}
              at Location.pathname (browser:1:1)
            </div>
            <div className="text-blue-400 mb-2">💡 Suggestion:</div>
            <div className="text-gray-300">
              {" "}
              Try navigating to an existing page or go back to home
            </div>
          </div>

          {/* 메인 메시지 */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-2">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                undefined
              </span>
              를 찾을 수 없습니다!
            </p>
            <p className="text-gray-500 mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
          </div>

          {/* 홈으로 돌아가기 버튼 */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              🏠 홈으로 돌아가기
            </Link>
          </div>

          {/* 인기 학습 주제들 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              🎯 인기 학습 주제들
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {/* Variable 카드 */}
              <Link
                href="/variable"
                className="group p-4 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">📝</div>
                <div className="font-semibold text-purple-800 mb-1">
                  Variable
                </div>
                <div className="text-sm text-gray-600">
                  var, let, const 완전 정복
                </div>
              </Link>

              {/* Promise 카드 */}
              <Link
                href="/parallel-promise"
                className="group p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-semibold text-blue-800 mb-1">Promise</div>
                <div className="text-sm text-gray-600">비동기 처리 마스터</div>
              </Link>

              {/* Closure 카드 */}
              <Link
                href="/closure"
                className="group p-4 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-semibold text-green-800 mb-1">Closure</div>
                <div className="text-sm text-gray-600">스코프와 클로저</div>
              </Link>

              {/* Event Loop 카드 */}
              <Link
                href="/event-loop"
                className="group p-4 bg-white rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-semibold text-orange-800 mb-1">
                  Event Loop
                </div>
                <div className="text-sm text-gray-600">이벤트 루프 원리</div>
              </Link>

              {/* Event Delegation 카드 */}
              <Link
                href="/event-delegation"
                className="group p-4 bg-white rounded-lg border-2 border-red-200 hover:border-red-400 transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-red-800 mb-1">
                  Event Delegation
                </div>
                <div className="text-sm text-gray-600">이벤트 위임 패턴</div>
              </Link>

              {/* Prototype 카드 */}
              <Link
                href="/prototype"
                className="group p-4 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">🧬</div>
                <div className="font-semibold text-purple-800 mb-1">
                  Prototype
                </div>
                <div className="text-sm text-gray-600">프로토타입 상속</div>
              </Link>

              {/* 더 많은 주제 (예약) */}
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold text-gray-500 mb-1">
                  더 많은 주제
                </div>
                <div className="text-sm text-gray-400">곧 추가될 예정</div>
              </div>
            </div>
          </div>

          {/* 도움말 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-800 mb-2">
              🤔 도움이 필요하신가요?
            </h3>
            <p className="text-blue-700 text-sm">
              JavaScript 학습 과정에서 궁금한 점이 있으시면 언제든지
              질문해주세요! 각 주제별로 인터랙티브 시뮬레이터와 실습 예제를
              제공하고 있습니다.
            </p>
          </div>

          {/* 재미있는 JavaScript 팁 */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <div className="text-yellow-800 font-semibold mb-2">
              💡 JavaScript 팁
            </div>
            <div className="text-yellow-700 text-sm font-mono">
              {`typeof null === "object" // true (JavaScript의 유명한 버그!)`}
            </div>
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
}
