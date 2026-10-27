import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/blog/posts";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { illustrations } from "@/components/illustrations";
import { CropMarks } from "@/components/ui/CropMarks";
import { JsonLd } from "@/components/seo/JsonLd";
import { SpecLabel } from "@/components/ui/SpecLabel";
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
      <header className="container-x pt-8">
        <Breadcrumbs items={[{ label: "Guides", href: "/blog" }, { label: post.title }]} />
        <div className="mt-12 max-w-4xl">
          <SpecLabel items={[dateFmt.format(new Date(post.date)), `${post.readingMinutes} min read`, ...post.tags]} as="p" />
          <h1 className="type-display mt-5 text-display-lg">{post.title}</h1>
          <p className="mt-5 text-xl text-muted">{post.description}</p>
        </div>
        <div className="relative mt-12 max-w-4xl bg-surface-2 p-[4%]" aria-hidden="true" style={{ aspectRatio: "16 / 9" }}>
          <Art />
          <CropMarks />
        </div>
      </header>
      <div className="container-x py-12 md:py-16">
        <div className="measure">
          <Body />
        </div>
      </div>
      <nav aria-label="More guides" className="container-x pb-20">
        <p className="spec mb-4 text-muted">More guides</p>
        <ul className="border-t border-line">
          {others.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={`/blog/${p.slug}`} className="block py-5 text-lg hover:text-accent">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ProjectCta title="Want us to handle it?" body="Brief us and we take care of structure, artwork and production." />
    </article>
  );
}
