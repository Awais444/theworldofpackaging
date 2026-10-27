import type { Metadata } from "next";
import { Factory, Gem, Palette, Sparkles } from "lucide-react";
import { illustrations, type IllustrationKey } from "@/components/illustrations";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CaseCard, IndustryCard, ProductCard, ServiceCard, StatCard, TestimonialCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Section } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";
import { StepList } from "@/components/ui/StepList";
import { Tabs } from "@/components/ui/Tabs";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const colours = [
  ["blue-50", "bg-blue-50"],
  ["blue-100", "bg-blue-100"],
  ["blue-600", "bg-blue-600"],
  ["blue-700", "bg-blue-700"],
  ["blue-900 (Klein)", "bg-blue-900"],
  ["orange-50", "bg-orange-50"],
  ["orange-500", "bg-orange-500"],
  ["orange-600", "bg-orange-600"],
  ["red-500", "bg-red-500"],
  ["silver-50", "bg-silver-50"],
  ["silver-100", "bg-silver-100"],
  ["silver-300", "bg-silver-300"],
  ["ink-400", "bg-ink-400"],
  ["ink-500", "bg-ink-500"],
  ["ink-900", "bg-ink-900"],
] as const;

const typeScale = [
  ["text-display", "Display"],
  ["text-h1", "Heading 1"],
  ["text-h2", "Heading 2"],
  ["text-h3", "Heading 3"],
  ["text-h4", "Heading 4"],
  ["text-lead", "Lead paragraph for intros."],
] as const;

