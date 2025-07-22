import { GitWorkflowLanding } from "@/components/git-workflow/ui";
import { StudyPageLayout } from "@/components/share/ui";

export default function Page() {
  return (
    <StudyPageLayout
      title="📁 Git & GitHub 실무 워크플로우"
      subtitle="혼자 개발할 때와 팀에서 협업할 때 꼭 알아야 할 Git 명령어와 GitHub 사용법을 학습해보세요"
      showBackButton={true}
    >
      <GitWorkflowLanding />
    </StudyPageLayout>
  );
}