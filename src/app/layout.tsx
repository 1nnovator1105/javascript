import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 인터랙티브 웹 개발 학습 센터",
    default: "인터랙티브 웹 개발 학습 센터 - JavaScript, React, 웹 기초부터 심화까지",
  },
  description:
    "JavaScript, React, HTTP, 웹 성능, 브라우저 렌더링 등 웹 개발의 모든 것을 인터랙티브 시뮬레이터로 학습하세요. 초급부터 중급까지 체계적인 단계별 학습 경로를 제공합니다.",
  keywords: [
    "웹 개발 학습",
    "JavaScript 튜토리얼",
    "React 학습",
    "인터랙티브 시뮬레이터",
    "웹 개발 교육",
    "프론트엔드 개발",
    "JavaScript",
    "React",
    "HTTP",
    "HTTPS",
    "CORS",
    "RESTful API",
    "GraphQL",
    "Promise",
    "async await",
    "Closure",
    "Event Loop",
    "Prototype",
    "Virtual DOM",
    "브라우저 렌더링",
    "웹 성능 최적화",
    "SSR",
    "CSR",
    "메모리 관리",
    "실행 컨텍스트",
    "Event Delegation",
    "this 바인딩",
    "모듈 시스템",
    "웹 스토리지",
    "브라우저 캐싱",
    "반응형 디자인",
    "Git 워크플로우",
    "프론트엔드 테스팅",
    "TypeScript",
    "Next.js",
    "웹 개발 기초",
    "프로그래밍 학습",
    "코딩 교육",
    "개발자 교육",
  ],
  authors: [{ name: "1nnovator1105", url: "https://1nnovator.tistory.com/" }],
  creator: "1nnovator1105",
  publisher: "1nnovator1105",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://javascript-study.luvlog.xyz"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#4f46e5",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "웹 개발 학습 센터",
    "application-name": "인터랙티브 웹 개발 학습 센터",
    "msapplication-TileColor": "#4f46e5",
    "msapplication-config": "none",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://javascript-study.luvlog.xyz",
    title: "인터랙티브 웹 개발 학습 센터 - JavaScript, React, 웹 기초부터 심화까지",
    description:
      "JavaScript, React, HTTP, 웹 성능, 브라우저 렌더링 등 웹 개발의 모든 것을 인터랙티브 시뮬레이터로 학습하세요. 체계적 커리큘럼으로 초급부터 중급까지!",
    siteName: "인터랙티브 웹 개발 학습 센터",
    images: [
      {
        url: "/images/thumbnail-backup.png",
        width: 1200,
        height: 630,
        alt: "인터랙티브 웹 개발 학습 센터 - JavaScript, React, 웹 개발 종합 교육 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "인터랙티브 웹 개발 학습 센터 - JavaScript, React, 웹 개발 완전 정복",
    description:
      "인터랙티브 시뮬레이터로 JavaScript, React, HTTP, 웹 성능 등 웹 개발의 모든 것을 학습하세요!",
    images: ["/images/thumbnail-backup.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "r3pARpzL2q29WgHpdcNCLHMjNrhuOsrSHb9e4b0jgKg",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
