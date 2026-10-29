import { site } from "@/config/site";
import { CheckCircle2, Gift, ShieldCheck, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { designHref } from "@/content/designServices";
import { guidesForBox, servicesForBox } from "@/content/linking";
import { GuideCards } from "@/components/sections/RelatedLinks";
import { RelatedWork } from "@/components/sections/RelatedWork";
import { relatedWork } from "@/content/caseStudies";
import { getMedia } from "@/content/media";
import { orderSteps } from "@/content/boxDetails";
import { getIndustry } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";
import { StepList } from "@/components/ui/StepList";
import { Tag } from "@/components/ui/Tag";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { BoxView } from "@/lib/boxView";
import { faqPage, product } from "@/lib/schema";
import { ProductGallery } from "./ProductGallery";

const featureIcons: LucideIcon[] = [Sparkles, ShieldCheck, Gift, Wrench];

/** Box style page (CLAUDE.md §7.1), shared by rigid and printed styles. */
export function BoxStylePage({ box }: { box: BoxView }) {
  const hub = box.kind === "rigid" ? { label: "Rigid Boxes", href: "/rigid-boxes" } : { label: "Printed Boxes", href: "/printed-boxes" };
  const gallerySlots = box.slots.slice(0, 5);
  const quote = `${quoteHref}?style=${box.slug}`;
  const designFor = servicesForBox(`${box.kind}:${box.slug}`);

  return (
    <>
      <JsonLd data={[product({ name: box.name, description: box.summary, path: box.href, category: hub.label, image: getMedia(box.slots[0]!).src, caption: getMedia(box.slots[0]!).alt, properties: box.specs }), faqPage(box.faqs)]} />

      {/* 1–2. Breadcrumbs and product hero */}
      <section className="bg-white pb-16 pt-8 md:pb-24">
        <div className="container-x">
          <Breadcrumbs items={[hub, { label: box.name }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery
                labels={gallerySlots.map((s) => getMedia(s).alt)}
                main={gallerySlots.map((s, i) => (
                  <Media key={s} slot={s} priority={i === 0} sizes="(min-width: 1024px) 55vw, 100vw" />
                ))}
                thumbs={gallerySlots.map((s) => (
                  <Media key={s} slot={s} className="rounded-xl" sizes="120px" />
                ))}
              />
            </div>
            <div className="lg:col-span-5">
              <Tag tone={box.kind === "rigid" ? "blue" : "orange"}>{box.kind === "rigid" ? "Rigid box" : "Printed box"}</Tag>
              <h1 className="text-h1 mt-4">{box.name}</h1>
              <p className="text-lead mt-4 text-ink-500">{box.summary}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3">
                {box.chips.map((c) => (
                  <div key={c.label} className="rounded-xl bg-silver-50 px-4 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{c.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-ink-900">{c.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 space-y-2.5">
                {box.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={quote} size="lg" arrow>
                  Get a Quote
                </Button>
                <WhatsAppButton topic={box.name.endsWith("Box") ? `${box.name}es` : `${box.name}s`} variant="ghost" />
              </div>
              <p className="mt-4 text-sm text-ink-500">
                Free design support included · {site.facts.yearsExperience}+ years in packaging. Read about our{" "}
                <Link href="/materials" className="font-semibold text-blue-600 hover:underline">materials</Link>, the{" "}
                <Link href="/factory" className="font-semibold text-blue-600 hover:underline">factory</Link> and{" "}
                <Link href="/how-it-works" className="font-semibold text-blue-600 hover:underline">how it works</Link>.
              </p>
            </div>
          </div>
          <p className="mt-10 max-w-3xl text-ink-500">{box.description}</p>
        </div>
      </section>

      {/* 3. Customize */}
      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="Options" title="Customize your box" highlight="box" lead="Every part is made to order. Pick what you need, or ask us to recommend." />
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {box.options.map((g) => (
            <div key={g.title} className="rounded-2xl bg-white p-6">
              <h3 className="text-h4">{g.title}</h3>
              <ul className="mt-4 space-y-3">
                {g.items.map((o) => (
                  <li key={o.name}>
                    <p className="font-semibold">{o.name}</p>
                    {o.detail && <p className="text-sm text-ink-500">{o.detail}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Features */}
      <Section>
        <FadeIn>
          <SectionHeader eyebrow="Features" title={`Why choose a ${box.name.toLowerCase()}`} highlight={box.name.toLowerCase().split(" ")[0]} />
        </FadeIn>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {box.features.map((f, i) => {
            const Icon = featureIcons[i % featureIcons.length]!;
            return (
              <li key={f.title} className="rounded-2xl border border-silver-300 p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="text-h4 mt-4">{f.title}</h3>
                <p className="mt-2 text-ink-500">{f.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 5. Gallery */}
      <Section bg="blue-50">
        <FadeIn>
          <SectionHeader eyebrow="Gallery" title="See the details" highlight="details" />
        </FadeIn>
        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
          {box.slots.slice(1, 7).map((s) => (
            <Media key={s} slot={s} panel="white" sizes="(min-width: 1024px) 33vw, 50vw" />
          ))}
        </div>
      </Section>

      {/* 6–7. Specs and industries */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Specifications" title="Technical specs" highlight="specs" />
            <div className="mt-10">
              <SpecTable caption={`${box.name} specifications`} rows={box.specs} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Perfect for" title="Industries we pack for" highlight="pack" />
            <ul className="mt-10 flex flex-wrap gap-3">
              {box.industries.map((slug) => {
                const ind = getIndustry(slug);
                if (!ind) return null;
                return (
                  <li key={slug}>
                    <Link href={`/industries/${slug}`} className="inline-flex h-11 items-center rounded-full border border-silver-300 px-5 font-medium transition-colors hover:border-blue-600 hover:text-blue-600">
                      {ind.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* 8. How to order */}
      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="How to order" title="Four steps to your boxes" highlight="boxes" />
        </FadeIn>
        <div className="mt-12">
          <StepList steps={orderSteps} />
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title={`${box.name} questions`} highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={box.faqs} />
          </div>
        </div>
      </Section>

      {/* Guides and design services (internal linking rules) */}
      <Section>
        <GuideCards guides={guidesForBox(box.kind, box.slug)} />
        {designFor.length > 0 && (
          <div className="mt-14">
            <h2 className="text-h4 font-heading font-bold">Design services for this box</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {designFor.map((d) => (
                <li key={d.slug}>
                  <Link href={designHref(d.slug)} className="inline-flex h-11 items-center rounded-full border border-silver-300 px-5 text-sm font-semibold transition-colors hover:border-blue-600 hover:text-blue-600">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <RelatedWork studies={relatedWork({ box: `${box.kind}:${box.slug}` })} bg="silver-50" />

      {/* 10. Related */}
      <Section bg="silver">
        <SectionHeader
          eyebrow="Related"
          title="You might also like"
          highlight="like"
          action={
            <Button href={hub.href} variant="ghost" arrow>
              All {hub.label.toLowerCase()}
            </Button>
          }
        />
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          {box.related.map((r) => (
            <ProductCard key={r.href} {...r} />
          ))}
        </div>
      </Section>

      {/* 11. CTA */}
      <Section>
        <CTABand
          title={`Get a price for your ${box.name.toLowerCase()}`}
          whatsapp={box.name.endsWith("Box") ? `${box.name}es` : `${box.name}s`}
          highlight="price"
          text="Send your size and quantity. Free design support with every order."
          actions={
            <>
              <Button href={quote} variant="accent" size="lg" arrow>
                Get a Quote
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
