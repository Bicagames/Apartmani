import type {
  AmenityGroup,
  AmenityId,
  ApartmentSlug,
  BedType,
} from "@/features/apartments/types";
import type { PluralForms } from "../../plural";

/*
 * German uses one/other. `few` matches `other` because this locale never
 * selects the paucal category.
 */
type ApartmentItemMessages = {
  name: string;
  /** One line, shown on the card. */
  summary: string;
  description: string;
  /** One alt text per photo, same order as `Apartment.images` (5 photos). */
  imageAlts: [string, string, string, string, string];
};

type ApartmentsMessages = {
  section: { eyebrow: string; title: string; lead: string };
  card: {
    areaUnit: string;
    /** Count is rendered separately: `${n} ${formatCount(locale, n, guests)}`. */
    guests: PluralForms;
    from: string;
    perNight: string;
    viewDetails: string;
  };
  detail: {
    descriptionTitle: string;
    factsTitle: string;
    bedsTitle: string;
    bedrooms: PluralForms;
    studio: string;
    amenitiesTitle: string;
    groups: Record<AmenityGroup, string>;
    priceTitle: string;
    priceNote: string;
    cta: string;
    close: string;
    previousPhoto: string;
    nextPhoto: string;
    /** Placeholders: `{current}` and `{total}`. */
    photoCounter: string;
    galleryLabel: string;
    breadcrumb: {
      /** Accessible name of the breadcrumb `nav`. */
      label: string;
      home: string;
      apartments: string;
    };
  };
  items: Record<ApartmentSlug, ApartmentItemMessages>;
  amenities: Record<AmenityId, string>;
  /** Count is rendered separately: `${n} ${formatCount(locale, n, bedTypes[type])}`. */
  bedTypes: Record<BedType, PluralForms>;
};

