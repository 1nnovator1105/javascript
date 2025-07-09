import { VariableLanding } from "@/components/variable/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="📝 JavaScript 변수 선언, 호이스팅, TDZ"
      subtitle="var, let, const의 차이점과 스코프, 호이스팅, TDZ를 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <VariableLanding />
    </StudyPageLayout>
  );
}
