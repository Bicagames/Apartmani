import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type RevealElement = "div" | "section" | "article" | "li";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealElement;
};

/**
 * Scroll-driven fade-in (CSS only, see `.reveal` in globals.css). Content is
 * visible without support or under reduced motion. Do not wrap blocks taller
 * than the viewport.
 */
export function Reveal({
  as: Component = "div",
  className,
  ...props
}: RevealProps) {
  return <Component className={cn("reveal", className)} {...props} />;
}
