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

    await page.goto("https://rahulshettyacademy.com/client/");


    //tweaking network response of all orders to empty order

    //if end-point is wrong ,change the end-point
    await page.route("https://rahulshettyacademy.com/api/ecom/product/get-all-products",
        async route => {
            const response = await page.request.fetch(route.request());
        });

    let body = emptyCart;

    route.fulfill({
        response,
        body
    });




    await page.locator("[routerlink='/dashboard/myorders']").click();

    await page.pause();
});