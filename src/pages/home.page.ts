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
        await this.safeClick(this.elements.loginSignupButton());
    }

    async getLoggedInUserText(): Promise<string> {
        return await this.getTextContent(HomeLocators.LOGGED_IN_USER_OK, {
            timeout: 10000,
            required: true
        });
    }

    async getLoggedInNewUserText(): Promise<string> {
        return await this.getTextContent(HomeLocators.LOGGED_IN_NEW_USER, {
            timeout: 10000,
            required: true
        });
    }

    async waitForLoggedInUserEmail(expectedEmail: string): Promise<void> {
        await this.waitForTextContains(
            HomeLocators.LOGGED_IN_USER_OK,
            expectedEmail,
            { timeout: 15000 }
        );
    }

    async verifyLoggedInUserIsVisible(): Promise<void> {
        await this.waitForLocator(this.elements.loggedInUser(), { state: 'visible' });
    }

    async verifyLogoutButtonIsVisible(): Promise<void> {
        await this.waitForLocator(this.elements.logoutButton(), { state: 'visible' });
    }

    async clickDeleteAccount(): Promise<void> {
        await this.safeClick(this.elements.deleteAccountButton());
    }

    async verifyBrandsHeaderIsVisible(): Promise<void> {
        await this.waitForLocator(this.elements.infoHeader().first(), { state: 'visible' });
    }

    async clickLogout(): Promise<void> {
        await this.safeClick(HomeLocators.LOGOUT_BUTTON);
        await this.waitForPageLoad('domcontentloaded');
    }

    async verifyHomePageIsLoaded(): Promise<void> {
        await this.waitForLocator(this.elements.infoHeader(), { state: 'visible' });
        await this.waitForLocator(this.elements.loginSignupButton(), { state: 'visible' });
    }

    async navigateToProducts(): Promise<void> {
        await this.safeClick(this.elements.productsButton());
    }

    async navigateToCart(): Promise<void> {
        await this.safeClick(this.elements.cartButton().first());
    }
}