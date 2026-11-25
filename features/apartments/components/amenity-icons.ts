import {
  AirVent,
  Bath,
  BedDouble,
  CircleParking,
  Coffee,
  CookingPot,
  DoorClosed,
  Droplets,
  Flame,
  GlassWater,
  Heater,
  KeyRound,
  Laptop,
  Microwave,
  Refrigerator,
  Shirt,
  ShowerHead,
  Sun,
  Tv,
  Utensils,
  Vault,
  WashingMachine,
  Wifi,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { AmenityId } from "../types";

/*
 * One icon per amenity. Typed as a full Record, so adding an `AmenityId`
 * without an icon fails typecheck. Shared with the place-info section.
 */
export const amenityIcons: Record<AmenityId, LucideIcon> = {
  // Kitchen
  fridge: Refrigerator,
  stove: Flame,
  microwave: Microwave,
  kettle: GlassWater, // lucide has no kettle icon
  "coffee-machine": Coffee,
  cookware: CookingPot,
  dishes: Utensils,
  // Bathroom
  shower: ShowerHead,
  hairdryer: Wind,
  towels: Bath,
  toiletries: Droplets,
  "washing-machine": WashingMachine,
  // Room
  "air-conditioning": AirVent,
  tv: Tv,
  wifi: Wifi,
  wardrobe: DoorClosed,
  desk: Laptop,
  safe: Vault,
  balcony: Sun,
  heating: Heater,
  // Other
  parking: CircleParking,
  iron: Shirt,
  "bed-linen": BedDouble,
  "self-check-in": KeyRound,
};
