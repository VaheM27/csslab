import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Play — CSSLab",
  description: "Choose a CSS topic: Flexbox, Grid, or @media queries. 45 interactive challenges with live previews.",
  alternates: { canonical: "https://flexlab-jade.vercel.app/play" },
  openGraph: {
    title: "Play — CSSLab",
    description: "45 interactive CSS challenges — Flexbox, Grid, and @media queries. Live previews, instant feedback.",
    url: "https://flexlab-jade.vercel.app/play",
    siteName: "CSSLab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Play — CSSLab",
    description: "45 interactive CSS challenges — Flexbox, Grid, and @media queries.",
  },
};

const modules = [
  {
    slug: "flex",
    emoji: "↔️",
    title: "CSS Flexbox",
    color: "#0ea5e9",
    colorDim: "rgba(14,165,233,0.08)",
    colorBorder: "rgba(14,165,233,0.2)",
    levels: 20,
    chapters: 6,
    description: "Master one-dimensional layouts — rows, columns, alignment, and spacing.",
    topics: ["display: flex", "justify-content", "align-items", "flex-wrap", "gap", "order"],
    href: "/play/flex",
    firstLevel: "/play/1",
  },
  {
    slug: "grid",
    emoji: "⬛",
    title: "CSS Grid",
    color: "#8b5cf6",
    colorDim: "rgba(139,92,246,0.08)",
    colorBorder: "rgba(139,92,246,0.2)",
    levels: 15,
    chapters: 5,
    description: "Build two-dimensional layouts — rows AND columns at the same time.",
    topics: ["display: grid", "grid-template-columns", "gap", "span", "place-items", "minmax()"],
    href: "/play/grid",
    firstLevel: "/play/grid/1",
  },
  {
    slug: "media",
    emoji: "📱",
    title: "@media Queries",
    color: "#f43f5e",
    colorDim: "rgba(244,63,94,0.08)",
    colorBorder: "rgba(244,63,94,0.2)",
    levels: 10,
    chapters: 3,
    description: "Make your layouts adapt to any screen size — mobile-first and beyond.",
    topics: ["max-width", "min-width", "breakpoints", "flex-direction", "responsive grid"],
    href: "/play/media",
    firstLevel: "/play/media/1",
  },
];

export default function PlayPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-black mb-2" style={{ color: "var(--text)" }}>
            Choose a Topic
          </h1>
          <p className="mb-12 text-lg" style={{ color: "var(--muted)" }}>
            Three CSS superpowers — master them all.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {modules.map((mod) => (
              <div key={mod.slug}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all hover:scale-[1.01]"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${mod.colorBorder}`,
                  boxShadow: "var(--shadow-sm)",
                }}>
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: mod.colorDim, border: `1px solid ${mod.colorBorder}` }}>
                    {mod.emoji}
                  </div>
                  <div>
                    <h2 className="font-black text-lg leading-tight" style={{ color: "var(--text)" }}>
                      {mod.title}
                    </h2>
                    <p className="text-xs" style={{ color: mod.color }}>
                      {mod.levels} levels · {mod.chapters} chapters
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {mod.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5">
                  {mod.topics.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{ background: mod.colorDim, color: mod.color, border: `1px solid ${mod.colorBorder}` }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-2">
                  <Link href={mod.firstLevel}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm text-center transition-all hover:opacity-90 active:scale-95"
                    style={{ background: mod.color, color: "#fff" }}>
                    Start →
                  </Link>
                  <Link href={mod.href}
                    className="px-4 py-2.5 rounded-xl font-medium text-sm text-center transition-all hover:opacity-80"
                    style={{ background: mod.colorDim, color: mod.color, border: `1px solid ${mod.colorBorder}` }}>
                    All Levels
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Flex levels section (existing) */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black" style={{ color: "var(--text)" }}>Flexbox Levels</h2>
                <p className="text-sm" style={{ color: "var(--muted)" }}>Quick access to all 20 Flexbox challenges</p>
              </div>
              <Link href="/play/flex" className="text-sm font-medium hover:opacity-70" style={{ color: "var(--accent)" }}>
                View all →
              </Link>
            </div>
            <FlexLevelGrid />
          </div>
        </div>
      </main>
    </>
  );
}

// Server-side flex level grid
import { levels } from "@/app/data/levels";

function FlexLevelGrid() {
  const chapters = Array.from(new Set(levels.map((l) => l.chapterIndex))).sort();
  const chapterColors: Record<number, string> = {
    1: "#7c3aed", 2: "#0ea5e9", 3: "#f43f5e", 4: "#f97316", 5: "#10b981", 6: "#a855f7",
  };

  return (
    <div className="flex flex-col gap-8">
      {chapters.map((chIdx) => {
        const chLevels = levels.filter((l) => l.chapterIndex === chIdx);
        const color = chapterColors[chIdx] ?? "#0ea5e9";
        return (
          <div key={chIdx}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-5 rounded-full" style={{ background: color }} />
              <h3 className="font-bold" style={{ color: "var(--text)" }}>
                Chapter {chIdx}: {chLevels[0].chapter}
              </h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
              {chLevels.map((level) => (
                <Link key={level.id} href={`/play/${level.id}`}
                  className="rounded-lg p-3 text-center transition-all hover:scale-105 active:scale-95"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="text-xs font-bold mb-0.5" style={{ color }}>#{level.id}</div>
                  <div className="text-xs font-medium leading-tight" style={{ color: "var(--text)" }}>
                    {level.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
