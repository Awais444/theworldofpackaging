import { Accessibility, Barcode, Calculator, FileCheck2, Globe, Layers, PackageOpen, Receipt, Ruler, Scissors, Search, ShieldCheck, Ship, SwatchBook, TriangleAlert, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBlogCategory, type CoverIcon } from "@/content/blog/categories";
import type { Post } from "@/content/blog/posts";
import { STOCK } from "@/content/photos";
import { cn } from "@/lib/utils";

const ICONS: Record<CoverIcon, LucideIcon> = {
  barcode: Barcode,
  shield: ShieldCheck,
  accessibility: Accessibility,
  alert: TriangleAlert,
  layers: Layers,
  calculator: Calculator,
  receipt: Receipt,
  search: Search,
  scissors: Scissors,
  "file-check": FileCheck2,
  swatches: SwatchBook,
  ruler: Ruler,
  fold: PackageOpen,
  ship: Ship,
  globe: Globe,
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Card cover (aspect 16/10): a stock photo, or a light generated cover with the category icon and short title. */
export function BlogCover({ post, sizes, priority = false, className }: { post: Post; sizes: string; priority?: boolean; className?: string }) {
  const color = getBlogCategory(post.category)!.color;
  const cover = post.cover;
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-2xl bg-silver-100", className)}>
      {"photo" in cover ? (
        <Image
          src={`${STOCK[cover.photo].file}-1200.webp`}
          alt={STOCK[cover.photo].alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        // Generated cover (no fitting photo): light silver panel, a soft corner shape and the icon in the category
        // colour, the short title in ink. Decorative (the card has the title), so screen readers skip it.
        <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between bg-silver-50 p-[7%] text-ink-900">
          <span className="absolute -right-[14%] -top-[30%] aspect-square w-[58%] rounded-full opacity-[0.14]" style={{ background: color }} />
          {(() => {
            const Icon = ICONS[cover.icon];
            return <Icon className="relative h-10 w-10 transition-transform duration-500 group-hover:scale-[1.08]" strokeWidth={1.75} style={{ color }} />;
          })()}
          <span className="relative max-w-[85%] font-heading text-[clamp(18px,2vw,24px)] font-bold leading-tight">{cover.short}</span>
        </div>
      )}
    </div>
  );
}

/** Category label: a dot in the category colour and dark text (keeps AA contrast for every colour). */
export function CategoryLabel({ post, className }: { post: Pick<Post, "category">; className?: string }) {
  const c = getBlogCategory(post.category)!;
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-900", className)}>
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
      {c.name}
    </span>
  );
}

/** Blog post card: cover, category, title, two-line excerpt, date and read time. */
export function BlogCard({ post, sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw", large = false, priority = false }: { post: Post; sizes?: string; large?: boolean; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/30">
      <BlogCover post={post} sizes={sizes} priority={priority} />
      <CategoryLabel post={post} className="mt-4" />
      <h3 className={cn("mt-2 font-heading font-bold leading-snug group-hover:text-blue-600", large ? "text-h3" : "text-lg")}>{post.title}</h3>
      <p className={cn("mt-2 text-ink-500", large ? "line-clamp-3" : "line-clamp-2 text-[15px]")}>{post.description}</p>
      <p className="mt-auto pt-3 text-sm text-ink-500">
        {dateFmt.format(new Date(post.date))} · {post.readingMinutes} min read
      </p>
    </Link>
  );
}
