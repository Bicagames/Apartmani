export type HeadingLevel = 1 | 2 | 3 | 4;

/** Maps a numeric outline level to its element, so components can be level-agnostic. */
export const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
} as const satisfies Record<HeadingLevel, string>;
