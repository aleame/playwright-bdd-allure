// src/pages/login.page.ts
import BasePage from './base.page';
import { LoginLocators } from '@locators';

export class LoginPage extends BasePage {
    elements = {
        signupLoginButton: () => this.page.locator(LoginLocators.SIGNUP_LOGIN_BUTTON),
        emailInput: () => this.page.locator(LoginLocators.EMAIL_INPUT),
        passwordInput: () => this.page.locator(LoginLocators.PASSWORD_INPUT),
        loginButton: () => this.page.locator(LoginLocators.LOGIN_BUTTON),
        loginHeader: () => this.page.locator(LoginLocators.LOGIN_HEADER),
        loginErrorMessage: () => this.page.locator(LoginLocators.LOGIN_ERROR_MESSAGE),
    };

    async navigateToLogin(): Promise<void> {
        await this.elements.signupLoginButton().click();
    }

    async login(email: string, password: string): Promise<void> {
        await this.elements.emailInput().waitFor({ state: 'visible' });
        await this.elements.emailInput().fill(email);

        await this.elements.passwordInput().waitFor({ state: 'visible' });
        await this.elements.passwordInput().fill(password);

        await this.elements.loginButton().waitFor({ state: 'visible' });
        await this.elements.loginButton().click();
    }

    async getLoginHeaderText(): Promise<string | null> {
        await this.elements.loginHeader().waitFor({ state: 'visible' });
        return await this.elements.loginHeader().textContent();
    }

    async getPageTitle(): Promise<string> {
        return await this.getTitle();
    }

    async verifyLoginHeaderIsVisible(): Promise<void> {
        await this.elements.loginHeader().waitFor({ state: 'visible' });
    }

    async getLoginErrorMessage(): Promise<string | null> {
        await this.elements.loginErrorMessage().waitFor({ state: 'visible' });
        return await this.elements.loginErrorMessage().textContent();
    }

    async verifyLoginPageIsVisible(): Promise<void> {
        await this.elements.emailInput().waitFor({ state: 'visible' });
        await this.elements.passwordInput().waitFor({ state: 'visible' });
        await this.elements.loginButton().waitFor({ state: 'visible' });
    }
}