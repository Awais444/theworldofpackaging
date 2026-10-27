"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type Choice<T extends string> = { value: T; label: string; detail?: string; disabled?: boolean };

/** Single-choice cards (radio group). */
export function ChoiceGroup<T extends string>({
  legend,
  value,
  options,
  onChange,
  columns = 2,
}: {
  legend: string;
  value: T;
  options: Choice<T>[];
  onChange: (v: T) => void;
  columns?: 1 | 2 | 3;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="spec mb-4 text-muted">{legend}</legend>
      <div className={cn("grid gap-2", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-3")}>
        {options.map((o) => (
          <label key={o.value} className={cn("block", o.disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer")}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="block h-full border border-line-strong p-4 transition-colors peer-checked:border-fg peer-checked:bg-fg peer-checked:text-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg hover:border-fg">
              <span className="block font-medium">{o.label}</span>
              {o.detail && <span className="mt-1 block text-sm opacity-70">{o.detail}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Multi-choice chips (checkbox group). */
export function MultiChoice({
  legend,
  values,
  options,
  onChange,
}: {
  legend: string;
  values: string[];
  options: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="spec mb-4 text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = values.includes(o);
          return (
            <label key={o} className="cursor-pointer">
              <input
                type="checkbox"
                checked={on}
                onChange={() => onChange(on ? values.filter((v) => v !== o) : [...values, o])}
                className="peer sr-only"
              />
              <span className="inline-flex h-11 items-center border border-line-strong px-4 transition-colors peer-checked:border-fg peer-checked:bg-fg peer-checked:text-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg hover:border-fg">
                {o}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Labelled numeric input with a unit suffix. */
export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  hint?: string;
}) {
  const id = useId();
  const invalid = value < min || value > max || Number.isNaN(value);
  return (
    <div>
      <label htmlFor={id} className="spec mb-2 block text-muted">
        {label}
      </label>
      <div className="flex items-baseline gap-2 border-b border-line-strong focus-within:border-fg">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => onChange(e.target.valueAsNumber)}
          aria-invalid={invalid}
          aria-describedby={`${id}-hint`}
          className="h-12 w-full bg-transparent font-mono text-2xl outline-none focus-visible:outline-none"
        />
        {suffix && <span className="spec text-muted">{suffix}</span>}
      </div>
      <p id={`${id}-hint`} className={cn("mt-2 text-sm", invalid ? "text-magenta" : "text-muted")}>
        {invalid ? `Enter a value between ${min} and ${max}.` : hint}
      </p>
    </div>
  );
}
