import { localizedPath, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/load-messages";
import { ButtonLink } from "@/shared/ui/button";
import { AppImage } from "@/shared/ui/image";
import "./hero.css";

type HeroProps = {
  locale: Locale;
  /** The site name; rendered as the page's only `<h1>`. */
  title: string;
  messages: Messages["hero"];
};

// PLACEHOLDER: generated placeholder artwork, replace with the real hero photo.
// `color` is the image's average colour: it fills the media wrapper so the
// frame never flashes white or dark while the file loads.
const heroImage = {
  src: "/images/hero.jpg",
  width: 4000,
  height: 2252,
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
          quality={70}
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
        {messages.eyebrow}
      </p>
      <h1 id="hero-title" className="hero-reveal mt-4 [--hero-step:1]">
        {/* Left padding of one tracking unit balances the trailing letter-spacing
            so the wordmark is optically centred. */}
        <span className="block pl-[0.14em] font-display text-display uppercase">
          {title}
        </span>
        <span className="mx-auto mt-4 block max-w-3xl font-display text-lead tracking-normal normal-case md:text-h3">
          {messages.heading}
        </span>
      </h1>
      <div className="hero-reveal mt-8 [--hero-step:2]">
        <ButtonLink
          href={localizedPath(locale, "/#rezervacije")}
          variant="on-dark"
        >
          {messages.reservations}
        </ButtonLink>
      </div>
    </div>
  </section>
);
