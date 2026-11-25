import { htmlLang, type Locale } from "./config";

export type PluralForms = {
  /**
   * Singular. Serbian and Russian: 1, 21, 31, … (not 11).
   * English and German: exactly 1.
   */
  one: string;
  /**
   * Serbian and Russian paucal: 2–4, 22–24, … (not 12–14).
   * English and German do not use this category; set it equal to `other`.
   */
  few: string;
  /**
   * Everything else, including Russian "many" (0, 5–20, 11–14, …).
   */
  other: string;
};

/**
 * Pick the plural form for a whole-number count in the page locale.
 * Uses `Intl.PluralRules` so Serbian, Russian, English and German each follow
 * their own categories. Russian `many` is returned as `other`.
 *
 * Returns only the form; the caller decides whether to prepend the number.
 */
export function formatCount(
  locale: Locale,
  count: number,
  forms: PluralForms,
): string {
  const category = new Intl.PluralRules(htmlLang[locale]).select(count);
  if (category === "one") return forms.one;
  if (category === "few") return forms.few;
  return forms.other;
}
