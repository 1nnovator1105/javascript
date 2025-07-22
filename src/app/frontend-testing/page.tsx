import { FrontendTestingLanding } from "@/components/frontend-testing/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🧪 프론트엔드 테스팅 입문"
      subtitle="Jest와 React Testing Library를 활용한 컴포넌트 테스트 작성법을 학습합니다"
      maxWidth="wide"
      showBackButton={true}
    >
      <FrontendTestingLanding />
    </StudyPageLayout>
  );
}