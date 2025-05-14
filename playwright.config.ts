import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // ← נתיב שבו נמצאים קבצי הטסט
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
