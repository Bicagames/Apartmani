import type { Apartment, ApartmentImage, ApartmentSlug } from "../types";

/*
 * Raw apartment data. Read it only through `get-apartments.ts`; that module is
 * the single swap point for a future Supabase source (plan section 3).
 * Every value marked PLACEHOLDER comes from the owner later.
 */

// PLACEHOLDER: generated stand-in images (1800x1200). Replace with real photos:
// drop files under public/images/ and update src, width, height and color.
function placeholderImages(
  slug: ApartmentSlug,
  colors: readonly [string, string, string, string, string],
): ApartmentImage[] {
  return colors.map((color, index) => ({
    src: `/images/placeholders/apartments/${slug}/${String(index + 1).padStart(2, "0")}.jpg`,
    width: 1800,
    height: 1200,
    color,
  }));
}

export const apartments: readonly Apartment[] = [
  {
    slug: "suit-deluxe-1",
    order: 1,
    areaM2: 48, // PLACEHOLDER: real size from the owner
    maxGuests: 4, // PLACEHOLDER
    bedrooms: 1, // PLACEHOLDER
    beds: [
      { type: "double", count: 1 }, // PLACEHOLDER
      { type: "sofa-bed", count: 1 }, // PLACEHOLDER
    ],
    // PLACEHOLDER: amenities to be confirmed by the owner
    amenities: {
      kitchen: [
        "fridge",
        "stove",
        "microwave",
        "kettle",
        "coffee-machine",
        "cookware",
        "dishes",
      ],
      bathroom: ["shower", "hairdryer", "towels", "toiletries"],
      room: ["air-conditioning", "tv", "wifi", "wardrobe", "heating"],
      other: ["parking", "iron", "bed-linen", "self-check-in"],
    },
    price: { fromEur: 70, fromRsd: 8200 }, // PLACEHOLDER
    images: placeholderImages("suit-deluxe-1", [
      "#eddec7",
      "#e2cfb3",
      "#e3d0b2",
      "#e2d0b7",
      "#e9d8c0",
    ]),
  },
  {
    slug: "suit-deluxe-2",
    order: 2,
    areaM2: 56, // PLACEHOLDER: larger than Deluxe 1
    maxGuests: 5, // PLACEHOLDER
    bedrooms: 2, // PLACEHOLDER
    beds: [
      { type: "double", count: 1 }, // PLACEHOLDER
      { type: "single", count: 2 }, // PLACEHOLDER
      { type: "sofa-bed", count: 1 }, // PLACEHOLDER
    ],
    // PLACEHOLDER: amenities to be confirmed by the owner
    amenities: {
      kitchen: [
        "fridge",
        "stove",
        "microwave",
        "kettle",
        "coffee-machine",
        "cookware",
        "dishes",
      ],
      bathroom: ["shower", "hairdryer", "towels", "toiletries", "washing-machine"],
      room: ["air-conditioning", "tv", "wifi", "wardrobe", "desk", "heating"],
      other: ["parking", "iron", "bed-linen", "self-check-in"],
    },
    price: { fromEur: 85, fromRsd: 9950 }, // PLACEHOLDER
    images: placeholderImages("suit-deluxe-2", [
      "#e1c8a5",
      "#d4b891",
      "#d5b98e",
      "#d4ba96",
      "#dcc39e",
    ]),
  },
  {
    slug: "studio-deluxe",
    order: 3,
    areaM2: 28, // PLACEHOLDER: smallest unit
    maxGuests: 2, // PLACEHOLDER
    bedrooms: 0, // PLACEHOLDER: open-plan studio
    beds: [{ type: "double", count: 1 }], // PLACEHOLDER
    // PLACEHOLDER: amenities to be confirmed by the owner
    amenities: {
      kitchen: ["fridge", "stove", "microwave", "kettle", "coffee-machine", "dishes"],
      bathroom: ["shower", "hairdryer", "towels", "toiletries"],
      room: ["air-conditioning", "tv", "wifi", "wardrobe", "heating"],
      other: ["parking", "bed-linen", "self-check-in"],
    },
    price: { fromEur: 50, fromRsd: 5850 }, // PLACEHOLDER
    images: placeholderImages("studio-deluxe", [
      "#deb99f",
      "#cfa68a",
      "#d0a688",
      "#cfa98e",
      "#d8b297",
    ]),
  },
  {
    slug: "suit-king-size-balkon",
    order: 4,
    areaM2: 64, // PLACEHOLDER: largest unit
    maxGuests: 4, // PLACEHOLDER
    bedrooms: 1, // PLACEHOLDER
    beds: [
      { type: "king", count: 1 }, // PLACEHOLDER
      { type: "sofa-bed", count: 1 }, // PLACEHOLDER
    ],
    // PLACEHOLDER: amenities to be confirmed by the owner
    amenities: {
      kitchen: [
        "fridge",
        "stove",
        "microwave",
        "kettle",
        "coffee-machine",
        "cookware",
        "dishes",
      ],
      bathroom: ["shower", "hairdryer", "towels", "toiletries", "washing-machine"],
      room: [
        "air-conditioning",
        "tv",
        "wifi",
        "wardrobe",
        "desk",
        "safe",
        "balcony",
        "heating",
      ],
      other: ["parking", "iron", "bed-linen", "self-check-in"],
    },
    price: { fromEur: 110, fromRsd: 12900 }, // PLACEHOLDER
    images: placeholderImages("suit-king-size-balkon", [
      "#c8ceb3",
      "#b5bc9f",
      "#b5bd9e",
      "#b7bea3",
      "#c1c8ac",
    ]),
  },
];