/** The first eight illustrations, each shown in its colour variants. */
const illos: IllustrationKey[] = [
  "magnetic-closed",
  "magnetic-open",
  "lid-and-base",
  "drawer",
  "mailer-box",
  "tuck-end",
  "collapsible-flat",
  "collapsible-assembled",
];
const variants = ["blue", "klein", "orange", "white"] as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-10">
      <h2 className="text-h3">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Section>
        <SectionHeader as="h1" eyebrow="Internal" title="Design system" highlight="system" lead="Tokens, type and every shared component. Not indexed." />
        <div className="mt-16 space-y-16">
          <Block title="Logo">
            <div className="flex flex-wrap items-center gap-10">
              <Logo asLink={false} />
              <div className="rounded-2xl bg-blue-600 p-6">
                <Logo asLink={false} tone="light" />
              </div>
              <Logo asLink={false} markOnly />
            </div>
          </Block>

          <Block title="Colour">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {colours.map(([name, cls]) => (
                <li key={name}>
                  <div className={cn("h-20 rounded-2xl border border-line", cls)} />
                  <p className="mt-2 text-sm font-medium">{name}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Type">
            <div className="space-y-6">
              {typeScale.map(([cls, label]) => (
                <div key={cls} className="grid gap-2 md:grid-cols-[10rem_1fr] md:items-baseline">
                  <code className="text-sm text-ink-500">{cls}</code>
                  <p className={cls}>{label}</p>
                </div>
              ))}
              <div className="grid gap-2 md:grid-cols-[10rem_1fr] md:items-baseline">
                <code className="text-sm text-ink-500">text-eyebrow</code>
                <p className="text-eyebrow text-blue-600">Eyebrow label</p>
              </div>
            </div>
          </Block>

          <Block title="Buttons and tags">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/get-a-quote" arrow>
                Primary
              </Button>
              <Button href="/get-a-quote" variant="secondary">
                Secondary
              </Button>
              <Button href="/get-a-quote" variant="accent">
                Accent
              </Button>
              <Button href="/get-a-quote" variant="ghost" arrow>
                Ghost link
              </Button>
              <Button href="/get-a-quote" size="sm">
                Small
              </Button>
              <Button href="/get-a-quote" size="lg">
                Large
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Tag>Blue tag</Tag>
              <Tag tone="orange">Orange tag</Tag>
              <Tag tone="red">New</Tag>
            </div>
          </Block>

          <Block title="Cards">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard icon={Palette} title="Brand identity" text="Logo, colour and type for new brands." href="/services/brand-identity" bullets={["Logo system", "Brand guidelines"]} />
              <ProductCard href="/rigid-boxes" name="Magnetic box" text="Rigid board, magnetic flap." slot="home-hero" tags={["Rigid", "MOQ 500"]} />
              <CaseCard href="/work" title="Sample project" text="Shown for layout only." slot="case-halden-apothecary-cover" industry="Beauty" placeholder />
              <IndustryCard href="/industries" name="Jewellery" icon={Gem} boxes={["Drawer", "Ring box", "Magnetic"]} />
              <StatCard value="500" label="Minimum order, rigid boxes" />
              <TestimonialCard quote="Placeholder quote shown for layout." name="Client name" role="Founder" placeholder />
            </div>
          </Block>

          <Block title="Steps">
            <StepList
              steps={[
                { title: "Brief", body: "Tell us about the product." },
                { title: "Design", body: "Concepts and a dieline." },
                { title: "Sample", body: "A physical sample to approve." },
                { title: "Produce", body: "Made in our factory." },
              ]}
            />
          </Block>

          <Block title="Accordion and tabs">
            <div className="grid gap-12 lg:grid-cols-2">
              <Accordion
                items={[
                  { q: "What is the minimum order?", a: "500 units for rigid boxes." },
                  { q: "Do you ship worldwide?", a: "Yes, we ship to most countries." },
                ]}
              />
              <Tabs
                label="Example tabs"
                items={[
                  { id: "ds-one", label: "Overview", content: <p>First panel.</p> },
                  { id: "ds-two", label: "Specs", content: <p>Second panel.</p> },
                ]}
              />
            </div>
          </Block>

          <Block title="Spec table and form fields">
            <div className="grid gap-12 lg:grid-cols-2">
              <SpecTable
                caption="Example specification"
                rows={[
                  { label: "Board", value: "Greyboard" },
                  { label: "Closure", value: "Magnetic" },
                ]}
              />
              <form className="space-y-5">
                <Field label="Name" htmlFor="ds-name">
                  <Input id="ds-name" placeholder="Your name" />
                </Field>
                <Field label="Box style" htmlFor="ds-style" error="Choose a style">
                  <Select id="ds-style" defaultValue="">
                    <option value="">Select…</option>
                    <option>Magnetic</option>
                  </Select>
                </Field>
                <Field label="Message" htmlFor="ds-msg" hint="Optional">
                  <Textarea id="ds-msg" rows={3} />
                </Field>
              </form>
            </div>
          </Block>

          <Block title="All illustrations">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {(Object.keys(illustrations) as IllustrationKey[]).map((key) => {
                const Illo = illustrations[key];
                return (
                  <figure key={key} className="rounded-3xl bg-silver-100 p-4">
                    <div className="aspect-[4/3]">
                      <Illo />
                    </div>
                    <figcaption className="mt-2 text-sm text-ink-500">{key}</figcaption>
                  </figure>
                );
              })}
            </div>
          </Block>

          <Block title="Illustrations">
            <div className="space-y-10">
              {illos.map((key) => {
                const Illo = illustrations[key];
                return (
                  <div key={key}>
                    <p className="text-sm font-medium text-ink-500">{key}</p>
                    <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
                      {variants.map((v) => (
                        <div key={v} className={cn("aspect-[4/3] rounded-3xl p-[6%]", v === "white" ? "bg-blue-50" : "bg-silver-100")}>
                          <Illo className={`illo--${v}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Block>
        </div>
      </Section>

      <LogoMarquee title="Example marquee" logos={["Halden", "Ostra", "Kiri", "Marrow", "Nove"].map((name) => ({ name, placeholder: true }))} />

      <Section bg="klein">
        <SectionHeader dark eyebrow="Dark section" title="Klein blue background" highlight="Klein" lead="White text, orange accents." />
      </Section>

      <Section>
        <CTABand title="Ready to start your packaging?" highlight="packaging" text="Send a brief and get a quote." actions={<Button href="/get-a-quote" variant="white">Get a quote</Button>} />
        <div className="mt-8 flex items-center gap-3 text-sm text-ink-500">
          <Sparkles aria-hidden="true" className="h-4 w-4" /> Icons from lucide-react <Factory aria-hidden="true" className="h-4 w-4" />
        </div>
      </Section>
    </>
  );
}
