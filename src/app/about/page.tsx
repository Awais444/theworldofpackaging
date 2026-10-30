import Link from "next/link";
import { companyFacts } from "@/lib/companyFacts";
import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { factStats, heritageLine, site } from "@/config/site";
import { differences, milestones, story, teamGroups, values } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Timeline } from "@/components/ui/Timeline";

export const metadata: Metadata = {
  title: "About Our Studio and Factory",
  description: metaDescription(`${site.facts.yearsExperience}+ years in packaging: ${site.name} designs brands and packaging and makes rigid boxes in its own factory in ${site.country}.`),
  alternates: { canonical: "/about" }, openGraph: ogFor("/about"),
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About us"
        title="A design studio with its own factory"
        highlight="factory"
        intro={<p>Our designers and our production team work on the same projects, so what you approve on screen is what comes off the line.</p>}
        slotId="rigid-lid-and-base-gallery-1"
        actions={
          <>
            <Button href={quoteHref} size="lg" arrow>
              Get a Quote
            </Button>
            <Button href="/factory" size="lg" variant="secondary">
              See the factory
            </Button>
          </>
        }
      />

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Who we are" title="Designers and box makers, one team" highlight="one" />
          </div>
          <div className="space-y-5 text-lg lg:col-span-7">
            <p>{story.intro}</p>
            <p>{story.body}</p>
          </div>
        </div>
      </Section>

      <Section bg="klein">
        <p className="text-eyebrow text-white/80">Mission</p>
        <p className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight md:text-4xl">{story.mission}</p>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeader eyebrow="What makes us different" title="Why brands choose us" highlight="choose" />
        </FadeIn>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differences.map((d) => (
            <li key={d.title} className="rounded-2xl border border-silver-300 p-6">
              <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-orange-500" />
              <h3 className="text-h4 mt-4">{d.title}</h3>
              <p className="mt-2 text-ink-500">{d.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="blue-50">
        <SectionHeader eyebrow="Our promises" title="What you can count on" highlight="count" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {factStats().map((n) => (
            <StatCard key={n.label} value={n.value} label={n.label} />
          ))}
        </div>
      </Section>

      <Section bg="silver-50">
        <SectionHeader eyebrow="Company facts" title="The World of Packaging at a glance" highlight="glance" />
        <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {companyFacts().map((f) => (
            <div key={f.label} className="border-t border-silver-300 pt-3">
              <dt className="text-sm font-semibold text-ink-500">{f.label}</dt>
              <dd className="mt-1 font-semibold text-ink-900">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={`Since ${site.facts.foundedYear}`} title={`${site.facts.yearsExperience}+ years in packaging`} highlight="packaging" />
            <div className="mt-5 space-y-4 text-ink-500">
              <p>
                We started about {site.facts.yearsExperience} years ago as {site.history.originalName}, a printing press. Over the years we grew into box manufacturing, then rigid boxes made in our own factory.
              </p>
              <p>
                Along the way we printed packaging for international clients
                {site.clients.length > 0 && <> including {site.clients.map((c) => c.name).join(" and ")}</>}.
              </p>
              <p>Today we are {site.name}: a packaging design studio with its own factory, from first sketch to delivered box.</p>
            </div>
            <p className="mt-6 font-heading font-semibold text-ink-900">{heritageLine()}</p>
            <p className="mt-4 text-ink-500">
              Meet <Link href="/team" className="font-semibold text-blue-600 hover:underline">the team</Link>, see{" "}
              <Link href="/services/logo-design" className="font-semibold text-blue-600 hover:underline">logo design</Link> and{" "}
              <Link href="/pricing" className="font-semibold text-blue-600 hover:underline">design pricing</Link>, or build a box in the{" "}
              <Link href="/configure" className="font-semibold text-blue-600 hover:underline">configurator</Link>.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Timeline items={milestones} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Team"
          title="The people behind your boxes"
          highlight="people"
          action={
            <Button href="/team" variant="ghost" arrow>
              Meet the team
            </Button>
          }
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamGroups.map((g) => (
            <li key={g.name} className="rounded-2xl bg-silver-100 p-6">
              <h3 className="text-h4">{g.name}</h3>
              <p className="mt-2 text-ink-500">{g.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="silver">
        <SectionHeader eyebrow="Values" title="How we work" highlight="work" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.title} className="rounded-2xl bg-white p-6">
              <span className="font-heading text-3xl font-bold text-blue-600">0{i + 1}</span>
              <h3 className="text-h4 mt-2">{v.title}</h3>
              <p className="mt-2 text-ink-500">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Media slot="factory-press" panel="blue" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div>
            <SectionHeader eyebrow="Factory" title="Made under our own roof" highlight="roof" lead="Cutting, printing, wrapping, inserts and quality control happen in one place, so nothing gets lost between suppliers." />
            <Button href="/factory" variant="secondary" arrow className="mt-8">
              Inside the factory
            </Button>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <CTABand
          title="Work with us"
          highlight="Work"
          text={`Tell us about your product. We reply ${site.facts.quoteReply}.`}
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Quote
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
