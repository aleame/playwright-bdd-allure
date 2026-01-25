import { AccountInfo } from '@support/interfaces';
import BasePage from './base.page';
import { CommonLocators, LoginLocators } from '@locators';

export class LoginPage extends BasePage {
    elements = {
        signupLoginButton: () => this.page.getByRole('link', { name: LoginLocators.SIGNUP_LOGIN_BUTTON }),
        emailInput: () => this.page.getByRole('textbox', { name: LoginLocators.EMAIL_ADDRESS }).first(),
        loginPassword: () => this.page.getByRole('textbox', { name: LoginLocators.PASSWORD }).first(),
        loginButton: () => this.page.getByRole('button', { name: LoginLocators.LOGIN_BUTTON }),
        loginHeader: () => this.page.getByRole('heading', { name: LoginLocators.LOGIN_HEADER }),
        loginErrorMessage: () => this.page.getByRole('paragraph').filter({ hasText: LoginLocators.LOGIN_ERROR_MESSAGE }),
        signupName: () => this.page.getByRole('textbox', { name: LoginLocators.NAME }),
        signupEmail: () => this.page.getByRole('textbox', { name: LoginLocators.EMAIL_ADDRESS }).nth(1),
        signupPassword: () => this.page.getByRole('textbox', { name: LoginLocators.PASSWORD }),
        signupButton: () => this.page.getByRole('button', { name: LoginLocators.SIGNUP_BUTTON }),
        genderMale: () => this.page.getByRole('radio', { name: LoginLocators.GENDER_MALE }),
        genderFemale: () => this.page.getByRole('radio', { name: LoginLocators.GENDER_FEMALE }),
        dateDay: () => this.page.locator(LoginLocators.DATE_DAY),
        dateMonth: () => this.page.locator(LoginLocators.DATE_MONTH),
        dateYear: () => this.page.locator(LoginLocators.DATE_YEAR),
        firstName: () => this.page.getByRole('textbox', { name: LoginLocators.FIRST_NAME }),
        lastName: () => this.page.getByRole('textbox', { name: LoginLocators.LAST_NAME }),
        company: () => this.page.getByRole('textbox', { name: LoginLocators.COMPANY }).first(),
        address: () => this.page.getByRole('textbox', { name: LoginLocators.ADDRESS }).first(),
        country: () => this.page.getByRole('combobox', { name: LoginLocators.COUNTRY }),
        state: () => this.page.getByRole('textbox', { name: LoginLocators.STATE }),
        city: () => this.page.getByRole('textbox', { name: LoginLocators.CITY }),
        zipcode: () => this.page.locator(LoginLocators.ZIPCODE),
        mobilePhone: () => this.page.getByRole('textbox', { name: LoginLocators.MOBILE_NUMBER }),
        createAccountButton: () => this.page.getByRole('button', { name: LoginLocators.CREATE_ACCOUNT_BUTTON }),
        headerAccountCreated: () => this.page.getByRole('heading', { name: LoginLocators.HEADER_ACCOUNT_CREATED }),
        headerAccountDeleted: () => this.page.getByRole('heading', { name: LoginLocators.HEADER_ACCOUNT_DELETED }),
        continueButton: () => this.page.getByRole('link', { name: LoginLocators.CONTINUE_BUTTON }),
    };

    async navigateToLogin(): Promise<void> {
        await this.safeClick(this.elements.signupLoginButton());
    }

    async login(email: string, password: string): Promise<void> {
        await this.safeFill(this.elements.emailInput(), email);
        await this.safeFill(this.elements.loginPassword(), password);
        await this.safeClick(this.elements.loginButton());
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
        return await this.getTextContent(this.elements.headerAccountCreated(), {
            timeout: 5000,
            required: true
        });
    }

    async getDeleteAccountSuccessHeader(): Promise<string> {
        return await this.getTextContent(this.elements.headerAccountDeleted(), {
            timeout: 5000,
            required: true
        });
    }

    async clickContinueToHomeButton(): Promise<void> {
        await this.safeClick(this.elements.continueButton());
    }

}