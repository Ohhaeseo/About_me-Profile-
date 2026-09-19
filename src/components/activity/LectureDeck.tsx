"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** 덱은 viewport width=1280 기준으로 만들어졌다 — 그 크기로 그린 뒤 틀 폭에 맞춰 축소한다 */
const DECK_W = 1280;
const DECK_H = 720;

/**
 * 강의안 뷰어 — 단일 HTML 덱을 iframe으로 싣는다.
 * 파일이 수 MB라서 열기를 누르기 전에는 받지 않는다.
 */
export default function LectureDeck({
  file,
  cover,
  title,
  slides,
}: {
  file: string;
  cover: string;
  title: string;
  slides: number;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DECK_W);
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const buttonClass =
    "rounded-full border border-line bg-panel px-3 py-1.5 text-[13px] text-text-sub transition-colors duration-[var(--motion-fast)] ease-default hover:border-accent/40 hover:text-accent";

  return (
    <div className="overflow-hidden rounded-card border border-line bg-panel shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3 sm:px-5">
        <p className="font-mono text-[12px] text-text-faint">{slides} slides</p>
        <div className="flex items-center gap-2">
          {open ? (
            <button
              type="button"
              onClick={() => frameRef.current?.requestFullscreen?.()}
              className={buttonClass}
            >
              전체 화면
            </button>
          ) : null}
          <a href={file} target="_blank" rel="noreferrer" className={buttonClass}>
            새 탭에서 열기
          </a>
        </div>
      </div>

      <div ref={stageRef} className="relative aspect-video w-full overflow-hidden bg-panel-sunk">
        {open ? (
          <iframe
            ref={frameRef}
            src={file}
            title={`${title} 강의안`}
            allow="fullscreen"
            loading="lazy"
            className="absolute left-0 top-0 origin-top-left border-0"
            style={{ width: DECK_W, height: DECK_H, transform: `scale(${scale})` }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
          >
            {/* 표지를 깔고 그 위를 패널색으로 덮어 버튼이 읽히게 한다 */}
            <Image
              src={cover}
              alt=""
              fill
              sizes="(max-width: 1100px) 92vw, 1040px"
              loading="lazy"
              className="object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-panel/70" />
            <span className="relative rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors duration-[var(--motion-base)] ease-default group-hover:bg-accent-hover">
              강의안 열기
            </span>
            <span className="relative max-w-[44ch] text-[13px] font-semibold text-ink">
              열린 뒤에는 화면을 한 번 누르고 좌우 방향키나 스페이스로 넘깁니다.
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
