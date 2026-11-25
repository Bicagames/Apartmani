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
    src: "/images/hero.jpg",
    width: 4000,
    height: 2252,
    color: "#84786f",
    alt: "Lux living room with a large sofa, daylight, and a view of the trees",
  },
  {
    src: "/images/family-resort/living-styled.jpg",
    width: 8135,
    height: 5132,
    color: "#75604f",
    alt: "Styled living room with a grey sofa, yellow rug, and gallery wall",
  },
  {
    src: "/images/family-resort/living-daylight.jpg",
    width: 840,
    height: 1120,
    color: "#8d897e",
    alt: "Bright open-plan living and dining room with sheer curtains",
  },
  {
    src: "/images/family-resort/living-fireplace.jpg",
    width: 1080,
    height: 608,
    color: "#736b63",
    alt: "Living room with a long fireplace, dark sofa, and wood floor",
  },
  {
    src: "/images/family-resort/living-sun.jpg",
    width: 1080,
    height: 608,
    color: "#81684d",
    alt: "Sunlit living and dining room with a sofa, wood table, and a wall-mounted television",
  },
  {
    src: "/images/family-resort/dining.jpg",
    width: 2252,
    height: 4000,
    color: "#806a56",
    alt: "Dining table set beneath pendant lights",
  },
  {
    src: "/images/family-resort/dining-warm.jpg",
    width: 1600,
    height: 900,
    color: "#847b73",
    alt: "Warm dining area with a round table and upholstered chairs",
  },
  {
    src: "/images/family-resort/kitchen.jpg",
    width: 4000,
    height: 2252,
    color: "#847d74",
    alt: "Fully equipped kitchen with a long counter and bar stools",
  },
  {
    src: "/images/family-resort/studio.jpg",
    width: 4032,
    height: 2268,
    color: "#93826e",
    alt: "Studio with a kitchen, dining table, and sofa",
  },
  {
    src: "/images/family-resort/bedroom-styled.jpg",
    width: 8153,
    height: 4742,
    color: "#90766a",
    alt: "Bedroom with a grey upholstered bed and warm bedside light",
  },
  {
    src: "/images/family-resort/bedroom-wood.jpg",
    width: 4000,
    height: 2252,
    color: "#7d6656",
    alt: "Bedroom with a wood-panelled wall and a made bed",
  },
  {
    src: "/images/family-resort/bedroom-clean.jpg",
    width: 4000,
    height: 2252,
    color: "#918274",
    alt: "Neatly made bedroom with folded towels on the bed",
  },
  {
    src: "/images/family-resort/shower.jpg",
    width: 900,
    height: 1600,
    color: "#927b5a",
    alt: "Walk-in shower with a glass screen and a wall-hung toilet",
  },
  {
    src: "/images/family-resort/terrace.jpg",
    width: 4000,
    height: 2252,
    color: "#646758",
    alt: "Wide terrace with outdoor seating and trees beyond the railing",
  },
  {
    src: "/images/family-resort/terrace-dining.jpg",
    width: 840,
    height: 1120,
    color: "#576368",
    alt: "Covered terrace with a dining table looking onto greenery",
  },
  {
    src: "/images/family-resort/balcony.jpg",
    width: 1080,
    height: 608,
    color: "#7e868a",
    alt: "Balcony with a table and chairs and a view over the trees",
  },
  {
    src: "/images/family-resort/living-navy.jpg",
    width: 4000,
    height: 2252,
    color: "#757270",
    alt: "Living room with a navy sofa, a low table, and sheer curtains",
  },
  {
    src: "/images/family-resort/dining-long.jpg",
    width: 4000,
    height: 2252,
    color: "#7f6d5d",
    alt: "Dining room with a long table set beside tall windows",
  },
  {
    src: "/images/family-resort/kitchen-dark.jpg",
    width: 4000,
    height: 2252,
    color: "#796c63",
    alt: "Kitchen and dining room with dark cabinets and a wood table",
  },
  {
    src: "/images/family-resort/kitchen-wood.jpg",
    width: 8021,
    height: 5056,
    color: "#786961",
    alt: "Kitchen with a wood counter, white cabinets, and a breakfast bar",
  },
  {
    src: "/images/family-resort/bedroom-botanical.jpg",
    width: 1080,
    height: 608,
    color: "#8b7561",
    alt: "Bedroom with a tufted headboard and a botanical wall",
  },
  {
    src: "/images/family-resort/bathroom-vanity.jpg",
    width: 8256,
    height: 5504,
    color: "#877e78",
    alt: "Bathroom with a black-framed shower and a wood vanity",
  },
  {
    src: "/images/family-resort/bathtub.jpg",
    width: 2252,
    height: 4000,
    color: "#9c8f81",
    alt: "Bathroom with a bathtub, a vessel sink, and a round mirror",
  },
  {
    src: "/images/family-resort/balcony-lounge.jpg",
    width: 4000,
    height: 2252,
    color: "#717468",
    alt: "Balcony lounge with a sofa and a view into the trees",
  },
  {
    src: "/images/family-resort/balcony-chair.jpg",
    width: 4000,
    height: 2252,
    color: "#7d7a78",
    alt: "Balcony with a small table, a rocking chair, and trees beyond",
  },
];
