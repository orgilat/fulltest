import { test, expect } from '@playwright/test';

const JS_FILE = 'https://www.saucedemo.com/static/js/main.018d2d1e.chunk.js';
const SVG_FILE = 'https://www.saucedemo.com/static/media/menu3x.52cc17a3.svg';

test('should load JS bundle successfully', async ({ request }) => {
  const response = await request.get(JS_FILE);
  expect(response.status()).toBe(200); // השרת החזיר בהצלחה
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain('application/javascript'); // ווידוא סוג קובץ
  const body = await response.text();
  expect(body.length).toBeGreaterThan(100); // ווידוא שהתוכן לא ריק
  expect(body).toMatch(/function|var|let|const|React|window/); // ווידוא שזה באמת קוד JS
});

test('should load SVG image successfully', async ({ request }) => {
  const response = await request.get(SVG_FILE);
  expect(response.status()).toBe(200); // השרת החזיר בהצלחה
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain('image/svg+xml'); // ווידוא שזה קובץ SVG
  const body = await response.text();
  expect(body.length).toBeGreaterThan(50); // ווידוא שהתוכן לא ריק
  expect(body.trim().startsWith('<svg')).toBeTruthy(); // ווידוא שזה קובץ SVG אמיתי
});



test('should type in input and verify API returns results', async ({ page }) => {
  // 1. טען את הדף הרלוונטי
  await page.goto('https://moovitapp.com/he');  // או הדף שמכיל את השדה
  
  // 2. הקלד בתוך השדה input עם placeholder "בחירת נקודת מוצא"
  const input = page.locator("input[placeholder='בחירת נקודת מוצא']");
  await input.fill('תל אביב');
  
  // 3. המתן ויירדף אחרי הבקשה ל-API שמתבצעת בעקבות ההקלדה
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/index/api/location/search') && resp.status() === 200),
    // ההקלדה כבר בוצעה, הבקשה אמורה לצאת אוטומטית
  ]);
  
  // 4. קבל את תוצאות ה-API
  const json = await response.json();
  
  // 5. בדוק שהתוצאות לא ריקות
  expect(json.length).toBeGreaterThan(0);
  
  // 6. בדוק שיש תוצאה עם "תל אביב" בכותרת או בתת-כותרת
  const containsTelAviv = json.some(item =>
    item.title.includes('תל אביב') || item.subTitle.some((sub: string) => sub.includes('תל אביב'))
  );
  expect(containsTelAviv).toBeTruthy();
});

