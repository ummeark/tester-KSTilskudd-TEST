import path from 'path';
import { SIDE_TIMEOUT } from '../config.js';

/**
 * Logger inn via ID-porten TestID.
 * Returnerer { url, steg } — url er siden man lander på, steg er skjermbildelogg.
 *
 * modus:    'fast'      → fyller inn testFnr
 *           'tilfeldig' → klikker "Hent tilfeldig person"
 * skjermDir → om satt, lagres PNG for hvert steg her (innlogging-steg-N.png)
 */
export async function loggInn(context, startUrl, { modus = 'fast', testFnr = '10895696434', timeout = 20000, skjermDir = null } = {}) {
  const page = await context.newPage();
  const steg = [];
  let bruktFnr = testFnr;

  async function bilde(nr, tittel, beskriv) {
    if (!skjermDir) return;
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    const filnavn = `innlogging-steg-${nr}.png`;
    await page.screenshot({ path: path.join(skjermDir, filnavn) }).catch(() => {});
    steg.push({ nr, tittel, beskriv, fil: `skjermbilder/${filnavn}` });
  }

  try {
    console.log(`\n🔐 Logger inn via ID-porten TestID (modus: ${modus})...`);
    await page.goto(startUrl, { waitUntil: 'domcontentloaded', timeout });

    await bilde(1, 'Applikasjon – ikke innlogget', '«Logg inn»-knappen er synlig. Brukeren klikker den for å starte innloggingsflyten.');

    // Klikk Logg inn-knappen hvis vi ikke allerede er hos ID-porten
    if (!page.url().includes('idporten.no')) {
      const loggInnKnapp = page.locator('a:has-text("Logg inn"), button:has-text("Logg inn")').first();
      if (await loggInnKnapp.count() > 0) {
        await loggInnKnapp.click({ timeout: 8000 });
        await page.waitForLoadState('domcontentloaded', { timeout });
      }
    }

    if (!page.url().includes('idporten.no')) {
      console.log('  ℹ️  Ingen omdirigering til ID-porten – antar allerede innlogget');
      const url = page.url();
      await page.close();
      return { url, steg };
    }

    await bilde(2, 'ID-porten – velg innloggingsmetode', 'ID-porten viser tilgjengelige metoder. Brukeren velger TestID.');

    // Klikk TestID
    await page.locator('a:has-text("TestID"), button:has-text("TestID")').first().click({ timeout: 8000 });
    await page.waitForLoadState('domcontentloaded', { timeout });

    await bilde(3, 'TestID-skjema – tomt', 'Feltet for Personidentifikator (syntetisk) er tomt og klart for innfylling.');

    if (modus === 'tilfeldig') {
      await page.locator('button:has-text("Hent tilfeldig")').first().click({ timeout: 8000 });
      await page.waitForFunction(
        () => { const el = document.querySelector('input[type="text"]'); return el && el.value.length >= 11; },
        { timeout: 8000 }
      );
      const inputFelt = page.locator('input[type="text"], input[name="pid"], input[id="pid"]').first();
      bruktFnr = await inputFelt.inputValue({ timeout: 3000 }).catch(() => 'ukjent');
      await bilde(4, 'Tilfeldig personidentifikator hentet', 'Systemet har fylt inn en tilfeldig syntetisk personidentifikator automatisk.');
    } else {
      const input = page.locator('input[type="text"], input[name="pid"], input[id="pid"]').first();
      await input.clear({ timeout: 5000 });
      await input.fill(testFnr, { timeout: 5000 });
      await bilde(4, `Personidentifikator ${testFnr} fylt inn`, `Fast testpersonidentifikator ${testFnr} er skrevet inn. Klar for å klikke Autentiser.`);
    }

    await page.locator('button:has-text("Autentiser"), input[value="Autentiser"]').first().click({ timeout: 8000 });
    await page.waitForURL(/tilskudd\.fiks\.test\.ks\.no/, { timeout });

    await bilde(5, 'Innlogget – landet på Min side', 'Autentisering vellykket. Brukeren er videresendt tilbake til applikasjonen.');

    const landingsUrl = page.url();
    console.log(`  ✅ Innlogget. Landet på: ${landingsUrl}`);
    await page.close();
    return { url: landingsUrl, steg, bruktFnr };
  } catch (e) {
    const snapFil = `/tmp/idporten-login-feil.png`;
    await page.screenshot({ path: snapFil }).catch(() => {});
    console.log(`  ❌ Innlogging feilet: ${e.message.slice(0, 120)}`);
    console.log(`  📸 Skjermbilde: ${snapFil}`);
    await page.close();
    return { url: null, steg, bruktFnr };
  }
}

