import type { Messages } from "@/i18n/load-messages";
import { Container } from "@/shared/ui/container";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";

type PlaceInfoSectionProps = {
  messages: Messages["placeInfo"];
};

const titleId = "o-objektu-title";

export const PlaceInfoSection = ({ messages }: PlaceInfoSectionProps) => (
  <Section id="o-objektu" tone="alt" aria-labelledby={titleId}>
    <Container className="flex flex-col gap-16 lg:gap-20">
      <SectionHeading
        id={titleId}
        eyebrow={messages.section.eyebrow}
        title={messages.section.title}
        lead={messages.section.lead}
      />
      <Reveal>
        <div>
          <h3 className="font-display text-h3">{messages.categoriesTitle}</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {messages.categories.map((category) => (
              <li
                key={category.name}
                className="flex flex-col gap-2 rounded-md border border-border bg-surface p-5 shadow-sm md:p-6"
              >
                <p className="font-display text-h3">{category.name}</p>
                <p className="text-small text-text-muted">{category.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal>
        <div>
          <h3 className="font-display text-h3">{messages.factsTitle}</h3>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {messages.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-md border border-border bg-surface p-5 shadow-sm md:p-6"
              >
                <dt className="text-small text-text-muted">{fact.label}</dt>
                <dd className="mt-2 font-display text-h3">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Container>
  </Section>
);
