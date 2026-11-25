const rawSiteUrl = process.env.SITE_URL?.trim().replace(/\/+$/, "");

export const siteName = "FAMILY RESORT";

export const address: {
  street: string;
  city: string;
  country: string;
  countryName: string;
  postalCode: string | null;
} = {
  street: "Somborski put 29a",
  city: "Subotica",
  country: "RS",
  countryName: "Serbia",
  postalCode: "24000",
};

/**
 * Building centroid for Somborski put 29a.
 * OpenStreetMap way 1469445602, Nominatim, 18 Nov 2026.
 */
export const geo = {
  latitude: 46.0948337,
  longitude: 19.6542633,
} as const;

/**
 * Published number for Family Resort at Somborski put 29a.
 * Same line for calls, WhatsApp, Telegram, and Viber.
 */
export const phone = "+381 66 576 9088";

export const email = "familyresort024@gmail.com";

/** Canonical origin without trailing slash, or null until SITE_URL is set. */
export const siteUrl: string | null = rawSiteUrl ? rawSiteUrl : null;

/** The site stays `noindex` until a real domain is configured. */
export const isIndexable: boolean = siteUrl !== null;

export const mapQuery = "Somborski put 29a, Subotica, Serbia";

/** Hard-coded: Cache Components forbids `new Date()` in prerendered components. */
export const copyrightYear = 2026;

/**
 * Static content revision date for sitemap `lastModified`.
 * Bump when apartment copy or photos change meaningfully.
 * Cache Components forbids `new Date()` in prerendered routes.
 */
export const contentUpdatedAt = "2026-11-19";
