import { testimonials } from "@/content/testimonials";
import { SpecLabel } from "@/components/ui/SpecLabel";

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  if (!lead) return null;
  return (
    <section className="tone-board">
      <div className="container-x py-24 md:py-32">
        <SpecLabel items={["Clients"]} as="p" />
        <div className="grid-editorial mt-10 gap-y-14">
          <figure className="col-span-4 md:col-span-8">
            {lead.placeholder && <p className="spec mb-6 inline-block bg-yellow px-2 py-1 text-ink">Placeholder testimonial</p>}
            <blockquote className="type-display text-display-md normal-case">“{lead.quote}”</blockquote>
            <figcaption className="mt-6">
              <SpecLabel items={[lead.name, lead.role]} />
            </figcaption>
          </figure>
          <div className="col-span-4 space-y-10 md:col-span-4 md:col-start-9">
            {rest.map((t, i) => (
              <figure key={i} className="border-t border-line pt-6">
                {t.placeholder && <p className="spec mb-3 text-accent">Placeholder</p>}
                <blockquote className="text-lg">“{t.quote}”</blockquote>
                <figcaption className="mt-4">
                  <SpecLabel items={[t.name, t.role]} />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
