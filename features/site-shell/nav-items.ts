import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";

export type NavItem = {
  href: string;
  label: string;
};

/**
 * Section anchors on the home page. Prefixed with the locale and the home path
 * so they also work from other pages (e.g. `/sr/apartmani/x` -> `/sr#kontakt`).
 */
export const getNavItems = (
  locale: Locale,
  nav: Messages["site"]["nav"],
): NavItem[] => [
  { href: localizedPath(locale, "/#apartmani"), label: nav.apartments },
  { href: localizedPath(locale, "/#o-objektu"), label: nav.place },
  { href: localizedPath(locale, "/#pitanja"), label: nav.questions },
  { href: localizedPath(locale, "/#kontakt"), label: nav.contact },
];

export const getReservationsItem = (
  locale: Locale,
  nav: Messages["site"]["nav"],
): NavItem => ({
  href: localizedPath(locale, "/#rezervacije"),
  label: nav.reservations,
});
