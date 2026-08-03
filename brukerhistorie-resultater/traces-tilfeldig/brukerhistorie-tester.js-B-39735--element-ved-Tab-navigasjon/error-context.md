# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brukerhistorie-tester.js >> BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen >> skiplink er første fokuserbare element ved Tab-navigasjon
- Location: brukerhistorie-tester.js:945:3

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
      - link "Logg inn" [ref=e5] [cursor=pointer]:
        - /url: /minside
        - img [ref=e6]
        - paragraph [ref=e8]: Logg inn
  - main [ref=e9]:
    - generic [ref=e11]:
      - navigation "Du er her:" [ref=e12]:
        - list [ref=e13]:
          - listitem [ref=e14]:
            - link "Hjem" [ref=e15] [cursor=pointer]:
              - /url: /
          - listitem [ref=e16]:
            - link "Tilskuddsordninger" [ref=e17] [cursor=pointer]:
              - /url: /utlysinger
      - generic [ref=e18]:
        - heading "Tilskuddsordninger" [level=1] [ref=e19]
        - paragraph [ref=e20]: Finn tilskuddsordninger ved å søke etter navn, forvalter eller beskrivelse.
      - generic [ref=e22]:
        - searchbox "Søk" [ref=e24]
        - paragraph [ref=e25]: Viser 0 treff
  - contentinfo [ref=e27]:
    - generic [ref=e28]:
      - heading "Om KS Tilskudd" [level=2] [ref=e29]
      - paragraph [ref=e30]: Nasjonal portal for søknad om offentlige tilskudd levert av KS Digital.
      - navigation "footer" [ref=e31]:
        - link "Personvernerklæring" [ref=e32] [cursor=pointer]:
          - /url: "#"
        - link "Tilgjengelighetserklæring" [ref=e33] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e34]: v0.8.3