/**
 * Henter versjonsnummer fra siden (f.eks. v0.4.3).
 * @param {import('playwright').BrowserContext} ctx
 * @param {string} startUrl
 */
export async function hentVersjon(ctx, startUrl) {
  const p = await ctx.newPage();
  try {
    await p.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: SIDE_TIMEOUT });
    const tekst = await p.evaluate(() => document.body.innerText);
    const match = tekst.match(/v\d+\.\d+\.\d+/);
    return match ? match[0] : null;
  } catch { return null; } finally { await p.close(); }
}

/**
 * Navigerer til URL og returnerer true/false.
 * @param {import('playwright').Page} page
 * @param {string} url
 * @param {number} [timeout]
 */
export async function gåTil(page, url, timeout = SIDE_TIMEOUT) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
    return true;
  } catch { return false; }
}

/**
 * Sjekker om tekst inneholder krasjindikatorer.
 * @param {string} tekst
 */
export function sjekkKrasj(tekst) {
  return ['500', 'internal server error', 'something went wrong', 'uventet feil', 'oops']
    .some(ord => tekst.toLowerCase().includes(ord));
}

/**
 * Sjekker om tekst inneholder feilmeldingsindikatorer.
 * @param {string} tekst
 * @param {string[]} [feilord]
 */
export function sjekkFeilmelding(tekst, feilord = ['feil', 'error', 'ugyldig', 'mangler', 'påkrevd', 'required', 'invalid', 'ikke gyldig', 'ikke tillatt']) {
  const lower = tekst.toLowerCase();
  return feilord.some(ord => lower.includes(ord));
}

/**
 * CSS for testdata-panelet — legg i <style>-blokken i HTML-rapporter.
 */
export const testdataPanelCss = `
/* Testdata-panel – globalt i rapport-header */
.testdata-panel{display:flex;gap:.5rem;flex-wrap:wrap;padding:.65rem 0 .35rem;margin-top:.45rem;border-top:1px solid rgba(0,0,0,.07)}
.td-chip{display:inline-flex;align-items:center;gap:.25rem;background:#f4ecdf;color:#374151;padding:.18rem .65rem;border-radius:100px;font-size:.71rem;font-weight:500;white-space:nowrap}
.td-chip code{font-size:.71rem;font-weight:700;color:#2b3285;background:none;padding:0}
.td-chip.td-tilfeldig{background:#e8f5f0;color:#065f46}
.td-chip.td-tilfeldig code{color:#065f46}`;

/**
 * Genererer én testdata-chip for bruk under tittelen på enkelttest-rader.
 * @param {string|null} fnr Fødselsnummeret som ble brukt
 * @param {boolean} [tilfeldig] true = grønn chip (tilfeldig bruker)
 */
export function brukerChipHtml(fnr, tilfeldig = false) {
  const e = s => String(s ?? '').replace(/&/g, '&amp;');
  const cls = tilfeldig ? 'td-chip td-tilfeldig' : 'td-chip';
  const ikon = tilfeldig ? '🎲' : '🔐';
  return `<span class="${cls}">${ikon} Bruker: <code>${e(fnr ?? '—')}</code></span>`;
}

/**
 * Genererer HTML for testdata-panelet i rapport-headeren.
 * @param {{ bruker?: string, bruker2?: string, viewport?: string|{width:number,height:number}, nettleserVer?: string, versjon?: string }} opts
 */
export function testdataPanelHtml({ bruker, bruker2, viewport, nettleserVer, versjon } = {}) {
  const e = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const chip = (cls, content) => `<span class="td-chip${cls ? ' ' + cls : ''}">${content}</span>`;
  const vpStr = typeof viewport === 'string' ? viewport
    : viewport ? `${viewport.width}×${viewport.height}` : null;
  const chips = [
    chip('', `🔐 Fast bruker: <code>${e(bruker ?? '—')}</code>`),
    bruker2 ? chip('td-tilfeldig', `🎲 Tilfeldig: <code>${e(bruker2)}</code>`) : '',
    vpStr ? chip('', `🖥️ ${e(vpStr)}`) : '',
    nettleserVer ? chip('', `🌐 Chromium ${e(nettleserVer.split('.')[0])}`) : '',
    versjon ? chip('', `📦 ${e(versjon)}`) : '',
  ].filter(Boolean).join('\n    ');
  return `<div class="testdata-panel">\n    ${chips}\n  </div>`;
}
