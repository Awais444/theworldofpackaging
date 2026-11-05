"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Check, CircleCheck, Layers, MessageCircle, Palette, PenTool, Paperclip, Printer, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { submitProject, submitQuoteRequest } from "@/app/actions/forms";
import { site, whatsappUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SendError } from "./SendError";
import {
  brandOnly,
  needsPrinting,
  QUOTE_LOGO,
  QUOTE_PACKAGING,
  QUOTE_PRODUCTS,
  QUOTE_QTY,
  QUOTE_SKUS,
  quoteStepSchemas,
  type QuoteNeed,
} from "@/lib/schemas";
import { prefillFromParams, type QuoteBoxOption } from "@/lib/quotePrefill";
import { cn } from "@/lib/utils";
import { useQuote, type QuoteDraft } from "@/store/quote";

type Errors = Record<string, string>;

const NEEDS: Array<{ id: QuoteNeed; icon: LucideIcon; title: string; text: string }> = [
  { id: "design", icon: PenTool, title: "Packaging design", text: "Box, label, pouch or bottle design, print-ready." },
  { id: "brand", icon: Palette, title: "Brand identity", text: "Logo, colours and brand guidelines." },
  { id: "design-print", icon: Layers, title: "Design + printing", text: "We design it and print it for you." },
  { id: "print", icon: Printer, title: "Printing only", text: "You have artwork; we print and ship." },
];
const needLabel = (id: QuoteNeed) => NEEDS.find((n) => n.id === id)?.title ?? id;

const STEPS = ["What do you need?", "About your project", "Your details"] as const;

const NEXT_STEPS = [`Reply ${site.facts.quoteReply}`, `First concepts in ${site.facts.firstConceptHours} hours`, "Digital proof before anything is printed"];

function issues(result: { success: boolean; error?: { issues: Array<{ path: PropertyKey[]; message: string }> } }): Errors {
  if (result.success || !result.error) return {};
  const out: Errors = {};
  for (const i of result.error.issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

function validate(step: number, d: QuoteDraft): Errors {
  if (step === 0) return issues(quoteStepSchemas.needs.safeParse(d));
  if (step === 1) return issues(quoteStepSchemas.project.safeParse(d));
  return issues(quoteStepSchemas.details.safeParse(d));
}

/** Answers as short chips, in form order. Only answered questions appear. */
function answerChips(d: QuoteDraft): string[] {
  const print = needsPrinting(d.needs);
  const brand = brandOnly(d.needs);
  return [
    ...d.needs.map(needLabel),
    d.product,
    ...(brand ? [] : d.packaging),
    d.skus && `${d.skus} ${d.skus === "1" ? "design" : "designs"}`,
    brand && d.logo && `Logo: ${d.logo}`,
    print && !brand && d.quantity && `Qty ${d.quantity}`,
    print && d.country && `Ship to ${d.country}`,
  ].filter((x): x is string => Boolean(x));
}

/** Pre-filled WhatsApp message with the answers so far. */
const whatsappMessage = (d: QuoteDraft) => {
  const chips = answerChips(d);
  return chips.length ? `Hi, I'd like a quote. ${chips.join(" · ")}.` : "Hi, I'd like a quote for packaging.";
};

/** Large selectable card backed by a real checkbox. */
function NeedCard({ checked, onChange, icon: Icon, title, text }: { checked: boolean; onChange: () => void; icon: LucideIcon; title: string; text: string }) {
  return (
    <label className="block cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="relative flex h-full gap-4 rounded-2xl border-2 border-silver-300 bg-white p-5 transition hover:border-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-focus-visible:shadow-[var(--ring)] sm:flex-col sm:p-6">
        <span className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition", checked ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600")}>
          <Icon aria-hidden="true" className="h-6 w-6" />
        </span>
        <span className="min-w-0 pr-7 sm:pr-0">
          <span className="block font-heading text-lg font-bold">{title}</span>
          <span className="mt-1 block text-sm text-ink-500">{text}</span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 transition",
            checked ? "border-blue-600 bg-blue-600 text-white" : "border-silver-300 bg-white text-transparent",
          )}
        >
          <Check className="h-4 w-4" />
        </span>
      </span>
    </label>
  );
}

/** Pill option backed by a real radio or checkbox. */
function Chip({ type = "checkbox", name, checked, onChange, children }: { type?: "radio" | "checkbox"; name?: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex h-11 items-center gap-2 rounded-full border border-silver-300 bg-white px-4 text-[15px] font-medium transition hover:border-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white peer-focus-visible:shadow-[var(--ring)]">
        {checked && <Check aria-hidden="true" className="h-4 w-4" />}
        {children}
      </span>
    </label>
  );
}

