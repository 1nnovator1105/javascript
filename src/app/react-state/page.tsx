import type { Metadata } from "next";
import { ReactStateLanding } from "@/components/react-state/ui";

export const metadata: Metadata = {
  title: "React 상태 관리 완전 가이드 - JavaScript 학습 센터",
  description:
    "React의 useState, useEffect, useReducer, Context API 등 상태 관리의 모든 것을 초보자도 쉽게 이해할 수 있도록 설명합니다. 단계별 예제와 인터랙티브 데모로 학습하세요.",
  keywords: [
    "React",
    "useState",
    "useEffect", 
    "useReducer",
    "Context API",
    "React Hooks",
    "상태 관리",
    "상태 끌어올리기",
    "리액트 초보자",
    "React 입문"
  ],
  openGraph: {
    title: "React 상태 관리 완전 가이드 | JavaScript 학습 센터",
    description:
      "React의 모든 상태 관리 패턴을 초보자 친화적으로 설명합니다. useState부터 Context API까지 단계별로 학습하세요.",
    type: "website",
    siteName: "JavaScript 학습 센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "React 상태 관리 완전 가이드 | JavaScript 학습 센터",
    description:
      "React의 모든 상태 관리 패턴을 초보자 친화적으로 설명합니다. useState부터 Context API까지 단계별로 학습하세요.",
  },
  alternates: {
    canonical: "/react-state",
  },
};

export default function ReactStatePage() {
  return <ReactStateLanding />;
}