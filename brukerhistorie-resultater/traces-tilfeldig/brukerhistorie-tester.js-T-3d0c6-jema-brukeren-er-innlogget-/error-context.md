# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brukerhistorie-tester.js >> TILSK-547: Som innlogget søker vil jeg se mine søknader >> min side viser ikke innloggingsskjema (brukeren er innlogget)
- Location: brukerhistorie-tester.js:159:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('a:has-text("Logg inn"), button:has-text("Logg inn")')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('a:has-text("Logg inn"), button:has-text("Logg inn")')
    9 × locator resolved to 1 element
      - unexpected value "1"

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
        - /url: /minside?statusFilter=utkast
        - img [ref=e7]
        - text: Logg inn
  - main [ref=e11]:
    - generic [ref=e13]:
      - heading "Hei, Omsorgsfull Bolle" [level=1] [ref=e15]
      - heading "Dine søknader" [level=2] [ref=e16]
      - navigation [ref=e17]:
        - generic [ref=e18] [cursor=pointer]:
          - img [ref=e19]
          - heading "Utkast" [level=3] [ref=e22]:
            - link "Utkast" [ref=e23]:
              - /url: /minside/utkast
          - paragraph [ref=e24]: Påbegynte søknader
        - generic [ref=e25] [cursor=pointer]:
          - img [ref=e26]
          - heading "Aktive søknader" [level=3] [ref=e29]:
            - link "Aktive søknader" [ref=e30]:
              - /url: /minside/aktiv
          - paragraph [ref=e31]: Søknader du har sendt inn
        - generic [ref=e32] [cursor=pointer]:
          - img [ref=e33]
          - heading "Avsluttede søknader" [level=3] [ref=e36]:
            - link "Avsluttede søknader" [ref=e37]:
              - /url: /minside/avsluttet
          - paragraph [ref=e38]: Søknader som er ferdig behandlet
  - contentinfo [ref=e39]:
    - generic [ref=e40]:
      - heading "Om KS Tilskudd" [level=2] [ref=e41]
      - paragraph [ref=e42]: Nasjonal portal for søknad om offentlige tilskudd levert av KS Digital.
      - navigation "footer" [ref=e43]:
        - link "Personvernerklæring" [ref=e44] [cursor=pointer]:
          - /url: "#"
        - link "Tilgjengelighetserklæring" [ref=e45] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e46]: v0.6.3
