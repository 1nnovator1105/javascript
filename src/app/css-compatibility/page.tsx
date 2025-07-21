import { CssCompatibilityLanding } from "@/components/css-compatibility/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function CssCompatibilityPage() {
  return (
    <StudyPageLayout
      title="🔧 브라우저별 CSS 호환성 해결"
      subtitle="개발자가 자주 마주하는 CSS 호환성 이슈 해결 방법을 체계적으로 학습하세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <CssCompatibilityLanding />
    </StudyPageLayout>
  );
}
