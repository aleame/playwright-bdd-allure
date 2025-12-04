import { createBdd } from 'playwright-bdd';
import { test } from '@fixtures/pageFixtures';
import { ValidationTexts, TestUsers } from '@data/test-data';

const { When, Then } = createBdd(test);

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
      validationMessage = await loginPage.elements.passwordInput().evaluate((el) => (el as HTMLInputElement).validationMessage);
      break;
    default:
      throw new Error(`Unknown field: ${field}`);
  }

  test.expect(validationMessage).toContain('Please fill out this field');
});

Then('the browser should display the login page again', async ({ page, loginPage }) => {
  test.expect(page.url()).toContain('/login');
  await test.expect(loginPage.elements.emailInput()).toBeVisible();
  await test.expect(loginPage.elements.passwordInput()).toBeVisible();
  await test.expect(loginPage.elements.loginButton()).toBeVisible();
});