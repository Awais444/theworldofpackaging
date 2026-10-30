import contentDates from "@/content/contentDates.json";

/** Last git commit date per content/page file (scripts/gen-content-dates.mjs, run in prebuild). */
const dates = contentDates as Record<string, string>;

/** Newest date among files matching the given paths (a trailing * matches a prefix). */
export function lastModified(...globs: string[]): Date | undefined {
  const hits = Object.entries(dates)
    .filter(([file]) => globs.some((g) => (g.endsWith("*") ? file.startsWith(g.slice(0, -1)) : file === g)))
    .map(([, d]) => d);
  return hits.length ? new Date(hits.sort().at(-1)!) : undefined;
}

export const dateLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });
