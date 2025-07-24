import React from "react";
import Link from "next/link";
import { getColorClass, getColorClasses } from "@/utils/colorMigration";

/**
 * StudyPageLayout 컴포넌트의 안전한 색상 마이그레이션 예시
 * 
 * 이 파일은 실제 구현 전 테스트용 예시입니다.
 * 색상 마이그레이션이 어떻게 작동하는지 보여줍니다.
 */

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
    <main className={`font-sans min-h-screen mx-auto bg-gradient-to-br ${getColorClass('from-indigo-500 to-purple-600')} p-4 md:p-6 max-w-full`}>
      <div
        className={`bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl md:rounded-2xl p-5 md:p-8 ${getMaxWidthClass()} mx-auto`}
      >
        {/* 네비게이션 섹션 */}
        {showBackButton && (
          <div className="mb-6">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium ${getColorClasses(
                'text-indigo-600',
                'bg-indigo-50',
                'hover:bg-indigo-100',
                'border-indigo-200',
                'hover:border-indigo-300'
              )} border rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
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
              홈으로 돌아가기
            </Link>
          </div>
        )}

        {/* 헤더 섹션 */}
        <div className="mb-8 text-center">
          <h1 className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${getColorClass('from-indigo-500 to-purple-600')} bg-clip-text text-transparent`}>
            {title}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="space-y-6">{children}</div>
      </div>
    </main>
  );
};

export default StudyPageLayout;

/**
 * 마이그레이션 전략:
 * 
 * 1. colorMigration 유틸리티 임포트
 * 2. 하드코딩된 색상 클래스를 getColorClass() 함수로 래핑
 * 3. 여러 색상이 있는 경우 getColorClasses() 사용
 * 4. 조건부 색상은 getConditionalColorClass() 사용
 * 
 * 장점:
 * - 환경 변수로 즉시 전환 가능
 * - 타입 안전성 보장
 * - 빌드 에러 없음
 * - 점진적 마이그레이션 가능
 * 
 * 테스트:
 * 1. NEXT_PUBLIC_COLOR_SCHEME=legacy (기본값)로 기존 색상 유지
 * 2. NEXT_PUBLIC_COLOR_SCHEME=modern으로 새 색상 적용
 * 3. 각 모드에서 yarn lint, yarn build 성공 확인
 */