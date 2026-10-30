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
