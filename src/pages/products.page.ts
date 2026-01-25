import BasePage from "./base.page";
import { CommonLocators, ProductsLocators } from "@locators"

export class ProductsPage extends BasePage {
    elements = {
        productsHeader: () => this.page.getByRole('heading', { name: ProductsLocators.PRODUCTS_HEADER }),
        brandProductsHeader: () => this.page.getByRole('heading', { name: /Brand - .* Products/ }),
        womensProducts: () => this.page.getByRole('link', { name: ProductsLocators.WOMENS_PRODUCTS, exact: true }),
        mensProducts: () => this.page.getByRole('link', { name: ProductsLocators.MENS_PRODUCTS, exact: true }),
        kidsProducts: () => this.page.getByRole('link', { name: ProductsLocators.KIDS_PRODUCTS, exact: true }),
        searchInput: () => this.page.getByRole('textbox', { name: ProductsLocators.SEARCH_INPUT }),
        searchButton: () => this.page.locator(ProductsLocators.SEARCH_BUTTON),
        noProductsFoundMessage: () => this.page.getByText(ProductsLocators.NO_PRODUCTS_FOUND_MESSAGE),
        brandPolo: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_POLO }),
        brandHM: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_HM }),
        brandMadame: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_MADAME }),
        brandMastHarbour: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_MAST_HARBOUR }),
        brandBabyhug: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_BABYHUG }),
        brandBiba: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_BIBA }),
        brandAllenSollyJunior: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_ALLEN_SOLLY_JUNIOR }),
        brandKookieKids: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_KOOKIE_KIDS }),
        productByLinkID: (productId: string) => this.page.locator(`a[href="/product_details/${productId}"]`),
        firstProductViewLink: () => this.page.getByRole('link', { name: ProductsLocators.VIEW_PRODUCT }).first(),
        productItems: () => this.page.locator(ProductsLocators.PRODUCT_ITEMS),
        productWrappers: () => this.page.locator(ProductsLocators.PRODUCT_IMAGE_WRAPPER),
        viewProductLinks: () => this.page.getByRole('link', { name: ProductsLocators.VIEW_PRODUCT }),
        reviewsTab: () => this.page.getByRole('link', { name: ProductsLocators.WRITE_REVIEW_TAB }),
        productInformation: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION),
        productName: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_NAME),
        productPrice: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_PRICE),
        productCategory: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_CATEGORY),
        productAvailability: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_AVAILABILITY),
        productCondition: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_CONDITION),
        productBrand: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_BRAND),
        quantityInput: () => this.page.getByRole('spinbutton', { name: ProductsLocators.QUANTITY_INPUT }),
        addToCartButton: () => this.page.getByRole('button', { name: ProductsLocators.ADD_TO_CART_BUTTON }),
        productNameGrid: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_NAME_GRID),
        productPriceGrid: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_PRICE_GRID),
        addToCartButtonGrid: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_ADD_TO_CART_GRID),
        searchedProductsHeader: () => this.page.getByRole('heading', { name: ProductsLocators.SEARCHED_PRODUCTS_HEADER }),
    };

    async selectProductByName(productName: string): Promise<void> {
        const productWrapper = this.elements.productWrappers().filter({
            has: this.page.locator(ProductsLocators.PRODUCT_INFORMATION_NAME_GRID, { hasText: productName })
        }).first();
        await this.waitForLocator(productWrapper, { state: 'visible' });
        await this.waitForLocator(productWrapper.locator('a[href^="/product_details/"]'), { state: 'visible' });
        await this.safeClick(productWrapper.locator('a[href^="/product_details/"]'));
        await this.waitForPageLoad('domcontentloaded');
    }

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

    getBrandProductsHeaderText(): Promise<string> {
        return this.elements.brandProductsHeader().innerText();
    }

    async clickFirstProduct(): Promise<void> {
        await this.scrollToElement('a[href="/product_details/1"]');
        await this.safeClick(this.elements.firstProductViewLink());
    }

    async clickProductById(productId: string): Promise<void> {
        const productLink = this.elements.productByLinkID(productId);
        await this.scrollToElement(`a[href="/product_details/${productId}"]`);
        await this.safeClick(productLink);
    }

    async searchProduct(productName: string): Promise<void> {
        await this.safeFill(this.elements.searchInput(), productName);
        await this.safeClick(this.elements.searchButton());
        await this.waitForPageLoad('domcontentloaded');
    }

    async verifySearchedProductsHeaderIsVisible(): Promise<void> {
        await this.waitForLocator(this.elements.searchedProductsHeader(), {
            state: 'visible',
            timeout: 1000
        });
    }

    async getNumberOfDisplayedProducts(): Promise<number> {
        return await this.elements.productItems().count();
    }

    async verifyProductDetailsPageIsLoaded(): Promise<void> {
        await this.waitForLocator(this.elements.reviewsTab(), { state: 'visible' });
        await this.waitForLocator(this.elements.productInformation(), { state: 'visible' });
    }

    async verifyNoProductsFoundMessageIsVisible(): Promise<void> {
        await this.waitForLocator(this.elements.noProductsFoundMessage(), { state: 'visible' });
    }

    async filterByBrand(brand: string): Promise<void> {
        switch (brand.toLowerCase()) {
            case 'polo':
                await this.safeClick(this.elements.brandPolo());
                break;
            case 'h&m':
                await this.safeClick(this.elements.brandHM());
                break;
            case 'madame':
                await this.safeClick(this.elements.brandMadame());
                break;
            case 'mast & harbour':
                await this.safeClick(this.elements.brandMastHarbour());
                break;
            case 'babyhug':
                await this.safeClick(this.elements.brandBabyhug());
                break;
            case 'biba':
                await this.safeClick(this.elements.brandBiba());
                break;
            case 'allen solly junior':
                await this.safeClick(this.elements.brandAllenSollyJunior());
                break;
            case 'kookie kids':
                await this.safeClick(this.elements.brandKookieKids());
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
            const productBrand = await this.elements.productItems().nth(i).locator('.product-information p:has-text("Brand:")').textContent();
            if (productBrand?.toLowerCase() !== brand.toLowerCase()) {
                throw new Error(`Product brand ${productBrand} does not match filter brand ${brand}`);
            }
        }
    }

    async clearBrandFilter(brand: string): Promise<void> {
        switch (brand.toLowerCase()) {
            case 'polo':
                await this.safeClick(this.elements.brandPolo());
                break;
            case 'h&m':
                await this.safeClick(this.elements.brandHM());
                break;
            case 'madame':
                await this.safeClick(this.elements.brandMadame());
                break;
            case 'mast & harbour':
                await this.safeClick(this.elements.brandMastHarbour());
                break;
            case 'babyhug':
                await this.safeClick(this.elements.brandBabyhug());
                break;
            case 'biba':
                await this.safeClick(this.elements.brandBiba());
                break;
            case 'allen solly junior':
                await this.safeClick(this.elements.brandAllenSollyJunior());
                break;
            default:
                throw new Error(`Brand ${brand} not recognized`);
        }
    }

    async getTotalNumberOfProducts(): Promise<number> {
        return await this.elements.productItems().count();
    }
}