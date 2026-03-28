import { Page, Locator, expect } from '@playwright/test';
import {
    ElementNotInteractableError,
    TimeoutError,
    TextContentError,
    NavigationError
} from '@support/errors';

export default class BasePage {
    constructor(protected page: Page) { }

    /**
     * @method navigateTo
     * @description Navigate to a URL with error handling
     * @param {string} path - URL to navigate to
     * @throws {NavigationError} If navigation fails
     */
    public async navigateTo(path: string): Promise<void> {
        try {
            await this.page.goto(path, { waitUntil: 'domcontentloaded' });
        } catch (_error) {
            throw new NavigationError(path);
        }
    }

    /**
     * @method getTitle
     * @description Get the page title
     * @returns {string} Page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * @method getUrl
     * @description Get the current URL
     * @returns {string} Page URL
     */
    async getUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * @method waitForElement
     * @description Wait for an element using a selector
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in milliseconds (default: 5000)
     * @throws {TimeoutError} If element is not found within timeout
     */
    async waitForElement(selector: string, timeout = 5000) {
        try {
            await this.page.locator(selector).waitFor({ state: 'visible', timeout });
        } catch (_error) {
            throw new TimeoutError('element to appear', selector, timeout);
        }
    }

    /**
     * @method isElementVisible
     * @description Check if an element is visible
     * @param {string} selector - CSS selector
     * @returns {boolean} True if element is visible, false otherwise
     */
    async isElementVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }

    /**
     * @method captureScreenshot
     * @description Take a screenshot
     * @param {string} name - Screenshot filename
     */
    public async captureScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    /**
     * @method scrollToElement
     * @description Scroll to an element
     * @param {string} selector - CSS selector
     */
    async scrollToElement(selector: string) {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    /**
     * @method waitForLocator
     * @description Wait for a Playwright Locator to be in a specific state
     * @param {Locator} locator - Playwright Locator
     * @param {Object} options - Wait options (state, timeout)
     * @throws {TimeoutError} If locator doesn't reach desired state within timeout
     */
    async waitForLocator(locator: Locator, options?: { state?: 'visible' | 'hidden' | 'attached'; timeout?: number }): Promise<void> {
        const state = options?.state || 'visible';
        const timeout = options?.timeout || 5000;

        try {
            await locator.waitFor({ state, timeout });
        } catch (_error) {
            // Attempt to get a selector for the error message
            let selector = 'locator';
            try {
                selector = await locator.evaluate(el => {
                    if (el.id) { return `#${el.id}`; }
                    if (el.className) { return `.${el.className.split(' ')[0]}`; }
                    return el.tagName.toLowerCase();
                });
            } catch { /* ignore */ }
            throw new TimeoutError(`locator to be ${state}`, selector, timeout);
        }
    }

    /**
     * @method safeClick
     * @description Safely click an element with auto-wait and error handling
     * @param {Locator} locator - Playwright Locator
     * @param {Object} options - Click options (timeout)
     * @throws {ElementNotInteractableError} If element cannot be clicked
     */
    public async safeClick(locator: Locator, options?: { timeout?: number }): Promise<void> {
        const timeout = options?.timeout || 5000;

        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.click({ timeout });
        } catch (_error) {
            throw new ElementNotInteractableError('click', 'locator');
        }
    }

    /**
     * @method safeFill
     * @description Safely fill an input field with validation
     * @param {Locator} locator - Playwright Locator
     * @param {string} text - Value to fill
     * @param {Object} options - Fill options (timeout)
     * @throws {ElementNotInteractableError} If element cannot be filled
     */
    public async safeFill(locator: Locator, text: string, options?: { timeout?: number }): Promise<void> {
        const timeout = options?.timeout || 5000;

        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.fill(text, { timeout });
        } catch (_error) {
            throw new ElementNotInteractableError('fill', 'locator');
        }
    }

    /**
     * @method getTextContent
     * @description Get text content from an element with null safety
     * @param {string | Locator} selector - CSS selector or Playwright Locator
     * @param {Object} options - Options (timeout, required)
     * @returns {string} Text content (empty string if not found and not required)
     * @throws {TextContentError} If element not found and required is true
     */
    async getTextContent(selector: string | Locator, options?: { timeout?: number; required?: boolean }): Promise<string> {
        const timeout = options?.timeout || 5000;
        const required = options?.required ?? true;
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        const selectorStr = typeof selector === 'string' ? selector : 'locator';

        try {
            await locator.waitFor({ state: 'visible', timeout });
            const text = await locator.textContent({ timeout });
            return text || '';
        } catch (_error) {
            if (required) {
                throw new TextContentError(selectorStr);
            }
            return '';
        }
    }

    /**
     * @method safeSelectOption
     * @description Select an option from a dropdown
     * @param {Locator} locator - Playwright Locator
     * @param {string} value - Option value to select
     * @param {Object} options - Select options (timeout)
     * @throws {ElementNotInteractableError} If dropdown cannot be interacted with
     */
    public async safeSelectOption(locator: Locator, value: string, options?: { timeout?: number }): Promise<void> {
        const timeout = options?.timeout || 5000;
        const selectorStr = 'locator';

        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.selectOption(value, { timeout });
        } catch (_error) {
            throw new ElementNotInteractableError('select option', selectorStr);
        }
    }

    /**
     * @method waitForTextContains
     * @description Wait for element text to contain expected value using web-first assertions
     * @param {string | Locator} selector - CSS selector or Playwright Locator
     * @param {string} expectedText - Expected text to contain
     * @param {Object} options - Wait options (timeout)
     * @throws {TextContentError} If text doesn't contain expected value within timeout
     */
    async waitForTextContains(selector: string | Locator, expectedText: string, options?: { timeout?: number }): Promise<void> {
        const timeout = options?.timeout || 5000;
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        const selectorStr = typeof selector === 'string' ? selector : 'locator';

        try {
            await expect(locator).toContainText(expectedText, { timeout });
        } catch (_error) {
            const actualText = await locator.textContent().catch(() => '') || 'unknown';
            throw new TextContentError(selectorStr, expectedText, actualText);
        }
    }

    /**
     * @method waitForPageLoad
     * @description Wait for page to reach a specific load state
     * @param {string} state - Load state to wait for (default: 'domcontentloaded')
     * @param {number} timeout - Timeout in milliseconds (default: 30000)
     * @throws {NavigationError} If page doesn't reach load state within timeout
     */
    async waitForPageLoad(state: 'load' | 'domcontentloaded' = 'domcontentloaded', timeout: number = 30000): Promise<void> {
        try {
            await this.page.waitForLoadState(state, { timeout });
        } catch (_error) {
            throw new NavigationError(`page to reach ${state} state`);
        }
    }
}
