# tilskuddsportal-testverktoy-TEST

Automatiserte tester av testmiljøet [tilskudd.fiks.test.ks.no](https://tilskudd.fiks.test.ks.no/) med Playwright og axe-core.

Testene kjøres daglig på hverdager og publiseres til GitHub Pages:
**https://ks-no.github.io/tilskuddsportal-testverktoy-TEST/**

---

## Systemkrav

- **Node.js** v18 eller nyere (testet med v22)
- **macOS** (launchd-automatisering er macOS-spesifikk)
- Internettilgang til tilskudd.fiks.test.ks.no

---

## Kom i gang

```bash
# 1. Klon repoet
git clone https://github.com/ks-no/tilskuddsportal-testverktoy-TEST.git
cd tilskuddsportal-testverktoy-TEST

# 2. Installer avhengigheter (inkludert Playwright Chromium – tar litt tid)
npm install
npx playwright install chromium

# 3. Verifiser at du er i riktig miljø
npm run valider
```

---

## Kjør tester manuelt

```bash
npm run rapport         # WCAG/UU-analyse (axe-core, opptil 20 sider)
npm run monkey          # Monkey-testing (60 tilfeldige handlinger)
npm run sikkerhet       # Sikkerhetstest (hoder, cookies, HTTPS, CORS)
npm run negativ         # Negativ testing (ugyldig input, grenseverdier)
npm run ytelse          # Ytelsesmåling
npm run brukerhistorie  # Brukerhistorietester (fast bruker + tilfeldig bruker)
```

Rapporter genereres i `rapporter/YYYY-MM-DD/` og åpnes i nettleseren automatisk.

Vil du publisere til arkivsiden på GitHub Pages:

```bash
npm run arkiv        # Kopier rapporter til docs/ og regenerer arkivsiden
git add docs/ && git commit -m "Oppdater rapporter" && git push
```

---

## Testdata

Testdatahuben inneholder 40 testordninger (10 fra Excel-fil + 30 deterministisk genererte):

**https://ks-no.github.io/tilskuddsportal-testverktoy-TEST/testdata-hub.html**

For å regenerere testdata:

```bash
npm run testdata     # Regenerer tilskudd-testdata.json og injiser i testdata-hub.html
```

---

## Automatisk kjøring (macOS launchd)

Testene kjøres automatisk på hverdager via én launchd-jobb:

| Jobb | Tidspunkt | Beskrivelse |
|------|-----------|-------------|
| `no.ks.tilskudd-daglig-TEST-vakt.plist` | Hvert 10. min, 08:00–10:50 | Starter alle tester hvis de ikke er kjørt i dag (fanger opp at Mac var avslått) |

Jobben kaller `sjekk-og-kjoer.sh` som hopper over helger og allerede gjennomførte kjøringer.

Logg: `rapporter/kjoring.log`

---

## Mappestruktur

```
rapporter/YYYY-MM-DD/           Genererte rapporter per dato
  uu-rapport.html               UU-rapport
  monkey-rapport.html           Monkey-rapport
  sikkerhet-rapport.html        Sikkerhetsrapport
  negativ-rapport.html          Negativ testrapport
  ytelse-rapport.html           Ytelsesrapport
  brukerhistorie-rapport.html   Brukerhistorierapport
  resultat.json                 UU-resultater (maskinlesbart)
  monkey-resultat.json          Monkey-resultater
  sikkerhet-resultat.json       Sikkerhetsresultater
  negativ-resultat.json         Negative testresultater
  ytelse-resultat.json          Ytelsesresultater
  brukerhistorie-resultat.json  Brukerhistorieresultater
  skjermbilder/                 Skjermbilder fra UU-test
  skjermbilder-monkey/          Skjermbilder fra monkey-test
  skjermbilder-negativ/         Skjermbilder fra negativ test
  skjermbilder-sikkerhet/       Skjermbilder fra sikkerhetstest
  skjermbilder-tilfeldig/       Skjermbilder fra tilfeldig bruker (UU)

brukerhistorie-resultater/      Mellomlagring for brukerhistorietester
  auth.json                     Innloggingstilstand (fast bruker)
  auth-tilfeldig.json           Innloggingstilstand (tilfeldig bruker)
  brukerhistorie-resultat.json  Resultat fast bruker
  brukerhistorie-resultat-tilfeldig.json  Resultat tilfeldig bruker
  testdata.json                 Testdata hentet fra appens API (fast bruker)
  testdata-tilfeldig.json       Testdata hentet fra appens API (tilfeldig bruker)
  traces/                       Playwright-traces (fast bruker)
  traces-tilfeldig/             Playwright-traces (tilfeldig bruker)
  skjermbilder/                 Skjermbilder fra feilede tester

docs/                           GitHub Pages
  rapport.html                  Testdashboard (samlet oversikt)
  uu-rapport.html               Siste UU-rapport
  monkey-rapport.html           Siste monkey-rapport
  sikkerhet-rapport.html        Siste sikkerhetsrapport
  negativ-rapport.html          Siste negativ testrapport
  ytelse-rapport.html           Siste ytelsesrapport
  brukerhistorie-rapport.html   Siste brukerhistorierapport
  arkiv.html                    Arkivside med historikk per testtype
  arkiv/YYYY-MM-DD/             Arkiverte rapporter
  testdata-hub.html             Testdatahub (40 ordninger)
  admin.html                    Adminside for testdataoversikt

testdata/
  generer-testdata.js           Genereringsskript
  tilskudd-testdata.json        Generert output (committes)

lib/
  common.js                     Delte hjelpefunksjoner

poc-resultater/                 POC-testresultater
  poc-sider.json                Crawlede sider
  poc-uu-resultat.json          POC UU-resultater

testverktøy-rapporter/          Rapporter fra test av testverktøy
  YYYY-MM-DD/                   Resultater per dato

test-results/                   Playwright interne testresultater
```

---

## Teknisk

- **Browser:** Playwright Chromium (headless), installert lokalt i prosjektet
- **UU-analyse:** axe-core via `@axe-core/playwright`
- **Modulformat:** ES modules (`import`/`export`) — ikke CommonJS
- **Miljøvalidering:** `valider-miljø.sh` og pre-commit hook hindrer krysskontaminering mellom TEST og PROD

---

## Feilsøking

**Playwright finner ikke Chromium:**
```bash
npx playwright install chromium
```

**`valider-miljø.sh` feiler:**
Sjekk at `START_URL` i testfilene peker på testmiljøet (`tilskudd.fiks.test.ks.no`), ikke produksjon.

**Testene henger eller timer ut:**
Sjekk at tilskudd.fiks.test.ks.no er tilgjengelig:
```bash
curl -I https://tilskudd.fiks.test.ks.no/
```

---

## Claude Code-skills

Testene kan også kjøres direkte fra Claude Code med følgende skills:

**TEST-miljø (tilskudd.fiks.test.ks.no)**

| Skill | Beskrivelse |
|-------|-------------|
| `/kstilskudd-uu-testing` | UU/WCAG-analyse |
| `/kstilskudd-monkey-testing` | Monkey-testing |
| `/kstilskudd-sikkerhet-testing` | Sikkerhetstest |
| `/kstilskudd-negativ-testing` | Negativ testing |
| `/kstilskudd-ytelse-testing` | Ytelsestest |
| `/kstilskudd-brukerhistorie-testing` | Brukerhistorietester |
| `/kstilskudd-alle-tester-TEST` | Alle seks tester + publisering til GitHub Pages |

**PROD-miljø (tilskudd.fiks.ks.no)**

| Skill | Beskrivelse |
|-------|-------------|
| `/kstilskudd-uu-testing-PROD` | UU/WCAG-analyse |
| `/kstilskudd-monkey-testing-PROD` | Monkey-testing |
| `/kstilskudd-sikkerhet-testing-PROD` | Sikkerhetstest |
| `/kstilskudd-negativ-testing-PROD` | Negativ testing |
| `/kstilskudd-ytelse-testing-PROD` | Ytelsestest |
| `/kstilskudd-brukerhistorie-testing-PROD` | Brukerhistorietester |
| `/kstilskudd-alle-tester-PROD` | Alle seks tester + publisering til GitHub Pages |

**Andre**

| Skill | Beskrivelse |
|-------|-------------|
| `/sikkerhet-rapport-cookie-sjekk` | Kun cookie-sjekk mot TEST |
| `/KSTilskudd-test-av-testverktøy-githubpages-TEST` | Test av selve rapportsiden på GitHub Pages |
| `/kstilskudd-bytt-passord` | Bytt passord for innlogging på GitHub Pages-rapportene |

---

Se [CLAUDE.md](./CLAUDE.md) for detaljer beregnet på Claude Code-assistenten.
