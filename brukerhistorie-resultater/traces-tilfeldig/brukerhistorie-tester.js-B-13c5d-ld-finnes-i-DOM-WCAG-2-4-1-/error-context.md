# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brukerhistorie-tester.js >> BR.HIST-5: Som søker med hjelpemiddelteknologi vil jeg hoppe over navigasjonen >> skiplink til hovedinnhold finnes i DOM (WCAG 2.4.1)
- Location: brukerhistorie-tester.js:773:3

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
  681 |   // AK-2: Halvferdige ord – delstreng gir treff (f.eks. «tilsk» → «tilskudd»)
  682 |   test('AK-2 – halvferdig ord: delstreng gir relevante treff (ikke feilside)', async ({ page }) => {
  683 |     await søk(page, 'tilsk');
  684 |     const body = await page.textContent('body');
  685 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  686 |     const kortEllerIngenTreff = page.locator(
  687 |       'article, [class*="card"], [class*="kort"], li a[href*="utlysing"], ' +
  688 |       '[class*="ingen"], [class*="empty"], [class*="no-result"]'
  689 |     );
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
> 781 |     await expect(skipLenke).toBeAttached();
      |                             ^ Error: expect(locator).toBeAttached() failed
  782 |   });
  783 | 
  784 |   test('skiplink er første fokuserbare element ved Tab-navigasjon', async ({ page }) => {
  785 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  786 |     await page.keyboard.press('Tab');
  787 |     fs.mkdirSync(SKJERMBILDER, { recursive: true });
  788 |     await page.screenshot({ path: `${SKJERMBILDER}/BR.HIST-5-foerste-tab-fokus.png` });
  789 |     const href = await page.locator(':focus').getAttribute('href').catch(() => '');
  790 |     expect(href, 'Første Tab-stopp bør være en skiplink til #main eller #innhold').toMatch(/#main|#innhold|#content|#skip/);
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
```