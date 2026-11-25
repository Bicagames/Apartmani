/*
 * Address lines, phone number and e-mail are NOT here: they come from
 * `config/site.ts`. This file only holds labels and copy.
 * phoneSoon / emailSoon mirror `site.footer` so the contact section can stay
 * self-contained without importing the site slice.
 */
const contact = {
  section: {
    eyebrow: "Kontakt",
    title: "Schreiben Sie uns",
    lead: "Für einen längeren Aufenthalt in einem voll ausgestatteten Luxus-Apartment rufen Sie an oder schreiben Sie.",
  },
  reservations: {
    title: "Reservierung",
    body: "Nennen Sie die Kategorie und wie lange Sie bleiben möchten.",
    callCta: "Anrufen",
    whatsappCta: "WhatsApp",
    telegramCta: "Telegram",
    viberCta: "Viber",
    emailCta: "E-Mail",
    phoneSoon: "Telefonnummer folgt",
    emailSoon: "E-Mail-Adresse folgt",
  },
  info: {
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    addressLabel: "Adresse",
  },
  map: {
    title: "Karte mit der Lage des Hauses",
    openInMaps: "In Google Maps öffnen",
  },
};

export default contact;
