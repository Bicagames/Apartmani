type JsonLdProps = {
  data: object | unknown;
};

/**
 * Server-only JSON-LD script. Escapes `<` so string values cannot break out of
 * the script tag (see Next.js JSON-LD guide). Do not use `next/script`.
 */
export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);
