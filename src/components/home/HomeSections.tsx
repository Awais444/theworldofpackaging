import {
  Factory,
  Gem,
  Globe,
  Layers,
  Package,
  Palette,
  PenTool,
  Sparkles,
  Stamp,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { site, whatsappUrl } from "@/config/site";
import { caseStudies } from "@/content/caseStudies";
import { faqGroups } from "@/content/faqs";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { testimonials } from "@/content/testimonials";
import { Media } from "@/components/media/Media";
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
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";
import { Tabs } from "@/components/ui/Tabs";
import { illustrations } from "@/components/illustrations";
import { industryIcon } from "@/components/industries/industryIcons";
import { printedCard, rigidCard } from "@/lib/boxView";
import { faqPage } from "@/lib/schema";

export function ClientLogos() {
  // TODO: replace with real client logos (with permission).
  const logos = [
    "Halden",
    "Ostra",
    "Kiri Atelier",
    "Marrow & Vale",
    "Nove",
    "Brightleaf",
    "Solace",
    "Umber",
  ].map((name) => ({ name, placeholder: true }));
  return (
    <div className="border-y border-silver-300/60 bg-white py-10">
      <LogoMarquee title="Trusted by growing brands" logos={logos} />
    </div>
  );
}

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
                rigid.map((s) => <ProductCard key={s.slug} {...rigidCard(s)} />),
              ),
            },
            {
              id: "printed",
              label: "Printed boxes",
              content: grid(
                printed.map((s) => <ProductCard key={s.slug} {...printedCard(s)} />),
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
  },
  {
    icon: PenTool,
    title: "Packaging Design",
    text: "Structure and artwork designed together, ready for print.",
    href: "/services/packaging-design",
    bullets: ["Dielines", "Label design", "3D mockups"],
  },
  {
    icon: Factory,
    title: "Box Manufacturing",
    text: "Rigid, collapsible and printed boxes made in our own factory.",
    href: "/rigid-boxes",
    bullets: ["Rigid boxes", "Collapsible rigid", "Printed boxes"],
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

const reasons: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: Factory,
    title: "Own factory",
    text: "Rigid boxes are made and printed in-house, not outsourced.",
  },
  {
    icon: Layers,
    title: `MOQ ${site.facts.rigidMoq}`,
    text: `Rigid and collapsible rigid boxes from ${site.facts.rigidMoq} units.`,
  },
  {
    icon: Palette,
    title: "Free design support",
    text: "Every order includes artwork checks and dieline setup.",
  },
  {
    icon: Package,
    title: "Sample before production",
    text: "Approve a physical sample before the full run starts.",
  },
  {
    icon: Sparkles,
    title: "Premium finishes",
    text: "Foil, embossing, spot UV, soft-touch and custom inserts.",
  },
  {
    icon: Globe,
    title: "Worldwide shipping",
    text: "By air or sea to the USA, UK, Canada, Australia, UAE and EU.",
  },
];

export function WhyUs() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <FadeIn>
            <SectionHeader
              eyebrow="Why choose us"
              title="One team from sketch to delivered box"
              highlight="delivered"
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((r) => (
                <li
                  key={r.title}
                  className="h-full rounded-2xl border border-silver-300 p-6"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                    <r.icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="text-h4 mt-4">{r.title}</h3>
                  <p className="mt-2 text-ink-500">{r.text}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <FadeIn delay={0.1} className="lg:col-span-4">
          <Media
            slot="home-factory"
            panel="blue"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </FadeIn>
      </div>
    </Section>
  );
}

export function FeaturedWork() {
  return (
    <Section bg="silver">
      <FadeIn>
        <SectionHeader
          eyebrow="Featured work"
          title="Brands we helped launch"
          highlight="launch"
          action={
            <Button href="/work" variant="ghost" arrow>
              View all work
            </Button>
          }
        />
      </FadeIn>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {caseStudies.slice(0, 3).map((c, i) => (
          <FadeIn key={c.slug} delay={i * 0.08}>
            <CaseCard
              href={`/work/${c.slug}`}
              title={c.client}
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

export function HowItWorks() {
  return (
    <Section>
      <FadeIn>
        <SectionHeader
          eyebrow="How it works"
          title="Four steps to your boxes"
          highlight="boxes"
          lead={`We reply to every brief ${site.facts.quoteReply}.`}
        />
      </FadeIn>
      <FadeIn delay={0.1} className="mt-12">
        <StepList
          steps={[
            {
              title: "Share your brief",
              body: "Tell us the product, size, quantity and where it ships.",
            },
            {
              title: "Design & sample",
              body: "We design or check your artwork, then make a physical sample.",
            },
            {
              title: "Production",
              body: "Your boxes are made, printed and checked in our factory.",
            },
            {
              title: "Delivery",
              body: "Packed and shipped by air or sea to your door.",
            },
          ]}
        />
      </FadeIn>
      <div className="mt-10">
        <Button href="/how-it-works" variant="secondary" arrow>
          See full process
        </Button>
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
        {industries.map((ind) => (
          <IndustryCard
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            name={ind.name}
            icon={industryIcon(ind.slug)}
            boxes={ind.styles.slice(0, 3)}
          />
        ))}
      </div>
    </Section>
  );
}

const finishes: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: Sparkles,
    title: "Foil stamping",
    text: "Gold, silver or coloured foil pressed into the wrap.",
  },
  {
    icon: Stamp,
    title: "Embossing",
    text: "Raised or debossed logos you can feel.",
  },
  { icon: Gem, title: "Spot UV", text: "Gloss highlights on a matte surface." },
  {
    icon: Layers,
    title: "Soft-touch",
    text: "Velvety lamination that resists scuffs.",
  },
  {
    icon: Package,
    title: "Window patch",
    text: "Clear PET window to show the product.",
  },
  {
    icon: Truck,
    title: "Custom inserts",
    text: "EVA, card or pulp inserts cut to fit.",
  },
];

export function Finishes() {
  return (
    <Section>
      <FadeIn>
        <SectionHeader
          eyebrow="Finishes"
          title="Details people notice"
          highlight="notice"
        />
      </FadeIn>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {finishes.map((f) => (
          <li key={f.title} className="rounded-2xl bg-silver-100 p-5">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-500">
              <f.icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-heading text-base font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-ink-500">{f.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function TestimonialsAndFaq() {
  const faqs = faqGroups.flatMap((g) => g.faqs).slice(0, 6);
  return (
    <Section bg="silver">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <FadeIn>
            <SectionHeader
              eyebrow="Testimonials"
              title="What clients say"
              highlight="say"
            />
          </FadeIn>
          <div className="mt-10 space-y-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard
                key={i}
                quote={t.quote}
                name={t.name}
                role={t.role}
                placeholder={t.placeholder}
              />
            ))}
          </div>
        </div>
        <div>
          <FadeIn>
            <SectionHeader
              eyebrow="FAQ"
              title="Common questions"
              highlight="questions"
            />
          </FadeIn>
          <div className="mt-10 rounded-3xl bg-white p-2 md:p-4">
            <Accordion items={faqs} />
          </div>
          <JsonLd data={faqPage(faqs)} />
          <Button href="/faq" variant="ghost" arrow className="mt-6">
            All questions
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
        text="Free design check · Sample before production"
        actions={
          <>
            <Button href={quoteHref} variant="accent" size="lg" arrow>
              Get a Quote
            </Button>
            <a
              href={whatsappUrl("Hi, I'd like to talk about packaging.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center rounded-full bg-white px-8 font-semibold text-blue-600 hover:bg-blue-50"
            >
              WhatsApp us
            </a>
          </>
        }
      />
    </Section>
  );
}
