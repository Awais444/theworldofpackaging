import { site, type CurrencyCode } from "@/config/site.config";

export const CURRENCIES = Object.keys(site.currency.rates) as CurrencyCode[];

/** Convert from USD using the static display rates in site.config. */
export function fromUsd(usd: number, code: CurrencyCode) {
  return usd * site.currency.rates[code];
}

export function formatMoney(amount: number, code: CurrencyCode, opts: { decimals?: number } = {}) {
  const decimals = opts.decimals ?? (Math.abs(amount) < 100 ? 2 : 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}
