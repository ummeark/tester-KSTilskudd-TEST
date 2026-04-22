import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const START_URL = process.argv[2] || 'https://tilskudd.fiks.test.ks.no/';
const MAX_SIDER = parseInt(process.argv[3]) || 20;
const dato = new Date().toISOString().slice(0, 10);
const tidspunkt = new Date().toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
const rapportDir = path.join(__dirname, 'rapporter', dato);
fs.mkdirSync(rapportDir, { recursive: true });

const baseOrigin = new URL(START_URL).origin;

console.log(`\n🚀 Starter ytelsestest av: ${START_URL}`);
console.log(`📅 Dato: ${dato}`);
console.log(`📄 Maks antall sider: ${MAX_SIDER}\n`);

// ── Score-funksjoner ──────────────────────────────────────────────────────────

function scoreLCP(ms)  { return ms <= 2500 ? 100 : ms <= 4000 ? Math.round(100 - (ms - 2500) / 15)  : Math.max(0, Math.round(50 - (ms - 4000) / 80));  }
function scoreFCP(ms)  { return ms <= 1800 ? 100 : ms <= 3000 ? Math.round(100 - (ms - 1800) / 12)  : Math.max(0, Math.round(50 - (ms - 3000) / 60));  }
function scoreTTFB(ms) { return ms <= 800  ? 100 : ms <= 1800 ? Math.round(100 - (ms - 800)  / 10)  : Math.max(0, Math.round(50 - (ms - 1800) / 36)); }
function scoreLoad(ms) { return ms <= 3000 ? 100 : ms <= 6000 ? Math.round(100 - (ms - 3000) / 30)  : Math.max(0, Math.round(50 - (ms - 6000) / 60));  }

function beregnScore(lcp, fcp, ttfb, load) {
  return Math.max(0, Math.round(0.4 * scoreLCP(lcp) + 0.2 * scoreFCP(fcp) + 0.2 * scoreTTFB(ttfb) + 0.2 * scoreLoad(load)));
}

// ── Formateringshjelpere ──────────────────────────────────────────────────────

