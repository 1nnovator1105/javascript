import { StudyPageLayout } from "@/components/share/ui";
import { VirtualDomLanding } from "@/components/virtual-dom/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="⚛️ React Virtual DOM 시뮬레이터"
      subtitle="Virtual DOM의 작동 원리와 성능 최적화를 시각적으로 학습해보세요"
      maxWidth="full"
      showBackButton={true}
    >
      <VirtualDomLanding />
    </StudyPageLayout>
  );
}
