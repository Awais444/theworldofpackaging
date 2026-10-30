import type { Metadata } from "next";
import { getMedia } from "@/content/media";
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
import { Media } from "@/components/media/Media";

export const metadata: Metadata = {
  title: { absolute: "Packaging Design and Custom Boxes | The World of Packaging" },
  description: metaDescription(`${site.facts.yearsExperience}+ years of packaging design and manufacturing: boxes, labels and pouches for cosmetics, food and coffee, made in our own factory. Free quote.`),
  alternates: { canonical: "/" }, openGraph: ogFor("/"),
};

export default function HomePage() {
  return (
    <>
      <HomeHero
        alt={getMedia("home-hero").alt}
        photo={getMedia("home-hero").src ? <Media slot="home-hero" priority className="absolute inset-0 h-full w-full rounded-3xl" sizes="(min-width: 1024px) 50vw, 100vw" /> : undefined}
      />
      <DesignForEveryProduct />
      <TrustedBy />
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
