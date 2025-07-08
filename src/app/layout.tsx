import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    template: "%s | JavaScript 핵심 개념 학습 센터",
    default: "JavaScript 핵심 개념 학습 센터",
  },
  description:
    "Promise, Closure, Event Loop 등 JavaScript 핵심 개념을 시각적 시뮬레이터로 학습할 수 있는 인터랙티브 학습 플랫폼입니다.",
  keywords: [
    "JavaScript",
    "Promise",
    "Closure",
    "Event Loop",
    "비동기",
    "학습",
    "시뮬레이터",
    "프로그래밍",
  ],
  authors: [{ name: "JavaScript 학습 센터" }],
  creator: "JavaScript 학습 센터",
  publisher: "JavaScript 학습 센터",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://1nnovator-js-study.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://1nnovator-js-study.vercel.app",
    title: "JavaScript 핵심 개념 학습 센터",
    description:
      "Promise, Closure, Event Loop 등 JavaScript 핵심 개념을 시각적 시뮬레이터로 학습할 수 있는 인터랙티브 학습 플랫폼입니다.",
    siteName: "JavaScript 핵심 개념 학습 센터",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "JavaScript 핵심 개념 학습 센터",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript 핵심 개념 학습 센터",
    description:
      "Promise, Closure, Event Loop 등 JavaScript 핵심 개념을 시각적 시뮬레이터로 학습하세요.",
    images: ["/images/thumbnail.png"],
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
    google: "google-site-verification-code",
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
      </body>
    </html>
  );
}
