import { site } from "@/config/site";

const MIN = 140;
const MAX = 155;

/**
 * Meta description in the 140–155 character range. Short texts are completed with true facts from
 * site.ts (own factory, MOQ, 15+ years, worldwide shipping, free quote), skipping any the text already
 * mentions; long texts are cut at a word boundary. Use for every page's `description`.
 */
export function metaDescription(text: string): string {
  let base = text.replace(/\s+/g, " ").trim();
  if (!/[.!?]$/.test(base)) base += ".";
  if (base.length > MAX) {
    const cut = base.slice(0, MAX - 1);
    return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–]$/, "")}…`;
  }
  if (base.length >= MIN) return base;

  const f = site.facts;
  const clauses = [
    { re: /factory/i, text: `Made in our own factory from ${f.rigidMoq} units.` },
    { re: /\d+\+ years/i, text: `${f.yearsExperience}+ years in packaging.` },
    { re: /worldwide|190\+|ship/i, text: "Ships worldwide." },
    { re: /free quote|get a quote/i, text: "Get a free quote.", group: "quote" },
    { re: /free quote|get a quote/i, text: "Free quote.", group: "quote" },
    { re: /design support/i, text: "Free design support." },
  ].filter((c) => !c.re.test(base)) as Array<{ re: RegExp; text: string; group?: string }>;

  // Fewest clauses that land in range; else the longest combination that stays under MAX.
  let best: string | null = null;
  let fallback = base;
  const n = clauses.length;
  for (let size = 1; size <= n && !best; size++) {
    for (let mask = 0; mask < 1 << n; mask++) {
      if (bitCount(mask) !== size) continue;
      const picked = clauses.filter((_, i) => mask & (1 << i));
      // At most one clause per group (e.g. one quote line).
      if (picked.filter((c) => c.group).length !== new Set(picked.filter((c) => c.group).map((c) => c.group)).size) continue;
      const s = [base, ...picked.map((c) => c.text)].join(" ");
      if (s.length >= MIN && s.length <= MAX) { best = s; break; }
      if (s.length <= MAX && s.length > fallback.length) fallback = s;
    }
  }
  return best ?? fallback;
}

const bitCount = (x: number) => x.toString(2).split("1").length - 1;

/**
 * Open Graph for a page: url + the site-wide fields. A page's `openGraph` replaces the layout's
 * entirely, so every page passes this instead of a partial object.
 */
export function ogFor(path: string, extra: Record<string, unknown> = {}) {
  return { type: "website" as const, url: path, siteName: site.name, locale: "en_US", ...extra };
}
