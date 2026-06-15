// brukerhistorie-tilfeldig.playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './brukerhistorie-tilfeldig.setup.js',
  testMatch: 'brukerhistorie-tester.js',
  outputDir: 'brukerhistorie-resultater/traces-tilfeldig',
  reporter: [
    ['json', { outputFile: 'brukerhistorie-resultater/brukerhistorie-resultat-tilfeldig.json' }],
    ['list'],
  ],
  use: {
    headless: true,
    bypassCSP: true,
    storageState: 'brukerhistorie-resultater/auth-tilfeldig.json',
    viewport: { width: 1280, height: 900 },
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },
  timeout: 30000,
  workers: 1,
});
