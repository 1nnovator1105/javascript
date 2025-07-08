import { EventLoopLanding } from "@/components/event-loop/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🧱 JavaScript 이벤트 루프 시뮬레이터"
      subtitle="비동기 처리 순서를 시각적으로 학습해보세요"
      maxWidth="full"
      showBackButton={true}
    >
      <EventLoopLanding />
    </StudyPageLayout>
  );
}
