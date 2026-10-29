import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/blog/posts";
import { designHref, getDesignService, type DesignService } from "@/content/designServices";
import { quoteHref } from "@/content/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { illustrations } from "@/components/illustrations";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { Tag } from "@/components/ui/Tag";
import { article, faqPage, howTo } from "@/lib/schema";
import { howToSteps } from "@/content/blog/howToSteps";
import { boxRefCard, type BoxCard } from "@/lib/boxView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: metaDescription(post.description),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);
  const Art = illustrations[post.illustration];
  // Up to four related guides, same kind first.
  const others = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.kind === post.kind) - Number(a.kind === post.kind))
    .slice(0, 4);
  const services = (post.services ?? []).map(getDesignService).filter((s): s is DesignService => Boolean(s));
  const boxes = (services[0]?.recommendedBoxes ?? []).map(boxRefCard).filter((b): b is BoxCard => Boolean(b)).slice(0, 3);

  return (
    <article>
      <JsonLd data={article({ title: post.title, description: post.description, path: `/blog/${post.slug}`, date: post.date, modified: post.reviewed, image: `/blog/${post.slug}/opengraph-image` })} />
      {howToSteps[post.slug] && <JsonLd data={howTo({ name: howToSteps[post.slug]!.name, description: post.description, path: `/blog/${post.slug}`, steps: howToSteps[post.slug]!.steps })} />}
      {post.faqs && post.faqs.length > 0 && <JsonLd data={faqPage(post.faqs)} />}
      <header className="bg-white pt-8">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h1 className="text-h1 mt-4">{post.title}</h1>
            <p className="text-lead mt-4 text-ink-500">{post.description}</p>
            <p className="mt-4 text-sm text-ink-500">
              {dateFmt.format(new Date(post.date))} · {post.readingMinutes} min read
            </p>
            {post.reviewed && <p className="mt-1 text-sm font-semibold text-ink-900">Last reviewed: {dateFmt.format(new Date(post.reviewed))}</p>}
          </div>
          <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-blue-50 p-[4%]" aria-hidden="true" style={{ aspectRatio: "16 / 9" }}>
            <Art />
          </div>
        </div>
      </header>
      <div className="container-x py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Body />

          {post.kind === "compliance" && (
            <aside className="mt-12 rounded-2xl border border-silver-300 bg-silver-50 p-6">
              <p className="text-eyebrow text-blue-600">Disclaimer</p>
              <p className="mt-2 text-ink-900">
                This guide is general information, not legal or regulatory advice. Rules change and depend on your product and market. We lay out the text you supply; final regulatory review is yours, with your adviser.
              </p>
            </aside>
          )}

          {post.sources && post.sources.length > 0 && (
            <section className="mt-10">
              <h2 className="text-h4">Official sources</h2>
              <ul className="mt-4 space-y-2">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 underline decoration-blue-100 underline-offset-4 hover:decoration-blue-600">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {services.length > 0 && (
            <section className="mt-10 rounded-2xl bg-blue-50 p-6">
              <h2 className="text-h4">Need this on your packaging?</h2>
              <ul className="mt-4 space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={designHref(s.slug)} className="font-semibold text-blue-600 hover:underline">
                      {s.name} →
                    </Link>
                  </li>
                ))}
              </ul>
              {boxes.length > 0 && (
                <p className="mt-4 text-sm text-ink-500">
                  Popular box styles:{" "}
                  {boxes.map((b, i) => (
                    <span key={b.href}>
                      {i > 0 && ", "}
                      <Link href={b.href} className="font-semibold text-blue-600 hover:underline">
                        {b.name}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
              <Button href={quoteHref} size="sm" arrow className="mt-5">
                Get a Free Quote
              </Button>
            </section>
          )}

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="text-h3">Questions</h2>
              <dl className="mt-6 divide-y divide-silver-300 border-y border-silver-300">
                {post.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[17px] font-semibold text-ink-900">{f.q}</dt>
                    <dd className="mt-2 text-ink-500">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>
      <Section bg="silver">
        <h2 className="text-h3">More guides</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block h-full rounded-2xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
                <p className="font-heading text-lg font-bold">{p.title}</p>
                <p className="mt-2 text-sm text-ink-500">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <CTABand
          title="Want us to handle it?"
          highlight="handle"
          text="Brief us and we take care of structure, artwork and production."
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
    </article>
  );
}
