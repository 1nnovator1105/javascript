import { ErrorHandlingLanding } from "@/components/error-handling/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🐛 에러 핸들링 & 고급 디버깅"
      subtitle="JavaScript 에러 처리와 디버깅 기법을 시각적으로 학습하고 실습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <ErrorHandlingLanding />
    </StudyPageLayout>
  );
}