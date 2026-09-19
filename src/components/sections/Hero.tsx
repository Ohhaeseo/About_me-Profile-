import PosterPortrait from "@/components/PosterPortrait";
import Reveal from "@/components/Reveal";
import TypeLine from "@/components/TypeLine";
import { profile } from "@/content/profile";

/**
 * 히어로 — 좌상단 텍스트 / 우하단 포스터 초상.
 * 영문 직함을 작게 얹고 그 아래에 이름을 크게 둔다.
 */
export default function Hero() {
  return (
    <section id="hero" className="section-fit relative overflow-hidden">
      <PosterPortrait className="absolute inset-0 z-0 opacity-[0.22] lg:opacity-100" />

      <div className="shell relative z-10">
        <div className="max-w-[min(100%,720px)]">
          <Reveal delay={0}>
            <p className="font-display text-hero-role uppercase text-accent">{profile.heroRole}</p>
          </Reveal>

          <Reveal delay={140} className="mt-5">
            <TypeLine text={profile.heroName} className="text-name font-display-ko" />
          </Reveal>

          <Reveal delay={300} className="mt-9">
            <p className="max-w-[40ch] text-[clamp(17px,1.8vw,21px)] leading-[1.7] text-text-sub">
              {profile.intro}
            </p>
            <p className="mt-3 text-sm text-text-sub">{profile.affiliation}</p>
          </Reveal>

          <Reveal delay={440} className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="press group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-frame"
              >
                프로젝트 보기
                <span
                  aria-hidden="true"
                  className="transition-transform duration-[var(--motion-base)] ease-default group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="press group inline-flex items-center gap-2 rounded-full border border-line bg-panel px-7 py-3.5 text-sm font-semibold text-ink hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-soft"
              >
                포트폴리오 PDF
                <span
                  aria-hidden="true"
                  className="text-text-faint transition-transform duration-[var(--motion-base)] ease-default group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-7 left-[clamp(20px,5vw,80px)] z-10 flex items-center gap-3 text-text-faint transition-colors duration-[var(--motion-base)] ease-default hover:text-ink"
      >
        <span className="eyebrow">Scroll</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-[var(--motion-base)] ease-default group-hover:translate-y-1"
        >
          ↓
        </span>
      </a>
    </section>
  );
}
