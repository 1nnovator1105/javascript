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
    template: "%s | JavaScript 핵심 개념 학습 센터",
    default: "JavaScript 핵심 개념 학습 센터",
  },
  description:
    "Promise, Closure, Event Loop, Variable, Event Delegation 등 JavaScript 핵심 개념을 시각적 시뮬레이터로 학습할 수 있는 인터랙티브 학습 플랫폼입니다.",
  keywords: [
    "JavaScript",
    "Promise",
    "Closure",
    "Event Loop",
    "Variable",
    "Event Delegation",
    "var",
    "let",
    "const",
    "호이스팅",
    "TDZ",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#4f46e5",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "JS 학습 센터",
    "application-name": "JavaScript 학습 센터",
    "msapplication-TileColor": "#4f46e5",
    "msapplication-config": "none",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://1nnovator-js-study.vercel.app",
    title: "JavaScript 핵심 개념 학습 센터",
    description:
      "Promise, Closure, Event Loop, Variable, Event Delegation 등 JavaScript 핵심 개념을 시각적 시뮬레이터로 학습할 수 있는 인터랙티브 학습 플랫폼입니다.",
    siteName: "JavaScript 핵심 개념 학습 센터",
    images: [
      {
        url: "/images/thumbnail-backup.png",
        width: 1200,
        height: 630,
        alt: "JavaScript 핵심 개념 학습 센터 - 인터랙티브 학습 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript 핵심 개념 학습 센터",
    description:
      "Promise, Closure, Event Loop, Variable 등 JavaScript 핵심 개념을 시각적 시뮬레이터로 학습하세요.",
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
    google: "RZ3SuMznsX4BzS6t_lynVpIwRm1hlumCeBakaCUK1-s",
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
