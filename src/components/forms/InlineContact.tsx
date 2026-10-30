"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitInlineContact } from "@/app/actions/contact";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { CircleCheck as CheckCircleIcon } from "lucide-react";
import { BUDGETS, inlineContactSchema, NEEDS, type InlineContactInput } from "@/lib/schemas";
import { controlClass } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const fieldLabel = "mb-1.5 block text-sm font-semibold text-ink-900";
const inputClass = cn(controlClass, "h-12");

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-error">
      {message}
    </p>
  );
}

export function InlineContact() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InlineContactInput>({
    resolver: zodResolver(inlineContactSchema),
    defaultValues: { name: "", email: "", needs: [], website: "" },
  });

  const onSubmit = async (data: InlineContactInput) => {
    const res = await submitInlineContact(data);
    if (res.ok) {
      setStatus("sent");
      reset();
    } else setStatus("error");
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <m.div
          key="sent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl bg-blue-50 p-8"
          role="status"
        >
          <CheckCircleIcon aria-hidden="true" className="h-12 w-12 text-blue-600" />
          <p className="text-h3 mt-5">Message sent</p>
          <p className="mt-3 text-lg text-ink-500">
            Thanks. We reply {site.facts.quoteReply}, usually with a few questions about your product.
          </p>
          <Button variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </m.div>
      ) : (
        <m.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="ic-name" className={fieldLabel}>
                Name
              </label>
              <input
                id="ic-name"
                autoComplete="name"
                className={inputClass}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "ic-name-err" : undefined}
                {...register("name")}
              />
              <FieldError id="ic-name-err" message={errors.name?.message} />
            </div>
            <div>
              <label htmlFor="ic-email" className={fieldLabel}>
                Email
              </label>
              <input
                id="ic-email"
                type="email"
                autoComplete="email"
                className={inputClass}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "ic-email-err" : undefined}
                {...register("email")}
              />
              <FieldError id="ic-email-err" message={errors.email?.message} />
            </div>
          </div>

          <fieldset aria-describedby={errors.needs ? "ic-needs-err" : undefined}>
            <legend className={fieldLabel}>What you need</legend>
            <div className="flex flex-wrap gap-2">
              {NEEDS.map((n) => (
                <label key={n} className="cursor-pointer">
                  <input type="checkbox" value={n} className="peer sr-only" {...register("needs")} />
                  <span className="inline-flex h-11 items-center rounded-full border border-silver-300 bg-white px-4 text-[15px] font-medium transition peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white peer-focus-visible:shadow-[var(--ring)] hover:border-blue-600">
                    {n}
                  </span>
                </label>
              ))}
            </div>
            <FieldError id="ic-needs-err" message={errors.needs?.message} />
          </fieldset>

          <div>
            <label htmlFor="ic-budget" className={fieldLabel}>
              Budget range
            </label>
            <select
              id="ic-budget"
              defaultValue=""
              className={cn(inputClass, "cursor-pointer")}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? "ic-budget-err" : undefined}
              {...register("budget")}
            >
              <option value="" disabled>
                Select a range
              </option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <FieldError id="ic-budget-err" message={errors.budget?.message} />
          </div>

          {/* Honeypot */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="ic-website">Website</label>
            <input id="ic-website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" size="lg" arrow disabled={isSubmitting}>
              {isSubmitting ? "Sending" : "Send"}
            </Button>
            {status === "error" && (
              <p role="alert" className="text-sm text-error">
                That did not go through. Try again, or email {site.email}.
              </p>
            )}
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}
