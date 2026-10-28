import type { Metadata } from "next";
import { CheckCircle2, ExternalLink, Factory, Plane, Ship, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { shippingNote, site } from "@/config/site";
import { getPost } from "@/content/blog/posts";
import { countries, countryHref, countryName, countryShippingFaqs, formatTime, getCountry, isIndexable, nearbyCountries, shippingTimes, type Country } from "@/content/countries";
import { designHref, getDesignService, industryDesignService, type DesignService } from "@/content/designServices";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { FlagBadge } from "@/components/countries/FlagBadge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { boxRefCard, type BoxCard } from "@/lib/boxView";
import { faqPage, service as serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

const PENDING = "Confirmed with your quote";
const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });
/** Short name for titles, so "United Arab Emirates" fits the 60-character limit. */
const titleName = (c: Country) => (c.slug === "uae" ? "UAE" : (c.short ?? c.name));
/** "Packaging Design X", or "Packaging: X" when that would push the full title past 60 characters. */
const pageTitle = (c: Country) => (`Packaging Design ${titleName(c)}`.length > 35 ? `Packaging: ${titleName(c)}` : `Packaging Design ${titleName(c)}`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCountry((await params).slug);
  if (!c) return {};
  const description = `Packaging design and custom boxes for ${titleName(c)} brands: ${c.languages.join(" and ")} labels, ${c.currency.code} quotes, made in our own factory. Get a free quote.`;
  return {
    title: pageTitle(c),
    description: description.length > 155 ? `${description.slice(0, 152)}...` : description,
    alternates: { canonical: countryHref(c.slug) },
    robots: isIndexable(c) ? undefined : { index: false, follow: true },
  };
}

