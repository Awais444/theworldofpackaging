import { ArrowRight, EyeOff, Package, PackageX, ShieldAlert, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { factStats } from "@/config/site";
import { posts } from "@/content/blog/posts";
import { featuredDesignSlugs, getDesignService, type DesignService } from "@/content/designServices";
import { DesignCard } from "@/components/design/DesignCard";
import { illustrations } from "@/components/illustrations";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";

/** "Packaging design for every product": 12 service cards directly under the hero. */
export function DesignForEveryProduct() {
  const items = featuredDesignSlugs.map(getDesignService).filter((s): s is DesignService => Boolean(s));
  return (
    <Section>
      <FadeIn>
        <SectionHeader
          eyebrow="Packaging design services"
          title="Packaging design for every product"
          highlight="every"
          lead="Pick your product. We design the box, label or pouch, then make it in our own factory if you want us to."
          action={
            <Button href="/packaging-design" variant="ghost" arrow>
              View all packaging design services
            </Button>
          }
        />
      </FadeIn>
      <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {items.map((s) => (
          <DesignCard key={s.slug} s={s} />
        ))}
      </div>
    </Section>
  );
}

const problems: Array<{ icon: LucideIcon; problem: string; why: string; fix: string; href: string; cta: string }> = [
  {
    icon: EyeOff,
    problem: "It disappears on the shelf",
    why: "Too many messages, weak contrast and no clear focal point, so shoppers walk past.",
    fix: "One hero message, a strong colour block and a front panel tested from two metres away.",
    href: "/packaging-design/packaging-redesign",
    cta: "Packaging redesign",
  },
  {
    icon: PackageX,
    problem: "It arrives damaged or crushed",
    why: "Boxes designed without the right board, insert or shipping test fail in the post.",
    fix: "Structure, board and insert chosen for your product, checked with a physical sample.",
    href: "/packaging-design/structural-dieline-design",
    cta: "Structural design",
  },
  {
    icon: ShieldAlert,
    problem: "The print does not match the design",
    why: "Files made without knowing the press, paper or finish come out dull, misaligned or off-colour.",
    fix: "Artwork made for our own presses and finishes, proofed before production.",
    href: "/how-it-works",
    cta: "How we work",
  },
];

/** "Why packaging fails on shelf": three problems and how we fix them. */
export function ShelfProblems() {
  return (
    <Section bg="silver">
      <FadeIn>
        <SectionHeader eyebrow="Why packaging fails" title="Why packaging fails on shelf, and how we fix it" highlight="fix" />
      </FadeIn>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {problems.map((p) => (
          <li key={p.problem} className="flex flex-col rounded-3xl bg-white p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <p.icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="text-h4 mt-4">{p.problem}</h3>
            <p className="mt-2 text-ink-500">{p.why}</p>
            <div className="mt-5 rounded-2xl bg-blue-50 p-4">
              <p className="text-eyebrow text-blue-600">Our fix</p>
              <p className="mt-1 font-medium">{p.fix}</p>
            </div>
            <Link href={p.href} className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-blue-600 hover:underline">
              {p.cta} <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Stats from confirmed facts only (null facts are hidden). */
export function FactsRow() {
  const stats = factStats();
  if (stats.length === 0) return null;
  return (
    <section aria-label="Key facts" className="border-y border-silver-300/60 bg-white py-10">
      <dl className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse text-center">
            <dt className="mt-1 text-sm text-ink-500">{s.label}</dt>
            <dd className="font-heading text-4xl font-bold text-blue-600 md:text-5xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Latest three guides. */
export function BlogTeaser() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <Section>
      <FadeIn>
        <SectionHeader
          eyebrow="Guides"
          title="Packaging guides from our studio"
          highlight="guides"
          action={
            <Button href="/blog" variant="ghost" arrow>
              All guides
            </Button>
          }
        />
      </FadeIn>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {latest.map((p) => {
          const Art = illustrations[p.illustration] ?? Package;
          return (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col">
                <span aria-hidden="true" className="block aspect-[16/10] rounded-3xl bg-blue-50 p-[8%]">
                  <Art className="transition-transform duration-500 group-hover:scale-[1.04]" />
                </span>
                <span className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 2).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </span>
                <span className="text-h4 mt-3 group-hover:text-blue-600">{p.title}</span>
                <span className="mt-auto pt-3 text-sm text-ink-500">
                  {dateFmt.format(new Date(p.date))} · {p.readingMinutes} min read
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
