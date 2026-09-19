# design.md — 포트폴리오 디자인 스펙

> 백엔드/풀스택 개발자 포트폴리오 · Next.js 16 + Tailwind v4
> 작성일 2026-08-21 · 레퍼런스 3개를 실제 DOM/CSS로 계측해 작성

---

## 0. 톤 앤 매너 한 줄 정의

**밝은 배경 위에서, 움직임은 아주 작게, 정보는 촘촘하게.**

이 포트폴리오는 "화려한 사이트"가 아니라 **읽히는 사이트**를 목표로 한다.
애니메이션은 시선을 끄는 장치가 아니라 *상태 변화를 알려주는 신호*로만 쓴다.

---

## 1. 레퍼런스와 채택 범위

계측 대상 3곳. **가져오는 것과 버리는 것을 명시**한다.

| # | 레퍼런스 | 가져오는 것 | 버리는 것 |
|---|---|---|---|
| R1 | park-taegeun.github.io | 전체 분위기, 흰 배경, hover 인터랙션 전부, 섹션 구획, 타이포 스케일 | — (거의 전부 채택) |
| R2 | portfolio.biud436.com | 히어로의 **이름 타이핑 효과**와 히어로 구성(아이브로우→이름→CTA→스크롤) | **다크 테마 전부** (zinc-950 배경) |
| R3 | kimjy-portfolio.vercel.app | 프로젝트 **이미지 나열 방식**(메인 뷰어 1 + 하단 썸네일 N) | **다크 테마 + 보라 액센트** |

> R2, R3는 원본이 **다크**다. 우리는 밝은 톤으로 가므로 **메커니즘만 가져오고 색은 전부 재매핑**한다.
> 아래 6.1, 6.3에 다크→라이트 변환표를 명시했다.

### 1.1 R1에서 실측한 값 (그대로 채택)

```
배경     #F6F7F9      본문   #101A2C
폰트     Pretendard Variable / Space Grotesk / IBM Plex Mono
컨테이너  max-w-[1200px]
섹션 구분 border-t 1px solid #DCE1E9   ← 이 헤어라인이 이 사이트의 핵심 시각 장치
네비     fixed bottom-6 left-1/2 -translate-x-1/2   ← 하단 중앙에 떠 있는 알약형
```

### 1.2 R2에서 실측한 값

```
라이브러리        typewriter-effect  (커서 클래스 Typewriter__cursor)
커서             "|" · @keyframes 0% opacity:0 → 50% opacity:1 → 100% opacity:0 · 1s infinite
이름 h1          72px / weight 800 / line-height 1.05 / letter-spacing -1.8px
아이브로우        12px / uppercase / letter-spacing 4.8px (= 0.4em) / weight 600
히어로           min-h-screen · flex items-center justify-center
스크롤 인디케이터  absolute inset-x-0 bottom-8
```

### 1.3 R3에서 실측한 값

```
메인 뷰어      910.5 × 500.8  (aspect-ratio 3840/2112 ≈ 20:11)
              border-radius 14px · border 1px · object-fit contain · cursor pointer
썸네일 스트립   display grid · grid-template-columns repeat(4, 1fr) · gap 20px
썸네일         212.6 × 119.9  (≈ 16:9)
뷰어↔스트립    28px
전환 이징      0.2s cubic-bezier(0.23, 1, 0.32, 1) delay 0.1s   (easeOutQuint)
```

---

## 2. 컬러 토큰

Tailwind v4 `@theme`에 정의한다. **하드코딩된 hex를 컴포넌트에 쓰지 않는다.**

```css
@theme {
  /* 표면 */
  --color-base:        #F6F7F9;  /* 페이지 배경 */
  --color-panel:       #FFFFFF;  /* 카드·패널 */
  --color-panel-sunk:  #F2F4F7;  /* 이미지 레터박스, 코드블록 배경 */

  /* 텍스트 */
  --color-ink:         #101A2C;  /* 제목·본문 */
  --color-ink-soft:    #1A2B4A;  /* 3D 플립 뒷면 등 미묘한 대비 */
  --color-text-sub:    #586173;  /* 부연 설명 */
  --color-text-faint:  #8A93A3;  /* 라벨, 캡션, 메타 */

  /* 선 */
  --color-line:        #DCE1E9;  /* 섹션 구분선, 카드 테두리 */
  --color-line-strong: #C3CAD6;  /* hover 시 강조되는 테두리 */

  /* 액센트 — 이 사이트에서 유일하게 채도가 있는 색 */
  --color-accent:      #0E7C86;  /* 링크, 활성 상태, 강조 수치 */
  --color-accent-soft: #E6F4F5;  /* 액센트 배경 (뱃지, 활성 칩) */
  --color-accent-deep: #0A5A62;  /* 액센트 위 텍스트가 필요할 때 */
}
```

