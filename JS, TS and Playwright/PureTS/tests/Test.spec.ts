import test from "@playwright/test";
import {Home} from '../pages/Home.po'


test.describe("Udemy testing",async ()=>{
    test("test",async ({page})=>{
        await page.goto("https://www.udemy.com/");
        console.log(await page.title())
        const home = new Home(page);
        await home.clickLoginButton();
        await page.pause();
    })
})


