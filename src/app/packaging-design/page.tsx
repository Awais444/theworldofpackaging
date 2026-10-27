import type { Metadata } from "next";
import { hubs } from "@/content/agencyServices";
import { ServiceHubView } from "@/components/sections/ServiceViews";

export const metadata: Metadata = {
  title: "Packaging Design",
  description: hubs["packaging-design"].intro,
  alternates: { canonical: "/packaging-design" },
};

export default function PackagingDesignPage() {
  return <ServiceHubView hub="packaging-design" />;
}
