const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the local server
  await page.goto('http://localhost:3000');

  // Wait for the specific element to be visible
  // We'll just take a screenshot of the whole page first to make sure it loads
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
})();
