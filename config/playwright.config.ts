import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';

import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../envs/.env') });

const testDir = defineBddConfig({
  outputDir: '../.features-gen',
  featuresRoot: '..',
  features: '../src/features/*.feature',
  steps: ['../src/step-definitions/*.ts', '../src/fixtures/pageFixtures.ts', '../src/hooks/*.ts']
});

export default defineConfig({
  testDir,
  outputDir: path.resolve(__dirname, '../reports/test-results'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: path.resolve(__dirname, '../reports/playwright') }],
    ['list'],
    ['allure-playwright', {
      resultsDir: path.resolve(__dirname, '../reports/allure-results'),
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
    headless: process.env.HEADLESS !== 'true',
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
