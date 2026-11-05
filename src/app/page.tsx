import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { BlogTeaser, DesignForEveryProduct, ShelfProblems } from "@/components/home/HomeDesign";
import { ProofBar } from "@/components/home/ProofBar";
import { proofItems, site } from "@/config/site";
import {
  BoxTypes,
  CollapsibleFeature,
  FeaturedWork,
  FinalCta,
  Finishes,
  Industries,
  Services,
  TestimonialsAndFaq,
  WhyUs,
} from "@/components/home/HomeSections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustedBy } from "@/components/home/TrustedBy";

export const metadata: Metadata = {
  title: { absolute: "Packaging Designed and Made Under One Roof | TWOP" },
  description: metaDescription(`Packaging designed and made under one roof, in our own factory: ${site.facts.yearsExperience}+ years of boxes, labels and pouches for food, cosmetic and supplement brands. Free quote.`),
  alternates: { canonical: "/" }, openGraph: ogFor("/"),
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DesignForEveryProduct />
      <FeaturedWork />
      <TrustedBy />
      <ShelfProblems />
      <ProofBar items={proofItems()} />
      <Services />
      <BoxTypes />
      <CollapsibleFeature />
      <WhyUs />
      <HowItWorks />
      <Industries />
      <Finishes />
      <BlogTeaser />
      <TestimonialsAndFaq />
      <FinalCta />
    </>
  );
}
