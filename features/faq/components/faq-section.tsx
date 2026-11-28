import { Plus } from "lucide-react";
import type { Messages } from "@/i18n/load-messages";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";
import "./faq-section.css";

type FaqSectionProps = {
  messages: Messages["faq"];
};

const titleId = "pitanja-title";

/*
 * Two columns from `lg`: the heading sticks under the fixed header while the
 * questions scroll past it. Each question is a native <details>, so it opens
 * without JS and keeps keyboard and screen reader support. Open/close motion
 * and the icon turn live in ./faq-section.css.
 */
export const FaqSection = ({ messages }: FaqSectionProps) => (
  <Section id="pitanja" aria-labelledby={titleId}>
    <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <SectionHeading
        id={titleId}
        eyebrow={messages.section.eyebrow}
        title={messages.section.title}
        lead={messages.section.lead}
        className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start"
      />
      <div className="border-t border-border-strong">
        {messages.items.map((item) => (
          <details
            key={item.question}
            className="faq-item reveal border-b border-border-strong"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-h3">{item.question}</h3>
              <span
                aria-hidden="true"
                className="faq-icon flex size-10 shrink-0 items-center justify-center rounded-pill border border-border-strong text-accent"
              >
                <Plus className="size-5" strokeWidth={1.75} />
              </span>
            </summary>
            <p className="prose-measure pb-6 pr-16 text-text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Container>
  </Section>
);
