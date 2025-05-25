import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../logger';

export class MainPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartIcon1: Locator;
  readonly addToCartButtons: Locator;
  readonly addToCartButtons2: Locator;
  readonly image: Locator;
  readonly title: Locator;
  readonly numof: Locator;
  readonly example: Locator;
  readonly settings: Locator;
  readonly settingscounter: Locator;
  readonly mash: Locator;
  readonly mashcount: Locator;
  readonly swags: Locator;
 readonly product: Locator;
 readonly rights: Locator;
readonly twiter: Locator;
readonly facebook: Locator;
readonly in: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.inventory_item');
    this.cartIcon1 = page.locator('div.inventory_list');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
    this.addToCartButtons2 = page.locator('//div[@data-test="inventory-item-price"]');
    this.image = page.locator('//img[@class="inventory_item_img"]');
    this.title = page.locator('//a[starts-with(@data-test,"item-") and contains(@data-test,"title-link")]//div[1]');
    this.numof = page.locator('span.shopping_cart_badge');
    this.example = page.locator('#remove-sauce-labs-backpack');
    this.settings = page.locator('#react-burger-menu-btn');
    this.settingscounter = page.locator('//a[@class="bm-item menu-item"]');
    this.mash = page.locator('select.product_sort_container');
    this.mashcount = page.locator('//select[@class="product_sort_container"]/option');
     this.swags = page.locator('div.app_logo');
    this.product = page.locator('span.title');
    this.rights = page.locator('div.footer_copy');
    this.twiter = page.locator('a[data-test="social-twitter"]');
    this.facebook = page.locator('a[data-test="social-facebook"]');
      this.in = page.locator('a[data-test="social-linkedin"]');
  }
  // בדיקה - 6 פריטים
  async cart() {
    await expect(this.cartIcon.first()).toBeVisible();
    const count = await this.cartIcon.count();
    expect(count).toBe(6);
    logger.info("מלבנים - שלב ראשון תקין - ישנם שישה פריטים");
  }

  async cart2() {
    const counter = await this.addToCartButtons.count();
    expect(counter).toBe(6);
    logger.info("הוספה - שלב שני תקין - ישנם שישה פריטים");
  }

  async cart3() {
    const counted = await this.addToCartButtons2.count();
    expect(counted).toBe(6);
    logger.info("תשלומים - שלב שלישי תקין - ישנם שישה פריטים");
  }

  async cart4() {
    const counted12 = await this.image.count();
    expect(counted12).toBe(6);
    logger.info("תמונות - שלב רביעי תקין - ישנם שישה פריטים");
  }

  async cart5() {
    const count111 = await this.title.count();
    expect(count111).toBe(6);
    logger.info("כותרות - שלב חמישי תקין - נמצאו שש כותרות פריטים");
  }
 // שלב 2
 // בדיקה- מטרה: מספר על העגלה משתנה בהתאם להוספה ו/או הורדה של פריטים

 //  בדיקה 1- מספר על העגלה משתנה בהתאם בהתאם ללחיצות
  async addRandomItems(count: number) {
    for (let i = 0; i < count; i++) {
      const button = this.addToCartButtons.nth(0);
      await button.scrollIntoViewIfNeeded();
      await expect(button).toBeVisible({ timeout: 3000 });
      await button.click();
   
    }

    const numOfItems = await this.numof.innerText();
    expect(parseInt(numOfItems)).toBe(count);
  }
  //מספר על העגלה משתנה גם בהתאם להסרת פריטים- לדוגמה לחצנו 6 והורדנו 4 - יוצג 2
  async cartdealremove(count: number, n: number) {
  // שלב 1: מוסיף count פריטים
  for (let i = 0; i < count; i++) {
    const button = this.addToCartButtons.nth(0);
    await button.scrollIntoViewIfNeeded();
    await expect(button).toBeVisible({ timeout: 3000 });
    await button.click();
    await this.page.waitForTimeout(300);
  }

  // שלב 2: מסיר  פריטים
  for (let i = 0; i < n; i++) {
    const removeButtons = this.page.locator('button', { hasText: 'Remove' });
    const removeButton = removeButtons.nth(0); // תמיד הראשון, כי הוא נעלם אחרי ההסרה
    await expect(removeButton).toBeVisible({ timeout: 3000 });
    await removeButton.click();
    await this.page.waitForTimeout(300);
  }

  // שלב 3 - בדיקה- אם אין כלום מה שקורה זה שנעלם המספר- לכן נבדוק שהאיבר לא קיים- אחרת נשווה למספר של החיסור
   const expected = count - n;
   if (expected === 0) {
   await expect(this.numof).not.toBeVisible({ timeout: 1000 });

  } else {
    const numOfItems = await this.numof.innerText();
    expect(parseInt(numOfItems)).toBe(expected);
  }
}
/// חלק 3- מטרה לחיצה על אד טו קארט משנה טקסט לרמוב וחוזר חלילה
// 
//
//
// בדיקה 1
// לחיצה על אד טו קארט- משנה את הטקסט לרמוב 
  async removeRandomItems(count: number) {
    for (let i = 0; i < count; i++) {
      const button = this.addToCartButtons.nth(0);
      await button.scrollIntoViewIfNeeded();
      await expect(button).toBeVisible({ timeout: 3000 });
      await button.click();
     

      const updatedButton = this.page.locator('button', { hasText: 'Remove' }).nth(i);
      await expect(updatedButton).toBeVisible();

      const text = await updatedButton.innerText();
      expect(text).toBe("Remove"); 
    }
  }