const apartments: ApartmentsMessages = {
  section: {
    eyebrow: "Apartments",
    title: "Die Wohnungen",
    lead: "Voll ausgestattete Luxus-Apartments für einen längeren Aufenthalt.",
  },
  card: {
    areaUnit: "m²",
    guests: { one: "Gast", few: "Gäste", other: "Gäste" },
    from: "ab",
    perNight: "pro Nacht",
    viewDetails: "Details ansehen",
  },
  detail: {
    descriptionTitle: "Über das Apartment",
    factsTitle: "Auf einen Blick",
    bedsTitle: "Betten",
    bedrooms: {
      one: "Schlafzimmer",
      few: "Schlafzimmer",
      other: "Schlafzimmer",
    },
    studio: "Studio",
    amenitiesTitle: "Ausstattung",
    groups: {
      kitchen: "Küche",
      bathroom: "Bad",
      room: "Zimmer",
      other: "Sonstiges",
    },
    priceTitle: "Preis",
    priceNote: "Schreiben Sie uns für den Preis auf Dauer.",
    cta: "Reservierung",
    close: "Schließen",
    previousPhoto: "Vorheriges Foto",
    nextPhoto: "Nächstes Foto",
    photoCounter: "Foto {current} von {total}",
    galleryLabel: "Fotogalerie des Apartments",
    breadcrumb: {
      label: "Navigationspfad",
      home: "Startseite",
      apartments: "Apartments",
    },
  },
  items: {
    "suit-deluxe-1": {
      name: "Suit Deluxe 1",
      summary:
        "Apartment in Subotica mit Doppelbett und Schlafsofa, für bis zu 4 Gäste.",
      description:
        "Ein Schlafzimmer mit Doppelbett. Im Wohnzimmer stehen ein Schlafsofa und eine Küche mit Herd, Kühlschrank, Mikrowelle und Kochgeschirr. Dusche, Klimaanlage, Fernseher und WLAN.",
      imageAlts: [
        "Wohnzimmer der Suite Deluxe 1 in Subotica",
        "Schlafbereich der Suite Deluxe 1 mit Doppelbett",
        "Küche und Essecke der Suite Deluxe 1",
        "Bad der Suite Deluxe 1 mit Dusche",
        "Detail der Suite Deluxe 1 in Sandfarben",
      ],
    },
    "suit-deluxe-2": {
      name: "Suit Deluxe 2",
      summary: "Apartment in Subotica mit zwei Schlafzimmern, für bis zu 5 Gäste.",
      description:
        "In einem Zimmer steht ein Doppelbett, im anderen zwei Einzelbetten. Im Wohnzimmer steht ein Schlafsofa. Es gibt eine Küche, einen Schreibtisch und eine Waschmaschine.",
      imageAlts: [
        "Wohnzimmer der Suite Deluxe 2 in Subotica",
        "Erstes Schlafzimmer der Suite Deluxe 2 mit Doppelbett",
        "Zweites Schlafzimmer der Suite Deluxe 2 mit zwei Einzelbetten",
        "Küche der Suite Deluxe 2 mit Esstisch",
        "Bad der Suite Deluxe 2 mit Waschmaschine",
      ],
    },
    "studio-deluxe": {
      name: "Studio Deluxe",
      summary: "Studio in Subotica mit Doppelbett, für zwei Personen.",
      description:
        "Studio mit Doppelbett, Küchenzeile und Dusche. Klimaanlage, Fernseher und WLAN.",
      imageAlts: [
        "Studio Deluxe mit Doppelbett in Subotica",
        "Küchenzeile des Studio Deluxe",
        "Sitzbereich und Fernseher im Studio Deluxe",
        "Bad des Studio Deluxe mit Dusche",
        "Detail des Studio Deluxe in Tontönen",
      ],
    },
    "suit-king-size-balkon": {
      name: "Suit King Size mit Balkon",
      summary:
        "Apartment in Subotica mit Kingsize-Bett und Balkon, für bis zu 4 Gäste.",
      description:
        "Kingsize-Bett und Schlafsofa. Es gibt einen Balkon, eine Küche, einen Schreibtisch, einen Safe und eine Waschmaschine.",
      imageAlts: [
        "Schlafzimmer der King-Size-Suite mit Kingsize-Bett in Subotica",
        "Balkon der King-Size-Suite mit Sitzplatz",
        "Wohnzimmer der King-Size-Suite mit Küche",
        "Bad der King-Size-Suite mit Dusche",
        "Detail der King-Size-Suite in Olivtönen",
      ],
    },
  },
  amenities: {
    fridge: "Kühlschrank",
    stove: "Herd",
    microwave: "Mikrowelle",
    kettle: "Wasserkocher",
    "coffee-machine": "Kaffeemaschine",
    cookware: "Kochgeschirr",
    dishes: "Geschirr und Besteck",
    shower: "Dusche",
    hairdryer: "Föhn",
    towels: "Handtücher",
    toiletries: "Toilettenartikel",
    "washing-machine": "Waschmaschine",
    "air-conditioning": "Klimaanlage",
    tv: "Fernseher",
    wifi: "Kostenloses WLAN",
    wardrobe: "Kleiderschrank",
    desk: "Schreibtisch",
    safe: "Safe",
    balcony: "Balkon",
    heating: "Heizung",
    parking: "Parkplatz",
    iron: "Bügeleisen",
    "bed-linen": "Bettwäsche",
    "self-check-in": "Self-Check-in",
  },
  bedTypes: {
    king: {
      one: "Kingsize-Bett",
      few: "Kingsize-Betten",
      other: "Kingsize-Betten",
    },
    double: {
      one: "Doppelbett",
      few: "Doppelbetten",
      other: "Doppelbetten",
    },
    single: {
      one: "Einzelbett",
      few: "Einzelbetten",
      other: "Einzelbetten",
    },
    "sofa-bed": {
      one: "Schlafsofa",
      few: "Schlafsofas",
      other: "Schlafsofas",
    },
  },
};

export default apartments;
