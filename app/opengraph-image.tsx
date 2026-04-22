import { ImageResponse } from "next/og";

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
          background: "#0a0a16",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#7c6af7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 28,
            }}
          >
            F
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#e2e8f0", fontWeight: 900, fontSize: 40 }}>Flex</span>
            <span style={{ color: "#7c6af7", fontWeight: 900, fontSize: 40 }}>Lab</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#e2e8f0",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          Learn Flexbox
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 44,
            color: "#7c6af7",
          }}
        >
          by Playing
        </div>

        {/* Flex demo */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            background: "#13132e",
            borderRadius: 16,
            padding: "20px 36px",
            border: "1px solid rgba(255,255,255,0.1)",
            width: 580,
            marginBottom: 36,
          }}
        >
          {[
            { label: "A", bg: "#7c3aed" },
            { label: "B", bg: "#0891b2" },
            { label: "C", bg: "#be185d" },
            { label: "D", bg: "#c2410c" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                width: 72,
                height: 72,
                borderRadius: 12,
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 24,
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div style={{ color: "#64748b", fontSize: 22, textAlign: "center" }}>
          20 interactive challenges · axis visualization · live preview
        </div>
      </div>
    ),
    { ...size }
  );
}
