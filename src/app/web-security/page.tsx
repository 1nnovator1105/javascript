import { WebSecurityLanding } from "@/components/web-security/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🛡️ 웹 보안 기초 (XSS & CSRF)"
      subtitle="가장 흔한 웹 취약점의 원리를 이해하고 프론트엔드 관점에서 방어하는 방법을 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <WebSecurityLanding />
    </StudyPageLayout>
  );
}