/*
 * DEV-ONLY living style guide. It is intentionally NOT localised (English
 * labels, hard-coded on purpose) because it never ships: outside
 * `next dev` it returns a 404 and it is `noindex` and absent from the sitemap.
 * The hex values below mirror the tokens in app/globals.css (display only; the
 * swatches themselves read the CSS variables).
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { Button, ButtonLink, type ButtonVariant } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Reveal } from "@/shared/ui/reveal";
import { Section, type SectionTone } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

type Swatch = {
  name: string;
  /** Hex for palette colours, palette name for semantic aliases. */
  value: string;
  cssVar: string;
  role: string;
};

const palette: Swatch[] = [
  { name: "cream-50", value: "#FDFBF7", cssVar: "--color-cream-50", role: "Page background" },
  { name: "cream-100", value: "#F7F1E8", cssVar: "--color-cream-100", role: "Alternate section, card surface" },
  { name: "cream-200", value: "#EDE3D3", cssVar: "--color-cream-200", role: "Borders, dividers, chips" },
  { name: "sand-300", value: "#DCCBB2", cssVar: "--color-sand-300", role: "Strong borders, placeholders" },
  { name: "clay-500", value: "#A98562", cssVar: "--color-clay-500", role: "Decorative accent, focus ring (never text)" },
  { name: "clay-700", value: "#7A5C3E", cssVar: "--color-clay-700", role: "Accent text and links" },
  { name: "moss-700", value: "#3B4A40", cssVar: "--color-moss-700", role: "Brand, primary buttons" },
  { name: "moss-800", value: "#2C382F", cssVar: "--color-moss-800", role: "Primary hover" },
  { name: "moss-900", value: "#1F2822", cssVar: "--color-moss-900", role: "Hero stage, footer, dark sections" },
  { name: "ink-900", value: "#26231F", cssVar: "--color-ink-900", role: "Body and heading text" },
  { name: "stone-500", value: "#68635B", cssVar: "--color-stone-500", role: "Muted text on light" },
  { name: "stone-300", value: "#B9B4AB", cssVar: "--color-stone-300", role: "Muted text on dark, hairlines" },
  { name: "white", value: "#FFFFFF", cssVar: "--color-white", role: "Text on dark and over photos" },
];

const semantic: Swatch[] = [
  { name: "bg", value: "cream-50", cssVar: "--color-bg", role: "Page background" },
  { name: "bg-alt", value: "cream-100", cssVar: "--color-bg-alt", role: "Alternate section" },
  { name: "bg-dark", value: "moss-900", cssVar: "--color-bg-dark", role: "Dark section, footer" },
  { name: "surface", value: "cream-100", cssVar: "--color-surface", role: "Card surface" },
  { name: "text", value: "ink-900", cssVar: "--color-text", role: "Body text" },
  { name: "text-muted", value: "stone-500", cssVar: "--color-text-muted", role: "Secondary text" },
  { name: "brand", value: "moss-700", cssVar: "--color-brand", role: "Primary actions" },
  { name: "brand-hover", value: "moss-800", cssVar: "--color-brand-hover", role: "Primary hover" },
  { name: "accent", value: "clay-700", cssVar: "--color-accent", role: "Accent text, links" },
  { name: "accent-soft", value: "clay-500", cssVar: "--color-accent-soft", role: "Icons, focus ring" },
  { name: "border", value: "cream-200", cssVar: "--color-border", role: "Dividers, card borders" },
  { name: "border-strong", value: "sand-300", cssVar: "--color-border-strong", role: "Emphasised borders" },
  { name: "on-dark", value: "white", cssVar: "--color-on-dark", role: "Text on dark" },
  { name: "on-dark-muted", value: "stone-300", cssVar: "--color-on-dark-muted", role: "Secondary text on dark" },
];

