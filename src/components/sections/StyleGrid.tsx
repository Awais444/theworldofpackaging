import Link from "next/link";
import { SiteImage } from "@/components/media/SiteImage";
import { SpecLabel } from "@/components/ui/SpecLabel";

export type StyleCardData = { href: string; name: string; summary: string; slotId: string; spec: string[] };

/** Grid of box style cards. Plain hairline layout, no shadows. */
export function StyleGrid({ items }: { items: StyleCardData[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <li key={s.href}>
          <Link href={s.href} className="group block">
            <SiteImage slotId={s.slotId} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" cropMarks={false} />
            <h3 className="type-display mt-5 text-display-sm transition-colors group-hover:text-accent">{s.name}</h3>
            <p className="mt-2 text-muted">{s.summary}</p>
            <SpecLabel items={s.spec} as="p" className="mt-3" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
