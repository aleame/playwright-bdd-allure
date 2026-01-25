import BasePage from "./base.page";
import { CheckoutLocators, CommonLocators } from "@locators";
import { ProductInfo } from "@support/interfaces";
import { creditCardData } from "@data/test-data";

export class CheckoutPage extends BasePage {
    elements = {
        productQuantity: () => this.page.locator(CheckoutLocators.PRODUCT_QUANTITY),
        checkoutButton: () => this.page.getByRole('link', { name: CheckoutLocators.CHECKOUT_BUTTON }).first(),
        proceedToCheckoutButton: () => this.page.getByText(CheckoutLocators.PROCEED_TO_CHECKOUT),
        paymentButton: () => this.page.getByRole('button', { name: CheckoutLocators.PAYMENT_BUTTON }),
        productsCardInfo: () => this.page.locator(CheckoutLocators.PRODUCTS_CARD_INFO),
        productPrice: () => this.page.locator(CheckoutLocators.PRODUCT_PRICE),
        productInfo: () => this.page.locator(CheckoutLocators.PRODUCT_INFO),
        productId: () => this.page.locator(CheckoutLocators.PRODUCT_ID),
        addToCartId: () => this.page.locator(CheckoutLocators.ADD_TO_CART_ID),
        addToCartButton: () => this.page.locator(CheckoutLocators.ADD_TO_CART_BUTTON),
        placeOrderButton: () => this.page.getByRole('link', { name: CheckoutLocators.PLACE_ORDER }),
        nameOnCard: () => this.page.locator(CheckoutLocators.NAME_ON_CARD),
        cardNumber: () => this.page.locator(CheckoutLocators.CARD_NUMBER),
        expiryMonth: () => this.page.locator(CheckoutLocators.EXPIRY_MONTH),
        expiryYear: () => this.page.locator(CheckoutLocators.EXPIRY_YEAR),
        cvv: () => this.page.locator(CheckoutLocators.CVV),
        cartTableRows: () => this.page.locator(CheckoutLocators.CART_TABLE_ROW),
        cartProductName: () => this.page.locator(CheckoutLocators.CART_PRODUCT_NAME),
        cartProductCategory: () => this.page.locator(CheckoutLocators.CART_PRODUCT_DESCRIPTION),
        cartProductPrice: () => this.page.locator(CheckoutLocators.CART_PRODUCT_PRICE),
        cartProductQuantity: () => this.page.locator(CheckoutLocators.CART_PRODUCT_QUANTITY),
        cartProductTotal: () => this.page.locator(CheckoutLocators.CART_PRODUCT_TOTAL),
        cartTotalAmount: () => this.page.locator(CheckoutLocators.CART_PRODUCT_TOTAL_AMOUNT),
        infoHeader: () => this.page.getByRole('heading', { name: CheckoutLocators.INFO_HEADER_ORDER_PLACED })
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

        console.warn("Selected Random Product Cart:", productInfo);
        await this.safeClick(randomProduct.locator(this.elements.addToCartButton()).first());
        return productInfo;
    }

    async navigateToCheckout() {
        await this.safeClick(this.elements.checkoutButton().first());
    }

    async navigateToProceedToCheckout() {
        await this.safeClick(this.elements.proceedToCheckoutButton());
    }

    async navigateToPlaceOrder() {
        await this.safeClick(this.elements.placeOrderButton());
    }

    async addCreditCard() {
        await this.safeFill(this.elements.nameOnCard(), creditCardData.cardHolderName);
        await this.safeFill(this.elements.cardNumber(), creditCardData.cardNumber);
        await this.safeFill(this.elements.expiryMonth(), creditCardData.cardExpirationMonth);
        await this.safeFill(this.elements.expiryYear(), creditCardData.cardExpirationYear);
        await this.safeFill(this.elements.cvv(), creditCardData.cardCvc);
    }

    async navigateToPayment() {
        await this.safeClick(this.elements.paymentButton());
    }

    async getCartProducts(): Promise<ProductInfo[]> {
        const cartProducts: ProductInfo[] = [];
        const rows = this.elements.cartTableRows();
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            const name = await row.locator(CheckoutLocators.CART_PRODUCT_NAME).textContent() || '';
            const category = await row.locator(CheckoutLocators.CART_PRODUCT_DESCRIPTION).textContent() || '';
            const priceText = await row.locator(CheckoutLocators.CART_PRODUCT_PRICE).textContent() || '';
            const quantity = await row.locator(CheckoutLocators.CART_PRODUCT_QUANTITY).textContent() || '';
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
        await this.waitForLocator(this.elements.infoHeader(), {
            state: 'visible',
            timeout: 1000
        });
    }

};
