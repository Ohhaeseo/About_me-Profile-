// 포트폴리오 문구·개인정보 단일 출처. 컴포넌트는 여기서 받아 렌더링만 한다.

export const profile = {
  name: "오해서",
  nameEn: "OH HAESEO",
  /** 대표 주소 — Vercel에서 루트는 www로 308 리다이렉트된다 */
  siteUrl: "https://www.ohhaeseo.shop",
  role: "Backend AI Engineer",
  /** 히어로 — 위에 영문 직함(작게), 아래에 이름(크게) */
  heroRole: "Backend AI Engineer",
  heroName: "오해서",
  eyebrow: "Backend / AI Engineer",
  intro:
    "리뷰 한 줄이 분석이 되고, 분석이 다시 행동으로 이어지는 구조를 만듭니다.",
  affiliation: "미디어소프트웨어학과 4학년 · 2027년 졸업 예정",
  email: "ohhs0355@naver.com",
  phone: "010-2676-0547",
  github: "https://github.com/Ohhaeseo",
  githubLabel: "Ohhaeseo",
  resume: "/resume/oh-haeseo-portfolio.pdf",
  location: "경기 안양",
} as const;

/** 헤드라인 조각 — em은 액센트 볼드, mark는 밑줄 강조 */
export type HeadlinePart = { text: string; em?: boolean; mark?: boolean };

export const about = {
  /** 줄바꿈은 의미 단위로 직접 끊는다 (자동 줄바꿈은 어절을 이상하게 자른다) */
  headline: [
    { text: "혼자 빠르게 가기보다, " },
    { text: "같이 협업하고", em: true },
    { text: " 가는\n" },
    { text: "백엔드 AI 개발자", em: true },
    { text: " " },
    { text: "오해서", mark: true },
    { text: "입니다." },
  ] as HeadlinePart[],
  lead: "사용자가 다음에 무엇을 해야 할지\n알 수 있는 흐름을 만듭니다.",
  paragraphs: [
    "가장 오래 붙잡고 공부한 영역은 Java와 Spring Boot 기반의 백엔드입니다. 사용자와 데이터가 오가는 길을 안정적으로 만들고, 그 위에 AI 분석과 콘텐츠 생성 기능을 연결하는 작업에 관심이 많습니다.",
    "프로젝트를 볼 때는 먼저 사용자가 어디에서 막히는지부터 봅니다. 그다음 필요한 데이터, API, 화면 흐름을 정리하고 실제로 돌아가는 구조까지 이어 붙입니다. 졸업작품 PULSE는 이 방식으로 가장 깊게 만든 프로젝트입니다.",
    "모르는 영역은 피하기보다 작게 만들어 보며 이해하려고 합니다. 백엔드를 중심에 두되 AI와 콘텐츠 경험까지 함께 설계할 수 있는 개발자로 성장하고 싶습니다.",
  ],
  facts: [
    { label: "Name", value: profile.nameEn },
    { label: "Major", value: "미디어소프트웨어학과 4학년" },
    { label: "Born", value: "2002.03.26" },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Github", value: profile.githubLabel, href: profile.github },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
  ] as { label: string; value: string; href?: string }[],
} as const;

/** 성격 — 단점을 숨기지 않되 어떻게 다루는지까지 적는다 */
export const traits = [
  {
    no: "01",
    title: "관계를 먼저 본다",
    summary: "거절을 잘 못한다는 약점이, 상대의 상황을 먼저 읽는 습관으로 이어졌습니다.",
    body: "사람과의 관계를 중요하게 생각합니다. 그래서 상대의 제안이나 요청을 잘 거절하지 못하고, 제 시간을 내어주며 관계를 지키려 할 때가 많습니다. 정작 상대는 그 사소한 거절을 신경 쓰지 않았을 가능성이 크다는 것도 압니다. 대신 이 성향 덕분에 상대가 지금 무엇이 급한지부터 보게 되었고, 요즘은 무조건 받아들이는 대신 \"지금은 어렵고 언제까지는 가능하다\"처럼 기한을 제시하는 방식으로 바꿔가고 있습니다.",
  },
  {
    no: "02",
    title: "밤에 더 잘 붙는다",
    summary: "아침형이 되려는 시도를 접고, 집중이 되는 시간대에 어려운 일을 몰아넣습니다.",
    body: "오후 4시에서 6시, 밤 8시에서 11시 사이에 집중이 가장 잘 됩니다. 아침형 인간이 되고 싶어 실제로 여러 번 일찍 일어나 봤지만 효율이 확연히 떨어졌습니다. 지금은 억지로 생활 패턴을 바꾸기보다, 설계와 디버깅처럼 머리를 오래 써야 하는 작업을 집중 시간대에 배치하고 그 외 시간에는 정리와 문서화를 두는 쪽으로 하루를 나눕니다.",
  },
  {
    no: "03",
    title: "갈등은 회의로 끝낸다",
    summary: "타협형이자 협력형입니다. 빨리 가는 것보다 덜 되돌아가는 쪽을 택합니다.",
    body: "의견이 부딪히면 제 의견도 상대 의견도 중요하지만 결국 관계를 가장 앞에 둡니다. 그래서 결론은 대개 회의로 이어집니다. 줏대가 없어서가 아니라, 혼자 결정해서 빠르게 가는 것보다 서로 납득하고 출발하는 편이 결과적으로 되돌아가는 일이 적다고 생각하기 때문입니다.",
  },
] as const;