// Literal class strings so Tailwind can detect them.
const typeScale: { token: string; spec: string; className: string; sample: string }[] = [
  { token: "text-display", spec: "44 to 112px, uppercase, hero name only", className: "font-display text-display uppercase", sample: "Family" },
  { token: "text-h1", spec: "40 to 72px", className: "font-display text-h1", sample: "A lux home in Subotica" },
  { token: "text-h2", spec: "32 to 56px", className: "font-display text-h2", sample: "The apartments" },
  { token: "text-h3", spec: "24 to 32px", className: "font-display text-h3", sample: "One bedroom" },
  { token: "text-lead", spec: "18 to 22px", className: "text-lead", sample: "Fully equipped lux apartments for a long-term stay." },
  { token: "text-body", spec: "16px", className: "text-body", sample: "Each apartment is fully equipped and kept very clean." },
  { token: "text-small", spec: "14px", className: "text-small", sample: "35 to 220 square metres" },
  { token: "eyebrow", spec: "12px, uppercase, tracking 0.22em", className: "eyebrow", sample: "Subotica" },
];

const latinSpecimen = "Family Resort — lux long-term apartments";

const radii: { token: string; className: string }[] = [
  { token: "rounded-sm", className: "rounded-sm" },
  { token: "rounded-md", className: "rounded-md" },
  { token: "rounded-lg", className: "rounded-lg" },
  { token: "rounded-pill", className: "rounded-pill" },
];

const shadows: { token: string; className: string }[] = [
  { token: "shadow-sm", className: "shadow-sm" },
  { token: "shadow-md", className: "shadow-md" },
  { token: "shadow-lg", className: "shadow-lg" },
];

const spacing: { token: string; className: string }[] = [
  { token: "1 (4px)", className: "w-1" },
  { token: "2 (8px)", className: "w-2" },
  { token: "4 (16px)", className: "w-4" },
  { token: "6 (24px)", className: "w-6" },
  { token: "8 (32px)", className: "w-8" },
  { token: "12 (48px)", className: "w-12" },
  { token: "16 (64px)", className: "w-16" },
];

const sectionTones: { tone: SectionTone; label: string }[] = [
  { tone: "default", label: "default: bg-bg" },
  { tone: "alt", label: "alt: bg-bg-alt" },
  { tone: "dark", label: "dark: bg-bg-dark + text-on-dark" },
];

const lightButtons: ButtonVariant[] = ["primary", "secondary"];
const darkButtons: ButtonVariant[] = ["on-dark", "on-dark-outline"];

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.name} className="min-w-0">
          <div
            className="h-20 rounded-md border border-border-strong"
            style={{ backgroundColor: `var(${item.cssVar})` }}
          />
          <p className="mt-2 text-small break-words">{item.name}</p>
          <p className="text-small text-text-muted break-words">{item.value}</p>
          <p className="text-small text-text-muted break-words">{item.role}</p>
        </li>
      ))}
    </ul>
  );
}

function ButtonRow({ variants }: { variants: ButtonVariant[] }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      {variants.map((variant) => (
        <ButtonLink key={variant} href="/en" variant={variant}>
          {variant}
        </ButtonLink>
      ))}
      {variants.map((variant) => (
        <ButtonLink key={`${variant}-icon`} href="tel:+381000000" variant={variant}>
          <Phone aria-hidden="true" />
          Reservation
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
      ))}
      {variants.map((variant) => (
        <Button key={`${variant}-disabled`} variant={variant} disabled>
          disabled
        </Button>
      ))}
    </div>
  );
}