### 2.0 액센트 위 텍스트 / 액센트 hover

액센트 배경 위에 얹는 글자색과, 액센트 버튼의 hover 색은 라이트/다크에서 방향이 반대다.
(라이트는 hover 시 더 어두워지고, 다크는 더 밝아져야 한다.) 그래서 별도 토큰으로 둔다.

```css
--color-on-accent:    #FFFFFF;  /* 액센트 배경 위 텍스트 */
--color-accent-hover: #0A5A62;  /* 액센트 버튼 hover 배경 */
```

### 2.1 다크 모드 토큰

**라이트가 기준이고 다크는 대응값이다.** 색 이름의 의미는 그대로 두고 값만 바꾼다.
`--color-accent-deep`은 "액센트-소프트 위에 얹는 텍스트색"이라는 의미라서 다크에서는 밝은 틸이 된다.

```css
/* 표면 — 순수 검정 대신 잉크색과 같은 계열의 네이비 그레이 */
--color-base:        #0D1117;
--color-panel:       #151B24;
--color-panel-sunk:  #10161E;   /* panel보다 더 가라앉는다 */

/* 텍스트 */
--color-ink:         #E8ECF2;
--color-ink-soft:    #C3CBD8;
--color-text-sub:    #A3AEBF;
--color-text-faint:  #6B7687;

/* 선 */
--color-line:        #232B36;
--color-line-strong: #38434F;

/* 액센트 — 어두운 배경에서는 틸을 밝혀야 대비가 나온다 */
--color-accent:       #3FBDC7;
--color-accent-soft:  #10323A;
--color-accent-deep:  #9FE5EC;
--color-on-accent:    #06222A;
--color-accent-hover: #6FD3DB;
```

**다크 대비 검증 (WCAG)**

| 조합 | 비율 | 판정 |
|---|---|---|
| ink `#E8ECF2` on base `#0D1117` | 15.1:1 | AAA |
| text-sub `#A3AEBF` on base | 8.2:1 | AAA |
| text-faint `#6B7687` on base | 3.6:1 | **AA 미달 — 라이트와 동일하게 라벨 전용** |
| accent `#3FBDC7` on base | 8.5:1 | AAA |
| accent-deep `#9FE5EC` on accent-soft `#10323A` | 9.7:1 | AAA |
| on-accent `#06222A` on accent `#3FBDC7` | 8.9:1 | AAA |

**다크용 그림자** — 잉크색 저투명도로는 어두운 배경에서 보이지 않는다. 검정 고투명도로 바꾼다.

```css
--shadow-soft:  0 10px 30px #00000059;
--shadow-frame: 0 18px 44px #00000066;
--shadow-nav:   0 8px 24px #00000073;
```

**적용 방식** — 시스템 설정을 따르되 사용자 토글이 이긴다.

```css
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }
:root[data-theme="dark"] { … }
```

### 2.2 프로젝트별 액센트

프로젝트 상세 페이지는 그 프로젝트의 성격에 맞는 색으로 갈아입는다.
**토큰 이름과 의미는 그대로 두고 값만 바꾼다.** 컴포넌트는 손대지 않는다.

```html
<article data-project="pulse">  <!-- 이 안의 --color-accent* 가 전부 인디고가 된다 -->
```

| 프로젝트 | 성격 | 라이트 accent | 다크 accent |
|---|---|---|---|
| `pulse` | AI 마케팅 자동화 | 인디고 `#4F46E5` | `#8B87F5` |
| `go` | 웰니스·자기관리 (GO. 브랜드 민트를 밝은 배경용으로 낮춘 값) | 에메랄드 `#047857` | `#4FD1A5` |
| `vr-live` | 실감형 XR | 바이올렛 `#7C3AED` | `#A78BFA` |
| `dspy-ad` | 연구·논문 | 앰버 `#B45309` | `#F0A868` |
| `nullnull` | 도시 데이터 | 블루 `#0369A1` | `#58B6E8` |

