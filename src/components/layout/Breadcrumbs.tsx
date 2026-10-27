import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Mono breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={cn("spec text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-fg">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-fg" : undefined}>
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbList(trail)} />
    </nav>
  );
}
