import { ArrayMethodsLanding } from "@/components/array-methods/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🎯 JavaScript 배열 메서드 완전 정복"
      subtitle="map, filter, reduce부터 최신 메서드까지 배열 조작의 모든 것을 실습으로 학습해보세요"
      showBackButton={true}
    >
      <ArrayMethodsLanding />
    </StudyPageLayout>
  );
}