import { defineConfig } from '@playwright/test';

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
        // no need for storageState here
        baseURL: 'https://www.saucedemo.com/',
      },
    },
  ],
  reporter: [
    ['list'],
    ['html'],
  ],
});
