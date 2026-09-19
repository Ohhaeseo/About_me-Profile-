import Reveal from "@/components/Reveal";
import type { DeepDive as DeepDiveData } from "@/content/projects";

/** 섹션 머리 — 상세 페이지 전체가 같은 리듬을 쓰도록 한 곳에 모은다 */
function Head({ title, lead }: { title: string; lead: string }) {
  return (
    <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
      <h2 className="eyebrow text-ink">{title}</h2>
      <p className="text-sm text-text-sub">{lead}</p>
    </Reveal>
  );
}

/** 내가 맡은 부분 — 왜 / 어떻게 / 무엇을 */
function Contributions({ data }: { data: NonNullable<DeepDiveData["contributions"]> }) {
  return (
    <section className="border-t border-line bg-[color-mix(in_oklab,var(--color-accent)_4%,var(--color-base))] py-[clamp(48px,6vw,88px)]">
      <div className="shell">
        <Head title={data.title} lead={data.lead} />

        <ol className="mt-10 flex flex-col gap-4">
          {data.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.no}
              delay={i * 60}
              className="rounded-card border border-line bg-panel p-[clamp(22px,3vw,36px)]"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-mono text-sm font-bold text-accent">{item.no}</span>
                <span className="rounded-full border border-accent/30 px-3 py-1 font-mono text-[12px] text-accent-deep">
                  {item.tag}
                </span>
                <h3 className="font-display-ko text-[clamp(18px,2vw,24px)] font-bold tracking-[-0.02em]">
                  {item.title}
                </h3>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="label-ko font-bold text-accent">왜</p>
                  <p className="mt-2 max-w-[56ch] text-sm leading-[1.75] text-text-sub">
                    {item.why}
                  </p>
                </div>
                <div>
                  <p className="label-ko font-bold text-accent">어떻게</p>
                  <p className="mt-2 max-w-[56ch] text-sm leading-[1.75] text-text-sub">
                    {item.how}
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[13px] text-text-sub">
                    <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 단계별 흐름 — 좌측 레일 + 번호 */
function Flow({ data }: { data: NonNullable<DeepDiveData["flow"]> }) {
  return (
    <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
      <Head title={data.title} lead={data.lead} />

      <ol className="mt-10">
        {data.steps.map((step, i) => {
          const isLast = i === data.steps.length - 1;
          return (
            <Reveal as="li" key={step.no} delay={i * 50} className="relative flex gap-5 pb-7 last:pb-0">
              {/* 세로 레일 */}
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-9 bottom-0 w-px bg-line"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft font-mono text-[12px] font-bold text-accent-deep"
              >
                {step.no}
              </span>

              <div className="min-w-0 pt-1">
                <h3 className="font-display-ko text-[17px] font-bold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[68ch] text-sm leading-[1.75] text-text-sub">{step.body}</p>
                {step.meta ? (
                  <p className="mt-2.5 text-[12px] tracking-[0.01em] text-text-faint">{step.meta}</p>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

/** 코드 조각 — 가로로 넘치면 블록 안에서만 스크롤한다 */
function Code({ data }: { data: NonNullable<DeepDiveData["code"]> }) {
  return (
    <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
      <Head title={data.title} lead={data.lead} />

      <Reveal delay={60} className="mt-10 overflow-hidden rounded-card border border-line bg-panel">
        <p className="border-b border-line px-5 py-3 font-mono text-[12px] text-text-faint">
          {data.filename}
        </p>
        <pre
          tabIndex={0}
          className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.75] text-text-sub"
        >
          <code>{data.source}</code>
        </pre>
      </Reveal>

      <Reveal delay={120} className="mt-5">
        <p className="max-w-[68ch] text-[13px] text-text-sub">{data.caption}</p>
      </Reveal>
    </section>
  );
}

/** 비교 결과 표 — 열마다 최고(또는 최저) 값을 강조하고 제안 방식 행에 색을 깐다 */
function Results({ data }: { data: NonNullable<DeepDiveData["results"]> }) {
  const bestByColumn = data.columns.map((column, c) => {
    if (column.best === "none") return null;
    const values = data.rows.map((row) => row.values[c]);
    return column.best === "max" ? Math.max(...values) : Math.min(...values);
  });

  return (
    <section className="border-t border-line bg-[color-mix(in_oklab,var(--color-accent)_4%,var(--color-base))] py-[clamp(48px,6vw,88px)]">
      <div className="shell">
        <Head title={data.title} lead={data.lead} />

        <Reveal delay={60} className="mt-10 overflow-x-auto rounded-card border border-line bg-panel">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-4 text-[12px] font-semibold text-text-faint">
                  방식
                </th>
                {data.columns.map((column) => (
                  <th
                    key={column.label}
                    scope="col"
                    className="px-3 py-4 text-right text-[12px] font-semibold whitespace-nowrap text-text-faint"
                  >
                    {column.label}
                  </th>
                ))}
                {data.verdictLabel ? (
                  <th
                    scope="col"
                    className="px-5 py-4 text-right text-[12px] font-semibold whitespace-nowrap text-text-faint"
                  >
                    {data.verdictLabel}
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr
                  key={row.tag}
                  className={`border-b border-line last:border-b-0 ${row.focus ? "bg-accent-soft" : ""}`}
                >
                  <th scope="row" className="px-5 py-4 font-normal whitespace-nowrap">
                    <span className="mr-3 font-mono text-[13px] font-bold text-accent">{row.tag}</span>
                    <span className={`text-sm ${row.focus ? "font-bold text-accent-deep" : "text-ink"}`}>
                      {row.name}
                    </span>
                  </th>
                  {row.values.map((value, c) => {
                    const isBest = bestByColumn[c] === value;
                    const tone = row.focus ? "text-accent-deep" : isBest ? "text-accent" : "text-text-sub";
                    return (
                      <td
                        key={data.columns[c].label}
                        className={`px-3 py-4 text-right font-mono text-sm tabular-nums ${tone} ${isBest ? "font-bold" : ""}`}
                      >
                        {value.toFixed(data.columns[c].digits)}
                      </td>
                    );
                  })}
                  {data.verdictLabel ? (
                    <td
                      className={`px-5 py-4 text-right text-sm whitespace-nowrap ${
                        row.focus ? "font-bold text-accent-deep" : "text-text-sub"
                      }`}
                    >
                      {row.verdict}
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
          {data.notes.map((note, i) => (
            <Reveal as="li" key={note} delay={i * 50} className="flex gap-2.5 text-sm text-text-sub">
              <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{note}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 가중치 막대 — 비중 자체가 메시지인 경우 */
function Weights({ data }: { data: NonNullable<DeepDiveData["weights"]> }) {
  return (
    <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
      <Head title={data.title} lead={data.lead} />

      <ul className="mt-10 border-t border-line">
        {data.items.map((item, i) => (
          <Reveal as="li" key={item.label} delay={i * 50} className="border-b border-line py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[15px] font-bold text-ink">{item.label}</h3>
              <p className="font-mono text-[15px] font-bold text-accent">
                {item.value}
                <span className="ml-0.5 text-[11px] text-text-faint">/ {data.total}</span>
              </p>
            </div>

            {/* 막대 — 최대 항목 기준으로 폭을 잡는다 */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${(item.value / item.max) * 100}%` }}
              />
            </div>

            <p className="mt-3 max-w-[68ch] text-[13px] text-text-sub">{item.note}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** 명세 표 — 숫자와 규격 */
function Spec({ data }: { data: NonNullable<DeepDiveData["spec"]> }) {
  return (
    <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
      <Head title={data.title} lead={data.lead} />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {data.groups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 60}
            className="rounded-card border border-line bg-panel p-6"
          >
            <h3 className="label-ko font-bold text-accent">{group.title}</h3>
            <dl className="mt-4 border-t border-line">
              {group.rows.map((row) => (
                <div key={row.key} className="border-b border-line py-3 last:border-b-0">
                  <dt className="text-[11px] font-semibold text-text-faint">{row.key}</dt>
                  <dd className="mt-1 text-[13px] break-keep text-text-sub">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** 현재 상태 — 실연동과 미연동을 나눠 적는다 */
function Status({ data }: { data: NonNullable<DeepDiveData["status"]> }) {
  return (
    <section className="shell border-t border-line py-[clamp(48px,6vw,88px)]">
      <Head title={data.title} lead={data.lead} />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-card border border-accent/30 bg-accent-soft p-[clamp(20px,2.6vw,32px)]">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
            <h3 className="text-[15px] font-bold text-accent-deep">{data.liveTitle}</h3>
          </div>
          <ul className="mt-5 flex flex-col gap-2.5">
            {data.live.map((line) => (
              <li key={line} className="text-[13px] leading-[1.7] text-accent-deep">
                {line}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={80}
          className="rounded-card border border-line bg-panel p-[clamp(20px,2.6vw,32px)]"
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full border-2 border-line-strong bg-panel"
            />
            <h3 className="text-[15px] font-bold text-ink">{data.wipTitle}</h3>
          </div>
          <ul className="mt-5 flex flex-col gap-2.5">
            {data.wip.map((line) => (
              <li key={line} className="text-[13px] leading-[1.7] text-text-sub">
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={140} className="mt-6">
        <p className="max-w-[68ch] text-sm text-text-sub">{data.note}</p>
      </Reveal>
    </section>
  );
}

/** 있는 블록만 순서대로 그린다 */
export default function DeepDive({ data }: { data: DeepDiveData }) {
  return (
    <>
      {data.contributions ? <Contributions data={data.contributions} /> : null}
      {data.flow ? <Flow data={data.flow} /> : null}
      {data.code ? <Code data={data.code} /> : null}
      {data.weights ? <Weights data={data.weights} /> : null}
      {data.results ? <Results data={data.results} /> : null}
      {data.spec ? <Spec data={data.spec} /> : null}
      {data.status ? <Status data={data.status} /> : null}
    </>
  );
}
