// brukerhistorie-tilfeldig.setup.js
// Logger inn med tilfeldig TestID-bruker og lagrer auth-tilstand for andre kjøring.
import { chromium } from 'playwright';
import { loggInn } from './lib/common.js';
import fs from 'fs';

const START_URL = process.env.TEST_URL || 'https://tilskudd.fiks.test.ks.no/';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const { url, bruktFnr } = await loggInn(context, START_URL, { modus: 'tilfeldig' });
  if (!url) throw new Error('Innlogging feilet – kan ikke kjøre brukerhistorietester (tilfeldig bruker)');
  fs.mkdirSync('brukerhistorie-resultater', { recursive: true });
  await context.storageState({ path: 'brukerhistorie-resultater/auth-tilfeldig.json' });
  fs.writeFileSync(
    'brukerhistorie-resultater/testdata-tilfeldig.json',
    JSON.stringify({ bruker: bruktFnr ?? 'ukjent' }, null, 2),
  );
  await browser.close();
}
