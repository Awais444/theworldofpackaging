import { dateLabel } from "@/lib/contentDates";
import { cn } from "@/lib/utils";

/** Visible "Last updated" line; mirrors dateModified in the page's schema. */
export function LastUpdated({ date, className, note }: { date?: Date; className?: string; note?: string }) {
  if (!date) return null;
  return (
    <p className={cn("text-sm text-ink-500", className)}>
      Last updated <time dateTime={date.toISOString()}>{dateLabel.format(date)}</time>
      {note ? ` · ${note}` : ""}
    </p>
  );
}
