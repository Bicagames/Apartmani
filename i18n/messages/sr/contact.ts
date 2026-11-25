/*
 * Address lines, phone number and e-mail are NOT here: they come from
 * `config/site.ts`. This file only holds labels and copy.
 * phoneSoon / emailSoon mirror `site.footer` so the contact section can stay
 * self-contained without importing the site slice.
 */
const contact = {
  section: {
    eyebrow: "Kontakt",
    title: "Javite nam se",
    lead: "Za duži boravak u potpuno opremljenom luksuznom apartmanu pozovite ili pošaljite poruku.",
  },
  reservations: {
    title: "Rezervacija",
    body: "Napišite koja kategorija vam treba i koliko dugo želite da ostanete.",
    callCta: "Pozovite",
    whatsappCta: "WhatsApp",
    telegramCta: "Telegram",
    viberCta: "Viber",
    emailCta: "E-pošta",
    phoneSoon: "Broj telefona uskoro",
    emailSoon: "E-adresa uskoro",
  },
  info: {
    phoneLabel: "Telefon",
    emailLabel: "E-pošta",
    addressLabel: "Adresa",
  },
  map: {
    title: "Mapa sa lokacijom objekta",
    openInMaps: "Otvori u Google Maps",
  },
};

export default contact;
