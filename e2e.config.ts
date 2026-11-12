import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';

export default {
  tests: 'tests/**/*.e2e.ts',
  targets: [
    {
      // The welcome screen animates for ~2.5s; reduced motion skips it so the
      // tests never race the intro.
      engine: web({ reducedMotion: 'reduce' }),
      app: {
        url: 'http://127.0.0.1:0',
        command: {
          executable: 'node',
          args: ['node_modules/next/dist/bin/next', 'start', '-p', '{port}'],
          startupTimeout: 120_000,
          log: '.e2e/logs/app.log',
        },
      },
    },
  ],
} satisfies E2EConfig;
