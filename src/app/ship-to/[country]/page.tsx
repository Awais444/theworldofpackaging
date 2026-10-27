import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site.config";
import { getShipTo, shipTo } from "@/content/shipTo";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = { params: Promise<{ country: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return shipTo.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getShipTo((await params).country);
  if (!c) return {};
  return {
    title: `Custom Packaging Shipped to ${["USA", "UK", "UAE"].includes(c.country) ? "the " : ""}${c.country}`,
    description: c.intro,
    alternates: { canonical: `/ship-to/${c.slug}` },
  };
}

export default async function ShipToPage({ params }: Props) {
  const c = getShipTo((await params).country);
  if (!c) notFound();
  const others = shipTo.filter((s) => s.slug !== c.slug);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Shipping", href: "/shipping" }, { label: c.country }]}
        spec={["Ship to", c.country, "Air + sea"]}
        title={`Packaging for ${c.country} brands.`}
        intro={<p>{c.intro}</p>}
        actions={
          <>
            <Button href="/quote" size="lg" arrow>
              Quote with freight
            </Button>
            <Button href="/samples" variant="secondary" size="lg">
              Order a sample
            </Button>
          </>
        }
        slotId="world-map"
      />
      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Freight"]} title={`Getting boxes to ${c.country}.`} />
        <div className="mt-12 grid border-y border-line md:grid-cols-2">
          <div className="py-8 md:pr-10">
            <h3 className="type-display text-display-sm">Air</h3>
            <p className="mt-3 text-muted">{c.air}</p>
          </div>
          <div className="border-t border-line py-8 md:border-t-0 md:border-l md:pl-10">
            <h3 className="type-display text-display-sm">Sea</h3>
            <p className="mt-3 text-muted">{c.sea}</p>
          </div>
        </div>
        <p className="mt-6 text-muted">
          Shipping overseas? <Link href="/collapsible-rigid-boxes" className="underline underline-offset-4">Collapsible rigid boxes</Link> ship flat and cut freight volume.
        </p>
      </section>
      <section className="container-x pb-20 md:pb-28">
        <SectionHeader spec={["Good to know"]} title="Before you import." />
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {c.notes.map((n) => (
            <div key={n.title} className="border-t border-line pt-5">
              <h3 className="type-display text-display-sm">{n.title}</h3>
              <p className="mt-3 text-muted">{n.body}</p>
            </div>
          ))}
        </div>
        <p className="spec mt-8 text-muted">General guidance, not customs or legal advice. Confirm with your broker.</p>
      </section>
      <section className="container-x pb-20 md:pb-28">
        <p className="spec mb-4 text-muted">Other countries</p>
        <ul className="flex flex-wrap gap-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/ship-to/${o.slug}`} className="inline-flex h-11 items-center border border-line-strong px-4 hover:bg-fg hover:text-surface">
                {o.country}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ProjectCta title={`Shipping to ${c.country}?`} body={`We quote delivered prices from ${site.country}, air or sea.`} />
    </>
  );
}
