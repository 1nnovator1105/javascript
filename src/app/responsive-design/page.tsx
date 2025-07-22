import { ResponsiveDesignLanding } from "@/components/responsive-design/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="📱 반응형 웹 디자인 실전"
      subtitle="미디어 쿼리, 플렉스박스, 그리드를 활용한 반응형 레이아웃을 실습으로 구현합니다"
      maxWidth="full"
      showBackButton={true}
    >
      <ResponsiveDesignLanding />
    </StudyPageLayout>
  );
}