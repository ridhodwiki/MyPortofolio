// Run against the dev server: node scripts/check-lanyard-cursor.cjs [baseURL]
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const baseURL = process.argv[2] || 'http://127.0.0.1:8788';
  try {
    for (const mode of ['desktop', 'touch', 'reduced']) {
      const context = await browser.newContext({
        viewport: mode === 'touch' ? { width: 375, height: 812 } : { width: 1440, height: 900 },
        hasTouch: mode === 'touch',
        isMobile: mode === 'touch',
        reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(baseURL, { waitUntil: 'load' });
      await page.locator('canvas').waitFor();
      await page.waitForTimeout(4500);
      const cursor = page.locator('[data-custom-cursor]');
      if (mode === 'desktop') {
        assert.equal(await cursor.count(), 1, 'Desktop must restore the original cursor follower');
        await page.mouse.move(600, 300);
        await page.waitForTimeout(600);
        const box = await cursor.boundingBox();
        assert.ok(Math.abs(box.x + box.width / 2 - 600) < 2, 'Cursor must follow pointer X');
        assert.ok(Math.abs(box.y + box.height / 2 - 300) < 2, 'Cursor must follow pointer Y');
        assert.match(await cursor.locator('div').evaluate(el => getComputedStyle(el).backgroundImage), /conic-gradient/);
        const button = page.getByRole('button', { name: 'Switch to English', exact: true });
        await button.hover();
        await page.waitForTimeout(700);
        assert.ok((await cursor.locator('div').boundingBox()).width > box.width * 1.5, 'Cursor must grow on controls');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await cursor.waitFor({ state: 'detached' });
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await cursor.waitFor();
      } else {
        assert.equal(await cursor.count(), 0, 'No custom cursor on touch or reduced motion');
      }
      const canvas = page.locator('canvas');
      await canvas.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await canvas.screenshot({ path: path.join(process.env.TEMP, 'opencode', `lanyard-${mode}.png`) });
      assert.deepEqual(errors, [], 'No runtime exceptions');
      console.log(`PASS lanyard/cursor ${mode}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
