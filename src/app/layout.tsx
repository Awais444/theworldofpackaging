import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site, siteUrl } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ConsentAndAnalytics } from "@/components/providers/ConsentAndAnalytics";
import { StoreHydration } from "@/components/providers/StoreHydration";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
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
        <StoreHydration />
        <SmoothScroll />
        <ConsentAndAnalytics />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
