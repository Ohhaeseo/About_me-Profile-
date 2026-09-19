"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { profile } from "@/content/profile";

/** 기울기 상한 — 명함이 손에 들린 정도까지만 */
const MAX_TILT = 11;

/**
 * 3D 명함.
 * 커서 위치에 따라 기울고, 같은 좌표를 따라 광택이 흐른다.
 *
 * design.md 6.2의 미세 모션 상한(scale 1.02 / rotate 1deg)을 넘는 유일한 요소다.
 * 이 섹션이 "명함"이라는 성격을 갖도록 의도적으로 예외를 뒀다.
 * 포인터가 없는 환경(터치·키보드)에서는 기울기 없이 정지 상태로 보인다.
 */
export default function BusinessCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width; // 0~1
    const py = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - py) * MAX_TILT * 2,
      y: (px - 0.5) * MAX_TILT * 2,
    });
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, on: false }));
  };

  const style = {
    "--tilt-x": `${tilt.x}deg`,
    "--tilt-y": `${tilt.y}deg`,
    "--glare-x": `${glare.x}%`,
    "--glare-y": `${glare.y}%`,
  } as CSSProperties;

  return (
    <div className="card-arrive [perspective:1400px]" style={style}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="group relative mx-auto aspect-[91/55] w-full max-w-[560px] overflow-hidden rounded-[18px] border border-line bg-panel shadow-frame transition-[transform,box-shadow] duration-[var(--motion-base)] ease-default [transform:rotateX(var(--tilt-x))_rotateY(var(--tilt-y))] [transform-style:preserve-3d] hover:shadow-[0_40px_80px_-24px_color-mix(in_oklab,var(--color-ink)_45%,transparent)]"
      >
        {/* 액센트 띠 */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[10px] bg-accent"
        />

        {/* 광택 — 커서를 따라 흐른다 */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--motion-base)] group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--glare-x) var(--glare-y), color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 60%)",
          }}
        />

        <div className="relative flex h-full flex-col justify-between p-[clamp(20px,3.6vw,40px)] pl-[clamp(30px,4.6vw,56px)]">
          <div>
            <p className="eyebrow text-accent">{profile.role}</p>
            <p className="mt-3 font-display-ko text-[clamp(30px,5vw,56px)] leading-none font-extrabold tracking-[-0.04em]">
              {profile.name}
            </p>
            <p className="mt-2 font-mono text-[clamp(11px,1.3vw,15px)] tracking-[0.18em] text-text-faint">
              {profile.nameEn}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-[clamp(11px,1.25vw,14px)]">
            {[
              { label: "Email", value: profile.email },
              { label: "Phone", value: profile.phone },
              { label: "Github", value: profile.githubLabel },
              { label: "Based", value: profile.location },
            ].map((row) => (
              <div key={row.label} className="min-w-0">
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                  {row.label}
                </dt>
                <dd className="mt-0.5 truncate font-mono text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
