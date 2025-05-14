import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly step: Locator;
  readonly step2: Locator;
  readonly step3: Locator;



  constructor(page: Page) {
    this.page = page;
    this.step = page.locator('input[placeholder="Username"]');
    this.step2 = page.locator('input[placeholder="Password"]');
    this.step3 = page.locator('input[type="submit"]');


  }

  async c() {//בדיקה 1- התחברות עם סיסמאות+ לחיצה על אנטר
    await this.page.goto('https://www.saucedemo.com/');
    await expect( this.step).toBeVisible()
    for (const txt of ['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user']) { 
      await this.step.click();
      await this.step.fill(txt);
      await this.step2.fill("secret_sauce")
      await this.step.press('Enter');
      await expect(this.page).toHaveURL(/.*inventory/);
      await this.page.goto('https://www.saucedemo.com/');
    }
  }

    async d() {//בדיקה 1- התחברות עם סיסמאות+ לחיצה על אישור
    await this.page.goto('https://www.saucedemo.com/');
    await expect( this.step).toBeVisible()
    for (const txt of ['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user']) { 
      await this.step.click();
      await this.step.fill(txt);
      await this.step2.fill("secret_sauce")
      await this.step3.click();
      await expect(this.page).toHaveURL(/.*inventory/);
      await this.page.goto('https://www.saucedemo.com/');
    }
  }
     async e() {
      await this.page.goto('https://www.saucedemo.com/');
      await this.step3.click();
      await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }
  
     async g() {
        await this.page.goto('https://www.saucedemo.com/');
        await this.step.press('Enter');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }
  }


