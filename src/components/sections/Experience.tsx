import Link from "next/link";
import Reveal from "@/components/Reveal";
import Roadmap from "@/components/Roadmap";
import Section from "@/components/Section";
import { activities, awards, type RecordItem } from "@/content/experience";

/**
 * 한 줄의 기록.
 * 강조 순서는 [배지 → 제목] → 소속 → 설명 → 이어지는 곳, 시점은 우측으로 밀어둔다.
 */
function Row({ item }: { item: RecordItem }) {
  return (
    <div className="group border-b border-line py-7 transition-colors duration-[var(--motion-base)] ease-default hover:bg-[color-mix(in_oklab,var(--color-ink)_2%,transparent)]">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        {item.award ? (
          <span className="rounded-full border border-accent/40 px-3 py-1 text-[12px] font-semibold text-accent-deep">
            {item.award}
          </span>
        ) : null}

        <h4 className="font-display-ko text-[clamp(17px,1.7vw,21px)] font-bold tracking-[-0.01em] text-ink">
          {item.title}
        </h4>

        {item.current ? (
          <span className="flex items-center gap-1.5 text-[12px] text-text-sub">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            진행 중
          </span>
        ) : null}

        <span className="ml-auto shrink-0 font-mono text-[13px] text-text-faint">{item.when}</span>
      </div>

      <p className="mt-2 text-sm text-text-sub">{item.org}</p>
      <p className="mt-3 max-w-[72ch] text-sm text-text-sub">{item.desc}</p>

      {item.href ? (
        <p className="mt-4">
          <Link
            href={item.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-[var(--motion-base)] ease-default group-hover:translate-x-1"
            >
              →
            </span>
            {item.hrefLabel ?? "상세보기"}
          </Link>
        </p>
      ) : null}

      {item.related ? (
        <p className="mt-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-[var(--motion-base)] ease-default group-hover:translate-x-1"
            >
              →
            </span>
            {item.related}에서 활용
          </a>
        </p>
      ) : null}
    </div>
  );
}

/** 좌측 레일 + 그룹 헤더 */
function Group({ heading, items }: { heading: string; items: RecordItem[] }) {
  return (
    <section className="relative pl-7">
      <span aria-hidden="true" className="absolute left-0 top-2 size-2.5 rounded-full bg-ink" />
      <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-6 w-px bg-line" />

      <h3 className="font-display-ko text-[clamp(19px,2vw,24px)] font-extrabold tracking-[-0.02em] text-ink">
        {heading}
      </h3>

      <div className="mt-6 border-t border-line">
        {items.map((item, i) => (
          <Reveal key={`${item.year}-${item.title}`} delay={i * 50}>
            <Row item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      label="Recognition"
      title=""
      lead="활동하고, 인정받은 것들."
      variant="inline"
    >
      <div className="flex flex-col gap-[clamp(48px,6vw,80px)]">
        <Group heading="Awards" items={awards} />
        <Group heading="Activity" items={activities} />
      </div>

      {/* 로드맵 — 해마다 무엇이 달라졌는지 */}
      <div className="mt-[clamp(72px,9vw,128px)] border-t border-line pt-[clamp(48px,6vw,80px)]">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h3 className="eyebrow text-accent">Roadmap</h3>
          <p className="text-sm text-text-sub">
            기획에서 출발해 구현으로, 구현에서 검증으로 옮겨왔습니다.
          </p>
        </Reveal>
        <div className="mt-12">
          <Roadmap />
        </div>
      </div>
    </Section>
  );
}
