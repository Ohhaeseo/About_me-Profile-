import type { ProjectDemo } from "@/content/projects";

/**
 * 시연 영상 — 브라우저 기본 컨트롤을 쓰고 자동 재생하지 않는다.
 * preload="metadata" + #t 프래그먼트로 재생 전에는 첫 장면만 받아 포스터처럼 보여준다.
 * 세로 영상(폰 화면 녹화)은 폭을 제한하고 설명을 옆에 둔다.
 */
export default function DemoVideo({ demo, title }: { demo: ProjectDemo; title: string }) {
  const portrait = demo.height > demo.width;

  return (
    <figure
      className={
        portrait
          ? "grid items-center gap-[clamp(24px,4vw,56px)] md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]"
          : ""
      }
    >
      <div
        className={`overflow-hidden rounded-card border border-line bg-panel-sunk shadow-frame ${
          portrait ? "mx-auto w-full max-w-[340px]" : ""
        }`}
      >
        <video
          controls
          playsInline
          preload="metadata"
          poster={demo.poster}
          aria-label={`${title} 시연 영상`}
          className="block h-auto w-full"
          style={{ aspectRatio: `${demo.width} / ${demo.height}` }}
        >
          <source src={`${demo.src}#t=${demo.posterTime ?? 0}`} type="video/mp4" />
        </video>
      </div>

      <figcaption className={portrait ? "" : "mt-5"}>
        <p className="max-w-[56ch] text-text-sub">{demo.caption}</p>
        {demo.chapters ? (
          <ol className="mt-6 border-t border-line">
            {demo.chapters.map((chapter, i) => (
              <li key={chapter} className="flex gap-4 border-b border-line py-3 text-sm text-text-sub">
                <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>{chapter}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </figcaption>
    </figure>
  );
}
