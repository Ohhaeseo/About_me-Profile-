"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * 라이트/다크 토글 (design.md 2.1)
 * 기본은 시스템 설정, 사용자가 고르면 그 선택이 이기고 localStorage에 남는다.
 * 첫 페인트 전 적용은 layout.tsx의 인라인 스크립트가 담당한다.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setTheme(stored === "dark" || stored === "light" ? stored : systemTheme());
  }, []);

  // 저장된 선택이 없으면 시스템 설정 변화를 계속 따라간다
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 프라이빗 모드 등 저장이 막힌 경우 — 이번 세션에만 적용된다
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "라이트 모드" : "다크 모드"}
      className="fixed right-[clamp(16px,4vw,32px)] top-[clamp(16px,4vw,32px)] z-50 flex size-11 items-center justify-center rounded-full border border-line bg-panel/85 text-text-sub shadow-nav backdrop-blur-[8px] transition-[color,border-color,transform] duration-[var(--motion-base)] ease-default hover:-translate-y-0.5 hover:border-line-strong hover:text-ink"
    >
      {/* 마운트 전에는 아이콘을 비워 서버/클라이언트 불일치를 피한다 */}
      <span aria-hidden="true" className="text-[17px] leading-none">
        {theme === null ? "" : isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}
