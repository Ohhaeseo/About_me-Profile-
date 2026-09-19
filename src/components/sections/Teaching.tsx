import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { activityDetails } from "@/content/teaching";

/**
 * 강의 — 프로젝트 패널과 같은 크기의 한 화면.
 * 프로젝트가 아니므로 data-project 없이 사이트 공통 액센트를 쓴다.
 * 좌측은 글과 수치, 우측은 주차별 강의안 표지. 상세는 /activities/[id]로 넘긴다.
 */
export default function Teaching() {
  const activity = activityDetails[0];
  const href = `/activities/${activity.id}`;
  const [first, ...rest] = activity.weeks;

  return (
    <section
      id="teaching"
      className="section-fit group/card relative scroll-mt-0 border-t border-line bg-[color-mix(in_oklab,var(--color-accent)_5%,var(--color-base))]"
    >
      <div className="shell grid w-full items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)]">
        {/* 좌 — 글 */}
        <div className="min-w-0">
          <Reveal>
            <p className="eyebrow text-accent">Teaching</p>
            <p className="label-ko mt-4 font-bold text-text-sub">{activity.kicker}</p>

            <h2 className="mt-4 font-display-ko text-[clamp(38px,5vw,74px)] leading-[1.04] font-extrabold tracking-[-0.04em]">
              {activity.title}
            </h2>

            <p className="mt-4 text-sm text-text-sub">
              {activity.period} · {activity.role}
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8 max-w-[56ch]">
            <p className="text-[clamp(17px,1.7vw,20px)] leading-[1.7] text-ink">{activity.pitch}</p>
            <p className="mt-5 text-text-sub">{activity.teaser}</p>
            <p className="mt-4 text-sm text-text-sub">{activity.teaserNote}</p>
          </Reveal>

          {/* 수치 */}
          <Reveal
            delay={140}
            className="mt-8 grid max-w-[520px] grid-cols-3 gap-px overflow-hidden rounded-card border border-line bg-line"
          >
            {activity.metrics.map((metric) => (
              <div key={metric.label} className="bg-panel px-4 py-4">
                <p className="font-mono text-[clamp(24px,2.6vw,32px)] leading-none font-semibold tracking-[-0.03em] text-accent">
                  <CountUp value={metric.value} prefix={metric.prefix} />
                  {metric.suffix ? (
                    <span className="ml-1 font-sans text-[0.46em] tracking-[-0.01em]">
                      {metric.suffix}
                    </span>
                  ) : null}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-9">
            <Link
              href={href}
              className="press group/cta inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent shadow-[0_1px_0_0_color-mix(in_oklab,var(--color-ink)_12%,transparent)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-frame"
            >
              강의 내용과 강의안 보기
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--motion-base)] ease-default group-hover/cta:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* 우 — 주차별 강의안 표지 */}
        <Reveal delay={100} className="min-w-0">
          <Link href={href} aria-label={`${activity.title} 상세 보기`} className="block">
            <figure className="overflow-hidden rounded-card border border-line bg-panel p-[clamp(10px,1.2vw,18px)] shadow-frame">
              <span className="relative block aspect-video overflow-hidden rounded-[10px] bg-panel-sunk">
                <Image
                  src={first.cover}
                  alt={`1주차 강의안 표지: ${first.title}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  loading="lazy"
                  className="object-cover transition-transform duration-[var(--motion-base)] ease-default group-hover/card:scale-[1.02]"
                />
              </span>

              <span className="mt-[clamp(10px,1.2vw,18px)] grid grid-cols-2 gap-[clamp(10px,1.2vw,18px)]">
                {rest.map((week) => (
                  <span
                    key={week.no}
                    className="relative block aspect-video overflow-hidden rounded-[10px] border border-line bg-panel-sunk"
                  >
                    <Image
                      src={week.cover}
                      alt={`${Number(week.no)}주차 강의안 표지: ${week.title}`}
                      fill
                      sizes="(max-width: 1024px) 45vw, 270px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </span>
                ))}
              </span>
            </figure>
          </Link>

          <ol className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-3">
            {activity.weeks.map((week) => (
              <li key={week.no} className="text-[13px] text-text-sub">
                <span className="font-mono font-bold text-accent">W{Number(week.no)}</span>{" "}
                <span className="break-keep">{week.outcome}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
