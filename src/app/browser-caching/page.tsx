import type { Metadata } from "next";
import { BrowserCachingLanding } from "@/components/browser-caching/ui";

export const metadata: Metadata = {
  title: "브라우저 캐싱 전략 - JavaScript 학습 센터",
  description:
    "HTTP 캐싱, 브라우저 캐시, CDN 캐싱의 작동 원리를 시각적으로 학습합니다. Cache-Control, ETag, Service Worker Cache 등을 인터랙티브 시뮬레이터로 이해해보세요.",
  keywords: [
    "브라우저 캐싱",
    "HTTP 캐싱",
    "Cache-Control",
    "ETag",
    "CDN",
    "Service Worker",
    "웹 성능",
    "캐시 전략",
  ],
  openGraph: {
    title: "브라우저 캐싱 전략 | JavaScript 학습 센터",
    description:
      "HTTP 캐싱, 브라우저 캐시, CDN 캐싱의 작동 원리를 시각적으로 학습하고 성능을 최적화합니다",
    type: "website",
    siteName: "JavaScript 학습 센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "브라우저 캐싱 전략 | JavaScript 학습 센터",
    description:
      "HTTP 캐싱, 브라우저 캐시, CDN 캐싱의 작동 원리를 시각적으로 학습하고 성능을 최적화합니다",
  },
  alternates: {
    canonical: "/browser-caching",
  },
};

export default function BrowserCachingPage() {
  return <BrowserCachingLanding />;
}