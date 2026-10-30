import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { illustrations } from "@/components/illustrations";
import { Media } from "@/components/media/Media";
import type { DesignService } from "@/content/designServices";
import { designHref } from "@/content/links";

/** Card for a packaging design service: photo (when `slot` is given) or illustration panel, name, one line. */
export function DesignCard({ s, slot }: { s: Pick<DesignService, "slug" | "name" | "short" | "illustration">; slot?: string }) {
  const Art = illustrations[s.illustration];
  return (
    <Link href={designHref(s.slug)} className="group flex h-full flex-col rounded-2xl border border-silver-300 bg-white p-4 transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-md">
      {slot ? (
        <div className="overflow-hidden rounded-xl">
          <Media slot={slot} card panel="blue" className="rounded-xl transition-transform duration-500 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 25vw, 50vw" />
        </div>
      ) : (
        <span aria-hidden="true" className="block aspect-[4/3] rounded-xl bg-blue-50 p-[10%]">
          <Art className="transition-transform duration-500 group-hover:scale-[1.04]" />
        </span>
      )}
      <span className="mt-4 font-heading text-lg font-bold leading-snug group-hover:text-blue-600">{s.name}</span>
      <span className="mt-1 text-sm text-ink-500">{s.short}</span>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-blue-600">
        View service <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
