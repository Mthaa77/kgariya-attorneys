import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kgariya Attorneys — six specialist practices, Pretoria";
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
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(125deg, #f8f6ef 0%, #f0ede4 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 18,
            border: "1px solid rgba(10, 27, 51, 0.16)",
            borderRadius: 18,
            display: "flex",
          }}
        />
        <div
          style={{
            width: 400,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background: "linear-gradient(145deg, #07172d 0%, #102b4d 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 28,
              border: "1px solid rgba(198, 165, 92, 0.48)",
              borderRadius: 15,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 5,
              background: "linear-gradient(180deg, #e5d09b, #c6a55c, #86682c)",
              display: "flex",
            }}
          />
          <img
            src="https://kgariya-attorneyzz.vercel.app/images/kgariya-full-logo.webp"
            width="340"
            height="340"
            style={{
              width: 340,
              height: 340,
              objectFit: "contain",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "52px 62px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#92713a",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.24em",
            }}
          >
            <div
              style={{
                width: 30,
                height: 2,
                background: "#c6a55c",
                display: "flex",
              }}
            />
            PRETORIA · SOUTH AFRICA
          </div>
          <div
            style={{
              marginTop: 25,
              color: "#0a1b33",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Six practices.</span>
            <span style={{ color: "#9c7b40" }}>Deliberate depth.</span>
          </div>
          <div
            style={{
              width: 74,
              height: 3,
              marginTop: 26,
              background: "linear-gradient(90deg, #c6a55c, #e5d09b)",
              display: "flex",
            }}
          />
          <div
            style={{
              maxWidth: 560,
              marginTop: 24,
              color: "#35465b",
              fontSize: 21,
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Commercial disputes · Finance · Property · Development · Transactions
          </div>
          <div
            style={{
              position: "absolute",
              right: 62,
              bottom: 43,
              color: "#88744e",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.16em",
              display: "flex",
            }}
          >
            EVIDENCE OVER SLOGANS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
