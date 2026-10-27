import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

/** Long-form legal layout. Content is a template until reviewed by a lawyer. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="container-x pt-8 pb-24">
      <Breadcrumbs items={[{ label: title }]} />
      <h1 className="type-display mt-10 text-display-lg">{title}</h1>
      <p className="spec mt-4 text-muted">Last updated {updated}</p>
      <p className="spec mt-6 inline-block bg-yellow px-2 py-1 text-ink">Template · review with a lawyer before launch</p>
      <div className="measure mt-12 space-y-5 text-lg [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
