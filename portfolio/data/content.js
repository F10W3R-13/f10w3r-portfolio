/*
 * 포트폴리오 콘텐츠 — 단일 갱신 지점 (Single Update Point)
 * 원천: minwo0___/60 개인 기록/profile.md (✅ 항목만 반영)
 * 규칙:
 *   1) 모든 표시 문자열은 { ko, en } 이중 구조. 새 항목 추가 시 두 언어 모두 필수.
 *   2) 표시 변형(정렬·강조·티어·우승 여부)은 데이터 필드로 표현 — render.js의 항목별 조건문 금지.
 *   3) 민감 정보(병역·연봉·계약·학번·건강) 반영 금지 — tests/content.test.js가 차단.
 *   4) 수치는 검증된 값만: 101명/864경기(NA 데이터 관리 시즌), 389경기·2026.08(코칭 허브 운영),
 *      8에디션/77.8시간/25 VOD/약3.6만 조회(커뮤니티 대회). 임의 수치 생성 금지.
 */
export const PORTFOLIO_CONTENT = {

  meta: {
    version: 2,
    updated: '2026-08-24',
    defaultLang: 'ko',
    langs: ['ko', 'en'],
    sourceOfTruth: 'minwo0___/60 개인 기록/profile.md',
  },

  // 페이지 조립 — sections 배열 순서 = 렌더 순서 (순서 교체도 이 파일 편집으로)
  page: {
    sections: ['hero', 'career', 'achievements', 'projects', 'skills', 'education', 'contact'],
  },

  // UI 라벨 사전 (섹션 제목·버튼 문구 등 — 콘텐츠가 아닌 인터페이스 문자열)
  ui: {
    player: { ko: '선수', en: 'Player' },
    coach: { ko: '코치', en: 'Coach' },
    demo: { ko: '라이브 데모', en: 'LIVE DEMO' },
    liveDemoCta: { ko: '라이브 데모 보기', en: 'View live demo' },
    current: { ko: '현재', en: 'Present' },
    expand: { ko: '하위 티어 성적 더 보기', en: 'Show lower-tier results' },
    collapse: { ko: '접기', en: 'Collapse' },
    headings: {
      career: { ko: '커리어', en: 'Career' },
      achievements: { ko: '주요 성적', en: 'Results' },
      projects: { ko: '프로젝트', en: 'Projects' },
      skills: { ko: '스킬', en: 'Skills' },
      education: { ko: '학적', en: 'Education' },
      contact: { ko: '연락', en: 'Contact' },
    },
  },

  profile: {
    name: { ko: '유민우', en: 'Yoo Min-woo' },
    ign: 'F10W3R',
    role: { ko: 'CODM 프로 코치 · 이스포츠 운영/기획 지원', en: 'CODM Pro Coach · Esports Operations & Planning' },
    base: { ko: '수도권, 대한민국', en: 'Seoul Capital Area, South Korea' },
    availability: { ko: '수도권 + 해외 이동 가능', en: 'Open to relocation abroad' },
    contact: {
      // email은 신규 생성 전까지 null — 렌더러는 null이면 표시 생략
      email: null,
      github: 'https://github.com/F10W3R-13',
      twitter: 'https://twitter.com/F_L_WR',
      youtube: 'https://www.youtube.com/channel/UC9h1aAAsOprTATC0_y2pt3A',
      liquipedia: 'https://liquipedia.net/callofduty/F10W3R',
    },
  },

  hero: {
    ign: 'F10W3R',
    name: { ko: '유민우', en: 'Yoo Min-woo' },
    tagline: {
      ko: '선수에서 코치로, 이제 운영·기획으로',
      en: 'From player to coach, now building esports operations',
    },
    intro: {
      ko: 'T1 선수 출신, 6년간 12개 팀에서 CODM 무대를 누볐습니다. 리그 운영 체계를 설계하고, GPT-4.1 기반 데이터 파이프라인을 직접 구축하며 현장과 시스템을 함께 움직입니다.',
      en: 'Ex-T1 player with 12 teams over six years on the CODM stage. I design league operations and build GPT-4.1 data pipelines myself. I move the front line and the systems behind it together.',
    },
    stats: [
      { value: '101', label: { ko: '관리 선수 (NA 시즌)', en: 'Players managed (NA season)' } },
      { value: '864', label: { ko: '기록한 매치', en: 'Matches recorded' } },
      { value: '12', label: { ko: '거친 팀 (선수 3 · 코치 9)', en: 'Teams (3 as player, 9 as coach)' } },
      { value: '1', label: { ko: '국제 대회 우승 (SPS S5 NA)', en: 'International title (SPS S5 NA)' } },
    ],
  },

  career: {
    span: '2020-2026',
    // 기간·팀은 Liquipedia(Coaching/Results) 원본 날짜 그대로 (2026-08-24 사용자 확인)
    player: [
      { period: '2020.05.27-2020.08.12', team: 'Allure' },
      { period: '2020.08.12-2020.10.22', team: '1K Gaming' },
      { period: '2020.10.22-2021.03.30', team: 'T1' },
    ],
    coach: [
      { period: '2021.04.09-2021.04.14', team: 'BK ROG White' },
      { period: '2021.04.14-2021.06.14', team: 'BK ROG Esports' },
      { period: '2021.06.14-2021.10.05', team: 'Oxygen Esports' },
      { period: '2021.11.11-2021.12.31', team: 'TR' },
      { period: '2023.11.12-2024.01.09', team: 'abz' },
      { period: '2024.03.27-2024.05.14', team: 'Seminal' },
      { period: '2024.07.14-2024.08.27', team: 'Nexus' },
      { period: '2024.08.27-2024.10.07', team: 'LG' },
      { period: '2024.10.29-2024.11.17', team: 'Team Felines' },
      { period: '2025.03.09-2026.03.09', team: 'OUG' },
      { period: { ko: '2026.05.28-현재', en: '2026.05.28-Present' }, team: 'Sybarites', current: true },
    ],
  },

  achievements: {
    // tier: 'S'|'A'|'B'|'C' · won: 우승 여부 · role: 선수/코치 — 정렬·표시 변형은 이 필드로만
    // 2026-08-24 Liquipedia 대조 보강(6건 추가). 역할 임시 태그: Unrivalled·Mobile Mayhem Summer·Mobile Mayhem Spring
    list: [
      { date: '2025.04.30', event: 'China Masters 2025: S9', tier: 'S', won: false, result: { ko: '7-8위', en: '7th-8th' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2024.10.05', event: 'CODM World Championship 2024', tier: 'S', won: false, result: { ko: '5-8위', en: '5th-8th' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2024.08.10', event: 'Snapdragon Pro Series S5: NA', tier: 'A', won: true, result: { ko: '우승', en: 'Champion' }, role: { ko: '코치', en: 'Coach' }, highlight: true },
      { date: '2024.04.13', event: 'Snapdragon Mobile Masters 2024', tier: 'S', won: false, result: { ko: '3-4위', en: '3rd-4th' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2023.12.01', event: 'Odyssey Gaming Festival', tier: 'A', won: false, result: { ko: '5-8위', en: '5th-8th' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2023.08.06', event: 'Snapdragon Pro Series S3: Japan', tier: 'A', won: false, result: { ko: '3위', en: '3rd' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2022.01.14', event: 'Unrivalled', tier: 'C', won: false, result: { ko: '2위', en: '2nd' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2021.12.12', event: 'CODM World Championship 2021: East Finals', tier: 'S', won: false, result: { ko: '11위', en: '11th' }, role: { ko: '선수', en: 'Player' } },
      { date: '2021.09.19', event: 'CODM World Championship 2021: Europe Finals', tier: 'A', won: false, result: { ko: '3위', en: '3rd' }, role: { ko: '선수', en: 'Player' } },
      { date: '2021.08.26', event: 'Mobile Mayhem 2021 Summer: Europe', tier: 'B', won: false, result: { ko: '3위', en: '3rd' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2021.07.18', event: 'CODM Masters 2021: Europe', tier: 'A', won: false, result: { ko: '3위', en: '3rd' }, role: { ko: '선수', en: 'Player' } },
      { date: '2021.05.25', event: 'Mobile Mayhem 2021 Spring: Europe', tier: 'B', won: false, result: { ko: '3위', en: '3rd' }, role: { ko: '코치', en: 'Coach' } },
      { date: '2020.12.01', event: 'CODM World Championship 2020: Global Finals', tier: 'S', won: false, result: { ko: '1-7위', en: '1st-7th' }, role: { ko: '선수', en: 'Player' } },
      { date: '2020.08.09', event: 'CODM World Championship 2020: Korea', tier: 'A', won: true, result: { ko: '우승', en: 'Champion' }, role: { ko: '선수', en: 'Player' } },
    ],
  },

  projects: {
    // 순서 = 표시 순서 (2026-08-24 사용자 확정). 티어·승강제 제안은 사용자 확인으로 제외됨.
    list: [
      {
        id: 'coaching-hub',
        title: { ko: '코칭 허브', en: 'Coaching Hub' },
        highlight: true,
        role: { ko: '설계 / 개발 / 운영', en: 'Design, Build & Operations' },
        summary: {
          ko: '스크림 결과 스크린샷을 GPT-4.1이 읽어 SQLite에 적재하고, FastAPI로 한국어/영어/스페인어 3개 언어 대시보드를 제공하는 코칭 허브. Railway에 배포해 매일 운영 중입니다.',
          en: 'A coaching hub where GPT-4.1 reads scrim screenshots into SQLite and FastAPI serves a trilingual (KO/EN/ES) dashboard. Deployed on Railway and in daily use.',
        },
        stack: ['Python', 'GPT-4.1 Vision', 'FastAPI', 'SQLite', 'Railway'],
        metrics: [
          { value: '389', label: { ko: '기록된 경기 · 2026.08 기준', en: 'Matches logged · as of 2026.08' } },
          { value: '3', label: { ko: '대시보드 언어', en: 'Dashboard languages' } },
        ],
        links: {
          demo: 'https://web-production-4deec.up.railway.app',
        },
        detail: {
          pitch: { ko: '스크림 스크린샷을 검색 가능한 경기 데이터로 바꾸는 코칭 인프라', en: 'Turning scrim screenshots into searchable match data' },
          purpose: null,
          background: {
            ko: '코치로서 스크림 결과를 매번 손으로 정리하는 대신, 선수가 올린 스크린샷을 GPT-4.1이 읽어 그대로 DB에 쌓이도록 만들었습니다.',
            en: 'Instead of hand-logging scrim results after every session, I built a pipeline where GPT-4.1 reads the screenshots players post and writes them straight into the database.',
          },
          approach: {
            ko: '스크린샷 접수 → GPT-4.1 Vision OCR → SQLite 적재 → FastAPI 대시보드(한국어/영어/스페인어). Railway에 배포해 매일 운영합니다.',
            en: 'Screenshot intake, GPT-4.1 Vision OCR, SQLite storage, then a FastAPI dashboard in Korean, English and Spanish. Deployed on Railway and in daily use.',
          },
          specs: [
            { label: { ko: '기록된 경기', en: 'Matches logged' }, value: { ko: '389경기 · 2026.08 기준', en: '389 · as of 2026.08' } },
            { label: { ko: '대시보드 언어', en: 'Dashboard languages' }, value: '3' },
            { label: { ko: '스택', en: 'Stack' }, value: 'FastAPI · SQLite · GPT-4.1 Vision · Railway' },
          ],
          gallery: [],
        },
      },
      {
        id: 'community-series',
        title: { ko: '커뮤니티 대회 시리즈', en: 'Community Tournament Series' },
        highlight: true,
        role: { ko: '1인 기획 / 주최 / 중계', en: 'Solo Organizer, Producer & Caster' },
        summary: {
          ko: '2023년 7월부터 한국 CODM 커뮤니티 대회를 1인이 기획, 주최, 중계했습니다. 여름·겨울 사이클로 8에디션을 열었고, 드래프트 방식을 완전랜덤→밸런스랜덤→캡틴픽으로 진화시켰습니다. 후원 없이 순수 자체 운영.',
          en: 'Solo-planned, produced and cast Korean CODM community tournaments since July 2023: 8 editions across summer/winter cycles, with the draft format evolving from full-random to balance-random to captain pick. Entirely self-run, no sponsorship.',
        },
        stack: ['행사 기획', '중계·방송', 'Discord 운영', 'Event planning', 'Broadcasting'],
        metrics: [
          { value: '8', label: { ko: '에디션 (2023.07~)', en: 'Editions (since 2023.07)' } },
          { value: '77.8h', label: { ko: '누적 중계 방송', en: 'Total broadcast hours' } },
          { value: { ko: '약 3.6만', en: '~36k' }, label: { ko: 'VOD 25개 누적 조회', en: 'Views across 25 VODs' } },
          { value: { ko: '8팀', en: '8 teams' }, label: { ko: '대회당 참가 (약 40명)', en: 'Teams per event (~40 players)' } },
        ],
        links: {
          youtube: 'https://www.youtube.com/channel/UC9h1aAAsOprTATC0_y2pt3A',
        },
        detail: {
          pitch: { ko: '혼자서 3년, 여덟 번의 대회를 만들고 중계했다', en: 'Three years, eight tournaments, built and broadcast solo' },
          purpose: null,
          background: {
            ko: '2023년 7월, 한국 CODM 커뮤니티에 정기적으로 붙을 수 있는 대회가 필요해 1인 기획·주최·중계를 시작했습니다.',
            en: 'In July 2023 the Korean CODM community needed a recurring competition, so I started planning, hosting and casting it solo.',
          },
          approach: {
            ko: '여름·겨울 사이클로 총 8에디션. 드래프트 방식을 완전랜덤에서 밸런스랜덤, 다시 캡틴픽으로 진화시켰고, 5v5와 스나이퍼 1v1 포맷을 운영했습니다. 후원 없이 순수 자체 운영.',
            en: 'Eight editions across summer and winter cycles. The draft evolved from full-random to balance-random to captain pick, with 5v5 and sniper 1v1 formats. Entirely self-run, no sponsorship.',
          },
          specs: [
            { label: { ko: '에디션', en: 'Editions' }, value: { ko: '8회 (2023.07~)', en: '8 (since 2023.07)' } },
            { label: { ko: '중계', en: 'Broadcast' }, value: { ko: '77.8시간 · VOD 25개 · 조회 약 3.6만', en: '77.8h · 25 VODs · ~36k views' } },
            { label: { ko: '규모', en: 'Scale' }, value: { ko: '대회당 8팀(약 40명) · 커뮤니티 500~1,000명', en: '8 teams (~40 players) per event · community of 500-1,000' } },
          ],
          gallery: [],
        },
      },
      {
        id: 'sportsday-hub',
        title: 'sportsday-hub',
        role: { ko: '개발·운영', en: 'Build & Operations' },
        summary: {
          ko: 'Vercel 크론 작업으로 카카오톡 행사 알림을 자동 발송하는 시스템. 행사 운영의 반복 커뮤니케이션을 자동화했습니다.',
          en: 'A Vercel cron system that sends scheduled KakaoTalk event notifications, automating the repetitive side of event communications.',
        },
        stack: ['Vercel', 'Cron', 'KakaoTalk API', 'Apps Script'],
        metrics: [],
        links: {},
        detail: {
          pitch: { ko: '반복되는 행사 알림을 사람 대신 시스템이 보내게 만들기', en: 'Letting the system send the recurring event notices' },
          purpose: null,
          background: {
            ko: '행사 운영마다 반복되는 카카오톡 공지를 일정에 맞춰 자동 발송하도록 만든 작은 시스템입니다.',
            en: 'A small system that sends the recurring KakaoTalk event notices on schedule.',
          },
          approach: {
            ko: 'Vercel 크론 작업이 일정에 따라 카카오톡 알림을 발송합니다.',
            en: 'A Vercel cron job sends KakaoTalk notifications on schedule.',
          },
          specs: [{ label: { ko: '스택', en: 'Stack' }, value: 'Vercel Cron · KakaoTalk API · Apps Script' }],
          gallery: [],
        },
      },
      {
        id: 'champions-queue',
        title: "Champion's Queue",
        highlight: true,
        role: { ko: '창설·운영 설계', en: 'Founder & Operations Design' },
        summary: {
          ko: '서부 CODM 경쟁 생태계를 위한 초청제 랭크 리그. 티어 5단계, 4리전(NA/LATAM, EU, APAC, MENA) 체계를 설계하고, GPT-4.1 OCR→Airtable 파이프라인으로 MMR 집계, 주간 리포트, RSVP를 자동화했습니다.',
          en: 'An invitational rank league for the western CODM ecosystem. Designed the 5-tier, 4-region (NA/LATAM, EU, APAC, MENA) structure and automated MMR aggregation, weekly reports and RSVP through a GPT-4.1 OCR → Airtable pipeline.',
        },
        stack: ['GPT-4.1 Vision', 'Airtable', 'Make.com', 'Discord Bot API'],
        metrics: [
          { value: '5 × 4', label: { ko: '티어 × 리전', en: 'Tiers × Regions' } },
          { value: '101', label: { ko: '관리 선수 (NA 시즌)', en: 'Players managed (NA season)' } },
          { value: '864', label: { ko: '매치 기록', en: 'Matches recorded' } },
        ],
        links: {},
        detail: {
          pitch: { ko: '서부 CODM에 상시 사다리를 만든 초청제 랭크 리그', en: 'An invitational ladder for the western CODM scene' },
          purpose: null,
          background: {
            ko: 'NA/LATAM·EU·APAC·MENA 선수들이 실력에 맞는 티어에서 꾸준히 경쟁할 수 있도록 5단계 티어·4리전 구조를 설계했습니다.',
            en: 'I designed a 5-tier, 4-region structure so players across NA/LATAM, EU, APAC and MENA could compete at their level, continuously.',
          },
          approach: {
            ko: 'GPT-4.1 OCR로 전적을 읽어 Airtable에 쌓고, Make.com과 Discord Bot으로 MMR 집계, 주간 리포트, RSVP를 자동화합니다.',
            en: 'GPT-4.1 OCR reads results into Airtable; Make.com and a Discord bot automate MMR aggregation, weekly reports and RSVP.',
          },
          specs: [
            { label: { ko: '리그 구조', en: 'Structure' }, value: { ko: '티어 5단계 × 리전 4개', en: '5 tiers × 4 regions' } },
            { label: { ko: '데이터 관리 (NA 시즌)', en: 'Data managed (NA season)' }, value: { ko: '선수 101명 · 매치 864경기', en: '101 players · 864 matches' } },
            { label: { ko: '스택', en: 'Stack' }, value: 'GPT-4.1 Vision · Airtable · Make.com · Discord Bot API' },
          ],
          gallery: [],
        },
      },
      {
        id: 'aim-research',
        title: { ko: '에임 이론 연구', en: 'Aim Theory Research' },
        role: { ko: '연구 (진행 중)', en: 'Research (in progress)' },
        summary: {
          ko: '모바일 FPS 터치 입력의 생체역학을 분석하는 논문 초안. 6년의 선수·코치 경험을 데이터와 이론으로 구조화하는 작업입니다.',
          en: 'A paper draft analyzing the biomechanics of touch input in mobile FPS, structuring six years of playing and coaching experience into data and theory.',
        },
        stack: ['데이터 분석', 'Data analysis'],
        metrics: [],
        links: {},
        detail: {
          pitch: { ko: '6년의 선수·코치 경험을 터치 데이터로 구조화하는 연구', en: 'Structuring six years of playing and coaching into touch data' },
          purpose: null,
          background: {
            ko: '모바일 FPS의 조준은 감이 아니라 측정 가능한 입력이라는 가설에서 출발한 논문 초안.',
            en: 'A paper draft built on the hypothesis that mobile FPS aim is a measurable input, not a feel.',
          },
          approach: {
            ko: '터치 입력의 생체역학을 분석해 경험을 데이터와 이론으로 옮기는 작업을 진행 중입니다.',
            en: 'Ongoing work analyzing the biomechanics of touch input to turn experience into data and theory.',
          },
          specs: [{ label: { ko: '상태', en: 'Status' }, value: { ko: '논문 초안 진행 중', en: 'Draft in progress' } }],
          gallery: [],
        },
      },
    ],
  },

  skills: {
    ops: [
      { ko: '리그·대회 운영 설계', en: 'League & tournament operations design' },
      { ko: '팀 코칭·매니지먼트', en: 'Team coaching & management' },
      { ko: 'Discord 커뮤니티 운영', en: 'Discord community operations' },
      { ko: '데이터 기반 의사결정', en: 'Data-driven decision making' },
      { ko: 'KO·EN 이중언어 실무', en: 'KO/EN bilingual operations' },
    ],
    tech: [
      'Python', 'Discord Bot API', 'FastAPI', 'GPT-4.1 Vision OCR',
      'Make.com / Airtable', 'Google Apps Script', 'SQLite / Postgres', '데이터 분석 / Data analysis',
    ],
  },

  education: {
    school: { ko: '성균관대학교', en: 'Sungkyunkwan University' },
    major: { ko: '독어독문학과', en: 'German Language & Literature' },
    doubleMajor: { ko: '미디어커뮤니케이션학 복수전공 (2026 2학기부터)', en: 'Double major in Media & Communication (from Fall 2026)' },
    status: { ko: '재학', en: 'Enrolled' },
  },

  footer: {
    note: {
      ko: '수치·성적은 원본 자료(Liquipedia, 운영 DB)와 대조 검증된 값입니다.',
      en: 'All figures and results are cross-checked against primary sources (Liquipedia, operations databases).',
    },
  },
};

// React(ESM import)로 직접 소비 — 단일 갱신 지점
export default PORTFOLIO_CONTENT;
