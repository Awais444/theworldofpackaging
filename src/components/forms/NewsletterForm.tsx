"use client";

import { useId, useState, type FormEvent } from "react";
import { submitNewsletter } from "@/app/actions/contact";

/** Footer email sign-up. Works on dark (Klein Blue) backgrounds. */
export function NewsletterForm() {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    const res = await submitNewsletter(data);
    setState(res.ok ? "done" : "error");
  }

  if (state === "done") return <p className="mt-6 text-sm font-medium">Thanks, you are on the list.</p>;

  return (
    <form onSubmit={onSubmit} className="mt-6" noValidate>
      <label htmlFor={id} className="text-sm font-semibold">
        Packaging tips, once a month
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@brand.com"
          className="h-12 min-w-0 flex-1 rounded-lg bg-white/10 px-4 text-white placeholder:text-white/60 focus:bg-white/15 focus:outline-none focus-visible:shadow-[var(--ring)]"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={state === "sending"} className="h-12 shrink-0 rounded-full bg-orange-500 px-5 text-[15px] font-semibold text-ink-900 transition-colors hover:bg-orange-600 disabled:opacity-60">
          Subscribe
        </button>
      </div>
      {state === "error" && <p role="alert" className="mt-2 text-sm">Please enter a valid email.</p>}
    </form>
  );
}
