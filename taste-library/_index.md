# 취향 라이브러리 — 색인 (원천 문서)

> 갱신: 2026-08-24 · 후보 출처: styles.refero.design (45건) + threeui 컴포넌트(lab 보드)
> 규칙: staging은 미검증 후보. 사용자 반응(좋다/싫다+이유)을 받은 것만 승격/기각. 여기가 콘셉트 프롬프트의 입력값.

## 취향 프로파일

- **선호**: brutalist editorial · sports-kinetic · 다크 모노크롬 '잉크 온 블랙' 전시형 · 다크 위의 단일 강조색(scarlet/orange/ember) · 심도 있는 관측소형 다크
- **기각**: warm-paper/cream ledger(종이 질감) · neon/crypto glow · 내용 없는 black void · bright Swiss noon
- **뉘앙스(2026-08-24 확정)**: 웜 계열은 '빛'(orange-lit)일 때만 허용, '종이'일 때는 기각. 다크는 콘텐츠/타입이 채운 다크만.

## 승격 목록 (16)

| 카테고리 | 파일 |
|---|---|
| hero/ (6) | 06-studio-oker · 07-figma-config · 15-foundry · 36-alejandro-mejias · 41-champions4good · 42-uniswap-cup |
| typography/ (5) | 01-studio-few · 04-riptype-foundry · 35-wemakethings · 38-dylanbrouwer · 44-athletics |
| exhibit-card/ (2) | 39-nofilter · 43-nike-com |
| detail-page/ (3) | 23-dna · 37-eindhoven · 40-ragged-edge |
| data-table/ | 비움 — 취향상 데이터는 밝은 종이가 아니라 다크 캔버스 위 계기로 |

## 반응 이력

- **2026-08-23**: 승인 10 (35~44 그룹) · 기각 8 (02, 09, 10, 11, 17, 20, 26, 28)
- **2026-08-24**: 승인 +6 (01, 04, 06, 07, 15, 23) · 명시적 기각 없음 · 무반응 20장(03, 05, 08, 12, 13, 14, 16, 18, 19, 21, 22, 24, 25, 27, 29, 30, 31, 32, 33, 34) staging 유지 · 45-diabla 보류

## threeui 취향 보드

- `portfolio/lab.html` (dev 서버 `/lab.html`) — B(배경·필드)/H(HUD·계기)/T(타입·모션)/C(버튼·CTA) 코드 반응
- **2026-08-24 1차 반응 — 배경 승인 3종**: DataField(B-03) · ConstellationField(B-04) · RibbonFieldBackground(B-14)
- **프로세스 전환(2026-08-24, 사용자)**: 나머지 부문은 원시 상태로 판정하지 않고 **"실제 적용된 모습을 먼저 보고 핀포인트 수정"** 하는 방식으로. H/T/C 캘리브레이션은 콘셉트 적용 상태에서 계속 진행. 콘셉트 피커에 배경 즉시 교체 컨트롤을 둔다.
- **2026-08-24 부문 판정 (적용 목업 C3에서)**: ① 계기(HUD)·타입 이펙트 **미채택** — "장식만 한 섹션은 포트폴리오에 불필요"(사용자 판단, taste-skill "모션은 동기가 필요" 원칙과 일치). ② threeui 역할은 **히어로 배경에 집중** — C3 기본 RibbonFieldBackground(포인터 반응 있음). ③ 셰이더 버튼 전부 기각 → **직접 제작 CTA 채택**(볼트 아웃라인·hover 채움·눌림, 실링크). ④ ParticleWordmark는 고정 텍스트(NEUFORM/ThreeUI)라 워드마크로 부적합 확인 — 커스텀 텍스트 가능한 것은 TypographyVortexCanvas뿐(phrase prop).

## 콘셉트 가드레일 (원칙 수준 — 토큰은 탐색 변수로)

- 네온 글로우 금지, 강조색은 잉크/임버 계열로 절제 — 단 stark-white 브루탈리스트 프린트는 허용(Eindhoven 계보)
- 슬롭 금지조항(AI-purple, Inter 기본, em/en-dash 등)은 taste-skill v2 Pre-Flight에 위임
- 토큰(배경/팔레트/타입)은 콘셉트 간 달라져야 함 — 고정 금지
