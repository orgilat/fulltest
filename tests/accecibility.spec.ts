import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
});

  const selectors = [
    ['.inventory_item'],
    ['div.inventory_list'],
    ['button[data-test^="add-to-cart"]'],
    ['[data-test="inventory-item-price"]'],
    ['img.inventory_item_img'],
    ['a[data-test*="title-link"]']
  ];

  for (const selector of selectors) {
    test(`Check accessibility for ${selector}`, async ({ page }, testInfo) => {
      const results = await new AxeBuilder({ page })
        .include(selector)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      await testInfo.attach(`axe-${selector}-results.json`, {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json',
      });

      expect(results.violations).toEqual([]);
    });
  }
;
