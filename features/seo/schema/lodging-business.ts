import { address, email, geo, phone, siteName } from "@/config/site";
import { getApartmentItem } from "@/features/apartments/item-messages";
import type { Apartment } from "@/features/apartments/types";
import { htmlLang, localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { absoluteUrl } from "../absolute-url";
import { buildApartmentSchema } from "./apartment";
import type { JsonLdNode } from "./types";

/** Hero stand-in; same path as `features/hero/components/hero.tsx`. */
const HERO_IMAGE_PATH = "/images/hero.jpg";

type BuildLodgingBusinessSchemaInput = {
  locale: Locale;
  description: string;
  apartments: Apartment[];
  apartmentMessages: Messages["apartments"];
  /** Real photos, hero first. Placeholder apartment shots stay off this list. */
  imagePaths?: readonly string[];
};

/**
 * Schema.org `LodgingBusiness` for the property home page.
 * Omits priceRange while unconfirmed. No aggregateRating.
 */
export function buildLodgingBusinessSchema({
  locale,
  description,
  apartments,
  apartmentMessages,
  imagePaths = [HERO_IMAGE_PATH],
}: BuildLodgingBusinessSchemaInput): JsonLdNode {
  const homePath = localizedPath(locale, "/");
  const url = absoluteUrl(homePath);

  const image = imagePaths.flatMap((path) => {
    const absolute = absoluteUrl(path);
    return absolute ? [absolute] : [];
  });

  const postalAddress: JsonLdNode = {
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.city,
    addressCountry: address.country,
    ...(address.postalCode
      ? { postalCode: address.postalCode }
      : {}),
  };

  const containsPlace = apartments.map((apartment) =>
    buildApartmentSchema({
      apartment,
      item: getApartmentItem(apartmentMessages, apartment.slug),
      amenityLabels: apartmentMessages.amenities,
      bedTypeLabels: apartmentMessages.bedTypes,
      path: localizedPath(locale, `/apartmani/${apartment.slug}`),
    }),
  );

  return {
    "@type": "LodgingBusiness",
    name: siteName,
    description,
    inLanguage: htmlLang[locale],
    telephone: phone,
    email,
    ...(url ? { url } : {}),
    ...(image.length > 0 ? { image } : {}),
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    containsPlace,
  };
}
