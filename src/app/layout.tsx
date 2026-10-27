import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site, siteUrl } from "@/config/site.config";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MegaFeature } from "@/components/layout/MegaFeature";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StoreHydration } from "@/components/providers/StoreHydration";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { ConsentAndAnalytics } from "@/components/providers/ConsentAndAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { organization, website } from "@/lib/schema";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="spec sr-only z-[60] bg-fg px-4 py-3 text-surface focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <JsonLd data={[organization(), website()]} />
        <StoreHydration />
        <ConsentAndAnalytics />
        <SmoothScroll>
          <Header megaFeature={<MegaFeature />} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
