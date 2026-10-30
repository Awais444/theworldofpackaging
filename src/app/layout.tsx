import type { Metadata, Viewport } from "next";
import { metaDescription } from "@/lib/seo";
import type { ReactNode } from "react";
import { site, siteUrl } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { headerNav } from "@/content/navigation";
import { ConsentAndAnalytics } from "@/components/providers/ConsentAndAnalytics";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { organization, website } from "@/lib/schema";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: metaDescription(site.description),
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  // Search engine verification (set in the environment; omitted when empty). Bing feeds several AI assistants.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <JsonLd data={[organization(), website()]} />
        <SmoothScroll />
        <MotionProvider>
        <ConsentAndAnalytics />
        <Header nav={headerNav()} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        </MotionProvider>
      </body>
    </html>
  );
}
