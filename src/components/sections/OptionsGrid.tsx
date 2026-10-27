import type { Option } from "@/content/materials";
import { SectionHeader } from "@/components/ui/SectionHeader";

export type OptionGroup = { title: string; items: Array<string | Option> };

/** Spec-sheet style option lists: one column per group. */
export function OptionsGrid({
  spec,
  title,
  intro,
  groups,
}: {
  spec: string[];
  title: string;
  intro?: string;
  groups: OptionGroup[];
}) {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeader spec={spec} title={title} intro={intro} />
      <div className="mt-14 grid gap-x-8 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="spec text-muted">{g.title}</h3>
            <ul className="mt-4 divide-y divide-dashed divide-line">
              {g.items.map((item) => {
                const o = typeof item === "string" ? { name: item, detail: "" } : item;
                return (
                  <li key={o.name} className="py-2.5">
                    <span className="block">{o.name}</span>
                    {o.detail && <span className="mt-1 block text-sm text-muted">{o.detail}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
