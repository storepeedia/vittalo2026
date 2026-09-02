const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X/11 Pro dimensions
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  await page.goto('http://localhost:3000');

  // Wait for images to load
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'mobile_before_scroll.png', fullPage: true });

  // Wait a few seconds for auto-scroll to kick in
  await page.waitForTimeout(5000);

  await page.screenshot({ path: 'mobile_after_scroll.png', fullPage: true });

  await browser.close();
  console.log("Screenshots captured!");
})();
