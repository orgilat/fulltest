import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.ts',

  testDir: './tests',
  retries: 1,
  use: {
    headless: false,
    baseURL: 'https://www.saucedemo.com/',
    // ---------------------------
    // הוספת Tracing גלובלי
    trace: 'on-first-retry',    // יקליט trace בריצה שנייה של טסט שנכשל
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // ---------------------------
  },
  projects: [
    {
      name: 'outside',
      testMatch: /.*exampleacc\.spec\.ts/,
    },
    {
      name: 'inside',
      testMatch: /.*autentication\.spec\.ts/,
      use: {
        storageState: 'storageState.json',
        headless: false,
        baseURL: 'https://www.saucedemo.com/',
        // אפשר להגדיר trace שונה גם ברמת פרויקט:
        // trace: 'retain-on-failure',
      },
    },
    {
      name: 'accecibility',
      testMatch: /.*accecibility\.spec\.ts/,
      use: {
        storageState: 'storageState.json',
        headless: false,
        baseURL: 'https://www.saucedemo.com/',
        // trace: 'on',    // אם תרצה להקליט תמיד
      },
    },
  ],

  reporter: [
    ['list'],
    ['html'],
  ],
});
