// Sporer testkjøring og genererer én lokal progress-side som oppdateres underveis.
// Bruk: node testkjoring.js init|kjorer|ferdig|feil [testId] [info]
//
// Statusdata lagres i én fil per test (testkjoring-status-<id>.json) slik at
// parallelle prosesser ikke overskriver hverandres data.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAPPORT_DIR = path.join(__dirname, 'rapporter');
const META_FIL = path.join(RAPPORT_DIR, 'testkjoring-meta.json');
const HTML_FIL = path.join(RAPPORT_DIR, 'testkjoring-progress.html');

const TESTER = [
  { id: 'rapport',        navn: 'UU-rapport',      fil: 'uu-rapport.html' },
  { id: 'monkey',         navn: 'Monkey-test',      fil: 'monkey-rapport.html' },
  { id: 'sikkerhet',      navn: 'Sikkerhetstest',   fil: 'sikkerhet-rapport.html' },
  { id: 'negativ',        navn: 'Negativ test',     fil: 'negativ-rapport.html' },
  { id: 'ytelse',         navn: 'Ytelsestest',      fil: 'ytelse-rapport.html' },
  { id: 'brukerhistorie', navn: 'Brukerhistorier',  fil: 'brukerhistorie-rapport.html' },
];

const lesTid = () => new Date().toTimeString().slice(0, 5);
const lesDato = () => new Date().toISOString().slice(0, 10);
const statusFil = (id) => path.join(RAPPORT_DIR, `testkjoring-status-${id}.json`);

function formaterVarighet(ms) {
  const sek = Math.round(ms / 1000);
  const min = Math.floor(sek / 60);
  return min > 0 ? `${min}m ${sek % 60}s` : `${sek}s`;
}

function lesMeta() {
  try { return JSON.parse(fs.readFileSync(META_FIL, 'utf8')); }
  catch { return { dato: lesDato(), startet: lesTid() }; }
}

function lesTestStatus(id) {
  const meta = TESTER.find(t => t.id === id);
  try { return JSON.parse(fs.readFileSync(statusFil(id), 'utf8')); }
  catch { return { id, navn: meta?.navn ?? id, status: 'venter' }; }
}

function lesAlleTester() {
  return TESTER.map(t => lesTestStatus(t.id));
}

function skrivHTML() {
  const meta = lesMeta();
  const tester = lesAlleTester();
  fs.writeFileSync(HTML_FIL, genererHTML(meta, tester));
}

const TEST_IKONER = { rapport: '♿', monkey: '🐒', sikkerhet: '🔐', negativ: '🧪', ytelse: '🚀', brukerhistorie: '📖' };

