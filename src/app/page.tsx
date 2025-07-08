import { HomeLanding } from "@/components/home/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🎓 JavaScript 핵심 개념 학습 센터"
      subtitle="JavaScript 핵심 개념을 시각적으로 학습해보세요"
      maxWidth="wide"
    >
      <HomeLanding />
    </StudyPageLayout>
  );
}
