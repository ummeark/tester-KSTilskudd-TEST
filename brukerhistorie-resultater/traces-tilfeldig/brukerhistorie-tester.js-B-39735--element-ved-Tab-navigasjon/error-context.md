# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brukerhistorie-tester.js >> BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen >> skiplink er første fokuserbare element ved Tab-navigasjon
- Location: brukerhistorie-tester.js:784:3

# Error details

```
Error: Første Tab-stopp bør være en skiplink til #main eller #innhold

expect(received).toMatch(expected)

Expected pattern: /#main|#innhold|#content|#skip/
Received string:  "/"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - navigation "header" [ref=e3]:
      - link "KS Tilskudd" [active] [ref=e4] [cursor=pointer]:
        - /url: /
      - link "Tilskuddsordninger" [ref=e5] [cursor=pointer]:
        - /url: /utlysinger
      - link "Logg inn" [ref=e6] [cursor=pointer]:
        - /url: /minside?statusFilter=utkast
        - img [ref=e7]
        - text: Logg inn
  - main [ref=e11]:
    - generic [ref=e13]:
      - navigation "Du er her:" [ref=e14]:
        - list [ref=e15]:
          - listitem [ref=e16]:
            - link "Hjem" [ref=e17] [cursor=pointer]:
              - /url: /
          - listitem [ref=e18]:
            - link "Tilskuddsordninger" [ref=e19] [cursor=pointer]:
              - /url: /utlysinger
      - generic [ref=e20]:
        - heading "Tilskuddsordninger" [level=1] [ref=e21]
        - paragraph [ref=e22]: Finn tilskuddsordninger ved å søke etter navn, forvalter eller beskrivelse.
      - generic [ref=e24]:
        - searchbox "Søk" [ref=e26]
        - paragraph [ref=e27]: Viser 0 treff
  - contentinfo [ref=e29]:
    - generic [ref=e30]:
      - heading "Om KS Tilskudd" [level=2] [ref=e31]
      - paragraph [ref=e32]: Nasjonal portal for søknad om offentlige tilskudd levert av KS Digital.
      - navigation "footer" [ref=e33]:
        - link "Personvernerklæring" [ref=e34] [cursor=pointer]:
          - /url: "#"
        - link "Tilgjengelighetserklæring" [ref=e35] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e36]: v0.6.3
```

# Test source