function genererHTML(meta, tester) {
  const alleFerdig = tester.every(t => t.status === 'ferdig' || t.status === 'feil');
  const antallFerdig = tester.filter(t => t.status === 'ferdig' || t.status === 'feil').length;

  const borderFarge = { venter: '#e5e3de', kjorer: '#0a1355', ferdig: '#07604f', feil: '#c53030' };
  const scoreFarge  = { venter: '#9ca3af', kjorer: '#0a1355', ferdig: '#07604f', feil: '#c53030' };

  const kortKlasse = (s) => ({ venter: '', kjorer: '', ferdig: 'god', feil: 'darlig' })[s] ?? '';

  const kort = tester.map(t => {
    const ikonHtml = t.status === 'kjorer'
      ? `<span class="spin">${TEST_IKONER[t.id] ?? '🔄'}</span>`
      : (TEST_IKONER[t.id] ?? '🔬');

    const statusTekst = t.status === 'venter'  ? '<span class="dash-ingen">Venter...</span>'
      : t.status === 'kjorer'                  ? '<span style="color:#0a1355;font-weight:600">Kjøres nå...</span>'
      : t.rapport                               ? `<a class="dash-lenke" href="file://${t.rapport}">${t.info ?? 'Se rapport'} →</a>`
      : `<span style="color:${scoreFarge[t.status]}">${t.info ?? (t.status === 'feil' ? 'Feilet' : 'Ferdig')}</span>`;

    const statusLabel = { venter: 'VENTER', kjorer: 'KJØRES NÅ', ferdig: 'FERDIG', feil: 'FEIL' }[t.status] ?? '';
    const varighetHtml = t.varighet
      ? `<span style="font-size:.68rem;color:#9ca3af;font-weight:400;margin-left:.5rem">⏱ ${t.varighet}</span>`
      : '';

    return `<div class="dash-kort ${kortKlasse(t.status)}" style="border-top-color:${borderFarge[t.status]}">
  <div class="dash-topp">
    <span class="dash-ikon">${ikonHtml}</span>
    <div style="flex:1">
      <div class="dash-tittel">${t.navn}</div>
      <div style="font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${scoreFarge[t.status]};margin-top:2px">${statusLabel}${varighetHtml}</div>
    </div>
  </div>
  <div class="dash-nøkkel">${statusTekst}</div>
</div>`;
  }).join('');

  const samletTekst = alleFerdig
    ? `Alle ${tester.length} tester fullført – ${meta.avsluttet}`
    : `${antallFerdig} av ${tester.length} tester fullført`;

  const samletKlasse = alleFerdig ? 'god' : (antallFerdig > 0 ? 'middels' : '');

  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  ${alleFerdig ? '' : '<meta http-equiv="refresh" content="2">'}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Testkjøring ${meta.dato}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #faf6f0; color: #0f0e17; min-height: 100vh; }

    header { background: #0a1355; color: white; padding: 1.6rem 2.5rem; }
    .header-inner { max-width: 760px; margin: 0 auto; }
    .header-merkevare { font-size: .72rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; opacity: .45; margin-bottom: .4rem; }
    .env-badge { display: inline-block; font-size: .65rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: rgba(255,255,255,.18); color: white; padding: .25rem .7rem; border-radius: 100px; margin-bottom: .4rem; }
    header h1 { font-size: 1.4rem; font-weight: 700; }
    header p { opacity: .5; font-size: .82rem; margin-top: .3rem; }

    .container { max-width: 760px; margin: 2.5rem auto; padding: 0 1.5rem; }

    .samlet-seksjon { background: white; border: 1px solid #f1f0ee; padding: 1.4rem 1.8rem; margin-bottom: 2rem; box-shadow: 0 1px 4px rgba(10,19,85,.06); display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
    .samlet-score { font-size: 3rem; font-weight: 800; color: #0a1355; line-height: 1; }
    .samlet-score.god     { color: #07604f; }
    .samlet-score.middels { color: #b8860b; }
    .samlet-tekst h2 { font-size: 1rem; font-weight: 700; color: #0a1355; }
    .samlet-tekst p  { font-size: .82rem; color: #6b7280; margin-top: .3rem; }

    .test-liste { display: flex; flex-direction: column; gap: 1rem; }

    .dash-kort { background: white; border: 1px solid #f1f0ee; border-top: 5px solid #e5e3de; padding: 1.4rem 1.6rem; box-shadow: 0 1px 4px rgba(10,19,85,.06); display: flex; flex-direction: column; gap: .6rem; transition: box-shadow .15s, transform .15s; }
    .dash-kort.god    { border-top-color: #07604f; }
    .dash-kort.darlig { border-top-color: #c53030; }
    .dash-topp  { display: flex; align-items: flex-start; gap: .6rem; }
    .dash-ikon  { font-size: 1.3rem; line-height: 1.15rem; }
    .dash-tittel { font-size: .85rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #6b7280; }
    .dash-nøkkel { font-size: .82rem; color: #6b7280; padding-top: .5rem; border-top: 1px solid #f4f3f1; }
    .dash-lenke { color: #07604f; font-weight: 600; text-decoration: none; }
    .dash-lenke:hover { text-decoration: underline; }
    .dash-ingen { color: #9ca3af; }

    footer { text-align: center; padding: 2.5rem; color: #9ca3af; font-size: .78rem; border-top: 1px solid #f1f0ee; margin-top: 2rem; }

    .spin { display: inline-block; animation: spin 1.5s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
<header>
  <div class="header-inner">
    <div class="header-merkevare">KS Tilskudd</div>
    <div class="env-badge">TEST-MILJØ</div>
    <h1>Testkjøring</h1>
    <p>Startet ${meta.startet}${meta.avsluttet ? ` · Ferdig ${meta.avsluttet}` : ''} · ${meta.dato}</p>
  </div>
</header>
<div class="container">

  <div class="samlet-seksjon">
    <div class="samlet-score ${samletKlasse}">${antallFerdig}<span style="font-size:1.2rem;font-weight:400;opacity:.5">/${tester.length}</span></div>
    <div class="samlet-tekst">
      <h2>${samletTekst}</h2>
      <p>${alleFerdig ? 'Alle tester er fullført.' : 'Siden oppdateres automatisk hvert 2. sekund.'}</p>
    </div>
  </div>

  <div class="test-liste">
    ${kort}
  </div>

</div>
<footer>tilskuddsportal-testverktoy-TEST · ${meta.dato} · <a href="https://developers.fiks.ks.no/tilskuddsportal-testverktoy-TEST/rapport.html" style="color:#9ca3af" target="_blank">GitHub Pages-rapport →</a></footer>
</body>
</html>`;
}

const [kommando, testId, ...infoArr] = process.argv.slice(2);
const info = infoArr.join(' ') || undefined;

fs.mkdirSync(RAPPORT_DIR, { recursive: true });

switch (kommando) {
  case 'init': {
    const meta = { dato: lesDato(), startet: lesTid() };
    fs.writeFileSync(META_FIL, JSON.stringify(meta, null, 2));
    for (const t of TESTER) {
      fs.writeFileSync(statusFil(t.id), JSON.stringify({ id: t.id, navn: t.navn, status: 'venter' }, null, 2));
    }
    skrivHTML();
    console.log(HTML_FIL);
    break;
  }

  case 'kjorer': {
    const metaDef = TESTER.find(t => t.id === testId);
    if (!metaDef) { console.error(`Ukjent test: ${testId}`); process.exit(1); }
    const testStatus = { id: testId, navn: metaDef.navn, status: 'kjorer', _startMs: Date.now() };
    fs.writeFileSync(statusFil(testId), JSON.stringify(testStatus, null, 2));
    skrivHTML();
    break;
  }

  case 'ferdig': {
    const dato = lesDato();
    const metaDef = TESTER.find(t => t.id === testId);
    const testStatus = lesTestStatus(testId);
    testStatus.status = 'ferdig';
    if (info) testStatus.info = info;
    if (metaDef?.fil) testStatus.rapport = path.join(RAPPORT_DIR, dato, metaDef.fil);
    if (testStatus._startMs) {
      testStatus.varighet = formaterVarighet(Date.now() - testStatus._startMs);
      delete testStatus._startMs;
    }
    fs.writeFileSync(statusFil(testId), JSON.stringify(testStatus, null, 2));

    const alleTester = lesAlleTester();
    if (alleTester.every(t => t.status === 'ferdig' || t.status === 'feil')) {
      const runMeta = lesMeta();
      if (!runMeta.avsluttet) {
        runMeta.avsluttet = lesTid();
        fs.writeFileSync(META_FIL, JSON.stringify(runMeta, null, 2));
      }
    }
    skrivHTML();
    break;
  }

  case 'feil': {
    const testStatus = lesTestStatus(testId);
    testStatus.status = 'feil';
    if (info) testStatus.info = info;
    if (testStatus._startMs) {
      testStatus.varighet = formaterVarighet(Date.now() - testStatus._startMs);
      delete testStatus._startMs;
    }
    fs.writeFileSync(statusFil(testId), JSON.stringify(testStatus, null, 2));

    const alleTester = lesAlleTester();
    if (alleTester.every(t => t.status === 'ferdig' || t.status === 'feil')) {
      const runMeta = lesMeta();
      if (!runMeta.avsluttet) {
        runMeta.avsluttet = lesTid();
        fs.writeFileSync(META_FIL, JSON.stringify(runMeta, null, 2));
      }
    }
    skrivHTML();
    break;
  }

  default:
    console.error('Bruk: node testkjoring.js init|kjorer|ferdig|feil [testId] [info]');
    process.exit(1);
}
