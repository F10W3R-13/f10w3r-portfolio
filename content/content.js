/*
 * 포트폴리오 콘텐츠 — 단일 갱신 지점 (Single Update Point)
 * 원천: minwo0___/60 개인 기록/profile.md (✅ 항목만 반영)
 * 규칙:
 *   1) 모든 표시 문자열은 { ko, en } 이중 구조. 새 항목 추가 시 두 언어 모두 필수.
 *   2) 정렬·강조·티어·우승 여부 같은 구분은 데이터 필드로 표현한다.
 *   3) 민감 정보(병역·연봉·계약·학번·건강) 반영 금지 — tests/content.test.js가 차단.
 *   4) 수치는 검증된 값만: 101명/864경기(NA 데이터 관리 시즌), 400경기·2026.08.29(코칭 허브 운영 — 배포 DB 백업 실측),
 *      8에디션/77.8시간 중계(커뮤니티 대회) + 유튜브 공식 수출(2026-08-23): 조회 28,505·시청 4,973h·평균 10분 28초·구독 전환 124. 임의 수치 생성 금지.
 */
export const PORTFOLIO_CONTENT = {

  meta: {
    version: 2,
    updated: '2026-08-31',
    defaultLang: 'ko',
    langs: ['ko', 'en'],
    sourceOfTruth: 'minwo0___/60 개인 기록/profile.md',
  },

  // 사이트 메타(브라우저 제목·검색 설명·OG) — EN 전환 시 함께 언어 전환된다(PageShell).
  // index.html의 하드코딩은 JS 실행 전 기본값(ko)으로만 쓰인다.
  siteMeta: {
    title: { ko: '유민우 F10W3R · 포트폴리오', en: 'Yoo Min-woo F10W3R · Portfolio' },
    description: {
      ko: '유민우 F10W3R · CODM 프로 코치, 이스포츠 운영·기획 포트폴리오',
      en: 'Yoo Min-woo F10W3R · CODM pro coach — esports operations & planning portfolio',
    },
    ogTitle: { ko: '유민우 F10W3R · 포트폴리오', en: 'Yoo Min-woo F10W3R · Portfolio' },
    ogDescription: {
      ko: 'CODM 프로 코치에서 이스포츠 운영·기획으로. 코칭 허브, 커뮤니티 대회, Champion\'s Queue, RAG 챗봇',
      en: 'From CODM pro coach to esports operations. Coaching Hub, community tournaments, Champion\'s Queue, RAG chatbot',
    },
  },

  profile: {
    name: { ko: '유민우', en: 'Yoo Min-woo' },
    ign: 'F10W3R',
    role: { ko: 'CODM 프로 코치 · 이스포츠 운영/기획 지원', en: 'CODM Pro Coach · Esports Operations & Planning' },
    base: { ko: '수도권, 대한민국', en: 'Seoul Capital Area, South Korea' },
    availability: { ko: '수도권 · 국내외 출장 가능', en: 'Available for domestic and international travel' },
    contact: {
      // email은 새 주소를 만들기 전까지 null
      email: null,
      github: 'https://github.com/F10W3R-13',
      linkedin: 'https://www.linkedin.com/in/minwoo-yoo-2a5b80214',
      twitter: 'https://twitter.com/F_L_WR',
      youtube: 'https://www.youtube.com/channel/UC9h1aAAsOprTATC0_y2pt3A',
      liquipedia: 'https://liquipedia.net/callofduty/F10W3R',
    },
  },

  hero: {
    ign: 'F10W3R',
    // 초상 파일명 — assets/photos/ 기준. 없으면 null
    portrait: 'photo-1.png',
    portraitAlt: { ko: 'Luminosity 저지를 입은 유민우', en: 'Yoo Min-woo in a Luminosity Gaming jersey' },
    name: { ko: '유민우', en: 'Yoo Min-woo' },
    tagline: {
      ko: '글로벌 커뮤니티 운영 경험과 데이터 기반 실행력을 바탕으로, 고객과 시장의 문제를 성장 기회로 전환합니다',
      en: 'Global community operations and data-driven execution, turning customer and market problems into growth opportunities',
    },
    intro: {
      ko: 'T1 선수 출신, 6년간 13개 팀. 무대 위 코칭부터 리그 운영, 데이터 파이프라인 구축까지 직접 해왔습니다. 4개 지역 서비스 운영 · 한국어와 영어 실무 · 8회 커뮤니티 대회 기획 · 데이터 기반 온보딩 개선.',
      en: 'Ex-T1 player, thirteen teams over six years. From on-stage coaching to league operations and data pipelines, I design, build, and operate the systems behind them. Four-region service operations · Korean/English business · 8 community tournaments planned · data-driven onboarding improvements.',
    },
    stats: [
      { value: '101', label: { ko: 'NA 시즌 데이터 운영 선수', en: 'NA-season data-ops players' } },
      { value: '864', label: { ko: '기록한 매치', en: 'Matches recorded' } },
      { value: '13', label: { ko: '거친 팀 (선수 3 · 코치 10)', en: 'Teams (3 as player, 10 as coach)' } },
      { value: '1', label: { ko: 'Snapdragon Pro Series S5 NA 우승', en: 'Snapdragon Pro Series S5 NA title' } },
    ],
  },

  // 분야 4분류 — 분야 이름·설명과 소속 프로젝트 id.
  // 2026-08-31 안 B 개편(사용자 확정 매핑): 커뮤니티 대회는 e스포츠·그로스 양쪽에 노출.
  categories: [
    { id: 'esports', label: { ko: '이스포츠', en: 'Esports' },
      desc: { ko: '선수에서 코치로, 무대와 리그를 움직인 6년', en: 'Six years across professional competition, coaching, and league operations' },
      projects: ['community-series'] },
    { id: 'growth', label: { ko: '그로스·마케팅', en: 'Growth & Marketing' },
      desc: { ko: '광고비 없이 키운 커뮤니티 대회와 콘텐츠 성과', en: 'Community tournaments and content, grown without ad spend' },
      projects: ['community-series'] },
    { id: 'business', label: { ko: '글로벌 비즈니스', en: 'Global Business' },
      desc: { ko: '4개 지역 리그와 교환학생 프로그램을 묶은 국제 운영', en: 'Four-region league operations and exchange-student programs' },
      projects: ['champions-queue', 'hiclub'] },
    { id: 'product', label: { ko: '프로덕트·데이터', en: 'Product & Data' },
      desc: { ko: '반복되는 문제를 시스템으로 만드는 습관', en: 'Turning recurring problems into systems' },
      projects: ['coaching-hub', 'sportsday-hub', 'skku-whatsapp-bot'] },
  ],

  career: {
    span: '2020-2026',
    // 기간·팀은 Liquipedia(Coaching/Results) 원본 날짜 그대로 (2026-08-24 사용자 확인)
    player: [
      { period: '2020.05.27-2020.08.12', team: 'Allure' },
      { period: '2020.08.12-2020.10.22', team: '1K Gaming' },
      { period: '2020.10.22-2021.03.30', team: 'T1' },
    ],
    coach: [
      // BK ROG White(2021.04.09-04.14)·BK ROG Esports(04.14-06.14)는 한 조직 — 2026-08-24 사용자 확정 병합
      { period: '2021.04.09-2021.06.14', team: 'BK ROG Esports' },
      { period: '2021.06.14-2021.10.05', team: 'Oxygen Esports' },
      { period: '2021.11.11-2021.12.31', team: 'True Tippers' },
      { period: '2023.11.12-2024.01.09', team: 'Autobotz Esports' },
      { period: '2024.03.27-2024.05.14', team: 'Seminal' },
      { period: '2024.07.14-2024.08.27', team: 'Nexus' },
      { period: '2024.08.27-2024.10.07', team: 'Luminosity Gaming' },
      { period: '2024.10.29-2024.11.17', team: 'Team Felines' },
      { period: '2025.03.09-2026.03.09', team: 'OUG' },
      { period: { ko: '2026.05.28-현재', en: '2026.05.28-Present' }, team: 'Sybarites', current: true },
    ],
    // 현장 사진 — /assets/photos/ 기준. 빈 배열이면 스트립 생략
    photos: [
      { file: 'photo-2.jpg', caption: { ko: '대회 중계 화면에서의 코칭', en: 'Coaching during a championship broadcast' } },
      { file: 'photo-3.jpg', caption: { ko: '메이저 대회 스테이지 부스', en: 'Major tournament stage booth' } },
      { file: 'photo-4.jpg', caption: { ko: 'Luminosity Gaming 시절 팀', en: 'Luminosity Gaming squad' } },
      { file: 'photo-5.jpg', caption: { ko: '대회 부스에서', en: 'At the tournament booth' } },
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
      { date: '2020.12.01', event: 'CODM World Championship 2020: Global Finals', tier: 'S', won: false, result: { ko: '진출 · 본선 취소', en: 'Qualified · finals cancelled' }, role: { ko: '선수', en: 'Player' } },
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
          ko: '스크림 결과 스크린샷을 GPT-5.6-luna가 읽어 DB에 적재하고, FastAPI로 한국어/영어/스페인어 3개 언어 대시보드를 제공하는 코칭 허브. 2026년 2월부터 Railway에서 매일 운영 중입니다.',
          en: 'A coaching hub where GPT-5.6-luna reads scrim screenshots into a database and FastAPI serves a trilingual (KO/EN/ES) dashboard. Running daily on Railway since February 2026.',
        },
        stack: [
          { ko: 'Python', en: 'Python' },
          { ko: 'GPT-5.6-luna Vision', en: 'GPT-5.6-luna Vision' },
          { ko: 'FastAPI', en: 'FastAPI' },
          { ko: 'SQLite', en: 'SQLite' },
          { ko: 'PostgreSQL', en: 'PostgreSQL' },
          { ko: 'Railway', en: 'Railway' },
        ],
        metrics: [
          { value: '400', label: { ko: '기록된 경기 · 2026.08.29 기준', en: 'Matches logged · as of 2026.08.29' } },
          { value: '9', label: { ko: '기록 선수 (로스터 + 용병)', en: 'Players recorded (roster + stand-ins)' } },
          { value: { ko: '3개', en: '3' }, label: { ko: '언어 지원 (한국어·영어·스페인어)', en: 'Languages (KO · EN · ES)' } },
        ],
        links: {
          demo: 'https://web-production-4deec.up.railway.app',
        },
        detail: {
          pitch: { ko: '스크린샷 한 장이 하루 안에 코칭 지표가 되는, 1인 운영 데이터 인프라', en: 'A one-person data pipeline that turns a screenshot into coaching metrics within a day' },
          purpose: {
            ko: '경기마다 손으로 옮기던 스크린샷 로깅을 자동화하고, 숫자를 코칭 판단의 도구로 쓰기 위해 만들었습니다. 지표와 AI 인사이트는 코치를 대신하지 않습니다. 맵 분석은 수치 경향만 보여주고 판단은 코치에게 남기는 등, 도구로서의 설계 원칙을 문서로 못 박아 두었습니다.',
            en: 'I built it to automate the screenshot logging I was doing by hand after every match, and to turn numbers into a coaching tool. The AI never replaces the coach: map analytics report numeric tendencies only, and that policy is written into the project docs.',
          },
          background: {
            ko: '해외 팀을 코칭하며 스크림 결과를 매번 텍스트로 정리하는 시간이 아까웠습니다. 선수가 Discord에 올린 스크린샷을 GPT-5.6-luna가 읽어 그대로 DB에 쌓이게 하여, 정리 시간을 단축시키고 데이터가 쌓이도록 하였습니다.',
            en: 'Coaching overseas teams, I kept losing hours hand-logging scrim results. GPT-5.6-luna reads the screenshots players already post in Discord straight into a database, cutting logging time and letting the data compound.',
          },
          approach: {
            ko: '워크플로: 스크린샷 2장 업로드 → GPT-5.6-luna(temperature 0, JSON 강제) → 모드(HP/SND) 자동 판별 → SQLite(로컬 개발) / Railway PostgreSQL(운영) → FastAPI 대시보드. 재업로드된 경기는 기존 매치에 자동 병합되고, OCR이 잘못 읽은 닉네임은 별명으로 학습됩니다. 코칭 지표 ZCS·RDS는 자체 공식으로 계산하고, AI 인사이트 7종(매치·주간·트렌드·선수·맵·브리핑)에는 Obsidian 코칭 지식베이스가 프롬프트로 주입됩니다. 슬래시 명령 10종, 3개 언어(테스트로 키 동일성 강제), 어드민 도구, 대회용 토너먼트 앱(MVP 포스터 생성), 전체 DB 백업·복원과 중단 재개형 재처리 파이프라인까지 포함됩니다. ZCS는 거점 킬 가중 공식(1.1·오브젝트 + 8·캡처킬 + 4.1·일반킬 − 5·데스), RDS는 라운드 장악 공식으로 직접 설계해 승패 데이터로 AUC 검증을 거쳤고, 배포 DB 전수 점검에서 OCR 이상(캡처킬>킬)은 0건이었습니다.',
            en: 'Flow: upload two screenshots, GPT-5.6-luna (temperature 0, schema-constrained JSON output) auto-detects the mode (HP/SND), writes to SQLite in local development and Railway PostgreSQL in production, and a FastAPI dashboard serves it. Re-uploaded games merge into the original match; misread nicknames are learned as aliases. Seven AI insight functions inject an Obsidian coaching knowledge base into the prompts. Ten slash commands, three languages (enforced equal by tests), admin tooling, a separate tournament app that generates MVP posters, and a full-database backup/restore plus resumable reprocessing pipeline. The custom metrics are designed in-house — ZCS, a capture-kill-weighted hardpoint formula (1.1·OBJ + 8·capture kills + 4.1·kills − 5·deaths), and RDS, a round-control formula — and validated with win/loss AUC analysis; a full audit of the production database found zero OCR anomalies.',
          },
          specs: [
            { label: { ko: '기록된 경기', en: 'Matches logged' }, value: { ko: '400경기 · 2026.08.29 기준 · 2월부터 연속', en: '400 · as of 2026.08.29, since February' } },
            { label: { ko: '자체 코칭 지표', en: 'Custom metrics' }, value: { ko: 'ZCS · RDS 직접 설계 · 승패 AUC 검증', en: 'ZCS · RDS, designed in-house, AUC-validated' } },
            { label: { ko: '언어', en: 'Languages' }, value: { ko: '한국어·영어·스페인어 (키 동일성 테스트)', en: 'Three languages, translation parity covered by automated tests' } },
            { label: { ko: '스택', en: 'Stack' }, value: 'FastAPI · SQLite/PostgreSQL · GPT-5.6-luna · Railway' },
          ],
          gallery: [
            { file: 'home.png', caption: { ko: '메인 대시보드: 매치 추이 차트와 폼 상승·폼 경고 지표', en: 'Main dashboard: match trend charts and form-rise and form-warning metrics' } },
            { file: 'leaderboard.png', caption: { ko: '선수별 K/D 리더보드', en: 'Player K/D leaderboard' } },
            { file: 'player.png', caption: { ko: '선수 상세: 모드별 기록표', en: 'Player detail: per-mode stat tables' } },
          ],
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
        stack: [
          { ko: '행사 기획', en: 'Event planning' },
          { ko: '중계·방송', en: 'Broadcasting' },
          { ko: 'Discord 운영', en: 'Discord operations' },
        ],
        metrics: [
          { value: '8', label: { ko: '에디션 (2023.07~)', en: 'Editions (since 2023.07)' } },
          { value: '77.8h', label: { ko: '누적 중계 방송', en: 'Total broadcast hours' } },
          { value: '28,505', label: { ko: 'VOD 누적 조회 (공식 통계 · 2026.08 기준)', en: 'VOD views (official export, as of 2026.08)' } },
          { value: { ko: '8팀', en: '8' }, label: { ko: '대회당 참가 (약 40명)', en: 'Teams per event (~40 players)' } },
        ],
        links: {
          youtube: 'https://www.youtube.com/channel/UC9h1aAAsOprTATC0_y2pt3A',
        },
        detail: {
          pitch: { ko: '뛸 무대가 없어서 무대를 만들고, 3년간 혼자 굴렸다', en: 'No stage to play on, so I built one and ran it solo for three years' },
          purpose: {
            ko: '세 가지 이유가 겹쳤습니다. 한국 CODM 커뮤니티에 뛸 무대가 없어서, 대회 포맷을 실험해보고 싶어서, 그리고 코치로 쌓은 노하우를 커뮤니티에 환원하고 싶어서.',
            en: 'Three reasons stacked: the Korean CODM community had no stage to play on, I wanted a lab for tournament formats, and I wanted to give coaching knowledge back to the community.',
          },
          background: {
            ko: '2023년 7월 28일 첫 대회를 연 뒤 2026년 8월 3일까지 3년 연속, 여름·겨울 주기로 총 8에디션을 열었습니다. 기획·주최·중계 전부 1인, 후원 없는 순수 자체 운영이었습니다.',
            en: 'From the first event on July 28, 2023 to August 3, 2026, three consecutive years and eight editions on a summer/winter cycle, all planned, hosted and cast by one person with no sponsorship.',
          },
          approach: {
            ko: '포맷은 계속 진화했습니다. 단일 5v5로 시작해 개인 참가+팀 추첨의 드래프트 대회를 시그니처로 만들었고, 겨울 팀전(FS Tour 협업 중계)과 스나이퍼 1v1(2025.12)을 더했습니다. 드래프트 방식도 완전랜덤에서 밸런스랜덤(등급·포지션 반영), 다시 캡틴픽으로 바꿨고, 팀 추첨을 생중계하는 드래프트 쇼 자체를 콘텐츠로 만들었습니다.',
            en: 'The format kept evolving: from plain 5v5 to a solo-registration draft tournament as the signature, plus a winter team event (co-broadcast with SaiaN for FS Tour) and a sniper 1v1 from December 2025. The draft itself evolved from full-random to balance-random (seed and position aware) to captain pick, and the live team-draw show became content of its own.',
          },
          specs: [
            { label: { ko: '에디션', en: 'Editions' }, value: { ko: '8회 · 3년 연속 (2023.07~2026.08)', en: '8 over 3 straight years (2023.07-2026.08)' } },
            { label: { ko: '중계', en: 'Broadcast' }, value: { ko: '77.8시간 · VOD 22편 · 최다 1,793회(2025 드래프트 1일차)', en: '77.8h · 22 VODs · top 1,793 (2025 draft day 1)' } },
            { label: { ko: '시청', en: 'Watch' }, value: { ko: '조회 28,505 · 시청 4,973시간 · 평균 10분 28초', en: '28,505 views · 4,973h watched · 10m28s average' } },
            { label: { ko: '영향', en: 'Impact' }, value: { ko: '구독자 전환 124명 · 커뮤니티 500~1,000명', en: '124 subscribers gained through the series · community of 500-1,000' } },
          ],
          videos: [
            { id: 'Eyb7AA09Pn8', caption: { ko: 'FS Tour 홍보 영상 (겨울 팀전 협업)', en: 'FS Tour promo video (winter team event)' } },
          ],
          gallery: [],
        },
      },
      {
        id: 'sportsday-hub',
        title: 'sportsday-hub',
        role: { ko: '개발·운영', en: 'Build & Operations' },
        summary: {
          ko: '스포츠데이 기획팀을 위한 프로젝트 관리 허브. 마일스톤 긴급도·인계·의사결정 트래커와 Google Drive 연동을 갖추고, 카카오톡 알림(개인 다이제스트 + 단체방 자동 발송)을 자동화했습니다.',
          en: 'A project hub for a sports-day planning team: milestone urgency, handoffs, a decision tracker and Google Drive integration, with automated KakaoTalk notifications (personal digest plus group-chat auto-send).',
        },
        stack: [
          { ko: 'Next.js', en: 'Next.js' },
          { ko: 'Supabase', en: 'Supabase' },
          { ko: 'Vercel Cron', en: 'Vercel Cron' },
          { ko: 'KakaoTalk', en: 'KakaoTalk' },
          { ko: 'PyAutoGUI', en: 'PyAutoGUI' },
        ],
        metrics: [],
        // 읽기 전용 데모 인스턴스(2026-08-31 배포): 가상 데이터 + 쓰기 차단 RLS.
        // 운영 인스턴스(sportsday-hub.vercel.app)는 보안상 노출 금지 — DEMO-DEPLOY-GUIDE.md 참조.
        links: {
          demo: 'https://sportsday-hub-demo.vercel.app',
        },
        detail: {
          pitch: { ko: '행사 기획팀을 위한 프로젝트 관리 + 알림 자동화 허브', en: 'A project-management and notification hub for an event-planning team' },
          purpose: {
            ko: '기획팀원 누구도 그날의 마감·인계·의사결정을 놓치지 않게 하기 위해서입니다.',
            en: 'So that nobody on the planning team misses a deadline, a handoff, or a pending decision that day.',
          },
          background: {
            ko: '체육대회 기획 운영을 하며 흩어져 있던 일정·인계·의사결정을 하나의 웹앱으로 모았습니다. 마일스톤 긴급도(지연/오늘/예정/미지정 4단계), 인계 관리, 의사결정 트래커, Google Drive 연동을 갖추고 있습니다.',
            en: 'It consolidates a sports-day planning operation into one web app: a four-tier milestone urgency system, handoff management, a decision tracker, and Google Drive integration.',
          },
          approach: {
            ko: '알림은 두 겹입니다. Vercel 크론이 매일 아침 카카오톡 개인 다이제스트(200자 제한)를 보내고, PC 카카오톡 UI 자동화(PyAutoGUI)가 상세 다이제스트를 기획팀 단체방에 발송합니다. 단체방엔 공식 API가 없어 알림톡·비공식 라이브러리까지 검토한 뒤 UI 자동화를 선택한 결정 과정을 문서로 남겼습니다. 봇 생존 확인용 watchdog과 테스트 12건도 함께 운영됩니다.',
            en: 'Notifications run in two layers: a Vercel cron sends a compact personal KakaoTalk digest (200-char limit) every morning, and a PyAutoGUI-driven PC KakaoTalk client posts the detailed digest to the team group chat. Group chats have no official API; I evaluated notification-talk and unofficial libraries before choosing UI automation, and documented that decision. A watchdog checks bot liveness, and 12 tests pass in CI.',
          },
          specs: [
            { label: { ko: '알림 채널', en: 'Notification channels' }, value: { ko: '2개 (개인 다이제스트 · 단체방)', en: '2 (personal digest · group chat)' } },
            { label: { ko: '기능', en: 'Features' }, value: { ko: '마일스톤 긴급도 · 인계 · 의사결정 트래커', en: 'Milestone urgency · handoffs · decision tracker' } },
            { label: { ko: '스택', en: 'Stack' }, value: 'Next.js · Supabase · Vercel Cron · PyAutoGUI' },
          ],
          gallery: [
            { file: 'home.png', caption: { ko: '메인 대시보드: D-Day 카운트다운·핵심 결정 추적표', en: 'Main dashboard: D-day countdown and key-decision tracker' } },
            { file: 'content.png', caption: { ko: '컨텐츠팀 워크스페이스: 체크리스트·드라이브 파일', en: 'Content team workspace: checklist and drive files' } },
            { file: 'handoffs.png', caption: { ko: '팀 간·외부 인계 게시판', en: 'Cross-team and external handoff board' } },
          ],
        },
      },
      {
        id: 'champions-queue',
        title: "Champion's Queue",
        highlight: true,
        role: { ko: '창설·운영 설계', en: 'Founder & Operations Design' },
        summary: {
          ko: '4개 리전 CODM 경쟁 생태계를 위한 초청제 랭크 리그. 4리전(NA/LATAM, EU, APAC, MENA) 체계를 설계하고, GPT-4.1 OCR→Airtable 파이프라인으로 MMR 집계, 주간 리포트, RSVP를 자동화했습니다.',
          en: 'An invitation-only ranked league for the four-region CODM ecosystem. Designed the 4-region (NA/LATAM, EU, APAC, MENA) structure and automated MMR aggregation, weekly reports and RSVP through a GPT-4.1 OCR → Airtable pipeline.',
        },
        stack: [
          { ko: 'GPT-4.1 Vision', en: 'GPT-4.1 Vision' },
          { ko: 'Airtable', en: 'Airtable' },
          { ko: 'discord.py', en: 'discord.py' },
          { ko: 'NeatQueue', en: 'NeatQueue' },
        ],
        metrics: [
          { value: '4', label: { ko: '리전', en: 'Regions' } },
          { value: '101', label: { ko: 'NA 시즌 데이터 운영 선수', en: 'NA-season data-ops players' } },
          { value: '864', label: { ko: '매치 기록', en: 'Matches recorded' } },
        ],
        links: {},
        detail: {
          pitch: { ko: '매치메이킹 봇 위에 신원·통계·시즌·MMR 운영 층을 얹은 하이브리드 리그 시스템', en: 'A hybrid league system: matchmaking bot underneath, identity, stats, seasons and MMR operations on top' },
          purpose: {
            ko: 'NA/LATAM·EU·APAC·MENA 선수들이 대회 사이 공백에도 실력에 맞는 상대와 꾸준히 붙을 수 있게 하기 위해서입니다.',
            en: 'So players across NA/LATAM, EU, APAC and MENA can keep competing at their level between tournaments.',
          },
          background: {
            ko: '파일럿 단계부터 1인이 설계·운영했습니다. 사용자는 영어·스페인어권이어서 스태프 운영 매뉴얼도 두 언어로 만들었습니다.',
            en: 'Designed and operated solo from the pilot stage. The user base is English and Spanish speaking, so the staff operations manual ships in both languages.',
          },
          approach: {
            ko: '경기 결과 스크린샷을 GPT-4.1 Vision이 읽어 3단계 IGN 매칭(정확 일치 → 유사도 → 수동 리뷰)으로 Airtable 5개 테이블에 쌓습니다. 매치메이킹과 기본 MMR(승패 ±25)은 NeatQueue가 담당하고, 자체 Discord 봇은 impact 기반 MMR 조정(±10), 휴면 부식과 800점 자격 게이트, 큐 세션 자동화(T-2시간 리마인더부터 잠금까지), RSVP DM을 운영합니다. 슬래시 명령 21개(스태프용 16), 주간 리더보드와 시즌 리포트가 자동 생성됩니다. 참여율 문제는 데이터로 진단했습니다. 등록 133명 중 첫 경기 기록이 36명(27%)인 온보딩 누수를 짚어 큐 리마인더·공유 RSVP 로스터와 등록 안내 패널·온보딩 DM을 배포했고, 전환율 회복 추적 지표를 진단 문서로 체계화했습니다.',
            en: 'Result screenshots go through GPT-4.1 Vision, a three-stage IGN match (exact, fuzzy, manual review), and into five Airtable tables. NeatQueue owns matchmaking and base MMR (±25 per result); my Discord bot layers impact-based MMR modifiers (±10), inactivity decay with an 800-rating eligibility gate, queue-session automation (T-2h reminders through lock), and RSVP DMs. Twenty-one slash commands (sixteen for staff), weekly leaderboards and season reports generate themselves. When engagement dipped, I diagnosed it with data: only 36 of 133 registered players (27%) ever recorded a match. I shipped queue reminders, a shared RSVP roster, a registration help panel, and onboarding DMs, and wrote a diagnosis plan defining the funnel metrics to track recovery.',
          },
          specs: [
            { label: { ko: '리전', en: 'Regions' }, value: { ko: '4개 (NA/LATAM · EU · APAC · MENA)', en: '4 (NA/LATAM · EU · APAC · MENA)' } },
            { label: { ko: '온보딩 퍼널', en: 'Onboarding funnel' }, value: { ko: '등록 133명 → 첫 경기 36명(27%) · RSVP·온보딩 개선 배포', en: '133 registered → 36 first match (27%) · RSVP & onboarding improvements shipped' } },
            { label: { ko: '데이터 관리 (NA 시즌)', en: 'Data managed (NA season)' }, value: { ko: '선수 101명 · 매치 864경기', en: '101 players · 864 matches' } },
            { label: { ko: '스택', en: 'Stack' }, value: 'discord.py · GPT-4.1 Vision · Airtable · NeatQueue' },
          ],
          gallery: [
            { file: 'cq-intro.png', caption: { ko: '서버 소개: 초대 기반 실전 연습 시스템', en: 'Server intro: invite-only competitive practice system' } },
            { file: 'cq-access.png', caption: { ko: '접근 신청: 추천·지원·경력 3경로', en: 'Requesting access: referral, application, or credentials' } },
            { file: 'cq-match.png', caption: { ko: '매치 리포트: impact 기반 MMR 조정 포함', en: 'Match report with impact-based MMR adjustments' } },
            { file: 'cq-update.png', caption: { ko: '업데이트 로그: 퍼포먼스 MMR 수정·통계 가속', en: 'Update log: performance MMR fixes, faster stats' } },
          ],
        },
      },
      {
        id: 'skku-whatsapp-bot',
        title: { ko: 'SKKU 학사제도 WhatsApp 봇', en: 'SKKU Regulations WhatsApp Bot' },
        role: { ko: '설계 / 개발 / 운영', en: 'Design / Build / Operations' },
        summary: {
          ko: '교환학생 그룹톡의 영어 질문에 한국어 학사 규정을 근거로 답하는 RAG 봇. 138문항 골드셋으로 3차례 평가해 정답률 84%에서 91%로 끌어올렸고, 환각 0건과 프롬프트 인젝션 방어를 검증했습니다.',
          en: "A RAG bot that answers exchange students' English questions from Korean university regulations. Three eval rounds on a 138-question gold set raised accuracy from 84% to 91%, with zero hallucinations and verified prompt-injection defense.",
        },
        stack: [
          { ko: 'RAG', en: 'RAG' },
          { ko: 'FastAPI', en: 'FastAPI' },
          { ko: 'whatsapp-web.js', en: 'whatsapp-web.js' },
          { ko: 'OpenAI', en: 'OpenAI' },
          { ko: 'Railway', en: 'Railway' },
        ],
        metrics: [
          { value: '91%', label: { ko: '골드셋 정답률 (138문항)', en: 'Gold-set accuracy (138 questions)' } },
          { value: '0', label: { ko: '비근거 답변 (138문항 골드셋)', en: 'Unsupported answers (138-Q gold set)' } },
          { value: '45', label: { ko: '규정 문서 코퍼스', en: 'Regulation documents' } },
        ],
        links: {},
        detail: {
          pitch: { ko: '영어로 묻는 교환학생에게 한국어 규정 문서로 답하는 교차 언어 RAG', en: 'Cross-lingual RAG: English questions, Korean regulation documents' },
          purpose: {
            ko: 'SKKU에 오는 교환학생들은 영어로 묻지만, 근거가 되는 학사 규정은 전부 한국어입니다. 이 언어 간극을 메우기 위해 만들었습니다.',
            en: 'Exchange students at SKKU ask in English, but every regulation they need is written in Korean. I built it to close that gap.',
          },
          background: {
            ko: '교환학생 그룹톡에서 반복되는 학사제도 질문을 줄이기 위해, 45개 공식 규정 문서를 Markdown 코퍼스(379청크)로 정리하고 임베딩 인덱스를 구축했습니다.',
            en: 'To answer the recurring regulation questions in the exchange-student group chat, I turned 45 official documents into a Markdown corpus (379 chunks) with an embedding index.',
          },
          approach: {
            ko: '영어 질문을 한국어 검색어로 확장해 두 결과를 병합하는 교차 언어 검색이 핵심입니다. 답변은 출처 문서명을 각주로 붙이고, 시스템 프롬프트 13규칙과 사후 가드레일로 지어내지 않기·인젝션 방어를 이중으로 걸었습니다. 138문항 골드셋과 자동/심판 2층 채점 하니스를 직접 만들어 3차례 반복 평가로 정답률을 84%에서 91%까지 올렸고, 실행마다 오가는 경계 변동대(8~12문항)도 문서화했습니다. WhatsApp 연결은 whatsapp-web.js로 실사용 배포(Railway 상시 운영, 원격 QR 로그인, 다중 그룹 자동 발견)되어 있습니다.',
            en: 'The core trick is cross-lingual retrieval: English questions expand into Korean queries and both result sets merge. Answers carry source footnotes, and a 13-rule system prompt plus a post-hoc guardrail refuse to invent facts and block prompt injection. I built the 138-question gold set and a two-tier auto/judge scoring harness, ran three eval rounds to climb from 84% to 91%, and documented the 8-12 question boundary variance between runs. The WhatsApp side runs in production on whatsapp-web.js, hosted on Railway with remote QR login and multi-group auto-discovery.',
          },
          specs: [
            { label: { ko: '평가', en: 'Eval' }, value: { ko: '138문항 · 3차 평가 · 91% · 환각 0건', en: '138 questions · 3 rounds · 91% · 0 hallucinations' } },
            { label: { ko: '보안', en: 'Safety' }, value: { ko: '인젝션 방어 5/5 · 가드레일 이중', en: 'Injection defense 5/5 · dual guardrails' } },
            { label: { ko: '코퍼스', en: 'Corpus' }, value: { ko: '문서 45개 · 청크 379개', en: '45 documents · 379 chunks' } },
            { label: { ko: '스택', en: 'Stack' }, value: 'RAG · FastAPI · whatsapp-web.js · OpenAI · Railway' },
          ],
          gallery: [
            { file: 'chat-1.png', caption: { ko: '노트북 대여 절차 질문에 출처 각주를 붙인 답변', en: 'Laptop rental answer with source footnotes' } },
            { file: 'chat-2.png', caption: { ko: '!ask 형식으로 학생증 발급을 묻는 질문', en: 'A student ID question in the !ask format' } },
            { file: 'chat-3.png', caption: { ko: '보험·동아리 가입 질문에 근거 문서를 인용한 답변', en: 'Insurance and club signup answers citing regulation docs' } },
          ],
        },
      },
      {
        id: 'hiclub',
        title: { ko: '하이클럽', en: 'HiClub' },
        role: { ko: '기획팀 · 프로젝트 팀장', en: 'Planning team · project lead' },
        summary: {
          ko: '성균관대 국제처 산하 학생단체 하이클럽 기획팀에서 2025년 봄부터 교환학생을 맞습니다. 봄·가을 OT에서 300~400명을 한 번에 맞이하고, 26-1 스포츠데이의 모든 콘텐츠를 기획한 뒤 26-2에는 총괄을 맡았습니다.',
          en: "On the planning team of HiClub, SKKU's international-office student organization, since Spring 2025. We welcome 300-400 exchange students at each orientation, and after planning all content for the 26-1 Sports Day I took over as overall director for 26-2.",
        },
        stack: [
          { ko: '행사 기획', en: 'Event planning' },
          { ko: 'KO/EN 운영', en: 'KO/EN operations' },
          { ko: '팀 리딩', en: 'Team leadership' },
        ],
        metrics: [
          { value: '3', label: { ko: '학기 활동 · 2026-2 총괄 예정', en: 'Semesters active · directing Fall 2026' } },
          { value: '300~400', label: { ko: 'OT 1회당 맞이하는 교환학생', en: 'Exchange students per OT' } },
          { value: { ko: '200건', en: '200' }, label: { ko: '26-2 스포츠데이 신청 (최종 150명 선정)', en: 'Fall 2026 applications (150 selected)' } },
          { value: '1:3', label: { ko: '버디 매칭 (부원:교환학생)', en: 'Buddy ratio (member:student)' } },
        ],
        links: {},
        detail: {
          pitch: { ko: '교환학생 300명대의 첫 학기가 시작되는 현장에서, 기획팀 프로젝트 팀장으로', en: 'Where 300+ exchange students start their first semester, as a planning-team project lead' },
          purpose: {
            ko: '처음 한국에 온 교환학생이 캠퍼스와 학사 제도에서 길을 잃지 않게 하는 역할입니다. 반복되는 질문을 시스템으로 바꾸는 습관도 이 활동에서 발동해, 결국 학사제도 WhatsApp 봇으로 이어졌습니다.',
            en: 'The job is making sure first-time exchange students never lose their way on campus or in the rules. My habit of turning repeated questions into systems kicked in here too, and it eventually grew into the regulations WhatsApp bot.',
          },
          background: {
            ko: '하이클럽은 국제처 산하 선발제 학생단체로 기수당 20~30명으로 구성되고, 격주로 명륜·율전 캠퍼스를 오가며 매주 미팅을 합니다. 봄·가을 OT에서는 성균관대에 오는 모든 교환학생(300~400명)을 한 번에 맞이합니다.',
            en: 'HiClub is a selective student organization of 20-30 members per cohort under the Office of International Affairs, meeting weekly and alternating between the two campuses. At spring and fall orientations we welcome every incoming exchange student, 300-400 at a time.',
          },
          approach: {
            ko: 'OT 집합 맞이와 캠퍼스 투어, 부원 1명당 교환학생 3명의 버디 매칭, 그룹톡 관리와 민원 응대까지가 일상입니다. 26-1 스포츠데이(5팀 · 6종목 · 참가 99명)에서는 게임 구성과 규칙을 포함한 모든 콘텐츠를 기획했고, 입장·팔찌 안내와 자보를 KO/EN으로 번역했으며 교환학생 스프링파티 Blooming Night 콘텐츠도 만들었습니다. 그 과정이 인정받아 26-2(6팀 · 12종목, 신청 약 200건에서 최종 150명 규모로 확대)에는 스포츠데이 총괄을 맡았고(스포츠데이 허브 프로젝트로 확장), 필드트립 조장은 2025·2026 두 차례, 2025 홈커밍에는 스태프로 참가했습니다. 기획은 한국어로, 행사 진행은 전적으로 영어로 합니다.',
            en: 'Day to day: orientation welcomes and campus tours, buddy matching at one member per three students, group-chat management and student support. For the 26-1 Sports Day (5 teams, 6 game formats, 99 participants) I planned every piece of content including game formats and rules, translated the entry and wristband guides and posters between Korean and English, and built content for the exchange-student spring party Blooming Night. That track led to overall director for 26-2 (6 teams, 12 formats, scaled to 150 selected students from about 200 applications; it also grew into the Sports Day Hub project), plus field-trip team leader in 2025 and 2026 and staff at Homecoming 2025. Planning happens in Korean; the events run entirely in English.',
          },
          specs: [
            { label: { ko: '활동', en: 'Tenure' }, value: { ko: '2025봄~ · 매주 미팅 (격주 명륜/율전)', en: 'Spring 2025~ · weekly meetings, two campuses' } },
            { label: { ko: '맞이', en: 'Welcome' }, value: { ko: '봄·가을 OT · 교환학생 300~400명 · 버디 1:3', en: 'Spring/fall OTs · 300-400 students · 1:3 buddies' } },
            { label: { ko: '행사', en: 'Events' }, value: { ko: '스포츠데이 콘텐츠 기획(26-1) → 총괄(26-2) · 필드트립 조장 2회 · 홈커밍 스태프', en: 'Sports Day content (26-1) -> director (26-2) · field-trip lead x2 · homecoming staff' } },
            { label: { ko: '언어', en: 'Language' }, value: { ko: '기획 KO · 행사 진행 EN', en: 'Planned in Korean, run in English' } },
          ],
          videos: [],
          gallery: [
            { file: 'tunnel.jpg', caption: { ko: '제3땅굴 견학 (필드트립)', en: 'Third Tunnel visit (field trip)' } },
            { file: 'buddy.jpg', caption: { ko: '버디 프로그램 진행', en: 'Buddy program session' } },
            { file: 'fieldtrip.jpg', caption: { ko: '필드트립', en: 'Field trip' } },
          ],
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
      { ko: 'Python', en: 'Python' },
      { ko: 'Discord Bot API', en: 'Discord Bot API' },
      { ko: 'FastAPI', en: 'FastAPI' },
      { ko: 'GPT Vision OCR', en: 'GPT Vision OCR' },
      { ko: 'Make.com / Airtable', en: 'Make.com / Airtable' },
      { ko: 'Google Apps Script', en: 'Google Apps Script' },
      { ko: 'SQLite / Postgres', en: 'SQLite / Postgres' },
      { ko: '데이터 분석', en: 'Data analysis' },
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
