import Image from "next/image";

/**
 * 히어로 배경 — 일러스트를 화면 전체에 깔고 가장자리를 배경색으로 녹인다.
 *
 * 사진이 아니라 이미 일러스트라서 후처리 필터는 걸지 않는다.
 * 대신 (1) 사방 마스크로 액자처럼 잘린 느낌을 없애고
 *     (2) 글이 놓이는 왼쪽에 배경색 스크림을 덮어 가독성을 확보한다.
 * 스크림은 --color-base를 쓰므로 라이트/다크에서 자동으로 뒤집힌다.
 */
export default function PosterPortrait({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <div className="relative h-full w-full">
        <Image
          src="/images/portrait-illust.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_54%] [mask-image:radial-gradient(126%_116%_at_68%_48%,#000_34%,transparent_88%)]"
        />

        {/* 왼쪽 스크림 — 글이 놓이는 쪽만 배경색으로 덮는다 */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-base)_18%,color-mix(in_oklab,var(--color-base)_74%,transparent)_45%,transparent_72%)]" />
        {/* 위아래 페이드 — 섹션 경계에서 뚝 끊기지 않게 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-base)_0%,transparent_20%,transparent_74%,var(--color-base)_100%)]" />
      </div>
    </div>
  );
}