```

# Test source

```ts
  855  |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  856  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søket enten viser resultater (fuzzy treff) eller en hjelpsom melding («mente du?»/ingen treff)' });
  857  |     const treffEllerMelding = page.locator(
  858  |       'article, [class*="card"], [class*="kort"], li a[href*="utlysing"], ' +
  859  |       '[class*="ingen"], [class*="empty"], [class*="no-result"], [class*="suggestion"], [class*="mente"]'
  860  |     );
  861  |     await expect(treffEllerMelding.first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  862  |   });
  863  | 
  864  | });
  865  | 
  866  | // ── BR.HIST-1 ─────────────────────────────────────────────────────────────────────
  867  | test.describe('BR.HIST-1: Som søker vil jeg se oversikt over tilskuddsordninger', () => {
  868  | 
  869  |   test('kan navigere til utlysningslisten', async ({ page }, testInfo) => {
  870  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  871  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  872  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL inneholder /utlysinger' });
  873  |     await expect(page).toHaveURL(/utlysinger/);
  874  |   });
  875  | 
  876  |   test('utlysningslisten inneholder minst én ordning', async ({ page }, testInfo) => {
  877  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  878  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  879  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst én utlysning er synlig' });
  880  |     const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysing"]');
  881  |     await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  882  |   });
  883  | 
  884  |   test('kan klikke seg inn på en utlysning og se detaljer', async ({ page }, testInfo) => {
  885  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  886  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  887  |     testInfo.annotations.push({ type: 'steg', description: 'Klikke på første utlysningslenke' });
  888  |     const forstelenke = page.locator('a[href*="utlysing"]').first();
  889  |     await expect(forstelenke).toBeVisible({ timeout: SIDE_TIMEOUT });
  890  |     await forstelenke.click();
  891  |     await page.waitForLoadState('domcontentloaded');
  892  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL har endret seg til en utlysningsdetaljside' });
  893  |     await expect(page).not.toHaveURL(`${base}/utlysinger`);
  894  |   });
  895  | 
  896  | });
  897  | 
  898  | // ── BR.HIST-4 ─────────────────────────────────────────────────────────────────────
  899  | test.describe('BR.HIST-4: Som søker vil jeg kunne navigere tilbake fra en utlysning', () => {
  900  | 
  901  |   test('tilbake-navigasjon fra utlysning fungerer', async ({ page }, testInfo) => {
  902  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og klikke inn på en utlysning' });
  903  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  904  |     const lenke = page.locator('a[href*="utlysinger/"]').first();
  905  |     const href = await lenke.getAttribute('href');
  906  |     const absoluteHref = href.startsWith('http') ? href : `${base}${href}`;
  907  |     await page.goto(absoluteHref, { waitUntil: 'domcontentloaded', timeout: SIDE_TIMEOUT });
  908  |     testInfo.annotations.push({ type: 'steg', description: 'Trykke nettleserens tilbake-knapp' });
  909  |     await page.goBack({ waitUntil: 'domcontentloaded' });
  910  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL er tilbake på /utlysinger' });
  911  |     await expect(page).toHaveURL(/utlysinger/);
  912  |   });
  913  | 
  914  |   test('F5-refresh på utlysningslisten beholder siden', async ({ page }, testInfo) => {
  915  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  916  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  917  |     testInfo.annotations.push({ type: 'steg', description: 'Laste siden på nytt (reload)' });
  918  |     await page.reload({ waitUntil: 'domcontentloaded' });
  919  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL fremdeles er /utlysinger og at siden ikke viser feilside' });
  920  |     await expect(page).toHaveURL(/utlysinger/);
  921  |     const body = await page.textContent('body');
  922  |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  923  |   });
  924  | 
  925  | });
  926  | 
  927  | // ── BR.HIST-5 ─────────────────────────────────────────────────────────────────────
  928  | test.describe('BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen', () => {
  929  | 
  930  |   test('skiplink til hovedinnhold finnes i DOM (WCAG 2.4.1)', async ({ page }, testInfo) => {
  931  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  932  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  933  |     testInfo.annotations.push({ type: 'steg', description: 'Ta skjermbilde av siden' });
  934  |     fs.mkdirSync(SKJERMBILDER, { recursive: true });
  935  |     await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-side-uten-skiplink.png` });
  936  |     testInfo.annotations.push({ type: 'steg', description: 'Søke etter skiplink i DOM (a[href="#main"] eller a.skip-link)' });
  937  |     const skipLenke = page.locator(
  938  |       'a[href="#main"], a[href="#maincontent"], a[href="#main-content"], ' +
  939  |       'a[href="#innhold"], a.skip-link, a[class*="skip"]'
  940  |     ).first();
  941  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at skiplink er festet til DOM' });
  942  |     await expect(skipLenke).toBeAttached();
  943  |   });
  944  | 
  945  |   test('skiplink er første fokuserbare element ved Tab-navigasjon', async ({ page }, testInfo) => {
  946  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  947  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  948  |     testInfo.annotations.push({ type: 'steg', description: 'Trykke Tab én gang' });
  949  |     await page.keyboard.press('Tab');
  950  |     testInfo.annotations.push({ type: 'steg', description: 'Ta skjermbilde av fokustilstand' });
  951  |     fs.mkdirSync(SKJERMBILDER, { recursive: true });
  952  |     await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-foerste-tab-fokus.png` });
  953  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at det fokuserte elementet er en skiplink (href inneholder #main eller #innhold)' });
  954  |     const href = await page.locator(':focus').getAttribute('href').catch(() => '');
> 955  |     expect(href, 'Første Tab-stopp bør være en skiplink til #main eller #innhold').toMatch(/#main|#innhold|#content|#skip/);
       |                                                                                    ^ Error: Første Tab-stopp bør være en skiplink til #main eller #innhold
  956  |   });
  957  | 
  958  |   test('søkeskjema er merket med role="search" for skjermlesere', async ({ page }, testInfo) => {
  959  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  960  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  961  |     testInfo.annotations.push({ type: 'steg', description: 'Søke etter element med role="search" i DOM' });
  962  |     const searchRegion = page.locator('[role="search"]').first();
  963  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søkeregion er synlig' });
  964  |     await expect(searchRegion).toBeVisible({ timeout: SIDE_TIMEOUT });
  965  |   });
  966  | 
  967  | });
  968  | 
  969  | // ── TILSK-697 ────────────────────────────────────────────────────────────────────
  970  | test.describe('TILSK-697: Som søker ønsker jeg å se status på søknaden', () => {
  971  | 
  972  |   const GYLDIGE_STATUSER = ['Utkast', 'Til behandling', 'Gjenåpnet', 'Innvilget', 'Avslått', 'Avsluttet', 'Trukket'];
  973  |   const RAPPORT_STATUSER  = ['Ikke innsendt', 'Påbegynt', 'Innsendt', 'Godkjent'];
  974  | 
  975  |   const STATUS_SEL =
  976  |     '[class*="status"], [class*="badge"], [data-testid*="status"], ' +
  977  |     '[class*="etikett"], [class*="chip"], [class*="tag"]';
  978  | 
  979  |   async function gåTilMinSide(page) {
  980  |     await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
  981  |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  982  |   }
  983  | 
  984  |   async function hentSøknadsUrler(page) {
  985  |     await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
  986  |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  987  |     const hrefs = await page.locator('a[href*="soknad/"]').evaluateAll(
  988  |       els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
  989  |     );
  990  |     return hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
  991  |   }
  992  | 
  993  |   // AK-1 – gyldige statuser vises
  994  |   test('AK-1 – minst én gyldig søknadsstatus vises på Min side', async ({ page }, testInfo) => {
  995  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
  996  |     await gåTilMinSide(page);
  997  |     testInfo.annotations.push({ type: 'steg', description: 'Lese sideteksten' });
  998  |     const body = await page.textContent('body');
  999  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst én gyldig søknadsstatus vises (Utkast, Til behandling, o.l.)' });
  1000 |     const harGyldigStatus = GYLDIGE_STATUSER.some(s => body.includes(s));
  1001 |     expect(harGyldigStatus, `Forventet minst én av: ${GYLDIGE_STATUSER.join(', ')}`).toBe(true);
  1002 |   });
  1003 | 
  1004 |   test('AK-1 – søknadssiden viser statusbadge', async ({ page }, testInfo) => {
  1005 |     testInfo.annotations.push({ type: 'steg', description: 'Hente liste over søknads-URLer fra /minside/utkast' });
  1006 |     const urler = await hentSøknadsUrler(page);
  1007 |     testInfo.skip(urler.length === 0, 'Ingen søknader funnet i TEST-miljøet');
  1008 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til første søknad' });
  1009 |     await page.goto(urler[0], { timeout: IDLE_TIMEOUT });
  1010 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  1011 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at statusbadge er festet til DOM' });
  1012 |     await expect(page.locator(STATUS_SEL).first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  1013 |   });
  1014 | 
  1015 |   // AK-2 – utkast-siden finnes og laster
  1016 |   test('AK-2 – /minside/utkast laster uten feilside', async ({ page }, testInfo) => {
  1017 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/utkast' });
  1018 |     await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
  1019 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  1020 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
  1021 |     const body = await page.textContent('body');
  1022 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  1023 |   });
  1024 | 
  1025 |   test('AK-2 – Min side har en "Utkast"-navigasjon', async ({ page }, testInfo) => {
  1026 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
  1027 |     await gåTilMinSide(page);
  1028 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at "Utkast"-navigasjon finnes' });
  1029 |     const utkast = page.locator(
  1030 |       'h2:has-text("Utkast"), h3:has-text("Utkast"), a:has-text("Utkast"), [aria-label*="Utkast"]'
  1031 |     ).first();
  1032 |     await expect(utkast).toBeAttached({ timeout: SIDE_TIMEOUT });
  1033 |   });
  1034 | 
  1035 |   // AK-4 – "Avvist" skal aldri vises, kun "Avslått"
  1036 |   test('AK-4 – statusetiketten "Avvist" vises ikke (portalen bruker "Avslått")', async ({ page }, testInfo) => {
  1037 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
  1038 |     await gåTilMinSide(page);
  1039 |     testInfo.annotations.push({ type: 'steg', description: 'Lese alle status-etiketter' });
  1040 |     const tekster = await page.locator(STATUS_SEL).allTextContents();
  1041 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen etikett inneholder teksten "Avvist"' });
  1042 |     const harAvvist = tekster.some(t => /^avvist$/i.test(t.trim()));
  1043 |     expect(harAvvist, '"Avvist" skal aldri vises – bruk "Avslått"').toBe(false);
  1044 |   });
  1045 | 
  1046 |   // AK-5 – "Slettet" skal ikke vises noe sted
  1047 |   test('AK-5 – status "Slettet" vises ikke i noen av listefanene', async ({ page }, testInfo) => {
  1048 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/utkast, /aktiv og /avsluttet' });
  1049 |     for (const sti of ['/minside/utkast', '/minside/aktiv', '/minside/avsluttet']) {
  1050 |       await page.goto(`${base}${sti}`, { timeout: IDLE_TIMEOUT });
  1051 |       await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  1052 |       testInfo.annotations.push({ type: 'steg', description: 'Lese alle status-etiketter på hver side' });
  1053 |       const tekster = await page.locator(STATUS_SEL).allTextContents();
  1054 |       testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen etikett inneholder teksten "Slettet"' });
  1055 |       const harSlettet = tekster.some(t => /^slettet$/i.test(t.trim()));
```