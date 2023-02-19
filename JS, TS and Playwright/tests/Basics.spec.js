const { test, expect } = require('@playwright/test');
const exp = require('constants');


test('Browser with pre-req', async ({ browser }) => {
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

    //to print error message on invalid details
    console.log(await page.locator(".alert[style*='block']").textContent());

    //assertion to check text dispalyed on screen
    await expect(page.locator(".alert[style*='block']")).toContainText("Incorrect");


    //valid credentials:
    await user.fill(""); //clear the existing values
    await user.fill("rahulshettyacademy");
    await pwd.fill("");
    await pwd.fill("learning")
    // await signBtn.click();
    // console.log(await item.first().textContent());  //iphone X
    // console.log(await item.nth(0).textContent());   //iphone X

    //await page.waitForLoadState('networkidle');         //for service calls making page only


    //for static pages which make no service calls
    await Promise.all(
        [
            page.waitForNavigation(),
            signBtn.click(),
        ]
    );

    //Iteration
    const allText = await item.allTextContents();
    console.log(allText);   //[ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]

});



test.only("Handling Dropdowns", async ({ browser }) => {

    const context = browser.newContext();
    const page = (await context).newPage();
    const user = page.locator("#username");
    const pwd = page.locator('#password');
    const signBtn = page.locator("#signInBtn");
    const drop = page.locator("select.form-control");
    const chek = page.locator(".radiotextsty").last();
    const termsCheck = page.locator("#terms");
    const blink = page.locator("[href*='documents']");

    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    await user.fill("rahulshettyacademy");
    await pwd.fill("learning")

    console.log("Before: " + await chek.isChecked());
    await chek.click();  //user is clicked and pop-up opens
    await page.locator("#okayBtn").click();

    console.log("After:" + await chek.isChecked()); //returns boolean 
    await expect(chek).toBeChecked();

    await drop.selectOption("teach"); //here teach is value attribute's value

    //terms
    await termsCheck.click();   //check          No assertion option for assertion directly

    await termsCheck.uncheck(); //uncheck
    expect(await termsCheck.isChecked()).toBeFalsy();  //unchecked and returns false

    await termsCheck.click();   //check
    expect(await termsCheck.isChecked()).toBeTruthy();
    await expect(termsCheck).toBeChecked();

    //checking if attribute have specific value so that is has special feature
    await expect(blink).toHaveAttribute('class', 'blinkingText');

    //handling multiple windows
    const [newPage] = await Promise.all(
        [
            (await context).waitForEvent('page'),
            blink.click(),
        ]
    );

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    //await page.pause();

});





// test('Browser without pre-req', async ({ browser, page }) => {
//     await page.goto("https://www.jiosaavn.com/");
//     console.log(await page.title());
//     //assertion
//     await expect(page).toHaveTitle("Online Songs on JioSaavn: Download & Play Latest Music for Free");
// });