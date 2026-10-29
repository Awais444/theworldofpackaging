import { CheckCircle2 } from "lucide-react";
import { clientsIn, site } from "@/config/site";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * "Pharma packaging experience": real clients from site.clients in this industry, named as text.
 * Hidden when no client in the industry is listed.
 */
export function PharmaExperience() {
  const clients = clientsIn("Pharmaceutical");
  if (clients.length === 0) return null;
  const names = clients.map((c) => c.name).join(" and ");
  const points = ["Cartons, labels and patient leaflets", "Accurate text and type sizes from your approved copy", "Consistent brand and variant colours across runs", "Batch, expiry and barcode areas planned into the dieline"];
  return (
    <Section bg="blue-50">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeader eyebrow="Experience" title="Pharma packaging experience" highlight="experience" />
          <p className="text-lead mt-5 text-ink-500">
            Since we started as {site.history.originalName}, we have printed packaging for pharmaceutical clients such as {names}.
          </p>
          <p className="mt-4 text-ink-500">Medicine packaging leaves no room for error. We bring that discipline to every carton, label and leaflet we design and print.</p>
        </div>
        <ul className="space-y-3 lg:col-span-6">
          {points.map((p) => (
            <li key={p} className="flex gap-3 rounded-2xl bg-white p-4">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
