// src/pages/home.page.ts
import BasePage from './base.page';
import { HomeLocators, CommonLocators } from '@locators';

export class HomePage extends BasePage {
    elements = {
        loginSignupButton: () => this.page.locator(HomeLocators.LOGIN_PAGE_BUTTON),
        loggedInUser: () => this.page.locator(HomeLocators.LOGGED_IN_USER_OK),
        logoutButton: () => this.page.locator(HomeLocators.LOGOUT_BUTTON),
        deleteAccountButton: () => this.page.locator(HomeLocators.DELETE_ACCOUNT_BUTTON),
        productsButton: () => this.page.locator(HomeLocators.PRODUCTS_BUTTON),
        cartButton: () => this.page.locator(HomeLocators.VIEW_CART_BUTTON),
        infoHeader: () => this.page.locator(CommonLocators.INFO_HEADER),
        loggedInNewUser: () => this.page.locator(HomeLocators.LOGGED_IN_NEW_USER)
    };

    async clickLoginSignup(): Promise<void> {
        await this.elements.loginSignupButton().click();
    }

    async getLoggedInUserText(): Promise<string | null> {
        await this.elements.loggedInUser().waitFor({ state: 'visible' });
        // Wait for the element to have stable text content (not empty)
        await this.elements.loggedInUser().waitFor({
            state: 'visible',
            timeout: 10000
        });
        // Additional wait to ensure the text is fully loaded
        await this.page.waitForTimeout(500);
        return await this.elements.loggedInUser().textContent();
    }

    async getLoggedInNewUserText(): Promise<string | null> {
        await this.elements.loggedInNewUser().waitFor({ state: 'visible' });
        // Wait for the element to have stable text content (not empty)
        await this.elements.loggedInNewUser().waitFor({
            state: 'visible',
            timeout: 10000
        });
        // Additional wait to ensure the text is fully loaded
        await this.page.waitForTimeout(500);
        return await this.elements.loggedInNewUser().textContent();
    }

    async waitForLoggedInUserEmail(expectedEmail: string): Promise<void> {
        // Wait for the logged-in user element to be visible first
        await this.elements.loggedInUser().waitFor({
            state: 'visible',
            timeout: 15000
        });

        // Poll until the element text contains the expected email
        let attempts = 0;
        const maxAttempts = 30; // 15 seconds with 500ms intervals

        while (attempts < maxAttempts) {
            const text = await this.elements.loggedInUser().textContent();
            if (text && text.includes(expectedEmail)) {
                return; // Success!
            }
            await this.page.waitForTimeout(500);
            attempts++;
        }

        // If we get here, the email never appeared
        const finalText = await this.elements.loggedInUser().textContent();
        throw new Error(`Timeout waiting for logged-in user to contain "${expectedEmail}". Current text: "${finalText}"`);
    }

    async verifyLoggedInUserIsVisible(): Promise<void> {
        await this.elements.loggedInUser().waitFor({ state: 'visible' });
    }

    async verifyLogoutButtonIsVisible(): Promise<void> {
        await this.elements.logoutButton().waitFor({ state: 'visible' });
    }

    async clickDeleteAccount(): Promise<void> {
        await this.elements.deleteAccountButton().click();
    }

    async verifyBrandsHeaderIsVisible(): Promise<void> {
        await this.elements.infoHeader().first().waitFor({ state: 'visible' });
    }

    async clickLogout(): Promise<void> {
        await this.elements.logoutButton().waitFor({ state: 'visible' });
        await this.elements.logoutButton().click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyHomePageIsLoaded(): Promise<void> {
        await this.elements.infoHeader().waitFor({ state: 'visible' });
        await this.elements.loginSignupButton().waitFor({ state: 'visible' });
    }

    async navigateToProducts(): Promise<void> {
        await this.elements.productsButton().click();
    }

    async navigateToCart(): Promise<void> {
        await this.elements.cartButton().first().click();
    }
}