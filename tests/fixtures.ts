import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


export const test = baseTest.extend<{
  homePage: HomePage;
  
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

});

export const expect = test.expect;
