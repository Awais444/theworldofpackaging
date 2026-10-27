import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbList } from "@/lib/schema";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail with BreadcrumbList JSON-LD. The last item is the current page. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-ink-500", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-ink-400" />}
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-blue-600">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-ink-900" : undefined}>
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
