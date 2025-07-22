import type { Metadata } from "next";
import { WebSecurityBasicsLanding } from "@/components/web-security-basics/ui";

export const metadata: Metadata = {
  title: "웹 보안 기초 (XSS, CSRF) - JavaScript 학습 센터",
  description:
    "웹 애플리케이션의 주요 보안 취약점과 방어 방법을 시뮬레이션으로 학습합니다. XSS 공격, CSRF 토큰, Content Security Policy 등을 이해해보세요.",
  keywords: [
    "웹 보안",
    "XSS",
    "CSRF",
    "Cross Site Scripting",
    "Cross Site Request Forgery",
    "Content Security Policy",
    "보안 헤더",
    "웹 취약점",
  ],
  openGraph: {
    title: "웹 보안 기초 (XSS, CSRF) | JavaScript 학습 센터",
    description:
      "웹 애플리케이션의 주요 보안 취약점과 방어 방법을 시뮬레이션으로 학습합니다",
    type: "website",
    siteName: "JavaScript 학습 센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "웹 보안 기초 (XSS, CSRF) | JavaScript 학습 센터",
    description:
      "웹 애플리케이션의 주요 보안 취약점과 방어 방법을 시뮬레이션으로 학습합니다",
  },
  alternates: {
    canonical: "/web-security-basics",
  },
};

export default function WebSecurityBasicsPage() {
  return <WebSecurityBasicsLanding />;
}