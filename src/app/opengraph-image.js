import { ImageResponse } from "next/og";
import { site } from "./data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.title;

export default async function Image() {
  const hostname = new URL(site.url).hostname;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(165deg, #222831 0%, #262c35 50%, #1c2129 100%)",
          color: "#eeeeee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#00adb5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#222831",
            }}
          >
            NR
          </div>
          <div style={{ fontSize: 28, color: "#a8acb0" }}>{hostname}</div>
        </div>

        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>
          Neal Ramjeawan
        </div>

        <div style={{ display: "flex", fontSize: 34, color: "#00adb5", marginTop: 18 }}>
          Cloud Engineer &middot; DevOps &middot; SRE / Systems Engineer
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#767b82", marginTop: 30, maxWidth: 900 }}>
          Infrastructure projects built, broken on purpose, and fixed before they shipped.
        </div>
      </div>
    ),
    { ...size }
  );
}