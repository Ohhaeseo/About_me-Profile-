"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Phase = "idle" | "cover" | "reveal";

const COVER_MS = 420;
const REVEAL_MS = 520;

const TransitionContext = createContext<(href: string, projectId: string, label: string) => void>(
  () => {},
);

/**
 * 프로젝트 색 커튼 전환.
 * 링크를 누르면 그 프로젝트 색이 아래에서 올라와 화면을 덮고,
 * 라우팅이 끝나면 위로 빠져나가며 새 페이지를 드러낸다.
 * 커튼에 data-project가 붙어 있어 --color-accent가 프로젝트 색으로 바뀐다 (design.md 2.2).
 */
export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [project, setProject] = useState({ id: "", label: "" });
  const pending = useRef(false);

  const go = useCallback(
    (href: string, projectId: string, label: string) => {
      // 모션을 끈 사용자에게는 커튼 없이 바로 이동한다 (design.md 5.1)
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      setProject({ id: projectId, label });
      setPhase("cover");
      pending.current = true;
      window.setTimeout(() => router.push(href), COVER_MS);
    },
    [router],
  );

  // 경로가 실제로 바뀐 뒤에 커튼을 걷는다
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    setPhase("reveal");
    const timer = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={go}>
      {children}

      {phase !== "idle" ? (
        <div
          aria-hidden="true"
          data-project={project.id}
          className={`pointer-events-none fixed inset-0 z-90 flex items-center justify-center bg-accent ${
            phase === "cover" ? "curtain-cover" : "curtain-reveal"
          }`}
        >
          <span className="font-display-ko text-[clamp(32px,6vw,84px)] font-extrabold tracking-[-0.04em] text-on-accent opacity-90">
            {project.label}
          </span>
        </div>
      ) : null}
    </TransitionContext.Provider>
  );
}

/** 상세 페이지로 가는 링크 — 커튼 전환을 태운다 */
export function TransitionLink({
  href,
  projectId,
  label,
  className,
  children,
}: {
  href: string;
  projectId: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const go = useContext(TransitionContext);

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        // 새 탭·미들클릭 등 브라우저 기본 동작은 건드리지 않는다
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        go(href, projectId, label);
      }}
    >
      {children}
    </Link>
  );
}
