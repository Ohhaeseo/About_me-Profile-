import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Variant =
  /** 기본 — 아이브로우 / 큰 제목 / 리드 */
  | "default"
  /** 문장형 제목이라 한 단계 작게 (About) */
  | "compact"
  /** 아이브로우와 설명을 한 줄에 (Record) */
  | "inline";

/**
 * 섹션 껍데기 (design.md 4.1)
 * 섹션을 나누는 것은 배경색이 아니라 1px 헤어라인이다.
 * section-fit으로 최소 한 화면을 차지해 위아래가 잘려 보이지 않게 한다.
 *
 * title에 줄바꿈(\n)을 넣으면 그대로 반영된다 — 한글 제목은 자동 줄바꿈에 맡기면
 * 의미 단위가 끊기므로 콘텐츠에서 직접 끊는다.
 */
export default function Section({
  id,
  label,
  title,
  lead,
  variant = "default",
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  lead?: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section-fit border-t border-line scroll-mt-4">
      <div className="shell w-full">
        {variant === "inline" ? (
          <Reveal as="header" className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="eyebrow text-accent">{label}</h2>
            {lead ? <p className="text-sm text-text-sub">{lead}</p> : null}
          </Reveal>
        ) : (
          <Reveal as="header" className="max-w-[min(100%,820px)]">
            <p className="eyebrow text-accent">{label}</p>
            <h2
              className={`mt-5 font-display-ko whitespace-pre-line ${
                variant === "compact" ? "text-h2-compact" : "text-h2"
              }`}
            >
              {title}
            </h2>
            {lead ? <p className="mt-5 max-w-[62ch] text-text-sub">{lead}</p> : null}
          </Reveal>
        )}

        <div className={variant === "inline" ? "mt-10" : "mt-[clamp(40px,5vw,72px)]"}>
          {children}
        </div>
      </div>
    </section>
  );
}
