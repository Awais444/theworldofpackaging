import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/blog/posts";
import { quoteHref } from "@/content/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { illustrations } from "@/components/illustrations";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { Tag } from "@/components/ui/Tag";
import { article } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
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
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <article>
      <JsonLd data={article({ title: post.title, description: post.description, path: `/blog/${post.slug}`, date: post.date })} />
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
          </div>
          <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-blue-50 p-[4%]" aria-hidden="true" style={{ aspectRatio: "16 / 9" }}>
            <Art />
          </div>
        </div>
      </header>
      <div className="container-x py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Body />
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
