import type { Messages } from "@/i18n/load-messages";
import { apartmentSlugs, type ApartmentSlug } from "./types";

function isApartmentSlug(slug: string): slug is ApartmentSlug {
  return (apartmentSlugs as readonly string[]).includes(slug);
}

/**
 * Translated texts of one apartment. Data and messages are kept in sync by the
 * `ApartmentSlug` type, so a missing entry is a programming error, not a 404.
 */
export function getApartmentItem(
  messages: Messages["apartments"],
  slug: string,
): Messages["apartments"]["items"][ApartmentSlug] {
  if (!isApartmentSlug(slug)) {
    throw new Error(`No apartment messages for slug "${slug}"`);
  }

  return messages.items[slug];
}
