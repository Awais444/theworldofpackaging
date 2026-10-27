"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { site } from "@/config/site.config";
import type { ActionResult } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { RegMark } from "@/components/ui/RegMark";

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
    <div className="space-y-3 border-t border-line pt-6 text-sm">
      <p className="spec text-muted">Prefer to write directly?</p>
      <p className="flex flex-wrap items-center gap-3">
        <a href={`mailto:${site.email}`} className="hover:text-accent">
          {site.email}
        </a>
        <CopyButton value={site.email} label="email address" />
      </p>
      <p className="flex flex-wrap items-center gap-3">
        <span>WhatsApp {site.whatsapp}</span>
        <CopyButton value={site.whatsapp} label="WhatsApp number" />
      </p>
    </div>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status" className="max-w-2xl">
      <RegMark className="h-14 w-14 text-accent" />
      <p className="type-display mt-8 text-display-lg">{title}</p>
      <p className="mt-4 text-lg text-muted">{body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/work" variant="secondary">
          Browse our work
        </Button>
        <Button href="/" variant="link" arrow>
          Back to home
        </Button>
      </div>
    </motion.div>
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
  });

  if (status === "sent") return <Success {...success} />;

  return (
    <div className="grid gap-14 lg:grid-cols-12">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (last) void submit();
          else void next();
        }}
        className="relative lg:col-span-8"
      >
        <div ref={top} tabIndex={-1} className="outline-none" aria-live="polite">
          <p className="spec text-muted">
            Step {index + 1} of {steps.length}: {step.title}
          </p>
        </div>
        <div className="mt-4 h-px bg-line" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={index + 1} aria-label="Form progress">
          <motion.div
            className="h-px origin-left bg-fg"
            initial={false}
            animate={{ scaleX: (index + 1) / steps.length }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.fieldset
            key={step.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 min-h-[18rem] space-y-8"
          >
            <legend className="type-display mb-2 text-display-md">{step.title}</legend>
            {step.intro && <p className="text-muted">{step.intro}</p>}
            {step.content}
          </motion.fieldset>
        </AnimatePresence>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Button variant="link" onClick={() => move(index - 1)} disabled={index === 0}>
            Back
          </Button>
          <Button type="submit" arrow disabled={form.formState.isSubmitting}>
            {last ? (form.formState.isSubmitting ? "Sending" : "Send") : `Next: ${steps[index + 1]!.title}`}
          </Button>
        </div>
        {status === "error" && (
          <p role="alert" className="mt-4 text-sm text-magenta">
            That did not go through. Try again, or email {site.email}.
          </p>
        )}
      </form>

      <aside className="space-y-8 lg:col-span-3 lg:col-start-10">
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={s.id} className={i === index ? "text-fg" : "text-muted"}>
              <span className="mr-3 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </li>
          ))}
        </ol>
        <DirectContact />
      </aside>
    </div>
  );
}
