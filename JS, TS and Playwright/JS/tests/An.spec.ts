
import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
    test("Verify correct cust name", async ({ page }) => {
        await page.goto("https://calm.bewgle.com/home");

        await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

        await page.locator('input[name="user"]').click();

        await page.locator('input[name="user"]').fill("govind@bewgle.com");

        await page.locator('input[name="password"]').click();

        await page.locator('input[name="password"]').fill("Passw0$dgo^ind");

        await page.locator("text=Login").click();

        await expect(page.locator('p:has-text("BEWGLE")')).toContainText(/BEWGLE/);

        await expect(page.locator('xpath=//*[contains(@class, "badge")]')).toContainText(/BEWGLE/);

        // const custName = await page.locator(`div[contains(@class, 'icon-person')]`).innerText();
        // console.log(custName);

        // //assert(custName ==='BEWGLE');
        // expect(custName).toBe(' BEWGLE');
        // //await expect(custName).toHaveText(/BEWGLE/);

    });
    test('Verify the date range below the heading.', async ({ page }) => {

      await page.goto("https://calm.bewgle.com/home");

      await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

      await page.locator('input[name="user"]').click();

      await page.locator('input[name="user"]').fill("govind@bewgle.com");

      await page.locator('input[name="password"]').click();

      await page.locator('input[name="password"]').fill("Passw0$dgo^ind");

      await page.locator("text=Login").click();

  function calculateDate(datestring: string) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    
    const date = datestring.split(" ");
    console.log(date);
    let d = Number(date[0].slice(0, -2));
    let m = Number(months.indexOf(date[1]) + 1);
    let y = Number(date[2]);
    return new Date(`${m}/${d}/${y}`);
  }

  const subheading = await page
    .locator('xpath=//*[contains(@class,"subheading")] >> nth=1')
    .innerText();
  const arr = subheading.split(" ");
  const d1 = calculateDate(`${arr[1]} ${arr[2]} ${arr[3]}`);
  const d2 = calculateDate(`${arr[5]} ${arr[6]} ${arr[7]}`);
  let difference = d2.getTime() - d1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  expect(TotalDays).toBeGreaterThanOrEqual(29);
    });
  });








 //_________________________________________________________________________________________________________________________


 //     test('Verify "Last 30 days" is the default selected timeline', async ({ page }) => {

//       await page.goto("https://calm.bewgle.com/home");

//       await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//       await page.locator('input[name="user"]').click();

//       await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//       await page.locator('input[name="password"]').click();

//       await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//       await page.locator("text=Login").click();

//     //   a
//     // await expect(
//     //   page.locator('xpath=//*[contains(@class,"btn-group")] >> nth=0')
//     // ).toHaveCSS("font-weight", "700");

//   await expect(
//     page.locator(
//       'xpath=//*[contains(@class,"btn tab-filter-label rounded-0 text-nowrap rounded-start")]'
//     )
//   ).toHaveCSS("color", "rgb(6, 166, 183)");

//   await expect(
//     page.locator(
//       'xpath=//*[contains(@class,"col number-card-value h3 fw-bold")] >> nth=0 >> visible=true'
//     )
//   ).toContainText("22");

//   await page
//     .locator(
//       'xpath=//*[contains(@class,"btn tab-filter-label rounded-0 text-nowrap rounded-end")]'
//     )
//     .click();

//   await expect(
//     page.locator(
//       'xpath=//*[contains(@class,"col number-card-value h3 fw-bold")] >> nth=0 >> visible=true'
//     )
//   ).toContainText("3");

//     });

//     //Recent Products Count
//     test('Verify that the "Recent Products" card shows the count of products', async ({ page }) => {

//       await page.goto("https://calm.bewgle.com/home");

//       await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//       await page.locator('input[name="user"]').click();

//       await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//       await page.locator('input[name="password"]').click();

//       await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//       await page.locator("text=Login").click();

//       await expect(
//         page.locator(
//           'xpath=//*[contains(@class,"col number-card-value h3 fw-bold")] >> nth=0 >> visible=true'
//         )
//       ).toContainText("22");
//     });



//   //Recent Products Color
//   test('Verify that the "Recent Products" card shows green color caption for the increase', async ({
//     page,
//   }) => {
//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=0 >> visible=true'
//       )
//     ).toContainText("Increased");

//     // await expect(
//     //   page.locator(
//     //     'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=0 >> visible=true'
//     //   )).toHaveCSS(
//     //     "color", "rgb(55,180,126)"
//     //     );
//   });
//   test('Verify that the "Recent Products" card shows red color caption for the decrease in count of products', async ({
//     page,
//   }) => {
//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=0 >> visible=true'
//       )
//     ).toContainText("Decreased",
//     { timeout: 10000 });

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=0 >> visible=true'))
//         .toHaveCSS("color", "rgb(255,87,48)"
//         );
//   });

//   //Reviews
//   test('Verify that the "Reviews" card shows green color caption for the increase', async ({
//     page,
//   }) => {
//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=1 >> visible=true'
//       )
//     ).toContainText("Increased",
//     { timeout: 10000 });

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=1 >> visible=true'
//       )
//     ).toHaveCSS("color", "rgb(55,180,126)");
//   });
//   test('Verify that the "Reviews" card shows red color caption for the decrease', async ({ page }) => {

