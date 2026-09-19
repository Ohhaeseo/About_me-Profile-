"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Shot } from "@/content/projects";

/**
 * 프로젝트 이미지 갤러리 (design.md 6.3)
 * 메인 뷰어 1장(20:11) + 하단 썸네일 그리드(16:9). R3 구조를 밝은 톤으로 재매핑.
 */
export default function Gallery({
  shots,
  title,
  /** 상세 페이지처럼 갤러리가 화면 위쪽에 올 때만 켠다 (LCP 후보) */
  priorityFirst = false,
}: {
  shots: Shot[];
  title: string;
  priorityFirst?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const panelId = useId();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const select = useCallback(
    (index: number) => {
      const next = (index + shots.length) % shots.length;
      setActive(next);
      tabsRef.current[next]?.focus();
    },
    [shots.length],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(shots.length - 1);
    }
  };

  // 라이트박스 — Esc 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (!zoomed) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % shots.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [zoomed, shots.length]);

  const current = shots[active];

  return (
    <div>
      {/* 메인 뷰어 — aspect 3840/2112, object-contain, 레터박스는 panel-sunk.
          tabpanel은 컨테이너에 두고 확대는 그 안의 button이 맡는다.
          button에 role="tabpanel"을 얹으면 버튼 시맨틱이 사라진다. */}
      <div id={panelId} role="tabpanel" aria-labelledby={`${panelId}-tab-${active}`}>
        <button
          type="button"
          aria-label={`${current.alt} 확대해서 보기`}
          onClick={() => setZoomed(true)}
          className="relative block aspect-[3840/2112] w-full cursor-zoom-in overflow-hidden rounded-card border border-line bg-panel-sunk shadow-frame"
        >
          {shots.map((shot, i) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={i === active ? shot.alt : ""}
              fill
              sizes="(max-width: 1024px) 100vw, 1040px"
              priority={priorityFirst && i === 0}
              loading={priorityFirst && i === 0 ? undefined : "lazy"}
              className={`object-contain transition-opacity duration-[0.2s] ease-quint delay-[0.1s] ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </button>

        {/* 캡션 */}
        <p className="mt-4 text-sm text-text-sub">{current.caption}</p>
      </div>

      {/* 썸네일 스트립 — 뷰어와 28px */}
      <div
        role="tablist"
        aria-label={`${title} 이미지 목록`}
        onKeyDown={onKeyDown}
        className="mt-[28px] grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
      >
        {shots.map((shot, i) => {
          const selected = i === active;
          return (
            <button
              key={shot.src}
              ref={(node) => {
                tabsRef.current[i] = node;
              }}
              id={`${panelId}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              aria-label={shot.caption}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative aspect-video overflow-hidden rounded-[10px] border bg-panel-sunk transition-[opacity,transform,border-color,box-shadow] duration-[var(--motion-base)] ease-default ${
                selected
                  ? "border-accent opacity-100 shadow-[0_0_0_1px_var(--color-accent),0_0_0_4px_var(--color-accent-soft)]"
                  : "border-line opacity-65 hover:-translate-y-0.5 hover:border-line-strong hover:opacity-100"
              }`}
            >
              <Image
                src={shot.src}
                alt=""
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                loading="lazy"
                className="object-cover object-top"
              />
              <span className="absolute left-1.5 top-1.5 rounded bg-panel/85 px-1.5 py-0.5 font-mono text-[10px] text-text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* 라이트박스는 body로 포털한다.
          Reveal의 transform이 스태킹 컨텍스트를 만들어 position:fixed가 뷰포트가 아니라
          그 조상 기준이 되고, z-index도 그 안에 갇힌다. */}
      {zoomed &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-base/95 p-[clamp(20px,5vw,80px)] backdrop-blur-sm"
          >
            <div className="relative min-h-0 w-full flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="shrink-0 text-center text-sm text-text-sub">{current.caption}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setZoomed(false)}
              className="absolute right-6 top-6 rounded-full border border-line bg-panel px-4 py-2 font-mono text-sm text-text-sub shadow-soft transition-colors duration-[var(--motion-fast)] hover:text-ink"
            >
              닫기 ESC
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
