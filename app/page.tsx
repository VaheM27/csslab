"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import { motion, type Variants } from "framer-motion";
import { ArrowLeftRight, LayoutGrid, Smartphone, Zap, Ruler, Lightbulb, Flame, Sparkles, FlaskConical, type LucideIcon } from "lucide-react";

const modules: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  colorDim: string;
  colorBorder: string;
  description: string;
  tags: string[];
  href: string;
  demo: { code: string; items: { label: string; color: string }[]; style: React.CSSProperties };
}[] = [
  {
    icon: ArrowLeftRight,
    title: "CSS Flexbox",
    subtitle: "25 levels · 7 chapters",
    color: "#0ea5e9",
    colorDim: "rgba(14,165,233,0.08)",
    colorBorder: "rgba(14,165,233,0.15)",
    description: "One-dimensional layouts. Master rows, columns, alignment and spacing.",
    tags: ["justify-content", "align-items", "flex-wrap", "gap"],
    href: "/play/1",
    demo: {
      code: "justify-content: space-between;",
      items: [
        { label: "A", color: "#8b5cf6" },
        { label: "B", color: "#0ea5e9" },
        { label: "C", color: "#f43f5e" },
      ],
      style: { display: "flex", justifyContent: "space-between" },
    },
  },
  {
    icon: LayoutGrid,
    title: "CSS Grid",
    subtitle: "20 levels · 6 chapters",
    color: "#8b5cf6",
    colorDim: "rgba(139,92,246,0.08)",
    colorBorder: "rgba(139,92,246,0.15)",
    description: "Two-dimensional layouts. Rows and columns at the same time.",
    tags: ["grid-template-columns", "span", "place-items", "minmax()"],
    href: "/play/grid/1",
    demo: {
      code: "grid-template-columns: repeat(3, 1fr);",
      items: [
        { label: "A", color: "#8b5cf6" },
        { label: "B", color: "#0ea5e9" },
        { label: "C", color: "#f43f5e" },
        { label: "D", color: "#f97316" },
        { label: "E", color: "#10b981" },
        { label: "F", color: "#a855f7" },
      ],
      style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" },
    },
  },
  {
    icon: Smartphone,
    title: "@media Queries",
    subtitle: "15 levels · 4 chapters",
    color: "#f43f5e",
    colorDim: "rgba(244,63,94,0.08)",
    colorBorder: "rgba(244,63,94,0.15)",
    description: "Responsive design. Make your layouts adapt to any screen size.",
    tags: ["max-width", "min-width", "breakpoints", "mobile-first"],
    href: "/play/media/1",
    demo: {
      code: "@media (max-width: 600px) { flex-direction: column; }",
      items: [
        { label: "📱", color: "#f43f5e" },
        { label: "🖥", color: "#8b5cf6" },
      ],
      style: { display: "flex", flexDirection: "column", gap: "8px" },
    },
  },
];

