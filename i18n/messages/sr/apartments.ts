import type {
  AmenityGroup,
  AmenityId,
  ApartmentSlug,
  BedType,
} from "@/features/apartments/types";
import type { PluralForms } from "../../plural";

/*
 * Explicit types make the required keys part of the contract: a missing slug,
 * amenity id or bed type fails typecheck. Strings stay widened to `string`
 * (no `as const`), so other locales can satisfy `Messages`.
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
    eyebrow: "Apartmani",
    title: "Stanovi",
    lead: "Potpuno opremljeni luksuzni apartmani za duži boravak.",
  },
  card: {
    areaUnit: "m²",
    guests: { one: "gost", few: "gosta", other: "gostiju" },
    from: "od",
    perNight: "po noći",
    viewDetails: "Pogledaj detalje",
  },
  detail: {
    descriptionTitle: "O apartmanu",
    factsTitle: "Osnovni podaci",
    bedsTitle: "Ležajevi",
    bedrooms: {
      one: "spavaća soba",
      few: "spavaće sobe",
      other: "spavaćih soba",
    },
    studio: "Garsonjera",
    amenitiesTitle: "Opremljenost",
    groups: {
      kitchen: "Kuhinja",
      bathroom: "Kupatilo",
      room: "Soba",
      other: "Ostalo",
    },
    priceTitle: "Cena",
    priceNote: "Pišite nam za cenu na duži period.",
    cta: "Rezervacija",
    close: "Zatvori",
    previousPhoto: "Prethodna fotografija",
    nextPhoto: "Sledeća fotografija",
    photoCounter: "Fotografija {current} od {total}",
    galleryLabel: "Galerija fotografija apartmana",
    breadcrumb: {
      label: "Putanja",
      home: "Početna",
      apartments: "Apartmani",
    },
  },
  items: {
    "suit-deluxe-1": {
      name: "Suit Deluxe 1",
      summary:
        "Apartman u Subotici sa bračnim krevetom i kaučem na razvlačenje, do 4 gosta.",
      description:
        "Jedna spavaća soba sa bračnim krevetom. U dnevnom boravku je kauč na razvlačenje i kuhinja sa šporetom, frižiderom, mikrotalasnom i posuđem. Tuš kabina, klima, televizor i Wi-Fi.",
      imageAlts: [
        "Dnevni boravak suita Deluxe 1 u Subotici",
        "Spavaća zona suita Deluxe 1 sa bračnim krevetom",
        "Kuhinja i trpezarijski kutak suita Deluxe 1",
        "Kupatilo suita Deluxe 1 sa tuš kabinom",
        "Detalj enterijera suita Deluxe 1 u peščanim bojama",
      ],
    },
    "suit-deluxe-2": {
      name: "Suit Deluxe 2",
      summary: "Apartman u Subotici sa dve spavaće sobe, do 5 gostiju.",
      description:
        "U jednoj sobi je bračni krevet, u drugoj dva pojedinačna. U dnevnom boravku je kauč na razvlačenje. Ima kuhinju, radni sto i mašinu za veš.",
      imageAlts: [
        "Dnevni boravak suita Deluxe 2 u Subotici",
        "Prva spavaća soba suita Deluxe 2 sa bračnim krevetom",
        "Druga spavaća soba suita Deluxe 2 sa dva odvojena kreveta",
        "Kuhinja suita Deluxe 2 sa trpezarijskim stolom",
        "Kupatilo suita Deluxe 2 sa mašinom za veš",
      ],
    },
    "studio-deluxe": {
      name: "Studio Deluxe",
      summary: "Studio u Subotici sa bračnim krevetom, za dvoje.",
      description:
        "Garsonjera sa bračnim krevetom, kuhinjskim kutkom i tuš kabinom. Klima, televizor i Wi-Fi.",
      imageAlts: [
        "Studio Deluxe sa bračnim krevetom u Subotici",
        "Kuhinjski kutak studija Deluxe",
        "Prostor za sedenje i televizor u studiju Deluxe",
        "Kupatilo studija Deluxe sa tuš kabinom",
        "Detalj enterijera studija Deluxe u bojama gline",
      ],
    },
    "suit-king-size-balkon": {
      name: "Suit King Size sa balkonom",
      summary:
        "Apartman u Subotici sa king size krevetom i balkonom, do 4 gosta.",
      description:
        "King size krevet i kauč na razvlačenje. Ima balkon, kuhinju, radni sto, sef i mašinu za veš.",
      imageAlts: [
        "Spavaća soba suita King Size sa king size krevetom u Subotici",
        "Balkon suita King Size sa mestom za sedenje",
        "Dnevni boravak suita King Size sa kuhinjom",
        "Kupatilo suita King Size sa tuš kabinom",
        "Detalj enterijera suita King Size u maslinastim bojama",
      ],
    },
  },
  amenities: {
    fridge: "Frižider",
    stove: "Šporet",
    microwave: "Mikrotalasna rerna",
    kettle: "Kuvalo za vodu",
    "coffee-machine": "Aparat za kafu",
    cookware: "Posuđe za kuvanje",
    dishes: "Tanjiri i escajg",
    shower: "Tuš kabina",
    hairdryer: "Fen za kosu",
    towels: "Peškiri",
    toiletries: "Toaletne potrepštine",
    "washing-machine": "Mašina za veš",
    "air-conditioning": "Klima uređaj",
    tv: "Televizor",
    wifi: "Besplatan Wi-Fi",
    wardrobe: "Plakar",
    desk: "Radni sto",
    safe: "Sef",
    balcony: "Balkon",
    heating: "Grejanje",
    parking: "Parking",
    iron: "Pegla",
    "bed-linen": "Posteljina",
    "self-check-in": "Samostalna prijava (self check-in)",
  },
  bedTypes: {
    king: {
      one: "bračni krevet king size",
      few: "bračna kreveta king size",
      other: "bračnih kreveta king size",
    },
    double: {
      one: "bračni krevet",
      few: "bračna kreveta",
      other: "bračnih kreveta",
    },
    single: {
      one: "pojedinačni krevet",
      few: "pojedinačna kreveta",
      other: "pojedinačnih kreveta",
    },
    "sofa-bed": {
      one: "kauč na razvlačenje",
      few: "kauča na razvlačenje",
      other: "kauča na razvlačenje",
    },
  },
};

export default apartments;
