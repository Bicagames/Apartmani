import type { ApartmentImage } from "../types";

export type GalleryImage = ApartmentImage & {
  alt: string;
};

/**
 * Curated stills from the Family Resort photo set.
 * Distinct rooms only: near-duplicates, the gym, and the bikes stay out.
 */
export const galleryImages: readonly GalleryImage[] = [
  {
    src: "/images/hero.webp",
    width: 2560,
    height: 1441,
    color: "#84786f",
    alt: "Lux living room with a large sofa, daylight, and a view of the trees",
  },
  {
    src: "/images/family-resort/living-styled.webp",
    width: 2560,
    height: 1615,
    color: "#75604f",
    alt: "Styled living room with a grey sofa, yellow rug, and gallery wall",
  },
  {
    src: "/images/family-resort/living-bright.webp",
    width: 2560,
    height: 1441,
    color: "#7b6e63",
    alt: "Bright living room with a corner sofa, armchairs, and a desk by the window",
  },
  {
    src: "/images/family-resort/living-lounge.webp",
    width: 2560,
    height: 1441,
    color: "#9e8e82",
    alt: "Open-plan lounge with a dark corner sofa, a leather lounge chair, and a dining table",
  },
  {
    src: "/images/family-resort/living-oak.webp",
    width: 2560,
    height: 1440,
    color: "#8e8378",
    alt: "Living room with an oak TV wall and a leather lounge chair",
  },
  {
    src: "/images/family-resort/dining.webp",
    width: 1441,
    height: 2560,
    color: "#806a56",
    alt: "Dining table set beneath pendant lights",
  },
  {
    src: "/images/family-resort/dining-white.webp",
    width: 2560,
    height: 1441,
    color: "#7a6d64",
    alt: "Dining area with a white table, pendant lights, and a breakfast bar",
  },
  {
    src: "/images/family-resort/kitchen.webp",
    width: 2560,
    height: 1441,
    color: "#847d74",
    alt: "Fully equipped kitchen with a long counter and bar stools",
  },
  {
    src: "/images/family-resort/studio.webp",
    width: 2560,
    height: 1440,
    color: "#93826e",
    alt: "Studio with a kitchen, dining table, and sofa",
  },
  {
    src: "/images/family-resort/bedroom-styled.webp",
    width: 2560,
    height: 1489,
    color: "#90766a",
    alt: "Bedroom with a grey upholstered bed and warm bedside light",
  },
  {
    src: "/images/family-resort/bedroom-wood.webp",
    width: 2560,
    height: 1441,
    color: "#7d6656",
    alt: "Bedroom with a wood-panelled wall and a made bed",
  },
  {
    src: "/images/family-resort/bedroom-clean.webp",
    width: 2560,
    height: 1441,
    color: "#918274",
    alt: "Neatly made bedroom with folded towels on the bed",
  },
  {
    src: "/images/family-resort/bathroom-compact.webp",
    width: 1441,
    height: 2560,
    color: "#8d775d",
    alt: "Bathroom with a glass shower screen, a wall-hung toilet, and a vanity",
  },
  {
    src: "/images/family-resort/terrace.webp",
    width: 2560,
    height: 1441,
    color: "#646758",
    alt: "Wide terrace with outdoor seating and trees beyond the railing",
  },
  {
    src: "/images/family-resort/terrace-dining.webp",
    width: 2560,
    height: 1441,
    color: "#818383",
    alt: "Terrace with a long dining table looking over the garden",
  },
  {
    src: "/images/family-resort/balcony-long.webp",
    width: 2560,
    height: 1441,
    color: "#73787e",
    alt: "Long balcony with a table and chairs along the railing, overlooking the trees",
  },
  {
    src: "/images/family-resort/living-navy.webp",
    width: 2560,
    height: 1441,
    color: "#757270",
    alt: "Living room with a navy sofa, a low table, and sheer curtains",
  },
  {
    src: "/images/family-resort/dining-long.webp",
    width: 2560,
    height: 1441,
    color: "#7f6d5d",
    alt: "Dining room with a long table set beside tall windows",
  },
  {
    src: "/images/family-resort/kitchen-dark.webp",
    width: 2560,
    height: 1441,
    color: "#796c63",
    alt: "Kitchen and dining room with dark cabinets and a wood table",
  },
  {
    src: "/images/family-resort/kitchen-wood.webp",
    width: 2560,
    height: 1614,
    color: "#786961",
    alt: "Kitchen with a wood counter, white cabinets, and a breakfast bar",
  },
  {
    src: "/images/family-resort/bedroom-botanical.webp",
    width: 2560,
    height: 1499,
    color: "#876c58",
    alt: "Bedroom with a wood headboard, mustard cushions, and a golden leaf-print wall",
  },
  {
    src: "/images/family-resort/bathroom-vanity.webp",
    width: 2560,
    height: 1707,
    color: "#877e78",
    alt: "Bathroom with a black-framed shower and a wood vanity",
  },
  {
    src: "/images/family-resort/bathtub.webp",
    width: 1441,
    height: 2560,
    color: "#9c8f81",
    alt: "Bathroom with a bathtub, a vessel sink, and a round mirror",
  },
  {
    src: "/images/family-resort/balcony-lounge.webp",
    width: 2560,
    height: 1441,
    color: "#717468",
    alt: "Balcony lounge with a sofa and a view into the trees",
  },
  {
    src: "/images/family-resort/balcony-chair.webp",
    width: 2560,
    height: 1441,
    color: "#7d7a78",
    alt: "Balcony with a small table, a rocking chair, and trees beyond",
  },
];
