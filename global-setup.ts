import { chromium } from '@playwright/test';

async function globalSetup() {
const browser = await chromium.launch({ headless: true, slowMo: 200 });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[placeholder="Username"]', 'standard_user');
  await page.fill('input[placeholder="Password"]', 'secret_sauce');
  await page.click('input[type="submit"]');

  // המתן לעגלת קניות שתעיד שההתחברות הצליחה
  await page.waitForSelector('a.shopping_cart_link');

  await context.storageState({ path: 'storageState.json' });
  console.log('✅ התחברות הצליחה ונשמרה כ-storageState.json');

  await browser.close();
}

export default globalSetup;