각 프로젝트마다 `--color-accent-soft / -deep / --color-on-accent / --color-accent-hover`까지
한 세트로 정의한다. 값은 `globals.css` 하단의 `[data-project=...]` 블록에 있다.

> 기본 틸 `#0E7C86`은 **사이트 공통 색**으로 남는다. 프로젝트 색은 상세 페이지 안에서만 쓴다.

**액센트 교체 지침** — `--color-accent` 한 줄만 바꾸면 사이트 전체 톤이 바뀐다.

- 기본값 `#0E7C86` (틸) — R1의 분위기를 그대로 따름
- 대안 A `#4F46E5` (인디고) — R3의 보라(`#8764FF`)를 밝은 배경용으로 낮춘 값
- 대안 B `#B45309` (앰버) — 따뜻한 인상이 필요할 때

### 2.1 그림자 (밝은 배경 전용)

다크용 그림자(`rgba(0,0,0,0.27)`)를 밝은 배경에 그대로 쓰면 **탁해진다.** 잉크색 기반 저투명도로 쓴다.

```css
--shadow-soft:  0 10px 30px #101A2C0F;   /* 기본 카드 */
--shadow-frame: 0 18px 44px #101A2C14;   /* 이미지 뷰어, 떠 있는 요소 */
--shadow-nav:   0 8px 24px #101A2C1A;    /* 플로팅 네비 */
```

### 2.2 대비 검증 (WCAG)

| 조합 | 비율 | 판정 |
|---|---|---|
| ink `#101A2C` on base `#F6F7F9` | 15.9:1 | AAA |
| text-sub `#586173` on base | 6.3:1 | AA (본문 가능) |
| text-faint `#8A93A3` on base | 3.1:1 | **AA 미달 — 라벨 전용, 본문 금지** |
| accent `#0E7C86` on base | 4.8:1 | AA |
| accent `#0E7C86` on panel `#FFF` | 5.1:1 | AA |

> `--color-text-faint`는 장식용 라벨·타임스탬프에만 쓴다. 읽어야 하는 문장에는 `--color-text-sub` 이상.

---

## 3. 타이포그래피

### 3.1 폰트 3종 역할 분리 (R1 방식)

| 역할 | 폰트 | 쓰는 곳 |
|---|---|---|
| 본문 | **Pretendard Variable** | 한글 본문, 설명, 라벨 값 |
| 한글 디스플레이 | **Wanted Sans Variable** | 히어로 이름, 섹션 큰 제목, 프로젝트 타이틀 |
| 영문 디스플레이 | **Space Grotesk** | 영문 대문자 라벨(`SELECTED PROJECTS`), 로고 |
| 모노 | **IBM Plex Mono** | 수치, 연도, 기술 태그, 코드, 인덱스 번호(`01`, `02`) |

> 한글 디스플레이를 따로 둔 이유 — Pretendard는 본문에서 가장 읽히지만 큰 제목에서는 인상이 약하다.
> Wanted Sans는 자소 폭이 넓고 굵기 대비가 커서 대형 제목에서 또렷하다. **본문에는 쓰지 않는다.**

로딩: Space Grotesk와 IBM Plex Mono는 `next/font/google`.
Pretendard는 **Google Fonts에 없다** — npm 패키지(`pretendard`) 셀프호스팅 또는 jsDelivr CDN.

### 3.2 스케일

```css
--text-hero:  clamp(56px, 9vw, 132px);   /* 히어로 이름 */
--text-h1:    clamp(44px, 6vw, 88px);    /* 프로젝트 타이틀 */
--text-h2:    clamp(34px, 4.5vw, 64px);  /* 섹션 헤드라인 */
--text-h3:    clamp(22px, 2.4vw, 30px);
--text-body:  17px;   /* line-height 1.75 — 한글은 넉넉하게 */
--text-sm:    14px;
--text-label: 12px;   /* uppercase + letter-spacing 0.4em */
```

**한글 트래킹 규칙** — 큰 제목일수록 조인다.