// בדיקה 2- לחיצה על רמוב מחזירה לאד טו קארט
 async removeAndBackRandomItems(count: number) {
  for (let i = 0; i < count; i++) {
 //לחיצה כפתור במקום הi 
    const addButton = this.addToCartButtons.nth(i);
    await addButton.scrollIntoViewIfNeeded();
    await expect(addButton).toBeVisible({ timeout: 3000 });
    await addButton.click();
   

    // רמוב תמיד במקום ה0 כי הוא נעלם
    const removeButtons = this.page.locator('button', { hasText: 'Remove' });
    const removeButton = removeButtons.nth(0);
    await expect(removeButton).toBeVisible({ timeout: 3000 });
    await removeButton.click();
   

    // משתנה חדש - תפקידו ללקט את הטקסט של האינפוט ולהציג
    const backToAddButton = this.addToCartButtons.nth(i);
    await expect(backToAddButton).toBeVisible({ timeout: 3000 });
    const text = await backToAddButton.innerText();
    expect(text).toBe("Add to cart");
  }
  
} 

/// חלק 4- כפתור ההגדרות
// 
//
//
// בדיקה 1+2
// לחיצה עליו תקינה ומופיע

 async checksetting() {
    await expect(this.settings).toBeVisible();
    await this.settings.click();

}
// יש בו 4 איברים
 async settingsparts() {
    await expect(this.settings).toBeVisible();
    await this.settings.click();
    const count= await this.settingscounter.count()
    expect(count).toBe(4);

}
// המעבר בלחיצה על אבאאוט - ליואראל הנכון
 async settingsparts2() {
    await expect(this.settings).toBeVisible();
    await this.settings.click();
    await this.settingscounter.nth(1).click()
     await expect(this.page).toHaveURL('https://saucelabs.com/');
  
}
 async settingsparts3() {
    await expect(this.settings).toBeVisible();
    await this.settings.click();
    await this.settingscounter.nth(2).click()
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  
}

