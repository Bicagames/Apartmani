import type { Messages } from "@/i18n/load-messages";
import { getAppImageProps } from "@/shared/ui/image";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { SectionHeading } from "@/shared/ui/section-heading";
import { galleryImages } from "../data/gallery";
import { GalleryCarousel, type GallerySlide } from "./gallery-carousel";

type ApartmentsSectionProps = {
  messages: Messages["apartments"];
};

const titleId = "apartmani-title";

export const ApartmentsSection = ({ messages }: ApartmentsSectionProps) => {
  const { detail } = messages;
  const slides: GallerySlide[] = galleryImages.map((image) => ({
    key: image.src,
    color: image.color,
    img: getAppImageProps({
      src: image.src,
      alt: image.alt,
      width: image.width,
      height: image.height,
      draggable: false,
      loading: "lazy",
      sizes: "(min-width: 80rem) 1216px, 100vw",
      quality: 82,
      className: "object-cover",
      // Intrinsic width/height stay on the element. Inline size fills the slide.
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      },
    }),
  }));

  return (
    <Section id="apartmani" aria-labelledby={titleId}>
      <Container>
        <SectionHeading
          id={titleId}
          eyebrow={messages.section.eyebrow}
          title={messages.section.title}
          lead={messages.section.lead}
        />
        <article className="mt-12 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <GalleryCarousel
            slides={slides}
            labels={{
              previous: detail.previousPhoto,
              next: detail.nextPhoto,
              counter: detail.photoCounter,
              gallery: detail.galleryLabel,
            }}
          />
        </article>
      </Container>
    </Section>
  );
};