/** HOW I WORK — 01~04 (design.md 7절 3번 섹션) */
export const principles = [
  {
    no: "01",
    title: "능동적 학습",
    en: "Active Learning",
    desc: "새로운 기술이 필요하면 작은 예제로 먼저 확인합니다. 익힌 내용은 기록으로 남겨 다음 작업에 다시 쓸 수 있게 정리합니다.",
  },
  {
    no: "02",
    title: "계획적 개발",
    en: "Planned Development",
    desc: "바로 구현하기보다 요구사항과 흐름을 먼저 잡습니다. 구조를 세운 뒤 일정 안에서 완성 가능한 단위로 나누어 진행합니다.",
  },
  {
    no: "03",
    title: "원활한 소통",
    en: "Communication",
    desc: "혼자 빠르게 가기보다 같이 이해할 수 있는 길을 찾습니다. 문서와 대화로 막히는 지점을 줄이려 합니다.",
  },
  {
    no: "04",
    title: "성실한 태도",
    en: "Sincerity",
    desc: "맡은 역할은 끝까지 책임집니다. 작은 약속을 지키는 태도가 결국 신뢰를 만든다고 생각합니다.",
  },
] as const;

/** icon은 public/icons/<icon>.svg — devicon을 단색(currentColor)으로 변환해 둔 것 */
export type StackItem = { name: string; icon?: string };

export type StackGroup = {
  no: string;
  label: string;
  icon: string;
  note: string;
  /** 가장 손에 익은 것 — 카드에서 강조된다 */
  core: string;
  items: StackItem[];
  /** 실제로 쓴 곳 */
  usedIn: string[];
};

export const stacks: StackGroup[] = [
  {
    no: "01",
    label: "Backend & DB",
    icon: "▤",
    note: "서버·API 설계와 DB 모델링. 가장 오래 붙잡고 공부한 축입니다.",
    core: "Spring Boot",
    items: [
      { name: "Java", icon: "java" },
      { name: "Spring Boot", icon: "spring" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    usedIn: ["PULSE", "GO."],
  },
  {
    no: "02",
    label: "Frontend",
    icon: "</>",
    note: "서버가 만든 흐름을 사용자가 볼 수 있는 화면까지 이어 붙입니다.",
    core: "React",
    items: [
      { name: "React", icon: "react" },
      { name: "React Native", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
    ],
    usedIn: ["PULSE", "GO.", "NULL NULL AI", "TripCode"],
  },
  {
    no: "03",
    label: "AI · Generative",
    icon: "✶",
    note: "리뷰 분석부터 영상 생성과 평가까지, 결과를 검증할 수 있는 형태로.",
    core: "LLM · DSPy",
    items: [
      { name: "LLM · DSPy", icon: "python" },
      { name: "Vertex AI · VEO" },
      { name: "BERTopic", icon: "python" },
      { name: "CLIP · VQA" },
      { name: "Kiwi" },
    ],
    usedIn: ["PULSE", "GO.", "AD Video Generation"],
  },
  {
    no: "04",
    label: "AI Agent",
    icon: "◇",
    note: "에이전트와 도구를 엮어 반복 작업을 자동화합니다.",
    core: "Claude Code",
    items: [{ name: "AI Agent" }, { name: "MCP" }, { name: "Claude Code" }, { name: "Skills" }],
    usedIn: ["GO.", "바이브코딩 강의", "이 포트폴리오 사이트"],
  },
  {
    no: "05",
    label: "XR · Content",
    icon: "◐",
    note: "실감형 콘텐츠와 영상. 화면 밖의 경험을 만드는 쪽입니다.",
    core: "Unity 3D",
    items: [
      { name: "Unity 3D", icon: "unity" },
      { name: "C#", icon: "csharp" },
      { name: "Premiere Pro", icon: "premierepro" },
      { name: "Photoshop", icon: "photoshop" },
    ],
    usedIn: ["VR Performance", "Unity 3D 탱크 게임"],
  },
  {
    no: "06",
    label: "Tools",
    icon: "⚙",
    note: "협업·문서화·자동화. 혼자 하든 같이 하든 기록을 남깁니다.",
    core: "Git · GitHub",
    items: [
      { name: "Git · GitHub", icon: "github" },
      { name: "Notion", icon: "notion" },
      { name: "Figma", icon: "figma" },
      { name: "Playwright", icon: "playwright" },
    ],
    usedIn: ["전 프로젝트"],
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Work" },
  { id: "teaching", label: "Teaching" },
  { id: "experience", label: "Record" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;