//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=1 >> visible=true'
//       )
//     ).toContainText("Decreased",
//     { timeout: 10000 });

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=1 >> visible=true'))
//         .toHaveCSS("color", "rgb(255,87,48)");
//   });

//   //Positive Reviews
//   test('Verify that the "Positive Reviews" card shows green color caption for the increase', async ({ page }) => {

//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=2 >> visible=true'
//       )
//     ).toContainText("Increased",
//     { timeout: 10000 });

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=2 >> visible=true'
//       )).toHaveCSS(
//         "color", "rgb(55,180,126)"
//         );
//   });
//   test('Verify that the "Positive Reviews" card shows red color caption for the decrease', async ({ page }) => {

//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=2 >> visible=true'
//       )
//     ).toContainText("Decreased",
//     { timeout: 10000 });

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=2 >> visible=true'))
//         .toHaveCSS("color", "rgb(255,87,48)"
//         );
//   });

//   //Negative Reviews opposite
//   test('Verify that the "Negative Reviews" card shows green color caption for the decrease', async ({ page }) => {

//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=3 >> visible=true'
//       )
//     ).toContainText("Decreased",
//     { timeout: 10000 });

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=3 >> visible=true'
//       )).toHaveCSS(
//         "color", "rgb(55,180,126)"
//         );
//   });
//   test('Verify that the "Negative Reviews" card shows red color caption for the increase', async ({ page }) => {

//     await page.goto("https://calm.bewgle.com/home");

//     await expect(page).toHaveTitle(/Login - Bewgle Lumens/);

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=3 >> visible=true'
//       )
//     ).toContainText("Increased",
//     { timeout: 10000 });

//     await expect(
//       page.locator(
//         'xpath=//*[contains(@class,"col number-card-subtitle")] >> nth=3 >> visible=true'))
//         .toHaveCSS("color", "rgb(255,87,48)"
//         );
//   });
// });

// import { test, expect } from "@playwright/test";

// test.describe("Catalogue page", () => {
//   test("catalogue table task4", async ({ page }) => {
//     await page.goto("https://calm.bewgle.com/home");

//     await page.locator('input[name="user"]').click();

//     await page.locator('input[name="user"]').fill("anurag@bewgle.com");

//     await page.locator('input[name="password"]').click();

//     await page.locator('input[name="password"]').fill("Pa$$w0rdAnurag");

//     await page.locator("text=Login").click();

//     await page
//       .locator('xpath=//*[contains(@class,"nav-li px-3")] >> nth=2')
//       .click();

//     //const url = await page.url();

//     // await expect(url).toEqual("https://calm.bewgle.com/catalogue");

//     await page.locator('a:has-text("Catalogue")').click();
//     await expect(page).toHaveURL("https://calm.bewgle.com/catalogue");

//     // await page.locator('[placeholder="Search Product"]').click();
//     // await Promise.all([
//     //   page.waitForNavigation(/*{ url: 'https://calm.bewgle.com/catalogue?k=apple%20pencil' }*/),
//     //   page.locator('[placeholder="Search Product"]').fill("apple pencil"),
//     // ]);
//     // await page.locator('[placeholder="Search Product"]').press("Enter");

//     // //await expect(page.locator('xpath=//*[contains(@class,"table-body")]>> nth=0'));

//     // await page.waitForTimeout(1000)

//     // console.log(await page.locator('xpath=//*[contains(@class,"table-body")]>> nth=0').innerText());

//     // await expect(page.locator('xpath=//*[contains(@class,"table-body")]>> nth=0')).toContainText(/apple pencil/);

//     ////////////////////////////////////////////////////////task sort

//     //await page.waitForTimeout(1000)

//     //console.log(await page.locator('xpath=//*[contains(@class,"table-body")]>> nth=1').innerText());

//     // await expect(page.locator('xpath=//*[contains(@class,"table-body")]>> nth=0')).toContainText(/apple pencil/);

//     //  await page.locator('[class="dropdown"]').click();

//     //  await page.locator('[class="dropdown-item pointer"]>> nth=1').click();

//     //  await expect(page.locator('xpath=//*[contains(@class,"table-body")]>> nth=1')).toContainText(/Zomato/);

//     /////////////////////////////////////////////////////task add products list

    
//     await page.locator('[class="btn btn-rounded mx-2"]').click();

//     await page.locator('[class="form-check"]>> nth=0').click();

//     page.locator('[placeholder="Name of the new category"]').fill("Mobile");

//     page.locator('[placeholder="Select vertical"]').click();

//     await page.locator('[class="btn btn-success text-white btn-sm"]').click();

//     await page.locator('[class="btn btn-primary border-0 mt-3"]').click();

//     page.locator('[class="form-control ng-untouched ng-pristine ng-valid"]').fill("https://www.amazon.in/OnePlus-Nord-Bahamas-128GB-Storage/dp/B09RG5R5FG/ref=sr_1_3?crid=1V8RTFVPYBD6&keywords=one%2Bplus%2Bnord&qid=1655669004&sprefix=oneplus%2Bnord%2Caps%2C233&sr=8-3&th=1");

//     await page.locator('[class="btn btn-primary"]>> nth =1').click();

//     await page.locator('[class="btn btn-primary btn-sm d-inline-block px-4"]').click();
    
//   });
// });