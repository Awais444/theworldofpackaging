import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { BlogTeaser, DesignForEveryProduct, FactsRow, ShelfProblems } from "@/components/home/HomeDesign";
import {
  BoxTypes,
  CollapsibleFeature,
  FeaturedWork,
  FinalCta,
  Finishes,
  HowItWorks,
  Industries,
  Services,
  TestimonialsAndFaq,
  WhatWeMake,
  WhyUs,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: { absolute: "Packaging Design Services, Made in Our Own Factory | The World of Packaging" },
  description:
    "Packaging design for cosmetics, food, coffee, supplements, candles, labels and more, printed and made in our own factory. Free quote, first concepts in 48 hours.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DesignForEveryProduct />
      <WhatWeMake />
      <ShelfProblems />
      <FactsRow />
      <Services />
      <BoxTypes />
      <CollapsibleFeature />
      <WhyUs />
      <FeaturedWork />
      <HowItWorks />
      <Industries />
      <Finishes />
      <BlogTeaser />
      <TestimonialsAndFaq />
      <FinalCta />
    </>
  );
}
