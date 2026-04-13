import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rapportDir = path.join(__dirname, 'rapporter');
const docsDir = path.join(__dirname, 'docs');

// Les alle tilgjengelige rapporter
const datoer = fs.readdirSync(rapportDir)
  .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.existsSync(path.join(rapportDir, d, 'resultat.json')))
  .sort()
  .reverse(); // Nyeste først

const rapporter = datoer.map(dato => {
  const json = JSON.parse(fs.readFileSync(path.join(rapportDir, dato, 'resultat.json'), 'utf-8'));

  // Håndter både nytt format (json.totalt) og gammelt format (json.wcag o.l.)
  const t = json.totalt || {
    sider: 1,
    wcagBrudd: json.wcag?.brudd || 0,
    kritiske: json.wcag?.kritiske || 0,
    alvorlige: json.wcag?.alvorlige || 0,
    moderate: json.wcag?.moderate || 0,
    mindre: json.wcag?.mindre || 0,
    dødelenker: json.lenker?.døde || 0,
    knappUtenLabel: Array.isArray(json.knapper) ? json.knapper.filter(k => !k.harLabel).length : 0,
    bilderUtenAlt: Array.isArray(json.bilder) ? json.bilder.filter(b => !b.harAlt).length : 0,
    feltUtenLabel: Array.isArray(json.skjema) ? json.skjema.filter(f => !f.harLabel).length : 0,
  };

  const score = Math.max(0, 100
    - (t.kritiske || 0) * 15
    - (t.alvorlige || 0) * 8
    - (t.moderate || 0) * 3
    - (t.mindre || 0)
    - (t.dødelenker || 0) * 5
    - (t.knappUtenLabel || 0) * 4
    - (t.bilderUtenAlt || 0) * 4
    - (t.feltUtenLabel || 0) * 4
  );
  return { dato, score, totalt: t, url: json.url };
});

// Kopier alle rapporter til docs/arkiv/
const arkivDir = path.join(docsDir, 'arkiv');
fs.mkdirSync(arkivDir, { recursive: true });

