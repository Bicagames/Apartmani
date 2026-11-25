import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/lib/cn";

export type SectionTone = "default" | "alt" | "dark";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
};

const tones: Record<SectionTone, string> = {
  default: "bg-bg text-text",
  alt: "bg-bg-alt text-text",
  dark: "bg-bg-dark text-on-dark",
};

/** Full-width band. Put a `Container` inside it for the content width. */
export function Section({
  tone = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-(--space-section)", tones[tone], className)}
      {...props}
    />
  );
}
