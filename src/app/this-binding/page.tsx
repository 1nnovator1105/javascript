import type { Metadata } from "next";
import { ThisBindingLanding } from "@/components/this-binding/ui";

export const metadata: Metadata = {
  title: "JavaScript this 바인딩의 모든 것 - JavaScript 학습 센터",
  description:
    "JavaScript의 this 키워드가 결정되는 4가지 규칙을 인터랙티브 예제로 완벽하게 학습합니다. 암시적 바인딩, 명시적 바인딩, new 바인딩, 화살표 함수에서의 this를 이해해보세요.",
  keywords: [
    "JavaScript this",
    "this 바인딩",
    "암시적 바인딩",
    "명시적 바인딩",
    "new 바인딩",
    "화살표 함수",
    "call apply bind",
    "JavaScript 컨텍스트",
  ],
  openGraph: {
    title: "JavaScript this 바인딩의 모든 것 | JavaScript 학습 센터",
    description:
      "JavaScript의 this 키워드가 결정되는 4가지 규칙을 인터랙티브 예제로 완벽하게 학습합니다",
    type: "website",
    siteName: "JavaScript 학습 센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript this 바인딩의 모든 것 | JavaScript 학습 센터",
    description:
      "JavaScript의 this 키워드가 결정되는 4가지 규칙을 인터랙티브 예제로 완벽하게 학습합니다",
  },
  alternates: {
    canonical: "/this-binding",
  },
};

export default function ThisBindingPage() {
  return <ThisBindingLanding />;
}