import type { Messages } from "@/i18n/load-messages";
import { ButtonLink } from "@/shared/ui/button";
import { getMapsEmbedUrl, getMapsSearchUrl } from "../contact-links";

type MapEmbedProps = {
  messages: Messages["contact"]["map"];
  mapQuery: string;
};

export const MapEmbed = ({ messages, mapQuery }: MapEmbedProps) => (
  <div className="relative min-h-80 overflow-hidden rounded-lg bg-brand-hover lg:min-h-full">
    <iframe
      src={getMapsEmbedUrl(mapQuery)}
      title={messages.title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="absolute inset-0 size-full border-0"
    />
    <div className="absolute right-4 bottom-4 left-4 flex sm:left-auto">
      <ButtonLink
        href={getMapsSearchUrl(mapQuery)}
        variant="on-dark"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto"
      >
        {messages.openInMaps}
      </ButtonLink>
    </div>
  </div>
);
