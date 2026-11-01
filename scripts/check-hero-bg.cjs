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
    const bg = document.querySelector('[aria-hidden].pointer-events-none');
    const pauseBtn = document.querySelector('[aria-hidden] button[aria-label]');
    return {
      hasBackground: !!bg,
      hasPauseButton: !!pauseBtn,
      pausedLabel: pauseBtn?.getAttribute('aria-label') || null,
      light: document.documentElement.classList.contains('light'),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      particles: document.querySelectorAll('[aria-hidden] span.rounded-full').length,
      particleColor: getComputedStyle(document.querySelector('[aria-hidden] span.rounded-full')).backgroundColor,
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
      await page.waitForTimeout(2500);

      const particleColors = new Set();
      for (const theme of themes) {
        const toggle = page.getByRole('button', { name: `Switch to ${theme} mode`, exact: true });
        if (await toggle.count()) await toggle.click();
        await page.waitForTimeout(800);

        const state = await readState(page);
        assert.ok(state.hasBackground, `${viewport.width} ${theme}: background layer must exist`);
        assert.ok(state.hasPauseButton, `${viewport.width} ${theme}: pause/resume button must exist`);
        assert.equal(state.pausedLabel, 'Pause background animation');
        assert.ok(state.particles >= 20, `${viewport.width} ${theme}: particle count too low`);
        assert.equal(state.light, theme === 'light', `${viewport.width} ${theme}: theme mismatch`);
        particleColors.add(state.particleColor);
      }
      assert.equal(particleColors.size, themes.length, `${viewport.width}: particle color must follow theme`);

      if (viewport.width === 1440) {
        // Toggle pause via DOM click: the button is decorative and may sit under
        // the hero content layer, so Playwright's hit-target check rejects it.
        await page.evaluate(() => {
          const btn = document.querySelector('[aria-hidden] button[aria-label="Pause background animation"]');
          if (btn instanceof HTMLElement) btn.click();
        });
        await page.waitForTimeout(300);
        const afterPause = await readState(page);
        assert.equal(afterPause.pausedLabel, 'Resume background animation');
      }

      await context.close();
    }

    // Reduced motion check via media query emulation.
    const reducedContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const reducedPage = await reducedContext.newPage();
    watch(reducedPage, errors, warnings);
    await reducedPage.goto(`${baseURL}/#home`, { waitUntil: 'load' });
    await reducedPage.waitForTimeout(1500);
    const reduced = await readState(reducedPage);
    assert.ok(reduced.reducedMotion, 'Reduced-motion media query must be active');
    assert.ok(reduced.hasBackground, 'Background layer must still render under reduced motion');
    assert.ok(reduced.particles >= 20, 'Background particles should still render under reduced motion');
    await reducedContext.close();

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
