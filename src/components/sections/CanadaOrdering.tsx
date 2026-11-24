import { Clock, DollarSign, MapPin, Package } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** "Ordering from Canada" block for rigid box pages (Canada-first SEO plan, Nov 2026).
 *  Only confirmed facts: Toronto studio, MOQ, CAD in the configurator, delivery confirmed with the quote.
 *  Never mention the factory location or duties here until confirmed. */
export function CanadaOrdering({ product = "rigid boxes" }: { product?: string }) {
  const items = [
    { icon: MapPin, title: "Toronto studio", text: `Our team is in ${site.location.locality}, on Eastern Time, and works with brands across Canada.` },
    { icon: Package, title: `From ${site.facts.rigidMoq} boxes`, text: `Custom ${product} start at ${site.facts.rigidMoq} per design, with free design support.` },
    { icon: DollarSign, title: "Prices in CAD", text: "The box configurator shows Canadian dollars for visitors in Canada." },
    { icon: Clock, title: "Delivery to your door", text: "We deliver to your address, warehouse or 3PL anywhere in Canada. Timing is confirmed with your quote." },
  ];
  return (
    <Section bg="blue-50">
      <SectionHeader
        eyebrow="Canada"
        title={`Ordering ${product} from Canada`}
        highlight="Canada"
        lead="Bilingual-ready artwork, one team for design and print, and a digital proof before production."
      />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-2xl bg-white p-6">
            <Icon aria-hidden="true" className="h-6 w-6 text-orange-500" />
            <h3 className="text-h4 mt-4">{title}</h3>
            <p className="mt-2 text-ink-500">{text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-ink-500">
        More on{" "}
        <Link href="/countries/canada" className="font-semibold text-blue-600 hover:underline">
          packaging for Canada
        </Link>
        , including bilingual labelling.
      </p>
    </Section>
  );
}
