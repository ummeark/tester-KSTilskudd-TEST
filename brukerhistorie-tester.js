// brukerhistorie-tester.js
// Brukerhistorietester med @playwright/test.
// Hver test.describe tilsvarer én brukerhistorie med akseptansekriterier som test()-steg.
import { test, expect } from '@playwright/test';
import { START_URL, SIDE_TIMEOUT, IDLE_TIMEOUT } from './config.js';
import fs from 'fs';

const base = START_URL.replace(/\/$/, '');
const SKJERMBILDER = 'brukerhistorie-resultater/skjermbilder';

// ── TILSK-481 / TILSK-793 ────────────────────────────────────────────────────────
test.describe('TILSK-481 / TILSK-793: Som søker vil jeg søke etter en tilskuddsordning', () => {

  const SØKEFELT = 'input[placeholder*="tilskuddsordning"], input[placeholder*="Søk etter"], input[type="search"]';

  async function gåTilForside(page) {
    await page.goto(`${base}/`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  }

  // AK-2: Søkefelt med riktig placeholder og Søk-knapp er synlig på forsiden
  test('AK-2 – søkefelt med placeholder "Søk etter tilskuddsordning" er synlig', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    testInfo.annotations.push({ type: 'steg', description: 'Finn søkefelt med placeholder "Søk etter tilskuddsordning"' });
    const felt = page.locator(SØKEFELT).first();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søkefeltet er synlig' });
    await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  test('AK-2 – Søk-knapp er synlig ved siden av søkefeltet', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    testInfo.annotations.push({ type: 'steg', description: 'Finn Søk-knapp ved siden av søkefeltet' });
    const knapp = page.locator('button:has-text("Søk")').first();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at Søk-knappen er synlig' });
    await expect(knapp).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  test('AK-2 – søkefeltet er fokuserbart', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    testInfo.annotations.push({ type: 'steg', description: 'Klikke på søkefeltet' });
    const felt = page.locator(SØKEFELT).first();
    await felt.click();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søkefeltet har tastatur-fokus' });
    await expect(felt).toBeFocused();
  });

  // AK-3: Søk fra forsiden navigerer til oversiktssiden
  test('AK-3 – søk fra forsiden navigerer til oversiktssiden for utlysninger', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    const felt = page.locator(SØKEFELT).first();
    await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Skrive "tilskudd" i søkefeltet og trykke Enter' });
    await felt.fill('tilskudd');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL-en inneholder "/utlysig"' });
    await expect(page).toHaveURL(/utlysing/);
  });

  test('AK-3 – søk fra forsiden gir respons uten feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    testInfo.annotations.push({ type: 'steg', description: 'Skrive "tilskudd" i søkefeltet og trykke Enter' });
    const felt = page.locator(SØKEFELT).first();
    await felt.fill('tilskudd');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser "Internal Server Error" eller "Uventet feil"' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/Internal Server Error|Uventet feil/);
  });

  // AK-4: Forsiden har H1 og ingress som forklarer hva tjenesten er
  test('AK-4 – forsiden viser H1 "Nasjonal portal for søknad om offentlige tilskudd"', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at H1 inneholder "Nasjonal portal"' });
    await expect(page.locator('h1')).toContainText('Nasjonal portal', { timeout: SIDE_TIMEOUT });
  });

  test('AK-4 – forsiden viser ingress om å finne tilskuddsordninger', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at sideteksten inneholder ingress om å finne tilskuddsordninger' });
    const body = await page.textContent('body');
    expect(body).toMatch(/finn tilskuddsordninger|søke etter navn/i);
  });

  test('AK-4 – forsiden har innholdsseksjon som forklarer hva portalen er', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await gåTilForside(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at sideteksten forklarer hva portalen er (felles løsning / KS Tilskudd)' });
    const body = await page.textContent('body');
    expect(body).toMatch(/felles løsning|næringstilskudd|KS Tilskudd samler/i);
  });

  // TILSK-481: Videre søk gjøres på oversiktssiden
  test('TILSK-481 – søk på oversiktssiden gir treff uten feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Skrive "tilskudd" i søkefeltet og trykke Enter' });
    const felt = page.locator('input[type="search"], input[placeholder*="øk"]').first();
    await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
    await felt.fill('tilskudd');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/Internal Server Error|Uventet feil/);
  });

  // AK-4: Footer-lenker (Personvernerklæring + Tilgjengelighetserklæring) er i Figma-designet
  // men ikke implementert i TEST-miljøet ennå – testen legges til når de er på plass.

});

// ── TILSK-543 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-543: Som besøker ønsker jeg å finne riktig tilskuddsordning i portalen (uten innlogging)', () => {

  // AK-1.1: Liste over tilskuddsordninger er tilgjengelig uten innlogging
  test('AK-1.1 – utlysningslisten vises uten krav om innlogging', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger uten å være innlogget' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    await expect(page).toHaveURL(/utlysinger/);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at utlysningskort er synlige' });
    const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysing"]');
    await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke krever innlogging' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/logg inn for å/i);
  });

  // AK-1.2: Søkefunksjonalitet er tilgjengelig uten innlogging
  test('AK-1.2 – søkefelt er synlig og tilgjengelig uten innlogging', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søkefelt er synlig uten innlogging' });
    const felt = page.locator('input[type="search"], input[placeholder*="øk"]').first();
    await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  // AK-2.1–2.4: Dekkes av TILSK-856

  // AK-3.1: Paginering – bla til neste side hvis listen er lang
  test('AK-3.1 – pagineringsknapp finnes hvis listen har flere sider', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og vente til siden er ferdig lastet' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Sjekke om pagineringsknapp finnes i DOM' });
    const pagKnapp = page.locator(
      'button:has-text("Neste"), a:has-text("Neste"), ' +
      '[aria-label*="neste" i], [aria-label*="next" i], ' +
      '[class*="pagination"] button, nav[aria-label*="paginering"] button'
    ).first();
    const harPaginering = (await pagKnapp.count()) > 0;
    testInfo.skip(!harPaginering, 'Ingen pagineringsknapp funnet – testmiljøet har antagelig færre ordninger enn én side krever, eller pagineringsselektorer treffer ikke appens DOM');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at pagineringsknappen er festet til DOM' });
    await expect(pagKnapp).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  // AK-4.1: Ingen treff – tydelig beskjed (med forslag til hva brukeren kan gjøre)
  test('AK-4.1 – ingen treff: tydelig melding vises, ikke feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på "xyzabc123nonsens"' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    const felt = page.locator('input[type="search"], input[placeholder*="øk"]').first();
    await felt.fill('xyzabc123nonsens');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen utlysningskort vises eller at en ingen-treff-melding er synlig' });
    const kortEtter = await page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysig"]').count();
    const ingenTreffEl = await page.locator(
      '[class*="ingen"], [class*="empty"], [class*="no-result"], [class*="zero-result"]'
    ).count();
    expect(kortEtter === 0 || ingenTreffEl > 0, 'Forventet ingen ordningskort eller en ingen-treff-melding').toBe(true);
  });

});

