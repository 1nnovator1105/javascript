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
      </div>
    </main>
  );
};

export { StudyPageLayout };
