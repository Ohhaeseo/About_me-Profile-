import Image from "next/image";
import Reveal from "@/components/Reveal";
import { about, principles, profile, traits } from "@/content/profile";

/**
 * About — 한 화면에 다 들어가도록 두 패널로 나눈다.
 *   패널 1: 헤드라인 + 프로필 카드 + 일하는 원칙(How I Work)
 *   패널 2: 자기소개 본문 + 성격
 * 두 패널 모두 data-nav-section="about"이라 하단 네비에서는 한 섹션으로 묶인다.
 */
export default function About() {
  return (
    <>
      <section
        id="about"
        data-nav-section="about"
        className="section-fit border-t border-line scroll-mt-4"
      >
        <div className="shell w-full">
          {/* 헤드라인 — 줄바꿈과 강조를 콘텐츠에서 직접 지정한다 */}
          <Reveal as="header" className="max-w-[min(100%,820px)]">
            <p className="eyebrow text-accent">About</p>
            <h2 className="mt-4 whitespace-pre-line font-display-ko text-h2">
              {about.headline.map((part, i) =>
                part.em ? (
                  <strong key={i} className="font-extrabold text-accent">
                    {part.text}
                  </strong>
                ) : part.mark ? (
                  <span
                    key={i}
                    className="font-extrabold underline decoration-accent decoration-[3px] underline-offset-[6px]"
                  >
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h2>
          </Reveal>

          <div className="mt-[clamp(28px,3.5vw,52px)] grid items-stretch gap-[clamp(24px,3vw,48px)] lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            {/* 좌 — 프로필 카드 */}
            <Reveal className="group flex">
              <div className="flex w-full flex-col rounded-card border border-line bg-panel p-5 shadow-soft transition-[box-shadow,border-color] duration-[var(--motion-base)] ease-default group-hover:border-line-strong group-hover:shadow-frame">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-panel-sunk">
                  <Image
                    src="/images/profile-photo.webp"
                    alt={`${profile.name} 프로필 사진`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover object-[50%_22%] transition-transform duration-[var(--motion-base)] ease-default group-hover:scale-[1.02]"
                  />
                </div>

                <h3 className="mt-5 font-display-ko text-[22px] leading-tight font-extrabold tracking-[-0.03em]">
                  {profile.name}
                </h3>
                <p className="mt-1 text-sm text-text-sub">{profile.role}</p>

                {/* flex-1 + 균등 분배로 우측 열과 높이를 맞춘다 */}
                <dl className="mt-5 flex flex-1 flex-col justify-between">
                  {about.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline gap-3 border-b border-line py-2 last:border-b-0"
                    >
                      <dt className="eyebrow w-[74px] shrink-0 whitespace-nowrap text-accent">
                        {fact.label}
                      </dt>
                      <dd className="min-w-0 text-[13px] text-ink">
                        {fact.href ? (
                          <a
                            href={fact.href}
                            target={fact.href.startsWith("http") ? "_blank" : undefined}
                            rel={fact.href.startsWith("http") ? "noreferrer" : undefined}
                            className="link-sweep break-all font-mono hover:text-accent"
                          >
                            {fact.value}
                          </a>
                        ) : (
                          <span className="break-keep">{fact.value}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* 우 — 일하는 원칙 */}
            <div className="flex flex-col">
              <Reveal>
                <p className="eyebrow text-accent">How I Work</p>
              </Reveal>

              <ul className="mt-4 flex flex-1 flex-col border-t border-line">
                {principles.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.no}
                    delay={i * 60}
                    className="group flex flex-1 border-b border-line transition-colors duration-[var(--motion-base)] ease-default hover:bg-[color-mix(in_oklab,var(--color-accent)_5%,transparent)]"
                  >
                    <div className="grid w-full items-center gap-x-6 gap-y-2 py-4 sm:grid-cols-[minmax(0,170px)_minmax(0,1fr)]">
                      <div className="flex items-baseline gap-3 sm:block">
                        <p className="font-mono text-[22px] leading-none font-bold text-accent/35 transition-colors duration-[var(--motion-base)] ease-default group-hover:text-accent">
                          {item.no}
                        </p>
                        <h3 className="font-display-ko text-[16px] font-bold tracking-[-0.02em] text-ink sm:mt-2">
                          {item.title}
                        </h3>
                        <p className="eyebrow text-text-faint sm:mt-1.5">{item.en}</p>
                      </div>
                      <p className="max-w-[56ch] text-[13px] leading-[1.7] text-text-sub">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 패널 2 — 자기소개와 성격 */}
      <section
        data-nav-section="about"
        className="section-fit border-t border-line"
        aria-label="자기소개와 성격"
      >
        <div className="shell w-full">
          <div className="grid gap-x-[clamp(28px,3.5vw,56px)] gap-y-6 lg:grid-cols-3">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 12)} delay={i * 60}>
                <p className="text-sm leading-[1.8] text-text-sub">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-[clamp(40px,5vw,72px)] border-t border-line pt-[clamp(32px,4vw,56px)]">
            <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h3 className="eyebrow text-accent">Personality</h3>
              <p className="text-sm text-text-sub">
                잘하는 것만 적으면 같이 일할 때 알 수 없는 게 많아서, 약한 부분도 함께 적었습니다.
              </p>
            </Reveal>

            <ul className="mt-8 border-t border-line">
              {traits.map((trait, i) => (
                <Reveal
                  as="li"
                  key={trait.no}
                  delay={i * 60}
                  className="group border-b border-line transition-colors duration-[var(--motion-base)] ease-default hover:bg-[color-mix(in_oklab,var(--color-accent)_5%,transparent)]"
                >
                  <div className="grid gap-3 py-5 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm font-bold text-accent">{trait.no}</span>
                      <h4 className="font-display-ko text-[18px] font-bold tracking-[-0.02em]">
                        {trait.title}
                      </h4>
                    </div>
                    <div className="max-w-[68ch]">
                      <p className="text-[15px] font-semibold text-ink">{trait.summary}</p>
                      <p className="mt-2 text-[13px] leading-[1.7] text-text-sub">{trait.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
