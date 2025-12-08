# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.7] - 2025-12-08

### Added
- Docker support: Added `Dockerfile`, `docker-compose.yml`, and `.dockerignore`.
- CI/CD: Added GitHub Actions workflow `.github/workflows/docker-publish.yml` to build and push Docker images.
- Allure support in Docker: Installed Java and Allure in Docker image to enable report generation.

## [1.0.6] - 2025-12-06

### Changed
- Customized Allure report hierarchy to use Feature name as Parent Suite

## [1.0.5] - 2025-12-06

### Added
- Added `getUrl()` method to `BasePage` for retrieving current page URL
- Added explicit return type `Promise<string>` to `getTitle()` method in `BasePage` for better type safety

### Changed
- **Major refactoring**: Updated all step definition files to use `BasePage` utility methods instead of direct Playwright `Page` API calls
  - Refactored `checkout.steps.ts` to use `waitForPageLoad()` instead of `page.waitForLoadState()`
  - Refactored `home.steps.ts` to use `navigateTo()`, `getTitle()`, and `waitForPageLoad()` instead of direct `page` methods
  - Refactored `products.steps.ts` to use `getTitle()`, `getUrl()`, and `waitForPageLoad()` instead of direct `page` methods
  - Refactored `login.steps.ts` to use `navigateTo()`, `getTitle()`, and `getUrl()` instead of direct `page` methods
- Removed unnecessary `page` fixture dependencies from step definitions where `BasePage` methods are now used

### Improved
- Enhanced consistency across all step definitions by standardizing on `BasePage` utility methods
- Improved error handling in step definitions by leveraging custom error types from `BasePage`
- Moved away from deprecated `'networkidle'` wait state to recommended `'domcontentloaded'` state
- Better maintainability through centralized page interaction logic in `BasePage`

## [1.0.4] - 2025-12-06

### Changed
- **Major refactoring**: Updated all page object classes to use `BasePage` utility methods for improved error handling and consistency
  - Refactored `LoginPage` to use `safeClick()`, `safeFill()`, `selectOption()`, `getTextContent()`, and `waitForLocator()`
  - Refactored `HomePage` to use `safeClick()` and `waitForLocator()` for all element interactions
  - Refactored `ProductsPage` to use `safeClick()`, `safeFill()`, `waitForLocator()`, `scrollToElement()`, and `waitForPageLoad()`
  - Refactored `CheckoutPage` to use `safeClick()`, `safeFill()`, and `waitForLocator()`
- Updated `base.page.ts` `waitForElement()` method to use `locator.waitFor()` instead of deprecated `page.waitForSelector()` for Playwright best practices compliance

### Fixed
- Fixed ESLint warning in `base.page.ts` by replacing `page.waitForSelector()` with modern `locator.waitFor()` API
- Fixed TypeScript errors in `CheckoutPage` by properly calling `this.safeClick()` instead of calling on Locator objects
- Changed `console.log()` to `console.warn()` in `CheckoutPage` to comply with ESLint rules

### Improved
- Enhanced error handling across all page objects with custom error types (`ElementNotInteractableError`, `TextContentError`, `TimeoutError`)
- Improved null safety in text content retrieval methods
- Standardized timeout handling across all page interactions
- Better auto-waiting behavior for element interactions reducing test flakiness

## [1.0.3] - 2025-12-06

### Added
- Added utility methods to `base.page.ts` for common page interactions:
  - `waitForElement()` - Wait for element with configurable timeout
  - `isElementVisible()` - Check element visibility
  - `takeScreenshot()` - Capture screenshots with custom names
  - `scrollToElement()` - Scroll element into view
- Added test artifacts and OS files to `.gitignore` (test-results, playwright-report, blob-report, downloads, .DS_Store, Thumbs.db)

### Changed
- Improved page navigation performance by using `domcontentloaded` wait strategy in `base.page.ts`
- Updated `@cucumber/cucumber` from 12.2.0 to 12.3.0
- Updated `allure-playwright` from 3.4.2 to 3.4.3

### Removed
- Removed unnecessary `waitForTimeout()` calls from `home.page.ts` for better performance and reliability:
  - Removed from `getLoggedInUser()` method
  - Removed from `getLoggedInNewUser()` method
  - Removed from `verifyLoggedInUser()` method
- Removed unused `cartAddRandomProduct()` function from `utils.ts`

## [1.0.2] - 2025-12-05

### Added
- Added ESLint configuration with TypeScript and Playwright support (`eslint.config.mjs`)
- Added ESLint VSCode extension recommendation to `.vscode/extensions.json`
- Added npm scripts for linting: `lint` and `lint:fix`
- Added ESLint dependencies: `@eslint/js`, `eslint`, `eslint-plugin-playwright`, and `typescript-eslint`
- Added VSCode workspace recommendations for Playwright and Cucumber extensions in `.vscode/extensions.json`
- Added agent rules file `.agent/rules/deny-commands.md` for controlling dangerous shell commands
- Added comprehensive project structure documentation to README
- Added GitHub repository badge to README
- Added detailed test coverage section to README
- Added key directories explanation to README

