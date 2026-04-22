import { ImageResponse } from "next/og";
import { getLevelById, TOTAL_LEVELS } from "@/app/data/levels";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return Array.from({ length: TOTAL_LEVELS }, (_, i) => ({
    level: String(i + 1),
  }));
}

const CHAPTER_COLORS: Record<number, string> = {
  1: "#7c3aed",
  2: "#0891b2",
  3: "#be185d",
  4: "#c2410c",
  5: "#15803d",
  6: "#b45309",
};

const ITEM_COLORS = ["#7c3aed", "#0891b2", "#be185d", "#c2410c", "#15803d"];

export default async function Image({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const lvl = getLevelById(Number(level));
  if (!lvl) return new Response("Not found", { status: 404 });

  const color = CHAPTER_COLORS[lvl.chapterIndex] ?? "#7c3aed";
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 52,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#7c6af7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 22,
              }}
            >
              F
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
              <span style={{ color: "#e2e8f0", fontWeight: 900, fontSize: 28 }}>Flex</span>
              <span style={{ color: "#7c6af7", fontWeight: 900, fontSize: 28 }}>Lab</span>
            </div>
          </div>

          {/* Chapter badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 100,
              padding: "8px 20px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: color, fontWeight: 700, fontSize: 18 }}>{lvl.chapter}</span>
            <span style={{ color: "#64748b", fontSize: 18 }}>·</span>
            <span style={{ color: "#64748b", fontSize: 18 }}>Level {lvl.id} of {TOTAL_LEVELS}</span>
          </div>
        </div>

        {/* Main */}
        <div style={{ display: "flex", flex: 1, gap: 52, alignItems: "center" }}>
          {/* Left: text */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 20 }}>
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                color: "#e2e8f0",
                lineHeight: 1.1,
              }}
            >
              {lvl.title}
            </div>
            <div style={{ fontSize: 24, color: "#64748b", lineHeight: 1.5 }}>
              {shortDesc}
            </div>
          </div>

          {/* Right: flex preview box */}
          <div
            style={{
              width: 300,
              height: 200,
              borderRadius: 20,
              background: "#13132e",
              border: `2px solid ${color}50`,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              padding: 16,
              flexShrink: 0,
              overflow: "hidden",
              alignItems: "flex-start",
            }}
          >
            {lvl.items.slice(0, 5).map((item, i) => (
              <div
                key={i}
                style={{
                  width: item.width ?? 52,
                  height: item.height ?? 52,
                  borderRadius: 10,
                  background: ITEM_COLORS[i % ITEM_COLORS.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: "#7c6af7", fontSize: 18, fontWeight: 600 }}>flexlab-jade.vercel.app</span>
          <span style={{ color: "#64748b", fontSize: 18 }}>·</span>
          <span style={{ color: "#64748b", fontSize: 18 }}>Interactive CSS Flexbox Challenges</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
