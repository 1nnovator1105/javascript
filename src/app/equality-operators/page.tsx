import { EqualityOperatorsLanding } from "@/components/equality-operators/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="⚖️ JavaScript 동등 연산자 (== vs ===)"
      subtitle="동등 연산자와 일치 연산자의 차이점을 시각적으로 학습하고 실습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <EqualityOperatorsLanding />
    </StudyPageLayout>
  );
}
