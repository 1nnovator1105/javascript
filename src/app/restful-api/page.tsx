import { RestfulApiLanding } from "@/components/restful-api/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🔄 RESTful API 설계 원칙"
      subtitle="REST 아키텍처 스타일과 API 설계 모범 사례를 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <RestfulApiLanding />
    </StudyPageLayout>
  );
}