function Group({ label, error, children, hint }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[15px] font-semibold">{label}</legend>
      {hint && <p className="-mt-2 mb-3 text-sm text-ink-500">{hint}</p>}
      <div className="flex flex-wrap gap-2">{children}</div>
      <ErrorMsg error={error} />
    </fieldset>
  );
}

function ErrorMsg({ error }: { error?: string }) {
  return error ? (
    <p role="alert" className="mt-3 text-sm font-medium text-error">
      {error}
    </p>
  ) : null;
}

/** Files are not uploaded through the form: they come by WhatsApp or as a reply to our email. */
function FilesNote({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-[15px] text-ink-900", className)}>
      <Paperclip aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
      <span>
        You can send files on WhatsApp{site.whatsapp ? ` (${site.whatsapp})` : ""} or by replying to our email.
      </span>
    </p>
  );
}

function NextSteps({ className }: { className?: string }) {
  return (
    <ol className={cn("space-y-3", className)}>
      {NEXT_STEPS.map((s, i) => (
        <li key={s} className="flex items-start gap-3 text-[15px]">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{i + 1}</span>
          <span className="pt-0.5">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function Success({ d, onRestart }: { d: QuoteDraft; onRestart: () => void }) {
  return (
    <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status" className="mx-auto max-w-2xl rounded-3xl bg-blue-50 p-8 md:p-12">
      <CircleCheck aria-hidden="true" className="h-14 w-14 text-blue-600" />
      <h2 className="text-h2 mt-6">Thank you{d.name ? `, ${d.name.split(" ")[0]}` : ""}. Request sent.</h2>
      <p className="text-lead mt-4 text-ink-500">We&apos;ve got your answers. Here&apos;s what happens next:</p>
      <NextSteps className="mt-6" />
      <FilesNote className="mt-6" />
      <div className="mt-8 flex flex-wrap gap-3">
        <WhatsAppButton message="Hi, I just sent a quote request on your website." label="Message us on WhatsApp" variant="primary" />
        <Button href="/work" size="lg" variant="secondary">
          See our work
        </Button>
        <Button href="/packaging-design" size="lg" variant="ghost" arrow>
          Packaging design services
        </Button>
      </div>
      <button type="button" onClick={onRestart} className="mt-6 text-sm font-semibold text-blue-600 hover:underline">
        Send another request
      </button>
    </m.div>
  );
}

/**
 * Quote request: 3 steps (what you need → about the project → your details), design first, printing optional.
 * The draft autosaves to localStorage. Links can preselect choices (see lib/quotePrefill.ts).
 * `countries` and `boxes` are passed by the server page so content data stays out of the browser bundle.
 * `kind="project"` (/start-a-project): sent as a project brief, with Packaging design preselected on a new draft.
 */
export function QuoteBuilder({ countries, boxes, kind = "quote" }: { countries: Array<{ slug: string; name: string }>; boxes: QuoteBoxOption[]; kind?: "quote" | "project" }) {
  const names = countries.map((c) => c.name).sort((a, b) => a.localeCompare(b));
  const { draft: d, step, set: save, goTo, reset } = useQuote();
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sent, setSent] = useState<QuoteDraft | null>(null);
  const [serverError, setServerError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const ids = useId();
  const last = step === STEPS.length - 1;
  const print = needsPrinting(d.needs);
  const brand = brandOnly(d.needs);
  // Saving an answer clears that field's error.
  const set = (patch: Partial<QuoteDraft>) => {
    save(patch);
    setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !(k in patch))));
  };

  // Restore the autosaved draft, then apply link choices (?service=, ?box=, ?industry=, ?country=, ?from=configurator).
  useEffect(() => {
    void (async () => {
      await useQuote.persist.rehydrate();
      const q = new URLSearchParams(window.location.search);
      const { set: patch, goTo: go } = useQuote.getState();
      if (q.get("from") === "configurator") {
        const { useConfigurator } = await import("@/store/configurator");
        await useConfigurator.persist.rehydrate();
        const c = useConfigurator.getState().config;
        const box = boxes.find((b) => b.slug === c.style);
        const qty = c.quantity >= 5000 ? "5,000+" : c.quantity >= 2500 ? "2,500" : c.quantity >= 1000 ? "1,000" : "500";
        patch({
          needs: ["design-print"],
          packaging: [c.type === "printed" ? "Box" : "Rigid box"],
          quantity: qty,
          source: `Box configurator: ${box?.name ?? c.style}, ${c.dims.l} × ${c.dims.w} × ${c.dims.h} mm, ${c.quantity.toLocaleString("en-US")} pcs${c.finishes.length ? `, ${c.finishes.join(", ")}` : ""}`,
        });
        go(0);
        return;
      }
      const countrySlugs = Object.fromEntries(countries.map((c) => [c.slug, c.name]));
      const pre = prefillFromParams(q, { boxes, countries: names, countrySlugs });
      if (pre) {
        patch(pre);
        go(0);
      } else if (kind === "project" && useQuote.getState().draft.needs.length === 0) {
        patch({ needs: ["design"] });
      }
    })();
    // countries and boxes come from the server and do not change after hydration.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ship-to default from the browser's region, when printing is involved and nothing is set yet.
  useEffect(() => {
    if (!print || d.country) return;
    try {
      const region = new Intl.Locale(navigator.language).maximize().region;
      const name = region && new Intl.DisplayNames(["en"], { type: "region" }).of(region);
      const match = name && names.find((n) => n === name || n === name.replace(/^the /, ""));
      if (match) save({ country: match });
    } catch {
      /* no locale info: leave it empty */
    }
    // names is derived from server props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [print, d.country, save]);

  const toggleNeed = (id: QuoteNeed) => {
    const on = d.needs.includes(id);
    let needs = on ? d.needs.filter((n) => n !== id) : [...d.needs, id];
    // Design + printing and Printing only exclude each other: picking one switches off the other.
    if (!on && id === "design-print") needs = needs.filter((n) => n !== "print");
    if (!on && id === "print") needs = needs.filter((n) => n !== "design-print");
    set({ needs });
  };

  const toggleIn = <K extends "packaging">(key: K, v: QuoteDraft[K][number]) => {
    const list = d[key] as string[];
    set({ [key]: list.includes(v) ? list.filter((x) => x !== v) : [...list, v] } as Partial<QuoteDraft>);
  };

  const move = (n: number) => {
    setErrors({});
    goTo(n);
    requestAnimationFrame(() => heading.current?.focus());
  };

  const next = () => {
    const e = validate(step, d);
    setErrors(e);
    if (Object.keys(e).length) return;
    move(step + 1);
  };

  const submit = async () => {
    for (let i = 0; i < STEPS.length; i++) {
      const e = validate(i, d);
      if (Object.keys(e).length) {
        move(i);
        setErrors(e);
        return;
      }
    }
    setStatus("sending");
    // Answers the form hid (e.g. quantity after printing was switched off) are not sent.
    const payload = {
      ...d,
      packaging: brand ? [] : d.packaging,
      quantity: print && !brand ? d.quantity : undefined,
      country: print ? d.country : "",
      logo: brand ? d.logo : undefined,
      website: honeypot,
    };
    const res = await (kind === "project" ? submitProject : submitQuoteRequest)(payload);
    if (res.ok) {
      setSent(d);
      setStatus("sent");
      reset();
    } else {
      setStatus("error");
      setServerError(res.error);
    }
  };

  if (status === "sent" && sent) return <Success d={sent} onRestart={() => setStatus("idle")} />;

  const chips = answerChips(d);
  const wa = whatsappUrl(whatsappMessage(d));

  const content: ReactNode[] = [
    // 1. What do you need?
    <div key="needs">
      <p className="-mt-2 mb-5 text-ink-500">Pick one or more.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {NEEDS.map((n) => (
          <NeedCard key={n.id} checked={d.needs.includes(n.id)} onChange={() => toggleNeed(n.id)} icon={n.icon} title={n.title} text={n.text} />
        ))}
      </div>
      <ErrorMsg error={errors.needs} />
    </div>,
    // 2. About your project
    <div key="project" className="space-y-8">
      <Group label="Product type" error={errors.product}>
        {QUOTE_PRODUCTS.map((p) => (
          <Chip key={p} type="radio" name="product" checked={d.product === p} onChange={() => set({ product: p })}>
            {p}
          </Chip>
        ))}
      </Group>
      {brand ? (
        <Group label="Do you have a logo already?" error={errors.logo}>
          {QUOTE_LOGO.map((l) => (
            <Chip key={l} type="radio" name="logo" checked={d.logo === l} onChange={() => set({ logo: l })}>
              {l}
            </Chip>
          ))}
        </Group>
      ) : (
        <Group label="Packaging type" hint="Pick any." error={errors.packaging}>
          {QUOTE_PACKAGING.map((p) => (
            <Chip key={p} checked={d.packaging.includes(p)} onChange={() => toggleIn("packaging", p)}>
              {p}
            </Chip>
          ))}
        </Group>
      )}
      <Group label="Number of designs (SKUs)" error={errors.skus}>
        {QUOTE_SKUS.map((s) => (
          <Chip key={s} type="radio" name="skus" checked={d.skus === s} onChange={() => set({ skus: s })}>
            {s}
          </Chip>
        ))}
      </Group>
      {print && !brand && (
        <Group label="Quantity per design" error={errors.quantity}>
          {QUOTE_QTY.map((q) => (
            <Chip key={q} type="radio" name="quantity" checked={d.quantity === q} onChange={() => set({ quantity: q })}>
              {q}
            </Chip>
          ))}
        </Group>
      )}
      {print && (
        <Field label="Ship to" htmlFor={`${ids}-country`} error={errors.country} hint="Start typing to search." className="max-w-md">
          <Input id={`${ids}-country`} list={`${ids}-countries`} autoComplete="country-name" value={d.country} aria-invalid={!!errors.country} onChange={(e) => set({ country: e.target.value })} />
          <datalist id={`${ids}-countries`}>
            {names.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
      )}
      <Field label="Tell us about your product (optional)" htmlFor={`${ids}-about`} hint="What it is, where it sells, a deadline, anything that helps.">
        <Textarea id={`${ids}-about`} rows={3} value={d.about} onChange={(e) => set({ about: e.target.value })} />
      </Field>
      <Field label="Links (optional)" htmlFor={`${ids}-links`} hint="Website, references, Drive or Dropbox folder.">
        <Textarea id={`${ids}-links`} rows={2} value={d.links} onChange={(e) => set({ links: e.target.value })} />
      </Field>
      <FilesNote />
    </div>,
    // 3. Your details
    <div key="details" className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" htmlFor={`${ids}-name`} error={errors.name}>
        <Input id={`${ids}-name`} autoComplete="name" value={d.name} aria-invalid={!!errors.name} onChange={(e) => set({ name: e.target.value })} />
      </Field>
      <Field label="Email" htmlFor={`${ids}-email`} error={errors.email}>
        <Input id={`${ids}-email`} type="email" autoComplete="email" value={d.email} aria-invalid={!!errors.email} onChange={(e) => set({ email: e.target.value })} />
      </Field>
      <Field label={d.contactBy === "whatsapp" ? "WhatsApp" : "WhatsApp (optional)"} htmlFor={`${ids}-wa`} error={errors.whatsapp} hint="With country code, e.g. +44 7700 900123.">
        <Input id={`${ids}-wa`} type="tel" autoComplete="tel" placeholder="+" value={d.whatsapp} aria-invalid={!!errors.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} />
      </Field>
      <Field label="Company (optional)" htmlFor={`${ids}-company`}>
        <Input id={`${ids}-company`} autoComplete="organization" value={d.company} onChange={(e) => set({ company: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <Group label="How should we reply?">
          <Chip type="radio" name="contactBy" checked={d.contactBy === "email"} onChange={() => set({ contactBy: "email" })}>
            Email
          </Chip>
          <Chip type="radio" name="contactBy" checked={d.contactBy === "whatsapp"} onChange={() => set({ contactBy: "whatsapp" })}>
            WhatsApp
          </Chip>
        </Group>
      </div>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>
    </div>,
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (last) void submit();
          else next();
        }}
        className="relative rounded-3xl border border-silver-300 bg-white p-5 md:p-8 lg:col-span-8"
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-blue-600">
            Step {step + 1} of {STEPS.length}
          </span>
          <ol aria-hidden="true" className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <li key={s} className={cn("h-2.5 rounded-full transition-all", i === step ? "w-7 bg-blue-600" : i < step ? "w-2.5 bg-blue-600" : "w-2.5 bg-silver-300")} />
            ))}
          </ol>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.fieldset
            key={step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <legend className="sr-only">{STEPS[step]}</legend>
            <h2 ref={heading} tabIndex={-1} className="text-h3 mb-6 outline-none">
              {STEPS[step]}
            </h2>
            {content[step]}
          </m.fieldset>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-silver-300 pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => move(step - 1)}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" size="lg" arrow disabled={status === "sending"}>
            {last ? (status === "sending" ? "Sending…" : "Send my request") : "Continue"}
          </Button>
        </div>
        {status === "error" && <SendError message={serverError} topic={kind === "project" ? "a project brief" : "a quote request"} />}
      </form>

      {/* Summary: sticky beside the form on desktop, below it on mobile. */}
      <aside className="lg:col-span-4">
        <div className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <div className="rounded-3xl bg-silver-100 p-6">
            <h2 className="font-heading text-lg font-bold">Your request</h2>
            {chips.length ? (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Your answers">
                {chips.map((c) => (
                  <li key={c} className="inline-flex min-h-8 items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-ink-900">
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-ink-500">Your answers appear here as you go.</p>
            )}
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-500">What happens next</h3>
            <NextSteps className="mt-3" />
          </div>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-3xl border border-silver-300 bg-white p-5 font-semibold transition hover:border-blue-600">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success text-white">
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </span>
              <span>
                Prefer chat? WhatsApp us
                <span className="block text-sm font-normal text-ink-500">{chips.length ? "Your answers are added to the message." : site.whatsapp}</span>
              </span>
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}