- 44px 이상 → `letter-spacing: -0.03em`
- 17~24px → `-0.01em`
- 12px 라벨(영문 대문자만) → `+0.4em`

한글에 `+0.4em`을 적용하면 자간이 깨진다. **대문자 영문 라벨에만 적용한다.**

---

## 4. 레이아웃

```
컨테이너   max-width: 1200px · margin-inline: auto
좌우 패딩  clamp(20px, 5vw, 80px)
섹션 상하  clamp(96px, 12vw, 180px)
히어로     min-height: 100dvh
카드 반경  14px   (R1/R3 모두 14px — 통일)
```

### 4.1 섹션 경계 = 헤어라인

이 디자인에서 섹션을 나누는 것은 **배경색 변화가 아니라 1px 선**이다.

```html
<section class="border-t border-line">
```

배경을 번갈아 칠하지 않는다. `--color-base` 하나로 끝까지 가고, 카드만 `--color-panel`(흰색)로 띄운다.
이게 R1의 "밝고 정돈된" 인상의 핵심이다.

### 4.2 브레이크포인트

| | 폭 | 컨테이너 패딩 | 갤러리 썸네일 |
|---|---|---|---|
| mobile | < 640 | 20px | 2열, gap 12px |
| tablet | 640–1024 | 40px | 3열, gap 16px |
| desktop | > 1024 | 1200px 고정 | 4열, gap 20px |

---

## 5. 모션 토큰

```css
--motion-fast:  0.16s;   /* 색 변화, 오파시티 */
--motion-base:  0.28s;   /* hover 변형 (scale, translate) */
--motion-slow:  0.6s;    /* 스크롤 등장 */
--motion-room:  0.9s;    /* 히어로 진입 */

--ease-default: cubic-bezier(0.22, 1, 0.36, 1);   /* R1 — 대부분 여기 */
--ease-quint:   cubic-bezier(0.23, 1, 0.32, 1);   /* R3 — 갤러리 전환 */
```

### 5.1 절대 규칙

1. **`transition: all` 금지.** 변하는 속성만 명시한다.
2. 애니메이션은 `transform`과 `opacity`만. `width`/`height`/`top`/`left`는 애니메이션하지 않는다.
3. `prefers-reduced-motion: reduce`에서 **모든 모션을 끈다.** 타이핑 효과는 완성된 텍스트를 즉시 표시한다.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. 컴포넌트 스펙

### 6.1 히어로 — 이름 타이핑 (R2에서 채택, 라이트로 변환)

**구성 (위 → 아래)**

```
[아이브로우]   BACKEND ENGINEER        12px · uppercase · tracking 0.4em · accent
[이름]        홍길동|                  hero 크기 · weight 800 · tracking -0.03em · ink
[한 줄 소개]   결제 트래픽을 다루는 …     20px · text-sub
[CTA 2개]     프로젝트 보기 / 이력서      primary + ghost
[스크롤]      SCROLL ↓                bottom-8 · text-faint
```

**다크 → 라이트 변환표**

| R2 원본 | 우리 값 |
|---|---|
| 배경 `zinc-950 #09090B` + 그라데이션 오버레이 | `--color-base #F6F7F9`, 오버레이 **제거** |
| 이름 `text-white` | `--color-ink #101A2C` |
| 아이브로우 `text-indigo-300 #A5B4FC` | `--color-accent #0E7C86` |
| 스크롤 `text-zinc-500` → `hover:text-zinc-300` | `--color-text-faint` → hover `--color-ink` |
| 이름 폰트 `Roboto Slab` (세리프) | **Pretendard** — 한글 이름을 쓸 것이므로 세리프는 부적합 |

**타이핑 동작 명세**

```
타이핑 속도   문자당 90ms
시작 지연     400ms  (진입 애니메이션이 끝난 뒤)
커서         "|"  또는 width 2px 블록
커서 깜빡임   1s infinite · opacity 0 → 1 → 0   (R2 키프레임 그대로)
완료 후      커서 유지. 지웠다 다시 쓰는 루프는 하지 않는다 — 산만하다.
```

**한글 타이핑 주의**
한글은 조합형이지만 `text.slice(0, i)`는 완성된 글자 단위로 잘리므로 정상 동작한다.
다만 한글 이름은 3~4글자라 금방 끝난다. **직함까지 같이 타이핑**하는 편이 낫다 — 예: `홍길동 · Backend Engineer`

