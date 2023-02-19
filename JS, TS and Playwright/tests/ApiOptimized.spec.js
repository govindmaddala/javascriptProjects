const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require('../Utils/ApiUtils');

const cred = { userEmail: "playwrightdummy@gmail.com", userPassword: "Pass@word1" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };

let response;

test.beforeAll(async () => {
    const apicontext = await request.newContext();
    const obj = new ApiUtils(apicontext, cred, orderPayload);
    response = await obj.getOrderID();
});

test('E2E Project', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("[routerlink='/dashboard/myorders']").click();

    await page.pause();
});

