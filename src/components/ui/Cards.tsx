import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/media/Media";
import { cn } from "@/lib/utils";
import { Tag } from "./Tag";

/** Service card: icon in a blue-50 circle, title, text, "Learn more". Lifts on hover. */
export function ServiceCard({
  icon: Icon,
  title,
  text,
  href,
  bullets,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  bullets?: string[];
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-silver-300 bg-white p-7 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-md"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <h3 className="text-h4 mt-6">{title}</h3>
      <p className="mt-2 text-ink-500">{text}</p>
      {bullets && (
        <ul className="mt-4 space-y-1.5 text-[15px]">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
              {b}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-blue-600">
        Learn more <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** Box style card: image on a silver panel, name, one line, tags. Image scales on hover. */
export function ProductCard({ href, name, text, slot, tags = [] }: { href: string; name: string; text: string; slot: string; tags?: string[] }) {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-2xl bg-silver-100">
        <Media slot={slot} card panel="none" className="rounded-none transition-transform duration-500 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 25vw, 50vw" />
      </div>
      <h3 className="text-h4 mt-4 group-hover:text-blue-600">{name}</h3>
      <p className="mt-1 text-[15px] text-ink-500">{text}</p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </Link>
  );
}

/** Case study card: large image, orange industry tag, title, one line. */
export function CaseCard({
  href,
  title,
  text,
  slot,
  industry,
  placeholder = false,
  chips,
}: {
  href: string;
  title: string;
  text: string;
  slot: string;
  industry: string;
  placeholder?: boolean;
  /** Optional service chips under the summary. */
  chips?: string[];
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-3xl">
        <Media slot={slot} card className="rounded-3xl transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 768px) 33vw, 100vw" />
        {placeholder && (
          <span className="absolute right-4 top-4">
            <Tag tone="white">Sample project</Tag>
          </span>
        )}
      </div>
      <div className="mt-4">
        <Tag tone="orange">{industry}</Tag>
      </div>
      <h3 className="text-h4 mt-3 group-hover:text-blue-600">{title}</h3>
      <p className={cn("mt-1 text-ink-500", chips && "line-clamp-1")}>{text}</p>
      {chips && chips.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <li key={c} className="rounded-full bg-silver-100 px-2.5 py-1 text-xs font-medium text-ink-500">
              {c}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}

/** Industry card: icon, name, three recommended box tags. */
export function IndustryCard({ href, name, icon: Icon, boxes }: { href: string; name: string; icon: LucideIcon; boxes: string[] }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-silver-300 bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-md"
    >
      <Icon aria-hidden="true" className="h-7 w-7 text-orange-500" />
      <h3 className="text-h4 mt-4 group-hover:text-blue-600">{name}</h3>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {boxes.slice(0, 3).map((b) => (
          <Tag key={b}>{b}</Tag>
        ))}
      </div>
    </Link>
  );
}

/** Big number + label. Mark placeholder figures so they are never read as real. */
export function StatCard({ value, label, placeholder = false, className }: { value: string; label: string; placeholder?: boolean; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white p-6", className)}>
      <p className="font-heading text-5xl font-bold tracking-tight text-blue-600">{value}</p>
      <p className="mt-2 text-ink-500">{label}</p>
      {placeholder && <p className="mt-2 text-xs font-semibold text-orange-text">Placeholder figure</p>}
    </div>
  );
}

/** Client quote. Placeholder quotes are always labelled. */
export function TestimonialCard({ quote, name, role, placeholder = false }: { quote: string; name: string; role: string; placeholder?: boolean }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-silver-300 bg-white p-7">
      {placeholder && (
        <span className="mb-4 self-start">
          <Tag tone="orange">Placeholder</Tag>
        </span>
      )}
      <blockquote className="text-lg">“{quote}”</blockquote>
      <figcaption className="mt-auto pt-6 text-sm">
        <span className="font-semibold">{name}</span>
        <span className="text-ink-500"> · {role}</span>
      </figcaption>
    </figure>
  );
}