const features: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Zap,          title: "Live Preview",         description: "See your CSS applied as you type — no refresh, no guessing." },
  { icon: Ruler,        title: "Visual Explanations",  description: "Axis overlays, grid lines, and breakpoint simulations make it click." },
  { icon: Lightbulb,    title: "Why It Works",          description: "Every level ends with a clear explanation of the concept, not just the answer." },
  { icon: Flame,        title: "Progress & Streaks",   description: "Track which levels you've completed and build a learning streak." },
  { icon: Sparkles,     title: "Satisfying Feedback",  description: "Confetti, sounds, and animations make every solved level feel good." },
  { icon: FlaskConical, title: "Sandbox Mode",         description: "Free-play to experiment with Flex, Grid, and @media — no pressure." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">

        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-44 pb-28 overflow-hidden"
          style={{ minHeight: "100vh" }}>
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(14,165,233,0.07) 0%, transparent 65%)" }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 50% at 80% 70%, rgba(139,92,246,0.05) 0%, transparent 60%)" }} />

          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8"
            style={{ background: "var(--accent-dim)", border: "1px solid var(--border-accent)", color: "var(--accent)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            60 Interactive Challenges · 3 CSS Topics
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-5"
            style={{ color: "var(--text)" }}>
            Learn CSS
            <br />
            <span style={{ color: "var(--accent)" }}>by Playing</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: "var(--muted)" }}>
            Master <strong style={{ color: "var(--text)" }}>Flexbox</strong>, <strong style={{ color: "var(--text)" }}>CSS Grid</strong>, and <strong style={{ color: "var(--text)" }}>@media queries</strong> through hands-on challenges. Live previews and real explanations — not just the answer, <em>the why</em>.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 items-center">
            <Link href="/play"
              className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-105 hover:opacity-90 glow-accent"
              style={{ background: "var(--accent)", color: "#fff" }}>
              Start Playing →
            </Link>
            <Link href="/sandbox"
              className="px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-80"
              style={{ background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              Open Sandbox
            </Link>
          </motion.div>

          {/* Floating stats */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex gap-6 flex-wrap justify-center">
            {[
              { n: "60", label: "Levels" },
              { n: "17", label: "Chapters" },
              { n: "3", label: "CSS Topics" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-3xl font-black" style={{ color: "var(--accent)" }}>{s.n}</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Modules ── */}
        <section className="px-6 py-24" style={{ background: "var(--bg)" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.p variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-widest text-center mb-3"
                style={{ color: "var(--accent)" }}>
                What you'll learn
              </motion.p>
              <motion.h2 variants={fadeUp}
                className="text-3xl md:text-4xl font-black text-center mb-14"
                style={{ color: "var(--text)" }}>
                Three CSS Superpowers
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {modules.map((mod, idx) => (
                  <motion.div key={mod.title}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="rounded-2xl p-6 flex flex-col gap-4 cursor-pointer"
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${mod.colorBorder}`,
                      boxShadow: "var(--shadow-sm)",
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: mod.colorDim, border: `1px solid ${mod.colorBorder}` }}>
                        <mod.icon size={20} color={mod.color} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg leading-tight" style={{ color: "var(--text)" }}>{mod.title}</h3>
                        <p className="text-xs" style={{ color: mod.color }}>{mod.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{mod.description}</p>

                    {/* Live mini demo */}
                    <div className="rounded-xl p-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                      <code className="text-xs block mb-2" style={{ color: mod.color, fontFamily: "var(--font-mono)" }}>
                        {mod.demo.code.length > 40 ? mod.demo.code.slice(0, 37) + "..." : mod.demo.code}
                      </code>
                      <div style={{ ...(mod.demo.style as React.CSSProperties), padding: "8px", borderRadius: "8px", background: "var(--card)", minHeight: 52 }}>
                        {mod.demo.items.map((item, i) => (
                          <div key={i} className="rounded flex items-center justify-center font-bold text-xs"
                            style={{ width: 36, height: 36, background: item.color, color: "#fff", flexShrink: 0 }}>
                            {item.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {mod.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{ background: mod.colorDim, color: mod.color }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link href={mod.href}
                      className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm text-center transition-all hover:opacity-90 active:scale-95"
                      style={{ background: mod.color, color: "#fff" }}>
                      Start {mod.title} →
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="px-6 py-24" style={{ background: "var(--surface)" }}>
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.p variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-widest text-center mb-3"
                style={{ color: "var(--accent)" }}>
                Why CSSLab
              </motion.p>
              <motion.h2 variants={fadeUp}
                className="text-3xl font-black text-center mb-12"
                style={{ color: "var(--text)" }}>
                Better than any CSS game
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((f, i) => (
                  <motion.div key={f.title} variants={fadeUp}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="rounded-2xl p-5 transition-all"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", cursor: "default" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: "var(--accent-dim)", border: "1px solid var(--border-accent)" }}>
                      <f.icon size={18} color="var(--accent)" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold mb-1.5" style={{ color: "var(--text)" }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 py-32 text-center" style={{ background: "var(--bg)" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}>
              Ready?
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "var(--text)" }}>
              Start learning CSS
              <br />
              <span style={{ color: "var(--accent)" }}>the fun way</span>
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-lg mb-10 max-w-md mx-auto"
              style={{ color: "var(--muted)" }}>
              No account needed. No install. Just open and play.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/play/1"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:opacity-90 glow-accent"
                style={{ background: "var(--accent)", color: "#fff" }}>
                Flexbox: Level 1 →
              </Link>
              <Link href="/play/grid/1"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:opacity-90"
                style={{ background: "#8b5cf6", color: "#fff" }}>
                Grid: Level 1 →
              </Link>
              <Link href="/play/media/1"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:opacity-90"
                style={{ background: "#f43f5e", color: "#fff" }}>
                @media: Level 1 →
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <footer className="text-center py-6 text-sm"
          style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}>
          Built with ❤️ by{" "}
          <a href="https://vahemn.dev/" target="_blank" rel="noopener noreferrer"
            className="font-semibold transition-all hover:opacity-70"
            style={{ color: "var(--accent)" }}>
            Vahe Mnatsakanyan
          </a>
          {" "}· <span style={{ color: "var(--accent)" }}>CSSLab</span>
        </footer>
      </main>
    </>
  );
}
