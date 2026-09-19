# 인수인계 — 오해서 포트폴리오 사이트

> 작성일 2026-09-19 · 다음 세션이 이어받기 위한 현재 상태 정리
> 함께 읽을 것: [CLAUDE.md](CLAUDE.md) (작업 규칙), [design.md](design.md) (디자인 단일 진실 공급원)

---

## 0. 한눈에

- **위치**: `C:\About_me`
- **스택**: Next.js 16.3.2 (App Router, Turbopack) · React 19 · Tailwind v4 (`@theme` 토큰, config 파일 없음) · TypeScript strict
- **git**: 2026-09-20 초기 커밋, 원격 `https://github.com/Ohhaeseo/About_me-Profile-.git` (`main`). `public/`이 약 100MB(영상 45MB)라 클론이 무겁다
- **상태**: 빌드 통과 · 정적 페이지 9개 · 프로덕션 콘솔 에러 0건
- **참고 원본**: `C:\OH_profile` (이전 포트폴리오, 프로필·이미지 출처) — 읽기 전용으로만 사용
- **PULSE 원본 문서**: `C:\programworks\PULSE\**\*.md` (상세 페이지 근거)

```bash
npm run dev
```

---

## 1. 구조

```
src/
  app/
    layout.tsx              폰트 4종, 메타데이터, 테마 무플래시 스크립트, TransitionProvider
    page.tsx                메인 한 페이지 — 섹션 조립
    globals.css             @theme 토큰 전부 + 유틸 + 다크/프로젝트 액센트 오버라이드
    projects/[id]/page.tsx  프로젝트 상세 (SSG 5개)
    activities/[id]/page.tsx 활동 상세 (SSG 1개 — 바이브코딩 강의). 프로젝트가 아니라 data-project 없음, 공통 틸
  components/
    Section.tsx             섹션 껍데기 (default / compact / inline 3가지)
    Reveal.tsx              스크롤 등장 (IntersectionObserver, once)
    TypeLine.tsx            히어로 이름 타이핑
    FlipTitle.tsx           글자 3D 플립
    Gallery.tsx             메인 뷰어 + 썸네일 + 라이트박스
    CountUp.tsx             수치 카운트업
    Roadmap.tsx             연도 로드맵 (가로/세로)
    FloatingNav.tsx         하단 알약 네비
    ThemeToggle.tsx         라이트/다크 토글
    PosterPortrait.tsx      히어로 배경 일러스트
    contact/BusinessCard.tsx      3D 명함
    project/ProjectSwitcher.tsx   상세 상단 프로젝트 스위처
    project/TransitionProvider.tsx 색 커튼 페이지 전환 + TransitionLink
    project/DeepDive.tsx    상세 심화 섹션 렌더러
    activity/LectureDeck.tsx 강의안 iframe 뷰어 (열기 전엔 로드 안 함, 1280x720으로 그린 뒤 틀 폭에 맞춰 scale)
    project/DemoVideo.tsx   시연 영상 (세로 영상이면 폭 제한 + 설명을 옆에)
    project/PdfViewer.tsx   원본 문서 뷰어 (쪽 이미지 스크롤 틀 + 쪽수 + 원본 PDF 링크)
    sections/               Hero · About · Stack · Projects · Teaching · Experience · Writing · Contact
  content/
    profile.ts              프로필·연락처·성격·원칙·스택·네비
    projects.ts             프로젝트 5개 + 사이드 작업
    experience.ts           수상·활동·로드맵·논문 (RecordItem.href가 있으면 상세 링크가 붙는다)
    teaching.ts             활동 상세 데이터 — 바이브코딩 강의 3주차
public/
  images/   프로젝트 스크린샷, 프로필 사진, 히어로 일러스트
  icons/    기술 로고 18종 (devicon → 단색 변환)
  resume/   포트폴리오 PDF
  lectures/ 강의안 단일 HTML 3개 (합계 18MB)
  videos/   시연 영상 mp4 (go-demo.mp4 46MB — 배포 전 압축 또는 외부 호스팅 검토)
  docs/     프로젝트 원본 문서 PDF + 쪽별 webp (docs/<id>/page-NN.webp)
```

