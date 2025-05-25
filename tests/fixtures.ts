import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage'; // ✅ הוספת CartPage

export const test = baseTest.extend<{
  homePage: HomePage;
  mainPage: MainPage;
  cartPage: CartPage; // ✅ הוספת cartPage ל-type
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  cartPage: async ({ page }, use) => { // ✅ פיקסטיור חדש
    await use(new CartPage(page));
  },
});

export const expect = test.expect;
