import { DebounceThrottleLanding } from "@/components/debounce-throttle/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="⏱️ JavaScript Debounce & Throttle"
      subtitle="이벤트 호출 빈도 제어 기법을 시각적으로 학습해보세요"
      maxWidth="full"
      showBackButton={true}
    >
      <DebounceThrottleLanding />
    </StudyPageLayout>
  );
}
