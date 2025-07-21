import { AuthMethodsLanding } from "@/components/auth-methods/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🔐 인증 방식 비교"
      subtitle="Cookie, Session, JWT의 차이점과 각각의 장단점을 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <AuthMethodsLanding />
    </StudyPageLayout>
  );
}