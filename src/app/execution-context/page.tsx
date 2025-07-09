import { ExecutionContextLanding } from "@/components/execution-context/ui";

export default function ExecutionContextPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ExecutionContextLanding />
      </div>
    </div>
  );
}

export const metadata = {
  title: "JavaScript 실행 컨텍스트 학습",
  description:
    "JavaScript 실행 컨텍스트의 동작 원리를 시각적으로 학습하는 페이지입니다.",
};
