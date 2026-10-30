import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { legacyCompanyRedirects, legacyCountryRedirects, legacyQuoteRedirects, legacyIndustryRedirects, legacyServiceRedirects } from "./src/content/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optional: cap build workers on low-memory machines (NEXT_BUILD_CPUS=2 npm run build). Vercel uses the default.
  ...(process.env.NEXT_BUILD_CPUS ? { experimental: { cpus: Number(process.env.NEXT_BUILD_CPUS) } } : {}),
  // MDX is only imported dynamically from src/content/blog, never used as routes.
  pageExtensions: ["ts", "tsx"],
  // Old URLs moved in Phases 3–7 (CLAUDE.md §9).
  async redirects() {
    return [
      ...["materials", "finishes", "inserts"].map((p) => ({ source: `/rigid-boxes/${p}`, destination: `/${p}`, statusCode: 301 as const })),
      ...Object.entries({ ...legacyServiceRedirects, ...legacyIndustryRedirects, ...legacyCompanyRedirects, ...legacyCountryRedirects, ...legacyQuoteRedirects }).map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
    ];
  },
  async headers() {
    const chat = process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC ? new URL(process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC).origin : "";
    // CSP allows only what the site loads: own scripts/styles, GA4 after consent, the optional chat widget.
    // Next inlines its bootstrap scripts, hence 'unsafe-inline'. Production only: the dev server needs eval.
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com ${chat}`.trim(),
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com ${chat}`.trim(),
      `frame-src 'self' ${chat}`.trim(),
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");
    const security = [
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { key: "X-Frame-Options", value: "DENY" },
      ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
    ];
    return [
      { source: "/:path*", headers: security },
      // Photos: 30 days (files are replaced in place when real photos arrive, so not "immutable").
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Widths next/image can serve; sizes on each <Image> picks the smallest that covers the layout.
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    // Optimised images are content-addressed by source; cache for a year.
    minimumCacheTTL: 31536000,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
