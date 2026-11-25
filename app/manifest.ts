import type { MetadataRoute } from "next";
import { siteName } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} Subotica`,
    short_name: "Family Resort",
    description:
      "Fully equipped lux apartments in Subotica for a long-term stay.",
    start_url: "/en",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#1F2822",
    lang: "en",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
