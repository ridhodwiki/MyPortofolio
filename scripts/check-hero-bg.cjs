// Run against the dev server: node scripts/check-hero-bg.cjs [baseURL]
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const viewports = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];
const themes = ['dark', 'light'];

const readState = (page) =>
  page.evaluate(() => {
    const canvas = document.querySelector('canvas.vanta-canvas');
    const rect = canvas?.getBoundingClientRect();
    return {
      hasCanvas: !!canvas,
      canvasWidth: rect ? Math.round(rect.width) : 0,
      canvasHeight: rect ? Math.round(rect.height) : 0,
      layerOpacity: canvas ? getComputedStyle(canvas.parentElement).opacity : null,
      pauseButtons: document.querySelectorAll('button[aria-label*="background animation"]').length,
      light: document.documentElement.classList.contains('light'),
    };
  });

const watch = (page, errors, warnings) => {
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
    if (message.type() === 'warning') warnings.add(message.text());
  });
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const baseURL = process.argv[2] || 'http://127.0.0.1:8788';
  const errors = [];
  const warnings = new Set();

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      watch(page, errors, warnings);
      await page.goto(`${baseURL}/#home`, { waitUntil: 'load' });
      await page.waitForTimeout(5000);

      // Wait for welcome screen to finish so hero text is visible.
      await page.waitForFunction(
        () => document.documentElement.dataset.appReady === 'true' || !document.querySelector('.fixed.inset-0.z-\\[300\\]'),
        { timeout: 10000 }
      ).catch(() => {});
      await page.waitForTimeout(500);

      for (const locale of ['id', 'en']) {
        if (locale !== 'id') {
          await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
          await page.waitForTimeout(400);
        }
        for (const theme of themes) {
          const toggle = page.getByRole('button', { name: `Switch to ${theme} mode`, exact: true });
          if (await toggle.count()) await toggle.click();
          await page.waitForTimeout(1200);

          const state = await readState(page);
          assert.ok(state.hasCanvas, `${viewport.width} ${theme}: Vanta canvas must exist`);
          assert.ok(state.canvasWidth >= viewport.width * 0.9, `${viewport.width} ${theme}: canvas must span viewport`);
          assert.ok(state.canvasHeight >= viewport.height * 0.9, `${viewport.width} ${theme}: canvas must cover hero`);
          assert.equal(state.pauseButtons, 0, `${viewport.width} ${theme}: pause button must be removed`);
          assert.equal(state.light, theme === 'light', `${viewport.width} ${theme}: theme mismatch`);
          assert.ok(Number(state.layerOpacity) < 1, `${viewport.width} ${theme}: ring layer must be faded`);
        }
      }

      await context.close();
    }

    // Touch must still scroll the page with Vanta touch controls enabled.
    const touchContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      hasTouch: true,
      isMobile: true,
    });
    const touchPage = await touchContext.newPage();
    watch(touchPage, errors, warnings);
    await touchPage.goto(`${baseURL}/#home`, { waitUntil: 'load' });
    await touchPage.waitForTimeout(3000);
    await touchPage.evaluate(() => window.scrollTo(0, 0));
    await touchPage.touchscreen.tap(190, 700);
    await touchPage.evaluate(() => window.scrollTo(0, 600));
    await touchPage.waitForTimeout(300);
    assert.ok((await touchPage.evaluate(() => window.scrollY)) > 0, 'Page must still scroll on touch devices');
    await touchContext.close();

    assert.deepEqual(errors, [], 'No browser errors');
    console.log('PASS background checks');
    console.log('Warnings:', [...warnings]);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
