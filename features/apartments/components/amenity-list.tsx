import type { Messages } from "@/i18n/load-messages";
import { amenityGroupOrder, type Apartment } from "../types";
import { amenityIcons } from "./amenity-icons";
import { headingTags } from "./heading-level";

type AmenityListProps = {
  amenities: Apartment["amenities"];
  messages: Messages["apartments"];
  /** Level of the group headings (Kuhinja, Kupatilo, ...). */
  headingLevel: 3 | 4;
};

/** Amenities grouped by category, each with its icon. Empty groups are skipped. */
export const AmenityList = ({
  amenities,
  messages,
  headingLevel,
}: AmenityListProps) => {
  const GroupHeading = headingTags[headingLevel];

  return (
    <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
      {amenityGroupOrder.map((group) => {
        const ids = amenities[group];
        if (ids.length === 0) return null;

        return (
          <div key={group}>
            <GroupHeading className="font-display text-h3">
              {messages.detail.groups[group]}
            </GroupHeading>
            <ul className="mt-3 flex flex-col gap-2">
              {ids.map((id) => {
                const Icon = amenityIcons[id];

                return (
                  <li key={id} className="flex items-center gap-3">
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-accent"
                    />
                    <span>{messages.amenities[id]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
