import { ImageResponse } from "next/og";
import { gridLevels, GRID_TOTAL_LEVELS } from "@/app/data/gridLevels";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return gridLevels.map((l) => ({ level: String(l.id) }));
}

const CHAPTER_COLORS: Record<number, string> = {
  1: "#8b5cf6",
  2: "#6d28d9",
  3: "#7c3aed",
  4: "#5b21b6",
  5: "#4c1d95",
};

export default async function Image({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const lvl = gridLevels.find((x) => x.id === Number(level));
  if (!lvl) return new Response("Not found", { status: 404 });

  const color = CHAPTER_COLORS[lvl.chapterIndex] ?? "#8b5cf6";
  const desc = lvl.description.replace(/\*\*/g, "").replace(/`/g, "");
  const shortDesc = desc.length > 90 ? desc.slice(0, 90) + "..." : desc;

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
                width: 44, height: 44, borderRadius: 10, background: "#8b5cf6",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 900, fontSize: 22,
              }}
            >
              C
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ color: "#e2e8f0", fontWeight: 900, fontSize: 28 }}>CSS</span>
              <span style={{ color: "#8b5cf6", fontWeight: 900, fontSize: 28 }}>Lab</span>
            </div>
            <div
              style={{
                marginLeft: 12, padding: "4px 14px", borderRadius: 100,
                background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)",
                color: "#8b5cf6", fontWeight: 700, fontSize: 16,
              }}
            >
              CSS Grid
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
            <span style={{ color: "#64748b", fontSize: 18 }}>{`Level ${lvl.id} of ${GRID_TOTAL_LEVELS}`}</span>
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

          {/* Grid preview — satori only supports display:flex, so we simulate a 3-col grid with flex+wrap */}
          <div
            style={{
              width: 280, height: 200, borderRadius: 20,
              background: "#13132e", border: `2px solid ${color}50`,
              display: "flex", flexWrap: "wrap",
              gap: 8, padding: 14, flexShrink: 0, overflow: "hidden",
            }}
          >
            {["A","B","C","D","E","F"].map((label, i) => (
              <div
                key={i}
                style={{
                  width: 72, height: 72,
                  borderRadius: 8, background: color + (i % 2 === 0 ? "cc" : "66"),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 900, fontSize: 18,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#8b5cf6", fontSize: 18, fontWeight: 600 }}>csslab.dev</span>
          <span style={{ color: "#64748b", fontSize: 18 }}>·</span>
          <span style={{ color: "#64748b", fontSize: 18 }}>Interactive CSS Grid Challenges</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