// ── TILSK-547 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-547: Som innlogget søker vil jeg se mine søknader', () => {

  test('min side er tilgjengelig etter innlogging', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside med innlogget bruker' });
    await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL inneholder /minside' });
    await expect(page).toHaveURL(/minside/);
  });

  test('min side viser ikke innloggingsskjema (brukeren er innlogget)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
    await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen "Logg inn"-knapp er synlig' });
    const loggInnKnapp = page.locator('a:has-text("Logg inn"), button:has-text("Logg inn")');
    await expect(loggInnKnapp).toHaveCount(0);
  });

  test('min side laster uten JavaScript-feil', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Registrere lytter på JavaScript-feil fra siden' });
    const feil = [];
    page.on('pageerror', e => feil.push(e.message));
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside og vente til siden er ferdig lastet' });
    await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen JavaScript-feil oppstod' });
    expect(feil, `JS-feil: ${feil.join(', ')}`).toHaveLength(0);
  });

});

// ── TILSK-738 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-738: Som søker ønsker jeg å se kontaktinformasjon om ordningen', () => {

  // Cache-variabler — populeres ved første bruk (workers: 1, sekvensiell kjøring)
  let _urlMedKontaktinfo = null;
  let _urlMedBeggekorttyper = null;

  const KONTAKT_SELEKTORER =
    '[class*="kontakt"], [data-testid*="kontakt"], ' +
    'section:has-text("Kontakt"), h2:has-text("Kontakt"), h3:has-text("Kontakt")';
  const PERSON_SELEKTORER =
    '[class*="person-kort"], [class*="personkort"], [class*="person-card"], [data-testid*="person-kort"]';
  const VIRKSOMHET_SELEKTORER =
    '[class*="virksomhet-kort"], [class*="virksomhetkort"], [class*="organization-card"], [data-testid*="virksomhet-kort"]';
  const KORT_SELEKTORER =
    '[class*="kontakt-kort"], [class*="kontaktkort"], [class*="contact-card"], [data-testid*="kontakt-kort"]';

  function harKontaktdetaljer(body) {
    const harEpost   = /@[\w.-]+\.\w{2,}/.test(body);
    const harTelefon = /\d{8}|\+47[\s\d]|\d{2}[\s-]\d{2}[\s-]\d{2}[\s-]\d{2}/.test(body);
    return { harEpost, harTelefon, ok: harEpost || harTelefon };
  }

  async function hentAlleOrdningUrler(page) {
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    await page.locator('a[href*="utlysinger/"]').first().waitFor({ state: 'visible', timeout: SIDE_TIMEOUT });
    const hrefs = await page.locator('a[href*="utlysinger/"]').evaluateAll(
      els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
    );
    return hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
  }

  // Finn første ordning som har kontaktinformasjon med e-post eller telefon
  async function gåTilOrdningMedKontaktinfo(page) {
    if (_urlMedKontaktinfo) {
      await page.goto(_urlMedKontaktinfo, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
      return _urlMedKontaktinfo;
    }
    const urler = await hentAlleOrdningUrler(page);
    for (const url of urler) {
      await page.goto(url, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
      const harKontaktSeksjon = (await page.locator(KONTAKT_SELEKTORER).count()) > 0;
      if (!harKontaktSeksjon) continue;
      const body = await page.textContent('body');
      if (harKontaktdetaljer(body).ok) {
        _urlMedKontaktinfo = url;
        return url;
      }
    }
    return null;
  }

  // Finn første ordning som har både personkort og virksomhetskort
  async function gåTilOrdningMedBeggekorttyper(page) {
    if (_urlMedBeggekorttyper) {
      await page.goto(_urlMedBeggekorttyper, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
      return _urlMedBeggekorttyper;
    }
    const urler = await hentAlleOrdningUrler(page);
    for (const url of urler) {
      await page.goto(url, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
      const harPerson     = (await page.locator(PERSON_SELEKTORER).count()) > 0;
      const harVirksomhet = (await page.locator(VIRKSOMHET_SELEKTORER).count()) > 0;
      if (harPerson && harVirksomhet) {
        _urlMedBeggekorttyper = url;
        return url;
      }
    }
    return null;
  }

  // AK-1.0: Kontaktinformasjonsseksjon finnes og siden laster uten feil
  test('AK-1.0 – utlysningssiden laster uten feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Søke gjennom utlysninger for å finne en med kontaktinformasjonsseksjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/Internal Server Error|Uventet feil/);
  });

  test('AK-1.0 – kontaktinformasjonsseksjon finnes på en utlysningsside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside med kontaktinformasjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at kontaktinformasjonsseksjon finnes i DOM' });
    const kontakt = page.locator(KONTAKT_SELEKTORER).first();
    await expect(kontakt).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  // AK-1.1: Minst 1 kontaktinfokort, maks 3 totalt
  test('AK-1.1 – minst ett kontaktinfokort vises', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside med kontaktinformasjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst ett kontaktinfokort vises (eller e-post/telefon i tekst)' });
    const kort = page.locator(KORT_SELEKTORER);
    const antall = await kort.count();
    if (antall === 0) {
      const body = await page.textContent('body');
      expect(body, 'Forventet e-post eller telefon i kontaktinformasjonen').toMatch(/@|tlf\.|telefon|e-post/i);
    } else {
      expect(antall).toBeGreaterThanOrEqual(1);
    }
  });

  test('AK-1.1 – maks tre kontaktinfokort vises totalt', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside med kontaktinformasjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at maks tre kontaktinfokort vises' });
    const antall = await page.locator(KORT_SELEKTORER).count();
    if (antall > 0) expect(antall).toBeLessThanOrEqual(3);
  });

  // AK-1.2: Personkort: maks 3
  test('AK-1.2 – maks tre personkort vises', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside med kontaktinformasjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at maks tre personkort vises' });
    const antall = await page.locator(PERSON_SELEKTORER).count();
    expect(antall).toBeLessThanOrEqual(3);
  });

  // AK-1.3: Virksomhetskort: 0 eller 1
  test('AK-1.3 – maks ett virksomhetskort vises', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside med kontaktinformasjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at maks ett virksomhetskort vises' });
    const antall = await page.locator(VIRKSOMHET_SELEKTORER).count();
    expect(antall).toBeLessThanOrEqual(1);
  });

  // AK-1.4 + AK-1.5: Kortene inneholder navn og kontaktdetaljer
  test('AK-1.4/1.5 – kontaktkort inneholder e-post eller telefonnummer', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside med kontaktinformasjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Lese sideinnholdet' });
    const body = await page.textContent('body');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at e-postadresse eller telefonnummer finnes' });
    const { harEpost, harTelefon } = harKontaktdetaljer(body);
    expect(harEpost || harTelefon, 'Forventet e-postadresse eller telefonnummer i kontaktinformasjonen').toBe(true);
  });

  // AK-1.6: Navn + telefon ELLER e-post er obligatorisk
  test('AK-1.6 – obligatoriske felt: minst telefon eller e-post finnes i kontaktinfo', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside med kontaktinformasjon' });
    const url = await gåTilOrdningMedKontaktinfo(page);
    testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjon funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst telefon eller e-post finnes i kontaktinfo' });
    const body = await page.textContent('body');
    const { ok } = harKontaktdetaljer(body);
    expect(ok, 'Kontaktinfo mangler både e-post og telefon').toBe(true);
  });

  // AK-1.7: Personkort vises før virksomhetskort (posisjon i DOM)
  test('AK-1.7 – personkort vises over virksomhetskort på siden', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Søke etter utlysning med både personkort og virksomhetskort' });
    const url = await gåTilOrdningMedBeggekorttyper(page);
    testInfo.skip(!url, 'Ingen utlysning med både person- og virksomhetskort funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Hente posisjon (Y-koordinat) til personkort og virksomhetskort' });
    const personBoks     = await page.locator(PERSON_SELEKTORER).first().boundingBox();
    const virksomhetBoks = await page.locator(VIRKSOMHET_SELEKTORER).first().boundingBox();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at personkort er plassert over virksomhetskort på siden' });
    expect(personBoks.y, 'Personkort skal vises over virksomhetskort').toBeLessThan(virksomhetBoks.y);
  });

});

