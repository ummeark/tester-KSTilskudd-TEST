# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brukerhistorie-tester.js >> BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen >> skiplink er første fokuserbare element ved Tab-navigasjon
- Location: brukerhistorie-tester.js:936:3

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
        - /url: /minside
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
  - generic [ref=e36]: v0.8.0
```

# Test source

```ts
  846  |     await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  847  |   });
  848  | 
  849  |   // AK-6: Feilstaving håndteres – gjerne med «mente du?»
  850  |   test('AK-6 – feilstaving: feilstavet søkeord håndteres (f.eks. «mente du?»)', async ({ page }, testInfo) => {
  851  |     testInfo.annotations.push({ type: 'steg', description: 'Testen er markert som hoppet over – fuzzy søk ikke implementert ennå (TILSK-856)' });
  852  |     testInfo.skip(true, 'AK-6 ikke implementert ennå – krever fuzzy søkemotor (TILSK-856 i Utviklingskø)');
  853  |   });
  854  | 
  855  | });
  856  | 
  857  | // ── BR.HIST-1 ─────────────────────────────────────────────────────────────────────
  858  | test.describe('BR.HIST-1: Som søker vil jeg se oversikt over tilskuddsordninger', () => {
  859  | 
  860  |   test('kan navigere til utlysningslisten', async ({ page }, testInfo) => {
  861  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  862  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  863  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL inneholder /utlysinger' });
  864  |     await expect(page).toHaveURL(/utlysinger/);
  865  |   });
  866  | 
  867  |   test('utlysningslisten inneholder minst én ordning', async ({ page }, testInfo) => {
  868  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  869  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  870  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst én utlysning er synlig' });
  871  |     const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysing"]');
  872  |     await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  873  |   });
  874  | 
  875  |   test('kan klikke seg inn på en utlysning og se detaljer', async ({ page }, testInfo) => {
  876  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  877  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  878  |     testInfo.annotations.push({ type: 'steg', description: 'Klikke på første utlysningslenke' });
  879  |     const forstelenke = page.locator('a[href*="utlysing"]').first();
  880  |     await expect(forstelenke).toBeVisible({ timeout: SIDE_TIMEOUT });
  881  |     await forstelenke.click();
  882  |     await page.waitForLoadState('domcontentloaded');
  883  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL har endret seg til en utlysningsdetaljside' });
  884  |     await expect(page).not.toHaveURL(`${base}/utlysinger`);
  885  |   });
  886  | 
  887  | });
  888  | 
  889  | // ── BR.HIST-4 ─────────────────────────────────────────────────────────────────────
  890  | test.describe('BR.HIST-4: Som søker vil jeg kunne navigere tilbake fra en utlysning', () => {
  891  | 
  892  |   test('tilbake-navigasjon fra utlysning fungerer', async ({ page }, testInfo) => {
  893  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og klikke inn på en utlysning' });
  894  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  895  |     const lenke = page.locator('a[href*="utlysinger/"]').first();
  896  |     const href = await lenke.getAttribute('href');
  897  |     const absoluteHref = href.startsWith('http') ? href : `${base}${href}`;
  898  |     await page.goto(absoluteHref, { waitUntil: 'domcontentloaded', timeout: SIDE_TIMEOUT });
  899  |     testInfo.annotations.push({ type: 'steg', description: 'Trykke nettleserens tilbake-knapp' });
  900  |     await page.goBack({ waitUntil: 'domcontentloaded' });
  901  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL er tilbake på /utlysinger' });
  902  |     await expect(page).toHaveURL(/utlysinger/);
  903  |   });
  904  | 
  905  |   test('F5-refresh på utlysningslisten beholder siden', async ({ page }, testInfo) => {
  906  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  907  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  908  |     testInfo.annotations.push({ type: 'steg', description: 'Laste siden på nytt (reload)' });
  909  |     await page.reload({ waitUntil: 'domcontentloaded' });
  910  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at URL fremdeles er /utlysinger og at siden ikke viser feilside' });
  911  |     await expect(page).toHaveURL(/utlysinger/);
  912  |     const body = await page.textContent('body');
  913  |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  914  |   });
  915  | 
  916  | });
  917  | 
  918  | // ── BR.HIST-5 ─────────────────────────────────────────────────────────────────────
  919  | test.describe('BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen', () => {
  920  | 
  921  |   test('skiplink til hovedinnhold finnes i DOM (WCAG 2.4.1)', async ({ page }, testInfo) => {
  922  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  923  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  924  |     testInfo.annotations.push({ type: 'steg', description: 'Ta skjermbilde av siden' });
  925  |     fs.mkdirSync(SKJERMBILDER, { recursive: true });
  926  |     await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-side-uten-skiplink.png` });
  927  |     testInfo.annotations.push({ type: 'steg', description: 'Søke etter skiplink i DOM (a[href="#main"] eller a.skip-link)' });
  928  |     const skipLenke = page.locator(
  929  |       'a[href="#main"], a[href="#maincontent"], a[href="#main-content"], ' +
  930  |       'a[href="#innhold"], a.skip-link, a[class*="skip"]'
  931  |     ).first();
  932  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at skiplink er festet til DOM' });
  933  |     await expect(skipLenke).toBeAttached();
  934  |   });
  935  | 
  936  |   test('skiplink er første fokuserbare element ved Tab-navigasjon', async ({ page }, testInfo) => {
  937  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  938  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  939  |     testInfo.annotations.push({ type: 'steg', description: 'Trykke Tab én gang' });
  940  |     await page.keyboard.press('Tab');
  941  |     testInfo.annotations.push({ type: 'steg', description: 'Ta skjermbilde av fokustilstand' });
  942  |     fs.mkdirSync(SKJERMBILDER, { recursive: true });
  943  |     await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-foerste-tab-fokus.png` });
  944  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at det fokuserte elementet er en skiplink (href inneholder #main eller #innhold)' });
  945  |     const href = await page.locator(':focus').getAttribute('href').catch(() => '');
> 946  |     expect(href, 'Første Tab-stopp bør være en skiplink til #main eller #innhold').toMatch(/#main|#innhold|#content|#skip/);
       |                                                                                    ^ Error: Første Tab-stopp bør være en skiplink til #main eller #innhold
  947  |   });
  948  | 
  949  |   test('søkeskjema er merket med role="search" for skjermlesere', async ({ page }, testInfo) => {
  950  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger' });
  951  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  952  |     testInfo.annotations.push({ type: 'steg', description: 'Søke etter element med role="search" i DOM' });
  953  |     const searchRegion = page.locator('[role="search"]').first();
  954  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at søkeregion er synlig' });
  955  |     await expect(searchRegion).toBeVisible({ timeout: SIDE_TIMEOUT });
  956  |   });
  957  | 
  958  | });
  959  | 
  960  | // ── TILSK-697 ────────────────────────────────────────────────────────────────────
  961  | test.describe('TILSK-697: Som søker ønsker jeg å se status på søknaden', () => {
  962  | 
  963  |   const GYLDIGE_STATUSER = ['Utkast', 'Til behandling', 'Gjenåpnet', 'Innvilget', 'Avslått', 'Avsluttet', 'Trukket'];
  964  |   const RAPPORT_STATUSER  = ['Ikke innsendt', 'Påbegynt', 'Innsendt', 'Godkjent'];
  965  | 
  966  |   const STATUS_SEL =
  967  |     '[class*="status"], [class*="badge"], [data-testid*="status"], ' +
  968  |     '[class*="etikett"], [class*="chip"], [class*="tag"]';
  969  | 
  970  |   async function gåTilMinSide(page) {
  971  |     await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
  972  |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  973  |   }
  974  | 
  975  |   async function hentSøknadsUrler(page) {
  976  |     await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
  977  |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  978  |     const hrefs = await page.locator('a[href*="soknad/"]').evaluateAll(
  979  |       els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
  980  |     );
  981  |     return hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
  982  |   }
  983  | 
  984  |   // AK-1 – gyldige statuser vises
  985  |   test('AK-1 – minst én gyldig søknadsstatus vises på Min side', async ({ page }, testInfo) => {
  986  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
  987  |     await gåTilMinSide(page);
  988  |     testInfo.annotations.push({ type: 'steg', description: 'Lese sideteksten' });
  989  |     const body = await page.textContent('body');
  990  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at minst én gyldig søknadsstatus vises (Utkast, Til behandling, o.l.)' });
  991  |     const harGyldigStatus = GYLDIGE_STATUSER.some(s => body.includes(s));
  992  |     expect(harGyldigStatus, `Forventet minst én av: ${GYLDIGE_STATUSER.join(', ')}`).toBe(true);
  993  |   });
  994  | 
  995  |   test('AK-1 – søknadssiden viser statusbadge', async ({ page }, testInfo) => {
  996  |     testInfo.annotations.push({ type: 'steg', description: 'Hente liste over søknads-URLer fra /minside/utkast' });
  997  |     const urler = await hentSøknadsUrler(page);
  998  |     testInfo.skip(urler.length === 0, 'Ingen søknader funnet i TEST-miljøet');
  999  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til første søknad' });
  1000 |     await page.goto(urler[0], { timeout: IDLE_TIMEOUT });
  1001 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  1002 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at statusbadge er festet til DOM' });
  1003 |     await expect(page.locator(STATUS_SEL).first()).toBeAttached({ timeout: SIDE_TIMEOUT });
  1004 |   });
  1005 | 
  1006 |   // AK-2 – utkast-siden finnes og laster
  1007 |   test('AK-2 – /minside/utkast laster uten feilside', async ({ page }, testInfo) => {
  1008 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/utkast' });
  1009 |     await page.goto(`${base}/minside/utkast`, { timeout: IDLE_TIMEOUT });
  1010 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  1011 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
  1012 |     const body = await page.textContent('body');
  1013 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  1014 |   });
  1015 | 
  1016 |   test('AK-2 – Min side har en "Utkast"-navigasjon', async ({ page }, testInfo) => {
  1017 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
  1018 |     await gåTilMinSide(page);
  1019 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at "Utkast"-navigasjon finnes' });
  1020 |     const utkast = page.locator(
  1021 |       'h2:has-text("Utkast"), h3:has-text("Utkast"), a:has-text("Utkast"), [aria-label*="Utkast"]'
  1022 |     ).first();
  1023 |     await expect(utkast).toBeAttached({ timeout: SIDE_TIMEOUT });
  1024 |   });
  1025 | 
  1026 |   // AK-4 – "Avvist" skal aldri vises, kun "Avslått"
  1027 |   test('AK-4 – statusetiketten "Avvist" vises ikke (portalen bruker "Avslått")', async ({ page }, testInfo) => {
  1028 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside' });
  1029 |     await gåTilMinSide(page);
  1030 |     testInfo.annotations.push({ type: 'steg', description: 'Lese alle status-etiketter' });
  1031 |     const tekster = await page.locator(STATUS_SEL).allTextContents();
  1032 |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen etikett inneholder teksten "Avvist"' });
  1033 |     const harAvvist = tekster.some(t => /^avvist$/i.test(t.trim()));
  1034 |     expect(harAvvist, '"Avvist" skal aldri vises – bruk "Avslått"').toBe(false);
  1035 |   });
  1036 | 
  1037 |   // AK-5 – "Slettet" skal ikke vises noe sted
  1038 |   test('AK-5 – status "Slettet" vises ikke i noen av listefanene', async ({ page }, testInfo) => {
  1039 |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /minside/utkast, /aktiv og /avsluttet' });
  1040 |     for (const sti of ['/minside/utkast', '/minside/aktiv', '/minside/avsluttet']) {
  1041 |       await page.goto(`${base}${sti}`, { timeout: IDLE_TIMEOUT });
  1042 |       await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  1043 |       testInfo.annotations.push({ type: 'steg', description: 'Lese alle status-etiketter på hver side' });
  1044 |       const tekster = await page.locator(STATUS_SEL).allTextContents();
  1045 |       testInfo.annotations.push({ type: 'steg', description: 'Verifisere at ingen etikett inneholder teksten "Slettet"' });
  1046 |       const harSlettet = tekster.some(t => /^slettet$/i.test(t.trim()));
```