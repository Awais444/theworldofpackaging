import Link from "next/link";
import { site } from "@/config/site.config";
import { serviceSummaries, type ServiceSummary } from "@/content/services";
import { MagneticBoxClosed } from "@/components/illustrations";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { cn } from "@/lib/utils";

function ServiceRow({ service, aside }: { service: ServiceSummary; aside?: React.ReactNode }) {
  return (
    <div className="grid-editorial gap-y-6 border-t border-line py-12 md:py-16">
      <div className="col-span-4 md:col-span-12 lg:col-span-5">
        <SpecLabel items={service.spec} as="p" className="mb-3" />
        <h3 className="type-display text-display-lg">
          <Link href={service.href} className="transition-colors hover:text-accent">
            {service.title}
          </Link>
        </h3>
      </div>
      <p className={cn("col-span-4 text-lg text-muted md:col-span-6 lg:col-span-3", aside ? "lg:col-start-6" : "lg:col-start-7")}>
        {service.intro}
      </p>
      <div className={cn("col-span-4 md:col-span-5 md:col-start-8 lg:col-span-3", aside ? "lg:col-start-9 lg:col-span-2" : "lg:col-start-10")}>
        <ul className="space-y-1.5">
          {service.items.map((item) => (
            <li key={item} className="flex gap-3 before:mt-[0.7em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong">
              {item}
            </li>
          ))}
        </ul>
        <Button href={service.href} variant="link" arrow className="mt-6">
          {service.title}
        </Button>
      </div>
      {aside && <div className="col-span-4 md:col-span-12 lg:col-span-2 lg:col-start-11">{aside}</div>}
    </div>
  );
}

export function Services() {
  const manufacturing = serviceSummaries.find((s) => s.id === "manufacturing");
  return (
    <section className="pt-24 md:pt-32">
      <div className="container-x">
        <SectionHeader
          spec={["Services"]}
          title="One team from name to pallet."
          intro="Design agencies can't manufacture, and box makers rarely design past a free template. We do both, at studio standard."
        />
        <div className="mt-16">
          {serviceSummaries
            .filter((s) => s.id !== "manufacturing")
            .map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
        </div>
      </div>
      {manufacturing && (
        <div className="tone-board">
          <div className="container-x">
            <ServiceRow
              service={manufacturing}
              aside={
                <div className="max-w-56 lg:max-w-none">
                  <MagneticBoxClosed />
                  <SpecLabel items={[`MOQ ${site.facts.rigidMoq}`, "In-house"]} as="p" className="mt-2" />
                </div>
              }
            />
          </div>
        </div>
      )}
    </section>
  );
}
