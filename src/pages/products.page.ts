// src/pages/products.page.ts
import BasePage from "./base.page";
import { CommonLocators, ProductsLocators } from "@locators"

export class ProductsPage extends BasePage {
    elements = {
        productsHeader: () => this.page.locator(ProductsLocators.PRODUCTS_HEADER),
        womensProducts: () => this.page.locator(ProductsLocators.WOMENS_PRODUCTS),
        mensProducts: () => this.page.locator(ProductsLocators.MENS_PRODUCTS),
        kidsProducts: () => this.page.locator(ProductsLocators.KIDS_PRODUCTS),
        searchInput: () => this.page.locator(ProductsLocators.SEARCH_INPUT),
        searchButton: () => this.page.locator(ProductsLocators.SEARCH_BUTTON),
        noProductsFoundMessage: () => this.page.locator(ProductsLocators.NO_PRODUCTS_FOUND_MESSAGE),
        brandPolo: () => this.page.locator(ProductsLocators.BRAND_POLO),
        brandHM: () => this.page.locator(ProductsLocators.BRAND_HM),
        brandMadame: () => this.page.locator(ProductsLocators.BRAND_MADAME),
        brandMastHarbour: () => this.page.locator(ProductsLocators.BRAND_MAST_HARBOUR),
        brandBabyhug: () => this.page.locator(ProductsLocators.BRAND_BABYHUG),
        brandBiba: () => this.page.locator(ProductsLocators.BRAND_BIBA),
        brandAllenSollyJunior: () => this.page.locator(ProductsLocators.BRAND_ALLEN_SOLLY_JUNIOR),
        brandKookieKids: () => this.page.locator(ProductsLocators.BRAND_KOKIE_KIDS),
        productByLinkID: (productId: string) => this.page.locator(`a[href="/product_details/${productId}"]`),
        firstProductViewLink: () => this.page.locator(ProductsLocators.VIEW_PRODUCT_FIRST_LINK),
        productItems: () => this.page.locator('.col-sm-4:has(.product-image-wrapper)'),
        productWrappers: () => this.page.locator(ProductsLocators.PRODUCT_WRAPPER),
        viewProductLinks: () => this.page.locator(ProductsLocators.VIEW_PRODUCT_LINK),
        reviewsTab: () => this.page.locator(ProductsLocators.REVIEWS_TAB),
        productInformation: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION),
        productName: () => this.page.locator(ProductsLocators.PRODUCT_NAME),
        productPrice: () => this.page.locator(ProductsLocators.PRODUCT_PRICE),
        productCategory: () => this.page.locator(ProductsLocators.PRODUCT_CATEGORY),
        productAvailability: () => this.page.locator(ProductsLocators.PRODUCT_AVAILABILITY),
        productCondition: () => this.page.locator(ProductsLocators.PRODUCT_CONDITION),
        productBrand: () => this.page.locator(ProductsLocators.PRODUCT_BRAND),
        quantityInput: () => this.page.locator(ProductsLocators.QUANTITY_INPUT),
        addToCartButton: () => this.page.locator(ProductsLocators.ADD_TO_CART_BUTTON),
        productNameGrid: () => this.page.locator(ProductsLocators.PRODUCT_NAME_GRID),
        productPriceGrid: () => this.page.locator(ProductsLocators.PRODUCT_PRICE_GRID),
        addToCartButtonGrid: () => this.page.locator(ProductsLocators.ADD_TO_CART_BUTTON_GRID),
        infoHeader: () => this.page.locator(CommonLocators.INFO_HEADER)
    };

    async selectProductByName(productName: string): Promise<void> {
        // Encuentra el wrapper del producto que contiene el nombre
        const productWrapper = this.elements.productWrappers().filter({
            has: this.page.locator(ProductsLocators.PRODUCT_NAME_GRID, { hasText: productName })
        }).first();

        // Espera a que sea visible
        await productWrapper.waitFor({ state: 'visible' });

        // Encuentra y hace clic en el "View Product" de ese producto específico
        await productWrapper.locator(ProductsLocators.VIEW_PRODUCT_LINK).waitFor({ state: 'visible' });
        await productWrapper.locator(ProductsLocators.VIEW_PRODUCT_LINK).click();

        await this.page.waitForLoadState('networkidle');
    }

    // async addCartProductByName(productName: string): Promise<void> {
    //     // Encuentra el wrapper del producto que contiene el nombre
    //     const productWrapper = this.elements.productWrappers().filter({
    //         has: this.page.locator(ProductsLocators.PRODUCT_NAME_GRID, { hasText: productName })
    //     }).first();

    //     // Espera a que sea visible
    //     await productWrapper.waitFor({ state: 'visible' });

    //     // Encuentra y hace clic en el "View Product" de ese producto específico
    //     await productWrapper.locator(ProductsLocators.ADD_TO_CART_BUTTON).waitFor({ state: 'visible' });
    //     await productWrapper.locator(ProductsLocators.ADD_TO_CART_BUTTON).click();

    //     await this.page.waitForLoadState('networkidle');
    // }

    async getProductGridName(): Promise<string> {
        return await this.elements.productNameGrid().innerText();
    }

    async getProductNameList(): Promise<string[]> {
        const listProductName = await this.elements.productNameGrid().allTextContents();
        return listProductName
    }

    async getProductName(): Promise<string> {
        return await this.elements.productName().innerText();
    }

    async getProductPrice(): Promise<string> {
        return await this.elements.productPrice().innerText();
    }

    async getProductCategory(): Promise<string> {
        return await this.elements.productCategory().innerText();
    }

    async getProductAvailability(): Promise<string> {
        return await this.elements.productAvailability().innerText();
    }

    async getProductCondition(): Promise<string> {
        return await this.elements.productCondition().innerText();
    }

    async getProductBrand(): Promise<string> {
        return await this.elements.productBrand().innerText();
    }

    async setProductQuantity(quantity: number): Promise<void> {
        await this.elements.quantityInput().fill(quantity.toString());
    }

    async getProductsHeaderText(): Promise<string> {
        return await this.elements.productsHeader().innerText();
    }

    async clickFirstProduct(): Promise<void> {
        await this.elements.firstProductViewLink().scrollIntoViewIfNeeded();
        await this.elements.firstProductViewLink().click();
    }

    async clickProductById(productId: string): Promise<void> {
        await this.elements.productByLinkID(productId).scrollIntoViewIfNeeded();
        await this.elements.productByLinkID(productId).click();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.elements.searchInput().fill(productName);
        await this.elements.searchButton().click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifySearchedProductsHeaderIsVisible(): Promise<void> {
        await this.elements.infoHeader().waitFor({
            state: 'visible',
            timeout: 1000
        });
    }

    async getNumberOfDisplayedProducts(): Promise<number> {
        return await this.elements.productItems().count();
    }

    async verifyProductDetailsPageIsLoaded(): Promise<void> {
        await this.elements.reviewsTab().waitFor({ state: 'visible' });
        await this.elements.productInformation().waitFor({ state: 'visible' });
    }

    async verifyNoProductsFoundMessageIsVisible(): Promise<void> {
        await this.elements.noProductsFoundMessage().waitFor({ state: 'visible' });
    }

    async filterByBrand(brand: string): Promise<void> {
        switch (brand.toLowerCase()) {
            case 'polo':
                await this.elements.brandPolo().click();
                break;
            case 'h&m':
                await this.elements.brandHM().click();
                break;
            case 'madame':
                await this.elements.brandMadame().click();
                break;
            case 'mast & harbour':
                await this.elements.brandMastHarbour().click();
                break;
            case 'babyhug':
                await this.elements.brandBabyhug().click();
                break;
            case 'biba':
                await this.elements.brandBiba().click();
                break;
            case 'allen solly junior':
                await this.elements.brandAllenSollyJunior().click();
                break;
            case 'kookie kids':
                await this.elements.brandKookieKids().click();
                break;
            default:
                throw new Error(`Brand ${brand} not recognized`);
        }
    }

    async getNumberOfProductsAfterFilter(): Promise<number> {
        return await this.elements.productItems().count();
    }

    async verifyFilteredProductsByBrand(brand: string): Promise<void> {
        const productCount = await this.getNumberOfProductsAfterFilter();
        for (let i = 0; i < productCount; i++) {
            const productBrand = await this.elements.productItems().nth(i).locator(ProductsLocators.PRODUCT_BRAND).textContent();
            if (productBrand?.toLowerCase() !== brand.toLowerCase()) {
                throw new Error(`Product brand ${productBrand} does not match filter brand ${brand}`);
            }
        }
    }

    async clearBrandFilter(brand: string): Promise<void> {
        switch (brand.toLowerCase()) {
            case 'polo':
                await this.elements.brandPolo().click();
                break;
            case 'h&m':
                await this.elements.brandHM().click();
                break;
            case 'madame':
                await this.elements.brandMadame().click();
                break;
            case 'mast & harbour':
                await this.elements.brandMastHarbour().click();
                break;
            case 'babyhug':
                await this.elements.brandBabyhug().click();
                break;
            case 'biba':
                await this.elements.brandBiba().click();
                break;
            case 'allen solly junior':
                await this.elements.brandAllenSollyJunior().click();
                break;
            default:
                throw new Error(`Brand ${brand} not recognized`);
        }
    }

    async getTotalNumberOfProducts(): Promise<number> {
        return await this.elements.productItems().count();
    }
}