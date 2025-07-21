import { WebSocketHttpLanding } from "@/components/websocket-http/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="🔌 웹소켓 vs HTTP 통신"
      subtitle="실시간 양방향 통신과 단방향 요청-응답의 차이를 시각적으로 학습해보세요"
      maxWidth="wide"
      showBackButton={true}
    >
      <WebSocketHttpLanding />
    </StudyPageLayout>
  );
}