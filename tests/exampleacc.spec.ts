import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

test('בדיקה ראשונה- מילוי ואז אנטר', async ({ homePage, page }) => {
  // 1. מבצע את ה-c() שמוסיף AA, BB, CC ומנווט לעמוד
  await homePage.c();

});

test('בדיקה ראשונה- מילוי ואז לחיצה על כניסה', async ({ homePage, page }) => {
  // 1. מבצע את ה-c() שמוסיף AA, BB, CC ומנווט לעמוד
  await homePage.d();

});

test('ולידציה של לחיצה', async ({ homePage, page }) => {
  // 1. מבצע את ה-c() שמוסיף AA, BB, CC ומנווט לעמוד
  await homePage.e();

});
test('ולידציה אנטר', async ({ homePage, page }) => {
  // 1. מבצע את ה-c() שמוסיף AA, BB, CC ומנווט לעמוד
  await homePage.g();

});