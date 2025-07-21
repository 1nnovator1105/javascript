import { WebStorageLanding } from "@/components/web-storage/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="💾 웹 스토리지 완벽 가이드"
      subtitle="LocalStorage, SessionStorage, Cookie, IndexedDB의 차이점과 활용법을 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <WebStorageLanding />
    </StudyPageLayout>
  );
}