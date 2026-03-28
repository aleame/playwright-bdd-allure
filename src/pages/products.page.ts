import BasePage from "./base.page";
import { ProductsLocators } from "@locators"

export class ProductsPage extends BasePage {
    elements = {
        productsHeader: () => this.page.getByRole('heading', { name: ProductsLocators.ALL_PRODUCTS_HEADER }),
        brandProductsHeader: () => this.page.getByRole('heading', { name: /Brand - .* Products/ }),
        womensProducts: () => this.page.getByRole('link', { name: ProductsLocators.WOMENS_PRODUCTS_LINK, exact: true }),
        mensProducts: () => this.page.getByRole('link', { name: ProductsLocators.MENS_PRODUCTS_LINK, exact: true }),
        kidsProducts: () => this.page.getByRole('link', { name: ProductsLocators.KIDS_PRODUCTS_LINK, exact: true }),
        searchInput: () => this.page.getByRole('textbox', { name: ProductsLocators.SEARCH_INPUT_PLACEHOLDER }),
        searchButton: () => this.page.locator(ProductsLocators.SEARCH_BUTTON_CSS),
        noProductsFoundMessage: () => this.page.getByText(ProductsLocators.NO_PRODUCTS_FOUND_MESSAGE),
        brandPolo: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_POLO_LINK }),
        brandHM: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_HM_LINK }),
        brandMadame: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_MADAME_LINK }),
        brandMastHarbour: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_MAST_HARBOUR_LINK }),
        brandBabyhug: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_BABYHUG_LINK }),
        brandBiba: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_BIBA_LINK }),
        brandAllenSollyJunior: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_ALLEN_SOLLY_JUNIOR_LINK }),
        brandKookieKids: () => this.page.getByRole('link', { name: ProductsLocators.BRAND_KOOKIE_KIDS_LINK }),
        productByLinkID: (productId: string) => this.page.locator(`a[href="/product_details/${productId}"]`),
        firstProductViewLink: () => this.page.getByRole('link', { name: ProductsLocators.VIEW_PRODUCT_LINK }).first(),
        productItems: () => this.page.locator(ProductsLocators.PRODUCT_ITEMS_CSS),
        productWrappers: () => this.page.locator(ProductsLocators.PRODUCT_IMAGE_WRAPPER_CSS),
        viewProductLinks: () => this.page.getByRole('link', { name: ProductsLocators.VIEW_PRODUCT_LINK }),
        reviewsTab: () => this.page.getByRole('link', { name: ProductsLocators.WRITE_REVIEW_TAB_LINK }),
        productInformation: () => this.page.locator(ProductsLocators.PRODUCT_INFORMATION_CSS),
        productName: () => this.page.locator(ProductsLocators.PRODUCT_NAME_CSS),
        productPrice: () => this.page.locator(ProductsLocators.PRODUCT_PRICE_CSS),
        productCategory: () => this.page.locator(ProductsLocators.PRODUCT_CATEGORY_CSS),
        productAvailability: () => this.page.locator(ProductsLocators.PRODUCT_AVAILABILITY_CSS),
        productCondition: () => this.page.locator(ProductsLocators.PRODUCT_CONDITION_CSS),
        productBrand: () => this.page.locator(ProductsLocators.PRODUCT_BRAND_CSS),
        quantityInput: () => this.page.getByRole('spinbutton', { name: ProductsLocators.QUANTITY_INPUT_NAME }),
        addToCartButton: () => this.page.getByRole('button', { name: ProductsLocators.ADD_TO_CART_BUTTON }),
        productNameGrid: () => this.page.locator(ProductsLocators.PRODUCT_NAME_GRID_CSS),
        productPriceGrid: () => this.page.locator(ProductsLocators.PRODUCT_PRICE_GRID_CSS),
        addToCartButtonGrid: () => this.page.locator(ProductsLocators.PRODUCT_ADD_TO_CART_GRID_CSS),
        searchedProductsHeader: () => this.page.getByRole('heading', { name: ProductsLocators.SEARCHED_PRODUCTS_HEADER }),
    };

    async selectProductByName(productName: string): Promise<void> {
        const productWrapper = this.elements.productWrappers().filter({
            has: this.page.locator(ProductsLocators.PRODUCT_NAME_GRID_CSS, { hasText: productName })
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