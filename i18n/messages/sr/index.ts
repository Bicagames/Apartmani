import apartments from "./apartments";
import contact from "./contact";
import faq from "./faq";
import hero from "./hero";
import placeInfo from "./place-info";
import seo from "./seo";
import site from "./site";
import story from "./story";

/*
 * The shape of this object is the `Messages` type (see i18n/load-messages.ts).
 * Do NOT add `as const`: strings must stay widened to `string`, otherwise a
 * second locale could never satisfy the type.
 *
 * Adding a language: copy this folder to `i18n/messages/<lang>`, translate the
 * values, then register it in `i18n/config.ts` (locales, htmlLang, ogLocale)
 * and in `loaders` in `i18n/load-messages.ts`. The loaders map is typed as
 * `Record<Locale, () => Promise<Messages>>`, so a locale whose messages miss a
 * key or have a different shape fails to compile.
 */
const messages = {
  site,
  hero,
  apartments,
  story,
  placeInfo,
  faq,
  contact,
  seo,
};

export default messages;
