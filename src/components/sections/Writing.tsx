import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { writings } from "@/content/experience";

export default function Writing() {
  return (
    <Section
      id="writing"
      label="Writing"
      title={"만든 것을 글로도 남깁니다."}
      lead="프롬프트 구조를 실험한 결과는 논문으로 정리해 학회에서 발표했습니다."
    >
      <ul className="border-t border-line">
        {writings.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i * 60}
            className="group border-b border-line transition-colors duration-[var(--motion-base)] ease-default hover:bg-[color-mix(in_oklab,var(--color-ink)_2%,transparent)]"
          >
            <div className="grid gap-4 py-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
              <div className="flex items-baseline gap-3 lg:block">
                <span className="font-mono text-sm text-ink">{item.year}</span>
                <span className="block text-[12px] text-text-faint lg:mt-1">{item.venue}</span>
              </div>

              <div className="max-w-[62ch]">
                <h3 className="font-display-ko text-h3 transition-colors duration-[var(--motion-base)] ease-default group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-4 text-text-sub">{item.desc}</p>
                <p className="mt-5 inline-block rounded-full bg-accent-soft px-3 py-1 text-[12px] text-accent-deep">
                  {item.note}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
