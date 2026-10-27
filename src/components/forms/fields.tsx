"use client";

import { useId, type ReactNode } from "react";
import type { FieldError as RhfError, UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

const labelClass = "spec mb-2 block text-muted";
const controlClass =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-fg focus-visible:outline-none aria-[invalid=true]:border-magenta";

export function ErrorText({ id, error }: { id: string; error?: RhfError | { message?: string } }) {
  if (!error?.message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-magenta">
      {error.message}
    </p>
  );
}

type Base = { label: string; reg: UseFormRegisterReturn; error?: RhfError; hint?: string; className?: string };

export function TextField({ label, reg, error, hint, className, type = "text", autoComplete, inputMode }: Base & {
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "decimal" | "email" | "tel" | "url" | "text";
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={cn(controlClass, "h-12")}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined}
        {...reg}
      />
      {hint && !error && (
        <p id={`${id}-h`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      <ErrorText id={`${id}-e`} error={error} />
    </div>
  );
}

export function TextArea({ label, reg, error, hint, className, rows = 4 }: Base & { rows?: number }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={cn(controlClass, "resize-y py-2")}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined}
        {...reg}
      />
      {hint && !error && (
        <p id={`${id}-h`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      <ErrorText id={`${id}-e`} error={error} />
    </div>
  );
}

/** Radio or checkbox chips registered with react-hook-form. */
export function Chips({
  legend,
  reg,
  options,
  error,
  multiple = false,
}: {
  legend: string;
  reg: UseFormRegisterReturn;
  options: ReadonlyArray<string | { value: string; label: string }>;
  error?: RhfError | { message?: string };
  multiple?: boolean;
}) {
  const id = useId();
  return (
    <fieldset aria-describedby={error?.message ? `${id}-e` : undefined}>
      <legend className={labelClass}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const { value, label } = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <label key={value} className="cursor-pointer">
              <input type={multiple ? "checkbox" : "radio"} value={value} className="peer sr-only" {...reg} />
              <span className="inline-flex h-11 items-center border border-line-strong px-4 transition-colors peer-checked:border-fg peer-checked:bg-fg peer-checked:text-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg hover:border-fg">
                {label}
              </span>
            </label>
          );
        })}
      </div>
      <ErrorText id={`${id}-e`} error={error} />
    </fieldset>
  );
}

/** Hidden honeypot field. */
export function Honeypot({ reg }: { reg: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" {...reg} />
      </label>
    </div>
  );
}

/** Review list of answers. */
export function ReviewList({ rows }: { rows: Array<{ label: string; value: ReactNode }> }) {
  return (
    <dl className="divide-y divide-dashed divide-line border-y border-line">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
          <dt className="spec text-muted">{r.label}</dt>
          <dd className="break-words">{r.value || <span className="text-muted">Not provided</span>}</dd>
        </div>
      ))}
    </dl>
  );
}
