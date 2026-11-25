import type {
  AmenityGroup,
  AmenityId,
  ApartmentSlug,
  BedType,
} from "@/features/apartments/types";
import type { PluralForms } from "../../plural";

/*
 * English uses one/other. `few` matches `other` because this locale never
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
    title: "The homes",
    lead: "Fully equipped lux apartments for a long-term stay.",
  },
  card: {
    areaUnit: "m²",
    guests: { one: "guest", few: "guests", other: "guests" },
    from: "from",
    perNight: "per night",
    viewDetails: "View details",
  },
  detail: {
    descriptionTitle: "About the apartment",
    factsTitle: "At a glance",
    bedsTitle: "Beds",
    bedrooms: {
      one: "bedroom",
      few: "bedrooms",
      other: "bedrooms",
    },
    studio: "Studio",
    amenitiesTitle: "Amenities",
    groups: {
      kitchen: "Kitchen",
      bathroom: "Bathroom",
      room: "Room",
      other: "Other",
    },
    priceTitle: "Price",
    priceNote: "Write to us for the long-term rate.",
    cta: "Reservation",
    close: "Close",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    photoCounter: "Photo {current} of {total}",
    galleryLabel: "Apartment photo gallery",
    breadcrumb: {
      label: "Breadcrumb",
      home: "Home",
      apartments: "Apartments",
    },
  },
  items: {
    "suit-deluxe-1": {
      name: "Suit Deluxe 1",
      summary:
        "Apartment in Subotica with a double bed and a sofa bed, for up to 4 guests.",
      description:
        "One bedroom with a double bed. The living room has a sofa bed and a kitchen with a stove, a fridge, a microwave and cookware. Shower, air conditioning, television and Wi-Fi.",
      imageAlts: [
        "Living room of Suit Deluxe 1 in Subotica",
        "Sleeping area of Suit Deluxe 1 with a double bed",
        "Kitchen and dining corner of Suit Deluxe 1",
        "Bathroom of Suit Deluxe 1 with a shower",
        "Interior detail of Suit Deluxe 1 in sandy colours",
      ],
    },
    "suit-deluxe-2": {
      name: "Suit Deluxe 2",
      summary: "Apartment in Subotica with two bedrooms, for up to 5 guests.",
      description:
        "One room has a double bed, the other has two single beds. The living room has a sofa bed. There is a kitchen, a desk and a washing machine.",
      imageAlts: [
        "Living room of Suit Deluxe 2 in Subotica",
        "First bedroom of Suit Deluxe 2 with a double bed",
        "Second bedroom of Suit Deluxe 2 with two single beds",
        "Kitchen of Suit Deluxe 2 with a dining table",
        "Bathroom of Suit Deluxe 2 with a washing machine",
      ],
    },
    "studio-deluxe": {
      name: "Studio Deluxe",
      summary: "Studio in Subotica with a double bed, for two guests.",
      description:
        "A studio with a double bed, a kitchenette and a shower. Air conditioning, television and Wi-Fi.",
      imageAlts: [
        "Studio Deluxe with a double bed in Subotica",
        "Kitchenette of Studio Deluxe",
        "Seating area and television in Studio Deluxe",
        "Bathroom of Studio Deluxe with a shower",
        "Interior detail of Studio Deluxe in clay colours",
      ],
    },
    "suit-king-size-balkon": {
      name: "Suit King Size with balcony",
      summary:
        "Apartment in Subotica with a king-size bed and a balcony, for up to 4 guests.",
      description:
        "A king-size bed and a sofa bed. There is a balcony, a kitchen, a desk, a safe and a washing machine.",
      imageAlts: [
        "Bedroom of the King Size suite with a king-size bed in Subotica",
        "Balcony of the King Size suite with a place to sit",
        "Living room of the King Size suite with a kitchen",
        "Bathroom of the King Size suite with a shower",
        "Interior detail of the King Size suite in olive tones",
      ],
    },
  },
  amenities: {
    fridge: "Refrigerator",
    stove: "Stove",
    microwave: "Microwave",
    kettle: "Kettle",
    "coffee-machine": "Coffee machine",
    cookware: "Cookware",
    dishes: "Plates and cutlery",
    shower: "Shower",
    hairdryer: "Hairdryer",
    towels: "Towels",
    toiletries: "Toiletries",
    "washing-machine": "Washing machine",
    "air-conditioning": "Air conditioning",
    tv: "Television",
    wifi: "Free Wi-Fi",
    wardrobe: "Wardrobe",
    desk: "Desk",
    safe: "Safe",
    balcony: "Balcony",
    heating: "Heating",
    parking: "Parking",
    iron: "Iron",
    "bed-linen": "Bed linen",
    "self-check-in": "Self check-in",
  },
  bedTypes: {
    king: {
      one: "king-size bed",
      few: "king-size beds",
      other: "king-size beds",
    },
    double: {
      one: "double bed",
      few: "double beds",
      other: "double beds",
    },
    single: {
      one: "single bed",
      few: "single beds",
      other: "single beds",
    },
    "sofa-bed": {
      one: "sofa bed",
      few: "sofa beds",
      other: "sofa beds",
    },
  },
};

export default apartments;
