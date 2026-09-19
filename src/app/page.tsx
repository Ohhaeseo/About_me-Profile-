import FloatingNav from "@/components/FloatingNav";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Teaching from "@/components/sections/Teaching";
import Writing from "@/components/sections/Writing";

/** 단일 페이지 스크롤 구조 — 섹션 순서는 design.md 7절 */
export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-100 focus:rounded-full focus:border focus:border-line focus:bg-panel focus:px-5 focus:py-3 focus:text-sm focus:shadow-nav"
      >
        본문으로 건너뛰기
      </a>

      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Teaching />
        <Experience />
        <Writing />
        <Contact />
      </main>

      <FloatingNav />
    </>
  );
}