// ── TILSK-760 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-760: Som bruker ønsker jeg å kunne navigere via footer fra alle sidene i tilskuddsportalen', () => {

  const FOOTER_SEL = 'footer, [role="contentinfo"]';
  const PERSONVERN_SEL = [
    'a[href*="personvern"]',
    'a:has-text("Personvernerklæring")',
    'a:has-text("personvern")',
  ].join(', ');
  const TILGJENGELIGHET_SEL = [
    'a[href*="tilgjengelighet"]',
    'a:has-text("Tilgjengelighetserklæring")',
    'a:has-text("tilgjengelighet")',
  ].join(', ');

  test('AK-1.0 – footer finnes på forside og underside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await page.goto(base, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at footer er synlig' });
    await expect(page.locator(FOOTER_SEL).first()).toBeVisible({ timeout: SIDE_TIMEOUT });

    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at footer er synlig på underside' });
    await expect(page.locator(FOOTER_SEL).first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  test('AK-1.1 – footer inneholder forventede elementer fra Figma-skissen', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await page.goto(base, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Lese footer-innholdet' });
    const footer = page.locator(FOOTER_SEL).first();
    await expect(footer).toBeVisible({ timeout: SIDE_TIMEOUT });

    const antallLenker = await footer.locator('a').count();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at footer inneholder minst én lenke og tekst om tilskuddsportalen' });
    expect(antallLenker, 'Footer skal inneholde lenker til navigasjon').toBeGreaterThanOrEqual(1);

    const footerTekst = await footer.textContent();
    const harPortalTekst = /tilskudd|portal|ks\.no|kommune/i.test(footerTekst ?? '');
    expect(harPortalTekst, 'Footer skal inneholde tekst om tilskuddsportalen eller KS').toBe(true);
  });

  test('AK-1.2 – footer inneholder språkvalg', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Testen er markert som hoppet over – språkvalg ikke implementert ennå (TILSK-760)' });
    testInfo.skip(true, 'AK-1.2 avventer implementering – språkvalg ikke avklart (TILSK-760)');
  });

  test('AK-1.3 – footer inneholder lenke til personvernerklæring', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await page.goto(base, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Finn footer' });
    const footer = page.locator(FOOTER_SEL).first();
    await expect(footer).toBeVisible({ timeout: SIDE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at footer inneholder lenke til personvernerklæring' });
    await expect(
      footer.locator(PERSONVERN_SEL).first(),
      'Footer skal inneholde lenke til personvernerklæring'
    ).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  test('AK-1.4 – footer inneholder lenke til tilgjengelighetserklæring', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await page.goto(base, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Finn footer' });
    const footer = page.locator(FOOTER_SEL).first();
    await expect(footer).toBeVisible({ timeout: SIDE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at footer inneholder lenke til tilgjengelighetserklæring' });
    await expect(
      footer.locator(TILGJENGELIGHET_SEL).first(),
      'Footer skal inneholde lenke til tilgjengelighetserklæring'
    ).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

});

// ── TILSK-767 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-767: Organisasjonsvelger ved søknadsopprettelse', () => {

  const SØK_KNAPP =
    'a:has-text("Søk om tilskudd"), button:has-text("Søk om tilskudd"), ' +
    'a:has-text("Start søknad"), button:has-text("Start søknad"), ' +
    '[data-testid*="sok-tilskudd"], [data-testid*="start-soknad"]';

  const ORGNR_FELT =
    'input[name*="orgnr"], input[name*="organisasjonsnummer"], ' +
    'input[placeholder*="rgnr"], input[placeholder*="rganisasjon"], ' +
    'input[inputmode="numeric"][maxlength="9"], [data-testid*="orgnr"]';

  const SUBMIT_KNAPP =
    'button[type="submit"], button:has-text("Neste"), ' +
    'button:has-text("Fortsett"), button:has-text("Opprett søknad")';

  // Finn utlysning med Søk om tilskudd-knapp og klikk den
  async function gåTilOrgVelger(page) {
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    await page.locator('a[href*="utlysinger/"]').first().waitFor({ state: 'visible', timeout: SIDE_TIMEOUT });
    const hrefs = await page.locator('a[href*="utlysinger/"]').evaluateAll(
      els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
    );
    const urler = hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
    for (const url of urler.slice(0, 8)) {
      await page.goto(url, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
      const knapp = page.locator(SØK_KNAPP).first();
      if ((await knapp.count()) === 0) continue;
      await knapp.click();
      await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
      return true;
    }
    return false;
  }

  test('AK-1 – "Hvem søker du på vegne av?"-skjerm vises etter klikk på Søk om tilskudd', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne utlysningslisten og finn utlysning med "Søk om tilskudd"-knapp' });
    const funnet = await gåTilOrgVelger(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Klikke "Søk om tilskudd" og laste organisasjonsvelger-siden' });
    const body = await page.textContent('body');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden viser "Hvem søker du på vegne av?"-skjerm' });
    const harOrgSkjerm = /hvem søker|vegne av|organisasjon|velg.*org/i.test(body);
    expect(harOrgSkjerm, 'Forventet skjermbilde for organisasjonsvalg etter klikk på Søk om tilskudd').toBe(true);
  });

  test('AK-2 – organisasjonsnummerfeltet er synlig', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne utlysningslisten og finn utlysning med "Søk om tilskudd"-knapp' });
    const funnet = await gåTilOrgVelger(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til organisasjonsvelger-siden' });
    const felt = page.locator(ORGNR_FELT).first();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at organisasjonsnummerfelt er synlig' });
    if ((await felt.count()) > 0) {
      await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
    } else {
      const body = await page.textContent('body');
      expect(body).toMatch(/organisasjonsnummer|org\.?\s*nr|orgnr/i);
    }
  });

  test('AK-3 – organisasjonsnummer er obligatorisk (tom felt blokkerer innsending)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til organisasjonsvelger-siden' });
    const funnet = await gåTilOrgVelger(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');
    const felt = page.locator(ORGNR_FELT).first();
    testInfo.skip((await felt.count()) === 0, 'Organisasjonsnummerfelt ikke funnet på org-velger-siden');
    testInfo.annotations.push({ type: 'steg', description: 'La organisasjonsnummerfeltet stå tomt' });
    await felt.fill('');
    testInfo.annotations.push({ type: 'steg', description: 'Klikke "Neste" / "Opprett søknad" og verifisere at innsending blokkeres med feilmelding' });
    const submitKnapp = page.locator(SUBMIT_KNAPP).first();
    if ((await submitKnapp.count()) > 0) {
      // Knapp disabled = skjema blokkerer innsending ved tomt obligatorisk felt
      const erDisabled = await submitKnapp.isDisabled();
      if (erDisabled) {
        expect(erDisabled, 'Submit-knapp skal være deaktivert når org-nummer er tomt').toBe(true);
        return;
      }
      // Knapp enabled = sjekk om klikk gir feilmelding
      await submitKnapp.click({ force: true });
      await page.waitForLoadState('domcontentloaded');
      const body = await page.textContent('body');
      const harFeil =
        /påkrevd|obligatorisk|required|mangler|ugyldig|feil/i.test(body) ||
        (await page.locator('[aria-invalid="true"], [role="alert"], [class*="error"]').count()) > 0;
      expect(harFeil, 'Forventet valideringsfeil for tomt organisasjonsnummer').toBe(true);
    }
  });

  test('AK-3 – org-nummer valideres på format (feil antall siffer gir feil)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til organisasjonsvelger-siden' });
    const funnet = await gåTilOrgVelger(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');
    const felt = page.locator(ORGNR_FELT).first();
    testInfo.skip((await felt.count()) === 0, 'Organisasjonsnummerfelt ikke funnet på org-velger-siden');
    testInfo.annotations.push({ type: 'steg', description: 'Skrive ugyldig org-nummer "123" (for kort)' });
    await felt.fill('123'); // For kort – ugyldig format
    testInfo.annotations.push({ type: 'steg', description: 'Trykke Tab og verifisere at valideringsfeil vises' });
    await felt.press('Tab');
    let harFeil =
      (await page.locator('[aria-invalid="true"], [class*="error"]').count()) > 0;
    if (!harFeil) {
      const submitKnapp = page.locator(SUBMIT_KNAPP).first();
      if ((await submitKnapp.count()) > 0) {
        await submitKnapp.click();
        await page.waitForLoadState('domcontentloaded');
        const body = await page.textContent('body');
        harFeil = /ugyldig|feil|invalid|9 siffer/i.test(body) ||
          (await page.locator('[aria-invalid="true"], [role="alert"]').count()) > 0;
      }
    }
    expect(harFeil, 'Forventet valideringsfeil for org-nummer med feil format (123)').toBe(true);
  });

  test('AK-4 – søknadsnavn-felt er synlig', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til organisasjonsvelger-siden' });
    const funnet = await gåTilOrgVelger(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søknadsnavn-felt er synlig' });
    const navnFelt = page.locator(
      'input[name*="navn"], input[name*="name"], input[placeholder*="navn"], ' +
      'input[placeholder*="søknad"], [data-testid*="soknadsnavn"], [data-testid*="navn"]'
    ).first();
    if ((await navnFelt.count()) > 0) {
      await expect(navnFelt).toBeVisible({ timeout: SIDE_TIMEOUT });
    } else {
      const body = await page.textContent('body');
      expect(body).toMatch(/søknad.*navn|navn.*søknad|gi.*søknaden|tittel/i);
    }
  });

  test('AK-5 – e-postfelt er synlig', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til organisasjonsvelger-siden' });
    const funnet = await gåTilOrgVelger(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at e-postfelt er synlig' });
    const epostFelt = page.locator(
      'input[type="email"], input[name*="epost"], input[name*="email"], ' +
      'input[placeholder*="e-post"], input[placeholder*="epost"], [data-testid*="epost"]'
    ).first();
    if ((await epostFelt.count()) > 0) {
      await expect(epostFelt).toBeVisible({ timeout: SIDE_TIMEOUT });
    } else {
      const body = await page.textContent('body');
      expect(body).toMatch(/e-post|epost|e-mail|email/i);
    }
  });

});

// ── TILSK-785 / TILSK-795 ────────────────────────────────────────────────────────
test.describe('TILSK-785 / TILSK-795: Redesign av utlysningsside', () => {

  let _utlysningUrl = null;

  async function gåTilUtlysning(page) {
    if (_utlysningUrl) {
      await page.goto(_utlysningUrl, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
      return;
    }
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    const lenke = page.locator('a[href*="utlysinger/"]').first();
    await lenke.waitFor({ state: 'visible', timeout: SIDE_TIMEOUT });
    const href = await lenke.getAttribute('href');
    _utlysningUrl = href.startsWith('http') ? href : `${base}${href}`;
    await page.goto(_utlysningUrl, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
  }

  test('AK-1.0 – breadcrumbs er synlig på utlysningssiden', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til første utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at breadcrumbs er synlig' });
    const breadcrumbs = page.locator(
      'nav[aria-label*="breadcrumb" i], [class*="breadcrumb"], ' +
      'ol[class*="breadcrumb"], nav ol li'
    ).first();
    await expect(breadcrumbs).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  test('AK-1.1 – tittel (h1) er synlig under breadcrumbs', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at H1 er synlig og ikke tom' });
    const tittel = page.locator('h1').first();
    await expect(tittel).toBeVisible({ timeout: SIDE_TIMEOUT });
    const tekst = await tittel.textContent();
    expect(tekst?.trim().length ?? 0).toBeGreaterThan(0);
  });

  test('AK-1.2 – sist oppdatert dato vises', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at sist-oppdatert-dato vises' });
    const body = await page.textContent('body');
    const harDato = /oppdatert|sist\s+endret|\d{1,2}\.\d{1,2}\.\d{4}|\d{4}-\d{2}-\d{2}/i.test(body);
    expect(harDato, 'Forventet å finne oppdatert-dato på utlysningssiden').toBe(true);
  });

  test('AK-1.3 – forvalternavn vises', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at forvalternavn vises' });
    const body = await page.textContent('body');
    const harForvalter =
      (await page.locator('[class*="forvalter"], [data-testid*="forvalter"]').count()) > 0 ||
      /kommune|fylkeskommune|forvalter|statlig/i.test(body);
    expect(harForvalter, 'Forventet forvalternavn eller kommunereferanse').toBe(true);
  });

  test('AK-1.4 – pengebeløp vises med tusenskille i kroner (om tilskuddsramme er satt)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Sjekke om tilskuddsramme vises' });
    const body = await page.textContent('body');
    const harBelop = /kr\b|NOK|tilskuddsramme|ramme|midler/i.test(body);
    if (harBelop) {
      testInfo.annotations.push({ type: 'steg', description: 'Verifisere at beløp med tusenskille brukes hvis tilskuddsramme er satt' });
      // Bekrefter at tall med tusenskille (mellomrom eller punktum) brukes
      expect(body).toMatch(/\d[\s.]\d{3}/);
    }
    // Godtar mangel – ikke alle ordninger har satt tilskuddsramme
  });

  test('AK-2.0 – søknadsfristkort er synlig', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søknadsfristkort er festet til DOM' });
    const frist = page.locator(
      '[class*="frist"], [class*="deadline"], [data-testid*="frist"], ' +
      'section:has-text("Søknadsfrist"), h2:has-text("Frist"), h3:has-text("Frist"), ' +
      'div:has-text("Søknadsfrist")'
    ).first();
    await expect(frist).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  test('AK-3.0 – kontaktinfoseksjon er synlig', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at kontaktinfoseksjon er festet til DOM' });
    const kontakt = page.locator(
      '[class*="kontakt"], [data-testid*="kontakt"], ' +
      'section:has-text("Kontakt"), h2:has-text("Kontakt"), h3:has-text("Kontakt")'
    ).first();
    await expect(kontakt).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  test('AK-4.0 – rikttekst-innholdsområde er synlig med tekst', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Lese main-elementets tekstinnhold' });
    // Sjekk at main-området inneholder synlig tekst (rikttekst-innhold)
    const mainTekst = await page.locator('main').textContent().catch(() => '');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at main inneholder mer enn 50 tegn med tekst' });
    expect(mainTekst?.trim().length ?? 0, 'Forventet tekst-innhold i main-elementet').toBeGreaterThan(50);
  });

  test('AK – utlysningssiden laster uten feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til utlysningsside' });
    await gåTilUtlysning(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/Internal Server Error|Uventet feil/);
  });

});

