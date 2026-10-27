import { processSteps } from "@/content/process";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Process() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeader
        spec={["Process", `${processSteps.length} steps`]}
        title="Discover to delivery, without a hand-off."
        aside={
          <Button href="/process" variant="link" arrow>
            How we work
          </Button>
        }
      />
      <ol className="mt-16 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-6">
        {processSteps.map((step, i) => (
          <li key={step.title} className="relative border-t border-line pt-6 pb-10 lg:border-t-0 lg:pb-0">
            {/* Fold line runs between steps on wide screens. */}
            <span aria-hidden="true" className="absolute -top-px left-0 hidden h-px w-full lg:block">
              <span className="block h-px w-full bg-[repeating-linear-gradient(90deg,var(--fg)_0_4px,transparent_4px_7px)]" />
            </span>
            <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="type-display mt-4 text-display-sm">{step.title}</h3>
            <p className="mt-3 text-muted lg:pr-2">{step.body}</p>
            <p className="spec mt-4 text-muted">{step.spec}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
