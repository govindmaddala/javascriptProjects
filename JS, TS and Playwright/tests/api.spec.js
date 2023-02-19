const { test, expect, request } = require('@playwright/test');

let token;
const loginPayload = { userEmail: "playwrightdummy@gmail.com", userPassword: "Pass@word1" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }
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
    orderId = orderJSON.orders[0];   //working

});


test('E2E Project', async ({ page }) => {


    //token is inserted to bypass login
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("[routerlink='/dashboard/myorders']").click();
    //Since order is created using api, on clicking my orders page...order should be there.

    await page.pause();
});