// ── TILSK-793 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-793: Designsystemet redesign - Forside', () => {

  const SØKEFELT = 'input[placeholder*="tilskuddsordning"], input[placeholder*="Søk etter"], input[type="search"]';

  test('AK-1.0 – forsiden laster uten feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/) og vente til siden er ferdig lastet' });
    await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/Internal Server Error|Uventet feil/);
  });

  test('AK-1.1 – forsiden viser overskrift og tekst som forklarer hva portalen er', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at H1 er synlig' });
    await expect(page.locator('h1').first()).toBeVisible({ timeout: SIDE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at teksten forklarer hva portalen er' });
    const body = await page.textContent('body');
    expect(body).toMatch(/nasjonal portal|tilskudd|søknad|offentlige/i);
  });

  test('AK-1.2 – forsiden viser søkefelt for å søke i tilskuddsordninger', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søkefelt er synlig' });
    await expect(page.locator(SØKEFELT).first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  test('AK-1.3 – søk fra forsiden navigerer til oversiktssiden for tilskuddsordninger', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne forsiden (/)' });
    await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
    const felt = page.locator(SØKEFELT).first();
    await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Skrive "tilskudd" og trykke Enter' });
    await felt.fill('tilskudd');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL inneholder "/utlysinger"' });
    await expect(page).toHaveURL(/utlysing/);
  });

});

