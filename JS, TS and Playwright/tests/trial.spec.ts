import { chromium } from "@playwright/test";
import {test,expect} from "@playwright/test";

test('Browser with pre-req', async () => {

    const browser=await chromium.launch({
        headless:false,
        channel:"msedge"
    });
    //opens new browser with no plugins and all
    const context = await browser.newContext();
    //opens new page in which automate code works
    const page = await context.newPage();

    const user = page.locator("#username");
    const pwd = page.locator('#password');
    const signBtn = page.locator("#signInBtn");
    const item = page.locator(".card-body a");

    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    //console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //locators
    await user.type('valid@gmail.com');
    await pwd.type('password');
    await signBtn.click(); 
});