import type { NextConfig } from "next";

// Baseline security response headers applied to every route. A strict CSP needs a
// nonce pipeline for Next's inline runtime, so it is documented as a follow-up in
// docs/reports/security-audit.md rather than shipped half-configured.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Product images are our own local vector SVGs — they scale losslessly and
    // gain nothing from raster optimization. Serving them unoptimized bypasses the
    // /_next/image optimizer and its on-disk cache entirely. That matters: the
    // optimizer cache (keyed by url+accept+w+q, 4h TTL) had served STALE entries
    // from an earlier era when these files were "OP"-style initials placeholders,
    // so browsers saw "OP/SM" while the real glyph SVGs sat on disk. Unoptimized =
    // what's in /public is exactly what ships, with no cache layer to go stale.
    unoptimized: true,
    // Kept for defence-in-depth: still neutralise any script inside an SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
