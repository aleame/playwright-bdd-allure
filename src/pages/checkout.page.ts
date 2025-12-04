import BasePage from "./base.page";
import { CheckoutLocators, CommonLocators } from "@locators";
import { ProductInfo } from "@support/interfaces";
import { creditCardData } from "@data/test-data";

export class CheckoutPage extends BasePage {
    elements = {
        productPrices: () => this.page.locator(CheckoutLocators.CART_PRICES),
        productQuantity: () => this.page.locator(CheckoutLocators.PRODUCT_QUANTITY),
        checkoutButton: () => this.page.locator(CheckoutLocators.CHECKOUT_BUTTON),
        proceedToCheckoutButton: () => this.page.locator(CheckoutLocators.PROCEED_TO_CHECKOUT_BUTTON),
        confirmOrderButton: () => this.page.locator(CheckoutLocators.CONFIRM_ORDER_BUTTON),
        paymentButton: () => this.page.locator(CheckoutLocators.PAYMENT_BUTTON),
        termsButton: () => this.page.locator(CheckoutLocators.TERMS_BUTTON),
        finalConfirmButton: () => this.page.locator(CheckoutLocators.FINAL_CONFIRM_BUTTON),
        productsElements: () => this.page.locator(CheckoutLocators.PRODUCT_ELEMENT),
        productsCardInfo: () => this.page.locator(CheckoutLocators.PRODUCTS_INFO),
        productPrice: () => this.page.locator(CheckoutLocators.PRODUCT_PRICE),
        productInfo: () => this.page.locator(CheckoutLocators.PRODUCT_INFO),
        productId: () => this.page.locator(CheckoutLocators.PRODUCT_ID),
        addToCartId: () => this.page.locator(CheckoutLocators.ADD_TO_CART_ID),
        addToCartButton: () => this.page.locator(CheckoutLocators.ADD_TO_CART_BUTTON),
        placeOrderButton: () => this.page.locator(CheckoutLocators.PLACE_ORDER_BUTTON),
        nameOnCard: () => this.page.locator(CheckoutLocators.NAME_ON_CARD),
        cardNumber: () => this.page.locator(CheckoutLocators.CARD_NUMBER),
        expiryMonth: () => this.page.locator(CheckoutLocators.EXPIRY_MONTH),
        expiryYear: () => this.page.locator(CheckoutLocators.EXPIRY_YEAR),
        cvv: () => this.page.locator(CheckoutLocators.CVV),
        cartTableRows: () => this.page.locator(CheckoutLocators.CART_TABLE_ROWS),
        cartProductName: () => this.page.locator(CheckoutLocators.CART_PRODUCT_NAME),
        cartProductCategory: () => this.page.locator(CheckoutLocators.CART_PRODUCT_CATEGORY),
        cartProductPrice: () => this.page.locator(CheckoutLocators.CART_PRODUCT_PRICE),
        cartProductQuantity: () => this.page.locator(CheckoutLocators.CART_PRODUCT_QUANTITY),
        cartProductTotal: () => this.page.locator(CheckoutLocators.CART_PRODUCT_TOTAL),
        cartTotalAmount: () => this.page.locator(CheckoutLocators.CART_TOTAL_AMOUNT),
        infoHeader: () => this.page.locator(CommonLocators.INFO_HEADER)
    };

    async getAllProducts() {
        return this.elements.productsCardInfo();
    }

    async selectAndAddRandomProductToCart(): Promise<ProductInfo> {
        const products = await this.getAllProducts();
        const productCount = await products.count();
        const randomIndex = Math.floor(Math.random() * productCount);
        const randomProduct = products.nth(randomIndex);
        const priceText = await randomProduct.locator(this.elements.productPrice()).textContent() || '';
        const name = await randomProduct.locator(this.elements.productInfo()).textContent() || '';
        const productId = await randomProduct.locator(this.elements.addToCartId()).first().getAttribute('data-product-id') || '';
        const numericPrice = parseFloat(priceText.replace('Rs. ', '').trim()) || 0;
        const productInfo: ProductInfo = {
            name: name.trim(),
            price: priceText.trim(),
            numericPrice: numericPrice,
            productId: productId
        };

        console.log("Selected Random Product Cart:", productInfo);
        await randomProduct.locator(this.elements.addToCartButton()).first().click();
        return productInfo;
    }

    async navigateToCheckout() {
        await this.elements.checkoutButton().first().click();
    }

    async navigateToProceedToCheckout() {
        await this.elements.proceedToCheckoutButton().click();
    }

    async navigateToPlaceOrder() {
        await this.elements.placeOrderButton().click();
    }

    async addCreditCard() {
        await this.elements.nameOnCard().fill(creditCardData.cardHolderName);
        await this.elements.cardNumber().fill(creditCardData.cardNumber);
        await this.elements.expiryMonth().fill(creditCardData.cardExpirationMonth);
        await this.elements.expiryYear().fill(creditCardData.cardExpirationYear);
        await this.elements.cvv().fill(creditCardData.cardCvc);
    }

    async navigateToPayment() {
        await this.elements.paymentButton().click();
    }

    async getCartProducts(): Promise<ProductInfo[]> {
        const cartProducts: ProductInfo[] = [];
        const rows = this.elements.cartTableRows();
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            const name = await row.locator('td.cart_description h4 a').textContent() || '';
            const category = await row.locator('td.cart_description p').textContent() || '';
            const priceText = await row.locator('td.cart_price p').textContent() || '';
            const quantity = await row.locator('td.cart_quantity button').textContent() || '';
            const totalText = await row.locator('td.cart_total p.cart_total_price').textContent() || '';
            const rowId = await row.getAttribute('id') || '';
            const productId = rowId.replace('product-', '');
            const numericPrice = parseFloat(priceText.replace('Rs. ', '').trim()) || 0;

            cartProducts.push({
                name: name.trim(),
                category: category.trim(),
                price: priceText.trim(),
                quantity: quantity.trim(),
                numericPrice: numericPrice,
                productId: productId
            });
        }

        return cartProducts;
    }

    async getCartTotalAmount(): Promise<string> {
        const totalText = await this.elements.cartTotalAmount().textContent() || '';
        return totalText.trim();
    }

    async verifyOrderPlacedHeaderIsVisible(): Promise<void> {
        await this.elements.infoHeader().waitFor({
            state: 'visible',
            timeout: 1000
        });
    }

};
