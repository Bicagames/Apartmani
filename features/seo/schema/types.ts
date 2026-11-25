/** Minimal JSON-LD shapes. Built by spreading only defined fields — never null. */

export type JsonLdNode = {
  "@type": string;
  [key: string]: JsonLdValue;
};

export type JsonLdValue =
  | string
  | number
  | boolean
  | JsonLdNode
  | JsonLdValue[];
