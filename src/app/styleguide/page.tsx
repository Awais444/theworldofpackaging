import type { Metadata } from "next";
import { SiteImage } from "@/components/media/SiteImage";
import { Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";
import { CropMarks } from "@/components/ui/CropMarks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RegMark } from "@/components/ui/RegMark";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { Tag } from "@/components/ui/Tag";
import { media, type MediaSlotId } from "@/content/media";

// Internal review page for the design system. Not linked, not indexed.
export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const palette = [
  { name: "Paper", token: "--paper", hex: "#F3EFE6" },
  { name: "Ink", token: "--ink", hex: "#141414" },
  { name: "Kraft", token: "--kraft", hex: "#B98A5A" },
  { name: "Board", token: "--board", hex: "#2A2724" },
  { name: "Foil", token: "--foil", hex: "#C9A95C" },
  { name: "Cyan", token: "--cyan", hex: "#00A3E0" },
  { name: "Magenta", token: "--magenta", hex: "#E4007C" },
  { name: "Yellow", token: "--yellow", hex: "#FFD400" },
];

const typeScale = [
  { cls: "text-display-2xl", label: "Display 2XL" },
  { cls: "text-display-xl", label: "Display XL" },
  { cls: "text-display-lg", label: "Display LG" },
  { cls: "text-display-md", label: "Display MD" },
  { cls: "text-display-sm", label: "Display SM" },
];

function Section({ title, children, tone }: { title: string; children: React.ReactNode; tone?: string }) {
  return (
    <section className={tone}>
      <div className="container-x py-16">
        <SpecLabel items={["Styleguide", title]} as="h2" className="mb-8" />
        {children}
      </div>
    </section>
  );
}

const slotIds = Object.keys(media) as MediaSlotId[];

export default function StyleguidePage() {
  return (
    <>
      <Section title="Palette">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {palette.map((c) => (
            <li key={c.name}>
              <span className="block aspect-[4/3] border border-line" style={{ backgroundColor: `var(${c.token})` }} />
              <SpecLabel items={[c.name, c.hex]} as="p" className="mt-2" />
            </li>
          ))}
        </ul>
      </Section>

      <ColorBar className="container-x" label="Control strip" />

      <Section title="Type">
        <div className="space-y-6">
          {typeScale.map((t) => (
            <div key={t.cls} className="grid gap-2 md:grid-cols-[10rem_1fr] md:items-baseline">
              <SpecLabel items={[t.label]} />
              <p className={`type-display ${t.cls}`}>Rigid boxes</p>
            </div>
          ))}
          <div className="grid gap-2 md:grid-cols-[10rem_1fr]">
            <SpecLabel items={["Body"]} />
            <p className="measure text-lg">
              Greyboard wrapped in 157 gsm art paper, foil blocked on the lid and fitted with an EVA insert. Every
              dieline is checked against bleed and fold before it reaches the press.
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-[10rem_1fr]">
            <SpecLabel items={["Mono"]} />
            <p className="font-mono text-sm">250 × 180 × 60 mm · 2.0 mm board · MOQ 500</p>
          </div>
        </div>
      </Section>

      <Section title="Controls">
        <div className="flex flex-wrap items-center gap-4">
          <Button arrow>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="link" href="/styleguide">
            Text link
          </Button>
          <MagneticButton size="lg" arrow>
            Magnetic CTA
          </MagneticButton>
          <Tag>Rigid</Tag>
          <Tag>Packaging</Tag>
          <SpecLabel items={["Style 04", "Magnetic", "2.0 mm board"]} />
          <RegMark />
          <RegMark spinning label="Loading" className="text-magenta" />
        </div>
        <div className="relative mt-16 max-w-md border border-line p-8">
          <CropMarks />
          <p className="text-muted">Any positioned frame takes crop marks.</p>
        </div>
      </Section>

      <Section title="Illustrations / paper">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {slotIds.map((id) => (
            <div key={id}>
              <SiteImage slotId={id} sizes="33vw" />
              <SpecLabel items={[id, media[id]!.illustration]} as="p" className="mt-5" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Illustrations / board tone" tone="tone-board">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {["rigid-magnetic-closure-hero", "mega-menu-feature", "collapsible-flat"].map((id) => (
            <SiteImage key={id} slotId={id} sizes="33vw" />
          ))}
        </div>
      </Section>
    </>
  );
}
