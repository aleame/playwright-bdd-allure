import BasePage from './base.page';
import { HomeLocators } from '@locators';

export class HomePage extends BasePage {
    elements = {
        loginSignupButton: () => this.page.getByRole('link', { name: HomeLocators.LOGIN_SIGNUP_LINK }),
        logoutButton: () => this.page.getByRole('link', { name: HomeLocators.LOGOUT_LINK }),
        loggedInUser: () => this.page.locator(HomeLocators.LOGGED_IN_USER_STATUS),
        deleteAccountButton: () => this.page.getByRole('link', { name: HomeLocators.DELETE_ACCOUNT_LINK }),
        productsButton: () => this.page.getByRole('link', { name: HomeLocators.PRODUCTS_LINK }),
        cartButton: () => this.page.getByRole('link', { name: HomeLocators.CART_LINK }),
        featuresItemsHeader: () => this.page.getByRole('heading', { level: 2, name: HomeLocators.FEATURES_ITEMS_HEADER }),
    };

    async clickLoginSignup(): Promise<void> {
        await this.safeClick(this.elements.loginSignupButton());
    }

    async getLoggedInUserText(): Promise<string> {
        return await this.getTextContent(this.elements.loggedInUser(), {
            timeout: 10000,
            required: true
        });
    }

    async waitForLoggedInUser(expectedUser: string): Promise<void> {
        await this.waitForTextContains(
            this.elements.loggedInUser(),
            expectedUser,
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
        await this.waitForLocator(this.page.getByRole('heading', { name: HomeLocators.BRANDS_HEADER }), { state: 'visible' });
    }

    async clickLogout(): Promise<void> {
        await this.safeClick(this.elements.logoutButton());
        await this.waitForPageLoad('domcontentloaded');
    }

    async verifyHomePageIsLoaded(): Promise<void> {
        await this.waitForLocator(this.elements.featuresItemsHeader(), { state: 'visible' });
        await this.waitForLocator(this.elements.loginSignupButton(), { state: 'visible' });
    }

    async navigateToProducts(): Promise<void> {
        await this.safeClick(this.elements.productsButton());
    }

    async navigateToCart(): Promise<void> {
        await this.safeClick(this.elements.cartButton().first());
    }
}