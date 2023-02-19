const { test, expect, request } = require('@playwright/test');

let token;
const loginPayload = { userEmail: "playwrightdummy@gmail.com", userPassword: "Pass@word1" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }

const emptyCart = { detail: [], message: "empty cart" };
let orderId;
test.beforeAll(async () => {
    apiContext = await request.newContext();
    const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload
        }
    );

    expect(response.ok()).toBeTruthy();

    const responseJson = await response.json();
    token = responseJson.token;
    console.log(token);




    //creating order

    const orderResp = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    })

    const orderJSON = await orderResp.json();
    console.log(orderJSON);
    orderId = orderJSON.orders[0];   //not working

});


test('E2E Project', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    //blocking calls

    //for single file type
    await page.route('**/*.css', route => route.abort());

    //for multiple format files
    await page.route('**/*.{jpg,png }', route => route.abort());

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62921b53e26b7e1a10ec4a12",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62921b53e26b7eggdjgdfgec4a13" }));

    await page.locator("button:has-text('View')").click();
    //expected output: you are not authorized
    await page.pause();
});