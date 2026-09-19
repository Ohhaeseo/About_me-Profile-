import Image from "next/image";
import { TransitionLink } from "@/components/project/TransitionProvider";
import FlipTitle from "@/components/FlipTitle";
import Reveal from "@/components/Reveal";
import { projects, sideWorks } from "@/content/projects";

/**
 * 프로젝트 — 한 화면에 한 프로젝트.
 * data-project가 그 패널 안의 액센트 토큰을 프로젝트 색으로 갈아끼운다 (design.md 2.2).
 * 메인에서는 요약까지만, 서사와 갤러리는 상세 페이지로 넘긴다.
 */
export default function Projects() {
  return (
    <>
      {/* 섹션 도입 */}
      <section id="projects" className="section-fit border-t border-line scroll-mt-4">
        <div className="shell w-full">
          <Reveal className="max-w-[62ch]">
            <p className="eyebrow text-accent">Selected Projects</p>
            <h2 className="mt-5 whitespace-pre-line font-display-ko text-h2">
              {"무엇을 만들었는지보다,\n왜 그렇게 정했는지를 적었습니다."}
            </h2>
            <p className="mt-6 text-text-sub">
              {projects.length}개 프로젝트를 [문제 → 핵심 판단 → 검증] 순서로 정리했습니다. 각
              프로젝트는 한 화면에 하나씩, 상세는 별도 페이지에 있습니다.
            </p>
          </Reveal>

          <ol className="mt-[clamp(32px,4vw,56px)] border-t border-line">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.id} delay={100 + i * 50}>
                <a
                  data-project={project.id}
                  href={`#project-${project.id}`}
                  className="group relative flex items-center gap-[clamp(12px,2.5vw,32px)] overflow-hidden border-b border-line py-[clamp(14px,2vw,22px)]"
                >
                  {/* 호버하면 프로젝트 색이 왼쪽에서 채워진다 */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-accent-soft transition-transform duration-[var(--motion-base)] ease-default group-hover:scale-x-100"
                  />

                  <span
                    aria-hidden="true"
                    className="relative size-2.5 shrink-0 rounded-full bg-accent transition-transform duration-[var(--motion-base)] ease-default group-hover:scale-125"
                  />

                  <span className="relative font-mono text-sm text-text-faint transition-colors duration-[var(--motion-base)] ease-default group-hover:text-accent-deep">
                    {project.no}
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span className="block font-display-ko text-[clamp(19px,2.4vw,30px)] font-bold tracking-[-0.03em] transition-colors duration-[var(--motion-base)] ease-default group-hover:text-accent-deep">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-text-sub">
                      {project.subtitle}
                    </span>
                  </span>

                  <span className="relative hidden shrink-0 text-sm text-text-sub sm:block">
                    {project.period}
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative shrink-0 text-text-faint transition-[transform,color] duration-[var(--motion-base)] ease-default group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 프로젝트 패널 — 하나당 한 화면 */}
      {projects.map((project) => (
        <article
          key={project.id}
          id={`project-${project.id}`}
          data-project={project.id}
          data-nav-section="projects"
          className="section-fit group/card relative scroll-mt-0 border-t border-line bg-[color-mix(in_oklab,var(--color-accent)_4%,var(--color-base))]"
        >
          <div className="shell grid w-full items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)]">
            {/* 좌 — 글 */}
            <div className="min-w-0">
              <Reveal>
                <p className="font-mono text-sm tracking-[0.12em] text-accent">
                  {project.no} · {project.title.toUpperCase()}
                </p>

                <h3 className="mt-4 font-display-ko text-[clamp(38px,5vw,74px)] leading-[1.04] font-extrabold tracking-[-0.04em]">
                  <FlipTitle text={project.title} />
                </h3>

                <p className="mt-4 text-sm text-text-sub">
                  {project.period} · {project.role}
                </p>
              </Reveal>

              <Reveal delay={80} className="mt-6">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-accent/30 px-3 py-1.5 font-mono text-[13px] text-accent-deep"
                    >
                      {tag}
                    </li>
                  ))}
                  {project.stack.length > 4 ? (
                    <li className="px-1 py-1.5 font-mono text-[13px] text-text-faint">
                      +{project.stack.length - 4}
                    </li>
                  ) : null}
                </ul>
              </Reveal>

              <Reveal delay={140} className="mt-8 max-w-[56ch]">
                <p className="text-[clamp(17px,1.7vw,20px)] leading-[1.7] text-ink">
                  {project.pitch}
                </p>

                <p className="mt-5 text-text-sub">
                  <strong className="font-semibold text-ink">핵심 판단 —</strong>{" "}
                  {project.decisions[0].body}
                </p>

                <p className="mt-4 text-sm text-text-sub">{project.validation}</p>
              </Reveal>

              <Reveal delay={200} className="mt-9">
                <TransitionLink
                  href={`/projects/${project.id}`}
                  projectId={project.id}
                  label={project.title}
                  className="press group/cta inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent shadow-[0_1px_0_0_color-mix(in_oklab,var(--color-ink)_12%,transparent)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-frame"
                >
                  프로젝트 상세보기
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[var(--motion-base)] ease-default group-hover/cta:translate-x-1"
                  >
                    →
                  </span>
                </TransitionLink>
              </Reveal>
            </div>

            {/* 우 — 대표 화면 */}
            <Reveal delay={100} className="min-w-0">
              <figure>
                <TransitionLink
                  href={`/projects/${project.id}`}
                  projectId={project.id}
                  label={project.title}
                  className="block overflow-hidden rounded-card border border-line bg-panel p-[clamp(10px,1.2vw,18px)] shadow-frame"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-[10px] bg-panel-sunk">
                    <Image
                      src={project.gallery[0].src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 92vw, 560px"
                      loading="lazy"
                      className="object-cover object-top transition-transform duration-[var(--motion-base)] ease-default group-hover/card:scale-[1.02]"
                    />
                  </span>
                </TransitionLink>
                <figcaption className="mt-4 text-sm text-text-sub">
                  {project.gallery[0].caption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </article>
      ))}

      {/* 그 외 작업 */}
      <section data-nav-section="projects" className="section-fit border-t border-line">
        <div className="shell w-full">
          <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="eyebrow text-ink">Also Built</h2>
            <p className="text-sm text-text-sub">기획으로 끝났거나, 기본기를 익히려고 만든 작업들.</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sideWorks.map((work, i) => (
              <Reveal
                as="article"
                key={work.title}
                delay={i * 60}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-panel transition-[transform,box-shadow,border-color] duration-[var(--motion-base)] ease-default hover:-translate-y-2 hover:border-line-strong hover:shadow-frame"
              >
                <div className="relative aspect-video overflow-hidden bg-panel-sunk">
                  <Image
                    src={work.cover}
                    alt={work.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    loading="lazy"
                    className="object-cover object-top transition-transform duration-[var(--motion-base)] ease-default group-hover:scale-[1.02] group-hover:rotate-[0.8deg]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">{work.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-text-sub">{work.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line bg-panel-sunk px-2.5 py-1 font-mono text-[12px] text-text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
