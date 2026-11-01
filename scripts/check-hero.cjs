// Run against the dev server: node scripts/check-hero.cjs [baseURL]
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const baseURL = process.argv[2] || 'http://127.0.0.1:8788';
  const errors = [];
  const warnings = new Set();
  try {
    for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
        if (message.type() === 'warning') warnings.add(message.text());
      });
      await page.goto(`${baseURL}/#home`, { waitUntil: 'load' });
      await page.waitForTimeout(3000);
      for (const locale of ['id', 'en']) {
        if (locale === 'en') await page.getByRole('button', { name: 'Switch to English', exact: true }).click();
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
    console.log('Warnings:', [...warnings]);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
