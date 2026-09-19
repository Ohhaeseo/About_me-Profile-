// 프로젝트가 아닌 활동의 상세 페이지 데이터 — 현재는 바이브코딩 강의 하나.
// 강의안 원본은 public/lectures/ 의 단일 HTML이다 (내장 이미지를 WebP로 재인코딩한 웹용 사본).

import type { BriefRow, DesignNote, Metric } from "@/content/projects";

export type LectureWeek = {
  no: string;
  /** 덱 표지의 제목 */
  title: string;
  /** 그 주차에 수강생이 손에 쥐는 것 */
  outcome: string;
  summary: string;
  /** 덱의 PART 구분 그대로 */
  parts: string[];
  /** 그 주차에 일부러 짚은 개념 */
  concepts: string[];
  slides: number;
  file: string;
  /** 덱 표지 캡처 — 메인 패널과 뷰어의 닫힌 상태에 쓴다 */
  cover: string;
};

export type ActivityDetail = {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  pitch: string;
  /** 메인 페이지 패널에만 쓰는 요약 */
  teaser: string;
  teaserNote: string;
  period: string;
  role: string;
  tags: string[];
  brief: BriefRow[];
  metrics: Metric[];
  approach: DesignNote[];
  curriculumLead: string;
  weeks: LectureWeek[];
  closing: string;
};