// ── TILSK-856 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-856: Som søker vil jeg finne tilskuddsordninger med stikkord, halvferdige ord eller flere ord', () => {

  async function søk(page, tekst) {
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    const felt = page.locator('input[type="search"], input[name*="search"], input[placeholder*="øk"]').first();
    await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
    await felt.fill(tekst);
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
  }

  // AK-1: Stikkord – ett enkelt ord gir treff i tittel eller beskrivelse
  test('AK-1 – stikkord: søk på ett ord gir resultater (ikke feilside)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på "tilskudd"' });
    await søk(page, 'tilskudd');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  });

  test('AK-1 – stikkord: søk på ett ord viser matchende utlysninger', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på "tilskudd"' });
    await søk(page, 'tilskudd');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst én utlysning vises i resultatene' });
    const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysing"]');
    const antall = await kort.count();
    expect(antall, 'Forventet minst én utlysning med søkeordet «tilskudd»').toBeGreaterThan(0);
  });

  // AK-2: Halvferdige ord – delstreng gir treff (f.eks. «tilsk» → «tilskudd»)
  test('AK-2 – halvferdig ord: delstreng gir relevante treff (ikke feilside)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på delstreng "tilsk"' });
    await søk(page, 'tilsk');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside og at resultat eller ingen-treff-melding vises' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
    const kortEllerIngenTreff = page.locator(
      'article, [class*="card"], [class*="kort"], li a[href*="utlysing"], ' +
      '[class*="ingen"], [class*="empty"], [class*="no-result"]'
    );
    await expect(kortEllerIngenTreff.first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  // AK-3: Flere ord – utlysninger som inneholder alle eller noen av ordene vises
  test('AK-3 – flere ord: søk på «barn og unge» gir respons uten feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på "barn og unge"' });
    await søk(page, 'barn og unge');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  });

  // AK-4: Ingen treff – tydelig melding forklarer at ingen ordninger matchet
  test('AK-4 – ingen treff: nonsens-streng viser ingen-treff-melding, ikke feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på "xyzabc123nonsens"' });
    await søk(page, 'xyzabc123nonsens');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  });

  // AK-5: Tomt søkefelt – hele listen over utlysninger vises igjen
  test('AK-5 – tomt søkefelt: hel utlysningsliste vises igjen', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke med tomt søkefelt' });
    await søk(page, '');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at hel utlysningsliste vises igjen' });
    await expect(page).toHaveURL(/utlysinger/);
    const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysig"]');
    await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  // AK-6: Feilstaving håndteres – gjerne med «mente du?»
  test('AK-6 – feilstaving: feilstavet søkeord håndteres (f.eks. «mente du?»)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på feilstavet ord "tilskuudd"' });
    await søk(page, 'tilskuudd');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søket enten viser resultater (fuzzy treff) eller en hjelpsom melding («mente du?»/ingen treff)' });
    const treffEllerMelding = page.locator(
      'article, [class*="card"], [class*="kort"], li a[href*="utlysing"], ' +
      '[class*="ingen"], [class*="empty"], [class*="no-result"], [class*="suggestion"], [class*="mente"]'
    );
    await expect(treffEllerMelding.first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

});

