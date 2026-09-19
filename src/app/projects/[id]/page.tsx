import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountUp from "@/components/CountUp";
import DeepDive from "@/components/project/DeepDive";
import DemoVideo from "@/components/project/DemoVideo";
import Gallery from "@/components/Gallery";
import PdfViewer from "@/components/project/PdfViewer";
import ProjectSwitcher from "@/components/project/ProjectSwitcher";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return {};

  return {
    title: `${project.title} · ${profile.name}`,
    description: project.pitch,
    openGraph: {
      type: "article",
      locale: "ko_KR",
      title: `${project.title} · ${project.subtitle}`,
      description: project.pitch,
    },
  };
}

/**
 * 프로젝트 상세 — 4개 메인 프로젝트가 공유하는 하나의 틀.
 * 히어로 → 프로젝트 정보 → 갤러리 → 수치 → 문제/판단/검증 → 설계 → 다음 프로젝트.
 * data-project가 이 페이지 전체의 액센트를 그 프로젝트 색으로 바꾼다 (design.md 2.2).
 */
export default async function ProjectDetailPage({ params }: Params) {
  const { id } = await params;
  const index = projects.findIndex((item) => item.id === id);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div data-project={project.id}>
      <ProjectSwitcher currentId={project.id} />

      <main className="page-enter">
        {/* 히어로 */}
        <header className="relative overflow-hidden bg-[color-mix(in_oklab,var(--color-accent)_5%,var(--color-base))] pb-[clamp(56px,7vw,96px)] pt-[clamp(48px,6vw,88px)]">
          <div className="shell">
            <Reveal>
              <p className="font-mono text-sm tracking-[0.12em] text-accent">
                {project.no} · {project.kicker}
              </p>
              <h1 className="mt-5 font-display-ko text-h1">{project.title}</h1>
              <p className="mt-5 max-w-[52ch] text-h3 text-text-sub">{project.subtitle}</p>
              <p className="mt-7 max-w-[46ch] text-[clamp(18px,2vw,24px)] leading-[1.6] font-semibold text-ink">
                {project.pitch}
              </p>
            </Reveal>

            <Reveal
              delay={80}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-sub"
            >
              <span>{project.period}</span>
              <span aria-hidden="true">·</span>
              <span>{project.role}</span>
              {project.award ? (
                <span className="rounded-full bg-accent-soft px-3 py-1 text-accent-deep">
                  {project.award}
                </span>
              ) : null}
            </Reveal>

            <Reveal delay={140} className="mt-6">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
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

        {/* 프로젝트 정보 — 타겟·문제정의·역할 */}
        <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
          <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="eyebrow text-ink">Project Brief</h2>
            <p className="text-sm text-text-sub">무엇을, 누구를 위해, 어디까지.</p>
          </Reveal>

          <dl className="mt-10 border-t border-line">
            {project.brief.map((row, i) => (
              <Reveal
                key={row.label}
                delay={i * 40}
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="label-ko font-bold text-accent">{row.label}</dt>
                <dd className="text-text-sub">
                  {row.value}
                  {row.todo ? (
                    <span className="ml-2 rounded border border-line-strong px-2 py-0.5 font-mono text-[11px] text-text-faint">
                      확인 필요
                    </span>
                  ) : null}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* 갤러리 */}
        <section className="shell border-t border-line py-[clamp(56px,7vw,96px)]">
          <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="eyebrow text-ink">Screens</h2>
            <p className="text-sm text-text-sub">
              썸네일을 누르거나 좌우 화살표로 넘기고, 큰 이미지를 누르면 확대됩니다.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Gallery shots={project.gallery} title={project.title} priorityFirst />
          </Reveal>
        </section>

        {/* 시연 영상 — 있는 프로젝트만 */}
        {project.demo ? (
          <section className="shell border-t border-line py-[clamp(56px,7vw,96px)]">
            <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h2 className="eyebrow text-ink">{project.demo.title}</h2>
              <p className="text-sm text-text-sub">{project.demo.lead}</p>
            </Reveal>
            <Reveal delay={60}>
              <DemoVideo demo={project.demo} title={project.title} />
            </Reveal>
          </section>
        ) : null}

        {/* 원본 문서 — 있는 프로젝트만 */}
        {project.document ? (
          <section className="shell border-t border-line py-[clamp(56px,7vw,96px)]">
            <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h2 className="eyebrow text-ink">{project.document.title}</h2>
              <p className="text-sm text-text-sub">{project.document.lead}</p>
            </Reveal>
            <Reveal delay={60}>
              <PdfViewer doc={project.document} />
            </Reveal>
            {project.document.note ? (
              <Reveal delay={60} className="mt-6">
                <p className="max-w-[68ch] text-sm text-text-sub">{project.document.note}</p>
              </Reveal>
            ) : null}
          </section>
        ) : null}

        {/* 수치 */}
        <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
          <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="eyebrow text-ink">By the numbers</h2>
            <p className="text-sm text-text-sub">구조를 설명하는 숫자들.</p>
          </Reveal>
          <Reveal
            delay={60}
            className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3"
          >
            {project.metrics.map((metric) => (
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

        {/* 서사 — 좌측 sticky 메타 / 우측 본문 */}
        <section className="shell border-t border-line py-[clamp(56px,7vw,96px)]">
          <div className="grid gap-[clamp(32px,4vw,64px)] lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <dl className="border-t border-line">
                {[
                  { label: "Period", value: project.period },
                  { label: "Role", value: project.role },
                  { label: "Stack", value: project.stack.join(" · ") },
                ].map((row) => (
                  <div key={row.label} className="border-b border-line py-4">
                    <dt className="eyebrow text-accent">{row.label}</dt>
                    <dd className="mt-2 text-sm text-text-sub">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <div className="min-w-0">
              <Reveal>
                <h2 className="eyebrow text-accent">Problem</h2>
                <p className="mt-5 max-w-[62ch] text-[19px] leading-[1.8] text-text-sub">
                  {project.problem}
                </p>
              </Reveal>

              <Reveal className="mt-[clamp(48px,6vw,80px)]">
                <h2 className="eyebrow text-accent">Key Decisions</h2>
                <ol className="mt-8 max-w-[62ch]">
                  {project.decisions.map((decision, i) => (
                    <li
                      key={decision.head}
                      className={i === 0 ? "" : "mt-10 border-t border-line pt-10"}
                    >
                      <div className="flex gap-5">
                        <span className="mt-1.5 font-mono text-sm text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display-ko text-h3">{decision.head}</h3>
                          <p className="mt-3 text-text-sub">{decision.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="mt-[clamp(48px,6vw,80px)]">
                <h2 className="eyebrow text-accent">Validation</h2>
                <p className="mt-5 max-w-[62ch] text-text-sub">{project.validation}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 어떻게 설계했는지 */}
        <section className="border-t border-line bg-[color-mix(in_oklab,var(--color-accent)_4%,var(--color-base))] py-[clamp(56px,7vw,96px)]">
          <div className="shell">
            <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h2 className="eyebrow text-ink">How it&apos;s built</h2>
              <p className="text-sm text-text-sub">구조를 그렇게 잡은 이유.</p>
            </Reveal>

            <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
              {project.architecture.map((note, i) => (
                <Reveal as="li" key={note.no} delay={i * 60} className="bg-panel p-[clamp(24px,3vw,36px)]">
                  <p className="font-mono text-sm text-accent">{note.no}</p>
                  <h3 className="mt-4 font-display-ko text-h3">{note.title}</h3>
                  <p className="mt-4 text-sm text-text-sub">{note.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* 심화 — 데이터가 있는 프로젝트만 */}
        {project.deepDive ? <DeepDive data={project.deepDive} /> : null}

        {/* 다음 프로젝트 */}
        <nav
          aria-label="다른 프로젝트"
          className="shell border-t border-line py-[clamp(48px,6vw,80px)]"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { item: prev, dir: "이전" as const },
              { item: next, dir: "다음" as const },
            ].map(({ item, dir }) => (
              <Link
                key={dir}
                href={`/projects/${item.id}`}
                data-project={item.id}
                className={`group flex flex-col rounded-card border border-line bg-panel p-7 transition-[transform,box-shadow,border-color] duration-[var(--motion-base)] ease-default hover:-translate-y-2 hover:border-accent/40 hover:shadow-frame ${
                  dir === "다음" ? "sm:items-end sm:text-right" : ""
                }`}
              >
                <span className="label-ko font-bold text-accent">{dir} 프로젝트</span>
                <span className="mt-4 flex items-center gap-3 text-h3 transition-colors duration-[var(--motion-base)] ease-default group-hover:text-accent">
                  {dir === "이전" ? (
                    <span
                      aria-hidden="true"
                      className="text-text-faint transition-transform duration-[var(--motion-base)] ease-default group-hover:-translate-x-1"
                    >
                      ←
                    </span>
                  ) : null}
                  {item.title}
                  {dir === "다음" ? (
                    <span
                      aria-hidden="true"
                      className="text-text-faint transition-transform duration-[var(--motion-base)] ease-default group-hover:translate-x-1"
                    >
                      →
                    </span>
                  ) : null}
                </span>
                <span className="mt-2 text-sm text-text-sub">{item.subtitle}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="shell border-t border-line py-[clamp(40px,5vw,64px)]">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-text-sub transition-colors duration-[var(--motion-base)] ease-default hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-[var(--motion-base)] ease-default group-hover:-translate-x-1"
            >
              ←
            </span>
            전체 프로젝트 목록으로
          </Link>
        </div>
      </main>
    </div>
  );
}
