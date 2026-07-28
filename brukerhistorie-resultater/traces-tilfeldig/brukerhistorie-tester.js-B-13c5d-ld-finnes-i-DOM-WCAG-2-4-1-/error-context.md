# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brukerhistorie-tester.js >> BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen >> skiplink til hovedinnhold finnes i DOM (WCAG 2.4.1)
- Location: brukerhistorie-tester.js:930:3

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
        - paragraph [ref=e25]: Viser 10 treff
        - list [ref=e26]:
          - listitem [ref=e27]:
            - generic [ref=e28] [cursor=pointer]:
              - heading "Forskning og innovasjon i bedrift" [level=2] [ref=e29]:
                - link "Forskning og innovasjon i bedrift" [ref=e30]:
                  - /url: /utlysinger/553b5d8c-209e-410e-88c6-a6cb79d714dc
              - paragraph [ref=e31]: Formålet med ordningen er å stimulere til at bedrifter gjennom forskning og innovasjon øker sitt verdiskapingspotensial og sin konkurransekraft.Bedrifter som vil ta i bruk forskning for å utvikle nye produkter og løsninger, kan søke.
              - generic [ref=e32]:
                - generic [ref=e33]:
                  - img [ref=e34]
                  - generic [ref=e37]: "Søknadsfrist: Løpende"
                - paragraph [ref=e38]:
                  - img [ref=e39]
                  - generic [ref=e42]: Skånsom Impulsiv Tiger As
          - listitem [ref=e43]:
            - generic [ref=e44] [cursor=pointer]:
              - heading "BIO-midlar 2026" [level=2] [ref=e45]:
                - link "BIO-midlar 2026" [ref=e46]:
                  - /url: /utlysinger/e42eab8a-1512-4dc2-bbf9-40eebcbabcd5
              - paragraph [ref=e47]: Vestland fylkeskommune lyser ut 5 225 000 kroner til bedriftsintern opplæring (BIO) ekstraordinære opplæringstiltak i 2026. I tillegg er det sett av 1,5 millionar kroner til ei særskilt satsing på digital kompetanse.
              - generic [ref=e48]:
                - generic [ref=e49]:
                  - img [ref=e50]
                  - generic [ref=e53]: Søknadsfrist 20. september 2025
                - paragraph [ref=e54]:
                  - img [ref=e55]
                  - generic [ref=e58]: Kjærlig Entusiastisk Tiger As
          - listitem [ref=e59]:
            - generic [ref=e60] [cursor=pointer]:
              - heading "Stimuleringsmidler til internasjonalt samarbeid i Østfold" [level=2] [ref=e61]:
                - link "Stimuleringsmidler til internasjonalt samarbeid i Østfold" [ref=e62]:
                  - /url: /utlysinger/7082abd8-4f23-43e9-adce-c4762b848b81
              - paragraph [ref=e63]: FNs bærekraftmål nummer 17; Sammen for å nå målene, peker på at ingen region eller land kan løse de store samfunnsutfordringene alene. Politisk samarbeid, erfaringsutveksling og prosjektdeltakelse på tvers av landegrenser er en forutsetning for å nå målene og sikre en god og helhetlig samfunnsutvikling.
              - generic [ref=e64]:
                - generic [ref=e65]:
                  - img [ref=e66]
                  - generic [ref=e69]: Søknadsfrist 30. november 2026
                - paragraph [ref=e70]:
                  - img [ref=e71]
                  - generic [ref=e74]: Punktlig Viktig Hund Da
          - listitem [ref=e75]:
            - generic [ref=e76] [cursor=pointer]:
              - heading "Kommunalt næringsfond Kristiansund 2026" [level=2] [ref=e77]:
                - link "Kommunalt næringsfond Kristiansund 2026" [ref=e78]:
                  - /url: /utlysinger/cbc3a2eb-42bd-49db-b2e7-0f66e13a56a0
              - paragraph [ref=e79]: Tiltak som får støtte skal utløse nye arbeidsplasser eller sikre eksisterende. Alle som søker må oppgi hvor mange nye arbeidsplasser tiltaket kan skape, eller bidra til å sikre.
              - generic [ref=e80]:
                - generic [ref=e81]:
                  - img [ref=e82]
                  - generic [ref=e85]: Søknadsfrist 31. august 2026
                - paragraph [ref=e86]:
                  - img [ref=e87]
                  - generic [ref=e90]: Punktlig Viktig Hund Da
          - listitem [ref=e91]:
            - generic [ref=e92] [cursor=pointer]:
              - heading "Arktis 2030" [level=2] [ref=e93]:
                - link "Arktis 2030" [ref=e94]:
                  - /url: /utlysinger/72ad6a5b-3819-446b-881d-eed1d5dd9ed6
              - paragraph [ref=e95]: Utlysning til hovedprosjekter 2026. Troms fylkeskommune, i samarbeid med Nordland og Finnmark fylkeskommuner, lyser ut 80 millioner kroner til hovedprosjekter over tilskuddsordningen Arktis 2030 i 2026. Tilskuddsmidlene er tildelt over statsbudsjettet av Kommunal- og distriktsdepartementet.
              - generic [ref=e96]:
                - generic [ref=e97]:
                  - img [ref=e98]
                  - generic [ref=e101]: Søknadsfrist 10. november 2026
                - paragraph [ref=e102]:
                  - img [ref=e103]
                  - generic [ref=e106]: Vissen Produktiv Fjellrev
          - listitem [ref=e107]:
            - generic [ref=e108] [cursor=pointer]:
              - heading "Grønn omstilling og innovasjon i bedrift" [level=2] [ref=e109]:
                - link "Grønn omstilling og innovasjon i bedrift" [ref=e110]:
                  - /url: /utlysinger/b4d7c9a1-2f65-4e3b-8a91-0c7d6e5f4a33
              - paragraph [ref=e111]: Ordningen skal stimulere bedrifter til å utvikle nye løsninger innen grønn omstilling.
              - generic [ref=e112]:
                - generic [ref=e113]:
                  - img [ref=e114]
                  - generic [ref=e117]: "Søknadsfrist: Løpende"
                - paragraph [ref=e118]:
                  - img [ref=e119]
                  - generic [ref=e122]: Skånsom Impulsiv Tiger As
          - listitem [ref=e123]:
            - generic [ref=e124] [cursor=pointer]:
              - heading "Tilskudd til kulturelle arrangementer og aktiviteter 2026" [level=2] [ref=e125]:
                - link "Tilskudd til kulturelle arrangementer og aktiviteter 2026" [ref=e126]:
                  - /url: /utlysinger/9e3d5f1a-2b4c-4d6e-8f0a-1b2c3d4e5f6a
              - paragraph [ref=e127]: Lillehammer kommune tilbyr tilskudd til kulturelle arrangementer, kunstneriske aktiviteter og kulturelle initiativ som styrker og forener lokalsamfunnet.
              - generic [ref=e128]:
                - generic [ref=e129]:
                  - img [ref=e130]
                  - generic [ref=e133]: Søknadsfrist 31. oktober 2026
                - paragraph [ref=e134]:
                  - img [ref=e135]
                  - generic [ref=e138]: Munter Betydelig Katt Badeand
          - listitem [ref=e139]:
            - generic [ref=e140] [cursor=pointer]:
              - heading "Tilskudd til økologisk jordbruk og kortreist matproduksjon 2026" [level=2] [ref=e141]:
                - link "Tilskudd til økologisk jordbruk og kortreist matproduksjon 2026" [ref=e142]:
                  - /url: /utlysinger/550e8400-e29b-41d4-a716-446655440000
              - paragraph [ref=e143]: Trøndelag fylkeskommune lyser ut midler til jordbruksaktører som ønsker å omstille til økologisk drift eller øke produksjon av lokalt fremstilte matvarer med høy kvalitet.
              - generic [ref=e144]:
                - generic [ref=e145]:
                  - img [ref=e146]
                  - generic [ref=e149]: Søknadsfrist 31. oktober 2026
                - paragraph [ref=e150]:
                  - img [ref=e151]
                  - generic [ref=e154]: Samlet Aritmetisk Fjellrev
          - listitem [ref=e155]:
            - generic [ref=e156] [cursor=pointer]:
              - heading "Tilskudd til kulturell næring og kreative prosjekter 2026" [level=2] [ref=e157]:
                - link "Tilskudd til kulturell næring og kreative prosjekter 2026" [ref=e158]:
                  - /url: /utlysinger/92c4e5d8-1b3a-4c7e-9f2a-8b3c5d6e7f8a
              - paragraph [ref=e159]: Stavanger kommune lyser ut midler til prosjekter som styrker den kulturelle næringen, kunstnerutvikling og kreativ innovasjon i regionen.
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - img [ref=e162]
                  - generic [ref=e165]: Søknadsfrist 30. september 2026
                - paragraph [ref=e166]:
                  - img [ref=e167]
                  - generic [ref=e170]: Autorisert Tørr Fjellrev
          - listitem [ref=e171]:
            - generic [ref=e172] [cursor=pointer]:
              - heading "Tilskudd til grønn omstilling i primærnæringene 2026" [level=2] [ref=e173]:
                - link "Tilskudd til grønn omstilling i primærnæringene 2026" [ref=e174]:
                  - /url: /utlysinger/7c2d9a1e-4f8b-3c6e-9d1a-b5f7e8c2d3a9
              - paragraph [ref=e175]: Innlandet fylkeskommune lyser ut midler til tiltak som fremmer bærekraftig og klimavennlig drift i landbruk, skogbruk og fiskeri. Ordningen skal støtte bedrifter i omstilling mot mer ressurseffektive og miljøvennlige produksjonssystemer.
              - generic [ref=e176]:
                - generic [ref=e177]:
                  - img [ref=e178]
                  - generic [ref=e181]: Søknadsfrist 31. oktober 2026
                - paragraph [ref=e182]:
                  - img [ref=e183]
                  - generic [ref=e186]: Moderne Kulturell Katt Alarm
        - navigation "Bla i sider" [ref=e187]:
          - list [ref=e188]:
            - listitem [ref=e189]:
              - link "Side 1" [ref=e190] [cursor=pointer]:
                - /url: "#side-1"
                - text: "1"
            - listitem [ref=e191]:
              - link "Side 2" [ref=e192] [cursor=pointer]:
                - /url: "#side-2"
                - text: "2"
            - listitem [ref=e193]:
              - link "Side 3" [ref=e194] [cursor=pointer]:
                - /url: "#side-3"
                - text: "3"
            - listitem [ref=e195]:
              - link "Side 4" [ref=e196] [cursor=pointer]:
                - /url: "#side-4"
                - text: "4"
            - listitem [ref=e197]:
              - button "Neste side" [ref=e198] [cursor=pointer]: Neste
  - contentinfo [ref=e199]:
    - generic [ref=e200]:
      - heading "Om KS Tilskudd" [level=2] [ref=e201]
      - paragraph [ref=e202]: Nasjonal portal for søknad om offentlige tilskudd levert av KS Digital.
      - navigation "footer" [ref=e203]:
        - link "Personvernerklæring" [ref=e204] [cursor=pointer]:
          - /url: "#"
        - link "Tilgjengelighetserklæring" [ref=e205] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e206]: v0.8.2
```

# Test source

```ts
  842  |     await søk(page, '');
  843  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at hel utlysningsliste vises igjen' });
  844  |     await expect(page).toHaveURL(/utlysinger/);
  845  |     const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysig"]');
  846  |     await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  847  |   });
  848  | 
  849  |   // AK-6: Feilstaving håndteres – gjerne med «mente du?»
  850  |   test('AK-6 – feilstaving: feilstavet søkeord håndteres (f.eks. «mente du?»)', async ({ page }, testInfo) => {
  851  |     testInfo.annotations.push({ type: 'steg', description: 'Navigere til /utlysinger og søke på feilstavet ord "tilskuudd"' });
  852  |     await søk(page, 'tilskuudd');
  853  |     testInfo.annotations.push({ type: 'steg', description: 'Verifisere at siden ikke viser feilside' });
  854  |     const body = await page.textContent('body');
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
> 942  |     await expect(skipLenke).toBeAttached();
       |                             ^ Error: expect(locator).toBeAttached() failed
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
  955  |     expect(href, 'Første Tab-stopp bør være en skiplink til #main eller #innhold').toMatch(/#main|#innhold|#content|#skip/);
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
```