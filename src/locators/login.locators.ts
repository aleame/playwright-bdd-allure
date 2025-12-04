export enum LoginLocators {
    SIGNUP_LOGIN_BUTTON = 'text=Signup / Login',
    LOGIN_HEADER = 'h2:has-text("Login to your account")',
    EMAIL_INPUT = 'input[data-qa="login-email"]',
    PASSWORD_INPUT = 'input[data-qa="login-password"]',
    LOGIN_BUTTON = 'button[data-qa="login-button"]',
    LOGIN_ERROR_MESSAGE = 'p:has-text("Your email or password is incorrect!")'
};
