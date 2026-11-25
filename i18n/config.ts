export const locales = ["en", "de", "ru", "sr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Value of the `lang` attribute and of `hreflang`.
 * Serbian is written in Latin script. English, German and Russian use the
 * language code without a region: the copy is not tied to one country.
 */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  de: "de",
  ru: "ru",
  sr: "sr-Latn",
};

/** Open Graph locale (`og:locale`). */
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  ru: "ru_RU",
  sr: "sr_RS",
};

/** Native name of each language, used as the accessible name of the switcher. */
export const localeNativeName: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  ru: "Русский",
  sr: "Srpski",
};

/** Short label shown in the language switcher. */
export const localeShortName: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  ru: "RU",
  sr: "SR",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Prefix an internal path with the locale.
 *
 *   localizedPath('sr', '/apartmani/x') -> '/sr/apartmani/x'
 *   localizedPath('sr', '/#kontakt')    -> '/sr#kontakt'
 *   localizedPath('sr', '#kontakt')     -> '/sr#kontakt'
 *   localizedPath('sr', '/')            -> '/sr'
 */
export function localizedPath(locale: Locale, path: string): string {
  const suffixStart = path.search(/[#?]/);
  const pathname = suffixStart === -1 ? path : path.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? "" : path.slice(suffixStart);
  const segments = pathname.replace(/^\/+|\/+$/g, "");

  return `/${locale}${segments ? `/${segments}` : ""}${suffix}`;
}

/**
 * Drop a leading locale segment. Used by the language switcher so `/en/apartmani/x`
 * becomes `/de/apartmani/x` rather than the other language's home page.
 * `hreflang` pairs must be the same document in each language.
 */
export function pathWithoutLocale(pathname: string): string {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (first && hasLocale(first)) {
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }
  return pathname === "" ? "/" : pathname;
}

/**
 * Every language version of one internal path, plus `x-default` (the default locale).
 * Paths are site-relative; callers that need absolute URLs prefix `siteUrl`.
 */
export function hreflangLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[htmlLang[locale]] = localizedPath(locale, path);
  }
  languages["x-default"] = localizedPath(defaultLocale, path);
  return languages;
}
