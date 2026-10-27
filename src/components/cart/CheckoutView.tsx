"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitOrderRequest } from "@/app/actions/forms";
import { site } from "@/config/site.config";
import { formatMoney } from "@/lib/currency";
import { checkoutSchema, type CheckoutInput } from "@/lib/schemas";
import { cartTotalUsd, useCart } from "@/store/cart";
import { DirectContact } from "@/components/forms/MultiStepForm";
import { TextField } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { RegMark } from "@/components/ui/RegMark";

/** Checkout UI. TODO payment: no provider connected; submitting records an order request and we invoice. */
export function CheckoutView() {
  const { items, clear } = useCart();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", company: "", address: "", city: "", postcode: "", country: "", phone: "" },
  });
  const { register, formState, handleSubmit } = form;
  const e = formState.errors;
  const total = cartTotalUsd(items);

  if (status === "sent") {
    return (
      <div role="status" className="max-w-2xl">
        <RegMark className="h-14 w-14 text-accent" />
        <p className="type-display mt-8 text-display-lg">Order request received.</p>
        <p className="mt-4 text-lg text-muted">
          We will confirm shipping and email an invoice within {site.facts.quoteReplyHours} hours on working days.
        </p>
        <Button href="/" variant="link" arrow className="mt-8">
          Back to home
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border-y border-line py-16">
        <p className="type-display text-display-md">Nothing to check out.</p>
        <Button href="/samples" arrow className="mt-8">
          Browse samples
        </Button>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (customer) => {
    const res = await submitOrderRequest({ customer, items });
    if (res.ok) {
      clear();
      setStatus("sent");
    } else setStatus("error");
  });

  return (
    <div className="grid gap-14 lg:grid-cols-12">
      <form noValidate onSubmit={onSubmit} className="space-y-10 lg:col-span-7">
        <fieldset className="grid gap-8 sm:grid-cols-2">
          <legend className="type-display mb-6 text-display-sm">Contact</legend>
          <TextField label="Name" reg={register("name")} error={e.name} autoComplete="name" />
          <TextField label="Email" type="email" reg={register("email")} error={e.email} autoComplete="email" />
          <TextField label="Company (optional)" reg={register("company")} error={e.company} autoComplete="organization" />
          <TextField label="Phone (optional)" type="tel" reg={register("phone")} error={e.phone} autoComplete="tel" />
        </fieldset>
        <fieldset className="grid gap-8 sm:grid-cols-2">
          <legend className="type-display mb-6 text-display-sm">Shipping address</legend>
          <TextField label="Street address" reg={register("address")} error={e.address} autoComplete="street-address" className="sm:col-span-2" />
          <TextField label="City" reg={register("city")} error={e.city} autoComplete="address-level2" />
          <TextField label="Postcode / ZIP" reg={register("postcode")} error={e.postcode} autoComplete="postal-code" />
          <TextField label="Country" reg={register("country")} error={e.country} autoComplete="country-name" />
        </fieldset>
        <div className="border border-dashed border-line-strong p-5">
          <p className="spec">Payment</p>
          <p className="mt-2 text-muted">
            Online card payment is not connected yet. Submit your order and we email an invoice with shipping included.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" arrow disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Sending" : "Request invoice"}
          </Button>
          {status === "error" && (
            <p role="alert" className="text-sm text-magenta">
              That did not go through. Try again, or email {site.email}.
            </p>
          )}
        </div>
      </form>

      <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
        <div className="border border-line p-6">
          <p className="spec text-muted">Order</p>
          <ul className="mt-4 divide-y divide-dashed divide-line">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-4 py-3">
                <span>
                  {i.title} <span className="font-mono text-muted">× {i.qty}</span>
                </span>
                <span className="font-mono">{formatMoney(i.priceUsd * i.qty, "USD")}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-4 font-mono">
            <span>Subtotal</span>
            <span>{formatMoney(total, "USD")}</span>
          </div>
          <p className="mt-2 text-sm text-muted">Shipping added on the invoice.</p>
        </div>
        <DirectContact />
      </aside>
    </div>
  );
}
