# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brukerhistorie-tester.js >> BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen >> skiplink til hovedinnhold finnes i DOM (WCAG 2.4.1)
- Location: brukerhistorie-tester.js:921:3

# Error details

```
Error: expect(locator).toBeAttached() failed

Locator: locator('a[href="#main"], a[href="#maincontent"], a[href="#main-content"], a[href="#innhold"], a.skip-link, a[class*="skip"]').first()
Expected: attached
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeAttached" with timeout 5000ms
  - waiting for locator('a[href="#main"], a[href="#maincontent"], a[href="#main-content"], a[href="#innhold"], a.skip-link, a[class*="skip"]').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation "header" [ref=e3]:
      - link "KS Tilskudd" [ref=e4] [cursor=pointer]:
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
        - paragraph [ref=e27]: Viser 10 treff
        - list [ref=e28]:
          - listitem [ref=e29]:
            - generic [ref=e30] [cursor=pointer]:
              - heading "Forskning og innovasjon i bedrift" [level=2] [ref=e31]:
                - link "Forskning og innovasjon i bedrift" [ref=e32]:
                  - /url: /utlysinger/553b5d8c-209e-410e-88c6-a6cb79d714dc
              - paragraph [ref=e33]: Formålet med ordningen er å stimulere til at bedrifter gjennom forskning og innovasjon øker sitt verdiskapingspotensial og sin konkurransekraft.Bedrifter som vil ta i bruk forskning for å utvikle nye produkter og løsninger, kan søke.
              - generic [ref=e34]:
                - generic [ref=e35]:
                  - img [ref=e36]
                  - generic [ref=e39]: "Søknadsfrist: Løpende"
                - paragraph [ref=e40]:
                  - img [ref=e41]
                  - generic [ref=e44]: Skånsom Impulsiv Tiger As
          - listitem [ref=e45]:
            - generic [ref=e46] [cursor=pointer]:
              - heading "BIO-midlar 2026" [level=2] [ref=e47]:
                - link "BIO-midlar 2026" [ref=e48]:
                  - /url: /utlysinger/e42eab8a-1512-4dc2-bbf9-40eebcbabcd5
              - paragraph [ref=e49]: Vestland fylkeskommune lyser ut 5 225 000 kroner til bedriftsintern opplæring (BIO) ekstraordinære opplæringstiltak i 2026. I tillegg er det sett av 1,5 millionar kroner til ei særskilt satsing på digital kompetanse.
              - generic [ref=e50]:
                - generic [ref=e51]:
                  - img [ref=e52]
                  - generic [ref=e55]: Søknadsfrist 20. september 2025
                - paragraph [ref=e56]:
                  - img [ref=e57]
                  - generic [ref=e60]: Kjærlig Entusiastisk Tiger As
          - listitem [ref=e61]:
            - generic [ref=e62] [cursor=pointer]:
              - heading "Stimuleringsmidler til internasjonalt samarbeid i Østfold" [level=2] [ref=e63]:
                - link "Stimuleringsmidler til internasjonalt samarbeid i Østfold" [ref=e64]:
                  - /url: /utlysinger/7082abd8-4f23-43e9-adce-c4762b848b81
              - paragraph [ref=e65]: FNs bærekraftmål nummer 17; Sammen for å nå målene, peker på at ingen region eller land kan løse de store samfunnsutfordringene alene. Politisk samarbeid, erfaringsutveksling og prosjektdeltakelse på tvers av landegrenser er en forutsetning for å nå målene og sikre en god og helhetlig samfunnsutvikling.
              - generic [ref=e66]:
                - generic [ref=e67]:
                  - img [ref=e68]
                  - generic [ref=e71]: Søknadsfrist 30. november 2026
                - paragraph [ref=e72]:
                  - img [ref=e73]
                  - generic [ref=e76]: Punktlig Viktig Hund Da
          - listitem [ref=e77]:
            - generic [ref=e78] [cursor=pointer]:
              - heading "Kommunalt næringsfond Kristiansund 2026" [level=2] [ref=e79]:
                - link "Kommunalt næringsfond Kristiansund 2026" [ref=e80]:
                  - /url: /utlysinger/cbc3a2eb-42bd-49db-b2e7-0f66e13a56a0
              - paragraph [ref=e81]: Tiltak som får støtte skal utløse nye arbeidsplasser eller sikre eksisterende. Alle som søker må oppgi hvor mange nye arbeidsplasser tiltaket kan skape, eller bidra til å sikre.
              - generic [ref=e82]:
                - generic [ref=e83]:
                  - img [ref=e84]
                  - generic [ref=e87]: Søknadsfrist 31. august 2026
                - paragraph [ref=e88]:
                  - img [ref=e89]
                  - generic [ref=e92]: Punktlig Viktig Hund Da
          - listitem [ref=e93]:
            - generic [ref=e94] [cursor=pointer]:
              - heading "Arktis 2030" [level=2] [ref=e95]:
                - link "Arktis 2030" [ref=e96]:
                  - /url: /utlysinger/72ad6a5b-3819-446b-881d-eed1d5dd9ed6
              - paragraph [ref=e97]: Utlysning til hovedprosjekter 2026. Troms fylkeskommune, i samarbeid med Nordland og Finnmark fylkeskommuner, lyser ut 80 millioner kroner til hovedprosjekter over tilskuddsordningen Arktis 2030 i 2026. Tilskuddsmidlene er tildelt over statsbudsjettet av Kommunal- og distriktsdepartementet.
              - generic [ref=e98]:
                - generic [ref=e99]:
                  - img [ref=e100]
                  - generic [ref=e103]: Søknadsfrist 10. november 2026
                - paragraph [ref=e104]:
                  - img [ref=e105]
                  - generic [ref=e108]: Vissen Produktiv Fjellrev
          - listitem [ref=e109]:
            - generic [ref=e110] [cursor=pointer]:
              - heading "Grønn omstilling og innovasjon i bedrift" [level=2] [ref=e111]:
                - link "Grønn omstilling og innovasjon i bedrift" [ref=e112]:
                  - /url: /utlysinger/b4d7c9a1-2f65-4e3b-8a91-0c7d6e5f4a33
              - paragraph [ref=e113]: Ordningen skal stimulere bedrifter til å utvikle nye løsninger innen grønn omstilling.
              - generic [ref=e114]:
                - generic [ref=e115]:
                  - img [ref=e116]
                  - generic [ref=e119]: "Søknadsfrist: Løpende"
                - paragraph [ref=e120]:
                  - img [ref=e121]
                  - generic [ref=e124]: Skånsom Impulsiv Tiger As
          - listitem [ref=e125]:
            - generic [ref=e126] [cursor=pointer]:
              - heading "Tilskudd til kulturelle arrangementer og aktiviteter 2026" [level=2] [ref=e127]:
                - link "Tilskudd til kulturelle arrangementer og aktiviteter 2026" [ref=e128]:
                  - /url: /utlysinger/9e3d5f1a-2b4c-4d6e-8f0a-1b2c3d4e5f6a
              - paragraph [ref=e129]: Lillehammer kommune tilbyr tilskudd til kulturelle arrangementer, kunstneriske aktiviteter og kulturelle initiativ som styrker og forener lokalsamfunnet.
              - generic [ref=e130]:
                - generic [ref=e131]:
                  - img [ref=e132]
                  - generic [ref=e135]: Søknadsfrist 31. oktober 2026
                - paragraph [ref=e136]:
                  - img [ref=e137]
                  - generic [ref=e140]: Munter Betydelig Katt Badeand
          - listitem [ref=e141]:
            - generic [ref=e142] [cursor=pointer]:
              - heading "Tilskudd til økologisk jordbruk og kortreist matproduksjon 2026" [level=2] [ref=e143]:
                - link "Tilskudd til økologisk jordbruk og kortreist matproduksjon 2026" [ref=e144]:
                  - /url: /utlysinger/550e8400-e29b-41d4-a716-446655440000
              - paragraph [ref=e145]: Trøndelag fylkeskommune lyser ut midler til jordbruksaktører som ønsker å omstille til økologisk drift eller øke produksjon av lokalt fremstilte matvarer med høy kvalitet.
              - generic [ref=e146]:
                - generic [ref=e147]:
                  - img [ref=e148]
                  - generic [ref=e151]: Søknadsfrist 31. oktober 2026
                - paragraph [ref=e152]:
                  - img [ref=e153]
                  - generic [ref=e156]: Samlet Aritmetisk Fjellrev
          - listitem [ref=e157]:
            - generic [ref=e158] [cursor=pointer]:
              - heading "Tilskudd til kulturell næring og kreative prosjekter 2026" [level=2] [ref=e159]:
                - link "Tilskudd til kulturell næring og kreative prosjekter 2026" [ref=e160]:
                  - /url: /utlysinger/92c4e5d8-1b3a-4c7e-9f2a-8b3c5d6e7f8a
              - paragraph [ref=e161]: Stavanger kommune lyser ut midler til prosjekter som styrker den kulturelle næringen, kunstnerutvikling og kreativ innovasjon i regionen.
              - generic [ref=e162]:
                - generic [ref=e163]:
                  - img [ref=e164]
                  - generic [ref=e167]: Søknadsfrist 30. september 2026
                - paragraph [ref=e168]:
                  - img [ref=e169]
                  - generic [ref=e172]: Autorisert Tørr Fjellrev
          - listitem [ref=e173]:
            - generic [ref=e174] [cursor=pointer]:
              - heading "Tilskudd til grønn omstilling i primærnæringene 2026" [level=2] [ref=e175]:
                - link "Tilskudd til grønn omstilling i primærnæringene 2026" [ref=e176]:
                  - /url: /utlysinger/7c2d9a1e-4f8b-3c6e-9d1a-b5f7e8c2d3a9
              - paragraph [ref=e177]: Innlandet fylkeskommune lyser ut midler til tiltak som fremmer bærekraftig og klimavennlig drift i landbruk, skogbruk og fiskeri. Ordningen skal støtte bedrifter i omstilling mot mer ressurseffektive og miljøvennlige produksjonssystemer.
              - generic [ref=e178]:
                - generic [ref=e179]:
                  - img [ref=e180]
                  - generic [ref=e183]: Søknadsfrist 31. oktober 2026
                - paragraph [ref=e184]:
                  - img [ref=e185]
                  - generic [ref=e188]: Moderne Kulturell Katt Alarm
        - navigation "Bla i sider" [ref=e189]:
          - list [ref=e190]:
            - listitem [ref=e191]:
              - link "Side 1" [ref=e192] [cursor=pointer]:
                - /url: "#side-1"
                - text: "1"
            - listitem [ref=e193]:
              - link "Side 2" [ref=e194] [cursor=pointer]:
                - /url: "#side-2"
                - text: "2"
            - listitem [ref=e195]:
              - link "Side 3" [ref=e196] [cursor=pointer]:
                - /url: "#side-3"
                - text: "3"
            - listitem [ref=e197]:
              - link "Side 4" [ref=e198] [cursor=pointer]:
                - /url: "#side-4"
                - text: "4"
            - listitem [ref=e199]:
              - button "Neste side" [ref=e200] [cursor=pointer]: Neste
  - contentinfo [ref=e201]:
    - generic [ref=e202]:
      - heading "Om KS Tilskudd" [level=2] [ref=e203]
      - paragraph [ref=e204]: Nasjonal portal for søknad om offentlige tilskudd levert av KS Digital.
      - navigation "footer" [ref=e205]:
        - link "Personvernerklæring" [ref=e206] [cursor=pointer]:
          - /url: "#"
        - link "Tilgjengelighetserklæring" [ref=e207] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e208]: v0.8.0
```

# Test source

```ts
  833  |     await søk(page, 'xyzabc123nonsens');
  834  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
  835  |     const body = await page.textContent('body');
  836  |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  837  |   });
  838  | 
  839  |   // AK-5: Tomt søkefelt – hele listen over utlysninger vises igjen
  840  |   test('AK-5 – tomt søkefelt: hel utlysningsliste vises igjen', async ({ page }, testInfo) => {
  841  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke med tomt søkefelt' });
  842  |     await søk(page, '');
  843  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at hel utlysningsliste vises igjen' });
  844  |     await expect(page).toHaveURL(/utlysinger/);
  845  |     const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysig"]');
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
> 933  |     await expect(skipLenke).toBeAttached();
       |                             ^ Error: expect(locator).toBeAttached() failed
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
  946  |     expect(href, 'Første Tab-stopp bør være en skiplink til #main eller #innhold').toMatch(/#main|#innhold|#content|#skip/);
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
```