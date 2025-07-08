import { ClosureLanding } from "@/components/closure/ui/ClosureLanding";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🔍 JavaScript Scope & Closure 시뮬레이터"
      subtitle="클로저와 스코프 체인을 통해 변수 캡처 메커니즘을 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <ClosureLanding />
    </StudyPageLayout>
  );
}
