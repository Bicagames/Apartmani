import { ImageResponse } from "next/og";

export const alt = "FAMILY RESORT Subotica";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Default share image: wordmark on moss-900 with cream text.
 * Uses the ImageResponse default sans (no external font fetch).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F2822",
          color: "#FDFBF7",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          FAMILY RESORT
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#DCCBB2",
          }}
        >
          Subotica
        </div>
      </div>
    ),
    { ...size },
  );
}
