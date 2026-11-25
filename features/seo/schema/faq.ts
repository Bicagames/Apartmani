import type { JsonLdNode } from "./types";

type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Schema.org `FAQPage`. Questions and answers must match the visible FAQ.
 */
export function buildFaqSchema(items: readonly FaqItem[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
