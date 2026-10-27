import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import {
  BoxTypes,
  ClientLogos,
  CollapsibleFeature,
  FeaturedWork,
  FinalCta,
  Finishes,
  HowItWorks,
  Industries,
  Services,
  TestimonialsAndFaq,
  WhyUs,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  description:
    "Brand identity, packaging design and rigid boxes made in our own factory. MOQ 500, collapsible rigid boxes that ship flat, worldwide delivery.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ClientLogos />
      <BoxTypes />
      <Services />
      <CollapsibleFeature />
      <WhyUs />
      <FeaturedWork />
      <HowItWorks />
      <Industries />
      <Finishes />
      <TestimonialsAndFaq />
      <FinalCta />
    </>
  );
}