### 메인 페이지 섹션 순서

`Hero → About(2패널) → Stack → Projects(도입 + 프로젝트 5패널 + Also Built) → Teaching(1패널) → Experience → Writing → Contact`

---

## 2. 반드시 지켜야 할 규칙

CLAUDE.md에 있는 것 외에, 이번 작업에서 반복해서 걸렸던 것들.

### 2.1 모노 폰트는 숫자·ASCII 전용

`--font-mono`(IBM Plex Mono)에 **한글 글리프가 없어서**, 한글에 `font-mono`를 걸면 공백만 모노 폭이 되어 자간이 벌어진다.
`eyebrow`의 `letter-spacing: 0.4em`도 **영문 대문자 전용**이다 (design.md 3.2).

| 상황 | 쓸 것 |
|---|---|
| 숫자·연도·API 경로·기술 태그 | `font-mono` |
| 영문 대문자 라벨 (`ABOUT`, `STACK`) | `eyebrow` |
| **한글 소형 라벨** (`타겟`, `문제 정의`) | **`label-ko`** |
| 한글 문장 | 기본(Pretendard) |

이 실수는 이미 4번 반복됐다. 새 라벨을 넣을 때마다 확인할 것.

### 2.2 큰 제목에 `ch` 단위 금지

`max-w-[26ch]`는 폰트 크기를 따라가서, 46px 제목에서는 약 350px로 좁아진다.
제목 컨테이너는 `max-w-[min(100%,820px)]`처럼 px로 잡는다.

### 2.3 한글 제목 줄바꿈은 콘텐츠에서 직접

자동 줄바꿈은 어절을 이상하게 끊는다.
제목 문자열에 `\n`을 넣고 `whitespace-pre-line`으로 받는다. `Section`의 `title`이 이미 지원한다.

### 2.4 heredoc으로 TS 문자열 쓸 때 `\n` 주의

bash heredoc이나 `node -e` 안에서 `\\n`을 쓰면 **실제 줄바꿈**이 들어가 문자열이 깨진다 (빌드 실패: `Unterminated string constant`).
이번 세션에서 3번 발생했다. **`\n`이 들어가는 편집은 Write/Edit 툴을 쓸 것.**

### 2.5 폰트 역할 (design.md 3.1)

| 역할 | 폰트 | 쓰는 곳 |
|---|---|---|
| 본문 | Pretendard Variable | 한글 본문·설명 |
| 한글 디스플레이 | **Wanted Sans Variable** | 히어로 이름, 섹션 큰 제목, 프로젝트 타이틀 (`font-display-ko`) |
| 영문 디스플레이 | Space Grotesk | 영문 대문자 라벨 (`eyebrow`) |
| 모노 | IBM Plex Mono | 수치·연도·태그·인덱스 |

둘 다 npm 셀프호스팅 + 동적 서브셋. CDN 아님.

---

## 3. 색 체계

### 3.1 기본

`globals.css`의 `@theme`에 라이트 토큰, 그 아래 `@media (prefers-color-scheme: dark)`와 `:root[data-theme="dark"]`에 다크 대응값.
사이트 공통 액센트는 **틸 `#0E7C86`**.

### 3.2 프로젝트별 액센트 (design.md 2.2)

`[data-project="<id>"]`를 요소에 붙이면 그 안의 액센트 토큰 5개가 통째로 바뀐다.

| id | 라이트 | 다크 |
|---|---|---|
| `pulse` | 인디고 `#4F46E5` | `#8B87F5` |
| `go` | 에메랄드 `#047857` | `#4FD1A5` |
| `vr-live` | 바이올렛 `#7C3AED` | `#A78BFA` |
| `dspy-ad` | 앰버 `#B45309` | `#F0A868` |
| `nullnull` | 블루 `#0369A1` | `#58B6E8` |

