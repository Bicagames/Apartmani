/**
 * Loading state shaped like `ApartmentDetails`: 3:2 gallery block, then title,
 * summary and a few text lines. Same paddings as the real content, so nothing
 * jumps when it is swapped in.
 */
export const ApartmentDetailsSkeleton = () => (
  <div aria-hidden="true" className="motion-safe:animate-pulse">
    <div className="aspect-3/2 w-full bg-border" />
    <div className="flex flex-col gap-4 px-(--space-gutter) py-8 md:px-10 md:py-10">
      <div className="h-10 w-2/3 rounded-sm bg-border" />
      <div className="h-5 w-full max-w-prose rounded-sm bg-border" />
      <div className="h-5 w-3/4 max-w-prose rounded-sm bg-border" />
    </div>
  </div>
);
