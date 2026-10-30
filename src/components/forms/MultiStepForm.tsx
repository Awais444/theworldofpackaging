"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { site } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { ActionResult } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { CircleCheck as CheckCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormStep<T extends FieldValues> = {
  id: string;
  title: string;
  intro?: string;
  /** Fields validated before moving past this step. */
  fields: Path<T>[];
  content: ReactNode;
};

/** Email and WhatsApp as plain visible text with copy buttons. */
export function DirectContact() {
  return (
    <div className="space-y-3 border-t border-silver-300 pt-6 text-sm">
      <p className="font-semibold text-ink-500">Prefer to write directly?</p>
      <p className="flex flex-wrap items-center gap-3">
        <a href={`mailto:${site.email}`} className="break-all hover:text-blue-600">
          {site.email}
        </a>
        <CopyButton value={site.email} label="email address" />
      </p>
      {site.whatsapp && (
        <p className="flex flex-wrap items-center gap-3">
          <span>WhatsApp {site.whatsapp}</span>
          <CopyButton value={site.whatsapp} label="WhatsApp number" />
        </p>
      )}
    </div>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status" className="mx-auto max-w-2xl rounded-3xl bg-blue-50 p-8 text-center md:p-12">
      <CheckCircleIcon aria-hidden="true" className="mx-auto h-16 w-16 text-blue-600" />
      <h2 className="text-h2 mt-6">{title}</h2>
      <p className="text-lead mt-4 text-ink-500">{body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <WhatsAppButton message="Hi, I just sent a project brief on your website." label="Message us on WhatsApp" variant="primary" />
        <Button href="/work" size="lg" variant="secondary">
          Browse our work
        </Button>
      </div>
    </m.div>
  );
}

/**
 * Multi-step form shell: progress bar, animated step transitions, per-step
 * validation via react-hook-form `trigger`, and a designed success state.
 */
export function MultiStepForm<T extends FieldValues>({
  form,
  steps,
  action,
  success,
}: {
  form: UseFormReturn<T>;
  steps: FormStep<T>[];
  action: (data: T) => Promise<ActionResult>;
  success: { title: string; body: string };
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const top = useRef<HTMLDivElement>(null);
  const step = steps[index]!;
  const last = index === steps.length - 1;

  const move = (n: number) => {
    setIndex(n);
    top.current?.focus({ preventScroll: false });
  };

  const next = async () => {
    const ok = await form.trigger(step.fields, { shouldFocus: true });
    if (ok) move(index + 1);
  };

  const submit = form.handleSubmit(async (data) => {
    const res = await action(data);
    setStatus(res.ok ? "sent" : "error");
    if (!res.ok) setError(res.error);
  });

  if (status === "sent") return <Success {...success} />;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (last) void submit();
          else void next();
        }}
        className="relative rounded-3xl border border-silver-300 bg-white p-5 md:p-8 lg:col-span-8"
      >
        <div ref={top} tabIndex={-1} className="outline-none" aria-live="polite">
          <p className="text-sm font-semibold text-blue-600">
            Step {index + 1} of {steps.length}: {step.title}
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-silver-100" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={index + 1} aria-label="Form progress">
          <m.div
            className="h-full origin-left rounded-full bg-blue-600"
            initial={false}
            animate={{ scaleX: (index + 1) / steps.length }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.fieldset
            key={step.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 min-h-[18rem] space-y-6"
          >
            <legend className="text-h3 mb-2">{step.title}</legend>
            {step.intro && <p className="text-ink-500">{step.intro}</p>}
            {step.content}
          </m.fieldset>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-silver-300 pt-6">
          <Button variant="ghost" onClick={() => move(index - 1)} disabled={index === 0} className="disabled:invisible">
            Back
          </Button>
          <Button type="submit" size="lg" arrow disabled={form.formState.isSubmitting}>
            {last ? (form.formState.isSubmitting ? "Sending…" : "Send brief") : `Next: ${steps[index + 1]!.title}`}
          </Button>
        </div>
        {status === "error" && (
          <p role="alert" className="mt-4 text-sm font-medium text-error">
            {error || "That did not go through."} You can also email {site.email}.
          </p>
        )}
      </form>

      <aside className="space-y-8 rounded-3xl bg-silver-100 p-6 lg:col-span-4 lg:self-start">
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={s.id} className={cn("flex items-center gap-3", i === index ? "font-semibold text-ink-900" : "text-ink-500")}>
              <span className={cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold", i < index ? "bg-blue-600 text-white" : i === index ? "bg-orange-500 text-ink-900" : "bg-white text-ink-500")}>{i + 1}</span>
              {s.title}
            </li>
          ))}
        </ol>
        <DirectContact />
      </aside>
    </div>
  );
}
