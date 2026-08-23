import test from 'node:test';
import assert from 'node:assert/strict';
import content from '../portfolio/data/content.js';

/*
 * content.js 무결성 검증
 * 실행: node --test tests/
 */

// ── 유틸: 모든 현지화 문자열이 { ko, en } 쌍을 갖는지 재귀 검사 ──
function walkLocalized(node, path, issues) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkLocalized(v, `${path}[${i}]`, issues));
    return;
  }
  if (node && typeof node === 'object') {
    if ('ko' in node || 'en' in node) {
      const ko = typeof node.ko === 'string' ? node.ko.trim() : '';
      const en = typeof node.en === 'string' ? node.en.trim() : '';
      if (!ko || !en) issues.push(`${path}: {ko,en} 쌍 불완전 (ko="${ko}", en="${en}")`);
    }
    for (const [k, v] of Object.entries(node)) walkLocalized(v, `${path}.${k}`, issues);
  }
}

// ── 유틸: 모든 링크가 https:// (또는 null) 인지 ──
function collectUrls(node, urls) {
  if (Array.isArray(node)) { node.forEach((v) => collectUrls(v, urls)); return; }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === 'demo' || k === 'github' || k === 'twitter' || k === 'youtube') {
        if (typeof v === 'string') urls.push([k, v]);
        else if (v !== null && v !== undefined && typeof v !== 'object') urls.push([k, v]);
      } else collectUrls(v, urls);
    }
  }
}

// ── 1. 스키마: 필수 섹션 존재 ──
test('스키마: 필수 최상위 섹션 존재', () => {
  for (const key of ['meta', 'profile', 'hero', 'career', 'achievements', 'projects', 'skills', 'education', 'footer']) {
    assert.ok(content[key], `content.${key} 누락`);
  }
  assert.equal(content.meta.defaultLang, 'ko');
  assert.deepEqual(content.meta.langs, ['ko', 'en']);
});

// ── 2. 이중언어: 모든 {ko,en} 쌍 완전 ──
test('이중언어: 모든 현지화 문자열에 ko/en 쌍', () => {
  const issues = [];
  walkLocalized(content, 'content', issues);
  assert.deepEqual(issues, [], `불완전한 {ko,en}: ${issues.join(', ')}`);
});

// ── 3. 커리어: Liquipedia 원본 날짜와 일치(2026-08-24 사용자 확인) ──
test('커리어: 선수 3팀 · 코치 11팀 · 현재 소속 Sybarites 포함', () => {
  assert.equal(content.career.player.length, 3);
  assert.equal(content.career.coach.length, 11);
  const playerTeams = content.career.player.map((x) => x.team);
  assert.ok(playerTeams.includes('T1'), 'T1 누락');
  const coachTeams = content.career.coach.map((x) => x.team);
  assert.ok(coachTeams.includes('OUG'), 'OUG 누락');
  assert.ok(coachTeams.includes('LG'), 'LG 누락');
  assert.ok(coachTeams.includes('abz'), 'abz 누락');
  assert.ok(coachTeams.includes('Sybarites'), 'Sybarites(현재 소속) 누락');
  const current = content.career.coach.find((x) => x.current);
  assert.ok(current && current.team === 'Sybarites', 'current 플래그는 Sybarites에만');
});

// ── 4. 성적: 14개 항목(2026-08-24 Liquipedia 보강) · 우승 2개 ──
test('성적: 14개 항목, 날짜·티어·결과·역할 구비, 우승 정확히 2개', () => {
  const list = content.achievements.list;
  assert.equal(list.length, 14);
  for (const a of list) {
    assert.match(a.date, /^\d{4}\.\d{2}\.\d{2}$/, `${a.event}: 날짜 형식`);
    assert.ok(['S', 'A', 'B', 'C'].includes(a.tier), `${a.event}: tier`);
    assert.ok(a.result && a.result.ko && a.result.en, `${a.event}: result {ko,en}`);
    assert.ok(a.role && a.role.ko && a.role.en, `${a.event}: role {ko,en}`);
  }
  const wins = list.filter((a) => a.won);
  assert.equal(wins.length, 2);
  assert.deepEqual(wins.map((w) => w.event).sort(), ['CODM World Championship 2020: Korea', 'Snapdragon Pro Series S5: NA']);
});

