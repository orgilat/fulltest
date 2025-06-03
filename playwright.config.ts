import { defineConfig } from '@playwright/test';
import { defineCoverageReporterConfig } from '@bgotink/playwright-coverage';
import path from 'path';

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './tests',
  retries: 1,
  use: {
    headless: false,
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'outside',     testMatch: /.*exampleacc\.spec\.ts/ },
    { name: 'inside',      testMatch: /.*autentication\.spec\.ts/, use: { storageState: 'storageState.json' } },
    { name: 'accecibility', testMatch: /.*accecibility\.spec\.ts/, use: { storageState: 'storageState.json' } },
    {
      name: 'api',
      testMatch: /.*api\.spec\.ts/,
      use: {
        baseURL: 'https://www.saucedemo.com/',
      },
    },
  ],
 reporter: [
    ['list'],
    ['@bgotink/playwright-coverage', defineCoverageReporterConfig({
      sourceRoot: path.resolve(__dirname),
      resultDir: path.join(__dirname, 'coverage'),
      reports: [
        ['html'],
        ['text-summary'],
      ],
    })],
  ],
});