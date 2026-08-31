// 주간 데모 keep-alive (2026-09-01)
// 사유: Supabase 무료 프로젝트는 7일간 활동이 없으면 자동 일시정지된다.
// 동작: vercel.json의 cron(매주 월요일)이 이 함수를 호출하면 데모 앱(SSR)이
//       Supabase를 조회하고, 그 조회가 활동으로 기록되어 정지를 막는다.
// 비용: Vercel Hobby cron(주 1회) + 함수 1회 실행 = 0원.
const TARGETS = ['https://sportsday-hub-demo.vercel.app'];

export default async function handler(_req, res) {
  const results = await Promise.all(
    TARGETS.map(async (url) => {
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(25000) });
        return `${url} → ${r.status}`;
      } catch (e) {
        return `${url} → ERROR ${e.name}`;
      }
    })
  );
  res.status(200).setHeader('Content-Type', 'text/plain').send(results.join('\n'));
}
