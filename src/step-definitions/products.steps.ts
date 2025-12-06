import { createBdd } from 'playwright-bdd';
import { test } from '@fixtures/pageFixtures';
import { ValidationTexts } from '@data/test-data';
import { selectRandomProduct } from '@support/utils';

const { When, Then } = createBdd(test);

When('the user navigates to the products section', async ({ page, homePage }) => {
  await homePage.navigateToProducts();
  await page.waitForLoadState('networkidle');
});

Then('the browser should display the list of available products', async ({ page, productsPage }) => {
  const pageTitle = await page.title();
  test.expect(pageTitle).toEqual('Automation Exercise - All Products');
  const headerText = await productsPage.getProductsHeaderText();
  console.log(`Products Page Header: ${headerText}`);
  test.expect(headerText).toEqual(ValidationTexts.ALL_PRODUCTS_HEADER);
  const countLisOfProducts = await productsPage.getNumberOfDisplayedProducts();
  console.log(`Number of displayed products: ${countLisOfProducts}`);
  test.expect(countLisOfProducts).toBeGreaterThan(1);
});

Then('the user select the first product to view details', async ({ page, productsPage }) => {
  await productsPage.clickFirstProduct();
  test.expect(page.url()).toContain('/product_details/');
});

When('the browser should display detailed information about the selected product', async ({ productsPage }) => {
  await productsPage.verifyProductDetailsPageIsLoaded();
  const productName = await productsPage.getProductName();
  const productPrice = await productsPage.getProductPrice();
  const productBrand = await productsPage.getProductBrand();
  const productCategory = await productsPage.getProductCategory();
  test.expect(productName).not.toBeNull();
  test.expect(productPrice).not.toBeNull();
  test.expect(productBrand).not.toBeNull();
  test.expect(productCategory).not.toBeNull();
});

When('the user searches for a product with the name {string}', async ({ productsPage }, productFilter: string) => {
  await productsPage.searchProduct(productFilter);
  const countLisOfProducts = await productsPage.getNumberOfDisplayedProducts();
  await productsPage.verifySearchedProductsHeaderIsVisible();
  console.log(`Number of displayed products after search: ${countLisOfProducts}`);
});

Then('the browser should display search results related to {string}', async ({ productsPage }, productName: string) => {
  const productNameGrid = await productsPage.getProductGridName();
  test.expect(productNameGrid).toEqual(productName);
});

When('the user select the product {string} to view details', async ({ page, productsPage }, productName: string) => {
  await productsPage.selectProductByName(productName);
  await page.waitForLoadState('networkidle');
  await productsPage.verifyProductDetailsPageIsLoaded();
  const productNameSelected = await productsPage.getProductName();
  const productPrice = await productsPage.getProductPrice();
  const productBrand = await productsPage.getProductBrand();
  const productCategory = await productsPage.getProductCategory();
  test.expect(productName).not.toBeNull();
  test.expect(productPrice).not.toBeNull();
  test.expect(productBrand).not.toBeNull();
  test.expect(productCategory).not.toBeNull();
  test.expect(productName).toEqual(productNameSelected);
});

When('the user select a product brand {string}', async ({ page, productsPage }, brand: string) => {
  await productsPage.filterByBrand(brand);
  await page.waitForLoadState('networkidle');
});

When('the browser should display products list related to {string}', async ({ productsPage }, brand: string) => {
  const headerText = await productsPage.getProductsHeaderText();
  console.log(`Products Page Header: ${headerText}`);
  switch (brand) {
    case 'Polo':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_POLO_BRAND);
      break;
    case 'H&M':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_HM_BRAND);
      break;
    case 'Madame':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_MADAME_BRAND);
      break;
    case 'Mast & Harbour':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_MAST_HARBOUR_BRAND);
      break;
    case 'Babyhug':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_BABYHUG_BRAND);
      break;
    case 'Allen Solly Junior':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_ALLEN_SOLLY_JUNIOR_BRAND);
      break;
    case 'Kookie Kids':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_KOOKIE_KIDS_BRAND);
      break;
    case 'Biba':
      test.expect(headerText).toEqual(ValidationTexts.PRODUCTS_BIBA_BRAND);
      break;
    default:
      console.log(`Brand not found: ${brand}`);
      break;
  }
  const countLisOfProducts = await productsPage.getNumberOfDisplayedProducts();
  console.log(`Number of displayed products after search: ${countLisOfProducts}`);
  // const productNames = await productsPage.getProductNameList();
});

When('the user select a random product from list to view details', async ({ page, productsPage }) => {
  const productListNames = await productsPage.getProductNameList();
  const randomProduct = selectRandomProduct(productListNames);
  await productsPage.selectProductByName(randomProduct);
  await page.waitForLoadState('networkidle');
});

Then('the browser should display detailed information about the selected product by brand {string}', async ({ productsPage }, brand: string) => {
  await productsPage.verifyProductDetailsPageIsLoaded();
  const productNameSelected = await productsPage.getProductName();
  const productPrice = await productsPage.getProductPrice();
  const productBrand = await productsPage.getProductBrand();
  const productCategory = await productsPage.getProductCategory();
  test.expect(productNameSelected).not.toBeNull();
  test.expect(productPrice).not.toBeNull();
  test.expect(productBrand).not.toBeNull();
  test.expect(productCategory).not.toBeNull();
  test.expect(productBrand).toContain(brand);
});
