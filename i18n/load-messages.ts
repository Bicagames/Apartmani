import type { Locale } from "./config";
import type en from "./messages/en";

/** Shape of every locale's messages, derived from the English source files. */
export type Messages = typeof en;

const loaders: Record<Locale, () => Promise<Messages>> = {
  en: () => import("./messages/en").then((module) => module.default),
  de: () => import("./messages/de").then((module) => module.default),
  ru: () => import("./messages/ru").then((module) => module.default),
  sr: () => import("./messages/sr").then((module) => module.default),
};

/**
 * Locale-explicit loader for code that has no route `lang` (for example
 * `app/global-not-found.tsx`). Route code should use `getMessages()`.
 */
export function loadMessages(locale: Locale): Promise<Messages> {
  return loaders[locale]();
}
