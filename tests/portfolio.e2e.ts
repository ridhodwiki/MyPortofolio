import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('home renders the hero and navigation', async ({ app, screen }) => {
  await app.open('/');
  await expect(screen.getByRole('heading', { name: /Hi, I'm/ })).toBeVisible();
  await expect(screen.getByRole('link', { name: 'Contact' })).toBeVisible();
});

test('security headers are served', async ({ app }) => {
  const res = await fetch(`${app.baseUrl}/`);
  expect(res.headers.get('content-security-policy')).toContain("default-src 'self'");
  expect(res.headers.get('strict-transport-security')).toContain('max-age=31536000');
  expect(res.headers.get('x-content-type-options')).toBe('nosniff');
  expect(res.headers.get('x-frame-options')).toBe('DENY');
});

test('cross-site API reads are rejected', async ({ app }) => {
  const res = await fetch(`${app.baseUrl}/api/feedback`, {
    headers: { origin: 'https://evil.example' },
  });
  expect(res.status).toBe(403);
});

test('contact form posts to the same-origin API', async ({ app, screen, browser }) => {
  let posted: { name?: string; email?: string; message?: string } | undefined;
  await browser.route('**/api/contact', async (route) => {
    posted = JSON.parse(route.request.postData ?? '{}');
    await route.fulfill({ status: 200, json: { success: true } });
  });

  await app.open('/#contact');
  await screen.getByPlaceholder('Nama lengkap kamu').fill('E2E Tester');
  await screen.getByPlaceholder('email@contoh.com').fill('e2e@example.test');
  await screen.getByPlaceholder('Ceritakan tentang project atau pesanmu...').fill('Automated check');
  await screen.getByRole('button', { name: 'Send Message' }).tap();

  await expect.poll(() => posted?.email).toBe('e2e@example.test');
  await expect(screen.getByRole('button', { name: 'Message Sent' })).toBeVisible();
});

test('feedback history renders the public fields', async ({ app, screen, browser }) => {
  await browser.route('**/api/feedback', (route) =>
    route.fulfill({
      status: 200,
      json: {
        items: [
          {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Ada',
            message: 'Great portfolio',
            createdAt: '2026-01-01T00:00:00.000Z',
          },
        ],
      },
    })
  );

  await app.open('/#contact');
  await expect(screen.getByRole('heading', { name: 'Feedback terbaru' })).toBeVisible();
  await expect(screen.getByText('Ada')).toBeVisible();
  await expect(screen.getByText('Great portfolio')).toBeVisible();
});
