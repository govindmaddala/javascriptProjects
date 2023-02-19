import { Locator, Page } from "@playwright/test";

export class Home{
    
    readonly page:Page;
    readonly login:Locator;

    constructor(page:Page){
        this.page = page;
        this.login = page.locator("a[href*='login']");
    }

    async clickLoginButton() {
        await this.login.click();
    }
}

