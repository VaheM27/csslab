"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

const TOTAL = 15;
const KEY = "csslab_media_progress";

export default function MediaCompletePage() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      setCompleted(Object.values(saved).filter(Boolean).length);
    } catch {}

    const fire = (opts: confetti.Options) =>
      confetti({ ...opts, disableForReducedMotion: true });
    setTimeout(() => {
      fire({ particleCount: 60, spread: 55, origin: { x: 0.2, y: 0.6 }, colors: ["#f43f5e","#fb923c","#fbbf24"] });
      fire({ particleCount: 60, spread: 55, origin: { x: 0.8, y: 0.6 }, colors: ["#f43f5e","#fb923c","#fbbf24"] });
    }, 200);
    setTimeout(() => {
      fire({ particleCount: 80, spread: 80, origin: { x: 0.5, y: 0.5 }, colors: ["#f43f5e","#fecdd3","#0ea5e9"] });
    }, 600);
  }, []);

  const handleShare = () => {
    const text = `🎉 I just completed all ${TOTAL} CSS @media query challenges on CSSLab! Try it yourself 👉 https://flexlab-jade.vercel.app/play/media`;
    if (navigator.share) {
      navigator.share({ text });
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-lg rounded-3xl p-10 text-center relative overflow-hidden"
        style={{ background: "var(--surface)", border: "2px solid rgba(244,63,94,0.3)", boxShadow: "0 0 60px rgba(244,63,94,0.15)" }}>
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
          style={{ background: "linear-gradient(90deg, #f43f5e, #fb923c, #f43f5e)" }} />

        <div className="text-6xl mb-4">🏆</div>

        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#f43f5e" }}>
          Certificate of Completion
        </div>

        <h1 className="text-3xl font-black mb-1" style={{ color: "var(--text)" }}>
          CSS @media Queries
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          You mastered all {TOTAL} responsive design challenges · {completed} solved
        </p>

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {["📱 Mobile", "🖥 Desktop", "📐 Breakpoints", "↔ Responsive", "🗂 Layout"].map((b) => (
            <div key={b} className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.25)" }}>
              {b}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-4 mb-6 text-left"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
            Skills Mastered
          </div>
          <div className="flex flex-wrap gap-2">
            {["@media", "max-width", "min-width", "breakpoints", "mobile-first", "flex-direction", "flex-wrap", "grid-template-columns", "responsive grid", "justify-content"].map(s => (
              <span key={s} className="text-xs px-2 py-0.5 rounded font-mono"
                style={{ background: "rgba(244,63,94,0.08)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-4 mb-6 text-sm font-semibold text-center"
          style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.15)", color: "var(--text)" }}>
          🎓 You completed all 3 CSS modules!
          <div className="text-xs font-normal mt-1" style={{ color: "var(--muted)" }}>
            Flexbox · Grid · @media — you know it all
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button onClick={handleShare}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#f43f5e", color: "#fff" }}>
            📤 Share Your Achievement
          </button>
          <Link href="/sandbox"
            className="w-full py-3 rounded-xl font-bold text-sm text-center transition-all hover:opacity-90 active:scale-95 block"
            style={{ background: "rgba(14,165,233,0.12)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.3)" }}>
            Try the Sandbox →
          </Link>
          <Link href="/play"
            className="w-full py-2.5 rounded-xl text-sm font-medium text-center block transition-all hover:opacity-70"
            style={{ color: "var(--muted)", border: "1px solid var(--border)" }}>
            Back to All Modules
          </Link>
        </div>
      </div>

      <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
        Built with ❤️ by{" "}
        <a href="https://vahemn.dev/" target="_blank" rel="noopener noreferrer"
          style={{ color: "var(--accent)" }}>
          Vahe Mnatsakanyan
        </a>
      </p>
    </div>
  );
}
