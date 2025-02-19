import { test } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test('I can see landing images', async ({ page }) => {
    const landing = new PlaywrightLandingPage(page);
    await landing.goto();
    await Promise.all([
        landing.see(landing.appBarPrytaneumLogo),
        landing.see(landing.prytanumTextLogo),
        landing.see(landing.prytaneumLogoSubheader),
        landing.see(landing.landingGraphic),
        landing.see(landing.bottomPrytaneumLogo),
        landing.see(landing.democracyFundLogo),
        landing.see(landing.UCRTecdLogo),
    ]);
});
