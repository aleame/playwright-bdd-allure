import { Page } from 'playwright';

export default class BasePage {
    constructor(protected page: Page) { }
    async navigateTo(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }
    async getTitle() {
        return await this.page.title();
    }
    async waitForElement(selector: string, timeout = 5000) {
        await this.page.waitForSelector(selector, { timeout });
    }
    async isElementVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }
    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }
    async scrollToElement(selector: string) {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }
};