### Changed
- Improved type safety by removing `any` type annotation in `checkout.steps.ts`
- Enhanced string concatenation using template literals in `login.page.ts`
- Reorganized dependencies in `package.json` for better alphabetical ordering
- Improved code quality across multiple files based on ESLint recommendations
- **Major README overhaul**: Restructured and enhanced documentation with better organization and visual hierarchy
  - Improved overview section with project highlights and architecture description
  - Added detailed project structure diagram with directory explanations
  - Enhanced installation instructions with clearer formatting
  - Improved report sections with better categorization
  - Updated formatting throughout for better readability
- Renamed `src/Schema/` directory to `src/schema/` for consistent lowercase naming convention
- Cleaned up `.gitignore` by removing `package-lock.json` entry

### Fixed
- Removed unused variable `totalText` in `checkout.page.ts`
- Removed unused parameter `testContext` from `login.steps.ts`
- Removed unused import `URLs` from `products.steps.ts`
- Removed extra blank lines for cleaner code formatting
- Commented out unused variable `productNames` in `products.steps.ts`
- Added missing null check for `productNameSelected` in `products.steps.ts`

## [1.0.1] - 2025-12-04

### Added
- Added JSDoc comments to `generateNewAccountInfo` function in `utils.ts` for better code documentation
- Added new `Given` step "The user register new account and logins with valid authentication" in `login.steps.ts` for combined registration and login flow
- Added `saveUserCredentials` function in `utils.ts` to persist generated user credentials to file
- Created `user-credentials.txt` file in `src/data/` to store generated test account credentials with timestamps
- Integrated credential saving into registration step definitions for tracking created test accounts

### Changed
- Removed comments from all class files for cleaner, more maintainable code
- Simplified `open:playwright` script to use `npx playwright show-report` instead of platform-specific commands
- Updated README to include Faker.js in the tech stack
- Updated README Playwright report instructions to use the simplified cross-platform `open:playwright` command
- Updated Shop feature background to use new registration and login step instead of simple login
- Enhanced console logging for new account information with emoji prefix for better visibility

## [1.0.0] - 2025-12-04

### Added
- Initial release of Playwright-BDD with Allure reporting integration
- Comprehensive test suite for automation exercise website
- Support for multiple browsers (Chromium, Firefox)
- Allure reporting with custom parameters and attachments
- Environment-based configuration using `.env` files
- Path aliases for cleaner imports (`@pages`, `@locators`, `@step-definitions`, `@support`, `@fixtures`)
- Faker.js integration for generating test data
- Custom fixtures for sharing state between test steps
- Comprehensive test scripts for different scenarios (login, logout, home, products, shop, signup)
- Support for headed and headless test execution
- Centralized reports directory structure

### Changed
- Refactored step definitions to use decorator-based syntax
- Consolidated all test outputs into `reports` directory
- Improved TypeScript configuration for better type safety

### Fixed
- Gender type mismatch in `generateNewAccountInfo` function
- Email assertion reliability in login tests
- Product information sharing between test steps
- Allure parameter reporting in test steps
- Browser selection configuration to run on single browser at a time
- Service worker registration issues in README preview

### Security
- Added `.env` to `.gitignore` to prevent credential exposure
- Created `.env.example` as template for environment variables

## Project Structure

```
playwright-bdd-allure/
├── src/
│   ├── features/          # Gherkin feature files
│   ├── step-definitions/  # BDD step implementations
│   ├── pages/             # Page Object Model classes
│   ├── locators/          # Element locators
│   ├── support/           # Utility functions and helpers
│   └── fixtures/          # Custom Playwright fixtures
├── reports/
│   ├── allure-results/    # Raw Allure test results
│   ├── allure-report/     # Generated Allure HTML reports
│   └── playwright/        # Playwright HTML reports
├── envs/                  # Environment configuration files
└── .features-gen/         # Auto-generated Playwright test files
```

## Dependencies

### Core
- `@playwright/test`: ^1.57.0
- `playwright-bdd`: ^8.4.2
- `allure-playwright`: ^3.4.2

### Utilities
- `@faker-js/faker`: ^10.1.0
- `dotenv`: ^17.2.3
- `typescript`: ^5.9.3

## Available Scripts

### Test Execution
- `npm test` - Run all tests
- `npm run test:headed` - Run tests in headed mode
- `npm run test:chromium` - Run tests on Chromium
- `npm run test:firefox` - Run tests on Firefox

### Test Suites
- `npm run test:login` - Run login tests
- `npm run test:logout` - Run logout tests
- `npm run test:home` - Run home page tests
- `npm run test:products` - Run product tests
- `npm run test:shop` - Run shopping tests
- `npm run test:singup` - Run signup tests

### Allure Reporting
- `npm run test:allure` - Run tests and generate Allure report
- `npm run allure:serve` - Serve Allure results
- `npm run allure:generate` - Generate Allure HTML report
- `npm run allure:open` - Open generated Allure report

### Cleanup
- `npm run clean:allure` - Remove Allure reports
- `npm run clean:playwright` - Remove Playwright reports
- `npm run clean:all` - Remove all reports

## Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:
- `BASE_URL` - Application base URL
- `BROWSER` - Browser selection (chromium/firefox)
- Test user credentials
- Reporting directories

### TypeScript Path Aliases
- `@pages/*` → `src/pages/*`
- `@locators/*` → `src/locators/*`
- `@step-definitions/*` → `src/step-definitions/*`
- `@support/*` → `src/support/*`
- `@fixtures/*` → `src/fixtures/*`

## License

ISC

## Author

Alejandro Amerisse
