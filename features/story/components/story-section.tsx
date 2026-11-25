import type { Messages } from "@/i18n/load-messages";
import { AppImage } from "@/shared/ui/image";
import { Container } from "@/shared/ui/container";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";
import { storyImages } from "../story-images";

type StorySectionProps = {
  messages: Messages["story"];
};

const titleId = "prica-title";

/*
 * Editorial overlap. The text comes first in the DOM (reading order), the
 * images follow: below the text on phones, in the right column from `md`.
 *
 * Phones show ONE image. From `md` a second, smaller image overlaps the first
 * towards the bottom right. Both live inside the column: the main image takes
 * 4/5 of the width, the second one 1/2 and is pinned to the right edge, and
 * the bottom padding gives its downward offset room, so nothing can reach
 * past the container (no negative margins). The second image is `hidden`
 * below `md` (display: none) and `loading="lazy"`, so phones never download it.
 * `border-[6px]` is an arbitrary value on purpose: no border-width token
 * exists and 6px is the specified frame (bg-alt, so it blends into the section).
 */
export const StorySection = ({ messages }: StorySectionProps) => (
  <Section id="prica" tone="alt" aria-labelledby={titleId}>
    <Container className="grid gap-12 md:grid-cols-2 md:items-center lg:gap-20">
      <Reveal className="flex flex-col gap-6">
        <SectionHeading
          id={titleId}
          eyebrow={messages.eyebrow}
          title={messages.title}
          tone="alt"
        />
        <div className="flex flex-col gap-4 prose-measure">
          {messages.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="border-t border-border-strong pt-4 font-display text-h3 text-accent">
          {messages.signature}
        </p>
      </Reveal>

      <Reveal className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none md:pb-12 lg:pb-16">
        <div
          className="relative aspect-4/5 w-full overflow-hidden rounded-lg md:w-4/5"
          style={{ backgroundColor: storyImages.main.color }}
        >
          <AppImage
            src={storyImages.main.src}
            alt={messages.imageAlts.main}
            fill
            loading="lazy"
            sizes="(min-width: 80rem) 422px, (min-width: 48rem) 38vw, (min-width: 28rem) 448px, 100vw"
            quality={70}
            className="object-cover"
          />
        </div>
        <div
          className="absolute right-0 bottom-0 hidden aspect-square w-1/2 overflow-hidden rounded-lg border-[6px] border-bg-alt shadow-lg md:block"
          style={{ backgroundColor: storyImages.detail.color }}
        >
          <AppImage
            src={storyImages.detail.src}
            alt={messages.imageAlts.detail}
            fill
            loading="lazy"
            sizes="(min-width: 80rem) 264px, 24vw"
            quality={70}
            className="object-cover"
          />
        </div>
      </Reveal>
    </Container>
  </Section>
);
