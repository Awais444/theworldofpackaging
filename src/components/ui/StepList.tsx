import { cn } from "@/lib/utils";

export type Step = { title: string; body: string };

/** Numbered steps joined by a line: horizontal on desktop, vertical on mobile. */
export function StepList({ steps, dark = false }: { steps: Step[]; dark?: boolean }) {
  return (
    <ol className={cn("relative grid gap-8 lg:gap-6", steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")} style={{ ["--n" as string]: steps.length }}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 lg:block">
          {/* Connector: down to the next step on mobile, across to it on desktop. */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-6 top-12 bottom-[-2rem] w-0.5 lg:left-12 lg:right-[-1.5rem] lg:top-6 lg:bottom-auto lg:h-0.5 lg:w-auto",
                dark ? "bg-white/25" : "bg-blue-100",
              )}
            />
          )}
          <span
            className={cn(
              "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold",
              dark ? "bg-white text-blue-600" : "bg-blue-600 text-white",
            )}
          >
            {i + 1}
          </span>
          <div className="lg:mt-5">
            <h3 className="text-h4">{s.title}</h3>
            <p className={cn("mt-2", dark ? "text-white/80" : "text-ink-500")}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
