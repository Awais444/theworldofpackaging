import { cn } from "@/lib/utils";

export type Milestone = {
  /** Year label; null shows "Year to confirm". */
  year: string | null;
  title: string;
  text: string;
  /** Not yet confirmed: shows a "To confirm" tag (see CONTENT_TODO.md). */
  placeholder?: boolean;
};

/** Simple vertical timeline: year, title and one line per milestone. */
export function Timeline({ items, className }: { items: Milestone[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-8 border-l-2 border-blue-100 pl-8", className)}>
      {items.map((m) => (
        <li key={m.title} className="relative">
          <span aria-hidden="true" className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-orange-500 shadow-sm" />
          <p className="font-heading text-sm font-bold text-blue-600">{m.year ?? "Year to confirm"}</p>
          <h3 className="text-h4 mt-1">
            {m.title}
            {m.placeholder && <span className="ml-2 align-middle rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-text">To confirm</span>}
          </h3>
          <p className="mt-1 text-ink-500">{m.text}</p>
        </li>
      ))}
    </ol>
  );
}
