import { WebPerformanceLanding } from "@/components/web-performance/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="⚡ 웹 성능 측정과 개선"
      subtitle="Lighthouse, Web Vitals를 활용한 성능 측정과 실제 개선 방법을 학습합니다"
      maxWidth="wide"
      showBackButton={true}
    >
      <WebPerformanceLanding />
    </StudyPageLayout>
  );
}