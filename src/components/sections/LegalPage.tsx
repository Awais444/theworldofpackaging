import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Tag } from "@/components/ui/Tag";

/** Long-form legal layout. Content is a template until reviewed by a lawyer. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="container-x pb-24 pt-8">
      <Breadcrumbs items={[{ label: title }]} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-h1 mt-10">{title}</h1>
        <p className="mt-3 text-sm text-ink-500">Last updated {updated}</p>
        <Tag tone="orange" className="mt-5">
          Template · legal review needed before launch
        </Tag>
        <div className="mt-10 space-y-5 text-lg leading-relaxed [&_h2]:text-h3 [&_h2]:mt-12 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:marker:text-orange-500">{children}</div>
      </div>
    </article>
  );
}