**레이아웃 시프트 방지**
타이핑 중 컨테이너 높이가 변하면 안 된다. 최종 텍스트를 `visibility: hidden`으로 깔아 자리를 잡고 그 위에 절대배치하거나, `min-height`를 고정한다.

**접근성**
타이핑 영역에 `aria-label="홍길동 · Backend Engineer"`를 주고 내부는 `aria-hidden`. 스크린리더가 한 글자씩 읽는 사고를 막는다.

---

### 6.2 Hover 인터랙션 (R1 — 이 사이트의 정체성)

R1의 hover는 **전부 미세하다.** 이 절제가 "고급스러움"의 정체다. 실측값 그대로 쓴다.

| 효과 | 값 | 적용 대상 |
|---|---|---|
| 카드 부상 | `translateY(-8px)` | 프로젝트 카드, 글 카드 |
| 미세 확대 | `scale(1.01)` ~ `scale(1.02)` | 카드, 이미지 |
| 미세 기울기 | `rotate(±0.8deg)` | 이미지, 썸네일 |
| 배경 틴트 | `color-mix(in oklab, var(--color-ink) 2%, transparent)` | 리스트 행 |
| 화살표 이동 | `translateX(4px)` ~ `translateX(8px)` | `→` 아이콘 |
| 밑줄 스윕 | `scaleX(0) → scaleX(1)`, `transform-origin: left` | 텍스트 링크 |
| 색 전환 | `--color-text-sub` → `--color-accent` | 링크 텍스트 |
| 숨김 요소 노출 | `opacity: 0 → 1` | 카드 위 메타 정보 |

전부 `--motion-base (0.28s)` + `--ease-default`.

> **넘지 말 것** — `scale`은 1.02를 넘지 않고, `rotate`는 1deg를 넘지 않는다.
> 1.05 확대나 3deg 기울기는 이 톤에서 즉시 싸구려로 보인다.

**구현 패턴** — Tailwind `group` 사용

```html
<article class="group border border-line rounded-[14px] bg-panel
                transition-[transform,box-shadow,border-color] duration-[0.28s]
                hover:-translate-y-2 hover:shadow-frame hover:border-line-strong">
  <img class="transition-transform duration-[0.28s]
              group-hover:scale-[1.02] group-hover:rotate-[0.8deg]">
  <span class="transition-transform duration-[0.28s] group-hover:translate-x-1">→</span>
</article>
```

#### 6.2.1 글자 3D 플립 (R1의 시그니처)

R1의 프로젝트 제목은 **글자마다 개별 3D 플립**한다. DOM 실측 결과:

```html
<span style="transform-style: preserve-3d">            <!-- 글자 카드 -->
  <span style="backface-visibility: hidden">음</span>   <!-- 앞면: ink -->
  <span style="position: absolute; inset: 0;
               backface-visibility: hidden;
               transform: rotateX(180deg);
               color: #1A2B4A">음</span>                <!-- 뒷면: ink-soft -->
</span>
```

hover 시 각 카드가 `rotateX(180deg)`, **인덱스마다 지연을 줘서 물결처럼** 넘어간다.

```
회전    rotateX(0deg → 180deg)
지속    0.4s · --ease-default
스태거  글자당 +30ms
원근    부모에 perspective: 600px
```

**적용 범위** — 프로젝트 제목처럼 **짧고 큰 텍스트에만**. 본문에 쓰면 읽기가 불가능해진다.
**접근성** — 부모에 `aria-label`로 원문 전체를 주고 글자 span들은 `aria-hidden="true"`.

---

### 6.3 프로젝트 이미지 갤러리 (R3에서 채택, 라이트로 변환)

첨부해주신 화면 그대로의 구조. **메인 뷰어 1장 + 하단 썸네일 그리드.**

```
┌──────────────────────────────────────┐
│                                      │
│          메인 뷰어 (20:11)            │  ← 선택된 이미지
│                                      │
└──────────────────────────────────────┘
                ↕ 28px
┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
│  1  │   │  2  │   │  3  │   │  4  │    ← 16:9 · 4열 grid · gap 20px
└─────┘   └─────┘   └─────┘   └─────┘
   ▲ 활성: accent 2px 테두리 + accent-soft 링
```

