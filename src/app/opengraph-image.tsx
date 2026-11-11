import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kgariya Attorneys Incorporated premium navy-and-gold brand mark";
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
            "radial-gradient(ellipse at 50% 42%, #17385a 0%, #0b203b 48%, #061326 100%)",
          color: "#f8f5ed",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            border: "2px solid #bfa15e",
            borderRadius: 18,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: "1px solid rgba(225, 200, 140, 0.24)",
            borderRadius: 12,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: 999,
            border: "1px solid rgba(213, 185, 119, 0.12)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            marginTop: -4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 42,
            }}
          >
            <div
              style={{
                width: 138,
                height: 154,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "4px solid #d9bd79",
                borderRadius: "68px 68px 28px 28px",
                background:
                  "linear-gradient(145deg, #102b4b 0%, #07172b 100%)",
                boxShadow: "0 0 34px rgba(196, 160, 83, 0.18)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 9,
                  border: "1px solid rgba(219, 190, 124, 0.52)",
                  borderRadius: "58px 58px 20px 20px",
                  display: "flex",
                }}
              />
              <div
                style={{
                  fontSize: 112,
                  lineHeight: 1,
                  fontWeight: 700,
                  color: "#d9bd79",
                  textShadow: "0 3px 16px rgba(0,0,0,0.38)",
                  display: "flex",
                }}
              >
                K
              </div>
            </div>
            <div
              style={{
                height: 144,
                width: 2,
                background:
                  "linear-gradient(180deg, transparent, #c9aa67 16%, #c9aa67 84%, transparent)",
                display: "flex",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minWidth: 560,
              }}
            >
              <div
                style={{
                  fontSize: 78,
                  lineHeight: 1.04,
                  letterSpacing: 15,
                  color: "#fbf8f1",
                  fontWeight: 500,
                  display: "flex",
                  whiteSpace: "nowrap",
                }}
              >
                KGARIYA
              </div>
              <div
                style={{
                  marginTop: 17,
                  fontSize: 25,
                  letterSpacing: 5.4,
                  color: "#d8bd7e",
                  whiteSpace: "nowrap",
                  display: "flex",
                }}
              >
                ATTORNEYS INCORPORATED
              </div>
              <div
                style={{
                  width: 500,
                  height: 1,
                  marginTop: 24,
                  background:
                    "linear-gradient(90deg, rgba(202,169,100,0), #c9aa67, rgba(202,169,100,0))",
                  display: "flex",
                }}
              />
              <div
                style={{
                  marginTop: 17,
                  fontFamily: "Arial, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 6,
                  color: "#eadbb7",
                  display: "flex",
                  whiteSpace: "nowrap",
                }}
              >
                EXCELLENCE  •  INTEGRITY  •  RESULTS
              </div>
            </div>
          </div>
          <div
            style={{
              width: 680,
              height: 1,
              marginTop: 8,
              background:
                "linear-gradient(90deg, transparent, rgba(209,180,116,0.68), transparent)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 16,
              letterSpacing: 7,
              color: "rgba(248,245,237,0.58)",
              display: "flex",
            }}
          >
            COMMERCIAL  •  PROPERTY  •  FINANCE
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 45,
            right: 62,
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
            letterSpacing: 3,
            color: "rgba(216,189,126,0.48)",
            display: "flex",
          }}
        >
          PRETORIA  •  SOUTH AFRICA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
