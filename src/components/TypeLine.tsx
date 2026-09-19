"use client";

import { useEffect, useState } from "react";

const START_DELAY = 400; // ms — 진입 애니메이션이 끝난 뒤 (design.md 6.1)
const CHAR_DELAY = 90; // ms — 문자당

/**
 * 히어로 이름 타이핑 (design.md 6.1)
 * - 완성 텍스트를 visibility:hidden으로 깔아 레이아웃 시프트를 막는다.
 * - 지웠다 다시 쓰는 루프는 하지 않는다.
 * - reduced-motion에서는 완성된 텍스트를 즉시 표시한다.
 */
export default function TypeLine({ text, className = "" }: { text: string; className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }

    let next = 0;
    let charTimer: ReturnType<typeof setTimeout> | undefined;

    const startTimer = setTimeout(function tick() {
      next += 1;
      setCount(next);
      if (next < text.length) charTimer = setTimeout(tick, CHAR_DELAY);
    }, START_DELAY);

    return () => {
      clearTimeout(startTimer);
      if (charTimer) clearTimeout(charTimer);
    };
  }, [text]);

  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true" className="relative block whitespace-pre-wrap">
        {/* 자리만 잡는 레이어 — 타이핑 중 높이가 변하지 않는다 */}
        <span className="invisible">{text}</span>
        <span className="absolute inset-0 whitespace-pre-wrap">
          {text.slice(0, count)}
          <span className="ml-[0.06em] inline-block h-[0.78em] w-[0.055em] translate-y-[0.04em] bg-accent align-baseline animate-caret" />
        </span>
      </span>
    </h1>
  );
}