**메인 뷰어 스펙**

| 속성 | R3 원본 (다크) | 우리 값 (라이트) |
|---|---|---|
| aspect-ratio | `3840/2112` (≈20:11) | 동일 |
| border-radius | `14px` | 동일 |
| border | `1px solid #404149` | `1px solid var(--color-line)` |
| box-shadow | `0 20px 34px rgba(0,0,0,.267)` | `var(--shadow-frame)` = `0 18px 44px #101A2C14` |
| object-fit | `contain` | 동일 |
| 레터박스 배경 | `#141419` | **`var(--color-panel-sunk)` `#F2F4F7`** |
| cursor | `pointer` (확대) | 동일 |

> **레터박스 배경이 이 변환의 핵심.**
> `object-fit: contain`이라 이미지 비율이 안 맞으면 배경이 드러난다.
> 다크 사이트는 `#141419`로 자연스럽게 녹지만, 밝은 배경에 그 색을 쓰면 **검은 띠**가 생긴다.
> 반드시 `#F2F4F7`처럼 배경보다 아주 살짝 어두운 중성색을 쓴다.

**썸네일 스트립 스펙**

```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 20px;                    /* R3 실측 */
```

| 상태 | 스타일 |
|---|---|
| 기본 | `border: 1px solid var(--color-line)` · `opacity: 0.65` |
| hover | `opacity: 1` · `translateY(-2px)` · `border-color: var(--color-line-strong)` |
| **활성** | `opacity: 1` · `border: 2px solid var(--color-accent)` · `box-shadow: 0 0 0 3px var(--color-accent-soft)` |

> R3는 활성 썸네일에 보라(`#8764FF`) 테두리를 쓴다. 우리는 `--color-accent`로 치환.
> 밝은 배경에서는 테두리만으로 약하므로 **바깥에 `accent-soft` 링을 하나 더 두른다.**

**전환** — `0.2s var(--ease-quint) 0.1s` (R3 실측값 그대로). 메인 이미지 교체 시 `opacity` 크로스페이드.

**이미지 제작 규칙** (첨부 스크린샷에서 읽은 컨벤션)

- 모바일 앱 프로젝트는 **폰 목업 3~5개를 겹쳐 배치한 한 장**으로 만든다. 스크린샷 낱장을 그대로 올리지 않는다.
- 웹 프로젝트는 브라우저 크롬을 씌운 와이드 샷.
- 백엔드 프로젝트는 **아키텍처 다이어그램 / 부하 테스트 그래프 / 트레이싱 스크린샷**이 그 자리를 대신한다.
- 원본 최소 1920px 폭. `next/image`로 서빙.

**키보드 접근성** — 썸네일은 `<button>`. `role="tablist"` / `role="tab"` + `aria-selected`, 좌우 화살표로 이동.

---

### 6.4 플로팅 네비게이션 (R1)

```css
position: fixed;
bottom: 24px;
left: 50%;
transform: translateX(-50%);
z-index: 50;
```

알약형 캡슐. `background: var(--color-panel)`, `border: 1px solid var(--color-line)`,
`box-shadow: var(--shadow-nav)`, `backdrop-filter: blur(8px)`.

활성 섹션은 `IntersectionObserver`로 감지해 액센트 표시.
**모바일에서는 숨기거나** 아이콘만 남긴다 — 하단 24px는 iOS 홈 인디케이터와 겹치므로 `env(safe-area-inset-bottom)`을 고려한다.

### 6.5 스크롤 등장

```
초기    opacity: 0 · translateY(24px)
최종    opacity: 1 · translateY(0)
지속    --motion-slow (0.6s) · --ease-default
트리거  IntersectionObserver · threshold 0.15 · once: true
스태거  리스트 자식마다 +60ms
```

**한 번만 실행한다.** 스크롤을 올렸다 내릴 때마다 다시 나타나면 피로하다.

---

## 7. 페이지 구조

백엔드/풀스택 기준 섹션 순서. R1의 구획을 따르되 백엔드 서사에 맞게 조정.

