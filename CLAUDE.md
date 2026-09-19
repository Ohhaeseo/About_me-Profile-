# CLAUDE.md

이 저장소에서 작업할 때 Claude Code가 참고하는 기본 지침.

## 프로젝트

백엔드/풀스택 개발자 개인 포트폴리오 웹사이트. 단일 페이지 스크롤 구조.
디자인 톤은 **밝은 배경 + 절제된 미세 모션**. 상세 스펙은 [design.md](design.md)에 있다.

## 스택

| | |
|---|---|
| 프레임워크 | Next.js 16.3.2 (App Router) |
| 런타임 | React 19.2.8 |
| 스타일 | Tailwind CSS 4.3.3 (`@theme` 토큰 방식, config 파일 없음) |
| 언어 | TypeScript 5.9 (strict) |
| 경로 별칭 | `@/*` → `src/*` |
| 배포 | 미정 (로컬 우선) |

## 명령어

```bash
npm run dev     # 개발 서버
npm run build   # 프로덕션 빌드 + 타입 체크
npm start       # 빌드 결과 실행
```

## 디렉터리

```
src/
  app/
    layout.tsx      루트 레이아웃, 폰트 로딩, 메타데이터
    page.tsx        단일 페이지 — 섹션 컴포넌트를 순서대로 조립
    globals.css     @import "tailwindcss" + @theme 토큰 정의
  components/       재사용 UI + 섹션 컴포넌트
  content/          포트폴리오 데이터 (프로필, 프로젝트, 경력) — TS 객체
public/             이미지, 이력서 PDF
design.md           디자인 스펙 (단일 진실 공급원)
```

## 규칙

### 디자인 토큰
- **색상·간격·모션 값을 컴포넌트에 하드코딩하지 않는다.** `globals.css`의 `@theme` 토큰만 쓴다.
- 새 색이 필요하면 임의로 만들지 말고 `design.md` 2절에 먼저 추가한다.
- 토큰 이름은 `--color-*`, `--shadow-*`, `--motion-*`, `--ease-*`, `--text-*`.

### 모션
- `transition: all` 금지. 변하는 속성만 명시한다.
- `transform`과 `opacity`만 애니메이션한다.
- hover `scale`은 1.02, `rotate`는 1deg를 넘지 않는다. (design.md 6.2)
- `prefers-reduced-motion` 대응은 필수.

### 콘텐츠와 마크업 분리
- 문구·프로젝트 데이터는 `src/content/`의 TS 객체로 두고, 컴포넌트는 그걸 받아 렌더링만 한다.
- JSX 안에 긴 한글 문장을 직접 박지 않는다.

### 컴포넌트
- 기본은 서버 컴포넌트. `"use client"`는 인터랙션이 필요한 곳(타이핑, 갤러리, 플로팅 네비)에만.
- 이미지는 항상 `next/image`.

### React Bits
- 설치: `npx shadcn@latest add @react-bits/<Component>-TS-TW`
- 넣기 전에 design.md 8.5의 세 가지 기준을 확인한다 (밝은 배경 확인 / 모션 규칙 / 번들 비용).
- 애니메이션 라이브러리는 `motion` 하나로 통일. `gsap`을 같이 넣지 않는다.

## 작업 시 주의

- 커밋/푸시는 요청받았을 때만 한다. 원격은 `https://github.com/Ohhaeseo/About_me-Profile-.git` (`main`).
- `design.md`와 실제 구현이 어긋나면 임의로 코드를 맞추지 말고 어느 쪽이 맞는지 먼저 확인한다.
- 개인정보(이메일, 전화번호)는 `src/content/`에만 두고 여러 곳에 흩뿌리지 않는다.
