import Link from "next/link";
import Navbar from "./components/Navbar";

const features = [
  {
    icon: "⚡",
    title: "Live Preview",
    description:
      "See your CSS applied instantly as you type. No refresh needed.",
  },
  {
    icon: "📐",
    title: "Axis Visualization",
    description:
      "See the main axis and cross axis drawn on your layout in real time.",
  },
  {
    icon: "💡",
    title: "Why It Works",
    description:
      "After each level, get a clear explanation of what happened and why.",
  },
  {
    icon: "🧪",
    title: "Sandbox Mode",
    description:
      "Free-play mode to experiment with any flex property combinations.",
  },
];

const chapters = [
  { index: 1, name: "The Basics", levels: 3, emoji: "🎯" },
  { index: 2, name: "Main Axis", levels: 5, emoji: "↔️" },
  { index: 3, name: "Cross Axis", levels: 4, emoji: "↕️" },
  { index: 4, name: "Wrap & Gap", levels: 2, emoji: "🔀" },
  { index: 5, name: "Item Properties", levels: 4, emoji: "🧩" },
  { index: 6, name: "Real World", levels: 2, emoji: "🌍" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        {/* Hero */}
        <section
          className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 relative overflow-hidden"
          style={{ minHeight: "100vh" }}
        >
          {/* Background glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(124,106,247,0.15) 0%, transparent 70%)",
            }}
          />

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "rgba(124,106,247,0.1)",
              border: "1px solid rgba(124,106,247,0.3)",
              color: "var(--purple-light)",
            }}
          >
            <span>✦</span> 20 Interactive Challenges
          </div>

          <h1
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none"
            style={{ color: "var(--text)" }}
          >
            Learn Flexbox
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--purple), var(--cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              by Playing
            </span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Master CSS Flexbox through hands-on challenges. See axis
            visualization, get instant feedback, and understand{" "}
            <em>why</em> it works — not just how.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/play/1"
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 glow"
              style={{ background: "var(--purple)", color: "#fff" }}
            >
              Start Playing →
            </Link>
            <Link
              href="/sandbox"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:opacity-80"
              style={{
                background: "var(--card)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            >
              Open Sandbox
            </Link>
          </div>

          {/* Mini flex demo */}
          <div className="mt-16 w-full max-w-md">
            <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Live example
            </p>
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <code
                className="text-sm block mb-3"
                style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}
              >
                justify-content: space-between;
              </code>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "var(--surface)",
                  borderRadius: "8px",
                  padding: "12px",
                  height: "60px",
                }}
              >
                {["A", "B", "C", "D"].map((label, i) => (
                  <div
                    key={i}
                    className="rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{
                      width: 40,
                      height: 36,
                      background: ["#7c3aed", "#0891b2", "#be185d", "#c2410c"][i],
                      color: "#fff",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-24 max-w-5xl mx-auto w-full">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{ color: "var(--text)" }}
          >
            Better than Flexbox Froggy
          </h2>
          <p className="text-center mb-12" style={{ color: "var(--muted)" }}>
            We built what was missing from every other flexbox game.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chapters */}
        <section
          className="px-6 py-24"
          style={{ background: "var(--surface)" }}
        >
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: "var(--text)" }}
            >
              20 Levels. 6 Chapters.
            </h2>
            <p className="text-center mb-12" style={{ color: "var(--muted)" }}>
              From zero to flex master — step by step.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {chapters.map((ch) => (
                <div
                  key={ch.index}
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="text-2xl mb-2">{ch.emoji}</div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "var(--purple)" }}
                  >
                    Chapter {ch.index}
                  </div>
                  <div
                    className="font-bold mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    {ch.name}
                  </div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>
                    {ch.levels} levels
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32 text-center">
          <h2
            className="text-4xl font-black mb-6"
            style={{ color: "var(--text)" }}
          >
            Ready to flex? 💪
          </h2>
          <Link
            href="/play/1"
            className="inline-block px-10 py-5 rounded-xl font-bold text-xl transition-all hover:scale-105 glow"
            style={{ background: "var(--purple)", color: "#fff" }}
          >
            Start Level 1 →
          </Link>
        </section>

        <footer
          className="text-center py-8 text-sm"
          style={{
            color: "var(--muted)",
            borderTop: "1px solid var(--border)",
          }}
        >
          Built with ❤️ to make CSS learning actually fun.
        </footer>
      </main>
    </>
  );
}
