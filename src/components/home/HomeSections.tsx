import { Award,
  Boxes,
  Droplet,
  Factory,
  Feather,
  Globe,
  Layers,
  Package,
  Palette,
  PenTool,
  Sparkles,
  SquareDashed,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import { site, whatsappUrl } from "@/config/site";
import { CopyButton } from "@/components/ui/CopyButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { featuredCaseSlugs, publicCaseStudies } from "@/content/caseStudies";
import { faqGroups } from "@/content/faqs";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { publicTestimonials } from "@/content/testimonials";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import type { MediaSlotId } from "@/content/media";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import {
  CaseCard,
  IndustryCard,
  ProductCard,
  ServiceCard,
  TestimonialCard,
} from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import { illustrations } from "@/components/illustrations";
import { industryIcon } from "@/components/industries/industryIcons";
import { printedCard, rigidCard } from "@/lib/boxView";
import { faqPage } from "@/lib/schema";

/** Box cards whose main photo already appears higher on the homepage use a gallery photo instead. */
const HOME_BOX_SLOT: Record<string, string> = {
  "rigid-magnetic-closure-hero": "rigid-magnetic-closure-gallery-1", // hero shows the main magnetic photo
  "printed-folding-carton-hero": "printed-folding-carton-gallery-2", // Springwater cover in Featured work
};
const homeBox = <T extends { slot: string }>(card: T): T => ({ ...card, slot: HOME_BOX_SLOT[card.slot] ?? card.slot });

export function BoxTypes() {
  const rigid = rigidStyles.slice(0, 8);
  const printed = printedStyles.filter((s) => s.slug !== "window").slice(0, 8);
  const grid = (cards: React.ReactNode) => (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
      {cards}
    </div>
  );
  return (
    <Section>
      <FadeIn>
        <SectionHeader
          eyebrow="Box styles"
          title="Boxes for every product"
          highlight="product"
          lead="Rigid boxes made in our factory, and printed boxes in any size."
          action={
            <Button href="/boxes" variant="ghost" arrow>
              View all boxes
            </Button>
          }
        />
      </FadeIn>
      <div className="mt-10">
        <Tabs
          label="Box type"
          items={[
            {
              id: "rigid",
              label: "Rigid boxes",
              content: grid(
                rigid.map((s) => <ProductCard key={s.slug} {...homeBox(rigidCard(s))} />),
              ),
            },
            {
              id: "printed",
              label: "Printed boxes",
              content: grid(
                printed.map((s) => <ProductCard key={s.slug} {...homeBox(printedCard(s))} />),
              ),
            },
          ]}
        />
      </div>
    </Section>
  );
}

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    text: "Logo, colour and type built to work on packaging first.",
    href: "/services/brand-identity",
    bullets: ["Logo design", "Brand guidelines", "Naming"],
    slot: "home-service-brand",
  },
  {
    icon: PenTool,
    title: "Packaging Design",
    text: "Structure and artwork designed together, ready for print.",
    href: "/packaging-design",
    bullets: ["Dielines", "Label design", "3D mockups"],
    slot: "home-service-design",
  },
  {
    icon: Factory,
    title: "Box Manufacturing",
    text: "Rigid, collapsible and printed boxes made in our own factory.",
    href: "/rigid-boxes",
    bullets: ["Rigid boxes", "Collapsible rigid", "Printed boxes"],
    slot: "home-service-boxes",
  },
];

