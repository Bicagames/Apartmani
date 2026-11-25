import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/lib/cn";

type ContainerElement = "div" | "section" | "header" | "footer" | "nav";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: ContainerElement;
  /** `narrow` is the 44rem reading width. */
  size?: "default" | "narrow";
};

const sizes = {
  default: "max-w-7xl",
  // 44rem is the reading width from docs/style-guide.md (no Tailwind step matches).
  narrow: "max-w-[44rem]",
} as const;

export function Container({
  as: Component = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-(--space-gutter)",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
