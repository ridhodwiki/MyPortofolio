import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    ".e2e/**",
    ".open-next/**",
    ".wrangler/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Mount-time reads of localStorage/appReady are the intended hydration
      // guard here; the rule only fits React Compiler-ready components.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
