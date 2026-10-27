import { agencyServices, hubs, serviceCommonFaqs, servicesByHub, type AgencyService, type ServiceHub } from "@/content/agencyServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { service as schemaService } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { priceFromLabel, ProjectCta, RelatedWork, ServiceList, ServiceProcess } from "./AgencyBlocks";
import { OptionsGrid } from "./OptionsGrid";
import { PageHero } from "./PageHero";
import { FaqList } from "./StyleDetailBlocks";

const hubSlot: Record<ServiceHub, string> = { branding: "branding-hero", "packaging-design": "packaging-design-hero" };

export function ServiceHubView({ hub }: { hub: ServiceHub }) {
  const h = hubs[hub];
  const services = servicesByHub(hub);
  return (
    <>
      <PageHero
        crumbs={[{ label: h.name }]}
        spec={["Studio", h.name, `${services.length} services`]}
        title={h.tagline}
        intro={<p>{h.intro}</p>}
        actions={
          <>
            <Button href="/start-a-project" size="lg" arrow>
              Start a Project
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              See Our Work
            </Button>
          </>
        }
        slotId={hubSlot[hub]}
      />
      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Services"]} title="What we do." />
        <div className="mt-12">
          <ServiceList services={services} base={h.href} />
        </div>
      </section>
      <ServiceProcess steps={services[0]?.process ?? []} />
      <RelatedWork category={hub === "branding" ? "Branding" : "Packaging"} />
      <FaqList faqs={[...serviceCommonFaqs, ...services.flatMap((s) => s.faqs).slice(0, 3)]} />
      <ProjectCta
        title={hub === "branding" ? "Start with the brand." : "Start with the box."}
        body="Tell us what you are launching. We reply with questions, a scope and a timeline."
      />
    </>
  );
}

export function ServiceDetailView({ service }: { service: AgencyService }) {
  const h = hubs[service.hub];
  const related = agencyServices.filter((s) => s.hub === service.hub && s.slug !== service.slug).slice(0, 4);
  return (
    <>
      <JsonLd
        data={schemaService({ name: service.name, description: service.summary, path: `${h.href}/${service.slug}`, category: h.name })}
      />
      <PageHero
        crumbs={[{ label: h.name, href: h.href }, { label: service.name }]}
        spec={[h.name, service.name]}
        title={service.name}
        intro={
          <>
            <p className="text-fg">{service.summary}</p>
            <p className="mt-4">{service.intro}</p>
          </>
        }
        actions={
          <Button href={`/start-a-project?service=${service.slug}`} size="lg" arrow>
            Start a Project
          </Button>
        }
        slotId={`service-${service.slug}-hero`}
      />

      <OptionsGrid spec={["Deliverables"]} title="What you get." groups={[{ title: "Included", items: service.deliverables }]} />

      <ServiceProcess steps={service.process} />

      <RelatedWork category={service.workCategory} />

      <section className="container-x py-16 md:py-20">
        <div className="grid-editorial items-end gap-y-6 border-y border-line py-10">
          <div className="col-span-4 md:col-span-6">
            <SpecLabel items={["Pricing"]} as="p" />
            <p className="type-display mt-3 text-display-md">{priceFromLabel(service.priceFrom)}</p>
            <p className="mt-2 text-muted">Timeline: {service.timeline}. Fixed quote before work starts.</p>
          </div>
          <div className="col-span-4 flex gap-3 md:col-span-6 md:justify-end">
            <Button href="/pricing#design" variant="secondary">
              Design pricing
            </Button>
            <Button href="/packages" variant="link" arrow>
              Bundled packages
            </Button>
          </div>
        </div>
      </section>

      <FaqList faqs={[...service.faqs, ...serviceCommonFaqs]} />

      <section className="container-x pb-20 md:pb-28">
        <SectionHeader spec={["Related services"]} title={`More from ${h.name.toLowerCase()}.`} />
        <div className="mt-12">
          <ServiceList services={related} base={h.href} />
        </div>
      </section>

      <ProjectCta title="Brief us." body="Five minutes on the brief form, and we come back with a scope and the questions we still have." />
    </>
  );
}
