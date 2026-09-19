/**
 * 글자 3D 플립 (design.md 6.2.1)
 * 짧고 큰 텍스트 전용. 부모에 perspective, 글자마다 +30ms 스태거.
 * 부모 카드에 `group/card`가 있으면 카드 hover에도 함께 반응한다.
 *
 * 앞뒷면은 반드시 block이어야 한다 — inline 박스에는 backface-visibility가
 * 적용되지 않아 회전 중 앞뒤가 동시에 보이고 글자가 깨진다. (.flip-face)
 * 단어 단위로 한 번 더 묶어 단어 중간에서 줄바꿈되지 않게 한다.
 */
export default function FlipTitle({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  let index = 0;

  return (
    <span
      aria-label={text}
      className={`group/flip inline-flex flex-wrap gap-x-[0.28em] [perspective:600px] ${className}`}
    >
      {words.map((word, w) => (
        <span key={`${word}-${w}`} aria-hidden="true" className="inline-flex">
          {Array.from(word).map((char, c) => {
            const delay = index * 30;
            index += 1;
            return (
              <span
                key={`${char}-${c}`}
                style={{ transitionDelay: `${delay}ms` }}
                className="relative inline-block [transform-style:preserve-3d] transition-transform duration-[0.4s] ease-default group-hover/flip:[transform:rotateX(180deg)] group-hover/card:[transform:rotateX(180deg)]"
              >
                <span className="flip-face">{char}</span>
                <span className="flip-face absolute inset-0 text-ink-soft [transform:rotateX(180deg)]">
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
