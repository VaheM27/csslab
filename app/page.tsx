import Link from "next/link";
import Navbar from "./components/Navbar";

const features = [
  {
    icon: "⚡",
    title: "Live Preview",
    description: "See your CSS applied instantly as you type. No refresh needed.",
  },
  {
    icon: "📐",
    title: "Axis Visualization",
    description: "Main axis and cross axis drawn on your layout in real time.",
  },
  {
    icon: "💡",
    title: "Why It Works",
    description: "Clear explanation after each level — not just the answer, but the reason.",
  },
  {
    icon: "🧪",
    title: "Sandbox Mode",
    description: "Free-play to experiment with any flex combination.",
  },
];

const chapters = [
  { index: 1, name: "The Basics",       levels: 3,  emoji: "🎯" },
  { index: 2, name: "Main Axis",        levels: 5,  emoji: "↔️" },
  { index: 3, name: "Cross Axis",       levels: 4,  emoji: "↕️" },
  { index: 4, name: "Wrap & Gap",       levels: 2,  emoji: "🔀" },
  { index: 5, name: "Item Properties",  levels: 4,  emoji: "🧩" },
  { index: 6, name: "Real World",       levels: 2,  emoji: "🌍" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">

        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-6 pt-44 pb-28 overflow-hidden"
          style={{ minHeight: "100vh" }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(5,150,105,0.1) 0%, transparent 70%)",
            }}
          />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8"
            style={{
              background: "rgba(5,150,105,0.1)",
              border: "1px solid var(--border-accent)",
              color: "var(--accent-light)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-light)" }}
            />
            20 Interactive Challenges
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-5"
            style={{ color: "var(--text)" }}
          >
            Learn Flexbox
            <br />
            <span style={{ color: "var(--accent-light)" }}>by Playing</span>
          </h1>

          <p
            className="text-lg max-w-lg mb-10 leading-relaxed"
            style={{ color: "var(--muted-lt)" }}
          >
            Master CSS Flexbox through hands-on challenges. Live previews, axis
            visualization, and clear explanations — not just the answer,{" "}
            <em>the why</em>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Link
              href="/play/1"
              className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-90 glow-accent"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Start Playing →
            </Link>
            <Link
              href="/sandbox"
              className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:bg-opacity-60"
              style={{
                background: "var(--card)",
                color: "var(--text-sec)",
                border: "1px solid var(--border)",
              }}
            >
              Open Sandbox
            </Link>
          </div>

          {/* Live demo card */}
          <div className="mt-16 w-full max-w-sm">
            <p
              className="text-xs mb-3 uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              Live example
            </p>
            <div
              className="rounded-2xl p-5"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <code
                className="text-xs block mb-4"
                style={{ color: "var(--accent-light)", fontFamily: "var(--font-mono)" }}
              >
                justify-content: space-between;
              </code>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "var(--surface)",
                  borderRadius: "10px",
                  padding: "12px",
                  height: "60px",
                }}
              >
                {["A", "B", "C", "D"].map((l, i) => (
                  <div
                    key={i}
                    className="rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{
                      width: 38,
                      height: 36,
                      background: ["#059669", "#0d9488", "#0891b2", "#15803d"][i],
                      color: "#fff",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          className="px-6 py-24"
          style={{ background: "var(--surface)" }}
        >
          <div className="max-w-4xl mx-auto">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-center mb-3"
              style={{ color: "var(--accent)" }}
            >
              Why FlexLab
            </p>
            <h2
              className="text-3xl font-black text-center mb-12"
              style={{ color: "var(--text)" }}
            >
              Better than Flexbox Froggy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl p-6 transition-all"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className="font-bold mb-1.5" style={{ color: "var(--text)" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-lt)" }}>
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chapters ── */}
        <section className="px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-center mb-3"
              style={{ color: "var(--accent)" }}
            >
              Curriculum
            </p>
            <h2
              className="text-3xl font-black text-center mb-12"
              style={{ color: "var(--text)" }}
            >
              20 Levels · 6 Chapters
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {chapters.map((ch) => (
                <div
                  key={ch.index}
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="text-xl mb-3">{ch.emoji}</div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "var(--accent)" }}
                  >
                    Chapter {ch.index}
                  </div>
                  <div className="font-bold text-sm mb-0.5" style={{ color: "var(--text)" }}>
                    {ch.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    {ch.levels} levels
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="px-6 py-32 text-center"
          style={{ background: "var(--surface)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            Ready?
          </p>
          <h2 className="text-4xl font-black mb-8" style={{ color: "var(--text)" }}>
            Start flexing today 💪
          </h2>
          <Link
            href="/play/1"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:opacity-90 glow-accent"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Start Level 1 →
          </Link>
        </section>

        <footer
          className="text-center py-6 text-sm"
          style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
        >
          Built with ❤️ to make CSS learning actually fun.
        </footer>
      </main>
    </>
  );
}