export function Services() {
  return (
    <Section bg="silver">
      <FadeIn>
        <SectionHeader
          eyebrow="What we do"
          title="Design, branding and production"
          highlight="production"
          lead="Use one service or all three. Doing them together saves hand-offs and reprints."
        />
      </FadeIn>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.08} className="h-full">
            <ServiceCard {...s} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

const CollapsibleFlat = illustrations["collapsible-flat"];
const CollapsibleAssembled = illustrations["collapsible-assembled"];

export function CollapsibleFeature() {
  const benefits = [
    {
      title: "Less freight volume",
      text: "Flat boxes take a fraction of the carton space of assembled rigid boxes.",
    },
    {
      title: "Cheaper storage",
      text: "More boxes per shelf and per pallet in your warehouse.",
    },
    {
      title: "Assembles in seconds",
      text: "Unfold the walls and they lock into a rigid box. No glue, no tools.",
    },
  ];
  return (
    <Section bg="klein">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <SectionHeader
            dark
            eyebrow="Ships flat"
            title="Rigid when it arrives. Flat when it ships."
            highlight="Flat"
          />
          <ul className="mt-8 space-y-5">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500"
                />
                <div>
                  <p className="font-heading text-lg font-bold">{b.title}</p>
                  <p className="mt-1 text-white/80">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/collapsible-rigid-boxes" variant="accent" arrow>
              See collapsible boxes
            </Button>
            <Button href={quoteHref} variant="white">
              Get a quote
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="grid grid-cols-2 gap-4">
          <figure className="rounded-3xl bg-white/10 p-4">
            <div className="aspect-square">
              <CollapsibleFlat className="illo--white" />
            </div>
            <figcaption className="mt-2 text-center text-sm font-semibold">
              Shipped flat
            </figcaption>
          </figure>
          <figure className="rounded-3xl bg-white/10 p-4">
            <div className="aspect-square">
              <CollapsibleAssembled />
            </div>
            <figcaption className="mt-2 text-center text-sm font-semibold">
              Assembled
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </Section>
  );
}

/** Six cards, one-line titles, descriptions kept to three lines at 15px. */
const reasons: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Award, title: `${site.facts.yearsExperience}+ years`, text: "Designing, printing and making boxes for brands at home and abroad." },
  { icon: Factory, title: "Own factory", text: "Rigid boxes are made and printed in-house, not outsourced." },
  { icon: Layers, title: `MOQ ${site.facts.rigidMoq}`, text: `Rigid and collapsible rigid boxes from ${site.facts.rigidMoq} units.` },
  { icon: Package, title: "Digital proof", text: "A PDF proof and 3D mockup. Nothing is printed until you approve." },
  { icon: Sparkles, title: "Premium finishes", text: "Foil, embossing, spot UV, soft-touch and custom inserts." },
  { icon: Globe, title: "Ships worldwide", text: "By air or sea to the USA, UK, Canada, Australia, UAE and EU." },
];