export default async function CountryPage({ params }: Props) {
  const c = getCountry((await params).slug);
  if (!c) notFound();
  const name = countryName(c);
  const boxes = c.recommendedBoxes.map(boxRefCard).filter((b): b is BoxCard => Boolean(b));
  const services = c.recommendedServices.map(getDesignService).filter((s): s is DesignService => Boolean(s));
  const inds = c.topIndustries.map((slug) => industries.find((i) => i.slug === slug)).filter((i): i is (typeof industries)[number] => Boolean(i));
  const guides = (c.guideSlugs ?? []).map(getPost).filter((p): p is NonNullable<ReturnType<typeof getPost>> => Boolean(p));
  const nearby = nearbyCountries(c);
  const faqs = [...c.faqs, ...countryShippingFaqs];
  const full = c.tier < 3;
  const ship = shippingTimes(c);

  const glance = [
    { label: "Currency", value: `${c.currency.name} (${c.currency.code})` },
    { label: "Label language", value: c.languages.join(", ") },
    { label: "Units", value: c.measurement === "both" ? "Metric and US customary" : c.measurement === "metric" ? "Metric" : "Imperial" },
    { label: "Labelling authority", value: c.labelling.authority || PENDING },
    { label: "Air shipping", value: formatTime(ship.air, ship.airApprox, PENDING) },
    { label: "Sea shipping", value: formatTime(ship.sea, ship.seaApprox, PENDING) },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: `Packaging design and custom boxes for ${c.name}`, description: c.lead, path: countryHref(c.slug), category: "Packaging design and manufacturing", areaServed: { "@type": "Country", name: c.name } }),
          faqPage(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pb-14 pt-8 md:pb-20">
        <span aria-hidden="true" className="absolute -right-48 -top-48 h-[30rem] w-[30rem] rounded-full bg-blue-50" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ label: "Countries", href: "/countries" }, { label: c.name }]} />
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3">
              <FlagBadge iso2={c.iso2} size="lg" />
              <p className="text-eyebrow text-blue-600">{c.region}</p>
            </div>
            <h1 className="text-h1 mt-5">Packaging design &amp; custom boxes for {c.name} brands</h1>
            <p className="text-lead mt-5 text-ink-500">{c.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              {[`MOQ ${site.facts.rigidMoq}`, "Own factory", `Ships to ${name} by air & sea`].map((t) => (
                <li key={t} className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-orange-text">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={quoteHref} size="lg" arrow>
                Get a Free Quote
              </Button>
              <WhatsAppButton message={`Hi, I'm in ${c.name} and need packaging.`} />
            </div>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <Section bg="silver-50" className="!py-12 md:!py-16">
        <h2 className="text-h3">{c.name} at a glance</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {glance.map((g) => (
            <div key={g.label} className="rounded-2xl border border-silver-300 bg-white p-5">
              <dt className="text-sm text-ink-500">{g.label}</dt>
              <dd className="mt-1 font-semibold text-ink-900">{g.value}</dd>
            </div>
          ))}
        </dl>
        {(ship.airApprox || ship.seaApprox) && <p className="mt-4 text-sm text-ink-500">Shipping times are approximate. {shippingNote}</p>}
      </Section>

      {/* Full pages only: Tier 3 pages stay short (COUNTRY_PAGES_PLAN.md §2). */}
      {full && (
        <>
      {/* Packaging design for the country */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Packaging design" title={`Packaging for ${name}`} highlight={name.replace(/^the /, "")} />
            {c.marketNotes.map((p) => (
              <p key={p.slice(0, 40)} className="mt-5 text-ink-500">
                {p}
              </p>
            ))}
          </div>
          <ul className="space-y-4 lg:col-span-5">
            {[
              { icon: Sparkles, title: `Designed for ${name}`, text: `Layouts planned for ${c.languages.join(" and ")} text and local labelling, with first concepts usually within ${site.facts.firstConceptHours} hours.` },
              { icon: Factory, title: "Made in our own factory", text: `Rigid and printed boxes from ${site.facts.rigidMoq} units, with a physical sample before production.` },
              { icon: Plane, title: `Shipped to ${name}`, text: "By air for speed or by sea for volume, assembled or flat-packed." },
            ].map((card) => (
              <li key={card.title} className="flex gap-4 rounded-2xl border border-silver-300 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <card.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-h4 font-bold">{card.title}</p>
                  <p className="mt-1 text-sm text-ink-500">{card.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

        </>
      )}

      {/* Labelling: Tier 3 pages have no verified summary yet, so they show a short note instead. */}
      {!c.labelling.summary ? (
        <Section bg="silver" className="!py-12 md:!py-16">
          <SectionHeader eyebrow="Labelling and compliance" title={`Labelling in ${name}`} highlight="Labelling" />
          <p className="mt-5 max-w-3xl text-ink-500">
            Labelling requirements in {name} depend on your product, whether it is food, cosmetics, supplements or another regulated category. Confirm the required language, text and any registration with your importer or adviser before artwork is final. We lay out the text you supply; final regulatory review stays with you.
          </p>
        </Section>
      ) : (
        <>
      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Labelling and compliance" title={`Labelling in ${name}`} highlight="Labelling" />
            <p className="mt-5 text-ink-500">{c.labelling.summary}</p>
            <p className="mt-4 text-sm font-semibold text-ink-900">Last reviewed: {dateFmt.format(new Date(c.labelling.lastReviewed))}</p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {c.labelling.keyPoints.map((k) => (
                <li key={k} className="flex gap-3 rounded-2xl bg-white p-4">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold text-ink-900">Official sources</p>
            <ul className="mt-2 space-y-1.5">
              {c.labelling.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline">
                    {s.label} <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl border border-silver-300 bg-white p-4 text-sm text-ink-500">
              General information, not legal advice. Rules change and depend on your product. We lay out the text you supply; final regulatory review stays with you and your adviser.
            </p>
          </div>
        </div>
      </Section>

        </>
      )}

      {/* Shipping */}
      <Section>
        <SectionHeader
          eyebrow="Shipping"
          title={`Shipping to ${name}`}
          highlight="Shipping"
          action={
            <Link href="/shipping" className="font-semibold text-blue-600 hover:underline">
              How shipping works →
            </Link>
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { icon: Plane, title: "Air freight", time: ship.air ? `${formatTime(ship.air, ship.airApprox)} by air` : PENDING, text: "For samples, launches and urgent stock. Delivered to your address, warehouse or 3PL." },
            { icon: Ship, title: "Sea freight", time: ship.sea ? `${formatTime(ship.sea, ship.seaApprox)} by sea` : PENDING, text: "For production volumes. Usually to a port, then onward by road." },
          ].map((m) => (
            <div key={m.title} className="rounded-2xl border border-silver-300 p-6">
              <m.icon aria-hidden="true" className="h-6 w-6 text-blue-600" />
              <p className="mt-3 font-heading text-h4 font-bold">{m.title}</p>
              <p className="mt-1 text-sm font-semibold text-orange-text">{m.time}</p>
              <p className="mt-2 text-ink-500">{m.text}</p>
            </div>
          ))}
        </div>
        {(ship.airApprox || ship.seaApprox) && <p className="mt-4 text-sm text-ink-500">{shippingNote}</p>}
        <div className="mt-6 rounded-2xl bg-blue-50 p-6">
          <p className="font-semibold text-ink-900">Ship flat, save space</p>
          <p className="mt-1 text-ink-500">{c.shipping.collapsibleTip}</p>
          <p className="mt-3 text-sm text-ink-500">
            Delivery terms: {c.shipping.incoterms.length ? c.shipping.incoterms.join(", ") : "agreed in your quote"}. Boxes are packed in export cartons, assembled or flat.
          </p>
        </div>
      </Section>

      {/* Full pages only: Tier 3 pages stay short (COUNTRY_PAGES_PLAN.md §2). */}
      {full && (
        <>
      {/* Ordering */}
      <Section bg="silver">
        <SectionHeader eyebrow="Ordering" title={`Ordering from ${name}`} highlight="Ordering" />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Brief and quote", text: `Send your product, quantity and where it will be sold in ${name}. We reply ${site.facts.quoteReply} with questions, a recommended box and a fixed quote.` },
            { title: "Design for the market", text: `Concepts on 3D mockups, with space planned for ${c.languages.join(" and ")} text and the information required in ${name}.` },
            { title: "Sample and approval", text: "A physical sample in your materials and finishes, checked with your real product before production." },
            { title: "Production and delivery", text: `Made in our own factory, packed in export cartons and shipped to ${name} by air or sea, assembled or flat.` },
          ].map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-6">
              <span className="text-xs font-bold tabular-nums tracking-wider text-blue-600">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-heading text-h4 font-bold">{s.title}</p>
              <p className="mt-2 text-sm text-ink-500">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Seasons and checklist */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {c.seasons && c.seasons.length > 0 && (
            <div>
              <SectionHeader eyebrow="Plan ahead" title="Busy seasons to plan for" highlight="seasons" />
              <p className="mt-5 text-ink-500">Packaging for these peaks should be designed, sampled and shipped well in advance. Tell us your launch date and we plan backwards from it.</p>
              <ul className="mt-6 space-y-3">
                {c.seasons.map((s) => (
                  <li key={s} className="flex gap-3 rounded-2xl border border-silver-300 p-4">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <SectionHeader eyebrow="Checklist" title={`Packaging checklist for ${name}`} highlight="checklist" />
            <ul className="mt-8 space-y-3">
              {[
                `Prepare mandatory label text in ${c.languages.join(" and ")} with your adviser.`,
                `Show net quantity in ${c.measurement === "both" ? "metric and US customary units" : "metric units"}.`,
                `Check product-specific rules with ${c.labelling.authority || "your importer or adviser"}.`,
                boxes.length >= 2 ? `Consider ${boxes[0]!.name.toLowerCase()} or ${boxes[1]!.name.toLowerCase()}, popular with ${c.name} brands.` : "Choose a box style that suits your product and channel.",
                "Choose air for launches and samples, sea for production volumes.",
                guides[0] ? `Read our guide: ${guides[0].title}.` : "Approve a physical sample before production.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

        </>
      )}

      {/* Popular packaging */}
      <Section bg="silver-50">
        <SectionHeader eyebrow="Popular packaging" title={`Popular with ${c.name} brands`} highlight="Popular" />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-3">
          {boxes.map((b) => (
            <ProductCard key={b.href} {...b} />
          ))}
        </div>
        <p className="mt-10 text-sm font-semibold text-ink-900">Design services</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={designHref(s.slug)} className="inline-flex h-10 items-center rounded-full border border-silver-300 bg-white px-4 text-sm font-semibold hover:border-blue-600 hover:text-blue-600">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Industries and cities */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Industries" title={`Industries we serve in ${name}`} highlight="Industries" />
            <ul className="mt-8 flex flex-wrap gap-2">
              {inds.map((i) => (
                <li key={i.slug}>
                  <Link href={industryDesignService[i.slug] ? designHref(industryDesignService[i.slug]!) : `/industries/${i.slug}`} className="inline-flex h-10 items-center rounded-full bg-blue-50 px-4 text-sm font-semibold text-blue-600 hover:bg-blue-100">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {c.cities && c.cities.length > 0 && (
            <div>
              <SectionHeader eyebrow="Cities" title="Where we deliver" highlight="deliver" />
              <ul className="mt-8 space-y-3">
                {c.cities.map((city) => (
                  <li key={city.slug} className="rounded-2xl border border-silver-300 p-4">
                    <p className="font-semibold text-ink-900">{city.name}</p>
                    <p className="mt-1 text-sm text-ink-500">{city.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {/* Guides */}
      {full && guides.length > 0 && (
        <Section bg="silver-50">
          <SectionHeader eyebrow="Guides" title={`Guides for ${c.name} brands`} highlight="Guides" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/blog/${g.slug}`} className="block h-full rounded-2xl border border-silver-300 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-md">
                  <p className="font-heading text-lg font-bold">{g.title}</p>
                  <p className="mt-2 text-sm text-ink-500">{g.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title={`Questions from ${c.name}`} highlight="Questions" />
          </div>
          <dl className="divide-y divide-silver-300 border-y border-silver-300 lg:col-span-8">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="text-[17px] font-semibold text-ink-900">{f.q}</dt>
                <dd className="mt-2 text-ink-500">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <Section bg="silver-50" className="!py-12 md:!py-16">
          <h2 className="text-h3">Nearby countries</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link href={countryHref(n.slug)} className="flex items-center gap-3 rounded-2xl border border-silver-300 bg-white p-3 font-semibold transition hover:border-blue-600 hover:text-blue-600">
                  <FlagBadge iso2={n.iso2} size="sm" />
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/countries" className="mt-6 inline-block font-semibold text-blue-600 hover:underline">
            All countries →
          </Link>
        </Section>
      )}

      <Section>
        <CTABand
          title={`Packaging for your ${c.name} launch`}
          highlight="launch"
          text={`Tell us what you are making and where it ships. We reply ${site.facts.quoteReply} with a design route, a box recommendation and a quote.`}
          whatsapp={`packaging in ${c.name}`}
          actions={
            <Button href={quoteHref} variant="accent" size="lg" arrow>
              Get a Free Quote
            </Button>
          }
        />
      </Section>
    </>
  );
}
