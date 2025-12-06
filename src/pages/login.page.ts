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
        await this.elements.signupLoginButton().click();
    }

    async login(email: string, password: string): Promise<void> {
        await this.elements.emailInput().waitFor({ state: 'visible' });
        await this.elements.emailInput().fill(email);

        await this.elements.loginPassword().waitFor({ state: 'visible' });
        await this.elements.loginPassword().fill(password);

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
        await this.elements.loginPassword().waitFor({ state: 'visible' });
        await this.elements.loginButton().waitFor({ state: 'visible' });
    }
    async signup(name: string, lastName: string, email: string,): Promise<void> {
        await this.elements.signupName().waitFor({ state: 'visible' });
        const fullName = `${name} ${lastName}`;
        await this.elements.signupName().fill(fullName);
        await this.elements.signupEmail().fill(email);
        await this.elements.signupButton().click();
    }

    async enterAccountInformation(accountInfo: AccountInfo): Promise<void> {
        if (accountInfo.gender === 'male') {
            await this.elements.genderMale().click();
        } else {
            await this.elements.genderFemale().click();
        }
        await this.elements.signupPassword().fill(accountInfo.password);
        await this.elements.dateDay().selectOption(accountInfo.day_birth);
        await this.elements.dateMonth().selectOption(accountInfo.month_birth);
        await this.elements.dateYear().selectOption(accountInfo.year_birth);
        await this.elements.firstName().fill(accountInfo.first_name);
        await this.elements.lastName().fill(accountInfo.last_name);
        await this.elements.company().fill(accountInfo.company);
        await this.elements.address().fill(accountInfo.address);
        await this.elements.country().selectOption(accountInfo.country);
        await this.elements.state().fill(accountInfo.state);
        await this.elements.city().fill(accountInfo.city);
        await this.elements.zipcode().fill(accountInfo.zipcode);
        await this.elements.mobilePhone().fill(accountInfo.mobile_phone);
        await this.elements.createAccountButton().click();
    }

    getCreateAccountSuccessHeader(): Promise<string | null> {
        return this.elements.infoHeader().textContent();
    }

    async clickContinueToHomeButton(): Promise<void> {
        await this.elements.continueButton().click();
    }

}