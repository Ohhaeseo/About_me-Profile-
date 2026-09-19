import Reveal from "@/components/Reveal";
import { roadmap } from "@/content/experience";

/**
 * 로드맵 — 데스크탑은 가로, 모바일은 세로 레일.
 * 연결선은 각 칸이 자기 폭만큼 그리므로 칸 사이 간격 없이 이어진다.
 */
export default function Roadmap() {
  return (
    <ol className="lg:grid lg:grid-cols-5">
      {roadmap.map((item, i) => {
        const isLast = i === roadmap.length - 1;
        const nextIsFuture = roadmap[i + 1]?.state === "next";

        return (
          <Reveal
            as="li"
            key={item.year}
            delay={i * 80}
            className="relative pb-10 pl-8 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-6"
          >
            {/* 세로 레일 (모바일) */}
            {!isLast ? (
              <span
                aria-hidden="true"
                className={`absolute left-[5px] top-8 bottom-0 w-px lg:hidden ${
                  nextIsFuture
                    ? "bg-[repeating-linear-gradient(to_bottom,var(--color-line)_0_4px,transparent_4px_9px)]"
                    : "bg-line"
                }`}
              />
            ) : null}

            {/* 연도 */}
            <p
              className={`font-mono text-[15px] ${
                item.state === "current" ? "text-accent" : "text-text-faint"
              }`}
            >
              {item.year}
            </p>

            {/* 점 + 가로 레일 (데스크탑) */}
            <div className="relative mt-4 hidden h-3 lg:block">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={`absolute left-1.5 right-0 top-1/2 h-px -translate-y-1/2 ${
                    nextIsFuture
                      ? "bg-[repeating-linear-gradient(to_right,var(--color-line)_0_4px,transparent_4px_9px)]"
                      : "bg-line"
                  }`}
                />
              ) : null}
              <Dot state={item.state} className="absolute left-0 top-1/2 -translate-y-1/2" />
            </div>

            {/* 점 (모바일) */}
            <Dot state={item.state} className="absolute left-0 top-[7px] lg:hidden" />

            <div className="mt-4 lg:mt-5">
              <p className="eyebrow text-accent">{item.phase}</p>
              <h4 className="mt-3 font-display-ko text-h3">{item.title}</h4>
              <p className="mt-3 max-w-[38ch] text-sm text-text-sub">{item.desc}</p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {item.marks.map((mark) => (
                  <li
                    key={mark}
                    className={`rounded-full border px-2.5 py-1 text-[12px] ${
                      item.state === "current"
                        ? "border-accent/30 bg-accent-soft text-accent-deep"
                        : "border-line bg-panel text-text-sub"
                    }`}
                  >
                    {mark}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

function Dot({ state, className = "" }: { state: "done" | "current" | "next"; className?: string }) {
  if (state === "current") {
    return (
      <span
        aria-hidden="true"
        className={`size-3 rounded-full bg-accent shadow-[0_0_0_4px_var(--color-accent-soft)] ${className}`}
      />
    );
  }
  if (state === "next") {
    return (
      <span
        aria-hidden="true"
        className={`size-3 rounded-full border-2 border-line-strong bg-base ${className}`}
      />
    );
  }
  return (
    <span aria-hidden="true" className={`size-3 rounded-full bg-line-strong ${className}`} />
  );
}
