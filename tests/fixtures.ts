// baseFixture.ts
import { test as baseTest } from '@playwright/test';
import { mixinFixtures as mixinCoverage } from '@bgotink/playwright-coverage';
import { HomePage } from '../pages/HomePage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';

const testWithCoverage = mixinCoverage(baseTest);

export const test = testWithCoverage.extend<{
  homePage: HomePage;
  mainPage: MainPage;
  cartPage: CartPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export const expect = test.expect;
