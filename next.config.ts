import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // MDX is only imported dynamically from src/content/blog, never used as routes.
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