```
1. HERO         이름 타이핑 · 한 줄 정의 · CTA            → 6.1
2. ABOUT        어떤 문제를 푸는 사람인가 + 프로필/연락처
3. HOW I WORK   일하는 원칙 3~4개 (번호 01~04)            ← R1의 강한 장치
4. STACK        기술 스택 (모노 폰트 태그 그리드)
5. PROJECTS     프로젝트 2~4개 · 각각 갤러리 포함          → 6.3
6. EXPERIENCE   경력/학력 타임라인
7. WRITING      블로그·기술 글 (있으면)
8. CONTACT      GitHub / 이메일 / 이력서 PDF
```

### 7.1 프로젝트 카드 서사 구조

백엔드 포폴은 **기능 나열이 아니라 판단 기록**이어야 한다. R1이 이 구조를 잘 쓴다.

```
[인덱스]     01 · 문제→해결                모노 · text-faint
[제목]       결제 정산 배치 재설계           h1 · 3D 플립 (6.2.1)
[메타]       2025.03–2025.08 · 백엔드 단독
[스택 태그]  Spring Boot / Kafka / Redis   모노 칩
[갤러리]                                   (6.3)
[한 줄 성과] 정산 지연 4시간 → 11분          ← 액센트 색 · 큰 숫자
[문제]       …
[핵심 판단]  …                             ← 왜 그 선택을 했는지. 여기가 제일 중요하다.
[검증]       부하 테스트 / 지표 / 롤백 기준
```

**수치는 액센트 색 + 모노 폰트**로 크게. 백엔드 포폴에서 숫자가 유일한 증거다.

---

## 8. React Bits 컴포넌트 후보

reactbits.dev 전체 카탈로그 확인 완료.
**Text Animations 32 / Animations 37 / Components 44 / Backgrounds 53 = 166개**

**설치 방식**

```bash
npx shadcn@latest add @react-bits/SplitText-TS-TW
```

- 형식: `@react-bits/<Component>-<JS|TS>-<CSS|TW>` → 우리는 **`-TS-TW`**
- jsrepo 레지스트리도 동일 소스를 제공한다. MCP 서버도 있다 (docs > MCP).
- 수동 복사도 가능 — 컴포넌트 페이지 > Code 탭 > 스택 선택 후 복사
- 대부분 `gsap` 또는 `motion`(framer-motion) 의존. WebGL 계열은 `ogl`/`three` 필요 — **번들 크기를 반드시 확인.**

### 8.1 우선 채택 (레퍼런스 3개에 직접 대응)

| 컴포넌트 | 경로 | 어디에 |
|---|---|---|
| **Text Type** | `/text-animations/text-type` | **6.1 히어로 이름 타이핑 — R2 대체** |
| **Split Text** | `/text-animations/split-text` | 섹션 헤드라인 글자별 등장 |
| **Count Up** | `/text-animations/count-up` | **프로젝트 성과 수치** (백엔드 포폴 핵심) |
| **Animated Content** | `/animations/animated-content` | 6.5 스크롤 등장 |
| **Fade Content** | `/animations/fade-content` | 위와 동일, 더 단순 |
| **Glare Hover** | `/animations/glare-hover` | 6.2 카드 hover 광택 |
| **Spotlight Card** | `/components/spotlight-card` | 프로젝트 카드 |
| **Tilted Card** | `/components/tilted-card` | 6.2 미세 기울기 — **강도 반드시 낮출 것** |
| **Pill Nav** | `/components/pill-nav` | 6.4 하단 플로팅 네비 |
| **Dock** | `/components/dock` | 6.4 대안 |

### 8.2 갤러리 계열 (6.3 보강용)

| 컴포넌트 | 용도 |
|---|---|
| `/components/carousel` | 썸네일이 5개를 넘을 때 |
| `/components/stack` | **폰 목업 겹쳐 쌓기** — 첨부 스크린샷의 그 느낌 |
| `/components/bounce-cards` | 위와 유사, 더 경쾌 |
| `/components/masonry` | 이미지 수가 불규칙할 때 |
| `/components/circular-gallery`, `/components/dome-gallery` | 화려함 우선 시 (이 톤에는 과할 수 있음) |

> 다만 **6.3의 메인+썸네일 구조는 직접 구현이 더 간단하고 제어가 쉽다.**
> React Bits는 "겹쳐진 목업" 연출(`stack`)에만 쓰는 것을 권장한다.

### 8.3 보조

