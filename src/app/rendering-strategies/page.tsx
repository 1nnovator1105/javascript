import { RenderingStrategiesLanding } from "@/components/rendering-strategies/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🌐 웹 렌더링 전략 시뮬레이터"
      subtitle="CSR, SSR, ISR, SSG의 차이점과 특징을 시각적으로 학습해보세요"
      maxWidth="full"
      showBackButton={true}
    >
      <RenderingStrategiesLanding />
    </StudyPageLayout>
  );
}
