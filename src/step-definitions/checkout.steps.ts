import { createBdd } from 'playwright-bdd'
import { test, expect } from '@fixtures/pageFixtures'
import { DataTable } from '@cucumber/cucumber';

const { When } = createBdd(test);

When('the user searches for a product {string} and add to cart random product', async ({ }, productFilter: string) => {
    console.log("productFilter", productFilter);
});

When('the user searches for a product and add to cart random one', async ({ checkoutPage, productsPage, testContext }, dataTable: DataTable) => {
    console.log("DATA TABLE ROWS LENGTH", dataTable.rows().length);
    for (let index = 0; index < dataTable.rows().length; index++) {
        const element = dataTable.rows()[index];
        console.log("ELEMENT", element[0]);

        await productsPage.searchProduct(element[0]);
        const productInfo = await checkoutPage.selectAndAddRandomProductToCart();
        console.log(`Added product to cart: ${productInfo.name} (ID: ${productInfo.productId}) - ${productInfo.numericPrice}`);
        testContext.addedProducts.push(productInfo);
    }
});

When('the user proceed to checkout and verify total amount and products', async ({ page, homePage, checkoutPage, testContext }) => {
    await homePage.navigateToCart();
    await page.waitForLoadState('networkidle');
    await checkoutPage.navigateToProceedToCheckout();
    await page.waitForLoadState('networkidle');
    const cartProducts = await checkoutPage.getCartProducts();
    const totalAmount = await checkoutPage.getCartTotalAmount();

    console.log(`\n=== Cart Products ===`);
    cartProducts.forEach((product, index) => {
        console.log(`\nProduct ${index + 1}:`);
        console.log(`  Name: ${product.name}`);
        console.log(`  Category: ${product.category}`);
        console.log(`  Quantity: ${product.quantity}`);
        console.log(`  Price: ${product.price}`);
        console.log(`  Product ID: ${product.productId}`);
    });
    console.log(`\nTotal Amount: ${totalAmount}`);
    console.log(`===================\n`);
    console.log(`\n=== Verification ===`);
    console.log(`Products added in previous step: ${testContext.addedProducts.length}`);
    console.log(`Products found in cart: ${cartProducts.length}`);
    expect(cartProducts.length, `Expected ${testContext.addedProducts.length} products in cart`).toBe(testContext.addedProducts.length);
    let expectedTotal = 0;
    testContext.addedProducts.forEach((addedProduct: any) => {
        expectedTotal += addedProduct.numericPrice;
    });
    for (const addedProduct of testContext.addedProducts) {
        const cartProduct = cartProducts.find(cp => cp.productId === addedProduct.productId);
        expect(cartProduct, `Product ID ${addedProduct.productId} should be in cart`).toBeDefined();

        if (cartProduct) {
            console.log(`\nVerifying Product: ${addedProduct.name}`);
            expect(cartProduct.name, `Product name should match for ID ${addedProduct.productId}`).toBe(addedProduct.name);
            console.log(`  ✓ Name matches: "${cartProduct.name}"`);
            expect(cartProduct.numericPrice, `Product price should match for ${addedProduct.name}`).toBe(addedProduct.numericPrice);
            console.log(`  ✓ Price matches: ${cartProduct.price}`);
            expect(cartProduct.productId, `Product ID should match`).toBe(addedProduct.productId);
            console.log(`  ✓ Product ID matches: ${cartProduct.productId}`);
        }
    }

    const cartTotalNumeric = parseFloat(totalAmount.replace('Rs. ', '').trim());
    console.log(`\nTotal Amount Verification:`);
    console.log(`  Expected Total: Rs. ${expectedTotal}`);
    console.log(`  Cart Total: ${totalAmount}`);
    expect(cartTotalNumeric, `Cart total should match sum of all product prices`).toBe(expectedTotal);
    console.log(`  ✓ Total amount matches!`);
    console.log(`\n✅ All verifications passed!`);
    console.log(`===================\n`);
});

When('the user placer order with credit card', async ({ page, checkoutPage }) => {
    await checkoutPage.navigateToPlaceOrder();
    await page.waitForLoadState('networkidle');
    await checkoutPage.addCreditCard();
    await checkoutPage.navigateToPayment();
    await page.waitForLoadState('networkidle');
    await checkoutPage.verifyOrderPlacedHeaderIsVisible();
});