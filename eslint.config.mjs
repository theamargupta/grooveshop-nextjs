import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored reference material, not application code: the original Nuxt
    // storefront we matched, generated docs, and scratch. Linting them drowned
    // `npm run lint` in 900+ errors from code we do not own or ship.
    "source-nuxt/**",
    "docs/**",
    "scratchpad/**",
  ]),
]);

export default eslintConfig;
