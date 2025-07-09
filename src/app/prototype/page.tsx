import { PrototypeLanding } from "@/components/prototype/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🧬 JavaScript Prototype & 상속"
      subtitle="프로토타입 체인과 상속 메커니즘을 시각적 시뮬레이터로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <PrototypeLanding />
    </StudyPageLayout>
  );
}
