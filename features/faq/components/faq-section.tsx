import type { Messages } from "@/i18n/load-messages";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";

type FaqSectionProps = {
  messages: Messages["faq"];
};

const titleId = "pitanja-title";

export const FaqSection = ({ messages }: FaqSectionProps) => (
  <Section id="pitanja" aria-labelledby={titleId}>
    <Container className="flex flex-col gap-12">
      <SectionHeading
        id={titleId}
        eyebrow={messages.section.eyebrow}
        title={messages.section.title}
        lead={messages.section.lead}
      />
      <div className="flex max-w-3xl flex-col gap-8">
        {messages.items.map((item) => (
          <div key={item.question}>
            <h3 className="font-display text-h3">{item.question}</h3>
            <p className="mt-2 prose-measure">{item.answer}</p>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);