**프로젝트를 추가하면 여기에 라이트/다크 한 세트씩 추가해야 한다.** 빠뜨리면 그 프로젝트만 사이트 기본 틸로 나온다.

토큰 5개: `--color-accent`, `--color-accent-soft`, `--color-accent-deep`(soft 위 텍스트), `--color-on-accent`(accent 위 텍스트), `--color-accent-hover`.

---

## 4. 프로젝트 추가하는 법

[projects.ts](src/content/projects.ts)에 객체 하나 넣으면 아래가 **전부 자동**으로 늘어난다.

- 메인 인덱스 리스트 (`{projects.length}개 프로젝트` 문구 포함)
- 메인 프로젝트 패널 (한 화면당 하나)
- 상세 페이지 SSG (`generateStaticParams`)
- 상단 프로젝트 스위처
- 이전/다음 순환 네비

**수동으로 해야 할 것은 `globals.css`의 프로젝트 색 한 세트뿐이다.**

### 필수 필드

`id · no · pitch · brief · architecture · kicker · title · subtitle · period · role · stack · gallery · metrics · problem · decisions · validation`
(`award`, `deepDive`, `document`는 선택)

### `demo` (선택) — 시연 영상

`public/videos/`의 mp4. `width`/`height`는 영상 실제 픽셀 크기를 넣는다 (세로면 레이아웃이 바뀐다).
포스터 이미지가 없으면 `posterTime`(초) 장면을 첫 화면으로 보여준다. 이 PC에는 ffmpeg가 없어 프레임 추출·압축을 못 했다.

### `document` (선택) — 원본 문서 뷰어

Screens · Demo 아래에 스크롤 틀로 그려진다. 현재 GO.(14쪽)와 NULL NULL AI(28쪽)에 있다. 가로 슬라이드는 뷰어가 자동으로 더 넓게(1040px) 잡는다.
쪽 목록은 `docPages(dir, alts)` 헬퍼로 만든다 — alt 배열 길이가 곧 쪽수다.
브라우저 내장 PDF 뷰어는 모바일에서 인라인 렌더가 안 돼서, PDF를 쪽별 webp로 풀어 싣고 원본은 링크로 연다.
새 문서를 넣을 때: PDF를 `public/docs/<name>.pdf`로 복사 (파일명 ASCII) → PyMuPDF로 폭 1400~1600px 렌더 → Pillow로 webp 저장 → `pages`에 쪽별 alt와 함께 등록. **올리기 전에 PDF 안의 개인정보(이름·연락처)를 확인할 것.**

### `deepDive` (선택) — 상세 심화 섹션

블록별로 있는 것만 그려진다. 현재 PULSE와 AD Video Generation(`dspy-ad`)에 채워져 있다.
렌더 순서: `contributions → flow → code → weights → results → spec → status`

| 블록 | 쓰임 |
|---|---|
| `contributions` | 내가 맡은 부분 — 왜 / 어떻게 / 불릿 |
| `flow` | 단계별 파이프라인 (좌측 레일 + 번호) |
| `code` | 코드 조각. `source`는 **ASCII만** (2.1 모노 폰트 규칙) |
| `weights` | 점수 모델 가중치 막대 |
| `results` | 조건별 비교 표. 열마다 `best: max/min/none`으로 강조 값 자동 계산, `focus` 행에 액센트 배경. 좁은 화면에서는 표 안에서만 가로 스크롤 |
| `spec` | 숫자·규격 명세 표 3열 |
| `status` | 실연동 / 미연동 2단 비교 |

---

## 5. 지금까지 한 작업 요약

세션 순서대로.

