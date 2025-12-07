# 🎭Playwright BDD Allure🤖

## 📋 Overview
This is a **modern end-to-end test automation framework** combining Playwright's powerful browser automation with Behavior-Driven Development (BDD) practices and comprehensive Allure reporting.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/aleame/playwright-bdd-allure)

## 💡 Technologies
- **🎭 [Playwright](https://playwright.dev/)**
- **🧩 [Playwright-BDD](https://vitalets.github.io/playwright-bdd/)**
- **📊 [Allure Reports](https://allurereport.org/docs/)**
- **🥒 [Cucumber](https://cucumber.io/)**
- **🟦 [TypeScript](https://www.typescriptlang.org/)**
- **🧪 [Faker.js](https://fakerjs.dev/)**
- **🟢 [Node.js](https://nodejs.org/)**

### 🎯 Project Highlights
- **🌐 Target Application:** [AutomationExercise.com](https://automationexercise.com/) - E-commerce testing playground
- **🏗️ Architecture:** Page Object Model (POM) organized by user flows for maximum maintainability
- **📝 BDD Approach:** Human-readable Gherkin scenarios for better collaboration between technical and non-technical stakeholders
- **📊 Dual Reporting:** Rich Allure reports with detailed analytics + Playwright HTML reports
- **🔧 Type-Safe:** Full TypeScript implementation for better IDE support and fewer runtime errors
- **🎲 Dynamic Data:** Faker.js integration for realistic test data generation

### ✅ Test Coverage
- **User authentication (login/logout)**
- **Product browsing and search**
- **Shopping cart operations**
- **Checkout flow**
- **User account creation**


## 📂 Project Structure
```
playwright-bdd-allure/
├── src/
│   ├── data/                    # Test data and user credentials
│   │   ├── test-data.ts
│   │   └── user-credentials.txt
│   ├── features/                # Gherkin feature files (BDD scenarios)
│   │   ├── 00_Home.feature
│   │   ├── 01_Login.feature
│   │   ├── 02_Products.feature
│   │   └── 03_Shop.feature
│   ├── fixtures/                # Playwright fixtures for dependency injection
│   │   └── pageFixtures.ts
│   ├── locators/                # Page element locators (centralized)
│   │   ├── checkout.locator.ts
│   │   ├── common.locators.ts
│   │   ├── home.locators.ts
│   │   ├── login.locators.ts
│   │   ├── products.locators.ts
│   │   └── index.ts
│   ├── pages/                   # Page Object Model (POM) classes
│   │   ├── base.page.ts
│   │   ├── checkout.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   └── products.page.ts
│   ├── Schema/                  # TypeScript schemas/interfaces
│   │   └── AccountInfoSchema.ts
│   ├── step-definitions/        # Cucumber step implementations
│   │   ├── checkout.steps.ts
│   │   ├── home.steps.ts
│   │   ├── login.steps.ts
│   │   └── products.steps.ts
│   └── support/                 # Utility functions and interfaces
│       ├── interfaces.ts
│       └── utils.ts
├── envs/                        # Environment configuration files
├── images/                      # Report screenshots for documentation
├── .features-gen/               # Auto-generated Playwright test files
├── reports/                     # Generated test reports (Playwright & Allure)
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies and scripts
├── CHANGELOG.md                 # Project changelog
└── README.md                    # Project documentation
```

### 🗂️ Key Directories
- **`src/features/`** - Contains all BDD feature files written in Gherkin syntax
- **`src/pages/`** - Page Object Model classes for each page/flow
- **`src/locators/`** - Centralized element locators for maintainability
- **`src/step-definitions/`** - Implementation of Cucumber steps using Playwright-BDD decorators
- **`src/fixtures/`** - Custom Playwright fixtures for page objects and shared state
- **`reports/`** - Generated Allure and Playwright HTML reports

## 🏁 Prerequisites
- **Node.js 22+**
- **npm or yarn**

## 🛠️ Install
1. Clone project and install deps:
    ```bash
    npm install
    ```
2. Install Playwright browsers (if using Playwright library):
    ```bash
    npx playwright install
    ```
3. Generate Playwright BDD files:
    ```bash
    npm run bddgen
    ```

## 📦 Example package.json scripts
```json
{
  "scripts": {
    "bddgen": "playwright-bdd generate",
    "test:products": "playwright test --grep @products",
    "test:shop:allure": "npm run clean:allure && playwright test --grep @shop && npm run allure:generate",
    "test:allure": "npm run clean:allure && playwright test && npm run allure:generate"
  }
}
```

## 🥒 Example feature (features/login.feature)
```gherkin
Feature: Login
  Scenario: 01 - Login User with correct email and password
    Given The user has accessed the application homepage
    When the user navigates to the authentication section
    And the user provides valid authentication credentials
    Then the browser should display user mail account in homepage
```

## 🚀 Running tests
- Run all tests **with allure report**:
```bash
npm run test:allure
```
- Run products tests **without allure** report:
```bash
npm run test:products
```

- To run with firefox browser **add firefox** to run command:
```bash
npm run test:products:firefox
```

- To run headed mode **add headed** to run command:
```bash
npm run test:products:headed
```


## 🐳 Run with Docker
You can run the tests inside a Docker container to ensure a consistent environment.

1. **Build and Run tests:**
    ```bash
    docker compose up --build
    ```
    This command will build the image and run the tests. The results will be saved in the `reports/allure-results` directory.
    
    > **Note:** The Allure HTML report is not generated inside the container to keep the image light. You can generate it locally using the results:
    ```bash
    npm run allure:serve
    ```

2. **Run manually:**
    If you prefer to run specific commands inside the container:
    ```bash
    docker compose run playwright-tests npx playwright test --grep @login
    ```

3. **Environment Variables:**
    The configuration uses the `.env` file if present. Ensure your `.env` file is configured correctly before running.

## 📊 Reports

### ℹ️ This project has two types of reports
- **Allure report:** Rich visualization with dashboard and overview, advanced segmentation, report with screenshots and videos and more features.

- **Playwright report:** Simply HTML Reporter with screenshots and videos. This report is generated by default on all tests.

### ℹ️ How to open reports

- Allure report (recommended):
```bash
npm run allure:serve
```

- Playwright report:
```bash
npm run open:playwright
```

## 📸 Report examples

### 📈 Allure report
- Overview:
![Overview](/images/01_Allure_Overview.png)

- Dashboard:
![Dashboard](/images/02_Allure_Dashboard.png)

- Scenario:
![Scenario](/images/03_Allure_Scenarion_error_attachments.png)

### 📉 Playwright Reporter
- Suite:
![Overview](/images/01_Playwright_Full_Report.png)

- Scenario:
![Dashboard](/images/02_Playwright_Scenario.png)