// ── 5. 프로젝트: 5개 · 사용자 확정 순서 고정 · 코칭 허브 데모 링크와 검증 수치 ──
test('프로젝트: 5개 항목, 사용자 확정 순서, 코칭 허브 389·2026.08 수치', () => {
  const list = content.projects.list;
  assert.equal(list.length, 5);
  const ids = list.map((p) => p.id);
  assert.equal(new Set(ids).size, 5, 'id 중복');
  assert.deepEqual(ids, ['coaching-hub', 'community-series', 'sportsday-hub', 'champions-queue', 'skku-whatsapp-bot'], '순서는 사용자 확정 순서');
  assert.ok(!ids.includes('tier-proposal'), 'tier-proposal은 제외됨(2026-08-24 사용자 확인)');
  const hub = list.find((p) => p.id === 'coaching-hub');
  assert.equal(hub.links.demo, 'https://web-production-4deec.up.railway.app');
  const flat = JSON.stringify(hub);
  assert.ok(flat.includes('389') && flat.includes('2026.08'), '코칭 허브: 검증된 389·2026.08 수치 누락');
});

// ── 6. 데이터 정직성: 조작 금지 수치 회귀 가드 ──
test('데이터 정직성: NA 시즌 101/864, 대회 8에디션·77.8h·3.6만 수치 보존', () => {
  const flat = JSON.stringify(content);
  for (const needle of ['101', '864', '77.8', '3.6만']) assert.ok(flat.includes(needle), `${needle} 누락`);
});

// ── 7. 민감 정보 필터: 포트폴리오 금지 항목이 content.js에 없음 ──
test('민감 정보: 병역·연봉·계약·학번·건강 관련 문자열 부재', () => {
  const flat = JSON.stringify(content);
  const banned = [
    '병역', '군핈', '연봉', '급여', '계약', '학번', '2020310439', '건강',
    'military', 'salary', 'wage', 'contract',
  ];
  const lower = flat.toLowerCase();
  const hits = banned.filter((term) => (term === term.toLowerCase() ? lower.includes(term) : flat.includes(term)));
  assert.deepEqual(hits, [], `민감 문자열 발견: ${hits.join(', ')}`);
});

// ── 8. 링크 형식 ──
test('링크: 모든 URL이 https://, email은 null 허용', () => {
  const urls = [];
  collectUrls(content, urls);
  assert.ok(urls.length >= 4, '최소 링크 4개 예상');
  for (const [key, url] of urls) assert.match(url, /^https:\/\//, `${key}: ${url}`);
  assert.ok(content.profile.contact.email === null || /.+@.+\..+/.test(content.profile.contact.email));
});

// ── 9. 이메일 플레이스홀더 상태 표기 ──
test('연락: email은 null(미정)이거나 유효한 주소', () => {
  const email = content.profile.contact.email;
  assert.ok(email === null || (typeof email === 'string' && email.includes('@')));
});

// ── 10. 페이지 조립: sections 순서 배열이 렌더러 화이트리스트와 정확히 일치 ──
test('페이지: sections 순서 배열 유효(화이트리스트·중복 없음·7종 전부)', () => {
  const whitelist = ['hero', 'career', 'achievements', 'projects', 'skills', 'education', 'contact'];
  const sections = content.page.sections;
  assert.ok(Array.isArray(sections) && sections.length === whitelist.length, 'sections 길이');
  assert.equal(new Set(sections).size, sections.length, 'sections 중복');
  for (const s of sections) assert.ok(whitelist.includes(s), `알 수 없는 섹션: ${s}`);
  assert.equal(sections[0], 'hero', '첫 섹션은 hero');
});

// ── 11. UI 사전: 주요 라벨 {ko,en} 구비 ──
test('UI 사전: 라벨 이중언어 구비', () => {
  for (const key of ['player', 'coach', 'demo', 'liveDemoCta']) {
    assert.ok(content.ui[key] && content.ui[key].ko && content.ui[key].en, `ui.${key}`);
  }
  const headings = content.ui.headings;
  for (const key of ['career', 'achievements', 'projects', 'skills', 'education', 'contact']) {
    assert.ok(headings[key] && headings[key].ko && headings[key].en, `ui.headings.${key}`);
  }
});

// ── 12. 상세 페이지 데이터: 전 프로젝트 detail 구비 (purpose는 null 허용) ──
test('상세: 각 프로젝트 pitch/background/approach {ko,en} + specs + gallery', () => {
  for (const p of content.projects.list) {
    const d = p.detail;
    assert.ok(d, `${p.id}: detail 누락`);
    for (const key of ['pitch', 'background', 'approach']) {
      assert.ok(d[key] && d[key].ko && d[key].en, `${p.id}: detail.${key} {ko,en}`);
    }
    assert.ok(Array.isArray(d.specs), `${p.id}: specs 배열`);
    assert.ok(d.purpose === null || (d.purpose.ko && d.purpose.en), `${p.id}: purpose는 null 또는 {ko,en}`);
    assert.ok(Array.isArray(d.gallery), `${p.id}: gallery 배열`);
  }
});