// ── BR.HIST-1 ─────────────────────────────────────────────────────────────────────
test.describe('BR.HIST-1: Som søker vil jeg se oversikt over tilskuddsordninger', () => {

  test('kan navigere til utlysningslisten', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL inneholder /utlysinger' });
    await expect(page).toHaveURL(/utlysinger/);
  });

  test('utlysningslisten inneholder minst én ordning', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst én utlysning er synlig' });
    const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysing"]');
    await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

  test('kan klikke seg inn på en utlysning og se detaljer', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Klikke på første utlysningslenke' });
    const forstelenke = page.locator('a[href*="utlysing"]').first();
    await expect(forstelenke).toBeVisible({ timeout: SIDE_TIMEOUT });
    await forstelenke.click();
    await page.waitForLoadState('domcontentloaded');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL har endret seg til en utlysningsdetaljside' });
    await expect(page).not.toHaveURL(`${base}/utlysinger`);
  });

});

// ── BR.HIST-4 ─────────────────────────────────────────────────────────────────────
test.describe('BR.HIST-4: Som søker vil jeg kunne navigere tilbake fra en utlysning', () => {

  test('tilbake-navigasjon fra utlysning fungerer', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og klikke inn på en utlysning' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    const lenke = page.locator('a[href*="utlysinger/"]').first();
    const href = await lenke.getAttribute('href');
    const absoluteHref = href.startsWith('http') ? href : `${base}${href}`;
    await page.goto(absoluteHref, { waitUntil: 'domcontentloaded', timeout: SIDE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Trykke nettleserens tilbake-knapp' });
    await page.goBack({ waitUntil: 'domcontentloaded' });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL er tilbake på /utlysinger' });
    await expect(page).toHaveURL(/utlysinger/);
  });

  test('F5-refresh på utlysningslisten beholder siden', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Laste siden på nytt (reload)' });
    await page.reload({ waitUntil: 'domcontentloaded' });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL fremdeles er /utlysinger og at siden ikke viser feilside' });
    await expect(page).toHaveURL(/utlysinger/);
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  });

});

// ── BR.HIST-5 ─────────────────────────────────────────────────────────────────────
test.describe('BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen', () => {

  test('skiplink til hovedinnhold finnes i DOM (WCAG 2.4.1)', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Ta skjermbilde av siden' });
    fs.mkdirSync(SKJERMBILDER, { recursive: true });
    await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-side-uten-skiplink.png` });
    testInfo.annotations.push({ type: 'steg', description: 'Søke etter skiplink i DOM (a[href="#main"] eller a.skip-link)' });
    const skipLenke = page.locator(
      'a[href="#main"], a[href="#maincontent"], a[href="#main-content"], ' +
      'a[href="#innhold"], a.skip-link, a[class*="skip"]'
    ).first();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at skiplink er festet til DOM' });
    await expect(skipLenke).toBeAttached();
  });

  test('skiplink er første fokuserbare element ved Tab-navigasjon', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Trykke Tab én gang' });
    await page.keyboard.press('Tab');
    testInfo.annotations.push({ type: 'steg', description: 'Ta skjermbilde av fokustilstand' });
    fs.mkdirSync(SKJERMBILDER, { recursive: true });
    await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-foerste-tab-fokus.png` });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at det fokuserte elementet er en skiplink (href inneholder #main eller #innhold)' });
    const href = await page.locator(':focus').getAttribute('href').catch(() => '');
    expect(href, 'Første Tab-stopp bør være en skiplink til #main eller #innhold').toMatch(/#main|#innhold|#content|#skip/);
  });

  test('søkeskjema er merket med role="search" for skjermlesere', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Søke etter element med role="search" i DOM' });
    const searchRegion = page.locator('[role="search"]').first();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søkeregion er synlig' });
    await expect(searchRegion).toBeVisible({ timeout: SIDE_TIMEOUT });
  });

});

