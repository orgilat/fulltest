// pages/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../logger';



export class CartPage {
  readonly page;
  readonly continueshop: Locator;
  readonly checkout: Locator;
  readonly qty: Locator;
  readonly description: Locator;
  readonly urcart: Locator;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;
  readonly carts: Locator;
  readonly remove: Locator;
 readonly quanity: Locator;

  constructor(page) {
    this.page = page;
    this.continueshop = page.locator('#continue-shopping');
    this.checkout = page.locator('#checkout');
    this.qty = page.locator('div.cart_quantity_label');
    this.description = page.locator('div.cart_desc_label');
    this.urcart = page.locator('span.title');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
    this.cartIcon = page.locator('.shopping_cart_link')
     this.carts = page.locator('//div[@class="cart_item"]')
      this.remove = page.locator('//div[@class="item_pricebar"]//button');
    this.quanity = page.locator("//div[@class='cart_quantity']");


  }

  async expects() {
    // הפונקציה בודקת עבור 0 רכישות שכל השדות במקום 
    await expect(this.continueshop).toBeVisible();
    logger.info("the button continue shopping is here")
    await expect(this.checkout).toBeVisible();
    logger.info("the button checkout is here")
    await expect(this.qty).toBeVisible();
    logger.info("the button qty is here")
    await expect(this.description).toBeVisible();
    logger.info("the button description is here")
      await expect(this.urcart).toBeVisible();
    logger.info("the button urcart is here")
  }

    async direction() {
  await expect(this.continueshop).toBeVisible();
  this.continueshop.click(),
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  logger.info("Inventory page opened correctly");
}

  async removecirculation(n: number) {//מטרה- מספר האיברים המופיעים בתשלום זהה למספר הנבחר
    this.continueshop.click()
      for (let i = 0; i < n; i++) {
        const ab=  await this.addToCartButtons.nth(0);
        await ab.click()
    }
   await this.cartIcon.click()
   const counter= await this.carts.count()
   expect(counter).toBe(n)
  }
  async removecross(n: number) {//מטרה- כפתור דליט מעלים כל פעם אחד מהמסך
    this.continueshop.click()
      for (let i = 0; i < n; i++) {
        const ab=  await this.addToCartButtons.nth(0);
        await ab.click()
    }
   await this.cartIcon.click()
   await this.remove.nth(0).click()
   const counter= await this.carts.count()
   expect(counter).toBe(n-1)
  }
async numbers(n: number) {//מטרה- לא משנה מה תמיד יוצג פריט 1
  // לוחץ על כפתור "Continue Shopping" כדי לחזור לעמוד המוצרים
  await this.continueshop.click();

  // מוסיף את אותו מוצר n פעמים (תמיד את הראשון ברשימה)
  for (let i = 0; i < n; i++) {
    const button = this.addToCartButtons.nth(0);
    await button.click();
  }
  // נכנס לעגלת הקניות
  await this.cartIcon.click();
  for (let i = 0; i < n; i++) {
    const quantityInput = this.quanity.nth(i);
    await expect(quantityInput).toHaveText("1");
  }
}
}