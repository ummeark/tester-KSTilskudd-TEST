# tilskuddsportal-testverktoy-TEST

Automatiserte tester av **testmiljøet** [tilskudd.fiks.test.ks.no](https://tilskudd.fiks.test.ks.no/) med Playwright og axe-core.

## Testene

| Kommando | Fil | Beskrivelse |
|----------|-----|-------------|
| `npm run rapport` | `uu-tester.js` | WCAG/UU-analyse med axe-core, crawler opptil 20 sider |
| `npm run monkey` | `monkey-tester.js` | Monkey-testing, 60 tilfeldige handlinger |
| `npm run sikkerhet` | `sikkerhet-tester.js` | Sikkerhetstest (hoder, cookies, HTTPS, CORS osv.) |
| `npm run negativ` | `negativ-tester.js` | Negativ testing (ugyldig input, URL-manipulering osv.) |
| `npm run ytelse` | `ytelse-tester.js` | Ytelsesmåling |
| `npm run brukerhistorie` | `brukerhistorie-tester.js` | Brukerhistorietester (fast bruker + tilfeldig bruker) |
| `npm run poc` | `poc-uu-tester.js` | POC UU-test med crawling |
| `npm run arkiv` | `generer-arkiv.js` | Regenerer arkivsiden og kopier rapporter til docs/ |

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
  auth.json                     Innloggingstilstand (fast bruker, gitignorert)
  auth-tilfeldig.json           Innloggingstilstand (tilfeldig bruker, gitignorert)
  brukerhistorie-resultat.json  Resultat fast bruker
  brukerhistorie-resultat-tilfeldig.json  Resultat tilfeldig bruker
  testdata.json                 Testdata hentet fra appens API (fast bruker)
  testdata-tilfeldig.json       Testdata hentet fra appens API (tilfeldig bruker)
  traces/                       Playwright-traces (gitignorert)
  traces-tilfeldig/             Playwright-traces tilfeldig bruker
  skjermbilder/                 Skjermbilder fra feilede tester

docs/                           GitHub Pages (ks-no.github.io/tilskuddsportal-testverktoy-TEST/)
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
  testdata-generator.html       Testdatagenerator
  admin.html                    Adminside for testdataoversikt

testdata/
  generer-testdata.js           Genereringsskript
  tilskudd-testdata.json        Generert output (committes)

lib/
  common.js                     Delte hjelpefunksjoner

poc-resultater/                 POC-testresultater
  poc-sider.json                Crawlede sider
  poc-uu-resultat.json          POC UU-resultater
  traces/                       Playwright-traces (gitignorert)

testverktøy-rapporter/          Rapporter fra test av testverktøy
  YYYY-MM-DD/                   Resultater per dato

test-results/                   Playwright interne testresultater
```

## Teknisk

- **Browser:** Playwright Chromium (headless), installert lokalt i prosjektet
- **UU-analyse:** axe-core via `@axe-core/playwright`
- **Rapporter:** HTML generert direkte fra testfilene, kopieres til `docs/` for GitHub Pages
- **Dato og klokkeslett:** Alle rapporter viser `YYYY-MM-DD HH:MM` i tittel, header, meta og footer
- **Modulformat:** ES modules (`import`/`export`) — ikke CommonJS
- **Miljøvalidering:** `valider-miljø.sh` og pre-commit hook hindrer krysskontaminering mellom TEST og PROD

## Viktig å huske

- Kjør alltid `npm run arkiv` etter at tester er kjørt og rapporter skal publiseres til arkivsiden
- Ikke endre mappenavnet `docs/` — GitHub Pages er konfigurert til å serve derfra
