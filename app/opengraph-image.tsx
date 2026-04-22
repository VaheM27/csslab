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
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
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
            C
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#e2e8f0", fontWeight: 900, fontSize: 44 }}>CSS</span>
            <span style={{ color: "#7c6af7", fontWeight: 900, fontSize: 44 }}>Lab</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#e2e8f0",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          Learn CSS by Playing
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            textAlign: "center",
            marginBottom: 44,
          }}
        >
          45 interactive challenges · Flexbox · Grid · @media queries
        </div>

        {/* 3 module pills */}
        <div style={{ display: "flex", gap: 16, marginBottom: 0 }}>
          {[
            { label: "↔ Flexbox", color: "#0ea5e9", bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.3)" },
            { label: "⬛ CSS Grid", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
            { label: "📱 @media", color: "#f43f5e", bg: "rgba(244,63,94,0.12)", border: "rgba(244,63,94,0.3)" },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 28px",
                borderRadius: 100,
                background: m.bg,
                border: `1.5px solid ${m.border}`,
                color: m.color,
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              {m.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
