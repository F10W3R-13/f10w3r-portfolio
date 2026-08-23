# portfolio/ — 공개 얼굴 (Vite + React + threeui)

세컨드 브레인(`minwo0___`)의 공개 변환 레이어. `data/content.js`가 **단일 갱신 지점**이다.

## 명령어 (레포 루트에서)

- `npm run dev` — Vite 개발 서버
- `npm run build` — 정적 빌드 → `portfolio/dist/` (Vercel 배포 대상)
- `npm run preview` — 빌드 결과 미리보기
- `npm test` — 콘텐츠 무결성 검증 (`node --test tests/`)

## 갱신 레시피 (새 작업 반영 시)

1. 작업물을 번호 폴더(10/20/30/40…)에 보관
2. `portfolio/data/content.js`에 항목 추가 — 모든 표시 문자열은 `{ ko, en }` 쌍
3. 검증: `npm test` — 커밋 전 `fail 0` 확인 (테스트 실패 상태 커밋 금지)

## 아키텍처 (2026-08-23 리메이크 기준)

- **스택**: React 19 + Vite 7 + Tailwind v4 + Motion. threeui(`@designcodeio/threeui`) 애셋을 처음부터 직접 사용 — 3D/셰이더 배경·계기·버튼 등. 애셋 라이선스는 패키지 내 `ASSET-LICENSES.md`/`THIRD_PARTY_NOTICES.md` 준수.
- **모션**: UI 모션은 `motion/react`, 스크롤 연출은 GSAP. 같은 컴포넌트 트리 혼용 금지. `prefers-reduced-motion` 필수 대응(사용자 OS가 reduce).
- **디자인 권위**: 취향 라이브러리(`../taste-library/`) → 콘셉트 게이트(다이얼 3축·토큰 변형) → impeccable 스lop 스캔. 스킬은 설치된 세 묶음(taste-skill · emilkowalski · impeccable)만 사용.
- **데이터 규칙**: 원천은 `60 개인 기록/profile.md`의 ✅ 항목만. 🔒 민감 항목(병역·연봉·계약·학번·건강) 반영 금지 — `tests/content.test.js`가 차단. 수치는 검증된 값만(101/864, 389·2026.08, 8·77.8h·3.6만). 렌더 컴포넌트의 항목별 조건문 금지(schema-as-API), 표시 변형은 데이터 필드로.

## 구조

```
portfolio/
├── index.html            Vite 진입점 (lang=ko)
├── src/
│   ├── main.jsx / App.jsx
│   └── styles/app.css    Tailwind v4 + 콘셉트 토큰
├── data/content.js       ← 유일한 콘텐츠 파일 (ESM, {ko,en})
└── assets/               실사진·차트 등 (민감 자료 금지)
```
