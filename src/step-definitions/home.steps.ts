import { createBdd } from 'playwright-bdd';
import { test } from '@fixtures/pageFixtures';
import { TestUsers, URLs, ValidationTexts } from '@data/test-data';
import * as allure from 'allure-js-commons';

const { Given, When, Then } = createBdd(test);

Given('The user has accessed the application homepage', async ({ homePage }) => {
    await homePage.navigateTo(URLs.BASE_URL);
    await homePage.verifyBrandsHeaderIsVisible();
    const pageTitle = await homePage.getTitle();
    test.expect(pageTitle).toEqual(ValidationTexts.HOME_PAGE_TITLE);
});

Given('The user logins with valid authentication credentials', async ({ homePage, loginPage }) => {
    await homePage.navigateTo(URLs.BASE_URL);
    await homePage.verifyBrandsHeaderIsVisible();
    await homePage.clickLoginSignup();
    const pageTitle = await homePage.getTitle();
    test.expect(pageTitle).toEqual(ValidationTexts.LOGIN_PAGE_TITLE);
    await loginPage.login(TestUsers.VALID.email, TestUsers.VALID.password);
    await allure.parameter('User Email', TestUsers.VALID.email);
    await loginPage.waitForPageLoad();
    await homePage.waitForLoggedInUserEmail(TestUsers.VALID.email);
    const loggedInUserText = await homePage.getLoggedInUserText();
    test.expect(loggedInUserText).toBeTruthy();
    test.expect(loggedInUserText, `Expected logged-in user to contain "${TestUsers.VALID.email}" but got "${loggedInUserText}"`).toContain(TestUsers.VALID.email);
});

When('the user logs out from the application', async ({ homePage }) => {
    await homePage.clickLogout();
});

Then('the browser should display user mail account in homepage', async ({ homePage }) => {
    await homePage.verifyLoggedInUserIsVisible();
    await homePage.waitForLoggedInUserEmail(TestUsers.VALID.email);
    const loggedInUserText = await homePage.getLoggedInUserText();
    test.expect(loggedInUserText).toBeTruthy();
    test.expect(loggedInUserText, `Expected logged-in user to contain "${TestUsers.VALID.email}" but got "${loggedInUserText}"`).toContain(TestUsers.VALID.email);
});

Then('the browser should display new user mail account in homepage', async ({ homePage, testContext }) => {
    await homePage.verifyLoggedInUserIsVisible();
    const loggedInUserText = await homePage.getLoggedInNewUserText();
    test.expect(loggedInUserText).toBeTruthy();
    test.expect(loggedInUserText, `Expected logged-in user to contain "${testContext.newAccountInfo.first_name}" but got "${loggedInUserText}"`).toContain(testContext.newAccountInfo.first_name);
});
