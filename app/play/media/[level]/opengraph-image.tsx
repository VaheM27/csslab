import { ImageResponse } from "next/og";
import { mediaLevels, MEDIA_TOTAL_LEVELS } from "@/app/data/mediaLevels";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return mediaLevels.map((l) => ({ level: String(l.id) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const lvl = mediaLevels.find((x) => x.id === Number(level));
  if (!lvl) return new Response("Not found", { status: 404 });

  const color = "#f43f5e";
  const desc = lvl.description.replace(/\*\*/g, "").replace(/`/g, "");
  const shortDesc = desc.length > 90 ? desc.slice(0, 90) + "..." : desc;
  const bpType = lvl.breakpointType === "min-width" ? "min-width" : "max-width";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a16",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: 10, background: color,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 900, fontSize: 22,
              }}
            >
              C
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ color: "#e2e8f0", fontWeight: 900, fontSize: 28 }}>CSS</span>
              <span style={{ color, fontWeight: 900, fontSize: 28 }}>Lab</span>
            </div>
            <div
              style={{
                marginLeft: 12, padding: "4px 14px", borderRadius: 100,
                background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.35)",
                color, fontWeight: 700, fontSize: 16,
              }}
            >
              @media
            </div>
          </div>

          <div
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.06)", borderRadius: 100,
              padding: "8px 20px", border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color, fontWeight: 700, fontSize: 18 }}>{lvl.chapter}</span>
            <span style={{ color: "#64748b", fontSize: 18 }}>{"·"}</span>
            <span style={{ color: "#64748b", fontSize: 18 }}>{`Level ${lvl.id} of ${MEDIA_TOTAL_LEVELS}`}</span>
          </div>
        </div>

        {/* Main */}
        <div style={{ display: "flex", flex: 1, gap: 52, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 20 }}>
            <div style={{ fontSize: 68, fontWeight: 900, color: "#e2e8f0", lineHeight: 1.1 }}>
              {lvl.title}
            </div>
            <div style={{ fontSize: 24, color: "#64748b", lineHeight: 1.5 }}>
              {shortDesc}
            </div>
          </div>

          {/* Media query visual */}
          <div
            style={{
              width: 280, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0,
            }}
          >
            {/* Mobile */}
            <div
              style={{
                borderRadius: 14, background: "#13132e",
                border: `2px solid ${color}60`,
                padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span style={{ fontSize: 24 }}>📱</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 15 }}>{"Mobile · 375px"}</span>
                <span style={{ color: "#64748b", fontSize: 13 }}>{bpType === "max-width" ? "← fires here" : "base styles"}</span>
              </div>
            </div>
            {/* Desktop */}
            <div
              style={{
                borderRadius: 14, background: "#13132e",
                border: `1px solid rgba(255,255,255,0.08)`,
                padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span style={{ fontSize: 24 }}>🖥</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 15 }}>{"Desktop · 1024px"}</span>
                <span style={{ color: "#64748b", fontSize: 13 }}>{bpType === "min-width" ? "← fires here" : "base styles"}</span>
              </div>
            </div>
            <div
              style={{
                borderRadius: 10, padding: "8px 14px",
                background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)",
                color, fontWeight: 600, fontSize: 14,
                display: "flex", justifyContent: "center",
              }}
            >
              {`@media (${bpType}: ${lvl.breakpoint}px)`}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color, fontSize: 18, fontWeight: 600 }}>csslab.dev</span>
          <span style={{ color: "#64748b", fontSize: 18 }}>·</span>
          <span style={{ color: "#64748b", fontSize: 18 }}>Interactive @media Query Challenges</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
