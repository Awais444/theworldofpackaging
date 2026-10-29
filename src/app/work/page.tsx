import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import { publicCaseStudies } from "@/content/caseStudies";
import { WORK_SERVICES, getWorkService } from "@/content/workServices";
import { designHref } from "@/content/designServices";
import { industries } from "@/content/industries";
import { portfolio } from "@/content/portfolio";
import { siteUrl } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import type { GalleryItem } from "@/components/work/PortfolioGallery";
import { featuredDesignSlugs, getDesignService, type DesignService } from "@/content/designServices";
import { quoteHref } from "@/content/navigation";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { DesignCard } from "@/components/design/DesignCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { withHighlight } from "@/components/ui/withHighlight";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { Button } from "@/components/ui/Button";
import { CaseCard, ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { printedCard, rigidCard } from "@/lib/boxView";

export const metadata: Metadata = {
  title: "Work: packaging we design and make",
  description: metaDescription("Packaging design projects and the boxes we make in our own factory: cosmetic, food, coffee, candle and jewellery packaging, labels and rigid boxes."),
  alternates: { canonical: "/work" },
};

/** Shown until real, approved case studies exist (sample projects are never published). */
function WhatWeDesignAndMake() {
  const design = featuredDesignSlugs.map(getDesignService).filter((s): s is DesignService => Boolean(s));
  const boxes = [
    ...rigidStyles.filter((s) => ["magnetic-closure", "drawer", "collapsible", "shoulder-neck"].includes(s.slug)).map(rigidCard),
    ...printedStyles.filter((s) => ["mailer", "tuck-end", "display", "sleeve"].includes(s.slug)).map(printedCard),
  ];
  return (
    <>
      <JsonLd data={gallerySchema} />
      <Section className="!pt-0">
        <SectionHeader
          eyebrow="Design"
          title="Packaging we design"
          highlight="design"
          action={
            <Button href="/packaging-design" variant="ghost" arrow>
              All design services
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {design.map((s) => (
            <DesignCard key={s.slug} s={s} />
          ))}
        </div>
      </Section>
      <Section bg="silver">
        <SectionHeader
          eyebrow="Production"
          title="Boxes we make in our factory"
          highlight="make"
          action={
            <Button href="/boxes" variant="ghost" arrow>
              All boxes
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          {boxes.map((b) => (
            <ProductCard key={b.href} {...b} />
          ))}
        </div>
      </Section>
    </>
  );
}

// Case studies call this industry "Food & drink"; use the same label so one filter covers both sections.
const INDUSTRY_LABEL: Record<string, string> = { "food-bakery": "Food & drink" };

/** Portfolio items with labels and links resolved here, so the client gets plain data. */
const gallery: GalleryItem[] = portfolio.map((p) => {
  const design = p.servicePage ? getDesignService(p.servicePage) : undefined;
  const first = getWorkService(p.services[0] ?? "");
  return {
    id: p.id,
    title: p.title,
    alt: p.alt,
    image: p.image,
    full: p.full,
    width: p.width,
    height: p.height,
    services: p.services,
    industry: p.industry,
    serviceLabels: p.services.flatMap((id) => { const w = getWorkService(id); return w ? [w.label as string] : []; }),
    industryLabel: p.industry ? (INDUSTRY_LABEL[p.industry] ?? industries.find((i) => i.slug === p.industry)?.name ?? null) : null,
    serviceHref: design ? designHref(design.slug) : (first?.href ?? "/packaging-design"),
    serviceLinkLabel: design ? `See ${design.name}` : first ? `See ${first.label}` : "See our design services",
  };
});

/** ImageGallery JSON-LD for the portfolio. */
const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Packaging portfolio",
  url: `${siteUrl()}/work`,
  associatedMedia: portfolio.map((p) => ({ "@type": "ImageObject", contentUrl: `${siteUrl()}${p.full}`, thumbnailUrl: `${siteUrl()}${p.image}`, name: p.title, description: p.alt })),
};

export default function WorkPage() {
  const hasWork = publicCaseStudies.length > 0;
  return (
    <>
      <JsonLd data={gallerySchema} />
      {/* Compact hero: the filter bar and first row of cards fit in a 1440×900 screen. No CTA here (the header has one). */}
      <section className="bg-white pb-4 pt-5">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Work" }]} />
          <p className="text-eyebrow mt-5 text-blue-600">Our work</p>
          <h1 className="text-h1 mt-2">{withHighlight("Packaging we design and make", "design")}</h1>
          <p className="text-lead mt-2 text-ink-500">
            {hasWork ? "Packaging systems, labels and boxes from our studio and factory." : "Ask us for examples in your category."}
          </p>
        </div>
      </section>
      {hasWork ? (
        <Section className="!pt-0">
          <WorkFilter
            quoteHref={quoteHref}
            services={[...WORK_SERVICES]}
            gallery={gallery}
            items={publicCaseStudies.map((c) => ({
              slug: c.slug,
              services: c.workServices,
              industry: c.industry,
              card: (
                <CaseCard href={`/work/${c.slug}`} title={`${c.client}: ${c.project}`} text={c.summary} slot={c.coverSlot} industry={c.industry} placeholder={c.placeholder} chips={c.services} />
              ),
            }))}
          />
        </Section>
      ) : (
        <WhatWeDesignAndMake />
      )}
      <Section>
        <CTABand
          title="Your project next"
          highlight="next"
          text="Tell us what you are making. We reply with a design route, a box recommendation and a fixed quote."
          whatsapp="examples of your packaging work"
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Free Quote
              </Button>
              <Button href="/start-a-project" variant="white" size="lg">
                Start a Project
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
