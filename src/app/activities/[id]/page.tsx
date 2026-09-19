import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LectureDeck from "@/components/activity/LectureDeck";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";
import { activityDetails } from "@/content/teaching";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return activityDetails.map((activity) => ({ id: activity.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const activity = activityDetails.find((item) => item.id === id);
  if (!activity) return {};

  return {
    title: `${activity.title} · ${profile.name}`,
    description: activity.pitch,
  };
}

/**
 * 활동 상세 — 프로젝트 상세와 같은 리듬을 쓰되 서사 대신 커리큘럼이 본문이다.
 * 히어로 → 정보 → 수치 → 가르친 방식 → 주차별 강의안 → 돌아보며.
 * 프로젝트가 아니므로 data-project를 주지 않는다. 사이트 공통 액센트를 쓴다.
 */
export default async function ActivityDetailPage({ params }: Params) {
  const { id } = await params;
  const activity = activityDetails.find((item) => item.id === id);
  if (!activity) notFound();

  const backLink = (
    <Link
      href="/#teaching"
      className="group inline-flex items-center gap-2 text-text-sub transition-colors duration-[var(--motion-base)] ease-default hover:text-accent"
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-[var(--motion-base)] ease-default group-hover:-translate-x-1"
      >
        ←
      </span>
      메인으로 돌아가기
    </Link>
  );

  return (
    <main className="page-enter">
      {/* 히어로 */}
      <header className="relative overflow-hidden bg-[color-mix(in_oklab,var(--color-accent)_5%,var(--color-base))] pb-[clamp(56px,7vw,96px)] pt-[clamp(32px,4vw,56px)]">
        <div className="shell">
          <div className="text-sm">{backLink}</div>

          <Reveal className="mt-[clamp(32px,4vw,56px)]">
            <p className="label-ko font-bold text-accent">{activity.kicker}</p>
            <h1 className="mt-5 font-display-ko text-h1">{activity.title}</h1>
            <p className="mt-5 max-w-[52ch] text-h3 text-text-sub">{activity.subtitle}</p>
            <p className="mt-7 max-w-[46ch] text-[clamp(18px,2vw,24px)] leading-[1.6] font-semibold text-ink">
              {activity.pitch}
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-sub"
          >
            <span>{activity.period}</span>
            <span aria-hidden="true">·</span>
            <span>{activity.role}</span>
          </Reveal>

          <Reveal delay={140} className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {activity.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-accent/30 bg-panel px-3 py-1.5 font-mono text-[13px] text-accent-deep"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </header>

      {/* 정보 */}
      <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="eyebrow text-ink">Brief</h2>
          <p className="text-sm text-text-sub">어디서, 누구에게, 무엇을.</p>
        </Reveal>

        <dl className="mt-10 border-t border-line">
          {activity.brief.map((row, i) => (
            <Reveal
              key={row.label}
              delay={i * 40}
              className="grid gap-2 border-b border-line py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8"
            >
              <dt className="label-ko font-bold text-accent">{row.label}</dt>
              <dd className="text-text-sub">{row.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* 수치 */}
      <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
        <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="eyebrow text-ink">By the numbers</h2>
          <p className="text-sm text-text-sub">강의의 규모.</p>
        </Reveal>
        <Reveal
          delay={60}
          className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3"
        >
          {activity.metrics.map((metric) => (
            <div key={metric.label} className="bg-panel p-7">
              <p className="font-mono text-[clamp(34px,4vw,48px)] leading-none font-semibold tracking-[-0.03em] text-accent">
                <CountUp value={metric.value} prefix={metric.prefix} />
                {metric.suffix ? (
                  <span className="ml-1 font-sans text-[0.46em] tracking-[-0.01em]">
                    {metric.suffix}
                  </span>
                ) : null}
              </p>
              <p className="mt-4 text-sm text-text-sub">{metric.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 가르친 방식 */}
      <section className="border-t border-line bg-[color-mix(in_oklab,var(--color-accent)_4%,var(--color-base))] py-[clamp(56px,7vw,96px)]">
        <div className="shell">
          <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="eyebrow text-ink">How I taught</h2>
            <p className="text-sm text-text-sub">과정을 그렇게 짠 이유.</p>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
            {activity.approach.map((note, i) => (
              <Reveal as="li" key={note.no} delay={i * 60} className="bg-panel p-[clamp(24px,3vw,36px)]">
                <p className="font-mono text-sm text-accent">{note.no}</p>
                <h3 className="mt-4 font-display-ko text-h3">{note.title}</h3>
                <p className="mt-4 text-sm text-text-sub">{note.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 주차별 강의안 */}
      <section className="shell border-t border-line py-[clamp(56px,7vw,96px)]">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h2 className="eyebrow text-ink">Curriculum</h2>
          <p className="text-sm text-text-sub">{activity.curriculumLead}</p>
        </Reveal>

        <ol className="mt-12 flex flex-col gap-[clamp(64px,8vw,112px)]">
          {activity.weeks.map((week) => (
            <li key={week.no}>
              <Reveal>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-sm font-bold text-accent">WEEK {week.no}</span>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[12px] font-semibold text-accent-deep">
                    {week.outcome}
                  </span>
                </div>
                <h3 className="mt-4 font-display-ko text-h2-compact">{week.title}</h3>
                <p className="mt-5 max-w-[72ch] text-text-sub">{week.summary}</p>
              </Reveal>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Reveal>
                  <p className="label-ko font-bold text-accent">수업 구성</p>
                  <ol className="mt-3 border-t border-line">
                    {week.parts.map((part, i) => (
                      <li key={part} className="flex gap-4 border-b border-line py-2.5 text-sm text-text-sub">
                        <span className="font-mono text-text-faint">{String(i + 1).padStart(2, "0")}</span>
                        <span>{part}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
                <Reveal delay={60}>
                  <p className="label-ko font-bold text-accent">짚은 개념</p>
                  <ul className="mt-3 border-t border-line">
                    {week.concepts.map((concept) => (
                      <li key={concept} className="flex gap-3 border-b border-line py-2.5 text-sm text-text-sub">
                        <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={80} className="mt-8">
                <LectureDeck file={week.file} cover={week.cover} title={`${week.no}주차 ${week.title}`} slides={week.slides} />
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* 돌아보며 */}
      <section className="shell border-t border-line py-[clamp(56px,7vw,96px)]">
        <Reveal>
          <h2 className="eyebrow text-accent">Looking back</h2>
          <p className="mt-5 max-w-[62ch] text-[19px] leading-[1.8] text-text-sub">{activity.closing}</p>
        </Reveal>
      </section>

      <div className="shell border-t border-line py-[clamp(40px,5vw,64px)]">{backLink}</div>
    </main>
  );
}
