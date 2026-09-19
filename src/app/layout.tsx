import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import TransitionProvider from "@/components/project/TransitionProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/content/profile";
import "./globals.css";

/* 디스플레이 — 영문 대문자 라벨·섹션 타이틀 (design.md 3.1) */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

/* 모노 — 수치·연도·기술 태그·인덱스 번호 */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  // 공유 미리보기(og:image)와 canonical이 절대 주소로 풀리려면 기준 주소가 있어야 한다
  metadataBase: new URL(profile.siteUrl),
  alternates: { canonical: "/" },
  title: `${profile.name} · ${profile.role}`,
  description: profile.intro,
  keywords: ["백엔드", "Spring Boot", "FastAPI", "AI", "포트폴리오", profile.name],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: `${profile.name} · ${profile.role}`,
    description: profile.intro,
    siteName: `${profile.nameEn} Portfolio`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F7F9" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1117" },
  ],
};

/** 첫 페인트 전에 저장된 테마를 적용한다. 없으면 CSS의 시스템 설정 분기가 맡는다. */
const noFlashTheme = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // 인라인 테마 스크립트가 하이드레이션 전에 data-theme을 심으므로
    // html 속성 불일치 경고는 의도된 것이다.
    <html
      lang="ko"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-no-flash" strategy="beforeInteractive">
          {noFlashTheme}
        </Script>
        {/* JS가 없으면 스크롤 등장 요소가 영영 숨는다 */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <TransitionProvider>{children}</TransitionProvider>
        <ThemeToggle />
      </body>
    </html>
  );
}
