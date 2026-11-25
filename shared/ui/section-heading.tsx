import { cn } from "@/shared/lib/cn";
import type { SectionTone } from "@/shared/ui/section";

type HeadingLevel = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  lead?: string;
  /** Document outline level. The visual size follows the level. */
  level?: HeadingLevel;
  /** Tone of the surrounding `Section`, so colours keep their contrast. */
  tone?: SectionTone;
  align?: "start" | "center";
  /** Put on the heading and reference it with `aria-labelledby`. */
  id?: string;
  className?: string;
};

const headingSizes: Record<HeadingLevel, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

export function SectionHeading({
  title,
  eyebrow,
  lead,
  level: Heading = "h2",
  tone = "default",
  align = "start",
  id,
  className,
}: SectionHeadingProps) {
  const onDark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", onDark && "eyebrow-on-dark")}>{eyebrow}</p>
      ) : null}
      <Heading
        id={id}
        className={cn("font-display", headingSizes[Heading])}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "text-lead prose-measure",
            onDark ? "text-on-dark-muted" : "text-text-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
