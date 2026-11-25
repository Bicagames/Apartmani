/*
 * Structural facts about an apartment. Everything translatable (name, summary,
 * description, image alt text, amenity labels) lives in i18n/messages/<lang>/apartments.ts.
 */

/** Amenity ids grouped by category. Single source of truth for `AmenityId`. */
export const amenityGroups = {
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
} as const;

export type AmenityGroup = keyof typeof amenityGroups;

/** Display order of the groups. */
export const amenityGroupOrder = [
  "kitchen",
  "bathroom",
  "room",
  "other",
] as const satisfies readonly AmenityGroup[];

export type AmenityId = (typeof amenityGroups)[AmenityGroup][number];

/** Every amenity id, flattened in group order. */
export const amenityIds: readonly AmenityId[] = amenityGroupOrder.flatMap(
  (group) => amenityGroups[group],
);

export const bedTypes = ["king", "double", "single", "sofa-bed"] as const;

export type BedType = (typeof bedTypes)[number];

/** Known apartment slugs. Messages are typed as `Record<ApartmentSlug, ...>`. */
export const apartmentSlugs = [
  "suit-deluxe-1",
  "suit-deluxe-2",
  "studio-deluxe",
  "suit-king-size-balkon",
] as const;

export type ApartmentSlug = (typeof apartmentSlugs)[number];

export type ApartmentImage = {
  /** Local path today; becomes a remote Storage URL once data moves to Supabase. */
  src: string;
  width: number;
  height: number;
  /** Average colour as hex (`#rrggbb`), used as the placeholder background. */
  color: string;
};

export type Apartment = {
  slug: string;
  order: number;
  areaM2: number;
  maxGuests: number;
  bedrooms: number;
  beds: { type: BedType; count: number }[];
  amenities: Record<AmenityGroup, AmenityId[]>;
  price: { fromEur: number; fromRsd: number };
  images: ApartmentImage[];
};
