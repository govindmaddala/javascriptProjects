const { test, expect } = require('@playwright/test');

test('E2E Project', async ({ page }) => {
    const user = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    const loginBtn = page.locator("#login");

    const products = page.locator(".card-body");
    const productName = 'iphone 13 pro';

    await page.goto("https://rahulshettyacademy.com/client/");
    await user.type("playwrightdummy@gmail.com");
    await pwd.fill("Pass@word1");
    await loginBtn.click();

    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.locator('b').count();
    console.log("count:" + count);

    for (i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    const cart = page.locator(".fa-shopping-cart");
    await cart.click();
    await page.pause();
});