import type { Metadata } from "next";
import { CheckCircle2, UserRound } from "lucide-react";
import { site } from "@/config/site";
import { companyNumbers, differences, story, team, values } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "About us: a design studio with its own box factory",
  description: `${site.name} designs brands and packaging and makes rigid boxes in its own factory in ${site.country}, for brands worldwide.`,
  alternates: { canonical: "/about" },
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
            <SectionHeader eyebrow="Our story" title="Started on the factory floor" highlight="floor" />
            {/* TODO: real founding story */}
            <Tag tone="orange" className="mt-6">
              Story to confirm
            </Tag>
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
        <SectionHeader eyebrow="In numbers" title="The studio and factory today" highlight="today" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companyNumbers.map((n) => (
            <StatCard key={n.label} value={n.value} label={n.label} placeholder />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Team" title="The people behind your boxes" highlight="people" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <li key={`${m.role}-${i}`} className="rounded-2xl bg-silver-100 p-6">
              <div className="flex aspect-square items-center justify-center rounded-xl bg-white text-silver-300" aria-hidden="true">
                <UserRound className="h-16 w-16" />
              </div>
              <p className="mt-4 font-heading text-lg font-bold">{m.placeholder ? "Name to come" : m.name}</p>
              <p className="text-sm text-ink-500">{m.role}</p>
              {m.placeholder && (
                <Tag tone="orange" className="mt-3">
                  Placeholder
                </Tag>
              )}
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
