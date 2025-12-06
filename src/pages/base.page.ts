import { Page, Locator } from 'playwright';
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
     * @param {string} url - URL to navigate to
     * @throws {NavigationError} If navigation fails
     */
    async navigateTo(url: string) {
        try {
            await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        } catch (_error) {
            throw new NavigationError(url);
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
     * @method takeScreenshot
     * @description Take a screenshot
     * @param {string} name - Screenshot filename
     */
    async takeScreenshot(name: string) {
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
    async waitForLocator(
        locator: Locator,
        options?: { state?: 'visible' | 'hidden' | 'attached'; timeout?: number }
    ): Promise<void> {
        const state = options?.state || 'visible';
        const timeout = options?.timeout || 5000;

        try {
            await locator.waitFor({ state, timeout });
        } catch (_error) {
            const selector = await locator.evaluate(el => {
                const getSelector = (element: Element): string => {
                    if (element.id) {
                        return `#${element.id}`;
                    }
                    if (element.className) {
                        return `.${element.className.split(' ')[0]}`;
                    }
                    return element.tagName.toLowerCase();
                };
                return getSelector(el);
            }).catch(() => 'unknown selector');
            throw new TimeoutError(`locator to be ${state}`, selector, timeout);
        }
    }

    /**
     * @method safeClick
     * @description Safely click an element with auto-wait and error handling
     * @param {string | Locator} selector - CSS selector or Playwright Locator
     * @param {Object} options - Click options (timeout)
     * @throws {ElementNotInteractableError} If element cannot be clicked
     */
    async safeClick(
        selector: string | Locator,
        options?: { timeout?: number }
    ): Promise<void> {
        const timeout = options?.timeout || 5000;
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        const selectorStr = typeof selector === 'string' ? selector : 'locator';

        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.click({ timeout });
        } catch (_error) {
            throw new ElementNotInteractableError('click', selectorStr);
        }
    }

    /**
     * @method safeFill
     * @description Safely fill an input field with validation
     * @param {string | Locator} selector - CSS selector or Playwright Locator
     * @param {string} value - Value to fill
     * @param {Object} options - Fill options (timeout)
     * @throws {ElementNotInteractableError} If element cannot be filled
     */
    async safeFill(
        selector: string | Locator,
        value: string,
        options?: { timeout?: number }
    ): Promise<void> {
        const timeout = options?.timeout || 5000;
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        const selectorStr = typeof selector === 'string' ? selector : 'locator';

        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.fill(value, { timeout });
        } catch (_error) {
            throw new ElementNotInteractableError('fill', selectorStr);
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
    async getTextContent(
        selector: string | Locator,
        options?: { timeout?: number; required?: boolean }
    ): Promise<string> {
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
     * @method selectOption
     * @description Select an option from a dropdown
     * @param {string | Locator} selector - CSS selector or Playwright Locator
     * @param {string} value - Option value to select
     * @param {Object} options - Select options (timeout)
     * @throws {ElementNotInteractableError} If dropdown cannot be interacted with
     */
    async selectOption(
        selector: string | Locator,
        value: string,
        options?: { timeout?: number }
    ): Promise<void> {
        const timeout = options?.timeout || 5000;
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        const selectorStr = typeof selector === 'string' ? selector : 'locator';

        try {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.selectOption(value, { timeout });
        } catch (_error) {
            throw new ElementNotInteractableError('select option', selectorStr);
        }
    }

    /**
     * @method waitForTextContains
     * @description Wait for element text to contain expected value
     * @param {string | Locator} selector - CSS selector or Playwright Locator
     * @param {string} expectedText - Expected text to contain
     * @param {Object} options - Wait options (timeout)
     * @throws {TextContentError} If text doesn't contain expected value within timeout
     */
    async waitForTextContains(
        selector: string | Locator,
        expectedText: string,
        options?: { timeout?: number }
    ): Promise<void> {
        const timeout = options?.timeout || 5000;
        const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
        const selectorStr = typeof selector === 'string' ? selector : 'locator';
        const startTime = Date.now();

        try {
            await locator.waitFor({ state: 'visible', timeout });

            while (Date.now() - startTime < timeout) {
                const text = await locator.textContent();
                if (text && text.includes(expectedText)) {
                    return;
                }
                // eslint-disable-next-line playwright/no-wait-for-timeout
                await this.page.waitForTimeout(100); // Polling interval for text content check
            }

            const finalText = await locator.textContent();
            throw new TextContentError(selectorStr, expectedText, finalText ?? '');
        } catch (error) {
            if (error instanceof TextContentError) {
                throw error;
            }
            const finalText = await locator.textContent().catch(() => '') ?? '';
            throw new TextContentError(selectorStr, expectedText, finalText);
        }
    }

    /**
     * @method waitForPageLoad
     * @description Wait for page to reach a specific load state (replaces deprecated networkidle)
     * @param {string} state - Load state to wait for (default: 'domcontentloaded')
     * @param {number} timeout - Timeout in milliseconds (default: 30000)
     * @throws {NavigationError} If page doesn't reach load state within timeout
     */
    async waitForPageLoad(
        state: 'load' | 'domcontentloaded' = 'domcontentloaded',
        timeout: number = 30000
    ): Promise<void> {
        try {
            await this.page.waitForLoadState(state, { timeout });
        } catch (_error) {
            throw new NavigationError(`page to reach ${state} state`);
        }
    }
};
