import { test, expect } from './fixtures'; // fixtures שלך עם page, mainPage וכו'
import { logger } from '../Logger';

test.describe('טסטים לעמוד הראשי', () => {
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test('שלב 1: בדיקת קופסאות הפריטים', async ({ mainPage }) => {
  await mainPage.cart();
});

test('שלב 2: בדיקת כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.cart2();
});

test('שלב 3: בדיקת מחירים', async ({ mainPage }) => {
  await mainPage.cart3();
});

test('שלב 4: בדיקת תמונות', async ({ mainPage }) => {
  await mainPage.cart4();
});

test('שלב 5: בדיקת כותרות', async ({ mainPage }) => {
  await mainPage.cart5();
});

test('שלב 6: לחיצה אקראית על כפתור הוספה אחד', async ({ mainPage }) => {
  await mainPage.addRandomItems(1);
});

test('שלב 7: לחיצה על 2 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.addRandomItems(2);
});

test('שלב 8: לחיצה על 3 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.addRandomItems(3);
});

test('שלב 9: לחיצה על 4 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.addRandomItems(4);
});

test('שלב 10: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.addRandomItems(5);
});
test('שלב 11: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.addRandomItems(6);
});
test('שלב 12: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeRandomItems(1);
});
test('שלב 13: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeRandomItems(2);
});
test('שלב 14: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeRandomItems(3);
});
test('שלב 15: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeRandomItems(4);
});test('שלב 16: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeRandomItems(5);
});test('שלב 17: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeRandomItems(6);
});
test('שלב 18: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeAndBackRandomItems(1);
});
test('שלב 19: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeAndBackRandomItems(2);
});
test('שלב 20: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeAndBackRandomItems(3);
});
test('שלב 21: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeAndBackRandomItems(4);
});
test('שלב 22: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeAndBackRandomItems(5);
});
test('שלב 23: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.removeAndBackRandomItems(6);
});
test('שלב 24: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.cartdealremove(6,1);
});
test('שלב 25: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.cartdealremove(6,2);
});
test('שלב 26: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.cartdealremove(6,3);
});
test('שלב 27: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.cartdealremove(6,4);
});
test('שלב 28: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.cartdealremove(6,5);
});
test('שלב 29: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.cartdealremove(6,6);
});
test('שלב 30: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.checksetting();
});
test('שלב 31: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.settingsparts();
});
test('שלב 32: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.settingsparts2();
});
test('שלב 33: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.settingsparts3();
});
test('שלב 34: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.mash1();
});
test('שלב 35: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.mashcoount();
});
test('שלב 36: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.mashnames();
});
test('שלב 37: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.sortByNameAToZAndVerify();
});
test('שלב 38: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.sortByNameZToAndVerify();
});
test('שלב 39: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.verifyPricesSortedLowToHigh();
});
test('שלב 40: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.verifyPricesSortedHighToLOW();
});
test('שלב 41: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.textest();
});
test('שלב 42: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.urlX();
});test('שלב 43: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.urlF();
});test('שלב 44: לחיצה על 5 כפתורי הוספה', async ({ mainPage }) => {
  await mainPage.urlIN();
})
});
test.describe('Cart Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/cart.html');
  });

  test('Step 1: Validate cart elements visibility', async ({ cartPage }) => {
    await cartPage.expects();
  });

  test('Step 2: Navigate back to inventory from cart', async ({ cartPage }) => {
    await cartPage.direction();
  });

  test('Step 3: Add and verify 6 items in the cart', async ({ cartPage }) => {
    await cartPage.removecirculation(6);
    logger.info("6")
  });

  test('Step 4: Add and verify 5 items in the cart', async ({ cartPage }) => {
    await cartPage.removecirculation(5);
    logger.info("5")
  });

  test('Step 5: Add and verify 4 items in the cart', async ({ cartPage }) => {
    await cartPage.removecirculation(4);
    logger.info("4")
  });

  test('Step 6: Add and verify 3 items in the cart', async ({ cartPage }) => {
    await cartPage.removecirculation(3);
    logger.info("3")
  });

  test('Step 7: Add and verify 2 items in the cart', async ({ cartPage }) => {
    await cartPage.removecirculation(2);
    logger.info("2")
  });

  test('Step 8: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.removecirculation(1);
    logger.info("1")
  });
 test('Step 9: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.removecross(1);
    logger.info("1")
  });
   test('Step 10: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.removecross(2);
    logger.info("1")
  });
   test('Step 11: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.removecross(3);
    logger.info("4")
  });
   test('Step 12: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.removecross(4);
    logger.info("1")
  });
     test('Step 13: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.removecross(5);
    logger.info("1")
  });
     test('Step 14: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.removecross(6);
    logger.info("1")
  });
    test.only('Step 15: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.numbers(1);
    logger.info("1")
  });
      test.only('Step 16: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.numbers(2);
    logger.info("1")
  });
      test.only('Step 17: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.numbers(3);
    logger.info("1")
  });
      test.only('Step 18: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.numbers(4);
    logger.info("1")
  });
      test.only('Step 19: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.numbers(5);
    logger.info("1")
  });
      test.only('Step 20: Add and verify 1 item in the cart', async ({ cartPage }) => {
    await cartPage.numbers(6);
    logger.info("1")
  });
});
