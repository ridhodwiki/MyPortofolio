// Security regression tests for the public API routes. Runs against a real
// production build so the route handlers, env loading, and Next request
// parsing behave exactly as they do in deployment.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3199;
const BASE = `http://localhost:${PORT}`;
const SAME_ORIGIN = BASE;
const EVIL_ORIGIN = "https://evil.example";

let server;

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE + "/", { signal: AbortSignal.timeout(2_000) });
      if (res.status < 500) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("next start did not become ready in time");
}

function postContact(body, { origin = SAME_ORIGIN, ip } = {}) {
  return fetch(BASE + "/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin,
      "x-forwarded-for": ip,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

before(async () => {
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: "ignore",
  });
  await waitForServer();
});

after(() => {
  server?.kill();
});

test("contact rejects a cross-site origin", async () => {
  const res = await postContact({}, { origin: EVIL_ORIGIN, ip: "203.0.113.1" });
  assert.equal(res.status, 403);
});

test("contact rejects a missing payload", async () => {
  const res = await postContact({}, { ip: "203.0.113.2" });
  assert.equal(res.status, 400);
});

test("contact rejects non-string fields", async () => {
  const res = await postContact(
    { name: 1, email: [], message: {} },
    { ip: "203.0.113.3" }
  );
  assert.equal(res.status, 400);
});

test("contact rejects an invalid email", async () => {
  const res = await postContact(
    { name: "Test", email: "not-an-email", message: "Hi" },
    { ip: "203.0.113.4" }
  );
  assert.equal(res.status, 400);
});

test("contact silently accepts a honeypot submission", async () => {
  const res = await postContact(
    { name: "Bot", email: "bot@example.com", message: "spam", website: "http://spam" },
    { ip: "203.0.113.5" }
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true });
});

test("feedback rejects a cross-site origin", async () => {
  const res = await fetch(BASE + "/api/feedback", {
    headers: { origin: EVIL_ORIGIN, "x-forwarded-for": "203.0.113.6" },
  });
  assert.equal(res.status, 403);
});

test("feedback rate limits after three reads per IP", async () => {
  const ip = "203.0.113.7";
  const statuses = [];
  for (let i = 0; i < 4; i += 1) {
    const res = await fetch(BASE + "/api/feedback", {
      headers: { origin: SAME_ORIGIN, "x-forwarded-for": ip },
    });
    statuses.push(res.status);
  }
  assert.deepEqual(statuses, [200, 200, 200, 429]);
});

test("feedback exposes only public fields", async () => {
  const res = await fetch(BASE + "/api/feedback", {
    headers: { origin: SAME_ORIGIN, "x-forwarded-for": "203.0.113.8" },
  });
  assert.equal(res.status, 200);
  const { items } = await res.json();
  assert.ok(Array.isArray(items));
  for (const item of items) {
    assert.deepEqual(Object.keys(item).sort(), ["createdAt", "id", "message", "name"]);
  }
});
