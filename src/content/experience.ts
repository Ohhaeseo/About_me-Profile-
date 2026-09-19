// 경력·수상·활동 타임라인, 로드맵, 글/연구 목록.

export type RecordItem = {
  year: string;
  tag: string;
  title: string;
  /** 아웃라인 배지로 강조되는 결과 */
  award?: string;
  /** 소속·맥락 한 줄 */
  org: string;
  /** 우측에 붙는 시점 표기 */
  when: string;
  desc: string;
  /** "→ PULSE에서 활용" 처럼 이어지는 곳 */
  related?: string;
  /** 상세 페이지가 있는 기록 — 사이트 내부 경로 */
  href?: string;
  hrefLabel?: string;
  current?: boolean;
};

/** 수상 — 활동과 섞지 않는다 */
export const awards: RecordItem[] = [
  {
    year: "2026",
    tag: "학술",
    title: "IPACT 국내학술대회",
    award: "우수논문상",
    org: "광고 장면 구조 분석 기반 DSPy 프롬프트 생성 프레임워크",
    when: "2026 상반기",
    related: "AD Video Generation",
    desc: "숏폼 광고의 장면 흐름을 AIDA로 재구조화하고, DSPy 기반 프롬프트 생성 절차로 설계·검증한 결과를 발표했습니다.",
  },
  {
    year: "2025",
    tag: "3학년",
    title: "가상융합서비스 개발자 경진대회",
    award: "준우승",
    org: "전국 규모 · VR 발표 플랫폼 개발",
    when: "2025",
    related: "VR Performance",
    desc: "VR 기술을 활용한 가상 공간 발표 플랫폼을 개발해 2위에 올랐습니다.",
  },
  {
    year: "2025",
    tag: "3학년",
    title: "사용자 경험(UX) 디자인 소논문 경진대회",
    award: "최우수상",
    org: "교내 · 사용자 중심 디자인 프로세스 연구",
    when: "2025 하반기",
    desc: "사용자 중심 디자인 프로세스와 연구 방법론을 적용한 소논문으로 수상했습니다.",
  },
  {
    year: "2025",
    tag: "3학년",
    title: "VR / AR / Game 경진대회",
    award: "최우수상",
    org: "교내 · 실감형 콘텐츠 기획과 프로토타입",
    when: "2025",
    related: "VR Performance",
    desc: "실감형 콘텐츠 기획과 프로토타입 구현 능력을 인정받았습니다.",
  },
  {
    year: "2024",
    tag: "2학년",
    title: "생성 AI를 활용한 게임 기획 경진대회",
    award: "우수상",
    org: "교내 · Gen-AI 도구 기반 게임 컨셉",
    when: "2024",
    desc: "Gen-AI 도구를 활용한 게임 컨셉과 시나리오를 제안했습니다.",
  },
  {
    year: "2021",
    tag: "1학년",
    title: "사용자 조사를 통한 웹/앱 서비스 기획 경진대회",
    award: "우수상",
    org: "교내 · 시장 조사와 페르소나 설정",
    when: "2021",
    desc: "시장 조사와 페르소나 설정으로 니즈를 분석하고 서비스를 기획했습니다.",
  },
];

/** 활동 — 수상과 분리 */
export const activities: RecordItem[] = [
  {
    year: "2026",
    tag: "해커톤",
    title: "멋쟁이사자처럼 대학 14기 중앙 해커톤 참여",
    org: "AAC(Anti-Aging Club) 트랙 · 팀 뚝딱이들",
    when: "2026.08",
    related: "GO.",
    desc: "AI 이미지 전략 서비스 GO.(고점)로 참여했습니다. 8일 동안 백엔드와 AI 파이프라인, 앱을 개발해 서버에 배포하고 실기기 시연까지 마쳤습니다.",
  },
  {
    year: "2026",
    tag: "강의",
    title: "AI 디지털 배움터 바이브코딩 강사",
    org: "경기도 안산시 상록구 · AI와 함께 만드는 첫 번째 웹서비스",
    when: "2026.07 – 08",
    href: "/activities/vibe-coding",
    hrefLabel: "강의 내용과 강의안 보기",
    desc: "코딩 경험이 없는 학습자를 대상으로 3주 과정을 설계하고 주강사로 6회, 18시간을 강의했습니다. 강의안 268장과 실습 예제를 직접 만들었습니다.",
  },
  {
    year: "2026",
    tag: "동아리",
    title: "멋쟁이사자처럼 14기 백엔드",
    org: "대학 IT 연합 동아리 · 백엔드 트랙",
    when: "2026 –",
    desc: "대학 IT 연합 동아리 멋쟁이사자처럼 14기 백엔드 트랙으로 활동하고 있습니다.",
    current: true,
  },
  {
    year: "2025",
    tag: "학생회",
    title: "미디어소프트웨어학과 26대 부학생회장",
    org: "학과 학생회 · 행사 기획과 운영",
    when: "2025",
    desc: "학과 학생회 부학생회장으로 행사 기획·운영과 학우 소통을 맡았습니다.",
  },
  {
    year: "2021",
    tag: "학업",
    title: "미디어소프트웨어학과 입학",
    org: "21학번 · 2027년 졸업 예정",
    when: "2021.03",
    desc: "21학번으로 입학해 2027년 졸업을 앞두고 있습니다.",
  },
];

