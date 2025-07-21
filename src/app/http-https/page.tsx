import { HttpHttpsLanding } from "@/components/http-https/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🔒 HTTP vs HTTPS"
      subtitle="웹 보안의 기초인 HTTP와 HTTPS의 차이점을 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <HttpHttpsLanding />
    </StudyPageLayout>
  );
}