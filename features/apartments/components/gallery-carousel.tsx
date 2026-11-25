"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type UIEvent } from "react";
import { cn } from "@/shared/lib/cn";
import type { AppImageElementProps } from "@/shared/ui/image";

export type GallerySlide = {
  key: string;
  color: string;
  img: AppImageElementProps;
};

type GalleryCarouselProps = {
  slides: GallerySlide[];
  labels: {
    previous: string;
    next: string;
    /** Pattern with `{current}` and `{total}` placeholders. */
    counter: string;
    /** Accessible name of the whole carousel. */
    gallery: string;
  };
};

const formatCounter = (pattern: string, current: number, total: number) =>
  pattern.replace("{current}", String(current)).replace("{total}", String(total));

const navButtonClasses =
  "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-pill bg-bg/90 text-text shadow-md transition-opacity duration-(--duration-fast) hover:bg-bg aria-disabled:opacity-40 aria-disabled:hover:bg-bg/90";

/*
 * CSS scroll-snap track: swiping and trackpads are native. React only keeps the
 * current index (for the counter and the end-of-track buttons), taken from the
 * scroll position in the scroll handler; setting the same index again bails out
 * of rendering, so no throttling is needed. No thumbnails: they would add
 * five more image requests for little value next to swipe, buttons and counter.
 * Buttons use `aria-disabled` instead of `disabled` at the ends, so a focused
 * button does not drop keyboard focus when it reaches the last/first photo.
 */
export const GalleryCarousel = ({
  slides,
  labels,
}: GalleryCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const atStart = index <= 0;
  const atEnd = index >= total - 1;

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    if (track.clientWidth === 0) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    setIndex(Math.min(Math.max(next, 0), total - 1));
  };

  const scrollToIndex = (target: number) => {
    const track = trackRef.current;
    if (!track || target < 0 || target > total - 1) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: target * track.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(index + 1);
    }
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={labels.gallery}
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        // overscroll-x-contain: a swipe at the end must not trigger browser
        // back/forward. Vertical panning stays native (touch-action: auto).
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain -outline-offset-3"
      >
        {slides.map((slide, imageIndex) => (
          <div
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={formatCounter(labels.counter, imageIndex + 1, total)}
            className="relative aspect-3/2 w-full shrink-0 snap-center snap-always"
            style={{ backgroundColor: slide.color }}
          >
            {/* Props are built on the server (getImageProps). A native img stays out of the client graph. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...slide.img} alt={slide.img.alt} />
          </div>
        ))}
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label={labels.previous}
            aria-disabled={atStart}
            onClick={() => scrollToIndex(index - 1)}
            className={cn(navButtonClasses, "left-3")}
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            aria-disabled={atEnd}
            onClick={() => scrollToIndex(index + 1)}
            className={cn(navButtonClasses, "right-3")}
          >
            <ChevronRight aria-hidden="true" className="size-6" />
          </button>
          <p
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-3 rounded-pill bg-bg-dark/70 px-3 py-1 text-small text-on-dark tabular-nums"
          >
            {index + 1} / {total}
          </p>
          <p aria-live="polite" aria-atomic="true" className="sr-only">
            {formatCounter(labels.counter, index + 1, total)}
          </p>
        </>
      ) : null}
    </div>
  );
};
