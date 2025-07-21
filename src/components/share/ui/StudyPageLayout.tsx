import React from "react";
import Link from "next/link";

interface StudyPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  maxWidth?: "normal" | "wide" | "full";
  showBackButton?: boolean;
}

const StudyPageLayout: React.FC<StudyPageLayoutProps> = ({
  title,
  subtitle,
  children,
  maxWidth = "normal",
  showBackButton = false,
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "wide":
        return "max-w-6xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-4xl";
    }
  };

  return (
    <main className="font-sans min-h-screen mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-6 max-w-full">
      <div
        className={`bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl md:rounded-2xl p-5 md:p-8 ${getMaxWidthClass()} mx-auto`}
      >
        {/* 네비게이션 섹션 */}
        {showBackButton && (
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              학습 센터로 돌아가기
            </Link>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl md:text-3xl">
            {title}
          </h1>
          <p className="text-gray-500 font-normal m-0 text-sm md:text-base">
            {subtitle}
          </p>
        </div>

        {children}

        {/* 개발자 정보 섹션 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🧑‍💻</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    1nnovator 김민성
                  </p>
                  <p className="text-xs text-gray-600">
                    JavaScript 학습 센터 개발자
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <a
                href="https://1nnovator.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-indigo-600 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.248-2.174 4.168-.851.613-1.849.613-2.174.613-.325 0-1.323 0-2.174-.613-1.278-.92-2.005-2.31-2.174-4.168-.085-.937-.085-1.383 0-2.32.169-1.858.896-3.248 2.174-4.168.851-.613 1.849.613 2.174.613.325 0 1.323 0 2.174.613 1.278.92 2.005 2.31 2.174 4.168.085.937.085 1.383 0 2.32z" />
                </svg>
                기술 블로그
              </a>
              <span className="text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                Interactive JavaScript Learning Platform
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              🌟 이 프로젝트가 도움이 되셨다면 블로그에서 더 많은 개발 이야기를
              확인해보세요!
            </p>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <span>🤖</span>
                <span>이 페이지는 생성형 AI의 도움을 받아 제작되었습니다.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export { StudyPageLayout };
