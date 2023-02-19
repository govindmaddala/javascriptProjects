const { test, expect, request } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const user = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    const loginBtn = page.locator("#login");

    await page.goto("https://rahulshettyacademy.com/client/");
    await user.type("playwrightdummy@gmail.com");
    await pwd.fill("Pass@word1");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('E2E Project', async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await page.locator("[routerlink='/dashboard/myorders']").click();
    console.log(await page.title());
});