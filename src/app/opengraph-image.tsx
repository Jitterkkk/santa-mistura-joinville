import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#f4f3f0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 116,
            fontWeight: 700,
            letterSpacing: -3,
            color: "#141414",
            textTransform: "uppercase",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 26,
            letterSpacing: 6,
            color: "#6e6b66",
            textTransform: "uppercase",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 22,
            letterSpacing: 3,
            color: "#ff4b00",
            textTransform: "uppercase",
          }}
        >
          Joinville · desde {site.desde}
        </div>
      </div>
    ),
    { ...size }
  );
}
