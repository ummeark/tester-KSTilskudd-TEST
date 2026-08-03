// Sporer testkjøring og genererer én lokal progress-side som oppdateres underveis.
// Bruk: node testkjoring.js init|kjorer|ferdig|feil [testId] [info]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAPPORT_DIR = path.join(__dirname, 'rapporter');
const STATUS_FIL = path.join(RAPPORT_DIR, 'testkjoring-status.json');
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
const lesStatus = () => JSON.parse(fs.readFileSync(STATUS_FIL, 'utf8'));

function skrivOgGenerer(status) {
  fs.mkdirSync(RAPPORT_DIR, { recursive: true });
  fs.writeFileSync(STATUS_FIL, JSON.stringify(status, null, 2));
  fs.writeFileSync(HTML_FIL, genererHTML(status));
}

function genererHTML(status) {
  const alleFerdig = status.tester.every(t => t.status === 'ferdig' || t.status === 'feil');
  const antallFerdig = status.tester.filter(t => t.status === 'ferdig' || t.status === 'feil').length;

  const farge = { venter: '#aaa', kjorer: '#0055cc', ferdig: '#2a7a2a', feil: '#cc0000' };
  const ikon  = { venter: '⏳', kjorer: '🔄', ferdig: '✅', feil: '❌' };

  const rader = status.tester.map(t => {
    const spinning = t.status === 'kjorer';
    const ikonHtml = spinning ? '<span class="spin">🔄</span>' : ikon[t.status] ?? '?';
    const detalj = t.status === 'venter' ? '<span class="graa">Venter...</span>'
      : t.status === 'kjorer'  ? '<span class="bla">Kjøres nå...</span>'
      : t.rapport               ? `<a href="file://${t.rapport}">${t.info ?? 'Åpne rapport'} →</a>`
      : `<span style="color:${farge[t.status]}">${t.info ?? (t.status === 'feil' ? 'Feilet' : 'Ferdig')}</span>`;

    return `<div class="rad">
      <span class="ikon">${ikonHtml}</span>
      <div>
        <div class="navn" style="color:${farge[t.status] ?? '#333'}">${t.navn}</div>
        <div class="detalj">${detalj}</div>
      </div>
    </div>`;
  }).join('');

  const banner = alleFerdig
    ? `<div class="banner ok">✅ Alle tester fullført – ${status.avsluttet}</div>`
    : `<div class="banner loper">${antallFerdig} av ${status.tester.length} fullført</div>`;

  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  ${alleFerdig ? '' : '<meta http-equiv="refresh" content="2">'}
  <title>Testkjøring ${status.dato}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
           background: #f0f2f5; min-height: 100vh; padding: 48px 20px; }
    .kort { background: white; border-radius: 14px; max-width: 500px; margin: 0 auto;
            box-shadow: 0 2px 18px rgba(0,0,0,.1); overflow: hidden; }
    .hdr  { padding: 20px 24px; border-bottom: 1px solid #eee; }
    h1    { font-size: 1.1rem; color: #111; }
    .meta { font-size: .8rem; color: #aaa; margin-top: 4px; }
    .banner { padding: 10px 24px; font-size: .88rem; font-weight: 600; }
    .banner.ok    { background: #e8f5e9; color: #2a7a2a; border-bottom: 1px solid #c8e6c9; }
    .banner.loper { background: #e8f0fe; color: #1a56cc; border-bottom: 1px solid #c5d8fd; }
    .rad   { display: flex; align-items: flex-start; gap: 14px;
             padding: 13px 24px; border-bottom: 1px solid #f3f3f3; }
    .rad:last-child { border-bottom: none; }
    .ikon  { font-size: 1.2rem; width: 22px; text-align: center; flex-shrink: 0; padding-top: 1px; }
    .navn  { font-weight: 600; font-size: .93rem; }
    .detalj { font-size: .8rem; margin-top: 2px; }
    .graa  { color: #bbb; }
    .bla   { color: #0055cc; }
    a      { color: #0055cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .spin  { display: inline-block; animation: spin 1.2s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="kort">
    <div class="hdr">
      <h1>Testkjøring ${status.dato}</h1>
      <div class="meta">Startet ${status.startet}${status.avsluttet ? ' · Ferdig ' + status.avsluttet : ''}</div>
    </div>
    ${banner}
    ${rader}
  </div>
</body>
</html>`;
}

const [kommando, testId, ...infoArr] = process.argv.slice(2);
const info = infoArr.join(' ') || undefined;

switch (kommando) {
  case 'init': {
    const status = {
      dato: lesDato(),
      startet: lesTid(),
      tester: TESTER.map(t => ({ id: t.id, navn: t.navn, fil: t.fil, status: 'venter' })),
    };
    skrivOgGenerer(status);
    console.log(HTML_FIL);
    break;
  }

  case 'kjorer': {
    const status = lesStatus();
    const test = status.tester.find(t => t.id === testId);
    if (test) test.status = 'kjorer';
    skrivOgGenerer(status);
    break;
  }

  case 'ferdig': {
    const dato = lesDato();
    const status = lesStatus();
    const meta = TESTER.find(t => t.id === testId);
    const test = status.tester.find(t => t.id === testId);
    if (test) {
      test.status = 'ferdig';
      if (info) test.info = info;
      if (meta?.fil) test.rapport = path.join(RAPPORT_DIR, dato, meta.fil);
    }
    if (status.tester.every(t => t.status === 'ferdig' || t.status === 'feil')) {
      status.avsluttet = lesTid();
    }
    skrivOgGenerer(status);
    break;
  }

  case 'feil': {
    const status = lesStatus();
    const test = status.tester.find(t => t.id === testId);
    if (test) {
      test.status = 'feil';
      if (info) test.info = info;
    }
    skrivOgGenerer(status);
    break;
  }

  default:
    console.error('Bruk: node testkjoring.js init|kjorer|ferdig|feil [testId] [info]');
    process.exit(1);
}
