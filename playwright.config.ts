import { defineConfig, devices } from "@playwright/test";

const applicationOrigin = process.env.ORIGIN ?? "http://localhost:3000";
const applicationBasePath = process.env.BASE_PATH ?? "";
const browserSlowMotionMilliseconds = process.env.CI ? 0 : 1000;

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: "./tests/browser/temporary",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    // {
    //   name: "Google Chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },
  ],
  reporter: [["html", { open: "never", outputFolder: "./tests/browser/temporary" }]],
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests/browser",
  testMatch: "**/*.spec.ts",
  use: {
    baseURL: applicationOrigin + "/" + applicationBasePath,
    launchOptions: { slowMo: browserSlowMotionMilliseconds },
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run start",
    reuseExistingServer: !process.env.CI,
    timeout: 5000,
    url: applicationOrigin + "/" + applicationBasePath,
  },
});
