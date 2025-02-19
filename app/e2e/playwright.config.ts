import { PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    /* Used for saving login state for users and organizers */
    globalSetup: require.resolve('./common/global/test-setup.ts'),
    testDir: './tests',
    /* Maximum time one test can run for. */
    timeout: 60 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
    },
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 3 : 0,
    /* Amount of workers based on number of browsers being tested */
    workers: process.env.CI ? 1 : 6,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: process.env.CI ? 'github' : [['list'], ['experimental-allure-playwright']],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://localhost:8080',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: {
            mode: 'retain-on-failure',
            screenshots: true,
            snapshots: true,
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'Desktop Chrome',
            use: {
                ...devices['Desktop Chrome'],
            },
        },

        {
            name: 'Desktop Firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },

        {
            name: 'Desktop Safari',
            use: {
                ...devices['Desktop Safari'],
            },
        },
        {
            name: 'Microsoft Edge',
            use: {
                channel: 'msedge',
            },
        },

        /* Test against mobile viewports. */
        {
            name: 'Mobile Chrome',
            use: {
                ...devices['Pixel 5'],
            },
        },
        {
            name: 'Mobile Safari',
            use: {
                ...devices['iPhone 12'],
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'yarn g:dev-test',
        port: 8080,
    },
};

export default config;
