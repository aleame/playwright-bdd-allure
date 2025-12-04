// src/fixtures/pageFixtures.ts
import { test as base } from 'playwright-bdd';
import { LoginPage } from '@pages/login.page';
import { HomePage } from '@pages/home.page';
import { ProductsPage } from '@pages/products.page';
import { CheckoutPage } from '@pages/checkout.page';
import { ProductInfo } from '@support/interfaces';

type TestContext = {
  newAccountInfo: import("/home/alex/git/playwright-bdd-allure/src/support/interfaces").AccountInfo;
  addedProducts: ProductInfo[];
};

type PageFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productsPage: ProductsPage;
  checkoutPage: CheckoutPage;
  testContext: TestContext;
};

export const test = base.extend<PageFixtures>({
  testContext: async ({ }, use) => {
    const context: TestContext = {
      addedProducts: [],
      newAccountInfo: {
        gender: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        day_birth: '',
        month_birth: '',
        year_birth: '',
        company: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        mobile_phone: ''
      },
    };
    await use(context);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