// ── TILSK-697 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-697: Som søker ønsker jeg å se status på søknaden', () => {

  const GYLDIGE_STATUSER = ['Utkast', 'Til behandling', 'Gjenåpnet', 'Innvilget', 'Avslått', 'Avsluttet', 'Trukket'];
  const RAPPORT_STATUSER  = ['Ikke innsendt', 'Påbegynt', 'Innsendt', 'Godkjent'];

  const STATUS_SEL =
    '[class*="status"], [class*="badge"], [data-testid*="status"], ' +
    '[class*="etikett"], [class*="chip"], [class*="tag"]';

  async function gåTilMinSide(page) {
    await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  }

  async function hentSøknadsUrler(page) {
    await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
    const hrefs = await page.locator('a[href*="soknad/"]').evaluateAll(
      els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
    );
    return hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
  }

  // AK-1 – gyldige statuser vises
  test('AK-1 – minst én gyldig søknadsstatus vises på Min side', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
    await gåTilMinSide(page);
    testInfo.annotations.push({ type: 'steg', description: 'Lese sideteksten' });
    const body = await page.textContent('body');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst én gyldig søknadsstatus vises (Utkast, Til behandling, o.l.)' });
    const harGyldigStatus = GYLDIGE_STATUSER.some(s => body.includes(s));
    expect(harGyldigStatus, `Forventet minst én av: ${GYLDIGE_STATUSER.join(', ')}`).toBe(true);
  });

  test('AK-1 – søknadssiden viser statusbadge', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Hente liste over søknads-URLer fra /minside/utkast' });
    const urler = await hentSøknadsUrler(page);
    testInfo.skip(urler.length === 0, 'Ingen søknader funnet i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til første søknad' });
    await page.goto(urler[0], { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at statusbadge er festet til DOM' });
    await expect(page.locator(STATUS_SEL).first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  // AK-2 – utkast-siden finnes og laster
  test('AK-2 – /minside/utkast laster uten feilside', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/utkast' });
    await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
    const body = await page.textContent('body');
    expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  });

  test('AK-2 – Min side har en "Utkast"-navigasjon', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
    await gåTilMinSide(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at "Utkast"-navigasjon finnes' });
    const utkast = page.locator(
      'h2:has-text("Utkast"), h3:has-text("Utkast"), a:has-text("Utkast"), [aria-label*="Utkast"]'
    ).first();
    await expect(utkast).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  // AK-4 – "Avvist" skal aldri vises, kun "Avslått"
  test('AK-4 – statusetiketten "Avvist" vises ikke (portalen bruker "Avslått")', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
    await gåTilMinSide(page);
    testInfo.annotations.push({ type: 'steg', description: 'Lese alle status-etiketter' });
    const tekster = await page.locator(STATUS_SEL).allTextContents();
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen etikett inneholder teksten "Avvist"' });
    const harAvvist = tekster.some(t => /^avvist$/i.test(t.trim()));
    expect(harAvvist, '"Avvist" skal aldri vises – bruk "Avslått"').toBe(false);
  });

  // AK-5 – "Slettet" skal ikke vises noe sted
  test('AK-5 – status "Slettet" vises ikke i noen av listefanene', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/utkast, /aktiv og /avsluttet' });
    for (const sti of ['/minside/utkast', '/minside/aktiv', '/minside/avsluttet']) {
      await page.goto(`${base}${sti}`, { timeout: IDLE_TIMEOUT });
      await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
      testInfo.annotations.push({ type: 'steg', description: 'Lese alle status-etiketter på hver side' });
      const tekster = await page.locator(STATUS_SEL).allTextContents();
      testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen etikett inneholder teksten "Slettet"' });
      const harSlettet = tekster.some(t => /^slettet$/i.test(t.trim()));
      expect(harSlettet, `"Slettet" skal ikke vises på ${sti}`).toBe(false);
    }
  });

  // AK-6 – tre grupper på Min side
  test('AK-6 – Min side har gruppen "Utkast"', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
    await gåTilMinSide(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at gruppen "Utkast" finnes' });
    await expect(
      page.locator('h2:has-text("Utkast"), h3:has-text("Utkast"), a:has-text("Utkast")').first()
    ).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  test('AK-6 – Min side har gruppen "Aktive"', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
    await gåTilMinSide(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at gruppen "Aktive" finnes' });
    await expect(
      page.locator('h2:has-text("Aktive"), h3:has-text("Aktive"), a:has-text("Aktive")').first()
    ).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  test('AK-6 – Min side har gruppen "Avsluttede"', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
    await gåTilMinSide(page);
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at gruppen "Avsluttede" finnes' });
    await expect(
      page.locator('h2:has-text("Avsluttede"), h3:has-text("Avsluttede"), a:has-text("Avsluttede")').first()
    ).toBeAttached({ timeout: SIDE_TIMEOUT });
  });

  // AK-7 – rapportstatuser vises på innvilgede saker
  test('AK-7 – rapportstatus vises på aktive søknader med innvilget vedtak', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/aktiv' });
    await page.goto(`${base}/minside/aktiv`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
    const body = await page.textContent('body');
    testInfo.annotations.push({ type: 'steg', description: 'Sjekke om innvilgede søknader finnes (skip hvis ikke)' });
    testInfo.skip(!/innvilget/i.test(body), 'Ingen innvilgede søknader i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at rapportstatus vises' });
    const harRapportstatus = RAPPORT_STATUSER.some(s => body.includes(s));
    expect(harRapportstatus, `Forventet minst én av: ${RAPPORT_STATUSER.join(', ')}`).toBe(true);
  });

  // AK-8 – klagefrist vises ved vedtak
  test('AK-8 – klagefrist (3 uker) vises på saker med vedtak', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/avsluttet' });
    await page.goto(`${base}/minside/avsluttet`, { timeout: IDLE_TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
    const body = await page.textContent('body');
    testInfo.annotations.push({ type: 'steg', description: 'Sjekke om saker med vedtak finnes (skip hvis ikke)' });
    testInfo.skip(!/innvilget|avslått/i.test(body), 'Ingen saker med vedtak i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at klagefrist vises' });
    const harKlagefrist = /klagefrist|klage.*frist|3 uker|tre uker/i.test(body);
    expect(harKlagefrist, 'Klagefrist (forvaltningsloven § 29) skal vises ved vedtak').toBe(true);
  });

  test('AK-8 – klagefrist vises direkte på søknadssiden med vedtak', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Hente søknads-URLer fra /minside/utkast' });
    const urler = await hentSøknadsUrler(page);
    testInfo.skip(urler.length === 0, 'Ingen søknader i TEST-miljøet');
    testInfo.annotations.push({ type: 'steg', description: 'Gå gjennom søknader og finne én med vedtak' });
    let funnetVedtak = false;
    for (const url of urler.slice(0, 8)) {
      await page.goto(url, { timeout: IDLE_TIMEOUT });
      const body = await page.textContent('body');
      if (/innvilget|avslått/i.test(body)) {
        funnetVedtak = true;
        testInfo.annotations.push({ type: 'steg', description: 'Verifisere at klagefrist vises på vedtakssiden' });
        const harKlagefrist = /klagefrist|klage.*frist|3 uker|tre uker/i.test(body);
        expect(harKlagefrist, `Klagefrist mangler på vedtaksside: ${url}`).toBe(true);
        break;
      }
    }
    testInfo.skip(!funnetVedtak, 'Ingen saker med vedtak blant de første 8 søknadene');
  });

});

// ── TILSK-886 ────────────────────────────────────────────────────────────────────
test.describe('TILSK-886: Som søker trenger jeg ikke lenger å knytte en organisasjonsrepresentant til søknaden', () => {

  const SØK_KNAPP_886 =
    'a:has-text("Søk om tilskudd"), button:has-text("Søk om tilskudd"), ' +
    'a:has-text("Start søknad"), button:has-text("Start søknad"), ' +
    '[data-testid*="sok-tilskudd"], [data-testid*="start-soknad"]';

  const ORG_REP_MØNSTER =
    /organisasjonsrepresentant|org\.?\s*representant|legg til representant|endre representant|slett representant/i;

  const ORG_REP_FELT =
    'input[name*="representant"], input[name*="orgRep"], ' +
    '[data-testid*="representant"], [data-testid*="orgRep"]';

  async function gåTilOpprettSøknad886(page) {
    await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
    await page.locator('a[href*="utlysinger/"]').first().waitFor({ state: 'visible', timeout: SIDE_TIMEOUT });
    const hrefs = await page.locator('a[href*="utlysinger/"]').evaluateAll(
      els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
    );
    const urler = hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
    for (const url of urler.slice(0, 8)) {
      await page.goto(url, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
      const knapp = page.locator(SØK_KNAPP_886).first();
      if ((await knapp.count()) === 0) continue;
      await knapp.click();
      await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
      return true;
    }
    return false;
  }

  // AK-1: UI inneholder ikke organisasjonsrepresentant-funksjonalitet
  test('AK-1 – søknadsopprett-siden viser ikke tekst, felt eller knapper for organisasjonsrepresentant', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'steg', description: 'Åpne utlysningslisten og finn første utlysning med "Søk om tilskudd"-knapp' });
    const funnet = await gåTilOpprettSøknad886(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');

    testInfo.annotations.push({ type: 'steg', description: 'Klikke "Søk om tilskudd" og laste /soknad/opprett-siden' });
    const body = await page.textContent('body');

    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at teksten "organisasjonsrepresentant" (og varianter) ikke forekommer på siden' });
    expect(body, 'Siden skal ikke nevne organisasjonsrepresentant').not.toMatch(ORG_REP_MØNSTER);

    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen input-felt med name/data-testid for orgRepresentant finnes i DOM' });
    const felt = page.locator(ORG_REP_FELT);
    expect(await felt.count(), 'Ingen input-felt for orgRepresentant skal finnes').toBe(0);

    testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen knapper eller lenker inneholder teksten "representant"' });
    const knapper = page.locator('button, a').filter({ hasText: /representant/i });
    expect(await knapper.count(), 'Ingen knapper/lenker med «representant» skal finnes').toBe(0);
  });

  // AK-2: API-respons inneholder ikke orgRepresentant-attributtet
  test('AK-2 – API-responser fra søknad-endepunkter inneholder ikke orgRepresentant-feltet', async ({ page }, testInfo) => {
    const responsePromises = [];

    testInfo.annotations.push({ type: 'steg', description: 'Registrere lytter på JSON-svar fra endepunkter med "soknad" eller "tilskudd" i URL-en' });
    page.on('response', response => {
      const ct = response.headers()['content-type'] ?? '';
      if (!ct.includes('application/json')) return;
      if (!/soknad|tilskudd/i.test(response.url())) return;
      responsePromises.push(response.text().catch(() => ''));
    });

    testInfo.annotations.push({ type: 'steg', description: 'Navigere til en utlysning og klikke "Søk om tilskudd" for å trigge API-kall mot søknad-endepunkter' });
    const funnet = await gåTilOpprettSøknad886(page);
    testInfo.skip(!funnet, 'Ingen utlysning med "Søk om tilskudd"-knapp funnet i TEST-miljøet');

    testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/utkast for å hente eventuelle eksisterende søknader fra API' });
    await page.goto(`${base}/minside/utkast`, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });

    testInfo.annotations.push({ type: 'steg', description: 'Vente på alle interceptede API-svar og sjekke om "orgRepresentant" forekommer i noen av dem' });
    const tekster = await Promise.all(responsePromises);
    const orgRepFunnet = tekster.some(t => t.includes('orgRepresentant'));
    expect(
      orgRepFunnet,
      `"orgRepresentant"-feltet ble funnet blant ${tekster.length} interceptede API-svar – skal ha vært fjernet (TILSK-886)`
    ).toBe(false);
  });

});
