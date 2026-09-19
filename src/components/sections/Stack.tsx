import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { stacks } from "@/content/profile";

export default function Stack() {
  return (
    <Section
      id="stack"
      label="Stack"
      title={"백엔드를 축으로,\n필요한 만큼 옆으로 넓혔습니다."}
      lead="한 프로젝트를 끝까지 붙이려면 서버만으로는 되지 않았습니다. 필요해서 배운 순서대로, 어디에 썼는지까지 적었습니다."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((group, i) => (
          <Reveal
            key={group.label}
            delay={i * 60}
            className="group flex h-full flex-col rounded-card border border-line bg-panel p-5 transition-[transform,box-shadow,border-color] duration-[var(--motion-base)] ease-default hover:-translate-y-2 hover:border-line-strong hover:shadow-frame"
          >
            {/* 머리줄 — 아이콘 칩 + 굵은 라벨을 한 줄에 둬서 카드가 무엇인지 먼저 읽히게 한다 */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[14px] text-on-accent transition-transform duration-[var(--motion-base)] ease-default group-hover:scale-[1.02]"
              >
                {group.icon}
              </span>
              <h3 className="min-w-0 font-display text-[16px] leading-tight font-bold tracking-[0.1em] text-ink uppercase transition-colors duration-[var(--motion-base)] ease-default group-hover:text-accent">
                {group.label}
              </h3>
              <span className="ml-auto font-mono text-[13px] text-text-faint">{group.no}</span>
            </div>

            <p className="mt-3 text-sm text-text-sub">{group.note}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => {
                const isCore = item.name === group.core;
                return (
                  <li
                    key={item.name}
                    className={`flex items-center gap-2 rounded-full border py-1 pl-2 pr-3 font-mono text-[13px] transition-colors duration-[var(--motion-fast)] ${
                      isCore
                        ? "border-accent/35 bg-accent-soft text-accent-deep"
                        : "border-line bg-panel-sunk text-text-sub group-hover:border-line-strong"
                    }`}
                  >
                    {/* 로고는 단색으로 변환해 둬서 currentColor를 따른다.
                        mask로 칠하므로 다크모드에서도 글자색과 같이 움직인다. */}
                    {item.icon ? (
                      <span
                        aria-hidden="true"
                        className="size-4 shrink-0 bg-current"
                        style={{
                          maskImage: `url(/icons/${item.icon}.svg)`,
                          WebkitMaskImage: `url(/icons/${item.icon}.svg)`,
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                        }}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex size-4 shrink-0 items-center justify-center text-[11px] opacity-50"
                      >
                        ◦
                      </span>
                    )}
                    {item.name}
                  </li>
                );
              })}
            </ul>

            {/* 어디에 썼는지 — mt-auto로 카드 높이가 달라도 바닥에 맞춘다 */}
            <div className="mt-auto pt-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3.5">
                <span className="eyebrow text-accent">Used in</span>
                <span className="text-sm text-text-sub">{group.usedIn.join(" · ")}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
