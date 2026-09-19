import Link from "next/link";
import { projects } from "@/content/projects";

/**
 * 상세 페이지 상단 고정 바.
 * 메인 프로젝트 4개 사이를 어디서든 바로 오갈 수 있게 한다.
 */
export default function ProjectSwitcher({ currentId }: { currentId: string }) {
  return (
    <div className="bar-enter sticky top-0 z-40 border-b border-line bg-base/85 backdrop-blur-[8px]">
      {/* 우측 여백은 고정 배치된 테마 토글(size 44 + 우측 오프셋) 자리 */}
      <div className="shell flex items-center gap-4 py-3 pr-[calc(clamp(20px,5vw,80px)+52px)]">
        <Link
          href="/#projects"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm text-text-sub transition-[color,border-color] duration-[var(--motion-fast)] hover:border-line-strong hover:text-ink"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-[var(--motion-base)] ease-default group-hover:-translate-x-1"
          >
            ←
          </span>
          목록
        </Link>

        <nav aria-label="프로젝트 바로가기" className="min-w-0 flex-1">
          <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project) => {
              const isCurrent = project.id === currentId;
              return (
                <li key={project.id} className="shrink-0">
                  <Link
                    href={`/projects/${project.id}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex items-baseline gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-[var(--motion-fast)] ${
                      isCurrent
                        ? "bg-accent-soft text-accent-deep"
                        : "text-text-sub hover:bg-[color-mix(in_oklab,var(--color-ink)_3%,transparent)] hover:text-ink"
                    }`}
                  >
                    <span className="font-mono text-[12px] opacity-70">{project.no}</span>
                    {project.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
