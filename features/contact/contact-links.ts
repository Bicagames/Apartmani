type SiteAddress = {
  street: string;
  city: string;
  countryName: string;
  postalCode: string | null;
};

/** Digits only, no leading plus. Used by messenger deep links. */
const getPhoneDigits = (phone: string): string => phone.replace(/\D/g, "");

/** `tel:` href from a human-formatted number: keeps digits and a leading `+`. */
export const getTelHref = (phone: string): string =>
  `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Opens a WhatsApp chat with this number. */
export const getWhatsAppHref = (phone: string): string =>
  `https://wa.me/${getPhoneDigits(phone)}`;

/** Opens Telegram to this phone number when the app is installed. */
export const getTelegramHref = (phone: string): string =>
  `tg://resolve?phone=${getPhoneDigits(phone)}`;

/** Opens a Viber chat with this number. */
export const getViberHref = (phone: string): string =>
  `viber://chat?number=%2B${getPhoneDigits(phone)}`;

export const getMailtoHref = (email: string): string => `mailto:${email}`;

/** Opens the place in Google Maps (new tab, no API key). */
export const getMapsSearchUrl = (mapQuery: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

/** Key-less Google Maps embed URL, used as the iframe `src`. */
export const getMapsEmbedUrl = (mapQuery: string): string =>
  `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

/** Address lines for display: street / postal code + city / country. */
export const getAddressLines = (siteAddress: SiteAddress): string[] => [
  siteAddress.street,
  [siteAddress.postalCode, siteAddress.city].filter(Boolean).join(" "),
  siteAddress.countryName,
];
