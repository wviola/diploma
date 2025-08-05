import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config()

export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
      environmentInfo: {
        NODE_VERSION: process.version,
        OS: process.platform,
      },
    }],
  ],
  use: {
    baseURL: process.env.UI_BASE_URL || "",
    trace: 'on-first-retry',
    storageState: {
      cookies: [],
      origins: []
    },
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
