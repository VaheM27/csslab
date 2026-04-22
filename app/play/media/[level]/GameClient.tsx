"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Link from "next/link";
import { MediaLevel } from "@/app/data/mediaLevels";
import { checkMediaSolution, getCSSAtViewport, lockedCSSToString } from "@/app/lib/cssParser";

interface Props { level: MediaLevel; totalLevels: number; }

function playSuccess() {
  try {
    const ctx = new AudioContext();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = "sine";
      const t = ctx.currentTime + i * 0.13;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t); osc.stop(t + 0.4);
    });
  } catch {}
}
function playError() {
  try {
    const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "square"; osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.12, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  } catch {}
}

// ─── Preview box ─────────────────────────────────────────────────────────────
function PreviewBox({
  css, items, height, label, isTarget,
}: {
  css: Record<string, string>;
  items: MediaLevel["items"];
  height: number;
  label: string;
  isTarget: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
        style={{ color: isTarget ? "var(--muted)" : "var(--accent)" }}>
        {isTarget ? "🎯" : "✏️"} {label}
      </div>
      <div className="w-full rounded-xl"
        style={{
          ...(css as React.CSSProperties),
          minHeight: height,
          background: "var(--card)",
          border: `1px solid ${isTarget ? "var(--border)" : "var(--border-accent)"}`,
          padding: 10,
          boxShadow: "var(--shadow-sm)",
        }}>
        {items.map((item, i) => (
          <div key={i} className="rounded-lg flex items-center justify-center font-bold shrink-0"
            style={{ width: 52, height: 52, background: item.bg, color: "#fff", fontSize: 14 }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Chapter progress ────────────────────────────────────────────────────────
function ChapterProgress({ level, progress }: { level: MediaLevel; progress: Record<string, boolean> }) {
  const ranges: Record<number, [number, number]> = { 1: [1, 3], 2: [4, 7], 3: [8, 10], 4: [11, 15] };
  const [start, end] = ranges[level.chapterIndex] ?? [level.id, level.id];
  const total = end - start + 1;
  const posInChapter = level.id - start + 1;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#f43f5e" }}>
        {level.chapter}
      </span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="rounded-full transition-all"
            style={{
              width: i + 1 === posInChapter ? 20 : 8, height: 8,
              background: progress[start + i] ? "#f43f5e" : i + 1 === posInChapter ? "#fca5a5" : "var(--border)",
            }} />
        ))}
      </div>
    </div>
  );
}

// ─── Success Overlay ─────────────────────────────────────────────────────────
function SuccessOverlay({ onNext, isLast, explanation, streak }: {
  onNext: () => void; isLast: boolean; explanation: string; streak: number;
}) {
  const rich = explanation
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>')
    .replace(/`(.*?)`/g, '<code style="color:#f43f5e;font-family:var(--font-mono);font-size:11px;background:rgba(244,63,94,0.08);padding:1px 5px;border-radius:4px">$1</code>');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
      <motion.div initial={{ scale: 0.88, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-3xl p-8 max-w-sm w-full text-center"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="font-black text-2xl mb-1" style={{ color: "#f43f5e" }}>Level Cleared!</h3>
        {streak > 1 && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ background: "rgba(251,191,36,0.15)", color: "#d97706", border: "1px solid rgba(251,191,36,0.3)" }}>
            🔥 {streak} level streak!
          </div>
        )}
        <p className="text-sm leading-relaxed mb-6 mt-3" style={{ color: "var(--muted)" }}
          dangerouslySetInnerHTML={{ __html: rich }} />
        <div className="flex flex-col gap-2">
          {isLast ? (
            <Link href="/play/media/complete"
              className="w-full py-3.5 rounded-xl font-bold text-center block"
              style={{ background: "#f43f5e", color: "#fff" }}>
              🏆 Claim Your Certificate!
            </Link>
          ) : (
            <button onClick={onNext}
              className="w-full py-3.5 rounded-xl font-bold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#f43f5e", color: "#fff" }}>
              Next Level →
            </button>
          )}
          <Link href="/play/media"
            className="w-full py-2.5 rounded-xl text-sm font-medium text-center block"
            style={{ color: "var(--muted)", border: "1px solid var(--border)" }}>
            Back to Levels
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
      style={{ background: "var(--text)", color: "var(--surface)" }}>
      {message}
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MediaGameClient({ level, totalLevels }: Props) {
  const [userInput, setUserInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simulate mobile (375px) and desktop (1024px) previews
  const MOBILE_W = 375;
  const DESKTOP_W = 1024;

  const yoursMobileCSS = getCSSAtViewport(userInput, MOBILE_W, level.baseCSS);
  const yoursDesktopCSS = getCSSAtViewport(userInput, DESKTOP_W, level.baseCSS);

  // Target CSS:
  // max-width → media applies at MOBILE, desktop stays as base
  // min-width → media applies at DESKTOP, mobile stays as base
  const isMinWidth = level.breakpointType === "min-width";
  const targetMobileCSS = isMinWidth
    ? level.baseCSS
    : { ...level.baseCSS, ...level.targetMobileCSS };
  const targetDesktopCSS = isMinWidth
    ? { ...level.baseCSS, ...level.targetMobileCSS }
    : level.baseCSS;

  const isLast = level.id === totalLevels;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("csslab_media_progress") ?? "{}");
      setProgress(saved);
      let s = 0;
      for (let i = level.id - 1; i >= 1; i--) { if (saved[i]) s++; else break; }
      setStreak(s);
    } catch {}
  }, [level.id]);

  useEffect(() => {
    setUserInput(""); setSolved(false); setShowHint(false); setShake(false); setWrongAttempts(0);
  }, [level.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleCheck(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleCheck = useCallback(() => {
    const ok = checkMediaSolution(userInput, level.checkProps, level.breakpointType);
    if (ok) {
      setSolved(true); playSuccess();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#f43f5e", "#fb923c", "#f59e0b", "#0ea5e9"] });
      try {
        const saved = JSON.parse(localStorage.getItem("csslab_media_progress") ?? "{}");
        saved[level.id] = true;
        localStorage.setItem("csslab_media_progress", JSON.stringify(saved));
        let s = 1;
        for (let i = level.id - 1; i >= 1; i--) { if (saved[i]) s++; else break; }
        setStreak(s); setProgress(saved);
      } catch {}
    } else {
      playError(); setShake(true); setTimeout(() => setShake(false), 450);
      setWrongAttempts(n => n + 1);
    }
  }, [userInput, level]);

  const handleShare = () => {
    const url = window.location.href;
    const fallback = () => {
      try {
        const el = document.createElement("textarea"); el.value = url;
        el.style.cssText = "position:fixed;opacity:0;top:0;left:0";
        document.body.appendChild(el); el.select();
        const ok = document.execCommand("copy"); document.body.removeChild(el);
        setToast(ok ? "🔗 Link copied!" : "❌ Copy failed");
      } catch { setToast("❌ Copy failed"); }
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => setToast("🔗 Link copied!")).catch(fallback);
    } else { fallback(); }
  };

  const richDesc = level.description
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>')
    .replace(/`(.*?)`/g, '<code style="color:#f43f5e;font-family:var(--font-mono);font-size:11px;background:rgba(244,63,94,0.08);padding:1px 5px;border-radius:4px">$1</code>');

  const baseStr = lockedCSSToString(level.baseCSS);

  const placeholder = level.breakpointType === "max-width"
    ? `@media (max-width: ${level.breakpoint}px) {\n  /* your styles here */\n}`
    : `@media (min-width: ${level.breakpoint}px) {\n  /* your styles here */\n}`;

  return (
    <div className="flex flex-col" style={{ minHeight: "100dvh", paddingTop: 72 }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 shrink-0"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
        <div className="flex items-center gap-2 min-w-0">
          <Link href="/play/media" className="text-sm opacity-50 hover:opacity-100 shrink-0" style={{ color: "var(--text)" }}>←<span className="hidden sm:inline"> @media</span></Link>
          <div className="w-px h-4 shrink-0" style={{ background: "var(--border)" }} />
          <ChapterProgress level={level} progress={progress} />
          <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
            style={{ background: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" }}>
            {level.id}/{totalLevels}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handleShare}
            className="text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ background: "var(--card)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            <span>📤</span><span className="hidden sm:inline"> Share</span>
          </button>
          <button onClick={() => setShowHint(true)}
            className="text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ background: "var(--card)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            <span>💡</span><span className="hidden sm:inline"> Hint</span>
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">

        {/* Left panel — editor (below previews on mobile) */}
        <div className="order-2 lg:order-1 lg:w-80 xl:w-96 shrink-0 flex flex-col"
          style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
          <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs font-semibold mb-1" style={{ color: "#f43f5e" }}>📱 @media</div>
            <h1 className="font-black text-xl mb-2" style={{ color: "var(--text)" }}>{level.title}</h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}
              dangerouslySetInnerHTML={{ __html: richDesc }} />
          </div>

          <div className="p-4 flex flex-col gap-3 flex-1">
            {/* Base CSS (always applied) */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
                Base CSS (always applied)
              </div>
              <div className="rounded-lg p-3 text-xs"
                style={{ background: "var(--code-bg)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", color: "var(--muted)", opacity: 0.75 }}>
                {baseStr.split("\n").map((l, i) => <div key={i}>{l}</div>)}
              </div>
            </div>

            {/* Textarea for @media rule */}
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Your @media Rule
            </div>
            <motion.div animate={shake ? { x: [0, -7, 7, -7, 7, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }} className="relative flex-1">
              <textarea ref={textareaRef} value={userInput} onChange={e => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full p-4 rounded-xl text-sm resize-none outline-none transition-all"
                style={{
                  minHeight: 120,
                  background: "var(--code-bg)",
                  border: `1.5px solid ${shake ? "var(--error)" : "rgba(244,63,94,0.3)"}`,
                  color: "#f43f5e", fontFamily: "var(--font-mono)", lineHeight: 1.8,
                }}
                spellCheck={false} />
            </motion.div>

            <button onClick={handleCheck}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#f43f5e", color: "#fff", boxShadow: "var(--shadow-md)" }}>
              Check ⌘↵
            </button>
            {shake && <p className="text-xs text-center" style={{ color: "var(--error)" }}>Check your @media condition and properties!</p>}
            {wrongAttempts >= 3 && !solved && (
              <button onClick={() => { setUserInput(level.solution); textareaRef.current?.focus(); }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: "rgba(251,191,36,0.1)", color: "#d97706", border: "1px solid rgba(251,191,36,0.3)" }}>
                👁️ Show Answer
              </button>
            )}
          </div>
        </div>

        {/* Right: 2×2 preview grid (shown first on mobile) */}
        <div className="order-1 lg:order-2 flex-1 p-3 sm:p-5 overflow-auto" style={{ background: "var(--bg)" }}>
          {/* Viewport labels — highlight which side the breakpoint fires on */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-2">
            {[
              { label: `📱 Mobile`, labelFull: `📱 Mobile (${MOBILE_W}px)`, active: !isMinWidth },
              { label: `🖥 Desktop`, labelFull: `🖥 Desktop (${DESKTOP_W}px)`, active: isMinWidth },
            ].map(({ label, labelFull, active }) => (
              <div key={labelFull} className="text-xs font-bold text-center px-2 py-1.5 rounded-full"
                style={{
                  background: active ? "rgba(244,63,94,0.08)" : "var(--card)",
                  color: active ? "#f43f5e" : "var(--muted)",
                  border: `1px solid ${active ? "rgba(244,63,94,0.2)" : "var(--border)"}`,
                }}>
                <span className="sm:hidden">{label}</span>
                <span className="hidden sm:inline">{labelFull}</span>
                {active && <span className="hidden sm:inline"> ← media fires here</span>}
                {active && <span className="sm:hidden"> ✦</span>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <PreviewBox css={targetMobileCSS} items={level.items} height={level.containerHeight} label="Target" isTarget={true} />
            <PreviewBox css={targetDesktopCSS} items={level.items} height={level.containerHeight} label="Target" isTarget={true} />
            <PreviewBox css={yoursMobileCSS} items={level.items} height={level.containerHeight} label="Yours" isTarget={false} />
            <PreviewBox css={yoursDesktopCSS} items={level.items} height={level.containerHeight} label="Yours" isTarget={false} />
          </div>

          {/* Explanation row */}
          <div className="mt-4 rounded-xl p-4 text-xs"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
            <span className="font-semibold" style={{ color: "var(--text)" }}>How it works: </span>
            The top row shows the <strong>target</strong> at each viewport.
            The bottom row shows <strong>your output</strong> — match them!
            Your @media rule applies automatically at the correct size.
          </div>
        </div>
      </div>

      {/* Hint modal */}
      <AnimatePresence>
        {showHint && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setShowHint(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-6 max-w-sm w-full"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}
              onClick={e => e.stopPropagation()}>
              <div className="text-2xl mb-3">💡</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text)" }}>Hint</h3>
              <pre className="text-sm leading-relaxed mb-4 whitespace-pre-wrap"
                style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                {level.hint}
              </pre>
              <button onClick={() => setShowHint(false)}
                className="w-full py-2 rounded-lg text-sm font-semibold"
                style={{ background: "#f43f5e", color: "#fff" }}>Got it!</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{toast && <Toast message={toast} onDone={() => setToast(null)} />}</AnimatePresence>
      <AnimatePresence>
        {solved && (
          <SuccessOverlay
            explanation={level.explanation}
            onNext={() => { window.location.href = `/play/media/${level.id + 1}`; }}
            isLast={isLast}
            streak={streak}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