export const activityDetails: ActivityDetail[] = [
  {
    id: "vibe-coding",
    kicker: "강의 · AI 디지털 배움터",
    title: "바이브코딩 강사",
    subtitle: "AI와 함께 만드는 첫 번째 웹서비스 — 3주 과정 설계와 강의",
    pitch: "코드를 몰라도 시작할 수 있게, 그러나 마지막 결정은 사람이 하도록 가르쳤습니다.",
    teaser:
      "코딩 경험이 없는 학습자가 3주 만에 자기 웹페이지를 기획하고, 만들고, 인터넷에 공개하기까지의 과정을 직접 설계해 가르쳤습니다. 커리큘럼과 강의안 268장, 강사 대본, 실습 예제를 모두 제가 만들었습니다.",
    teaserNote:
      "가르친 것은 도구 사용법이 아니라 판단 기준입니다. AI가 작성하고, 사람이 검토하고, 사람이 결정합니다.",
    period: "2026.07 – 2026.08",
    role: "주강사 · 커리큘럼 설계 · 강의안 제작",
    tags: ["Codex", "AI Agent", "AGENTS.md", "PRD", "MCP", "GitHub", "HTML · CSS · JS"],
    brief: [
      { label: "기관", value: "AI 디지털 배움터 · 경기도 안산시 상록구" },
      { label: "과정명", value: "AI와 함께 만드는 첫 번째 웹서비스 (Codex 바이브코딩)" },
      { label: "대상", value: "코딩 경험이 없는 일반 학습자 · 회당 정원 10명 · 집합 교육" },
      { label: "내 역할", value: "주강사. 3주 과정의 커리큘럼을 설계하고 강의안 268장과 강사 대본, 실습 예제를 직접 만들었습니다" },
      { label: "기간", value: "2026.07 – 2026.08 · 총 6회 · 회당 3시간" },
      { label: "같은 시기", value: "마지막 회차(08.14)가 있던 주에 멋쟁이사자처럼 중앙 해커톤 GO. 개발을 시작했습니다" },
    ],
    metrics: [
      { value: 6, suffix: "회", label: "주강사로 진행한 강의 · 회당 3시간" },
      { value: 268, suffix: "장", label: "1주차 75 · 2주차 112 · 3주차 81장, 전부 직접 제작" },
      { value: 18, suffix: "시간", label: "3주 과정 · 회당 정원 10명 집합 교육" },
    ],
    approach: [
      {
        no: "01",
        title: "도구 사용법보다 판단 기준을 먼저",
        body: "에이전트가 코드를 대신 써 주는 시대에 초보자에게 필요한 것은 문법이 아니라 무엇을 맡기고 무엇을 직접 정할지입니다. 세 주 내내 같은 문장을 반복했습니다. AI가 작성하고, 사람이 검토하고, 사람이 결정합니다.",
      },
      {
        no: "02",
        title: "AI의 한계를 첫 주에 가르쳤다",
        body: "긴 요청의 중간이 흐려지는 현상과 사용자 말에 맞춰 주는 아첨 현상을 첫 주에 다뤘습니다. 잘 되는 시연만 보여주면 수강생은 결과가 틀렸을 때 자기 탓을 합니다. 왜 틀리는지 알아야 요청을 고칠 수 있습니다.",
      },
      {
        no: "03",
        title: "매 교시를 실습으로 닫았다",
        body: "개념 설명 뒤에는 반드시 자기 폴더에서 직접 해 보는 실습을 붙였습니다. 2주차는 실습만 여덟 개입니다. 한 번에 하나만 바꾸고, 고치기 전에 마지막 작동 상태를 지키는 습관을 실습 순서 자체에 넣었습니다.",
      },
      {
        no: "04",
        title: "현업에서 쓰는 방식을 그대로 낮췄다",
        body: "prd.md, design.md, AGENTS.md, 담당을 나눈 에이전트 팀, 근거 기반 판정, GitHub 기록과 배포는 제가 프로젝트에서 실제로 쓰는 방식입니다. 장난감 예제로 바꾸지 않고 같은 구조를 초보자가 따라올 수 있는 크기로 줄였습니다.",
      },
    ],
    curriculumLead: "실제 수업에 쓴 강의안입니다. 열기를 누르면 그 자리에서 넘겨 볼 수 있습니다.",
    weeks: [
      {
        no: "01",
        title: "AI와 함께 만드는 나의 첫 웹사이트",
        outcome: "자기소개 웹페이지 한 장",
        summary:
          "AI 코딩 에이전트와 협업해 자기소개 페이지를 만들고 직접 고쳐 보는 주차입니다. 바이브코딩이 무엇인지, LLM과 에이전트가 맡는 일이 어떻게 다른지에서 출발해 안전한 연습 폴더를 만들고, 첫 제작 요청을 완성하고, 남길 것과 바꿀 것을 나눠 한 가지씩 수정합니다. 화면이 깨졌을 때 확인할 순서까지 다루고 끝납니다.",
        parts: [
          "바이브코딩이란?",
          "안전한 연습 공간 만들기",
          "요청 잘하는 법과 첫 페이지 만들기",
          "그대로 둘 것과 바꿀 것",
          "오류 대응과 마무리",
          "직접 만들어 보기",
        ],
        concepts: [
          "LLM과 에이전트의 역할 차이",
          "토큰 — AI가 글을 읽는 단위",
          "Lost in the Middle · 중간 유실",
          "Sycophancy · 아첨 현상",
          "개인정보는 성격과 노출 위험으로 판단",
          "마지막 결정은 사람이 한다",
        ],
        slides: 75,
        file: "/lectures/vibecoding-week1.html",
        cover: "/images/teaching-week1.webp",
      },
      {
        no: "02",
        title: "내 아이디어를 작동하는 작은 웹으로",
        outcome: "prd.md · design.md와 첫 MVP",
        summary:
          "만드는 법에서 무엇을 만들지로 넘어가는 주차입니다. 내 불편을 한 문장으로 적는 것에서 시작해 타깃을 좁히고, 기능을 하나 덜어내 MVP를 정하고, 사용 흐름을 3~5단계와 완료 기준으로 씁니다. 그 내용을 prd.md와 design.md로 남겨 에이전트에게 넘기고, 핵심 기능을 한 단계씩 만들어 확인합니다. 마지막 교시에는 프롬프트, 컨텍스트, 하네스의 차이와 AGENTS.md를 다뤘습니다.",
        parts: [
          "사용자와 문제 정의",
          "MVP와 사용 흐름",
          "기획 문서와 첫 작동",
          "화면과 핵심 기능",
          "AI 작업 시스템",
          "내 프로젝트 시작하기",
        ],
        concepts: [
          "MVP는 대충 만든 것이 아니다",
          "PRD라는 개념과 prd.md라는 파일의 구분",
          "완료 기준과 테스트의 차이",
          "레퍼런스는 복사가 아니라 관찰",
          "Workflow와 Agent · 하네스 엔지니어링",
          "규칙과 권한은 다르다",
        ],
        slides: 112,
        file: "/lectures/vibecoding-week2.html",
        cover: "/images/teaching-week2.webp",
      },
      {
        no: "03",
        title: "에이전트 팀과 함께, 오늘 세상에 내놓습니다",
        outcome: "GitHub 기록과 공개 URL",
        summary:
          "AI를 한 명이 아니라 팀으로 쓰는 주차입니다. 고치기 전에 백업부터 만들고, 싱글·서브·멀티 에이전트의 차이를 본 뒤 HTML, CSS, JS, QA 담당으로 팀을 나눠 규칙을 다시 씁니다. 담당별 병렬 검토 결과를 다수결이 아니라 근거로 판정하고, 고친 담당이 아닌 다른 담당에게 확인을 맡깁니다. 이후 MCP 연결과 권한, GitHub 기록, 배포와 공유 범위 점검을 거쳐 3주를 회고합니다.",
        parts: [
          "백업과 첫 움직임",
          "싱글 · 서브 · 멀티 에이전트",
          "담당 나누기와 팀 규칙",
          "병렬 검토 · 결과 판정 · 구현",
          "플러그인 · MCP · GitHub 기록",
          "배포와 공유 범위",
        ],
        concepts: [
          "고친 사람은 자기 실수를 못 본다",
          "다수결이 아니라 근거로 판정",
          "MCP — 연결했다고 다 허락한 것은 아니다",
          "\"완료했습니다\"보다 GitHub 화면",
          "저장소에 있는 것과 열리는 것은 다르다",
          "공개 URL 자가 점검",
        ],
        slides: 81,
        file: "/lectures/vibecoding-week3.html",
        cover: "/images/teaching-week3.webp",
      },
    ],
    closing:
      "가르치려면 제가 감으로 하던 일을 순서와 이유로 풀어야 했습니다. 왜 문서를 먼저 쓰는지, 왜 한 번에 하나만 바꾸는지, 왜 고친 사람이 아닌 다른 눈이 확인해야 하는지를 말로 설명할 수 있게 된 것이 이 강의에서 제가 얻은 것입니다. 강의 끝자락에 시작한 GO. 개발에서 문서를 코드보다 먼저 쓰고 에이전트 작업 규칙을 먼저 정한 것도 이 과정을 정리하며 굳어진 방식입니다.",
  },
];
