import { ParallelPromiseLanding } from "@/components/promise/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🚀 Promise 응답 순서 시뮬레이터"
      subtitle="병렬 Promise에서 응답 받는 순서를 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <ParallelPromiseLanding />
    </StudyPageLayout>
  );
}
