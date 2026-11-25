import type { AmenityId } from "@/features/apartments/types";

/*
 * Structural facts about the property. Everything translatable (labels,
 * blurbs, rule values) lives in i18n/messages/<lang>/place-info.ts, keyed by
 * the ids below. The `satisfies`/`as const` pairs make the messages require
 * exactly these keys: a new id without a text fails typecheck.
 */

export const highlightIds = [
  "apartments",
  "area",
  "guests",
  "centerMinutes",
] as const;

export type HighlightId = (typeof highlightIds)[number];

/*
 * PLACEHOLDER: every number below is a guess until the owner confirms it.
 * `area` is the total living area of the four apartments, `guests` the
 * maximum for the whole property. `centerMinutes` is the walk to the centre.
 * The building is in Gat, about 900 m from the Gradska kuća, so this is a
 * walk. Confirm the minute count with the owner.
 */
export const highlightValues: Record<HighlightId, number> = {
  apartments: 4,
  area: 180,
  guests: 14,
  centerMinutes: 10,
};

/*
 * PLACEHOLDER: property-level amenities, the owner confirms the final list.
 * They must be ids that exist for apartments, so labels and icons are shared.
 * Twelve items fill the 2, 3 and 4 column grids without a ragged last row (a
 * different count still works, the last row is just shorter).
 */
export const propertyAmenityIds = [
  "parking",
  "wifi",
  "air-conditioning",
  "heating",
  "tv",
  "self-check-in",
  "bed-linen",
  "towels",
  "toiletries",
  "hairdryer",
  "washing-machine",
  "iron",
] as const satisfies readonly AmenityId[];

/*
 * PLACEHOLDER: verify facts and add distances.
 * Names are final (widely used forms: Palić, Ludaš); the blurbs in the
 * messages are drafts and carry no distances until the owner confirms them.
 */
export const nearbyIds = [
  "city-hall",
  "synagogue",
  "freedom-square",
  "palic-lake",
  "palic-zoo",
  "ludas-lake",
] as const;

export type NearbyId = (typeof nearbyIds)[number];

/* PLACEHOLDER: the owner confirms which rules apply (values are in messages). */
export const houseRuleIds = [
  "checkIn",
  "checkOut",
  "pets",
  "smoking",
  "quietHours",
] as const;

export type HouseRuleId = (typeof houseRuleIds)[number];
