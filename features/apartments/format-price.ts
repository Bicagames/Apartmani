import type { Locale } from "@/i18n/config";

export type PriceCurrency = "EUR" | "RSD";

/** BCP 47 tag used for number formatting per site locale. */
const numberLocale: Record<Locale, string> = {
  en: "en",
  de: "de-DE",
  ru: "ru-RU",
  sr: "sr-Latn-RS",
};

/**
 * Format a whole-unit price, e.g. `formatPrice('sr', 60, 'EUR')` -> "60 €",
 * `formatPrice('sr', 7000, 'RSD')` -> "7.000 RSD". Pure; safe on server and client.
 */
export function formatPrice(
  locale: Locale,
  amount: number,
  currency: PriceCurrency,
): string {
  return new Intl.NumberFormat(numberLocale[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