```

# Test source

```ts
  62  |   // AK-4: Forsiden har H1 og ingress som forklarer hva tjenesten er
  63  |   test('AK-4 – forsiden viser H1 "Nasjonal portal for søknad om offentlige tilskudd"', async ({ page }) => {
  64  |     await gåTilForside(page);
  65  |     await expect(page.locator('h1')).toContainText('Nasjonal portal', { timeout: SIDE_TIMEOUT });
  66  |   });
  67  | 
  68  |   test('AK-4 – forsiden viser ingress om å finne tilskuddsordninger', async ({ page }) => {
  69  |     await gåTilForside(page);
  70  |     const body = await page.textContent('body');
  71  |     expect(body).toMatch(/finn tilskuddsordninger|søke etter navn/i);
  72  |   });
  73  | 
  74  |   test('AK-4 – forsiden har innholdsseksjon som forklarer hva portalen er', async ({ page }) => {
  75  |     await gåTilForside(page);
  76  |     const body = await page.textContent('body');
  77  |     expect(body).toMatch(/felles løsning|næringstilskudd|KS Tilskudd samler/i);
  78  |   });
  79  | 
  80  |   // TILSK-481: Videre søk gjøres på oversiktssiden
  81  |   test('TILSK-481 – søk på oversiktssiden gir treff uten feilside', async ({ page }) => {
  82  |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  83  |     const felt = page.locator('input[type="search"], input[placeholder*="øk"]').first();
  84  |     await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
  85  |     await felt.fill('tilskudd');
  86  |     await page.keyboard.press('Enter');
  87  |     await page.waitForLoadState('domcontentloaded');
  88  |     const body = await page.textContent('body');
  89  |     expect(body).not.toMatch(/Internal Server Error|Uventet feil/);
  90  |   });
  91  | 
  92  |   // AK-4: Footer-lenker (Personvernerklæring + Tilgjengelighetserklæring) er i Figma-designet
  93  |   // men ikke implementert i TEST-miljøet ennå – testen legges til når de er på plass.
  94  | 
  95  | });
  96  | 
  97  | // ── TILSK-543 ────────────────────────────────────────────────────────────────────
  98  | test.describe('TILSK-543: Som besøker ønsker jeg å finne riktig tilskuddsordning i portalen (uten innlogging)', () => {
  99  | 
  100 |   // AK-1.1: Liste over tilskuddsordninger er tilgjengelig uten innlogging
  101 |   test('AK-1.1 – utlysningslisten vises uten krav om innlogging', async ({ page }) => {
  102 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  103 |     await expect(page).toHaveURL(/utlysinger/);
  104 |     const kort = page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysing"]');
  105 |     await expect(kort.first()).toBeVisible({ timeout: SIDE_TIMEOUT });
  106 |     const body = await page.textContent('body');
  107 |     expect(body).not.toMatch(/logg inn for å/i);
  108 |   });
  109 | 
  110 |   // AK-1.2: Søkefunksjonalitet er tilgjengelig uten innlogging
  111 |   test('AK-1.2 – søkefelt er synlig og tilgjengelig uten innlogging', async ({ page }) => {
  112 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  113 |     const felt = page.locator('input[type="search"], input[placeholder*="øk"]').first();
  114 |     await expect(felt).toBeVisible({ timeout: SIDE_TIMEOUT });
  115 |   });
  116 | 
  117 |   // AK-2.1–2.4: Dekkes av TILSK-856
  118 | 
  119 |   // AK-3.1: Paginering – bla til neste side hvis listen er lang
  120 |   test('AK-3.1 – pagineringsknapp finnes hvis listen har flere sider', async ({ page }, testInfo) => {
  121 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  122 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  123 |     const pagKnapp = page.locator(
  124 |       'button:has-text("Neste"), a:has-text("Neste"), ' +
  125 |       '[aria-label*="neste" i], [aria-label*="next" i], ' +
  126 |       '[class*="pagination"] button, nav[aria-label*="paginering"] button'
  127 |     ).first();
  128 |     const harPaginering = (await pagKnapp.count()) > 0;
  129 |     testInfo.skip(!harPaginering, 'Ingen pagineringsknapp funnet – testmiljøet har antagelig færre ordninger enn én side krever, eller pagineringsselektorer treffer ikke appens DOM');
  130 |     await expect(pagKnapp).toBeAttached({ timeout: SIDE_TIMEOUT });
  131 |   });
  132 | 
  133 |   // AK-4.1: Ingen treff – tydelig beskjed (med forslag til hva brukeren kan gjøre)
  134 |   test('AK-4.1 – ingen treff: tydelig melding vises, ikke feilside', async ({ page }) => {
  135 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  136 |     const felt = page.locator('input[type="search"], input[placeholder*="øk"]').first();
  137 |     await felt.fill('xyzabc123nonsens');
  138 |     await page.keyboard.press('Enter');
  139 |     await page.waitForLoadState('domcontentloaded');
  140 |     const body = await page.textContent('body');
  141 |     expect(body).not.toMatch(/500|Internal Server Error|Uventet feil/);
  142 |     const kortEtter = await page.locator('article, [class*="card"], [class*="kort"], li a[href*="utlysig"]').count();
  143 |     const ingenTreffEl = await page.locator(
  144 |       '[class*="ingen"], [class*="empty"], [class*="no-result"], [class*="zero-result"]'
  145 |     ).count();
  146 |     expect(kortEtter === 0 || ingenTreffEl > 0, 'Forventet ingen ordningskort eller en ingen-treff-melding').toBe(true);
  147 |   });
  148 | 
  149 | });
  150 | 
  151 | // ── TILSK-547 ────────────────────────────────────────────────────────────────────
  152 | test.describe('TILSK-547: Som innlogget søker vil jeg se mine søknader', () => {
  153 | 
  154 |   test('min side er tilgjengelig etter innlogging', async ({ page }) => {
  155 |     await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
  156 |     await expect(page).toHaveURL(/minside/);
  157 |   });
  158 | 
  159 |   test('min side viser ikke innloggingsskjema (brukeren er innlogget)', async ({ page }) => {
  160 |     await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
  161 |     const loggInnKnapp = page.locator('a:has-text("Logg inn"), button:has-text("Logg inn")');
> 162 |     await expect(loggInnKnapp).toHaveCount(0);
      |                                ^ Error: expect(locator).toHaveCount(expected) failed
  163 |   });
  164 | 
  165 |   test('min side laster uten JavaScript-feil', async ({ page }) => {
  166 |     const feil = [];
  167 |     page.on('pageerror', e => feil.push(e.message));
  168 |     await page.goto(`${base}/minside`, { timeout: IDLE_TIMEOUT });
  169 |     await page.waitForLoadState('networkidle', { timeout: IDLE_TIMEOUT });
  170 |     expect(feil, `JS-feil: ${feil.join(', ')}`).toHaveLength(0);
  171 |   });
  172 | 
  173 | });
  174 | 
  175 | // ── TILSK-738 ────────────────────────────────────────────────────────────────────
  176 | test.describe('TILSK-738: Som søker ønsker jeg å se kontaktinformasjon om ordningen', () => {
  177 | 
  178 |   // Cache-variabler — populeres ved første bruk (workers: 1, sekvensiell kjøring)
  179 |   let _urlMedKontaktinfo = null;
  180 |   let _urlMedBeggekorttyper = null;
  181 | 
  182 |   const KONTAKT_SELEKTORER =
  183 |     '[class*="kontakt"], [data-testid*="kontakt"], ' +
  184 |     'section:has-text("Kontakt"), h2:has-text("Kontakt"), h3:has-text("Kontakt")';
  185 |   const PERSON_SELEKTORER =
  186 |     '[class*="person-kort"], [class*="personkort"], [class*="person-card"], [data-testid*="person-kort"]';
  187 |   const VIRKSOMHET_SELEKTORER =
  188 |     '[class*="virksomhet-kort"], [class*="virksomhetkort"], [class*="organization-card"], [data-testid*="virksomhet-kort"]';
  189 |   const KORT_SELEKTORER =
  190 |     '[class*="kontakt-kort"], [class*="kontaktkort"], [class*="contact-card"], [data-testid*="kontakt-kort"]';
  191 | 
  192 |   function harKontaktdetaljer(body) {
  193 |     const harEpost   = /@[\w.-]+\.\w{2,}/.test(body);
  194 |     const harTelefon = /\d{8}|\+47[\s\d]|\d{2}[\s-]\d{2}[\s-]\d{2}[\s-]\d{2}/.test(body);
  195 |     return { harEpost, harTelefon, ok: harEpost || harTelefon };
  196 |   }
  197 | 
  198 |   async function hentAlleOrdningUrler(page) {
  199 |     await page.goto(`${base}/utlysinger`, { timeout: IDLE_TIMEOUT });
  200 |     await page.locator('a[href*="utlysinger/"]').first().waitFor({ state: 'visible', timeout: SIDE_TIMEOUT });
  201 |     const hrefs = await page.locator('a[href*="utlysinger/"]').evaluateAll(
  202 |       els => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
  203 |     );
  204 |     return hrefs.map(h => h.startsWith('http') ? h : `${base}${h}`);
  205 |   }
  206 | 
  207 |   // Finn første ordning som har kontaktinformasjon med e-post eller telefon
  208 |   async function gåTilOrdningMedKontaktinfo(page) {
  209 |     if (_urlMedKontaktinfo) {
  210 |       await page.goto(_urlMedKontaktinfo, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
  211 |       return _urlMedKontaktinfo;
  212 |     }
  213 |     const urler = await hentAlleOrdningUrler(page);
  214 |     for (const url of urler) {
  215 |       await page.goto(url, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
  216 |       const harKontaktSeksjon = (await page.locator(KONTAKT_SELEKTORER).count()) > 0;
  217 |       if (!harKontaktSeksjon) continue;
  218 |       const body = await page.textContent('body');
  219 |       if (harKontaktdetaljer(body).ok) {
  220 |         _urlMedKontaktinfo = url;
  221 |         return url;
  222 |       }
  223 |     }
  224 |     return null;
  225 |   }
  226 | 
  227 |   // Finn første ordning som har både personkort og virksomhetskort
  228 |   async function gåTilOrdningMedBeggekorttyper(page) {
  229 |     if (_urlMedBeggekorttyper) {
  230 |       await page.goto(_urlMedBeggekorttyper, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
  231 |       return _urlMedBeggekorttyper;
  232 |     }
  233 |     const urler = await hentAlleOrdningUrler(page);
  234 |     for (const url of urler) {
  235 |       await page.goto(url, { waitUntil: 'networkidle', timeout: IDLE_TIMEOUT });
  236 |       const harPerson     = (await page.locator(PERSON_SELEKTORER).count()) > 0;
  237 |       const harVirksomhet = (await page.locator(VIRKSOMHET_SELEKTORER).count()) > 0;
  238 |       if (harPerson && harVirksomhet) {
  239 |         _urlMedBeggekorttyper = url;
  240 |         return url;
  241 |       }
  242 |     }
  243 |     return null;
  244 |   }
  245 | 
  246 |   // AK-1.0: Kontaktinformasjonsseksjon finnes og siden laster uten feil
  247 |   test('AK-1.0 – utlysningssiden laster uten feilside', async ({ page }, testInfo) => {
  248 |     const url = await gåTilOrdningMedKontaktinfo(page);
  249 |     testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
  250 |     const body = await page.textContent('body');
  251 |     expect(body).not.toMatch(/Internal Server Error|Uventet feil/);
  252 |   });
  253 | 
  254 |   test('AK-1.0 – kontaktinformasjonsseksjon finnes på en utlysningsside', async ({ page }, testInfo) => {
  255 |     const url = await gåTilOrdningMedKontaktinfo(page);
  256 |     testInfo.skip(!url, 'Ingen utlysning med kontaktinformasjonsseksjon funnet i TEST-miljøet');
  257 |     const kontakt = page.locator(KONTAKT_SELEKTORER).first();
  258 |     await expect(kontakt).toBeAttached({ timeout: SIDE_TIMEOUT });
  259 |   });
  260 | 
  261 |   // AK-1.1: Minst 1 kontaktinfokort, maks 3 totalt
  262 |   test('AK-1.1 – minst ett kontaktinfokort vises', async ({ page }, testInfo) => {
```