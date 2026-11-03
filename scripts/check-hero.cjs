// Run against the dev server: node scripts/check-hero.cjs [baseURL]
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

// Dev tooling (Console Ninja / editor extensions) opens its own socket on a
// random local port. That is environment noise, not an app error.
const IGNORED = /WebSocket connection to 'ws:\/\/127\.0\.0\.1:\d+\/' failed/;
const ignored = [];
const record = (list, text) => (IGNORED.test(text) ? ignored.push(text) : list.push(text));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const baseURL = process.argv[2] || 'http://127.0.0.1:8788';
  const errors = [];
  const warnings = new Set();
  try {
    for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on('pageerror', error => record(errors, error.message));
      page.on('console', message => {
        if (message.type() === 'error') record(errors, message.text());
        if (message.type() === 'warning') warnings.add(message.text());
      });
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
        for (const theme of ['dark', 'light']) {
          const toggle = page.getByRole('button', { name: `Switch to ${theme} mode`, exact: true });
          if (await toggle.count()) await toggle.click();
          await page.waitForTimeout(350);
          const state = await page.locator('#home').evaluate(hero => {
            const rect = e => e.getBoundingClientRect().toJSON();
            const visible = e => {
              for (let node = e; node; node = node.parentElement) {
                const style = getComputedStyle(node);
                if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
              }
              return e.getBoundingClientRect().width > 0;
            };
            return {
              headings: hero.querySelectorAll('h1').length,
              text: hero.innerText,
              lang: document.documentElement.lang,
              light: document.documentElement.classList.contains('light'),
              headerBottom: document.querySelector('header').getBoundingClientRect().bottom,
              eyebrow: rect(hero.querySelector('.eyebrow')),
              heading: rect(hero.querySelector('h1')),
              controls: [...hero.querySelectorAll('a, button')].map(e => ({ visible: visible(e), ...rect(e) })),
              visible: [...hero.querySelectorAll('.eyebrow, h1, p')].every(visible),
              width: innerWidth,
              scrollWidth: document.documentElement.scrollWidth,
            };
          });
          assert.equal(state.headings, 1);
          assert.equal(state.lang, locale);
          assert.equal(state.light, theme === 'light');
          assert.match(state.text, locale === 'id' ? /Mahasiswa Teknik Informatika · UPGRIS/ : /Informatics Engineering Student · UPGRIS/);
          assert.ok(state.visible, 'Hero text must be visible');
          assert.ok(state.eyebrow.top >= state.headerBottom, 'Navbar must not cover hero');
          assert.equal(state.controls.length, 5);
          assert.ok(state.controls.every(e => e.visible && e.left >= 0 && e.right <= state.width), 'All hero controls must be visible without horizontal clipping');
          assert.ok(state.scrollWidth <= state.width, 'No horizontal page overflow');
          await page.screenshot({ path: `${process.env.TEMP}/opencode/hero-${viewport.width}-${locale}-${theme}.png` });
          console.log(`PASS hero ${viewport.width} ${locale} ${theme}`);
        }
      }
      if (viewport.width === 375) {
        await page.getByRole('button', { name: 'Open menu', exact: true }).click();
        assert.equal(await page.getByRole('button', { name: 'Close menu', exact: true }).getAttribute('aria-expanded'), 'true');
        await page.getByRole('button', { name: 'Close menu', exact: true }).click();
      }
      await context.close();
    }
    assert.deepEqual(errors, [], 'No browser errors');
    if (ignored.length) console.log(`Ignored ${ignored.length} dev-tool WebSocket error(s)`);
    console.log('Warnings:', [...warnings]);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
