// 프로젝트 서사 구조는 design.md 7.1을 따른다.
// 기능 나열이 아니라 [문제 → 핵심 판단 → 검증] 기록.

export type Shot = { src: string; alt: string; caption: string };

export type Metric = {
  /** 애니메이션으로 세는 숫자 */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

/** 상세 페이지 상단 정보 테이블. todo가 true면 [확인 필요]로 표시된다. */
export type BriefRow = { label: string; value: string; todo?: boolean };

/** 어떻게 설계했는지 — 구조 결정의 이유 */
export type DesignNote = { no: string; title: string; body: string };

/* ── 심화 섹션 ────────────────────────────────────────────────
   프로젝트마다 더 파고들 거리가 다르다. 필요한 블록만 골라 채운다. */

/** 내가 맡은 부분 — 왜 그렇게 했고 어떻게 풀었는지 */
export type Contribution = {
  no: string;
  tag: string;
  title: string;
  why: string;
  how: string;
  points: string[];
};

/** 단계별 흐름 — 파이프라인처럼 순서가 중요한 것 */
export type FlowStep = { no: string; title: string; body: string; meta?: string };

/** 가중치 막대 — 점수 모델처럼 비중을 보여줘야 하는 것 */
export type Weight = { label: string; value: number; max: number; note: string };

/** 명세 표 — 숫자와 규격이 근거가 되는 것 */
export type SpecGroup = { title: string; rows: { key: string; value: string }[] };

/** 결과 표의 열 — best는 그 열에서 어느 쪽을 강조할지 */
export type ResultColumn = { label: string; digits: number; best: "max" | "min" | "none" };

/** 결과 표의 행 — values는 columns와 같은 순서. focus는 제안 방식 표시 */
export type ResultRow = {
  tag: string;
  name: string;
  values: number[];
  verdict?: string;
  focus?: boolean;
};

export type DeepDive = {
  contributions?: { title: string; lead: string; items: Contribution[] };
  flow?: { title: string; lead: string; steps: FlowStep[] };
  /** 코드 조각 — 구조 자체가 설명인 경우. source는 ASCII만 (모노 폰트에 한글 글리프 없음) */
  code?: { title: string; lead: string; filename: string; source: string; caption: string };
  weights?: { title: string; lead: string; total: string; items: Weight[] };
  /** 비교 결과 표 — 조건별 수치를 나란히 놓아야 하는 것 */
  results?: {
    title: string;
    lead: string;
    columns: ResultColumn[];
    verdictLabel?: string;
    rows: ResultRow[];
    notes: string[];
  };
  spec?: { title: string; lead: string; groups: SpecGroup[] };
  /** 어디까지 실제로 돌아가는지 — 과장하지 않기 위한 블록 */
  status?: {
    title: string;
    lead: string;
    liveTitle: string;
    live: string[];
    wipTitle: string;
    wip: string[];
    note: string;
  };
};

/** 원본 문서 — PDF를 페이지 이미지로 풀어 스크롤 뷰어에 싣는다.
    file은 원본 PDF, pages는 같은 PDF를 쪽별로 렌더한 이미지 (public/docs) */
export type ProjectDocument = {
  title: string;
  lead: string;
  /** 툴바에 모노로 찍힌다 — ASCII만 */
  filename: string;
  file: string;
  /** 페이지 이미지 한 장의 픽셀 크기 (전 쪽 동일) */
  width: number;
  height: number;
  pages: { src: string; alt: string }[];
  note?: string;
};

/** 시연 영상 — public/videos의 mp4와 포스터 이미지 */
export type ProjectDemo = {
  title: string;
  lead: string;
  src: string;
  /** 영상 픽셀 크기 — 세로 영상이면 레이아웃이 바뀐다 */
  width: number;
  height: number;
  /** 포스터 이미지가 없으면 이 시점(초)의 장면을 포스터처럼 보여준다 */
  poster?: string;
  posterTime?: number;
  caption: string;
  chapters?: string[];
};

/** 쪽별 이미지 경로와 alt를 만든다 — 파일명은 page-01.webp 규칙 */
const docPages = (dir: string, alts: string[]) =>
  alts.map((alt, i) => ({
    src: `${dir}/page-${String(i + 1).padStart(2, "0")}.webp`,
    alt: `${i + 1}쪽 — ${alt}`,
  }));

export type Project = {
  id: string;
  no: string;
  /** 한 줄 요약 — 메인 카드와 상세 히어로에서 굵게 */
  pitch: string;
  brief: BriefRow[];
  architecture: DesignNote[];
  demo?: ProjectDemo;
  document?: ProjectDocument;
  deepDive?: DeepDive;
  kicker: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  award?: string;
  stack: string[];
  gallery: Shot[];
  metrics: Metric[];
  problem: string;
  decisions: { head: string; body: string }[];
  validation: string;
};

export const projects: Project[] = [
  {
    id: "pulse",
    no: "01",
    pitch: "마케팅을 공부하지 않아도, 리뷰에서 다음 행동까지 한 번에 이어집니다.",
    brief: [
      { label: "타겟", value: "마케팅에 쓸 시간이 없는 외식업 사장님" },
      { label: "문제 정의", value: "리뷰는 쌓이는데 그게 누구의 목소리인지, 그래서 뭘 해야 하는지로 이어지지 않는다" },
      { label: "내 역할", value: "영상 생성 로직 · 인플루언서 매칭 · 인증/가입 흐름" },
      { label: "기간", value: "2026 · 졸업작품" },
      { label: "팀 구성", value: "팀 프로젝트", todo: true },
      {
        label: "현재 상태",
        value:
          "리뷰 수집·분석 파이프라인과 손님 분석 화면은 실연동. 영상 생성·리뷰 답변·인플루언서 매칭은 화면과 로직은 완성, 실 API 연결이 남은 단계",
      },
    ],
    architecture: [
      {
        no: "01",
        title: "책임에 따라 서버를 셋으로 나눴다",
        body: "React는 사장님이 보는 화면, Spring Boot는 인증과 가게 정보 그리고 AI 서버 호출의 관문, FastAPI는 리뷰 수집·분석과 영상 생성을 맡습니다. 성격이 다른 작업(요청-응답 / 장기 배치 / LLM 호출)을 한 서버에 섞지 않는 것이 첫 결정이었습니다.",
      },
      {
        no: "02",
        title: "분석은 요청과 처리를 떼어놨다",
        body: "리뷰 수집과 토픽 분석은 응답을 붙들고 기다릴 수 없는 작업입니다. FastAPI가 요청 즉시 task_id를 내주고 백그라운드에서 돌리며, 프론트는 그 id로 진행률을 polling합니다. 사용자는 대기 중에도 무엇이 진행되는지 봅니다.",
      },
      {
        no: "03",
        title: "분석 결과를 다음 단계의 입력으로 넘겼다",
        body: "페르소나, 매장 요약, 액션 제안을 릴스 제작 화면의 프롬프트 초기값으로 전달합니다. 분석과 제작이 각각의 섬이 되지 않도록 데이터가 흘러가는 방향을 먼저 고정했습니다.",
      },
      {
        no: "04",
        title: "재계산을 막는 저장 지점을 뒀다",
        body: "수집한 원본 리뷰는 매장명과 주소를 SHA-1로 묶은 store_key 기준으로 매장당 한 벌만 upsert합니다. 작업마다 전체 리뷰를 다시 쌓지 않고, 분석 로직을 고쳐도 같은 입력으로 다시 돌려볼 수 있습니다.",
      },
      {
        no: "05",
        title: "매장 식별은 요청 본문을 믿지 않는다",
        body: "분석 API는 요청에 담겨 온 매장 id를 그대로 쓰지 않고, JWT의 이메일로 매장을 다시 조회해 store_id를 정합니다. 상태·결과 조회도 task_id와 store_id를 함께 봅니다. 남의 분석 결과가 열리지 않게 하는 경계가 여기입니다.",
      },
      {
        no: "06",
        title: "실패해도 화면이 비지 않게 했다",
        body: "리뷰가 3건 미만이면 임베딩 대신 빈도 기반 단일 토픽으로 떨어지고, LLM이 페르소나 JSON을 못 만들면 리뷰 기반 규칙으로 채웁니다. 분석은 성공하되 품질이 낮아진 상태를 따로 기록하는 쪽을 택했습니다.",
      },
    ],
    kicker: "졸업작품 · 문제 → 해결",
    title: "PULSE",
    subtitle: "외식업 사장님을 위한 AI 마케팅 자동화 플랫폼",
    period: "2026 · 졸업작품",
    role: "영상 생성 로직 · 인플루언서 매칭 · 인증/가입 흐름",
    award: "Main Project",
    stack: [
      "React",
      "Spring Boot",
      "FastAPI",
      "MySQL",
      "MongoDB",
      "Playwright",
      "Kiwi · Ko-SBERT",
      "BERTopic",
      "VEO3",
    ],
    gallery: [
      {
        src: "/images/pulse-landing.png",
        alt: "PULSE 랜딩 페이지",
        caption: "랜딩 — 리뷰 분석부터 숏폼 제작까지의 흐름을 한 화면에 제시",
      },
      {
        src: "/images/pulse-main.png",
        alt: "PULSE 액션 대시보드 화면",
        caption: "액션 대시보드 — 분석 결과를 다음 행동 제안으로 환산",
      },
      {
        src: "/images/pulse-persona.png",
        alt: "PULSE 손님 페르소나 분석 화면",
        caption: "손님 분석 — Kiwi·BERTopic 토픽 추출 위에 LLM 페르소나 리포트",
      },
      {
        src: "/images/pulse-reels.png",
        alt: "PULSE 스마트 릴스 스튜디오 화면",
        caption: "Smart Reels — 분석 맥락을 프롬프트 초기값으로 받아 9:16 광고 생성",
      },
      {
        src: "/images/pulse-influencer.png",
        alt: "PULSE 인플루언서 매칭 화면",
        caption: "Influencer Pro — 핵심 루프와 분리한 확장 기능",
      },
      {
        src: "/images/pulse-login.png",
        alt: "PULSE 로그인 및 가게 정보 입력 화면",
        caption: "가입 — 계정 생성이 아니라 첫 분석 파이프라인의 시작점",
      },
      {
        src: "/images/pulse-arch.png",
        alt: "PULSE 시스템 아키텍처 다이어그램",
        caption: "아키텍처 — React / Spring Boot / FastAPI 3계층 분리",
      },
      {
        src: "/images/pulse-pipeline.png",
        alt: "PULSE 리뷰 분석 파이프라인 다이어그램",
        caption: "파이프라인 — 리뷰 수집·스냅샷·토픽 분석·리포트 생성 단계",
      },
    ],
    metrics: [
      { value: 3, suffix: "계층", label: "React · Spring Boot · FastAPI 역할 분리" },
      { value: 2, suffix: "개 소스", label: "네이버 · 카카오 리뷰를 병렬 수집 (각 최대 80건)" },
      { value: 100, suffix: "점", label: "업종·지역·키워드·성과·예산 5개 항목 매칭 모델" },
    ],
    problem:
      "외식업 사장님은 마케팅을 따로 공부할 시간이 없습니다. 리뷰는 쌓이는데 그 리뷰가 누구의 목소리인지, 그래서 다음에 무엇을 해야 하는지로는 이어지지 않습니다. 분석 도구와 제작 도구가 따로 놀면 결국 아무것도 실행되지 않습니다.",
    decisions: [
      {
        head: "분석과 제작을 한 줄로 잇는다",
        body: "릴스 제작 화면을 빈 입력창에서 시작하지 않게 했습니다. 이미 만들어진 페르소나와 매장 요약, 액션 제안을 프롬프트 초기값으로 넘겨 사장님이 무엇을 찍을지 정하는 부담을 줄였습니다.",
      },
      {
        head: "무거운 작업은 task_id로 떼어낸다",
        body: "리뷰 수집과 토픽 분석은 응답을 기다리게 하면 안 되는 작업입니다. FastAPI가 요청 즉시 task_id를 발급하고 백그라운드에서 처리하도록 나눴습니다. 사용자는 진행률을 polling으로 확인합니다.",
      },
      {
        head: "수익 기능을 핵심 루프에서 분리한다",
        body: "인플루언서 매칭은 모든 사장님에게 필요하지 않습니다. 핵심 마케팅 루프를 복잡하게 만들지 않으려고 Pro 확장 기능으로 떼어놓고, 추천 결과에 왜 어울리는지를 함께 보여주는 구조로 잡았습니다.",
      },
    ],
    validation:
      "가입 → 분석 생성 → 진행률 확인 → 결과 화면까지 한 사이클이 끊기지 않고 도는지를 기준으로 잡았습니다. 새로고침하면 저장된 taskId로 결과를 복구하고, 그것도 없으면 매장의 최신 결과로 떨어집니다. 리뷰가 거의 없는 매장, LLM 응답이 깨진 경우처럼 실패하는 길도 각각 다른 상태로 끝나도록 확인했습니다.",
    deepDive: {
      contributions: {
        title: "My Contribution",
        lead: "팀 프로젝트에서 제가 맡은 세 갈래입니다.",
        items: [
          {
            no: "01",
            tag: "Smart Reels",
            title: "한국어 입력을 VEO3 프롬프트로 번역하는 규칙",
            why: "사장님이 가장 막히는 지점은 촬영이 아니라 \"무엇을 어떻게 찍을지\" 정하는 일입니다. 빈 입력창을 주면 아무것도 만들어지지 않습니다.",
            how: "손님 분석에서 나온 페르소나와 분위기를 릴스 화면의 초기값으로 넘기고, 한국어 맥락을 VEO3가 읽는 영어 JSON으로 바꾸는 규칙을 정했습니다. 9:16 세로, 8~10초, HOOK·BODY·OUTRO 세 장면 구조를 고정값으로 두었습니다.",
            points: [
              "장면 묘사는 [Shot] + [Subject] + [Action] + [Context] 공식으로 통일",
              "\"맛있는\" 같은 추상 형용사 대신 \"김이 올라오는\"처럼 눈에 보이는 증거로 기술",
              "Energy · Premium · Mood 세 분위기를 카메라 무빙과 톤 키워드로 매핑",
              "자막·워터마크·로고는 negative_prompts에 고정해 원천 차단",
            ],
          },
          {
            no: "02",
            tag: "Influencer Match",
            title: "점수만이 아니라 이유까지 내려주는 추천",
            why: "팔로워 수로 고르면 우리 가게 손님층과 어긋납니다. 로컬 매장에는 유명한 사람보다 실제로 방문할 수 있고 손님층이 겹치는 사람이 맞습니다.",
            how: "업종·지역·키워드·성과·예산 다섯 축을 100점으로 나눠 합산하고, 총점과 함께 항목별 점수와 추천 문장을 같이 내려줍니다. 손님 분석에서 이미 뽑아둔 페르소나와 리뷰 토픽 키워드를 매칭 기준으로 다시 씁니다.",
            points: [
              "키워드는 해시태그·공백을 지우고 부분 포함까지 인정 (감성 ↔ 감성카페)",
              "성과는 팔로워가 아니라 평균 조회수와 참여율로 계산",
              "예산은 최소 단가와 비교해 실제 제안 가능성까지 점수에 반영",
              "Spring 추천 API가 실패해도 같은 계산을 프론트에서 돌려 화면을 유지",
            ],
          },
          {
            no: "03",
            tag: "Auth & Onboarding",
            title: "가입 버튼이 곧 첫 분석 시작 버튼",
            why: "가입만 시키면 사장님은 빈 대시보드를 보게 됩니다. 반대로 처음부터 입력을 많이 받으면 그 자리에서 이탈합니다.",
            how: "회원가입을 기본정보와 가게정보 두 단계로 쪼개고, 가입이 끝나는 순간 Spring이 가게를 저장한 뒤 FastAPI에 리뷰 분석을 비동기로 요청하게 했습니다. 사장님이 첫 화면에 도착했을 때 이미 분석이 돌고 있습니다.",
            points: [
              "가입 직후 진행률을 polling으로 보여줘 빈 화면 대기를 없앰",
              "분석 요청은 본문의 매장 id 대신 JWT 이메일로 매장을 재조회",
              "인증 실패 시 accessToken과 저장된 taskId를 함께 정리",
            ],
          },
        ],
      },
      flow: {
        title: "Analysis Pipeline",
        lead: "가입 버튼 한 번에서 페르소나가 나오기까지.",
        steps: [
          {
            no: "01",
            title: "리뷰 수집",
            body: "네이버와 카카오를 동시에 훑습니다. 카카오는 Playwright로 DOM을 타고 들어가고, 수집 직후 UI 노이즈를 걷어내고 중복을 지웁니다.",
            meta: "각 소스 최대 80건 · progress 10 → 40",
          },
          {
            no: "02",
            title: "스냅샷 저장",
            body: "매장명과 주소를 SHA-1로 묶은 store_key로 매장당 최신 한 벌만 남깁니다. 작업 문서는 건수와 출처 집계만 들고 스냅샷을 참조합니다.",
            meta: "raw_review_snapshots · upsert",
          },
          {
            no: "03",
            title: "전처리",
            body: "Kiwi로 일반명사와 고유명사만 뽑고, 한 글자 단어와 불용어를 지웁니다. 남는 문서가 하나도 없으면 여기서 작업을 실패로 끝냅니다.",
            meta: "Kiwi · 한국어 불용어",
          },
          {
            no: "04",
            title: "토픽 군집",
            body: "리뷰가 3건 미만이면 임베딩 없이 빈도 상위 단어로 단일 토픽을 만들고, 3건 이상이면 Ko-SBERT 임베딩 위에 BERTopic을 돌립니다. 아웃라이어 토픽은 페르소나 대상에서 뺍니다.",
            meta: "Ko-SBERT · BERTopic · KMeans fallback · progress 70",
          },
          {
            no: "05",
            title: "페르소나 생성",
            body: "토픽 키워드와 비중, 평균 평점, 리뷰 샘플을 LLM에 넘겨 매장 한 줄 요약과 페르소나, 고객 여정 4단계를 만듭니다. 세 개가 안 나오면 리뷰 기반 그룹으로 채웁니다.",
            meta: "요약 리뷰 10건 · 페르소나 리뷰 20건",
          },
          {
            no: "06",
            title: "결과 제공",
            body: "결과를 저장하고 작업을 성공으로 닫습니다. 프론트는 1.5초 간격으로 상태를 묻고, 새로고침하면 저장된 taskId로, 그것도 없으면 매장의 최신 결과로 복구합니다.",
            meta: "polling 1.5s · analysis_results",
          },
        ],
      },
      weights: {
        title: "Matching Model",
        lead: "인플루언서 추천 점수를 나눈 방식입니다. 가장 큰 비중은 팔로워가 아니라 키워드입니다.",
        total: "100점",
        items: [
          {
            label: "키워드 적합도",
            value: 30,
            max: 30,
            note: "손님 분석에서 나온 키워드와 콘텐츠 키워드가 겹치는가",
          },
          {
            label: "업종 적합도",
            value: 25,
            max: 30,
            note: "직접 일치 25점, 인접 분야 20점, 넓은 음식 범주 18점",
          },
          {
            label: "지역 적합도",
            value: 20,
            max: 30,
            note: "가게의 구 단위와 인플루언서 활동권이 겹치는가",
          },
          {
            label: "성과 지표",
            value: 15,
            max: 30,
            note: "평균 조회수 8점 + 참여율 7점. 팔로워 수는 직접 세지 않는다",
          },
          {
            label: "예산 적합도",
            value: 10,
            max: 30,
            note: "최소 단가가 제안 예산 안에 드는가. 실제 성사 가능성을 반영",
          },
        ],
      },
      spec: {
        title: "Key Specs",
        lead: "설명에 근거가 되는 숫자와 규격입니다.",
        groups: [
          {
            title: "분석 API 경계",
            rows: [
              { key: "공개 API", value: "POST /api/v1/analysis/jobs (Bearer JWT · OWNER)" },
              { key: "상태 조회", value: "GET /api/v1/analysis/jobs/{taskId}" },
              { key: "내부 호출", value: "POST /internal/v1/analysis/request" },
              { key: "내부 인증", value: "X-Pulse-Service-Token · 미설정 503 / 불일치 401" },
              { key: "타임아웃", value: "connect 3s · read 60s" },
              { key: "폴링 간격", value: "1.5초" },
            ],
          },
          {
            title: "영상 프롬프트 규격",
            rows: [
              { key: "비율 · 길이", value: "9:16 세로 · 8~10초" },
              { key: "장면 구조", value: "HOOK 0-3s / BODY 3-7s / OUTRO 7-10s" },
              { key: "묘사 공식", value: "[Shot] + [Subject] + [Action] + [Context]" },
              { key: "분위기", value: "Energy · Premium · Mood" },
              { key: "화질 모드", value: "Standard 4K · High-Def 8K" },
              { key: "고정 차단", value: "text · subtitles · watermark · logo" },
            ],
          },
          {
            title: "저장 구조",
            rows: [
              { key: "MySQL", value: "User · Shop — 인증과 권한 경계" },
              { key: "jobs", value: "상태 · 진행률 · 실패 코드 (완료 30일 TTL)" },
              { key: "raw_review_snapshots", value: "store_key 기준 매장당 최신 1벌" },
              { key: "analysis_results", value: "매장 요약 · 평점 · 페르소나 3개" },
            ],
          },
        ],
      },
      status: {
        title: "Current State",
        lead: "어디까지 실제로 돌아가는지 구분해 적었습니다.",
        liveTitle: "실 데이터로 동작",
        live: [
          "회원가입 → 가게 저장 → 분석 비동기 트리거",
          "네이버·카카오 리뷰 수집과 정규화",
          "Kiwi · Ko-SBERT · BERTopic 토픽 분석",
          "LLM 매장 요약 · 페르소나 · 고객 여정 생성",
          "최신 분석 결과 기반 손님 분석 화면",
          "카카오 지도 기반 상권 분석",
        ],
        wipTitle: "화면과 로직은 완성, 실 API 연결 전",
        wip: [
          "홍보 영상 생성 — 프롬프트 설계와 UX는 끝, 생성 엔드포인트가 아직 서버에 없음",
          "리뷰 답변 — Python에 생성 함수는 있으나 프론트가 목업 답변 사용",
          "인플루언서 매칭 — 점수 모델은 동작, 후보는 50명 시드/목업",
          "대시보드 V2 · 구독 · 마이페이지 — 시뮬레이션 응답",
        ],
        note: "남은 일은 기능을 더 만드는 것이 아니라, 이미 만들어 둔 화면을 실 API로 끝까지 잇는 것입니다.",
      },
    },
  },
  {
    id: "go",
    no: "02",
    pitch: "남들의 평균 점수가 아니라, 내가 되고 싶은 모습을 기준으로 오늘 할 일을 정합니다.",
    brief: [
      { label: "타겟", value: "레퍼런스는 저장해 두지만 내 얼굴·체형·생활에 무엇부터 적용할지 몰라 탐색을 반복하는 20~30대" },
      { label: "문제 정의", value: "정보는 넘치는데 '나에게 무엇이 필요한지' 판단할 기준이 없다. 보편 수치로 관리하는 방식은 피로만 남긴다" },
      { label: "내 역할", value: "백엔드 · AI 파이프라인 · 앱(Expo React Native) 개발 · 배포" },
      { label: "기간", value: "2026.08 · 실개발 8일 (08.13 – 08.20)" },
      { label: "대회", value: "멋쟁이사자처럼 대학 14기 중앙 해커톤 · AAC(Anti-Aging Club) 트랙 · 팀 뚝딱이들" },
      { label: "팀 구성", value: "팀 프로젝트", todo: true },
      {
        label: "현재 상태",
        value:
          "백엔드는 서버에 배포했고 앱은 EAS 빌드로 실기기에서 전체 플로우가 돕니다. PG 결제 연동과 개인정보 동의 화면은 남아 있습니다",
      },
    ],
    architecture: [
      {
        no: "01",
        title: "얼굴 사진이 API 서버를 지나가지 않는다",
        body: "업로드와 다운로드 모두 presigned URL로 앱이 스토리지와 직접 통신합니다. DB에는 객체 키만 남고, 서버는 검증할 때만 메모리로 읽고 버립니다. 얼굴 사진은 생체정보에 준하므로 서버 디스크와 백업에 쌓이지 않게 하는 것이 첫 결정이었습니다.",
      },
      {
        no: "02",
        title: "AI 호출은 전부 비동기로 뺐다",
        body: "분석은 60초까지 걸립니다. HTTP 요청은 작업만 등록하고 즉시 202를 돌려주며, 앱은 상태를 폴링합니다. 진행 상태는 메모리 큐나 세션이 아니라 DB에만 둡니다. 서버가 죽었다 살아나도 상태가 어긋나지 않습니다.",
      },
      {
        no: "03",
        title: "외부 호출을 트랜잭션 밖으로 꺼냈다",
        body: "OpenAI 호출을 트랜잭션 안에서 하면 수십 초 동안 DB 커넥션을 붙잡아 풀이 금방 마릅니다. 상태 변경만 짧은 트랜잭션으로 감싸고, 같은 클래스 내부 호출은 프록시를 타지 않으므로 트랜잭션 메서드를 별도 빈으로 분리했습니다. 비동기 시작은 커밋 이후로 걸었습니다.",
      },
      {
        no: "04",
        title: "가드레일을 프롬프트에 맡기지 않았다",
        body: "외모를 점수화하지 않는다, 시술을 권하지 않는다는 원칙을 프롬프트에만 적어두면 언젠가 샙니다. 모든 텍스트 단계를 strict JSON Schema로 강제하고, 서버가 출력에서 점수 패턴과 금지어를 다시 검사합니다. 위반하면 사유를 붙여 한 번 재생성하고, 또 위반하면 실패로 닫습니다.",
      },
      {
        no: "05",
        title: "분석권 차감은 UPDATE 한 번으로",
        body: "조회 후 저장하면 동시 요청에서 중복 차감이 납니다. 잔여가 있을 때만 1을 빼는 단일 UPDATE로 처리하고 반환값으로 성공을 판정합니다. 차감은 결과 저장과 같은 트랜잭션이라, 결과는 남았는데 차감이 안 되거나 그 반대인 상태가 생기지 않습니다.",
      },
      {
        no: "06",
        title: "관계형과 JSONB를 한 DB에 뒀다",
        body: "사용자, 구독, 루틴은 트랜잭션이 필요해 관계형으로, 필드가 계속 바뀌는 AI 결과는 JSONB로 담았습니다. 테스트는 H2 대신 Testcontainers로 실제 PostgreSQL을 띄웁니다. H2는 JSONB를 흉내만 내서 테스트가 통과해도 운영에서 깨지기 때문입니다.",
      },
    ],
    demo: {
      title: "Demo",
      lead: "해커톤에 제출한 시연 영상입니다. iPhone 실기기 녹화, 2분.",
      src: "/videos/go-demo.mp4",
      width: 884,
      height: 1920,
      posterTime: 1,
      caption: "목업이 아니라 배포한 서버에 붙은 앱을 실기기에서 녹화한 화면입니다. 온보딩과 프로필 등록, 목표 만들기, 결과와 오늘의 관리, 캘린더, 홈의 진행률, 고점 분석 입력까지 이어집니다.",
    },
    document: {
      title: "Pitch Deck",
      lead: "해커톤 본선 발표자료 원본입니다. 틀 안에서 스크롤해 끝까지 볼 수 있습니다.",
      filename: "go-hackathon.pdf",
      file: "/docs/go-hackathon.pdf",
      width: 1600,
      height: 900,
      pages: docPages("/docs/go", [
        "표지: 나의 GO.으로 가는 여정, 지금 시작해요",
        "목차: GO.는 이렇게 설계했습니다",
        "서비스 개요: 원하는 모습을 기준으로 오늘의 행동을 설계",
        "문제 정의: 정보는 많은데 나에게 무엇이 필요한지 판단할 기준이 부족하다",
        "타겟 사용자: 목표는 있지만 기준이 없는 20·30대",
        "차별점: 무엇을 기준으로, 누가 결정하는가",
        "솔루션: 개인화 기준, 통합 분석, 행동 설계",
        "사용자 흐름: 프로필 등록부터 목표 실행까지 다섯 단계",
        "결과 화면: 무엇을, 어떻게, 오늘 할지",
        "AI 기술 흐름과 기술 스택",
        "맞춤형 결과까지의 AI 분석 흐름 여섯 단계와 서버 가드레일 검증",
        "비즈니스 모델: GO. Plus 월 4,900원과 AAC 연계",
        "기대효과: 명확한 선택, 즉시 행동, 지속 변화",
        "마무리 인사",
      ]),
    },
    kicker: "해커톤 · 문제 → 해결",
    title: "GO.",
    subtitle: "원하는 모습(고점)을 기준으로 오늘의 행동을 설계하는 AI 이미지 전략 서비스",
    period: "2026.08 · 멋사 14기 중앙 해커톤",
    role: "백엔드 · AI 파이프라인 · 앱 개발 · 배포",
    stack: [
      "Spring Boot 3.3",
      "Java 21",
      "PostgreSQL 16 · JSONB",
      "Flyway",
      "OpenAI API",
      "S3 presigned URL",
      "OpenCV",
      "Expo · React Native",
      "TypeScript",
    ],
    gallery: [
      {
        src: "/images/go-cover.webp",
        alt: "GO. 서비스 표지와 앱 홈, 온보딩 화면",
        caption: "GO. — 내 마음속 이미지를 목표로 설정하고 나를 이해해 가는 서비스",
      },
      {
        src: "/images/go-overview.webp",
        alt: "현재의 나에서 맞춤 실행 전략으로 이어지는 서비스 개요",
        caption: "서비스 개요 — 정보를 더하는 것이 아니라 다음 행동을 정하는 서비스",
      },
      {
        src: "/images/go-target.webp",
        alt: "타겟 사용자: 목표는 있지만 기준이 없는 20·30대",
        caption: "타겟 — 추구미는 분명하지만 나에게 맞는지 알 기준이 없는 사람",
      },
      {
        src: "/images/go-flow.webp",
        alt: "프로필 등록, 고점 입력, 키워드 선택, 결과 확인, 목표 실행 다섯 단계 앱 화면",
        caption: "사용자 흐름 — 입력부터 실행까지 다섯 단계, AI가 추출하고 사용자가 고른다",
      },
      {
        src: "/images/go-ai.webp",
        alt: "사용자 입력, AI 분석, 사용자 선택, 전략 생성, 검증, 맞춤 결과로 이어지는 AI 분석 흐름",
        caption: "AI 흐름 — 전략 생성 뒤에 서버 가드레일 검증을 한 단계로 따로 뒀다",
      },
    ],
    metrics: [
      { value: 8, suffix: "일", label: "문서 작성부터 운영 배포까지의 실개발 기간" },
      { value: 41, suffix: "개 API", label: "백엔드 12개 도메인 · 마이그레이션 17개" },
      { value: 228, suffix: "건 테스트", label: "백엔드 통과 기준 · 프론트 119건 별도" },
    ],
    problem:
      "관리와 스타일링 정보는 SNS, 후기, 광고, 병원까지 채널마다 흩어져 있고 신뢰 수준도 제각각입니다. 사용자는 원하는 분위기의 레퍼런스를 저장해 두지만, 그것을 자기 얼굴과 체형과 생활에 어떻게 옮길지는 혼자 조합해야 합니다. 기존 서비스가 주는 점수와 평균값은 분석에는 좋아도 나에게 맞는 기준은 아니고, 수치로 관리하는 방식 자체가 피로를 만듭니다.",
    decisions: [
      {
        head: "기준을 평균이 아니라 '고점'으로 잡는다",
        body: "사용자가 글과 참고 사진으로 적은 되고 싶은 모습을 기준점으로 삼고, 현재 프로필과 비교해 피부·체형·건강 세 영역의 변화 제안을 만듭니다. 외모를 점수나 등급으로 평가하지 않는다는 것을 서비스 원칙이자 서버 검증 규칙으로 못 박았습니다.",
      },
      {
        head: "AI는 제안하고, 확정은 사용자가 한다",
        body: "AI가 뽑은 키워드 후보는 기본 선택 상태가 아닙니다. 사용자가 하나 이상 직접 골라야 결과 생성으로 넘어갑니다. 분석이 도는 동안 이 선택을 받도록 흐름을 짜서, 대기 시간이 곧 사용자가 결정하는 시간이 되게 했습니다.",
      },
      {
        head: "이미지가 실패해도 결과는 성립해야 한다",
        body: "비교 이미지 생성은 가장 느리고 정책 거부도 잦습니다. 그래서 텍스트 결과와 분리된 별도 스레드 풀에서 돌리고, 실패는 예외가 아니라 정상 상태 중 하나로 저장합니다. 이미지가 없어도 화면이 온전하고, 실패한 이미지에 재시도 비용을 더 쓰지 않습니다.",
      },
    ],
    validation:
      "로그인, 프로필 등록, 고점 입력, 키워드 선택, 결과 확인, 서랍 저장, 목표 설정, 완료 체크까지를 데모 필수 경로로 정하고, 배포한 서버와 실기기 앱으로 이 경로가 끊기지 않는지를 기준으로 삼았습니다. 가드레일 검증기는 금지 패턴별로 단위 테스트를 두었고, 재시작으로 멈춘 분석은 스케줄러가 3분 뒤 실패로 정리하되 분석권은 깎지 않는 것까지 확인했습니다.",
    deepDive: {
      contributions: {
        title: "My Contribution",
        lead: "이 프로젝트에서 제가 설계하고 구현한 세 가지입니다.",
        items: [
          {
            no: "01",
            tag: "Async Pipeline",
            title: "60초짜리 AI 작업을 요청과 분리한 분석 파이프라인",
            why: "키워드 추출, 결과 생성, 이미지 합성은 각각 수십 초가 걸립니다. 이걸 요청-응답 안에서 처리하면 앱은 멈춘 것처럼 보이고 서버는 커넥션을 붙잡은 채 기다립니다.",
            how: "분석을 상태 기계로 정의하고, 각 단계를 커밋 이후에 시작하는 비동기 작업으로 만들었습니다. 텍스트용과 이미지용 스레드 풀을 나눠 느린 이미지 생성이 텍스트 결과를 막지 않게 했습니다.",
            points: [
              "상태 전이: CREATED → EXTRACTING → KEYWORDS_READY → GENERATING → DONE",
              "OpenAI 호출은 트랜잭션 밖, 상태 저장만 짧은 트랜잭션",
              "429와 5xx만 최대 2회 재시도, 4xx는 재시도하지 않음",
              "3분 넘게 진행 상태로 남은 분석은 스케줄러가 실패 처리, 분석권은 미차감",
            ],
          },
          {
            no: "02",
            tag: "Guardrail",
            title: "외모를 다루는 서비스가 넘지 말아야 할 선을 코드로",
            why: "외모 점수화, 시술 권유, 타인 얼굴 복제는 이 서비스가 절대 하면 안 되는 일입니다. 프롬프트에 적어두는 것만으로는 보장이 되지 않습니다.",
            how: "출력 구조는 strict JSON Schema로 강제하고, 서버가 결과 텍스트에서 점수·등급 패턴과 금지어를 다시 검사합니다. 비교 이미지는 참고 사진에서 헤어스타일과 피부 상태만 가져오고 이목구비, 골격, 피부색, 옷, 배경은 사용자 것으로 고정하도록 합성 경계를 정했습니다.",
            points: [
              "위반 시 사유를 덧붙여 1회 재생성, 재위반이면 실패로 종료",
              "피부·체형·건강 각 1건인지 서버가 정합성 확인 후 우선순위 순으로 재정렬",
              "얼굴 미검출·다인 검출은 서버 OpenCV로 판정 — 같은 사진엔 항상 같은 답",
              "인바디 OCR 추출값은 확정 저장하지 않고 사용자 확인을 거침",
            ],
          },
          {
            no: "03",
            tag: "Process",
            title: "코드보다 문서를 먼저 쓴 8일",
            why: "기획, 디자인, 프론트, 백엔드, AI가 8일 안에 같은 방향을 봐야 했고, 개발의 상당 부분을 AI 에이전트와 함께 진행했습니다. 기준 문서 없이는 매 작업이 처음부터 다시 설명하는 일이 됩니다.",
            how: "PRD, ERD, API 명세, 에이전트 작업 규칙을 먼저 커밋했습니다. 첫 14개 커밋에는 기능 코드가 없습니다. 가장 큰 리스크인 AI 연동을 첫 기능 커밋에서 스파이크로 확인한 뒤 인증과 스토리지 같은 정형 작업을 붙였습니다.",
            points: [
              "커밋 131개 중 126개를 AI 에이전트와 공동 저작",
              "인수인계 문서 10개 — 세션이 바뀌어도 맥락이 이어지게",
              "같은 실수를 반복하지 않으려고 쌓은 오답 노트 21건",
              "가격 같은 정책값은 서버 한 곳에만 두어 앱 재빌드 없이 변경",
            ],
          },
        ],
      },
      flow: {
        title: "Analysis Lifecycle",
        lead: "분석 요청 한 번이 서버 안에서 지나가는 길입니다.",
        steps: [
          {
            no: "01",
            title: "요청 접수",
            body: "프로필이 있는지, 분석권이 남았는지 확인하고 분석을 생성해 커밋합니다. 응답은 즉시 돌려주고, 파이프라인은 커밋이 끝난 뒤에 시작합니다. 커밋 전에 시작하면 비동기 스레드가 아직 없는 행을 조회하게 됩니다.",
            meta: "POST /analyses · 202 Accepted · AFTER_COMMIT",
          },
          {
            no: "02",
            title: "키워드 추출",
            body: "고점 텍스트와 참고 사진에서 키워드 후보 5~8개를 뽑습니다. 후보가 하나도 나오지 않으면 더 구체적으로 적어 달라고 안내하고 예시 문장을 보여줍니다.",
            meta: "EXTRACTING → KEYWORDS_READY",
          },
          {
            no: "03",
            title: "사용자 선택",
            body: "분석 중 화면 위에 키워드 카드를 띄우고, 사용자가 1개에서 4개까지 직접 고릅니다. 고르기 전에는 저장 버튼이 비활성입니다.",
            meta: "POST /analyses/{id}/keywords/selection",
          },
          {
            no: "04",
            title: "결과 생성",
            body: "현재 프로필, 선택 키워드, 우선순위 가중치로 요약과 유지할 점, 강조할 점, 영역별 변화 3건, 오늘의 관리 3건을 만듭니다. 1순위 영역은 가장 구체적으로, 3순위는 간결하게 생성합니다.",
            meta: "GENERATING · Structured Outputs",
          },
          {
            no: "05",
            title: "후검증과 저장",
            body: "점수 패턴과 금지어, 영역별 1건 규칙을 서버가 확인한 뒤 결과 저장, 분석권 차감, 완료 처리를 한 트랜잭션으로 묶습니다.",
            meta: "OutputValidator · DONE",
          },
          {
            no: "06",
            title: "비교 이미지",
            body: "참고 사진이 있을 때만 별도 풀에서 생성합니다. 결과는 스토리지에 올리고 DB에는 키만 남깁니다. 정책 거부를 포함한 실패는 상태로 기록하고 텍스트 결과는 그대로 보여줍니다.",
            meta: "image_status = SKIPPED | PENDING | DONE | FAILED",
          },
        ],
      },
      code: {
        title: "Credit Consumption",
        lead: "동시 요청에도 분석권이 두 번 깎이지 않게 하는 쿼리입니다.",
        filename: "SubscriptionRepository.java",
        source: `@Modifying
@Query("""
    UPDATE Subscription s SET s.analysisCredits = s.analysisCredits - 1
    WHERE s.id = :id AND s.analysisCredits > 0
""")
int consumeCredit(@Param("id") UUID id);`,
        caption: "반환값이 0이면 잔여 분석권이 없다는 뜻입니다. 결과 저장과 같은 트랜잭션에서 실행하고, 타임아웃이나 정책 차단처럼 사용자 잘못이 아닌 실패에서는 호출하지 않습니다.",
      },
      spec: {
        title: "Key Specs",
        lead: "설명에 근거가 되는 설정값입니다.",
        groups: [
          {
            title: "비동기 · AI 호출",
            rows: [
              { key: "타임아웃", value: "connect 5s · read 60s" },
              { key: "재시도", value: "429 · 5xx만 최대 2회, 지수 백오프" },
              { key: "분석 풀", value: "core 8 · max 16 · queue 100" },
              { key: "이미지 풀", value: "core 4, 텍스트 파이프라인과 분리" },
              { key: "좀비 정리", value: "1분 주기, 3분 초과 시 FAILED" },
              { key: "모델 ID", value: "환경변수로 고정, 실제 사용값을 ai_jobs에 기록" },
            ],
          },
          {
            title: "스토리지 · 보안",
            rows: [
              { key: "업로드 URL", value: "PUT 300초 만료 · 10MB 상한을 서명에 포함" },
              { key: "조회 URL", value: "GET 600초 만료" },
              { key: "소유권", value: "저장 시점에 objectKey가 요청자 경로인지 재확인" },
              { key: "인증", value: "JWT Access 30분 · Refresh 14일 · Google 로그인" },
              { key: "로그", value: "사진 · 프롬프트 · 토큰 원문 미기록" },
              { key: "삭제", value: "사진·계정 삭제 시 객체 즉시 삭제" },
            ],
          },
          {
            title: "구독 모델",
            rows: [
              { key: "요금", value: "월 4,900원 · 연 49,000원" },
              { key: "무료 체험", value: "한 달 · 분석권 1회" },
              { key: "차감 시점", value: "결과 생성 성공 시, 실패하면 미차감" },
              { key: "만료 후", value: "저장한 결과와 목표는 열람 가능, 신규 생성만 차단" },
              { key: "원가 추정", value: "분석 1회 약 200~300원, 대부분 이미지 생성 (추정치)" },
              { key: "가격 근거", value: "다른 구독을 끊지 않고 추가할 수 있는 5천원 미만 구간" },
            ],
          },
        ],
      },
      status: {
        title: "Current State",
        lead: "어디까지 실제로 돌아가는지 구분해 적었습니다.",
        liveTitle: "서버와 실기기에서 동작",
        live: [
          "이메일 · Google 로그인과 토큰 갱신",
          "프로필 등록 — 사진, 우선순위, 신체 정보, 서버 얼굴 검출",
          "고점 분석 — 키워드 추출, 사용자 선택, 결과 생성, 가드레일 후검증",
          "비교 이미지 생성과 서랍 저장 · 열람",
          "목표 생성 두 경로, 완료 체크, 목표 알림",
          "상품 추천 — AI는 서버가 가진 상품 id 안에서만 선택",
          "구독 상태 전환, 만료 처리, 분석권 차감과 기능 게이팅",
        ],
        wipTitle: "남은 것 · 정하지 못한 것",
        wip: [
          "PG 결제 연동 — 구독 상태 로직은 있으나 실제 결제는 붙지 않음",
          "개인정보 동의 화면과 만 14세 확인 — 법적 요구사항, 상용 배포 전 필수",
          "키워드 정책 — 시술 용어나 제품 호수가 키워드로 나올 때의 허용 범위 미결",
          "홈 화면의 수치 표시가 '점수화하지 않는다'는 원칙과 충돌 — 정책 결정 전",
          "단일 인스턴스 전제 — 확장하려면 메시지 큐와 스케줄러 락이 필요",
          "실제 인물 사진 전수 검증과 안드로이드 Google 로그인 확인은 끝내지 못함",
        ],
        note: "한계를 숨기지 않고 문서에 미결 사항으로 남겨 두었습니다. 상용화 전에 풀어야 할 순서는 동의 화면, 수치 표시 정책, 결제 순입니다.",
      },
    },
  },
  {
    id: "vr-live",
    no: "03",
    pitch: "긴장되는 자리를, 진짜로 긴장되는 공간에서 미리 겪어봅니다.",
    brief: [
      { label: "타겟", value: "발표·면접을 앞두고 연습할 공간이 없는 사람" },
      { label: "문제 정의", value: "거울 앞 연습은 청중의 시선도, 질문이 되돌아오는 압박도 재현하지 못한다" },
      { label: "내 역할", value: "기획 · Unity 개발 · 발표/면접 플로우 구현" },
      { label: "기간", value: "2025" },
      { label: "팀 구성", value: "팀 프로젝트", todo: true },
      { label: "결과", value: "가상융합서비스 개발자 경진대회 준우승" },
    ],
    architecture: [
      {
        no: "01",
        title: "상황마다 씬을 따로 만들었다",
        body: "발표와 면접은 필요한 긴장의 종류가 다릅니다. OfficeRoom과 InterviewRoom으로 씬을 분리해 배치, 시선 처리, 인터랙션을 각각 설계했습니다. 하나의 공간에 모드만 바꿔 넣지 않은 이유입니다.",
      },
      {
        no: "02",
        title: "사용자 자료를 VR 안으로 가져왔다",
        body: "샘플 슬라이드로는 연습이 되지 않습니다. 업로드한 PDF를 이미지 슬라이드로 변환해 VR 화면 안에서 직접 넘기며 발표하도록 만들었습니다.",
      },
      {
        no: "03",
        title: "연습을 한 사이클로 닫았다",
        body: "마이크 녹음 → STT → 질문 생성 → TTS → Firestore 저장을 하나로 연결했습니다. 연습이 기록으로 남아야 다음 연습이 의미를 가집니다.",
      },
    ],
    kicker: "실감형 · 문제 → 해결",
    title: "VR Performance",
    subtitle: "발표 · 면접 · 공연을 VR 공간에서 미리 연습하는 플랫폼",
    period: "2025",
    role: "기획 · Unity 개발 · 발표/면접 플로우 구현",
    award: "가상융합서비스 개발자 경진대회 준우승",
    stack: ["Unity 3D", "C#", "XR Interaction", "Firebase", "STT / TTS"],
    gallery: [
      {
        src: "/images/vr-main.png",
        alt: "VR Performance 메인 화면",
        caption: "메인 — 발표·면접·공연 중 연습할 상황을 고른다",
      },
      {
        src: "/images/vr-office.png",
        alt: "VR Performance 발표 연습 공간",
        caption: "OfficeRoom — PDF 슬라이드를 VR 안에서 넘기며 발표",
      },
      {
        src: "/images/vr-interview.png",
        alt: "VR Performance 면접 연습 공간",
        caption: "InterviewRoom — 질문 생성과 답변 녹음이 이어지는 루프",
      },
    ],
    metrics: [
      { value: 2, suffix: "위", label: "가상융합서비스 개발자 경진대회 준우승" },
      { value: 2, suffix: "개 씬", label: "OfficeRoom · InterviewRoom 목적별 분리" },
      { value: 5, suffix: "단계", label: "녹음 → STT → 질문 생성 → TTS → 기록 저장" },
    ],
    problem:
      "발표와 면접은 연습할수록 나아지는데, 정작 긴장되는 상황 자체를 미리 겪어볼 방법이 없습니다. 거울 앞 연습은 청중의 시선도, 질문이 되돌아오는 압박도 재현하지 못합니다.",
    decisions: [
      {
        head: "하나의 공간에 다 넣지 않는다",
        body: "발표와 면접은 필요한 긴장의 종류가 다릅니다. OfficeRoom과 InterviewRoom으로 씬을 나눠 각 상황에 맞는 배치와 인터랙션을 따로 설계했습니다.",
      },
      {
        head: "실제 자료로 연습하게 한다",
        body: "샘플 슬라이드로는 연습이 되지 않습니다. 사용자가 올린 PDF를 이미지 슬라이드로 변환해 VR 화면 안에서 직접 넘기며 발표할 수 있게 만들었습니다.",
      },
      {
        head: "연습을 기록으로 남긴다",
        body: "마이크 녹음, STT, 질문 생성, TTS, Firestore 저장을 하나로 연결했습니다. 연습이 끝나고 무엇을 어떻게 말했는지 다시 볼 수 있어야 다음 연습이 의미를 가집니다.",
      },
    ],
    validation:
      "발표 → 녹음 → 피드백 → 재시도까지 한 사이클이 끊기지 않고 돌아가는지를 기준으로 잡았습니다. 경진대회 시연에서 이 흐름 전체를 라이브로 보여 준우승했습니다.",
  },
  {
    id: "dspy-ad",
    no: "04",
    pitch: "광고다움은 화질이 아니라 장면의 순서에서 나옵니다.",
    brief: [
      { label: "타겟", value: "생성 모델로 외식업 숏폼 광고를 만들려는 사람" },
      { label: "문제 정의", value: "모델에 광고를 만들라고 하면 광고가 아니라 메뉴 설명 영상이 나온다" },
      { label: "내 역할", value: "연구 · 프롬프트 설계 · 실험 · 평가" },
      { label: "기간", value: "2025 – 2026" },
      { label: "연구 성격", value: "외식업 시나리오 3개, 생성 영상 15개를 대상으로 한 방법론 중심 파일럿 연구" },
      { label: "결과", value: "JCCT 등재 · IPACT 국내학술대회 우수논문상" },
      { label: "공동 연구자", value: "김정이 (공동저자)" },
    ],
    architecture: [
      {
        no: "01",
        title: "AIDA를 장면 단위로 다시 썼다",
        body: "AIDA는 소비자 심리 단계를 설명하는 모델이라 프롬프트에 그대로 넣을 수 없습니다. Hook, Showcase, Highlight, CTA라는 숏폼 장면 기능으로 재정의해 프롬프트가 채워야 할 칸을 명시적으로 만들었습니다. 빠진 장면이 바로 보입니다.",
      },
      {
        no: "02",
        title: "DSPy를 최적화가 아니라 구조화에 썼다",
        body: "optimizer나 teleprompter는 돌리지 않았습니다. Signature와 Module 개념으로 제품 정보, 광고 목적, 대상 시청자, 장면 구조, 제약 조건을 필드로 고정해, 즉흥적인 문장 확장에서 매번 빠지던 장면 흐름과 CTA가 절차 안에 항상 들어가게 했습니다.",
      },
      {
        no: "03",
        title: "평가를 셋으로 나누고 합치지 않았다",
        body: "CLIP은 프레임과 문장의 의미 대응, Gemini VQA는 광고 구조와 CTA 식별, 전문가 평가는 광고 시안으로서의 활용 가능성을 봅니다. 셋은 같은 뜻의 품질 점수가 아니어서 통합점수를 만들지 않았습니다.",
      },
      {
        no: "04",
        title: "비교군을 다섯으로 뒀다",
        body: "사용자 기본, 직접 LLM, DSPy 구조화, 수동 템플릿, 루브릭 반영 프롬프트를 같은 세 시나리오에 적용했습니다. 장면 구조가 프롬프트에 반영되는 정도와 방식만 다르게 두어, 구조화가 어느 항목에서 차이를 만드는지 조건별로 확인했습니다.",
      },
      {
        no: "05",
        title: "모델 평가는 세 번 반복했다",
        body: "멀티모달 모델의 채점은 같은 입력에도 흔들립니다. 동일한 대표 프레임과 동일한 평가 프롬프트로 영상당 3회 반복해 평균과 표준편차를 같이 보고했습니다. 점수만이 아니라 그 점수가 얼마나 흔들리는지도 결과로 남겼습니다.",
      },
      {
        no: "06",
        title: "실제 광고에서는 구조만 빌렸다",
        body: "공개된 외식업 광고 사례를 분석하되 브랜드명, 로고, 고유 메뉴명, 유명 인물, 캠페인 문구는 가져오지 않고 장면 기능과 제품 제시 방식만 추상화했습니다. 표본 수를 미리 정하지 않고, 새 구조 범주가 더 나오지 않을 때까지 단계적으로 분석했습니다.",
      },
    ],
    kicker: "연구 · 문제 → 해결",
    title: "AD Video Generation",
    subtitle: "DSPy 기반 광고 영상 프롬프트 생성 프레임워크 연구",
    period: "2025 – 2026 · JCCT 등재",
    role: "연구 · 프롬프트 설계 · 실험 · 평가",
    award: "IPACT 국내학술대회 우수논문상",
    stack: ["DSPy", "Vertex AI · VEO", "CLIP ViT-B/32", "Gemini 2.5 Flash VQA", "AIDA"],
    gallery: [
      {
        src: "/images/jcct-dspy-paper.png",
        alt: "JCCT 등재 논문 지면",
        caption: "논문 — 광고 장면 구조 분석 기반 DSPy 프롬프트 생성 프레임워크",
      },
      {
        src: "/images/ipact-presentation.webp",
        alt: "IPACT 국내학술대회 발표 현장",
        caption: "IPACT 2026 — 국내학술대회 현장 발표",
      },
      {
        src: "/images/ipact-award.webp",
        alt: "IPACT 우수논문상 상장",
        caption: "우수논문상 — 2026.06.26 수상",
      },
    ],
    metrics: [
      { value: 15, suffix: "개 영상", label: "외식업 시나리오 3개 × 프롬프트 방식 5개" },
      { value: 3, suffix: "중 평가", label: "CLIP · VQA 3회 반복 · 전문가 — 통합점수 없이 따로 해석" },
      { value: 4, suffix: "장면", label: "Hook · Showcase · Highlight · CTA로 재구성한 AIDA" },
    ],
    problem:
      "생성 모델에 음식점 광고를 만들라고 하면 메뉴 설명 영상이 나옵니다. 광고답게 만드는 것은 화질이 아니라 장면의 순서인데, 프롬프트에는 그 구조가 들어갈 자리가 없었습니다.",
    decisions: [
      {
        head: "AIDA를 장면 단위로 다시 쓴다",
        body: "마케팅 이론인 AIDA를 그대로 쓰지 않고 Hook, Showcase, Highlight, CTA라는 숏폼 장면 구조로 재구성했습니다. 프롬프트가 채워야 할 칸이 명시적으로 생깁니다.",
      },
      {
        head: "프롬프트를 문장이 아니라 명세로 다룬다",
        body: "묘사를 길게 쓰는 것만으로는 장면 순서가 생기지 않습니다. DSPy의 Signature로 입력과 출력 필드를 선언하고 Module이 네 장면 구조를 주입하게 해, 어떤 제품이 들어와도 같은 절차로 프롬프트가 만들어지게 했습니다.",
      },
      {
        head: "평가를 한 점수로 뭉개지 않는다",
        body: "CLIP은 프레임이 문장과 닮았는지만 보고, 시간 흐름과 CTA는 보지 못합니다. 그래서 CLIP, Gemini VQA, 전문가 평가를 따로 두고 각각 무엇을 설명하는 지표인지 한정해서 해석했습니다.",
      },
    ],
    validation:
      "버거, 디저트 크로플, 샐러드볼 세 시나리오에 다섯 방식을 적용해 영상 15개를 만들고 비교했습니다. CLIP은 직접 LLM 프롬프트가 가장 높았지만 광고 구조 항목은 DSPy 구조화 프롬프트가 3.83으로 가장 높았고, 전문가 3인 평가에서도 세 시나리오 모두 최상위 경향이었습니다. 소규모 파일럿이라 일반적 우위가 아니라 이 조건에서 관찰된 경향으로만 보고했습니다. 결과는 JCCT에 등재되었고 IPACT 국내학술대회에서 우수논문상을 받았습니다.",
    deepDive: {
      contributions: {
        title: "Research Design",
        lead: "이 연구에서 제가 설계한 세 가지입니다.",
        items: [
          {
            no: "01",
            tag: "Scene Structure",
            title: "AIDA를 프롬프트가 채울 네 칸으로",
            why: "AIDA는 주의, 관심, 욕구, 행동이라는 소비자 반응의 흐름을 설명합니다. 그런데 영상 프롬프트에 적어야 하는 것은 심리 단계가 아니라 장면의 기능, 제품을 보여주는 방식, 마지막 행동 유도입니다.",
            how: "공개된 외식업 광고에서 반복되는 장면 기능을 뽑아 Attention은 Hook, Interest는 Showcase, Desire는 Highlight, Action은 CTA로 대응시키고, 장면마다 프롬프트에 반영할 요소를 조작적으로 정의했습니다. 새 광고 이론이 아니라 기존 설득 흐름을 프롬프트 설계용으로 다시 쓴 분석 틀입니다.",
            points: [
              "Hook — 첫 장면, 시선 유도, 움직임, 강한 제품 단서",
              "Showcase — 제품 형태, 재료, 조리 또는 제공 상황",
              "Highlight — 질감, 맛, 신선함, 차별적 장점",
              "CTA — 방문·주문·구매, 마무리 화면, 메시지가 들어갈 여백",
            ],
          },
          {
            no: "02",
            tag: "DSPy Signature",
            title: "한 줄 요청을 입출력 명세로 분해",
            why: "사용자 요청을 LLM의 즉흥적인 문장 확장에 맡기면 제품 정보, 장면 흐름, CTA, 금지 조건이 일관되게 들어가지 않습니다. 빠지는 항목이 매번 다릅니다.",
            how: "요청을 제품 정보, 광고 목적, 대상 시청자, 장면 구조, 제약 조건 다섯 입력 필드로 나누고, 스토리보드형 프롬프트와 Veo 프롬프트 두 출력으로 내보내는 Signature를 정의했습니다. 장면 구조는 Module이 고정값으로 넣습니다.",
            points: [
              "입력 필드 5개, 출력 필드 2개로 절차를 고정",
              "같은 절차를 버거, 크로플, 샐러드볼 세 시나리오에 그대로 재사용",
              "optimizer는 실행하지 않았고, 논문에도 그렇게 명시",
              "표현을 \"DSPy 기반 최적화\"가 아니라 \"Signature/Module 개념 기반 생성 프레임워크\"로 한정",
            ],
          },
          {
            no: "03",
            tag: "Evaluation",
            title: "지표마다 설명할 수 있는 범위를 한정",
            why: "프레임에 제품과 재료가 보이기만 하면 CLIP Score는 잘 나옵니다. 그 영상이 Hook에서 CTA까지 흐르는지는 CLIP으로 알 수 없습니다. 한 점수로 합치면 이 차이가 사라집니다.",
            how: "CLIP은 의미 대응 보조 지표, VQA는 모델 기반 준정량 보조 평가, 전문가 평가는 광고 시안 관점의 보완 자료로 역할을 나눴습니다. VQA는 같은 프레임과 같은 평가 프롬프트로 세 번 반복해 채점 변동성을 같이 봤습니다.",
            points: [
              "CLIP — 영상당 8프레임 균등 추출, 프레임과 프롬프트의 의미 유사도",
              "VQA — 대표 4프레임을 시간순으로 주고 5개 항목을 1~5점으로 채점",
              "깨지거나 읽을 수 없는 생성 텍스트에는 점수를 주지 않도록 평가 프롬프트에 명시",
              "전문가 문항은 프레임워크를 몰라도 답할 수 있는 쉬운 자연어로 구성",
            ],
          },
        ],
      },
      flow: {
        title: "Prompt Framework",
        lead: "한 줄짜리 요청이 Veo 프롬프트가 되기까지.",
        steps: [
          {
            no: "01",
            title: "사용자 요청",
            body: "\"수제 버거 광고를 만들어줘\" 같은 한 줄에서 시작합니다. 이 문장만으로도 제품 외형은 나오지만, 주목 유도에서 행동 유도까지의 흐름은 안정적으로 만들어지지 않습니다.",
            meta: "비교군 A는 이 요청을 그대로 사용",
          },
          {
            no: "02",
            title: "필드 추출",
            body: "요청에서 제품 정보, 광고 목적, 대상 시청자, 제약 조건을 분리합니다. 넣지 말아야 할 것, 즉 금지 조건도 이 단계에서 제약 조건 필드로 따로 잡습니다.",
            meta: "product_info · ad_goal · target_audience · constraints",
          },
          {
            no: "03",
            title: "장면 구조 배치",
            body: "추출한 정보를 Hook, Showcase, Highlight, CTA 네 장면에 나눠 놓습니다. 어떤 정보가 어느 장면에서 쓰이는지가 여기서 정해집니다.",
            meta: "scene_structure = Hook → Showcase → Highlight → CTA",
          },
          {
            no: "04",
            title: "Signature 구성",
            body: "입력과 출력의 관계를 DSPy Signature로 선언합니다. 긴 문자열 프롬프트를 시행착오로 고치는 대신, 무엇이 들어가고 무엇이 나와야 하는지를 먼저 고정합니다.",
            meta: "InputField 5 · OutputField 2",
          },
          {
            no: "05",
            title: "스토리보드형 프롬프트 생성",
            body: "Module이 장면 구조를 주입해 장면 단위의 스토리보드 프롬프트를 만듭니다. 장면별로 빠진 칸이 있는지 이 출력에서 바로 확인할 수 있습니다.",
            meta: "storyboard_prompt",
          },
          {
            no: "06",
            title: "Veo 프롬프트 출력",
            body: "스토리보드를 영상 생성 모델이 읽는 최종 프롬프트로 내보내고, Vertex AI의 Veo로 세로형 숏폼 광고 영상을 생성합니다.",
            meta: "veo_prompt · Vertex AI",
          },
        ],
      },
      code: {
        title: "Signature",
        lead: "프레임워크의 뼈대는 이 선언 하나입니다.",
        filename: "ad_prompt.py",
        source: `class AdPromptSignature(dspy.Signature):
    product_info = dspy.InputField()
    ad_goal = dspy.InputField()
    target_audience = dspy.InputField()
    scene_structure = dspy.InputField(desc="Hook, Showcase, Highlight, CTA")
    constraints = dspy.InputField()
    storyboard_prompt = dspy.OutputField()
    veo_prompt = dspy.OutputField()


class AdPromptModule(dspy.Module):
    def forward(self, product_info, ad_goal, target_audience, constraints):
        scene_structure = ["Hook", "Showcase", "Highlight", "CTA"]
        return generate_prompt(product_info, ad_goal, target_audience,
                               scene_structure, constraints)`,
        caption: "논문에 실은 의사코드입니다. DSPy의 선언적 입출력 구성만 가져왔고 optimizer는 실행하지 않았습니다.",
      },
      weights: {
        title: "VQA Rubric",
        lead: "Gemini 2.5 Flash가 채점한 다섯 항목과, VQA 평균을 낼 때 쓴 비중입니다. 이 평균은 순위가 아니라 해석용 보조 점수입니다.",
        total: "100%",
        items: [
          {
            label: "광고 구조",
            value: 25,
            max: 25,
            note: "Hook, Showcase, Highlight, CTA 흐름이 식별되는가. 1점은 장면 역할 식별이 어려움, 5점은 역할과 흐름이 명확함",
          },
          {
            label: "제품 정보 반영",
            value: 25,
            max: 25,
            note: "제품의 재료, 형태, 질감, 분위기가 드러나는가",
          },
          {
            label: "시각적 완성도",
            value: 20,
            max: 25,
            note: "광고 영상으로서 구도, 조명, 질감이 자연스러운가",
          },
          {
            label: "생성 안정성",
            value: 15,
            max: 25,
            note: "왜곡, 깨짐, 비정상 객체, 깨진 텍스트가 적은가",
          },
          {
            label: "CTA 적합성",
            value: 15,
            max: 25,
            note: "방문, 주문, 구매를 유도하는 장면 또는 여백이 확인되는가",
          },
        ],
      },
      results: {
        title: "Results",
        lead: "그룹별 평균입니다. 열마다 가장 높은 값을 강조했고, 색이 깔린 행이 제안 방식입니다.",
        columns: [
          { label: "CLIP", digits: 3, best: "max" },
          { label: "VQA 평균", digits: 2, best: "max" },
          { label: "표준편차", digits: 2, best: "none" },
          { label: "광고 구조", digits: 2, best: "max" },
          { label: "제품 반영", digits: 2, best: "max" },
          { label: "시각 품질", digits: 2, best: "max" },
          { label: "생성 안정성", digits: 2, best: "max" },
          { label: "CTA", digits: 2, best: "max" },
        ],
        verdictLabel: "전문가 평가",
        rows: [
          {
            tag: "A",
            name: "사용자 기본",
            values: [0.318, 3.83, 0.27, 2.56, 4.39, 4.78, 4.83, 2.72],
            verdict: "중간 이상",
          },
          {
            tag: "B",
            name: "직접 LLM",
            values: [0.329, 3.76, 0.35, 2.17, 4.83, 4.72, 4.72, 2.39],
            verdict: "상위",
          },
          {
            tag: "C",
            name: "DSPy 구조화",
            values: [0.289, 3.97, 0.65, 3.83, 4.56, 4.33, 3.78, 2.94],
            verdict: "최상위",
            focus: true,
          },
          {
            tag: "D",
            name: "수동 템플릿",
            values: [0.278, 2.96, 1.05, 2.17, 3.56, 3.56, 2.56, 2.89],
            verdict: "하위",
          },
          {
            tag: "E",
            name: "루브릭 반영",
            values: [0.274, 3.79, 0.9, 2.72, 4.56, 4.61, 3.67, 3.33],
            verdict: "중간",
          },
        ],
        notes: [
          "CLIP은 직접 LLM(B)이 가장 높은데, 광고 구조는 B가 가장 낮습니다. 묘사가 풍부해지면 프레임은 문장과 닮아가지만 장면 순서가 생기지는 않았습니다.",
          "DSPy 구조화(C)는 광고 구조 3.83으로 나머지 그룹(2.17~2.72)과 차이가 가장 컸습니다. 반면 시각 품질과 생성 안정성은 A, B보다 낮았습니다. 구조 항목의 이득과 안정성 항목의 손해가 함께 나타났습니다.",
          "CTA는 루브릭 반영(E)의 3.33이 최고였습니다. 행동 유도 장면은 어느 방식에서도 아직 뚜렷하게 나오지 않았습니다.",
          "전문가 평가는 원점수 대신 그룹별 상대 경향으로 보고했습니다. 평가자 3명, 영상 15개 기준입니다.",
        ],
      },
      spec: {
        title: "Experiment Specs",
        lead: "결과를 읽을 때 근거가 되는 실험 조건입니다.",
        groups: [
          {
            title: "실험 설계",
            rows: [
              { key: "시나리오", value: "버거 · 디저트 크로플 · 샐러드볼" },
              { key: "프롬프트 방식", value: "A 사용자 기본 · B 직접 LLM · C DSPy 구조화 · D 수동 템플릿 · E 루브릭 반영" },
              { key: "생성 영상", value: "15개 · 세로형 숏폼 광고" },
              { key: "생성 모델", value: "Google Veo (Vertex AI)" },
              { key: "통합점수", value: "산출하지 않음 — 세 평가를 따로 해석" },
            ],
          },
          {
            title: "모델 기반 평가",
            rows: [
              { key: "CLIP 모델", value: "openai/clip-vit-base-patch32" },
              { key: "CLIP 프레임", value: "영상당 8장 균등 간격 추출" },
              { key: "VQA 모델", value: "Gemini 2.5 Flash" },
              { key: "VQA 프레임", value: "대표 4장 · 시간순 입력" },
              { key: "척도 · 반복", value: "5개 항목 1~5점 · 영상당 3회, 평균과 표준편차" },
              { key: "출력 형식", value: "항목별 점수와 근거를 JSON으로 고정" },
            ],
          },
          {
            title: "전문가 평가",
            rows: [
              { key: "평가자 · 대상", value: "3명 · 영상 15개 · 1~5점" },
              { key: "문항", value: "광고 흐름 · 음식 인식 · 재료와 질감 · 구도와 조명 · 생성 오류 · 행동 유도 · 시안 활용 가능성" },
              { key: "문항 원칙", value: "프레임워크를 몰라도 답할 수 있는 쉬운 자연어" },
              { key: "보고 방식", value: "원점수 대신 그룹별 상대 경향" },
              { key: "향후 보완", value: "CVI (I-CVI · S-CVI/Ave) 기반 평가표 타당도 검토" },
            ],
          },
        ],
      },
      status: {
        title: "Claims & Limits",
        lead: "어디까지 말할 수 있는 결과인지 선을 그었습니다.",
        liveTitle: "이 조건에서 관찰된 것",
        live: [
          "DSPy 구조화 프롬프트가 VQA 광고 구조 항목에서 가장 높음 (3.83)",
          "전문가 3인 평가에서 세 시나리오 모두 DSPy 구조화가 최상위 경향",
          "직접 LLM 프롬프트가 CLIP(0.329)과 제품 반영(4.83)에서 가장 높음",
          "지표마다 1위 그룹이 다름 — CLIP만으로는 광고 구조를 판단할 수 없음",
          "수동 템플릿은 평균이 가장 낮고 반복 평가 편차(1.05)도 가장 큼",
        ],
        wipTitle: "주장하지 않는 것 · 한계",
        wip: [
          "특정 방식의 일반적 우위 — 시나리오 3개, 영상 15개의 파일럿",
          "DSPy 자동 최적화의 효과 — optimizer를 쓰지 않았으므로 검증 대상이 아님",
          "VQA 점수의 절대성 — 사람 평가를 대체하지 않는 모델 기반 보조 자료",
          "광고 효과 — 실제 소비자 반응이나 집행 성과는 다루지 않음",
          "저작권 · 상표권 · 초상권 · 브랜드 모방 가능성은 향후 검토 과제",
        ],
        note: "다음 단계는 평가자 규모를 늘리고, CVI로 평가표를 검토하고, 실제 사용자 평가를 병행하는 것입니다.",
      },
    },
  },
  {
    id: "nullnull",
    no: "05",
    pitch: "\"실시간\"이라는 데이터가 사실은 30분 밀려 있다면, 무엇으로 메울 수 있을까.",
    brief: [
      { label: "타겟", value: "혼잡·날씨 때문에 시간을 버리는 서울 방문 외국인 여행자" },
      { label: "문제 정의", value: "서울시 실시간 도시 데이터는 30분 가까이 지연돼, 보고 출발하면 상황이 이미 달라져 있다" },
      { label: "내 역할", value: "팀장 · 기획 · UI 설계 · 프로토타입" },
      { label: "기간", value: "2025 · All Day Project" },
      { label: "범위", value: "PRD · 화면 구조 · 발표 가능한 프로토타입까지 (실서비스 구현 전)" },
      { label: "팀 구성", value: "5인 팀 ALLDAY PROJECT · 팀장" },
    ],
    architecture: [
      {
        no: "01",
        title: "지연을 다른 데이터로 메웠다",
        body: "도시 데이터를 더 자주 부르는 대신, 지연이 없는 지하철 승하차 데이터와 날씨를 붙여 T-30 구간을 보정하는 Nowcasting 구조를 제안했습니다. 더 좋은 소스가 없을 때 쓰는 현실적인 방법입니다.",
      },
      {
        no: "02",
        title: "막혔다는 정보로 끝내지 않았다",
        body: "혼잡하다는 말만 주면 여행자는 계획을 통째로 잃습니다. 막힌 장소마다 대안을 함께 띄우는 것을 화면 설계의 기본 규칙으로 못 박았습니다.",
      },
      {
        no: "03",
        title: "구현 범위를 먼저 확정했다",
        body: "짧은 기간에 전부 만들 수 없다는 것을 인정하고 PRD, 화면 구조, 발표 가능한 프로토타입까지로 범위를 잘랐습니다. 남은 구현은 문서로 남겼습니다.",
      },
    ],
    document: {
      title: "Pitch Deck",
      lead: "아이디어톤 최종 발표자료 원본입니다. 틀 안에서 스크롤해 끝까지 볼 수 있습니다.",
      filename: "nullnull-ideathon.pdf",
      file: "/docs/nullnull-ideathon.pdf",
      width: 1600,
      height: 900,
      pages: docPages("/docs/nullnull", [
        "표지: 널널(NULL NULL), 서울 여행의 헛걸음을 줄이는 AI 혼잡 예측 서비스",
        "목차",
        "간지: 프로젝트 소개",
        "팀 소개: ALLDAY PROJECT",
        "앱 소개: 복잡한 도심 속, 당신을 위한 널널한 공간을 찾아서",
        "간지: 문제 정의",
        "서비스 필요성: 인파 집중과 특정 지역 방문객 쏠림",
        "사용자 조사: 대학생, 직장인, 고등학생 인터뷰",
        "페인포인트 세 가지",
        "타겟 페르소나: 혼잡으로 계획이 틀어지는 사용자",
        "페르소나의 니즈와 그에 대응하는 솔루션",
        "간지: 해결 방안 및 핵심 기능",
        "기존 서비스: 서울시 실시간 도시데이터와 지도 서비스",
        "차별점",
        "핵심 기능 흐름도: 서울시, 지하철, 날씨 API에서 Data Fusion과 AI 예측으로",
        "핵심 기능 1: AI 혼잡도 예측",
        "핵심 기능 2: AI 대안 추천",
        "간지: 앱 구성",
        "서비스 개요: 메뉴 구조",
        "사용자 흐름 네 단계",
        "UI/UX 화면 구성: 홈",
        "UI/UX 화면 구성: 널널 AI",
        "UI/UX 화면 구성: 지도와 일정",
        "UI/UX 화면 구성: 마이페이지",
        "간지: 기대 효과 및 향후 계획",
        "기대효과: 사용자와 서비스·시장 측면",
        "향후 계획: 커뮤니티, 수익 모델, 글로벌 확장",
        "마무리 인사",
      ]),
      note: "문제 정의에서 사용자 조사, 페르소나, 핵심 기능, 화면 구성, 향후 계획까지 28쪽입니다. 구현보다 기획과 설득의 과정을 보여주는 자료입니다.",
    },
    kicker: "프로토타입 · 문제 → 해결",
    title: "NULL NULL AI",
    subtitle: "서울 여행자의 헛걸음을 줄이는 AI Nowcasting 앱",
    period: "2025 · All Day Project",
    role: "팀장 · 기획 · UI 설계 · 프로토타입",
    stack: ["Expo Router", "React Native Web", "TypeScript", "Nowcasting"],
    gallery: [
      {
        src: "/images/nullnull-home.png",
        alt: "NULL NULL AI 홈 화면",
        caption: "홈 — 지금 가도 괜찮은 장소를 혼잡도 기준으로 제시",
      },
      {
        src: "/images/nullnull-onboarding.png",
        alt: "NULL NULL AI 온보딩 화면",
        caption: "온보딩 — 외국인 여행자 기준으로 필요한 정보만 단계적으로",
      },
      {
        src: "/images/nullnull-ai.png",
        alt: "NULL NULL AI 추천 화면",
        caption: "Nowcasting — 지연된 도시 데이터를 실시간 신호로 보정",
      },
      {
        src: "/images/nullnull-detail.png",
        alt: "NULL NULL AI 장소 상세 화면",
        caption: "상세 — 막혔을 때의 대안 장소까지 함께 제안",
      },
    ],
    metrics: [
      { value: 30, prefix: "T-", suffix: "분", label: "서울시 실시간 도시 데이터의 구조적 지연" },
      { value: 0, prefix: "T-", suffix: "분", label: "지하철 승하차 데이터로 메운 시점" },
      { value: 3, suffix: "종 신호", label: "혼잡도 · 날씨 · 이동 변수 결합" },
    ],
    problem:
      "서울시 실시간 도시 데이터는 이름과 달리 30분 가까이 밀립니다. 여행자가 지금 사람이 적다는 화면을 보고 출발하면, 도착했을 때는 이미 상황이 달라져 있습니다.",
    decisions: [
      {
        head: "지연을 다른 데이터로 메운다",
        body: "도시 데이터를 더 자주 부르는 대신, 지연이 없는 지하철 승하차 데이터와 날씨 정보를 붙여 T-30 구간을 보정하는 Nowcasting 구조를 제안했습니다.",
      },
      {
        head: "막혔다고 알리고 끝내지 않는다",
        body: "혼잡하다는 정보만 주면 여행자는 계획을 통째로 잃습니다. 막힌 장소마다 대안 장소를 함께 띄우는 것을 화면 설계의 기본 규칙으로 잡았습니다.",
      },
      {
        head: "구현 범위를 먼저 못 박는다",
        body: "짧은 기간에 전부 만들 수 없다는 것을 인정하고 PRD, 화면 구조, 발표 가능한 프로토타입까지로 범위를 확정했습니다. 남은 구현은 문서로 남겼습니다.",
      },
    ],
    validation:
      "외국인 여행자를 기준 사용자로 두고 혼잡도 지도, 날씨 필터, 대안 추천 흐름을 프로토타입으로 검증했습니다. 기획 단계에서 끝나는 것을 전제로 PRD와 발표자료까지 정리했습니다.",
  },
];

export type SideWork = {
  title: string;
  desc: string;
  tags: string[];
  cover: string;
  alt: string;
};

export const sideWorks: SideWork[] = [
  {
    title: "TripCode",
    desc: "여행 전 실제 장소의 분위기와 동선을 미리 확인하도록 기획한 디지털 트윈 기반 O2O 가이드입니다. React Native 화면과 Flask 서버로 초기 구조를 실험했습니다.",
    tags: ["React Native", "Python", "Flask"],
    cover: "/images/tripcode-main.png",
    alt: "TripCode 메인 화면",
  },
  {
    title: "Unity 3D 탱크 게임",
    desc: "Rigidbody 물리, 지형 이동, 적 AI를 직접 구현하며 Unity 엔진의 기본 동작을 익힌 3D 게임 프로젝트입니다.",
    tags: ["Unity 3D", "C#", "Game Physics"],
    cover: "/images/tank-1.png",
    alt: "Unity 3D 탱크 게임 플레이 화면",
  },
  {
    title: "LoL 웹사이트 클론",
    desc: "공식 페이지 구조를 분석하고 HTML/CSS Grid와 Flex로 레이아웃을 재현한 웹 퍼블리싱 학습 프로젝트입니다.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    cover: "/images/lol.png",
    alt: "리그 오브 레전드 클론 페이지",
  },
  {
    title: "멀티미디어 콘텐츠",
    desc: "동아리 모집 포스터와 릴스 영상을 제작하며 메시지를 시각 콘텐츠로 정리하는 감각을 익힌 작업입니다.",
    tags: ["Photoshop", "Premiere Pro", "Design"],
    cover: "/images/multimedia-poster.png",
    alt: "동아리 모집 포스터",
  },
];