export default function StyleguidePage() {
  // `process.env.NODE_ENV` is inlined at build time, so in `next build` this
  // throws during prerender and the route is emitted as a 404.
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main>
      <Section aria-labelledby="sg-title">
        <Container>
          <SectionHeading
            level="h1"
            id="sg-title"
            eyebrow="Dev only"
            title="Style guide"
            lead="Living reference for the tokens in globals.css and the shared primitives. Not localised, not indexed, 404 in production."
          />
        </Container>
      </Section>

      <Section tone="alt" aria-labelledby="sg-palette">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="sg-palette" eyebrow="Colour" title="Palette" />
          <SwatchGrid items={palette} />
          <h3 className="font-display text-h3">Semantic aliases</h3>
          <SwatchGrid items={semantic} />
        </Container>
      </Section>

      <Section aria-labelledby="sg-type">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="sg-type" eyebrow="Typography" title="Type scale" />
          <ul className="flex flex-col gap-8">
            {typeScale.map((item) => (
              <li key={item.token} className="flex flex-col gap-2 border-b border-border pb-8">
                <p className="text-small text-text-muted">
                  {item.token} · {item.spec}
                </p>
                <p className={`${item.className} break-words`}>{item.sample}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-h3">Serbian diacritics</h3>
            <p className="font-display text-h2 break-words">{latinSpecimen}</p>
            <p className="text-body break-words">{latinSpecimen}</p>
          </div>
        </Container>
      </Section>

      <Section tone="alt" aria-labelledby="sg-buttons">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="sg-buttons" eyebrow="Components" title="Buttons" />
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-h3">On light</h3>
            <ButtonRow variants={lightButtons} />
          </div>
        </Container>
      </Section>
      <Section tone="dark" aria-label="Buttons on dark">
        <Container className="flex flex-col gap-4">
          <h3 className="font-display text-h3">On dark</h3>
          <ButtonRow variants={darkButtons} />
        </Container>
      </Section>

      <Section aria-labelledby="sg-tokens">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="sg-tokens" eyebrow="Tokens" title="Spacing, radius, shadow" />

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-h3">Spacing</h3>
            <ul className="flex flex-col gap-2">
              {spacing.map((item) => (
                <li key={item.token} className="flex items-center gap-4">
                  <span className="w-24 shrink-0 text-small text-text-muted">{item.token}</span>
                  <span className={`${item.className} h-4 bg-brand`} />
                </li>
              ))}
            </ul>
            <p className="text-small text-text-muted">
              --space-gutter and --space-section are fluid: they are the horizontal and vertical padding of every
              Container and Section on this page.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-h3">Radius</h3>
            <ul className="flex flex-wrap gap-6">
              {radii.map((item) => (
                <li key={item.token} className="flex flex-col gap-2">
                  <div className={`${item.className} h-20 w-28 border border-border-strong bg-bg-alt`} />
                  <span className="text-small text-text-muted">{item.token}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-h3">Shadow</h3>
            <ul className="flex flex-wrap gap-6">
              {shadows.map((item) => (
                <li key={item.token} className="flex flex-col gap-3">
                  <div className={`${item.className} h-20 w-28 rounded-md bg-bg`} />
                  <span className="text-small text-text-muted">{item.token}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="alt" aria-labelledby="sg-card">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="sg-card" eyebrow="Components" title="Card sample" />
          <Reveal className="max-w-md">
            <article className="group overflow-hidden rounded-lg border border-border bg-bg shadow-sm transition-shadow duration-(--duration-base) ease-out hover:shadow-md">
              <div className="aspect-4/3 overflow-hidden bg-border-strong">
                {/* Placeholder for the apartment photo (4:3). */}
                <div className="size-full bg-border-strong motion-safe:transition-transform motion-safe:duration-(--duration-base) motion-safe:ease-out motion-safe:group-hover:scale-104" />
              </div>
              <div className="flex flex-col gap-2 p-6">
                <h3 className="font-display text-h3">Suit Deluxe 1</h3>
                <p className="text-text-muted">A short line about the apartment.</p>
                <p className="text-small text-text-muted">00 m² · 0 gosta</p>
                <p className="text-small text-brand">od 00 €</p>
              </div>
            </article>
          </Reveal>
        </Container>
      </Section>

      <Section aria-labelledby="sg-tones">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="sg-tones" eyebrow="Components" title="Section tones" />
          <div className="overflow-hidden rounded-lg border border-border-strong">
            {sectionTones.map(({ tone, label }) => (
              <Section key={tone} tone={tone} aria-label={label} className="py-12">
                <Container size="narrow">
                  <SectionHeading
                    tone={tone}
                    level="h3"
                    eyebrow={label}
                    title="Section title"
                    lead="A short introduction under the title, in a colour that stays readable on this background."
                  />
                </Container>
              </Section>
            ))}
          </div>
          <SectionHeading
            align="center"
            level="h3"
            eyebrow="Centered"
            title="Centered title"
            lead="The same title, aligned to the centre."
          />
        </Container>
      </Section>

      <Section tone="alt" aria-labelledby="sg-container">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="sg-container"
            eyebrow="Layout"
            title="Container"
            lead="Default is max-w-7xl (80rem); narrow is 44rem. Both are centred with the fluid gutter."
          />
          <div className="bg-border-strong">
            <p className="bg-bg px-4 py-3 text-small">default: fills this container</p>
          </div>
          <Container size="narrow" className="bg-border-strong px-0">
            <p className="bg-bg px-4 py-3 text-small">narrow: max 44rem</p>
          </Container>
        </Container>
      </Section>
    </main>
  );
}