for (const { dato } of rapporter) {
  const kildedir = path.join(rapportDir, dato);
  const måldir = path.join(arkivDir, dato);
  fs.mkdirSync(måldir, { recursive: true });

  // Kopier rapport.html
  const rapportFil = path.join(kildedir, 'rapport.html');
  if (fs.existsSync(rapportFil)) {
    // Oppdater relative stier til skjermbilder i den kopierte rapporten
    let html = fs.readFileSync(rapportFil, 'utf-8');
    html = html.replace(/src="skjermbilder\//g, 'src="../' + dato + '/skjermbilder/');
    html = html.replace(/href="skjermbilder\//g, 'href="../' + dato + '/skjermbilder/');
    fs.writeFileSync(path.join(måldir, 'rapport.html'), html);
  }

  // Kopier skjermbilder
  const skjermSrc = path.join(kildedir, 'skjermbilder');
  const skjermMål = path.join(arkivDir, dato, 'skjermbilder');
  if (fs.existsSync(skjermSrc)) {
    fs.mkdirSync(skjermMål, { recursive: true });
    fs.readdirSync(skjermSrc).forEach(fil => {
      fs.copyFileSync(path.join(skjermSrc, fil), path.join(skjermMål, fil));
    });
  }
}

// Generer arkivside
function scoreKlasse(s) { return s >= 80 ? 'god' : s >= 50 ? 'middels' : 'dårlig'; }
function trend(i) {
  if (i >= rapporter.length - 1) return '';
  const diff = rapporter[i].score - rapporter[i + 1].score;
  if (diff > 0) return `<span class="trend opp">↑ +${diff}</span>`;
  if (diff < 0) return `<span class="trend ned">↓ ${diff}</span>`;
  return `<span class="trend lik">→ 0</span>`;
}

const norskDato = (dato) => {
  const d = new Date(dato);
  return d.toLocaleDateString('nb-NO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const arkivHTML = `<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tilgjengelighetsrapport – Arkiv – KS Tilskudd</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; background: #faf6f0; color: #0f0e17; }

  header { background: #0a1355; color: white; padding: 1.6rem 2.5rem; }
  .header-inner { max-width: 920px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .header-merkevare { font-size: 0.72rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; opacity: 0.45; margin-bottom: .4rem; }
  header h1 { font-size: 1.3rem; font-weight: 600; }
  header p { opacity: 0.5; font-size: 0.82rem; margin-top: 0.3rem; }
  .header-nav a { display: inline-block; padding: .45rem 1.1rem; border: 1px solid rgba(255,255,255,.3); border-radius: 100px; color: rgba(255,255,255,.8); text-decoration: none; font-size: 0.82rem; transition: all .15s; }
  .header-nav a:hover { background: rgba(255,255,255,.1); color: white; border-color: rgba(255,255,255,.6); }

  .container { max-width: 920px; margin: 2.5rem auto; padding: 0 1.5rem; }

  /* Trend-graf */
  .trend-graf { background: white; border: 1px solid #f1f0ee; padding: 1.8rem; margin-bottom: 2rem; box-shadow: 0 1px 4px rgba(10,19,85,.06); }
  .trend-graf h2 { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #0a1355; margin-bottom: 1.2rem; }
  .graf { display: flex; align-items: flex-end; gap: 5px; height: 80px; }
  .søyle-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .søyle { width: 100%; transition: opacity .2s; cursor: pointer; }
  .søyle:hover { opacity: 0.75; }
  .søyle.god { background: #07604f; }
  .søyle.middels { background: #b8860b; }
  .søyle.dårlig { background: #c53030; }
  .søyle-dato { font-size: 0.58rem; color: #9ca3af; text-align: center; writing-mode: vertical-rl; transform: rotate(180deg); }

  /* Rapportliste */
  .rapport-liste { display: flex; flex-direction: column; gap: 0.7rem; }
  .rapport-rad { background: white; border: 1px solid #f1f0ee; border-left: 5px solid #e5e3de; padding: 1.3rem 1.6rem; box-shadow: 0 1px 4px rgba(10,19,85,.06); display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 1.2rem; text-decoration: none; color: inherit; transition: box-shadow .15s; }
  .rapport-rad:hover { box-shadow: 0 4px 16px rgba(10,19,85,.1); }
  .rapport-rad.god { border-left-color: #07604f; }
  .rapport-rad.middels { border-left-color: #b8860b; }
  .rapport-rad.dårlig { border-left-color: #c53030; }

  .score-boble { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; font-weight: 700; flex-shrink: 0; }
  .score-boble.god { background: #07604f; color: white; }
  .score-boble.middels { background: #f3dda2; color: #0a1355; }
  .score-boble.dårlig { background: #c53030; color: white; }

  .dato-info h3 { font-size: .95rem; font-weight: 600; color: #0a1355; }
  .dato-info p { font-size: 0.78rem; color: #9ca3af; margin-top: 0.25rem; }

  .nøkkeltall { display: flex; gap: 1.2rem; font-size: 0.8rem; color: #6b7280; flex-wrap: wrap; }
  .nøkkeltall span { display: flex; align-items: center; gap: 0.3rem; }
  .nøkkeltall .rød { color: #c53030; font-weight: 600; }
  .nøkkeltall .grønn { color: #07604f; }

  .åpne-knapp { background: #0a1355; color: white; padding: 0.45rem 1.1rem; border-radius: 100px; font-size: 0.8rem; white-space: nowrap; font-weight: 500; }
  .rapport-rad:hover .åpne-knapp { background: #2b3285; }

  .trend { font-size: 0.78rem; font-weight: 600; }
  .trend.opp { color: #07604f; }
  .trend.ned { color: #c53030; }
  .trend.lik { color: #9ca3af; }

  footer { text-align: center; padding: 2.5rem; color: #9ca3af; font-size: 0.78rem; border-top: 1px solid #f1f0ee; margin-top: 2rem; }
</style>
</head>
<body>
<header>
  <div class="header-inner">
    <div>
      <div class="header-merkevare">KS Tilskudd · UU-tester</div>
      <h1>Tilgjengelighetsrapport – Arkiv</h1>
      <p>${rapporter.length} rapporter totalt</p>
    </div>
    <nav class="header-nav">
      <a href="rapport.html">Siste rapport</a>
    </nav>
  </div>
</header>
<div class="container">

  <!-- Trend-graf -->
  <div class="trend-graf">
    <h2>Score-utvikling over tid</h2>
    <div class="graf">
      ${[...rapporter].reverse().map(r => `
        <div class="søyle-wrapper" title="${r.dato}: ${r.score} poeng">
          <a href="arkiv/${r.dato}/rapport.html" style="width:100%;display:flex;flex-direction:column;align-items:center;flex:1;justify-content:flex-end">
            <div class="søyle ${scoreKlasse(r.score)}" style="height:${r.score}%"></div>
          </a>
          <span class="søyle-dato">${r.dato.slice(5)}</span>
        </div>`).join('')}
    </div>
  </div>

  <!-- Rapportliste -->
  <div class="rapport-liste">
    ${rapporter.map((r, i) => `
      <a class="rapport-rad ${scoreKlasse(r.score)}" href="arkiv/${r.dato}/rapport.html">
        <div class="score-boble ${scoreKlasse(r.score)}">${r.score}</div>
        <div class="dato-info">
          <h3>${norskDato(r.dato)}</h3>
          <p>${r.dato} &nbsp; ${trend(i)}</p>
        </div>
        <div class="nøkkeltall">
          <span>${r.totalt.wcagBrudd > 0 ? `<b class="rød">WCAG ${r.totalt.wcagBrudd}</b>` : '<span class="grønn">WCAG 0</span>'}</span>
          <span>${r.totalt.dødelenker > 0 ? `<b class="rød">Lenker ${r.totalt.dødelenker}</b>` : '<span class="grønn">Lenker 0</span>'}</span>
          <span>${r.totalt.sider} sider</span>
        </div>
        <div class="åpne-knapp">Se rapport →</div>
      </a>`).join('')}
  </div>
</div>
<footer>KS Tilskudd · UU-tester · axe-core + Playwright</footer>
</body>
</html>`;

fs.writeFileSync(path.join(docsDir, 'arkiv.html'), arkivHTML);
console.log(`✅ Arkiv generert med ${rapporter.length} rapporter → docs/arkiv.html`);
