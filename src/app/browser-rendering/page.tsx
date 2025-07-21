import { BrowserRenderingLanding } from "@/components/browser-rendering/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🌐 브라우저 렌더링 과정 시뮬레이터"
      subtitle="HTML과 CSS가 어떻게 화면에 그려지는지, Critical Rendering Path의 모든 단계를 시각적으로 학습하고 성능 최적화 기법을 마스터해보세요."
      maxWidth="full"
      showBackButton={true}
    >
      <BrowserRenderingLanding />
    </StudyPageLayout>
  );
}
