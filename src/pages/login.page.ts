import { AccountInfo } from '@support/interfaces';
import BasePage from './base.page';
import { CommonLocators, LoginLocators } from '@locators';

export class LoginPage extends BasePage {
    elements = {
        signupLoginButton: () => this.page.locator(LoginLocators.SIGNUP_LOGIN_BUTTON),
        emailInput: () => this.page.locator(LoginLocators.EMAIL_INPUT),
        loginPassword: () => this.page.locator(LoginLocators.PASSWORD_INPUT),
        loginButton: () => this.page.locator(LoginLocators.LOGIN_BUTTON),
        loginHeader: () => this.page.locator(LoginLocators.LOGIN_HEADER),
        loginErrorMessage: () => this.page.locator(LoginLocators.LOGIN_ERROR_MESSAGE),
        signupName: () => this.page.locator(LoginLocators.SIGNUP_NAME),
        signupEmail: () => this.page.locator(LoginLocators.SIGNUP_EMAIL),
        signupPassword: () => this.page.locator(LoginLocators.SIGNUP_PASSWORD),
        signupButton: () => this.page.locator(LoginLocators.SIGNUP_BUTTON),
        genderMale: () => this.page.locator(LoginLocators.GENDER_MALE),
        genderFemale: () => this.page.locator(LoginLocators.GENDER_FEMALE),
        dateDay: () => this.page.locator(LoginLocators.DATE_DAY),
        dateMonth: () => this.page.locator(LoginLocators.DATE_MONTH),
        dateYear: () => this.page.locator(LoginLocators.DATE_YEAR),
        firstName: () => this.page.locator(LoginLocators.FIRST_NAME),
        lastName: () => this.page.locator(LoginLocators.LAST_NAME),
        company: () => this.page.locator(LoginLocators.COMPANY),
        address: () => this.page.locator(LoginLocators.ADDRESS),
        country: () => this.page.locator(LoginLocators.COUNTRY),
        state: () => this.page.locator(LoginLocators.STATE),
        city: () => this.page.locator(LoginLocators.CITY),
        zipcode: () => this.page.locator(LoginLocators.ZIPCODE),
        mobilePhone: () => this.page.locator(LoginLocators.MOBILE_PHONE),
        createAccountButton: () => this.page.locator(LoginLocators.CREATE_ACCOUNT_BUTTON),
        infoHeader: () => this.page.locator(CommonLocators.INFO_HEADER),
        continueButton: () => this.page.locator(LoginLocators.CONTINUE_BUTTON)
    };

    async navigateToLogin(): Promise<void> {
        await this.safeClick(this.elements.signupLoginButton());
    }

    async login(email: string, password: string): Promise<void> {
        await this.safeFill(LoginLocators.EMAIL_INPUT, email);
        await this.safeFill(LoginLocators.PASSWORD_INPUT, password);
        await this.safeClick(LoginLocators.LOGIN_BUTTON);
    }

    async getLoginHeaderText(): Promise<string> {
        return await this.getTextContent(this.elements.loginHeader(), {
            timeout: 5000,
            required: true
        });
    }

    async getPageTitle(): Promise<string> {
        return await this.getTitle();
    }

    async verifyLoginHeaderIsVisible(): Promise<void> {
        await this.elements.loginHeader().waitFor({ state: 'visible' });
    }

    async getLoginErrorMessage(): Promise<string> {
        return await this.getTextContent(this.elements.loginErrorMessage(), {
            timeout: 5000,
            required: true
        });
    }

    async verifyLoginPageIsVisible(): Promise<void> {
        await this.waitForLocator(this.elements.emailInput(), { state: 'visible' });
        await this.waitForLocator(this.elements.loginPassword(), { state: 'visible' });
        await this.waitForLocator(this.elements.loginButton(), { state: 'visible' });
    }
    async signup(name: string, lastName: string, email: string,): Promise<void> {
        await this.waitForLocator(this.elements.signupName(), { state: 'visible' });
        const fullName = `${name} ${lastName}`;
        await this.safeFill(this.elements.signupName(), fullName);
        await this.safeFill(this.elements.signupEmail(), email);
        await this.safeClick(this.elements.signupButton());
    }

    async enterAccountInformation(accountInfo: AccountInfo): Promise<void> {
        if (accountInfo.gender === 'male') {
            await this.safeClick(this.elements.genderMale());
        } else {
            await this.safeClick(this.elements.genderFemale());
        }
        await this.safeFill(this.elements.signupPassword(), accountInfo.password);
        await this.selectOption(this.elements.dateDay(), accountInfo.day_birth);
        await this.selectOption(this.elements.dateMonth(), accountInfo.month_birth);
        await this.selectOption(this.elements.dateYear(), accountInfo.year_birth);
        await this.safeFill(this.elements.firstName(), accountInfo.first_name);
        await this.safeFill(this.elements.lastName(), accountInfo.last_name);
        await this.safeFill(this.elements.company(), accountInfo.company);
        await this.safeFill(this.elements.address(), accountInfo.address);
        await this.selectOption(this.elements.country(), accountInfo.country);
        await this.safeFill(this.elements.state(), accountInfo.state);
        await this.safeFill(this.elements.city(), accountInfo.city);
        await this.safeFill(this.elements.zipcode(), accountInfo.zipcode);
        await this.safeFill(this.elements.mobilePhone(), accountInfo.mobile_phone);
        await this.safeClick(this.elements.createAccountButton());
    }

    async getCreateAccountSuccessHeader(): Promise<string> {
        return await this.getTextContent(this.elements.infoHeader(), {
            timeout: 5000,
            required: true
        });
    }

    async clickContinueToHomeButton(): Promise<void> {
        await this.safeClick(this.elements.continueButton());
    }

}