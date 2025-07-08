import { EventDelegationLanding } from "@/components/event-delegation/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🎯 JavaScript Event Delegation 시뮬레이터"
      subtitle="이벤트 위임을 통한 효율적인 이벤트 처리를 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <EventDelegationLanding />
    </StudyPageLayout>
  );
}
