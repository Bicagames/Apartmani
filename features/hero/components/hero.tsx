import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { ButtonLink } from "@/shared/ui/button";
import { AppImage } from "@/shared/ui/image";
import "./hero.css";

type HeroProps = {
  locale: Locale;
  /** The site name; shown in the eyebrow above the headline. */
  title: string;
  messages: Messages["hero"];
};

// PLACEHOLDER: generated placeholder artwork, replace with the real hero photo.
// `color` is the image's average colour: it fills the media wrapper so the
// frame never flashes white or dark while the file loads.
const heroImage = {
  src: "/images/hero.webp",
  width: 2560,
  height: 1441,
  color: "#84786f",
} as const;

/**
 * Full-bleed photo that, after `--hero-delay`, shrinks into a rounded frame on
 * a dark stage while the text fades in. Server component, CSS only. Class names
 * and keyframes live in ./hero.css. The final (framed, text visible) state is
 * the default; the animation only starts under `prefers-reduced-motion:
 * no-preference`, so reduced motion never shows the full-bleed state.
 */
export const Hero = ({ locale, title, messages }: HeroProps) => (
  <section
    data-hero
    aria-labelledby="hero-title"
    className="relative isolate flex min-h-[max(100svh,36rem)] flex-col overflow-hidden bg-bg-dark text-on-dark"
  >
    <div
      className="hero-media absolute inset-0"
      style={{ backgroundColor: heroImage.color }}
    >
      <div className="hero-image absolute inset-0">
        <AppImage
          src={heroImage.src}
          alt={messages.imageAlt}
          width={heroImage.width}
          height={heroImage.height}
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={82}
          // Portrait phones crop the sides of the 16:9 art: keep the arches in view.
          className="object-cover object-center"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div aria-hidden="true" className="hero-overlay absolute inset-0" />
    </div>

    <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-[calc(var(--hero-inset)+var(--space-gutter))] pt-(--header-h) pb-8 text-center">
      <p className="hero-reveal eyebrow eyebrow-on-dark [--hero-step:0]">
        {title} · {messages.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="hero-reveal mx-auto mt-5 max-w-4xl font-display text-h1 text-balance [--hero-step:1]"
      >
        {messages.heading}
      </h1>
      <p className="hero-reveal mx-auto mt-5 max-w-2xl text-lead text-pretty text-on-dark/85 [--hero-step:2]">
        {messages.lead}
      </p>
      <div className="hero-reveal mt-8 flex flex-col items-center gap-3 [--hero-step:3]">
        <ButtonLink
          href={localizedPath(locale, "/#rezervacije")}
          variant="on-dark"
        >
          {messages.reservations}
        </ButtonLink>
        <p className="max-w-md text-sm text-on-dark/85">{messages.priceNote}</p>
      </div>
    </div>
  </section>
);
