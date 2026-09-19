"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  /** 리스트 자식 스태거용 — design.md 6.5는 자식당 +60ms */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * 스크롤 등장 (design.md 6.5)
 * opacity 0 · translateY(24px) → 0. threshold 0.15, 한 번만 실행.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // 뷰포트보다 큰 블록은 0.15 비율에 영원히 도달하지 못한다. 실제 높이로 낮춰 잡는다.
    const threshold = Math.min(0.15, (window.innerHeight * 0.4) / Math.max(el.offsetHeight, 1));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