1. design.md 스펙대로 초기 구축 — 토큰·섹션 8개·갤러리·플로팅 네비
2. OH_profile 데이터 이식, 프로젝트 서사를 `문제 → 핵심 판단 → 검증`으로 재작성
3. 다크모드 (시스템 자동 + 토글, localStorage, 무플래시)
4. 프로젝트 상세 페이지 분리 (`/projects/[id]`), 프로젝트별 색감
5. 히어로 2단 재구성 → 일러스트 풀블리드 배경으로 교체
6. About에 How I Work 통합, 프로필 정보 카드 (좌우 높이 일치)
7. Recognition 강조 방식 개편, Record 로드맵 추가
8. Stack에 기술 로고 18종
9. Contact 3D 명함, 프로젝트 색 커튼 전환
10. PULSE 상세에 심화 섹션 5개 (MD 8개 근거)
11. AD Video Generation 상세 구체화 — 논문 06-21 판본 기준으로 본문 정정, 심화 섹션 7개, `code` · `results` 블록 신설
12. NULL NULL AI 상세에 기획 문서 PDF 뷰어 추가 (`document` 필드) → 이후 최종 발표자료 28쪽으로 교체
13. Stack 카드 압축(패딩·간격 축소)과 머리줄 개편 — 색 칩 + 굵은 라벨
14. 메인 프로젝트 GO.(고점) 추가 — 2번 배치, 나머지 번호 하나씩 뒤로. 시연 영상 · 발표자료 뷰어 · 심화 섹션 6개
    근거 문서: `C:\AAC_gojeomAI\` (PRD.md, backend/ARCHITECTURE.md, docs/*.md)

15. 활동 상세 라우트 신설 — AI 디지털 배움터 바이브코딩 강의. 강의안 HTML 3개 렌더, Record·Roadmap·Stack에 반영
16. 메인에 Teaching 섹션 신설 — Projects와 Record 사이, 프로젝트 패널과 같은 한 화면 크기. 하단 네비에도 Teaching 추가.
    우측 시각 자료는 덱 표지 캡처 3장 (`public/images/teaching-week{1,2,3}.webp`) — 헤드리스 Edge로 찍었다:
    `msedge --headless=new --window-size=1280,720 --screenshot=out.png http://localhost:3000/lectures/vibecoding-week1.html`
    강의 횟수는 **총 6회**(사용자 확인). 관리 화면 캡처의 10행을 그대로 세지 말 것.
17. Record에 멋쟁이사자처럼 14기 중앙 해커톤 참여(2026.08) 추가, 로드맵 2026에 반영

### 강의안 HTML을 다시 넣을 때

