import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { teamGroups } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Our Design and Factory Team",
  description: metaDescription("The packaging designers, brand designers, pre-press and factory teams who take your packaging from sketch to delivered box."),
  alternates: { canonical: "/team" }, openGraph: ogFor("/team"),
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Team" }]}
        eyebrow="Our team"
        title="One team from sketch to box"
        highlight="One"
        intro={<p>Designers, pre-press specialists and factory staff work on the same projects, so your packaging is designed for the way it will be made.</p>}
        actions={
          <Button href={quoteHref} size="lg" arrow>
            Get a Free Quote
          </Button>
        }
        whatsapp="packaging design"
      />
      <Section bg="silver">
        <ul className="grid gap-6 md:grid-cols-2">
          {teamGroups.map((g) => (
            <li key={g.name} className="rounded-3xl bg-white p-6 md:p-8">
              <h2 className="text-h3">{g.name}</h2>
              <p className="mt-2 text-ink-500">{g.summary}</p>
              <ul className="mt-5 space-y-2">
                {g.does.map((d) => (
                  <li key={d} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>
      <Section className="!pt-0">
        <CTABand
          title="Work with our team"
          highlight="team"
          text="Tell us about your product and we will put the right people on it."
          whatsapp="packaging design"
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