function visTid(v)  { return v < 1000 ? `${Math.round(v)} ms` : `${(v / 1000).toFixed(1)} s`; }
function visStr(kb) { return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`; }

function fargeLCP(v)  { return v <= 2500 ? 'god' : v <= 4000 ? 'middels' : 'dårlig'; }
function fargeFCP(v)  { return v <= 1800 ? 'god' : v <= 3000 ? 'middels' : 'dårlig'; }
function fargeTTFB(v) { return v <= 800  ? 'god' : v <= 1800 ? 'middels' : 'dårlig'; }
function fargeLoad(v) { return v <= 3000 ? 'god' : v <= 6000 ? 'middels' : 'dårlig'; }
function fargeStr(kb) { return kb <= 1024 ? 'god' : kb <= 3072 ? 'middels' : 'dårlig'; }
function fargeReq(n)  { return n <= 50   ? 'god' : n <= 100   ? 'middels' : 'dårlig'; }
function scoreKlasse(s) { return s >= 80 ? 'god' : s >= 50 ? 'middels' : 'dårlig'; }

// ── Crawl og mål ─────────────────────────────────────────────────────────────

const browser = await chromium.launch();
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 Ytelses-Tester/1.0',
  viewport: { width: 1280, height: 900 },
});

const besøkte = new Set();
const kø = [START_URL];
const sideResultater = [];

while (kø.length > 0 && sideResultater.length < MAX_SIDER) {
  const url = kø.shift();
  if (besøkte.has(url)) continue;
  besøkte.add(url);

  console.log(`  📄 [${sideResultater.length + 1}] ${url}`);

  const page = await context.newPage();

  // Observer for LCP og FCP må settes opp FØR navigasjon
  await page.addInitScript(() => {
    window.__lcp = 0;
    window.__fcp = 0;
    try {
      new PerformanceObserver(list => {
        const e = list.getEntries();
        if (e.length) window.__lcp = e[e.length - 1].startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
    try {
      new PerformanceObserver(list => {
        for (const e of list.getEntries())
          if (e.name === 'first-contentful-paint') window.__fcp = e.startTime;
      }).observe({ type: 'paint', buffered: true });
    } catch {}
  });

  let ytelse = null;
  let lenker = [];

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(800); // gi LCP-observer tid til å registrere

    const data = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const res = performance.getEntriesByType('resource');
      return {
        ttfb:     nav ? Math.round(nav.responseStart - nav.requestStart) : 0,
        load:     nav ? Math.round(nav.loadEventEnd - nav.startTime)     : 0,
        sizeKB:   Math.round(res.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024),
        requests: res.length,
        lcp:      Math.round(window.__lcp || 0),
        fcp:      Math.round(window.__fcp || 0),
      };
    });

    const tittel = await page.title() || url;
    const score = beregnScore(data.lcp, data.fcp, data.ttfb, data.load);
    ytelse = { url, tittel, score, ...data };

    lenker = await page.evaluate(origin => {
      return [...new Set(
        Array.from(document.querySelectorAll('a[href]'))
          .map(a => { try { return new URL(a.href, location.href).href.split('?')[0]; } catch { return null; } })
          .filter(h => h && h.startsWith(origin) && !h.includes('#'))
      )];
    }, baseOrigin);

    console.log(`     Score: ${score} | LCP: ${data.lcp}ms | FCP: ${data.fcp}ms | TTFB: ${data.ttfb}ms | Last: ${data.load}ms | ${data.sizeKB}KB | ${data.requests} req`);
  } catch (e) {
    console.log(`     ⚠️  Feil: ${e.message.split('\n')[0]}`);
  } finally {
    await page.close();
  }

  if (ytelse) {
    sideResultater.push(ytelse);
    for (const l of lenker)
      if (!besøkte.has(l) && !kø.includes(l)) kø.push(l);
  }
}

await browser.close();

// ── Aggreger resultater ───────────────────────────────────────────────────────

const n = sideResultater.length;
const snitt = arr => n ? Math.round(arr.reduce((a, b) => a + b, 0) / n) : 0;

const samletScore = snitt(sideResultater.map(r => r.score));
const snittLCP    = snitt(sideResultater.map(r => r.lcp));
const snittFCP    = snitt(sideResultater.map(r => r.fcp));
const snittTTFB   = snitt(sideResultater.map(r => r.ttfb));
const snittLoad   = snitt(sideResultater.map(r => r.load));
const totalSizeKB = sideResultater.reduce((s, r) => s + r.sizeKB, 0);
const totalReq    = sideResultater.reduce((s, r) => s + r.requests, 0);

console.log(`\n✅ Ferdig! Score: ${samletScore}/100 | ${n} sider analysert`);

// ── Lagre JSON ────────────────────────────────────────────────────────────────

const jsonResultat = {
  url: START_URL,
  dato,
  tidspunkt,
  score: samletScore,
  totalt: { sider: n, snittLCP, snittFCP, snittTTFB, snittLoad, totalSizeKB, totalRequests: totalReq },
  sider: sideResultater,
};
fs.writeFileSync(path.join(rapportDir, 'ytelse-resultat.json'), JSON.stringify(jsonResultat, null, 2));
console.log(`📄 JSON lagret → rapporter/${dato}/ytelse-resultat.json`);

// ── Generer HTML-rapport ──────────────────────────────────────────────────────

const tabellRader = sideResultater.map(side => `
  <tr>
    <td class="url-col">
      <a href="${side.url}" target="_blank">${side.tittel}</a>
      <small>${side.url}</small>
    </td>
    <td class="score-col ${scoreKlasse(side.score)}">${side.score}</td>
    <td class="${fargeLCP(side.lcp)}">${visTid(side.lcp)}</td>
    <td class="${fargeFCP(side.fcp)}">${visTid(side.fcp)}</td>
    <td class="${fargeTTFB(side.ttfb)}">${visTid(side.ttfb)}</td>
    <td class="${fargeLoad(side.load)}">${visTid(side.load)}</td>
    <td class="${fargeStr(side.sizeKB)}">${visStr(side.sizeKB)}</td>
    <td class="${fargeReq(side.requests)}">${side.requests}</td>
  </tr>`).join('');

const rapportHTML = `<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ytelsesrapport ${dato} – KS Tilskudd</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; background: #faf6f0; color: #0f0e17; min-height: 100vh; }

  header { background: #0a1355; color: white; padding: 1.6rem 2.5rem; }
  .header-inner { max-width: 1200px; margin: 0 auto; }
  .header-merkevare { font-size: 0.72rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; opacity: 0.45; margin-bottom: .4rem; }
  .env-badge { display: inline-block; font-size: .65rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: rgba(255,255,255,.18); color: white; padding: .25rem .7rem; border-radius: 100px; margin-bottom: .4rem; }
  header h1 { font-size: 1.4rem; font-weight: 700; }
  header p { opacity: 0.5; font-size: 0.82rem; margin-top: 0.3rem; }

  .container { max-width: 1200px; margin: 2.5rem auto; padding: 0 2rem; }

  .nav-knapper { display: flex; gap: .6rem; flex-wrap: wrap; align-items: flex-start; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 2px solid #f4ecdf; }
  .knapp { display: inline-block; padding: .5rem 1.2rem; background: #0a1355; color: white; border-radius: 100px; font-size: .82rem; font-weight: 500; text-decoration: none; white-space: nowrap; transition: background .15s; }
  .knapp:hover { background: #2b3285; }
  .knapp.aktiv { background: #07604f; pointer-events: none; }
  .knapp.sekundær { background: transparent; border: 1px solid #0a1355; color: #0a1355; }
  .knapp.sekundær:hover { background: #f4ecdf; }

  .samlet { background: white; border: 1px solid #f1f0ee; padding: 1.6rem 2rem; margin-bottom: 1.5rem; box-shadow: 0 1px 4px rgba(10,19,85,.06); display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
  .samlet-score { font-size: 3.5rem; font-weight: 800; line-height: 1; }
  .samlet-score.god { color: #07604f; }
  .samlet-score.middels { color: #b8860b; }
  .samlet-score.dårlig { color: #c53030; }
  .samlet-tekst h2 { font-size: 1rem; font-weight: 700; color: #0a1355; }
  .samlet-tekst p { font-size: 0.82rem; color: #6b7280; margin-top: 0.3rem; }

  .snitt-rad { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
  .snitt-kort { background: white; border: 1px solid #f1f0ee; padding: 1rem 1.4rem; flex: 1; min-width: 130px; box-shadow: 0 1px 4px rgba(10,19,85,.06); }
  .snitt-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 0.4rem; }
  .snitt-verdi { font-size: 1.3rem; font-weight: 700; }
  .snitt-verdi.god { color: #07604f; }
  .snitt-verdi.middels { color: #b8860b; }
  .snitt-verdi.dårlig { color: #c53030; }

  .tabell-wrapper { background: white; border: 1px solid #f1f0ee; box-shadow: 0 1px 4px rgba(10,19,85,.06); overflow-x: auto; margin-bottom: 1rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
  th { background: #0a1355; color: white; padding: .7rem 1rem; text-align: left; font-weight: 600; font-size: 0.75rem; white-space: nowrap; }
  th small { display: block; font-weight: 400; opacity: 0.6; font-size: 0.65rem; margin-top: 1px; }
  td { padding: .65rem 1rem; border-bottom: 1px solid #f4f3f1; vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #faf6f0; }
  td.url-col { max-width: 280px; }
  td.url-col a { color: #0a1355; text-decoration: none; font-weight: 500; }
  td.url-col a:hover { text-decoration: underline; }
  td.url-col small { color: #9ca3af; font-size: 0.72rem; display: block; margin-top: 2px; word-break: break-all; }
  td.score-col { font-weight: 700; font-size: 1rem; text-align: center; min-width: 60px; }
  td.god { color: #07604f; font-weight: 600; }
  td.middels { color: #b8860b; font-weight: 600; }
  td.dårlig { color: #c53030; font-weight: 600; }
  td.score-col.god { color: white; background: #07604f; }
  td.score-col.middels { color: #0a1355; background: #f3dda2; }
  td.score-col.dårlig { color: white; background: #c53030; }

  .forklaring { font-size: 0.78rem; color: #6b7280; display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
  .forklaring .god::before    { content: '● '; color: #07604f; }
  .forklaring .middels::before { content: '● '; color: #b8860b; }
  .forklaring .dårlig::before  { content: '● '; color: #c53030; }

  footer { text-align: center; padding: 2.5rem; color: #9ca3af; font-size: 0.78rem; border-top: 1px solid #f1f0ee; margin-top: 2rem; }
</style>
</head>
<body>
<header>
  <div class="header-inner">
    <div class="header-merkevare">KS Tilskudd · Ytelsestest</div>
    <div class="env-badge">TEST-MILJØ</div>
    <h1>Ytelsesrapport</h1>
    <p>${dato} ${tidspunkt} · ${START_URL}</p>
  </div>
</header>
<div class="container">
  <div class="nav-knapper">
    <a href="rapport.html" class="knapp sekundær">Forside</a>
    <a href="uu-rapport.html" class="knapp sekundær">UU-rapport</a>
    <a href="monkey-rapport.html" class="knapp sekundær">Monkey-test</a>
    <a href="sikkerhet-rapport.html" class="knapp sekundær">Sikkerhetstest</a>
    <a href="negativ-rapport.html" class="knapp sekundær">Negativ test</a>
    <a href="ytelse-rapport.html" class="knapp aktiv">Ytelsestest</a>
    <a href="arkiv.html" class="knapp sekundær">Arkiv</a>
  </div>

  <div class="samlet">
    <div class="samlet-score ${scoreKlasse(samletScore)}">${samletScore}</div>
    <div class="samlet-tekst">
      <h2>Ytelsesscore – ${START_URL}</h2>
      <p>${n} sider analysert · Vektet snitt: LCP 40 %, FCP 20 %, TTFB 20 %, Lastetid 20 %</p>
    </div>
  </div>

  <div class="snitt-rad">
    <div class="snitt-kort">
      <div class="snitt-label">Snitt LCP</div>
      <div class="snitt-verdi ${fargeLCP(snittLCP)}">${visTid(snittLCP)}</div>
    </div>
    <div class="snitt-kort">
      <div class="snitt-label">Snitt FCP</div>
      <div class="snitt-verdi ${fargeFCP(snittFCP)}">${visTid(snittFCP)}</div>
    </div>
    <div class="snitt-kort">
      <div class="snitt-label">Snitt TTFB</div>
      <div class="snitt-verdi ${fargeTTFB(snittTTFB)}">${visTid(snittTTFB)}</div>
    </div>
    <div class="snitt-kort">
      <div class="snitt-label">Snitt lastetid</div>
      <div class="snitt-verdi ${fargeLoad(snittLoad)}">${visTid(snittLoad)}</div>
    </div>
    <div class="snitt-kort">
      <div class="snitt-label">Total datastørrelse</div>
      <div class="snitt-verdi ${fargeStr(totalSizeKB)}">${visStr(totalSizeKB)}</div>
    </div>
    <div class="snitt-kort">
      <div class="snitt-label">Totale forespørsler</div>
      <div class="snitt-verdi ${fargeReq(totalReq)}">${totalReq}</div>
    </div>
  </div>

  <div class="tabell-wrapper">
    <table>
      <thead>
        <tr>
          <th>Side</th>
          <th>Score</th>
          <th>LCP<small>mål &lt; 2,5 s</small></th>
          <th>FCP<small>mål &lt; 1,8 s</small></th>
          <th>TTFB<small>mål &lt; 800 ms</small></th>
          <th>Lastetid<small>mål &lt; 3 s</small></th>
          <th>Størrelse<small>mål &lt; 1 MB</small></th>
          <th>Forespørsler<small>mål &lt; 50</small></th>
        </tr>
      </thead>
      <tbody>${tabellRader}</tbody>
    </table>
  </div>

  <div class="forklaring">
    <span class="god">God (innenfor mål)</span>
    <span class="middels">Middels (nær grensen)</span>
    <span class="dårlig">Bør forbedres (over grense)</span>
  </div>
</div>
<footer>KS Tilskudd · Ytelsestest · Playwright Chromium</footer>
</body>
</html>`;

fs.writeFileSync(path.join(rapportDir, 'ytelse-rapport.html'), rapportHTML);
console.log(`📊 Rapport lagret → rapporter/${dato}/ytelse-rapport.html`);
