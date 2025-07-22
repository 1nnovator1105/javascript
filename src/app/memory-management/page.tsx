import type { Metadata } from "next";
import { MemoryManagementLanding } from "@/components/memory-management/ui";

export const metadata: Metadata = {
  title: "JavaScript 메모리 관리 - JavaScript 학습 센터",
  description:
    "가비지 컬렉션, 메모리 누수, WeakMap/WeakSet의 동작을 시각적으로 학습합니다. 힙/스택 메모리 구조와 효율적인 메모리 관리 방법을 이해해보세요.",
  keywords: [
    "JavaScript 메모리",
    "가비지 컬렉션",
    "메모리 누수",
    "힙 메모리",
    "스택 메모리",
    "WeakMap",
    "WeakSet",
    "메모리 관리",
  ],
  openGraph: {
    title: "JavaScript 메모리 관리 | JavaScript 학습 센터",
    description:
      "가비지 컬렉션, 메모리 누수, WeakMap/WeakSet의 동작을 시각적으로 학습합니다",
    type: "website",
    siteName: "JavaScript 학습 센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript 메모리 관리 | JavaScript 학습 센터",
    description:
      "가비지 컬렉션, 메모리 누수, WeakMap/WeakSet의 동작을 시각적으로 학습합니다",
  },
  alternates: {
    canonical: "/memory-management",
  },
};

export default function MemoryManagementPage() {
  return <MemoryManagementLanding />;
}