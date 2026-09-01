const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 12'] // sets viewport and user-agent
  });
  const page = await context.newPage();

  await page.goto('http://localhost:3000');

  // Wait for network idle
  await page.waitForLoadState('networkidle');

  // Take a full page screenshot
  await page.screenshot({ path: 'mobile-home-page.png', fullPage: true });

  await browser.close();
})();
