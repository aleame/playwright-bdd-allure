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
- **🐳 [Docker](https://www.docker.com/)**
- **🤖 [Github Actions](https://github.com/features/actions)**
- **🌐 [Netlify](https://www.netlify.com/)**

### 🎯 Project Highlights
- **🌐 Target Application:** [AutomationExercise.com](https://automationexercise.com/) - E-commerce testing playground
- **🏗️ Architecture:** Page Object Model (POM) organized by user flows for maximum maintainability
- **📝 BDD Approach:** Human-readable Gherkin scenarios for better collaboration between technical and non-technical stakeholders
- **📊 Dual Reporting:** Rich Allure reports with detailed analytics + Playwright HTML reports
- **🔧 Type-Safe:** Full TypeScript implementation for better IDE support and fewer runtime errors
- **🎲 Dynamic Data:** Faker.js integration for realistic test data generation
- **🐳 Docker:** Containerized environment for consistent testing
- **🤖 CI/CD:** Automated testing and deployment using GitHub Actions and Netlify to publish reports

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
│   ├── hooks/                   # Global hooks
│   │   └── global.hooks.ts
│   ├── pages/                   # Page Object Model (POM) classes
│   │   ├── base.page.ts
│   │   ├── checkout.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   └── products.page.ts
│   ├── schema/                  # TypeScript schemas/interfaces
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
├── docker/                      # Docker configuration files
│   ├── docker-compose.yml       
│   └── Dockerfile
├── scripts/                     # Custom scripts
│   └── test-runner.ts           # Test runner script
├── config/                      # Configuration files
│   ├── eslint.config.mjs        
│   └── playwright.config.ts     
├── .github/
│   └── workflows/               # GitHub Actions configuration files
│       ├── docker-publish.yml   
│       └── playwright-test.yml  
├── images/                      # Report screenshots for documentation
├── .features-gen/               # Auto-generated Playwright test files
├── reports/                     # Generated test reports (Playwright & Allure)
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

## 📋 Prerequisites
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
4. Install Allure commandline:
    ```bash
    npm install -g allure-commandline --save-dev
    ```

## 📦 Example package.json scripts
```json
{
  "scripts": {
    "bddgen": "playwright-bdd generate",
    "test": "npm run test:runner",
    "test:headed": "npm run test:runner -- --headed",
    "test:firefox": "npm run test:runner -- --browser firefox",
    "test:products": "npm run test:runner -- --grep @products",
    "allure:open": "allure open reports/allure-report"
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

## 🏁 Running tests
By default, all test commands include **Allure report generation**.

- **Test runner help 🛟**:
```bash
npm run test:runner -- --help
```

- **Run all tests**:
```bash
npm run test
```

- **Run specific suite (e.g., products)**:
```bash
npm run test:products
```

- **Run with specific options** (pass arguments after `--`):
```bash
# Run products tests on Firefox
npm run test:products -- --browser firefox

# Run tests in headed mode
npm run test:products -- --headed

# Run without generating Allure report
npm run test:products -- --no-allure
```

- **Run with multiple options** (pass arguments after `--`):
```bash
npm run test:products -- --browser firefox --headed --no-allure
```

## 🐳 Run with Docker

You can run the tests inside a Docker container to ensure a consistent environment.

1. **Build and Run tests:**
    Before running, navigate to the `docker` directory or point to the file:
    ```bash
    docker compose -f docker/docker-compose.yml up --build
    ```
    This command will run the tests and generate the Allure report inside the container. The results will be saved in `reports/allure-results` and the report in `reports/allure-report`.
    
    > **Note:** Since the report is generated inside the container, you can view it by opening `reports/allure-report/index.html` in your browser (though some browsers may block local files) or running:
    ```bash
    npm run allure:open
    ```

2. **Run specific tests:**
    You can override the default command to run specific features or tags. The container needs to process the test and then generate the report.
    
    *   **Run by Tag (e.g., @login):**
        ```bash
        docker compose -f docker/docker-compose.yml run --rm playwright-tests bash -c 'npm run clean:allure; npx playwright test --grep @login; npm run allure:generate'
        ```
    
    *   **Run by Feature File:**
        ```bash
        docker compose -f docker/docker-compose.yml run --rm playwright-tests bash -c 'npm run clean:allure; npx playwright test src/features/01_Login.feature; npm run allure:generate'
        ```

    > **Note:** The `bash -c "..."` pattern is used to chain the test execution and report generation commands together.

3. **Environment Variables:**
    The configuration uses the `.env` file if present. Ensure your `.env` file is configured correctly before running.

## 🚀 CI/CD Pipeline

This project is configured to automatically test and deploy reports using **GitHub Actions** and **Netlify**.

### 🔄 Integration Features
- **Automated Testing**: Runs `chromium` and `firefox` tests on every push.
- **History Preservation**: Keeps Allure report history across builds.
- **Secure Deployment**: Publishes a static website with the test results.

### ⚙️ Configuration (For Forks)
To enable this pipeline in your own repository:
1.  **Netlify**: Create a site and get your `NETLIFY_SITE_ID` and `NETLIFY_AUTH_TOKEN`.
2.  **GitHub Secrets**: Add these as repository secrets in Settings > Secrets and variables > Actions.
3.  **Push**: The `playwright-tests.yml` workflow will handle the rest.

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

- Behaviors:
![Behaviors](/images/03_Allure_Behaviors.png)

- Scenario:
![Scenario](/images/04_Allure_Scenarion_error_attachments.png)

### 📉 Playwright Reporter
- Suite:
![Overview](/images/01_Playwright_Full_Report.png)

- Scenario:
![Dashboard](/images/02_Playwright_Scenario.png)
