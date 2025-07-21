import { SyncAsyncLanding } from "@/components/sync-async/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="⏱️ 동기 vs 비동기 프로그래밍"
      subtitle="JavaScript의 핵심인 동기/비동기 처리 방식을 시각적 타임라인으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <SyncAsyncLanding />
    </StudyPageLayout>
  );
}