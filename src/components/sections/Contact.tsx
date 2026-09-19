import BusinessCard from "@/components/contact/BusinessCard";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";

/** 눌렀을 때 바로 동작하는 것만 남긴다 */
const actions = [
  { label: "메일 보내기", href: `mailto:${profile.email}`, primary: true, external: false },
  { label: "GitHub", href: profile.github, primary: false, external: true },
  { label: "포트폴리오 PDF", href: profile.resume, primary: false, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="section-fit border-t border-line">
      <div className="shell w-full">
        <Reveal as="header" className="max-w-[min(100%,820px)]">
          <p className="eyebrow text-accent">Contact</p>
          <h2 className="mt-4 whitespace-pre-line font-display-ko text-h2">
            {"만들고 싶은 게 있다면\n편하게 연락 주세요."}
          </h2>
          <p className="mt-5 max-w-[52ch] text-text-sub">
            백엔드 신입 개발자로 함께 일할 팀을 찾고 있습니다. 명함을 마우스로 기울여 보세요.
          </p>
        </Reveal>

        <div className="mt-[clamp(24px,3.5vw,44px)]">
          <BusinessCard />
        </div>

        <Reveal delay={120} className="mt-[clamp(22px,3vw,36px)] flex flex-wrap justify-center gap-3">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
              className={`press group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
                action.primary
                  ? "bg-accent text-on-accent hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-frame"
                  : "border border-line bg-panel text-ink hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-soft"
              }`}
            >
              {action.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-[var(--motion-base)] ease-default group-hover:translate-x-1"
              >
                {action.external ? "↗" : "→"}
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal
          delay={200}
          className="mt-[clamp(26px,3.5vw,44px)] flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-5"
        >
          <p className="eyebrow text-text-faint">
            {profile.nameEn} · {profile.location}
          </p>
          <p className="font-mono text-sm text-text-faint">
            © 2026 {profile.nameEn}. Built with Next.js.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
