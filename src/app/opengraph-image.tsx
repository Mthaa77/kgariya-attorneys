import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kgariya Attorneys full official logo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 50% 48%, #fbfaf6 0%, #f3f1eb 72%, #e9e6df 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(18, 38, 62, 0.16)",
            borderRadius: 18,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: "1px solid rgba(126, 24, 49, 0.12)",
            borderRadius: 12,
            display: "flex",
          }}
        />
        <img
          src="https://kgariya-attorneyzz.vercel.app/images/kgariya-full-logo.webp"
          width="630"
          height="630"
          style={{
            width: 630,
            height: 630,
            objectFit: "contain",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
