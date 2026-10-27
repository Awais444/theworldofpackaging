import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { legacyCompanyRedirects, legacyQuoteRedirects, legacyIndustryRedirects, legacyServiceRedirects } from "./src/content/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // MDX is only imported dynamically from src/content/blog, never used as routes.
  pageExtensions: ["ts", "tsx"],
  // Old URLs moved in Phases 3–7 (CLAUDE.md §9).
  async redirects() {
    return [
      ...["materials", "finishes", "inserts"].map((p) => ({ source: `/rigid-boxes/${p}`, destination: `/${p}`, permanent: true })),
      ...Object.entries({ ...legacyServiceRedirects, ...legacyIndustryRedirects, ...legacyCompanyRedirects, ...legacyQuoteRedirects }).map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
