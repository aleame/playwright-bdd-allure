# 🎭Playwright BDD Allure🤖

## 📋 Overview
- **Frontend project using Playwright framework with BDD and Allure**
- **Webpage automated https://automationexercise.com/**
- **Using Page Object Model (POM) by flows**

## 💡 Technologies
- **🎭 Playwright**
- **🧩 Playwright-BDD**
- **📊 Allure Reports**
- **🥒 Cucumber**
- **🟦 TypeScript**
- **🟢 Node.js**

## 🎯 Prerequisites
- **Node.js 22+**
- **npm or yarn**

## 🛠️ Install
1. **Clone project and install deps:**
    ```bash
    npm install
    ```
2. **Install Playwright browsers (if using Playwright library):**
    ```bash
    npx playwright install
    ```
3. **Generate Playwright BDD files:**
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

## 📊 Reports

### ℹ️ We have two types of reports:
- **Allure report:** Rich visualization with dashboard and overview, advanced segmentation, report with screenshots and videos and more features.

- **Playwright report:** Simply HTML Reporter with screenshots and videos.

### ℹ️ How to open reports:

- **Allure report (recommended):**
```bash
npm run allure:serve
```

- **Playwright report (windows):**
```bash
npm run open:playwright:win
```

- **Playwright report (macos):**
```bash
npm run open:playwright:mac
```

## 📸 Sample report examples:

### 📈 Allure report:
- **Overview:**
![Overview](/images/01_Allure_Overview.png)

- **Dashboard:**
![Dashboard](/images/02_Allure_Dashboard.png)

- **Scenario:**
![Scenario](/images/03_Allure_Scenarion_error_attachments.png)

### 📉 Playwright Reporter:
- **Suite:**
![Overview](/images/01_Playwright_Full_Report.png)

- **Scenario:**
![Dashboard](/images/02_Playwright_Scenario.png)
