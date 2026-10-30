import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { glossary } from "@/content/glossary";

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** "Terms in this guide": glossary entries the guide's text mentions, linked to /glossary anchors. Server-only. */
export function GuideTerms({ slug, max = 10 }: { slug: string; max?: number }) {
  let text = "";
  try {
    text = fs.readFileSync(path.join(process.cwd(), "src/content/blog", `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
  const found = glossary.filter((t) => [t.term, ...(t.aliases ?? [])].some((w) => new RegExp(`\\b${esc(w)}\\b`, "i").test(text))).slice(0, max);
  if (found.length < 2) return null;
  return (
    <aside aria-labelledby="guide-terms" className="mt-12 rounded-2xl border border-silver-300 p-6">
      <h2 id="guide-terms" className="font-heading text-lg font-bold">Terms in this guide</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {found.map((t) => (
          <li key={t.id}>
            <Link href={`/glossary#${t.id}`} className="inline-flex h-8 items-center rounded-full bg-blue-50 px-3 text-sm font-semibold text-blue-600 hover:bg-blue-100">
              {t.term}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-ink-500">
        See the full <Link href="/glossary" className="font-semibold text-blue-600 hover:underline">packaging glossary</Link>.
      </p>
    </aside>
  );
}
