"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/profile";

/**
 * 하단 중앙 플로팅 네비 (design.md 6.4)
 * 활성 섹션은 IntersectionObserver로 감지. 모바일에서는 숨긴다.
 */
export default function FloatingNav() {
  const [active, setActive] = useState<string>(nav[0].id);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // 한 섹션이 여러 패널로 쪼개진 경우(프로젝트별 화면) 어디에 속하는지 표시해 둔다
    const grouped = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-section]"),
    );

    const targets = [...sections, ...grouped];
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;

    // 뷰포트 중앙을 지나는 섹션을 활성으로 본다
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          setActive(el.dataset.navSection ?? el.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach((target) => io.observe(target));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="섹션 바로가기"
      className="fixed left-1/2 z-50 hidden -translate-x-1/2 md:block"
      style={{ bottom: "calc(24px + env(safe-area-inset-bottom))" }}
    >
      <ul className="flex items-center gap-1 rounded-full border border-line bg-panel/85 p-1.5 shadow-nav backdrop-blur-[8px]">
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block rounded-full px-4 py-2 font-mono text-sm transition-colors duration-[var(--motion-fast)] ${
                  isActive
                    ? "bg-accent-soft text-accent-deep"
                    : "text-text-sub hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
