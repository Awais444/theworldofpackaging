import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { getWorkService } from "@/content/workServices";
import { CaseCard } from "@/components/ui/Cards";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** "Related work": case studies linked from service, box style and industry pages. Hidden when empty. */
/** `service`: a /work filter id (design service slug); the link then opens /work filtered to it. */
export function RelatedWork({ studies, bg = "white", service }: { studies: CaseStudy[]; bg?: "white" | "silver" | "silver-50"; service?: string }) {
  if (studies.length === 0) return null;
  const filter = service ? getWorkService(service) : undefined;
  return (
    <Section bg={bg}>
      <SectionHeader
        eyebrow="Related work"
        title="Projects we have made"
        highlight="made"
        action={
          <Link href={filter ? `/work?service=${filter.id}` : "/work"} className="font-semibold text-blue-600 hover:underline">
            {filter ? `View all ${filter.label} work →` : "View all work →"}
          </Link>
        }
      />
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {studies.map((c) => (
          <CaseCard key={c.slug} href={`/work/${c.slug}`} title={`${c.client}: ${c.project}`} text={c.summary} slot={c.coverSlot} industry={c.industry} placeholder={c.placeholder} />
        ))}
      </div>
    </Section>
  );
}
