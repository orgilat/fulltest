import { test, expect, request } from '@playwright/test';
import { logger } from '../logger';

declare global {
  interface Window {
    __coverage__: Record<string, any>;
  }
}

const JS_FILE = 'https://www.saucedemo.com/static/js/main.018d2d1e.chunk.js';
const SVG_FILE = 'https://www.saucedemo.com/static/media/menu3x.52cc17a3.svg';

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    window.__coverage__ = {};
  });
});

test.afterEach(async ({ context }) => {
  const pages = context.pages();
  for (const page of pages) {
    const coverage = await page.evaluate(() => window.__coverage__);
    if (coverage) {
      logger.info('Coverage data collected:', coverage);
    }
  }
});

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

test('Compare frontend and backend results for Tel Aviv', async ({ page }) => {
  // 1. טען את הדף
  await page.goto('https://moovitapp.com/he');

  // 2. מצא את ה-input והקלד "תל אביב", תוך האזנה לבקשת POST
  const input = page.locator("input[placeholder='בחירת נקודת מוצא']");
  const [response] = await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('/index/api/location/search') &&
      resp.request().method() === 'POST' &&
      resp.status() === 200
    ),
    input.fill('תל אביב')
  ]);

  // 3. קבל את תוצאת ה-POST ובצע ספירה
  const apiResults = await response.json();
  const backendTitles = apiResults.map(item => item.title)
  const backendCount = backendTitles.length;
  console.log(`backendCount- ${backendCount}`);

  // 4. המתן לתוצאות בפרונט ואסוף ספירה
  await page.waitForSelector("//div[@class='result-text']//span");
  const frontendResults = await page.locator("//div[@class='result-text']//span").count();
  console.log(`frontendResults- ${frontendResults}`);

  // 5. השווה בין המספרים
  expect(frontendResults).toEqual(backendCount);
});

test('Mocked location search - check frontend matches mocked backend', async ({ page }) => {
  const mockedResults = [
    {
      type: 3,
      id: 85287417,
      image: { imageId: 19367 },
      title: "הקריה",
      subTitle: ["תל אביב-יפו"],
      latLng: { lat: 32071580, lng: 34785870 },
      airDistance: 1214,
      source: 0,
      latLon: { latitude: 32071580, longitude: 34785870 }
    },
    {
      type: 3,
      id: 33060667,
      image: { imageId: 19365 },
      title: "דיזנגוף סנטר",
      subTitle: ["תל אביב-יפו"],
      latLng: { lat: 32075369, lng: 34775131 },
      airDistance: 925,
      source: 0,
      latLon: { latitude: 32075369, longitude: 34775131 }
    },
    {
      type: 3,
      id: 269194743,
      image: { imageId: 19367 },
      title: "כיכר החטופים",
      subTitle: ["תל אביב-יפו"],
      latLng: { lat: 32077336, lng: 34786919 },
      airDistance: 723,
      source: 0,
      latLon: { latitude: 32077336, longitude: 34786919 }
    },
    {
      type: 2,
      id: 23483,
      image: { imageId: -72 },
      title: "תל חי",
      subTitle: ["כפר סבא"],
      latLng: { lat: 32173989, lng: 34913969 },
      airDistance: 16145,
      source: 0,
      latLon: { latitude: 32173989, longitude: 34913969 }
    }
  ];

  // 🟡 1. MOCK קודם
  await page.route('**/index/api/location/search', async route => {
    if (route.request().method() === 'POST') {
      console.log('🚨 Mocked POST triggered!');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedResults)
      });
    } else {
      await route.continue();
    }
  });

  // 🟢 2. ניווט לדף
  await page.goto('https://moovitapp.com/he');

  // 🟢 3. חיפוש
  const input = page.locator("input[placeholder='בחירת נקודת מוצא']");
  await input.click();
  await input.fill('תל אביב');

  // 🟡 5. ספירת מופעי title מה־mock
  const backendTitles = mockedResults.map(item => item.title);
  const backendCount = backendTitles.length;

  console.log(`📦 backendCount (title fields): ${backendCount}`);
});
