import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';

dotenv.config();

const testDir = defineBddConfig({
  features: 'src/features/*.feature',
  steps: ['src/step-definitions/*.ts', 'src/fixtures/pageFixtures.ts']
});

export default defineConfig({
  testDir,
  outputDir: 'reports/test-results',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'reports/playwright' }],
    ['list'],
    ['allure-playwright', {
      resultsDir: 'reports/allure-results',
      suiteTitle: true,
      environmentInfo: {
        'Test Framework': 'Playwright + BDD',
        'Browser': 'Chromium',
      },
    }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.HEADLESS !== 'false',
    // headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ].filter(project => {
    if (process.env.BROWSER) {
      return project.name === process.env.BROWSER;
    }
    return project.name === 'chromium';
  }),

  timeout: parseInt(process.env.TIMEOUT || '30000'),
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT || '10000'),
  },
});
