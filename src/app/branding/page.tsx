import type { Metadata } from "next";
import { hubs } from "@/content/agencyServices";
import { ServiceHubView } from "@/components/sections/ServiceViews";

export const metadata: Metadata = {
  title: "Brand Identity Design",
  description: hubs.branding.intro,
  alternates: { canonical: "/branding" },
};

export default function BrandingPage() {
  return <ServiceHubView hub="branding" />;
}
