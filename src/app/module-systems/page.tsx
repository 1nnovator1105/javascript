import type { Metadata } from "next";
import { ModuleSystemsLanding } from "@/components/module-systems/ui";

export const metadata: Metadata = {
  title: "JavaScript 모듈 시스템 - JavaScript 학습 센터",
  description:
    "CommonJS, ES Modules, AMD의 차이점과 번들러가 처리하는 과정을 시각화로 학습합니다. import/export, require, 동적 import, 순환 참조 등을 이해해보세요.",
  keywords: [
    "JavaScript 모듈",
    "ES Modules",
    "CommonJS",
    "AMD",
    "import export",
    "require",
    "동적 import",
    "순환 참조",
    "번들러",
  ],
  openGraph: {
    title: "JavaScript 모듈 시스템 | JavaScript 학습 센터",
    description:
      "CommonJS, ES Modules, AMD의 차이점과 번들러가 처리하는 과정을 시각화로 학습합니다",
    type: "website",
    siteName: "JavaScript 학습 센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript 모듈 시스템 | JavaScript 학습 센터",
    description:
      "CommonJS, ES Modules, AMD의 차이점과 번들러가 처리하는 과정을 시각화로 학습합니다",
  },
  alternates: {
    canonical: "/module-systems",
  },
};

export default function ModuleSystemsPage() {
  return <ModuleSystemsLanding />;
}