/// חלק 5- המסננת
// 
//
//
// בדיקה 1+2
// לחיצה עליו תקינה ומופיע

 async mash1() {
    await expect(this.mash).toBeVisible();
    await this.mash.click();
  
}
async mashcoount() {//4 איברים
  await expect(this.mash).toBeVisible();
    await this.mash.click();
  const count = await this.mashcount.count();
  expect(count).toBe(4); // לא 5 לפי הדוגמה שהבאת
}
async mashnames() {//4 איברים
  const names=["Name (A to Z)","Name (Z to A)","Price (low to high)","Price (high to low)"]
  await this.mash.click();
  for (let i = 0; i < names.length; i++) {
    const optionText = await this.mashcount.nth(i).innerText();
    expect(optionText).toBe(names[i]);
  }
}//שלב 20- בחלק המסננת- בדיקת פונקציונליות הכפתורים בה
async sortByNameAToZAndVerify() {
  // שלב 1: לחיצה על תיבת הבחירה (המיון)
  await expect(this.mash).toBeVisible();
  await this.mash.click()
  await this.mash.selectOption({ index: 0 }); // או פשוט:
  // שלב 2: המתנה לטעינה/שינוי
  await this.page.waitForTimeout(500); // אופציונלי, תלוי באתר

  // שלב 3: קבלת הכותרות הנוכחיות
  const titles = await this.title.allInnerTexts(); 
  const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));

  // שלב 5: השוואה – האם הסדר הנוכחי אכן ממויין
  expect(titles).toEqual(sortedTitles);
  logger.info("סינון לפי שם מ-A ל-Z הצליח – הסדר תקין");
}
async sortByNameZToAndVerify() {
  // שלב 1: לחיצה על תיבת הבחירה (המיון)
  await expect(this.mash).toBeVisible();
  await this.mash.click()
  await this.mash.selectOption({ index: 1 }); 
  // שלב 2: המתנה לטעינה/שינוי
  await this.page.waitForTimeout(500); // אופציונלי, תלוי באתר
  const titles = await this.title.allInnerTexts(); 

  // שלב 4: יצירת עותק ממוין
  const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));

  // שלב 5: השוואה – האם הסדר הנוכחי אכן ממויין
  expect(titles).toEqual(sortedTitles);
  logger.info("סינון לפי שם מ-A ל-Z הצליח – הסדר תקין");
}//שלב 1- חלק 2- בודקים שהמחירים הופכים מהקטן לגדול- יוצרים מערך חדש שאין בו דולרים- ואז מסדרים אותו
async verifyPricesSortedLowToHigh() {
  await expect(this.mash).toBeVisible();
  await this.mash.click()
  await this.mash.selectOption({ index: 2 }); 
  //מוריד רווחים בעזרת הפונקציה טרים - לוקח את כל הטקסטים של המחירים
  const pricesText = await this.addToCartButtons2.allInnerTexts();
  const prices = pricesText.map(text => parseFloat(text.replace('$', '').trim()));

  // בודק שהמחירים ממוינים מהנמוך לגבוה
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
  logger.info("מחירי הפריטים ממוינים מהנמוך לגבוה בהצלחה");
}
async verifyPricesSortedHighToLOW() {
  await expect(this.mash).toBeVisible();
  await this.mash.click()
  await this.mash.selectOption({ index: 3 }); 
  //מוריד רווחים בעזרת הפונקציה טרים - לוקח את כל הטקסטים של המחירים
  const pricesText = await this.addToCartButtons2.allInnerTexts();
  const prices = pricesText.map(text => parseFloat(text.replace('$', '').trim()));

  // בודק שהמחירים ממוינים מהנמוך לגבוה
  const sortedPrices = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sortedPrices);
  logger.info("מחירי הפריטים ממוינים מהנמוך לגבוה בהצלחה");
}

////שלב 6 - תיבות טקסט

 async textest() {
    await expect(this.swags).toBeVisible();
    logger.info("swagers is here")
    await expect(this.product).toBeVisible();
    logger.info("product is here")
    await expect(this.rights).toBeVisible();
    logger.info("rights is here")


    //שלב 7- כפתורי הרשתות מובילים ליואראל הנכון
}
async urlX() {
  await expect(this.twiter).toBeVisible();

  const [newPage] = await Promise.all([
    this.page.waitForEvent('popup'),
    this.twiter.click(),
  ]);

  await expect(newPage).toHaveURL('https://x.com/saucelabs');
  logger.info("Twitter (X) page opened correctly");
}

async urlF() {
  await expect(this.facebook).toBeVisible();

  const [newPage] = await Promise.all([
    this.page.waitForEvent('popup'),
    this.facebook.click(),
  ]);

  await expect(newPage).toHaveURL('https://www.facebook.com/saucelabs');
  logger.info("Facebook page opened correctly");
}

async urlIN() {
  await expect(this.in).toBeVisible();

  const [newPage] = await Promise.all([
    this.page.waitForEvent('popup'),
    this.in.click(),
  ]);

  await expect(newPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
  logger.info("LinkedIn page opened correctly");
}

}    