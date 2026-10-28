import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { BlogTeaser, DesignForEveryProduct, ShelfProblems } from "@/components/home/HomeDesign";
import { ProofBar } from "@/components/home/ProofBar";
import { proofItems } from "@/config/site";
import {
  BoxTypes,
  CollapsibleFeature,
  FeaturedWork,
  FinalCta,
  Finishes,
  Industries,
  Services,
  TestimonialsAndFaq,
  WhatWeMake,
  WhyUs,
} from "@/components/home/HomeSections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Media } from "@/components/media/Media";

export const metadata: Metadata = {
  title: { absolute: "Packaging Design and Custom Boxes | The World of Packaging" },
  description:
    "Packaging design for cosmetics, food, coffee, supplements and labels, printed and made in our own factory. First concepts in 48 hours. Get a free quote.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DesignForEveryProduct />
      <WhatWeMake />
      <ShelfProblems />
      <ProofBar items={proofItems()} />
      <Services />
      <BoxTypes />
      <CollapsibleFeature />
      <WhyUs />
      <FeaturedWork />
      <HowItWorks visuals={{ 1: <Media slot="home-how-step-2" card className="rounded-2xl" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" /> }} />
      <Industries />
      <Finishes />
      <BlogTeaser />
      <TestimonialsAndFaq />
      <FinalCta />
    </>
  );
}
