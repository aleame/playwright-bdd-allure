import { createBdd } from 'playwright-bdd';
import { test } from '@fixtures/pageFixtures';
import { ValidationTexts, TestUsers, URLs } from '@data/test-data';
import { generateNewAccountInfo, saveUserCredentials } from '@support/utils';
import { AccountInfo } from '@support/interfaces';

const { Given, When, Then } = createBdd(test);

When('the user navigates to the authentication section', async ({ page, homePage, loginPage }) => {
  await homePage.clickLoginSignup();
  await loginPage.verifyLoginHeaderIsVisible();
  const pageTitle = await page.title();
  test.expect(pageTitle).toEqual(ValidationTexts.LOGIN_PAGE_TITLE);
});

When('the user provides valid authentication credentials', async ({ page, loginPage }) => {
  await loginPage.login(TestUsers.VALID.email, TestUsers.VALID.password);
  const pageTitle = await page.title();
  test.expect(pageTitle).toEqual(ValidationTexts.HOME_PAGE_TITLE);
});

Given('The user register new account and logins with valid authentication', async ({ page, homePage, loginPage }) => {
  await page.goto(URLs.BASE_URL);
  await homePage.verifyBrandsHeaderIsVisible();
  await homePage.clickLoginSignup();
  test.expect(page.url()).toContain('/login');
  await test.expect(loginPage.elements.emailInput()).toBeVisible();
  await test.expect(loginPage.elements.loginPassword()).toBeVisible();
  await test.expect(loginPage.elements.loginButton()).toBeVisible();
  const newAccountInfo: AccountInfo = generateNewAccountInfo();
  console.log(`\n 👤 New Account Information: `);
  console.log(newAccountInfo);
  saveUserCredentials(newAccountInfo.email, newAccountInfo.password);
  await loginPage.signup(newAccountInfo.first_name, newAccountInfo.last_name, newAccountInfo.email);
  await loginPage.enterAccountInformation(newAccountInfo);
  const headerText = await loginPage.getCreateAccountSuccessHeader();
  test.expect(headerText).toEqual(ValidationTexts.CREATE_ACCOUNT_HEADER);
  await loginPage.clickContinueToHomeButton();
  const homePageTitle = await page.title();
  test.expect(homePageTitle).toEqual(ValidationTexts.HOME_PAGE_TITLE);
});

When('the user provides invalid authentication credentials', async ({ loginPage }) => {
  await loginPage.login(TestUsers.INVALID.email, TestUsers.INVALID.password);
});

Then('the browser should display an authentication error message', async ({ loginPage }) => {
  const errorMessage = await loginPage.getLoginErrorMessage();
  test.expect(errorMessage).toEqual(ValidationTexts.LOGIN_ERROR_MESSAGE);
});

When('the user provides {string} authentication credentials with email {string} and password {string}', async ({ loginPage }, credentials: string, email: string, password: string) => {
  await loginPage.login(email, password);
});

Then('the browser should display a validation message on the {string} field', async ({ loginPage }, field: string) => {
  let validationMessage: string;

  switch (field) {
    case 'email':
      validationMessage = await loginPage.elements.emailInput().evaluate((el) => (el as HTMLInputElement).validationMessage);
      break;
    case 'password':
      validationMessage = await loginPage.elements.loginPassword().evaluate((el) => (el as HTMLInputElement).validationMessage);
      break;
    default:
      throw new Error(`Unknown field: ${field}`);
  }

  test.expect(validationMessage).toContain('Please fill out this field');
});

Then('the browser should display the login page again', async ({ page, loginPage }) => {
  test.expect(page.url()).toContain('/login');
  await test.expect(loginPage.elements.emailInput()).toBeVisible();
  await test.expect(loginPage.elements.loginPassword()).toBeVisible();
  await test.expect(loginPage.elements.loginButton()).toBeVisible();
});

When('the user provides new name and email address', async ({ loginPage, testContext }) => {
  const newAccountInfo: AccountInfo = generateNewAccountInfo();
  console.log(`\n 👤 New Account Information: `);
  console.log(newAccountInfo);
  testContext.newAccountInfo = newAccountInfo;
  saveUserCredentials(newAccountInfo.email, newAccountInfo.password);
  await loginPage.signup(newAccountInfo.first_name, newAccountInfo.last_name, newAccountInfo.email);
});

When('the user fills out the form with personal information', async ({ page, loginPage, testContext }) => {
  await loginPage.enterAccountInformation(testContext.newAccountInfo);
  const pageTitle = await page.title();
  test.expect(pageTitle).toEqual(ValidationTexts.CREATE_ACCOUNT_SUCCESS_MESSAGE);

});

When('the user validates the account creation', async ({ page, loginPage, testContext }) => {
  const headerText = await loginPage.getCreateAccountSuccessHeader();
  test.expect(headerText).toEqual(ValidationTexts.CREATE_ACCOUNT_HEADER);
  await loginPage.clickContinueToHomeButton();
  const homePageTitle = await page.title();
  test.expect(homePageTitle).toEqual(ValidationTexts.HOME_PAGE_TITLE);
});