```ts
  690 |     await expect(kortEllerIngenTreff.first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  691 |   });
  692 | 
  693 |   // AK-3: Flere ord – utlysninger som inneholder alle eller noen av ordene vises
  694 |   test('AK-3 – flere ord: søk på «barn og unge» gir respons uten feilside', async ({ page }) => {
  695 |     await søk(page, 'barn og unge');
  696 |     const body = await page.textContent('body');
  697 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  698 |   });
  699 | 
  700 |   // AK-4: Ingen treff – tydelig melding forklarer at ingen ordninger matchet
  701 |   test('AK-4 – ingen treff: nonsens-streng viser ingen-treff-melding, ikke feilside', async ({ page }) => {
  702 |     await søk(page, 'xyzabc123nonsens');
  703 |     const body = await page.textContent('body');
  704 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  705 |   });
  706 | 
  707 |   // AK-5: Tomt søkefelt – hele listen over utlysninger vises igjen
  708 |   test('AK-5 – tomt søkefelt: hel utlysningsliste vises igjen', async ({ page }) => {
  709 |     await søk(page, '');
  710 |     await expect(page).toHaveURL(/utlysinger/);
  711 |     const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysig"]');
  712 |     await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  713 |   });
  714 | 
  715 |   // AK-6: Feilstaving håndteres – gjerne med «mente du?»
  716 |   test('AK-6 – feilstaving: feilstavet søkeord håndteres (f.eks. «mente du?»)', async ({ page }, testInfo) => {
  717 |     testInfo.skip(true, 'AK-6 ikke implementert ennå – krever fuzzy søkemotor (TILSK-856 i Utviklingskø)');
  718 |   });
  719 | 
  720 | });
  721 | 
  722 | // ── BR.HIST-1 ─────────────────────────────────────────────────────────────────────
  723 | test.describe('BR.HIST-1: Som søker vil jeg se oversikt over tilskuddsordninger', () => {
  724 | 
  725 |   test('kan navigere til utlysningslisten', async ({ page }) => {
  726 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  727 |     await expect(page).toHaveURL(/utlysinger/);
  728 |   });
  729 | 
  730 |   test('utlysningslisten inneholder minst én ordning', async ({ page }) => {
  731 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  732 |     const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysing"]');
  733 |     await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  734 |   });
  735 | 
  736 |   test('kan klikke seg inn på en utlysning og se detaljer', async ({ page }) => {
  737 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  738 |     const forstelenke = page.locator('a[href*="utlysing"]').first();
  739 |     await expect(forstelenke).toBeVisible({ timeout: SIDE_TIMEOUT });
  740 |     await forstelenke.click();
  741 |     await page.waitForLoadState('domcontentloaded');
  742 |     await expect(page).not.toHaveURL(`${base}/utlysinger`);
  743 |   });
  744 | 
  745 | });
  746 | 
  747 | // ── BR.HIST-4 ─────────────────────────────────────────────────────────────────────
  748 | test.describe('BR.HIST-4: Som søker vil jeg kunne navigere tilbake fra en utlysning', () => {
  749 | 
  750 |   test('tilbake-navigasjon fra utlysning fungerer', async ({ page }) => {
  751 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  752 |     const lenke = page.locator('a[href*="utlysinger/"]').first();
  753 |     const href = await lenke.getAttribute('href');
  754 |     const absoluteHref = href.startsWith('http') ? href : `${base}${href}`;
  755 |     await page.goto(absoluteHref, { waitUntil: 'domcontentloaded', timeout: SIDE_TIMEOUT });
  756 |     await page.goBack({ waitUntil: 'domcontentloaded' });
  757 |     await expect(page).toHaveURL(/utlysinger/);
  758 |   });
  759 | 
  760 |   test('F5-refresh på utlysningslisten beholder siden', async ({ page }) => {
  761 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  762 |     await page.reload({ waitUntil: 'domcontentloaded' });
  763 |     await expect(page).toHaveURL(/utlysinger/);
  764 |     const body = await page.textContent('body');
  765 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  766 |   });
  767 | 
  768 | });
  769 | 
  770 | // ── BR.HIST-5 ─────────────────────────────────────────────────────────────────────
  771 | test.describe('BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen', () => {
  772 | 
  773 |   test('skiplink til hovedinnhold finnes i DOM (WCAG 2.4.1)', async ({ page }) => {
  774 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  775 |     fs.mkdirSync(SKJERMBILDER, { recursive: true });
  776 |     await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-side-uten-skiplink.png` });
  777 |     const skipLenke = page.locator(
  778 |       'a[href="#main"], a[href="#maincontent"], a[href="#main-content"], ' +
  779 |       'a[href="#innhold"], a.skip-link, a[class*="skip"]'
  780 |     ).first();
  781 |     await expect(skipLenke).toBeAttached();
  782 |   });
  783 | 
  784 |   test('skiplink er første fokuserbare element ved Tab-navigasjon', async ({ page }) => {
  785 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  786 |     await page.keyboard.press('Tab');
  787 |     fs.mkdirSync(SKJERMBILDER, { recursive: true });
  788 |     await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-foerste-tab-fokus.png` });
  789 |     const href = await page.locator(':focus').getAttribute('href').catch(() => '');
> 790 |     expect(href, 'Første Tab-stopp bør være en skiplink til #main eller #innhold').toMatch(/#main|#innhold|#content|#skip/);
      |                                                                                    ^ Error: Første Tab-stopp bør være en skiplink til #main eller #innhold
  791 |   });
  792 | 
  793 |   test('søkeskjema er merket med role="search" for skjermlesere', async ({ page }) => {
  794 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  795 |     const searchRegion = page.locator('[role="search"]').first();
  796 |     await expect(searchRegion).toBeVisible({ timeout: SIDE_TIMEOUT });
  797 |   });
  798 | 
  799 | });
  800 | 
  801 | // ── TILSK-697 ────────────────────────────────────────────────────────────────────
  802 | test.describe('TILSK-697: Som søker ønsker jeg å se status på søknaden', () => {
  803 | 
  804 |   const GYLDIGE_STATUSER = ['Utkast', 'Til behandling', 'Gjenåpnet', 'Innvilget', 'Avslått', 'Avsluttet', 'Trukket'];
  805 |   const RAPPORT_STATUSER  = ['Ikke innsendt', 'Påbegynt', 'Innsendt', 'Godkjent'];
  806 | 
  807 |   const STATUS_SEL =
  808 |     '[class*="status"], [class*="badge"], [data-testid*="status"], ' +
  809 |     '[class*="etikett"], [class*="chip"], [class*="tag"]';
  810 | 
  811 |   async function gåTilMinSide(page) {
  812 |     await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
  813 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  814 |   }
  815 | 
  816 |   async function hentSøknadsUrler(page) {
  817 |     await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
  818 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  819 |     const hrefs = await page.locator('a[href*="soknad/"]').evaluateAll(
  820 |       els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
  821 |     );
  822 |     return hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
  823 |   }
  824 | 
  825 |   // AK-1 – gyldige statuser vises
  826 |   test('AK-1 – minst én gyldig søknadsstatus vises på Min side', async ({ page }) => {
  827 |     await gåTilMinSide(page);
  828 |     const body = await page.textContent('body');
  829 |     const harGyldigStatus = GYLDIGE_STATUSER.some(s => body.includes(s));
  830 |     expect(harGyldigStatus, `Forventet minst én av: ${GYLDIGE_STATUSER.join(', ')}`).toBe(true);
  831 |   });
  832 | 
  833 |   test('AK-1 – søknadssiden viser statusbadge', async ({ page }, testInfo) => {
  834 |     const urler = await hentSøknadsUrler(page);
  835 |     testInfo.skip(urler.length === 0, 'Ingen søknader funnet i TEST-miljøet');
  836 |     await page.goto(urler[0], { timeout: IDLE_TIMEOUT });
  837 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  838 |     await expect(page.locator(STATUS_SEL).first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  839 |   });
  840 | 
  841 |   // AK-2 – utkast-siden finnes og laster
  842 |   test('AK-2 – /minside/utkast laster uten feilside', async ({ page }) => {
  843 |     await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
  844 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  845 |     const body = await page.textContent('body');
  846 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  847 |   });
  848 | 
  849 |   test('AK-2 – Min side har en "Utkast"-navigasjon', async ({ page }) => {
  850 |     await gåTilMinSide(page);
  851 |     const utkast = page.locator(
  852 |       'h2:has-text("Utkast"), h3:has-text("Utkast"), a:has-text("Utkast"), [aria-label*="Utkast"]'
  853 |     ).first();
  854 |     await expect(utkast).toBeAttached({ timeout: SIDE_TIMEOUT });
  855 |   });
  856 | 
  857 |   // AK-4 – "Avvist" skal aldri vises, kun "Avslått"
  858 |   test('AK-4 – statusetiketten "Avvist" vises ikke (portalen bruker "Avslått")', async ({ page }) => {
  859 |     await gåTilMinSide(page);
  860 |     const tekster = await page.locator(STATUS_SEL).allTextContents();
  861 |     const harAvvist = tekster.some(t => /^avvist$/i.test(t.trim()));
  862 |     expect(harAvvist, '"Avvist" skal aldri vises – bruk "Avslått"').toBe(false);
  863 |   });
  864 | 
  865 |   // AK-5 – "Slettet" skal ikke vises noe sted
  866 |   test('AK-5 – status "Slettet" vises ikke i noen av listefanene', async ({ page }) => {
  867 |     for (const sti of ['/minside/utkast', '/minside/aktiv', '/minside/avsluttet']) {
  868 |       await page.goto(`${base}${sti}`, { timeout: IDLE_TIMEOUT });
  869 |       await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  870 |       const tekster = await page.locator(STATUS_SEL).allTextContents();
  871 |       const harSlettet = tekster.some(t => /^slettet$/i.test(t.trim()));
  872 |       expect(harSlettet, `"Slettet" skal ikke vises på ${sti}`).toBe(false);
  873 |     }
  874 |   });
  875 | 
  876 |   // AK-6 – tre grupper på Min side
  877 |   test('AK-6 – Min side har gruppen "Utkast"', async ({ page }) => {
  878 |     await gåTilMinSide(page);
  879 |     await expect(
  880 |       page.locator('h2:has-text("Utkast"), h3:has-text("Utkast"), a:has-text("Utkast")').first()
  881 |     ).toBeAttached({ timeout: SIDE_TIMEOUT });
  882 |   });
  883 | 
  884 |   test('AK-6 – Min side har gruppen "Aktive"', async ({ page }) => {
  885 |     await gåTilMinSide(page);
  886 |     await expect(
  887 |       page.locator('h2:has-text("Aktive"), h3:has-text("Aktive"), a:has-text("Aktive")').first()
  888 |     ).toBeAttached({ timeout: SIDE_TIMEOUT });
  889 |   });
  890 | 
```