export type Milestone = {
  year: string;
  phase: string;
  title: string;
  desc: string;
  marks: string[];
  state: "done" | "current" | "next";
};

/**
 * 로드맵 — 해마다 무엇이 달라졌는지.
 * 기획에서 출발해 구현으로, 구현에서 검증으로 옮겨온 흐름을 보여준다.
 */
export const roadmap: Milestone[] = [
  {
    year: "2021",
    phase: "Start",
    title: "기획으로 출발",
    desc: "사용자 조사를 먼저 배웠습니다. 무엇을 만들지 정하는 일이 만드는 일보다 앞선다는 걸 여기서 익혔습니다.",
    marks: ["입학", "웹/앱 기획 경진대회 우수상"],
    state: "done",
  },
  {
    year: "2024",
    phase: "Expand",
    title: "AI를 도구로",
    desc: "생성 AI를 기획 도구로 쓰기 시작했습니다. 결과물보다 어떻게 시키는지가 더 중요하다는 걸 알게 된 해입니다.",
    marks: ["생성 AI 게임 기획 경진대회 우수상"],
    state: "done",
  },
  {
    year: "2025",
    phase: "Build",
    title: "돌아가는 것으로",
    desc: "기획서에서 멈추지 않고 실제로 동작하는 것까지 만들었습니다. VR 발표 플랫폼을 Unity로 구현하며 구현의 벽을 넘었습니다.",
    marks: ["가상융합서비스 준우승", "VR/AR/Game 최우수상", "UX 소논문 최우수상", "부학생회장"],
    state: "done",
  },
  {
    year: "2026",
    phase: "Verify",
    title: "백엔드와 검증",
    desc: "만든 것을 숫자로 설명하기 시작했습니다. 프롬프트 구조를 논문으로 정리했고, 졸업작품 PULSE에서 서버를 맡았습니다. 여름에는 AI 디지털 배움터에서 바이브코딩을 가르쳤고, 곧바로 멋쟁이사자처럼 중앙 해커톤에서 GO.를 8일 만에 배포까지 끌고 갔습니다.",
    marks: [
      "JCCT 등재",
      "IPACT 우수논문상",
      "PULSE 졸업작품",
      "멋쟁이사자처럼 14기",
      "바이브코딩 강사",
      "멋사 중앙 해커톤 · GO.",
    ],
    state: "current",
  },
  {
    year: "2027",
    phase: "Next",
    title: "백엔드 개발자로",
    desc: "졸업 후에는 트래픽과 데이터가 오가는 길을 책임지는 백엔드 개발자로 일하고 싶습니다.",
    marks: ["졸업 예정", "백엔드 신입 개발자"],
    state: "next",
  },
];

export type Writing = {
  year: string;
  venue: string;
  title: string;
  desc: string;
  note: string;
};

/** WRITING — 연구·논문 */
export const writings: Writing[] = [
  {
    year: "2026",
    venue: "JCCT",
    title: "광고 장면 구조 분석 기반 DSPy 프롬프트 생성 프레임워크 연구",
    desc: "외식업 숏폼 광고를 Hook, Showcase, Highlight, CTA 장면으로 나누고 DSPy로 프롬프트 생성 절차를 정의했습니다. CLIP과 Gemini VQA로 의미 정합성과 광고 구조 반영도를 나눠 평가했습니다.",
    note: "IPACT 국내학술대회 우수논문상",
  },
  {
    year: "2025",
    venue: "교내 소논문",
    title: "사용자 경험(UX) 디자인 연구",
    desc: "사용자 중심 디자인 프로세스를 실제 서비스 기획에 적용하고 연구 방법론으로 정리했습니다.",
    note: "UX 디자인 소논문 경진대회 최우수상",
  },
];
