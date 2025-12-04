export enum HomeLocators {
    BRANDS_HEADER = 'h2:has-text("Brands")',
    DELETE_ACCOUNT_BUTTON = 'a[href="/delete_account"]',
    LOGIN_PAGE_BUTTON = 'a[href="/login"]',
    LOGGED_IN_USER_OK = 'ul.nav.navbar-nav > li > a:has-text("Logged in as")',
    LOGOUT_BUTTON = 'a[href="/logout"]',
    PRODUCTS_BUTTON = 'a[href="/products"]',
    VIEW_CART_BUTTON = 'a[href="/view_cart"]',
    LOGGED_IN_NEW_USER = 'a:has(i.fa-user) b',
};