원본은 `C:\programworks\lecture-deck-pipeline\courses\바이브코딩\sessions\` 에 있고 주차당 5~59MB다 (PNG가 base64로 내장).
그대로 올리지 말고 웹용 사본을 만든다: 40KB 넘는 내장 PNG를 Pillow로 WebP(q84, 최대 폭 1920)로 재인코딩하고,
상대 경로 이미지(`자료/images/*.png`, 2주차에 27개)는 data URI로 넣어 단일 파일로 만든다. 110MB → 18MB.
2주차 원본에는 손상된 내장 이미지가 2개 있다(truncated / base64 padding) — 변환하지 않고 그대로 뒀다.
덱은 `viewport width=1280` 기준이고 좌우 방향키·스페이스·PageUp/Down으로 넘긴다.

### 고친 실제 버그

| 증상 | 원인 |
|---|---|
| 호버 시 `PULSE` → `BOL8E` 깨짐 | 앞면이 `display:inline`이라 `backface-visibility`가 무시됨 |
| 수치가 항상 `0` | `done`을 effect 의존성에 넣어 cleanup이 방금 예약한 rAF를 취소 |
| 라이트박스가 뷰포트를 안 덮음 | `Reveal`의 transform이 스태킹 컨텍스트를 만들어 `position:fixed`가 갇힘 → `createPortal` |
| 명함이 안 기울어짐 | 등장 애니메이션 `fill: both`가 최종 transform을 고정 → 레이어 분리 |
| About 헤드라인 4줄로 깨짐 | `max-w-[26ch]`가 큰 폰트에서 350px로 좁아짐 |
| 하단 네비 활성 표시 공백 | 프로젝트가 5패널로 쪼개짐 → `data-nav-section`으로 묶음 |

---

## 6. 남은 일

### 6.1 사용자 확인이 필요한 것

- **PULSE 팀 구성** — MD 8개 어디에도 인원 구성이 없었다. 상세 페이지 Project Brief에 `확인 필요` 배지로 표시돼 있다.
- 같은 배지가 GO.(팀 구성), VR Performance(팀 구성)에도 있다. NULL NULL AI는 발표자료에서 확인해 채웠다(5인 팀 · 팀장). AD Video Generation의 공동 연구자는 논문 저자 표기대로 채웠다.
- 채우는 법: `projects.ts`의 `brief` 배열에서 값 넣고 `todo: true` 삭제.

### 6.2 사용자가 예고한 것

- ~~메인 프로젝트 1개 추가 예정~~ → GO. 추가 완료.
- NULL NULL AI의 `period`가 `2025`로 돼 있는데 자료 날짜는 2026-05다. 사용자 확인 필요.

### 6.3 제안했으나 보류 중

- **Stack(+342px)과 Record(+1799px)가 한 화면을 넘는다.** About처럼 패널 분할이 필요한지 물어본 상태. Record는 Awards / Activity / Roadmap 세 패널로 나누면 맞을 듯.

### 6.4 미사용 자산 (정리 후보)

`public/images/`에서 코드 참조가 0인 것: `avatar.png`, `portrait.jpg`, `portrait-crop.jpg`, `profile-cutout.png`, `pulse-bm.png`, `tank-2.png`
(`portrait.jpg` → `portrait-crop.jpg` → `portrait-illust.webp` 순으로 교체된 흔적. 되돌릴 일 없으면 지워도 된다.)

### 6.5 성능·품질

- Lighthouse 측정은 아직 안 했다 (design.md 10절 목표: Performance 90+, LCP < 2.5s)
- `prefers-reduced-motion` CSS는 들어가 있으나 실제 에뮬레이션 검증은 안 했다
- 원본 이미지 `pulse-landing.png`, `pulse-login.png`이 1600px (design.md 10절 권장 1920px+)

---

## 7. 검증 방법

이 프로젝트에서 실제로 유효했던 절차.

```bash
npm run build      # 타입체크 포함
```

브라우저 확인 시 주의:

- **스크롤 등장이 IntersectionObserver라서**, 프로그램으로 순간 이동하면 발화하지 않는다. `scroll` 액션으로 한 번 흔들어야 한다.
- **스크린샷이 한 프레임 늦게 잡힌다.** 빈 화면이 나오면 한 번 더 찍어볼 것.
- **개발 모드 콘솔 오류는 편집 중간 상태를 HMR이 잡은 것일 수 있다.** 새 탭에서 다시 확인하면 대부분 사라진다.
- 다크모드는 `localStorage.setItem('theme','dark')` 후 새로고침.

섹션 높이 점검 (한 화면에 들어가는지):

```js
[...document.querySelectorAll('section[id],section[data-nav-section],article[id]')]
  .map(s => ({ id: s.id || s.dataset.navSection, over: Math.round(s.getBoundingClientRect().height) - innerHeight }))
```

---

## 8. 사용자 작업 방식 메모

- 한국어로 대화한다.
- 요청을 번호로 나열해서 준다. 항목마다 참고 이미지를 첨부하는 경우가 많다.
- **"바로 수정하지 말고 계획부터 세우고, 불확실하면 질문하라"** 고 명시적으로 요구했다. 큰 변경 전에는 선택지를 묻는 편이 맞다.
- 디자인은 위임하는 편 — "색을 좀 자유롭게 사용해", "최고의 레이아웃을 만들어줘".
- design.md는 단일 진실 공급원이다. 새 토큰이 필요하면 **design.md에 먼저 적고** 코드에 옮긴다 (이번에 2.0 / 2.1 / 2.2절, 3.1절을 그렇게 갱신했다).
