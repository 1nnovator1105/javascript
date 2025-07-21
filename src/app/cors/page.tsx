import { CorsLanding } from "@/components/cors/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🌐 CORS (Cross-Origin Resource Sharing)"
      subtitle="브라우저의 보안 정책과 CORS 동작 원리를 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <CorsLanding />
    </StudyPageLayout>
  );
}