"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectDocument } from "@/content/projects";

/**
 * 문서 뷰어 — PDF를 쪽별 이미지로 풀어 틀 안에서 세로 스크롤한다.
 * 브라우저 내장 PDF 뷰어는 모바일에서 인라인 렌더가 안 되는 경우가 많아 이미지로 싣고,
 * 원본 PDF는 툴바의 링크로 연다.
 */
export default function PdfViewer({ doc }: { doc: ProjectDocument }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const total = doc.pages.length;
  // 가로 슬라이드는 세로 문서보다 넓게 잡아야 글자가 읽힌다
  const landscape = doc.width > doc.height;

  // 틀의 세로 중앙을 지나는 쪽을 현재 쪽으로 본다
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = frame.scrollTop + frame.clientHeight / 2;
      let index = 0;
      pageRefs.current.forEach((el, i) => {
        if (el && el.offsetTop <= mid) index = i;
      });
      setCurrent(index);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    frame.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      frame.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const frame = frameRef.current;
    const el = pageRefs.current[index];
    if (!frame || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    frame.scrollTo({ top: el.offsetTop - 16, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const buttonClass =
    "rounded-full border border-line bg-panel px-3 py-1.5 text-[13px] text-text-sub transition-colors duration-[var(--motion-fast)] ease-default hover:border-accent/40 hover:text-accent disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="overflow-hidden rounded-card border border-line bg-panel shadow-soft">
      {/* 툴바 */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-line px-4 py-3 sm:px-5">
        <p className="hidden min-w-0 truncate font-mono text-[12px] text-text-faint sm:block">
          {doc.filename}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="이전 쪽"
            className={buttonClass}
          >
            <span aria-hidden="true">↑</span>
          </button>
          <p className="min-w-[52px] text-center font-mono text-[13px] tabular-nums text-ink" aria-live="polite">
            {current + 1} / {total}
          </p>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            aria-label="다음 쪽"
            className={buttonClass}
          >
            <span aria-hidden="true">↓</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a href={doc.file} target="_blank" rel="noreferrer" className={buttonClass}>
            원본 PDF 열기
          </a>
          <a href={doc.file} download className={buttonClass}>
            내려받기
          </a>
        </div>
      </div>

      {/* 스크롤 틀 — 키보드로도 스크롤되도록 포커스를 받는다 */}
      <div
        ref={frameRef}
        tabIndex={0}
        role="region"
        aria-label={`${doc.title} 문서, 총 ${total}쪽`}
        className="relative h-[min(80svh,900px)] overflow-y-auto bg-panel-sunk px-3 py-4 sm:px-6 sm:py-6"
      >
        <ol
          className={`mx-auto flex flex-col gap-4 sm:gap-6 ${landscape ? "max-w-[1040px]" : "max-w-[820px]"}`}
        >
          {doc.pages.map((page, i) => (
            <li
              key={page.src}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              className="overflow-hidden rounded border border-line shadow-soft"
            >
              <Image
                src={page.src}
                alt={page.alt}
                width={doc.width}
                height={doc.height}
                sizes={landscape ? "(max-width: 1100px) 92vw, 1040px" : "(max-width: 900px) 92vw, 820px"}
                loading="lazy"
                className="block h-auto w-full"
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