export function WhyUs() {
  return (
    <Section>
      <FadeIn>
        <SectionHeader eyebrow="Why choose us" title="One team from sketch to delivered box" highlight="delivered" />
      </FadeIn>
      {/* Image spans exactly the height of the 3×2 card grid on desktop; above the cards on smaller screens. */}
      <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-12">
        <FadeIn delay={0.1} className="relative aspect-video overflow-hidden rounded-3xl lg:order-2 lg:col-span-4 lg:aspect-auto">
          <Media slot="home-factory" panel="blue" className="!absolute inset-0 h-full w-full rounded-3xl" sizes="(min-width: 1024px) 33vw, 100vw" />
        </FadeIn>
        <FadeIn delay={0.08} className="lg:order-1 lg:col-span-8">
          <ul className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <li key={r.title} className="flex flex-col rounded-2xl border border-silver-300 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <r.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-h4 mt-4 truncate">{r.title}</h3>
                <p className="mt-2 line-clamp-3 text-[15px] text-ink-500">{r.text}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}

export function FeaturedWork() {
  // Only real projects are shown; the section is hidden until there is one.
  if (publicCaseStudies.length === 0) return null;
  return (
    <Section bg="silver">
      <FadeIn>
        <SectionHeader
          eyebrow="Featured work"
          title="Packaging we have made"
          highlight="made"
          action={
            <Button href="/work" variant="ghost" arrow>
              View all work
            </Button>
          }
        />
      </FadeIn>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {featuredCaseSlugs
          .map((slug) => publicCaseStudies.find((c) => c.slug === slug))
          .filter((c): c is (typeof publicCaseStudies)[number] => Boolean(c))
          .map((c, i) => (
          <FadeIn key={c.slug} delay={i * 0.08}>
            <CaseCard
              href={`/work/${c.slug}`}
              title={`${c.client}: ${c.project}`}
              text={c.summary}
              slot={c.coverSlot}
              industry={c.industry}
              placeholder={c.placeholder}
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}


export function Industries() {
  return (
    <Section bg="blue-50">
      <FadeIn>
        <SectionHeader
          eyebrow="Industries"
          title="Packaging for your industry"
          highlight="industry"
          action={
            <Button href="/industries" variant="ghost" arrow>
              All industries
            </Button>
          }
        />
      </FadeIn>
      <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {industries.slice(0, 12).map((ind) => (
          <IndustryCard
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            name={ind.name}
            icon={industryIcon(ind.slug)}
            boxes={ind.styles.slice(0, 3)}
            slot={`home-industry-${ind.slug}`}
          />
        ))}
      </div>
    </Section>
  );
}

/** zoom: close-up crop, scaled from the slot's object-position (the full-size photo is used so it stays sharp). */
type Finish = { icon: LucideIcon; slot: MediaSlotId; title: string; text: string; bestFor: string; href: string; zoom?: { scale: number; origin: string } };

// Anchors match the item ids on /finishes (slugify of the item name). Inserts have their own page.
const finishes: Finish[] = [
  { icon: Sparkles, slot: "finish-foil-stamping", title: "Foil stamping", text: "Gold, silver or holographic foil pressed with a heated die.", bestFor: "luxury, cosmetics, gifts", href: "/finishes#foil-stamping", zoom: { scale: 1.7, origin: "72% 50%" } },
  { icon: Stamp, slot: "finish-embossing", title: "Embossing", text: "Raised or debossed logos you can feel.", bestFor: "logos, rigid boxes, stationery", href: "/finishes#embossing-and-debossing" },
  { icon: Droplet, slot: "finish-spot-uv", title: "Spot UV", text: "Gloss highlights on a matte surface.", bestFor: "patterns, logos, tech", href: "/finishes#spot-uv" },
  { icon: Feather, slot: "finish-soft-touch", title: "Soft-touch", text: "Velvety lamination that resists scuffs.", bestFor: "cosmetics, skincare, retail", href: "/finishes#soft-touch-lamination", zoom: { scale: 2.2, origin: "62% 74%" } },
  { icon: SquareDashed, slot: "finish-window-patch", title: "Window patch", text: "Clear PET window to show the product.", bestFor: "food, soap, toys", href: "/finishes#window-patch", zoom: { scale: 1.25, origin: "52% 38%" } },
  { icon: Boxes, slot: "finish-custom-inserts", title: "Custom inserts", text: "EVA, card or pulp inserts cut to fit your product.", bestFor: "electronics, gift sets, PR kits", href: "/inserts", zoom: { scale: 1.5, origin: "26% 52%" } },
];

/** The slot image, optionally zoomed into a close-up. */
function Zoomed({ f, sizes }: { f: Finish; sizes: string }) {
  if (!f.zoom) return <Media slot={f.slot} fill panel="blue" sizes={sizes} card />;
  return (
    <div className="absolute inset-0" style={{ transform: `scale(${f.zoom.scale})`, transformOrigin: f.zoom.origin }}>
      <Media slot={f.slot} fill panel="blue" sizes={sizes} />
    </div>
  );
}

/** Bento card: photo or illustration fills the card; title and line sit on a bottom gradient. */
function FinishCard({ f, className, sizes, wide = false }: { f: Finish; className?: string; sizes: string; wide?: boolean }) {
  const label = (
    <>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-orange-600">
        <f.icon aria-hidden="true" className="h-[18px] w-[18px]" />
      </span>
      <h3 className="mt-3 font-heading text-[20px] font-semibold leading-tight">{f.title}</h3>
      <p className="mt-1 text-sm text-white/85">{f.text}</p>
      {/* Revealed on hover/focus; always shown on touch and with reduced motion (see .finish-card in globals.css). */}
      <p className="finish-best mt-2 text-[13px] font-semibold text-orange-50">Best for: {f.bestFor}</p>
    </>
  );
  return (
    <Link
      href={f.href}
      className={cn(
        "finish-card group relative isolate block overflow-hidden rounded-[20px] bg-blue-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/30",
        className,
      )}
    >
      {wide ? (
        <div className="grid h-full md:grid-cols-[2fr_3fr]">
          <div className="relative min-h-56 overflow-hidden">
            <div className="finish-img absolute inset-0">
              <Zoomed f={f} sizes={sizes} />
            </div>
          </div>
          <div className="flex flex-col justify-center bg-blue-900 p-7 text-white md:p-10">{label}</div>
        </div>
      ) : (
        <>
          <div className="finish-img absolute inset-0 -z-10">
            <Zoomed f={f} sizes={sizes} />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/70 via-ink-900/40 to-transparent p-5 pt-14 text-white">{label}</div>
        </>
      )}
    </Link>
  );
}

export function Finishes() {
  const [foil, embossing, spotUv, softTouch, windowPatch, inserts] = finishes as [Finish, Finish, Finish, Finish, Finish, Finish];
  const small = [embossing, spotUv, softTouch, windowPatch];
  return (
    <Section>
      <FadeIn>
        <SectionHeader
          eyebrow="Finishes"
          title="Details people notice"
          highlight="notice"
          action={
            <Button href="/finishes" variant="ghost" arrow>
              See all finishes
            </Button>
          }
        />
      </FadeIn>
      {/* Desktop: 4 columns, foil 2×2, four 1×1, inserts full width. Tablet: 2 columns. Mobile: 1 column. */}
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4">
        <li className="aspect-square md:col-span-2 md:aspect-[2/1] lg:row-span-2 lg:aspect-auto">
          <FinishCard f={foil} className="h-full" sizes="(min-width: 1024px) 1040px, (min-width: 768px) 100vw, 170vw" />
        </li>
        {small.map((f) => (
          <li key={f.title} className="aspect-[4/3] md:aspect-square lg:aspect-auto">
            <FinishCard f={f} className="h-full" sizes="(min-width: 1024px) 660px, (min-width: 768px) 100vw, 200vw" />
          </li>
        ))}
        <li className="md:col-span-2 lg:col-span-4">
          <FinishCard f={inserts} wide className="h-full" sizes="(min-width: 1024px) 750px, (min-width: 768px) 60vw, 150vw" />
        </li>
      </ul>
    </Section>
  );
}

export function TestimonialsAndFaq() {
  const faqs = faqGroups.flatMap((g) => g.faqs).slice(0, 8);
  const quotes = publicTestimonials.slice(0, 3);
  return (
    <Section>
      {quotes.length > 0 && (
        <div className="mb-20">
          <FadeIn>
            <SectionHeader eyebrow="Testimonials" title="What clients say" highlight="say" />
          </FadeIn>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {quotes.map((t, i) => (
              <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} placeholder={t.placeholder} />
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[120px]">
            <SectionHeader eyebrow="FAQ" title="Common questions" highlight="questions" lead="Answers to what brands ask before ordering." />
            <div className="mt-8 rounded-2xl border border-silver-300 bg-white p-6">
              <p className="font-heading text-h4 font-bold">Still have questions?</p>
              <p className="mt-2 text-ink-500">Ask us directly. A real person replies, usually the same day.</p>
              <WhatsAppButton message="Hi, I have a question about packaging" size="sm" label="Ask on WhatsApp" className="mt-5" />
              {site.whatsapp && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a href={whatsappUrl("Hi, I have a question about packaging") ?? undefined} target="_blank" rel="noopener noreferrer" className="select-all font-semibold text-blue-600 hover:underline">
                    {site.whatsapp}
                  </a>
                  <CopyButton value={site.whatsapp} label="WhatsApp number" />
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a href={`mailto:${site.email}`} className="select-all break-all font-semibold text-blue-600 hover:underline">
                  {site.email}
                </a>
                <CopyButton value={site.email} label="email address" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Accordion items={faqs} />
          <JsonLd data={faqPage(faqs)} />
          <Button href="/faq" variant="ghost" arrow className="mt-8">
            View all FAQs
          </Button>
        </div>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section>
      <CTABand
        title="Ready to create your packaging?"
        highlight="packaging"
        text="Packaging design and printing from one team."
        whatsapp="packaging design and boxes"
        primary={{ href: quoteHref, label: "Get a Quote" }}
      />
    </Section>
  );
}
