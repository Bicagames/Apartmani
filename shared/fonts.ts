import { Cormorant_Garamond, Manrope } from "next/font/google";

// Only 600 / roman is used (headings and the wordmark). Extra weights and
// italic are preloaded anyway, and Next preloads the first configured weight,
// so 500 and italic were competing with the hero image while 600 loaded later.
// Cyrillic is included so Russian headings and body use the same families.
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: "600",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const fontVariables = `${cormorant.variable} ${manrope.variable}`;