| 컴포넌트 | 용도 |
|---|---|
| `/animations/logo-loop` | 기술 스택 마퀴 |
| `/animations/click-spark` | 클릭 피드백 (아주 약하게) |
| `/animations/magnet` | CTA 버튼 자석 효과 |
| `/text-animations/scroll-reveal`, `/text-animations/scroll-float` | 긴 문단 등장 |
| `/text-animations/shiny-text` | 이름/로고 광택 1회 |
| `/components/animated-list` | 경력 타임라인 |
| `/components/stepper` | 프로젝트 진행 단계 |

### 8.4 밝은 배경에서 주의할 것

React Bits의 **Backgrounds 53개는 대부분 다크 전제**로 디자인돼 있다.
`galaxy`, `aurora`, `dark-veil`, `letter-glitch`, `lightning`, `plasma`, `hyperspeed`, `liquid-chrome`, `prismatic-burst`, `light-rays` 등은 **밝은 배경에 올리면 깨진다.**

밝은 톤에서 시도해볼 만한 것 (**적용 전 실제 확인 필수 — 데모는 전부 검은 배경이라 눈으로 봐야 안다**):

- `/backgrounds/dot-grid`, `/backgrounds/dot-field` — 점 색만 `--color-line`으로
- `/backgrounds/topography` — 등고선. 선 색 교체하면 라이트에서 잘 맞는다
- `/backgrounds/grid-scan`, `/backgrounds/line-waves`

> 단, **이 디자인의 원칙은 "배경은 비운다"** (4.1).
> 배경 이펙트는 히어로 한 곳에만, 그것도 `opacity` 0.4 이하로 아주 약하게 쓰거나 **아예 쓰지 않는 쪽**을 권한다.

### 8.5 채택 기준

React Bits 컴포넌트를 넣기 전에 세 가지를 확인한다.

1. **밝은 배경에서 확인했는가** — 데모는 전부 검은 배경이다.
2. **5.1 모션 규칙을 지키는가** — `transition: all`, `scale > 1.02`, `rotate > 1deg`면 값을 낮춰서 쓴다.
3. **번들 비용이 값어치를 하는가** — `three`/`ogl` 하나가 배경 하나 때문에 들어오면 재고한다.

---

## 9. 접근성 체크리스트

- [ ] 모든 이미지에 의미 있는 `alt` (장식용은 `alt=""`)
- [ ] 타이핑·플립 텍스트는 `aria-label`로 원문 제공, 내부 `aria-hidden`
- [ ] 갤러리 썸네일은 `<button>` + `role="tab"` + `aria-selected` + 화살표 키 이동
- [ ] 포커스 링 유지 — `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }`
- [ ] `prefers-reduced-motion` 전면 대응 (5.1)
- [ ] `--color-text-faint`는 본문에 쓰지 않음 (2.2)
- [ ] 플로팅 네비가 하단 콘텐츠를 가리지 않도록 `body` 하단 패딩 확보
- [ ] 키보드만으로 전 섹션 이동 가능

---

## 10. 성능 기준

- 이미지 전부 `next/image`. 갤러리 첫 장만 `priority`, 나머지는 lazy.
- 프로젝트 이미지 원본 1920px+, WebP/AVIF 자동 변환에 맡긴다.
- 폰트 `display: swap`. Pretendard는 서브셋 우선 검토 — 전체 Variable은 무겁다.
- 애니메이션 라이브러리는 **하나만**. `gsap`과 `motion`을 동시에 넣지 않는다.
  → **`motion` 권장** (React 친화적이고, R1도 이걸 쓴다)
- 목표: Lighthouse Performance 90+, LCP < 2.5s

---

## 11. 아직 정해지지 않은 것

문서를 확정하려면 다음이 필요하다.

1. **이름 / 직함** — 히어로 타이핑 문자열 (6.1). 한글 이름이면 직함까지 붙여 타이핑.
2. **액센트 색 확정** — 기본값은 틸 `#0E7C86` (2절).
3. **프로젝트 목록과 이미지** — 갤러리(6.3)는 프로젝트당 이미지 3~5장 전제.
4. **배경 이펙트 사용 여부** — 8.4. 기본 입장은 "쓰지 않음".
5. **다크 모드 지원 여부** — 현재 스펙은 **라이트 전용**. 지원하려면 2절 토큰 전체에 다크 대응값이 필요하다.
