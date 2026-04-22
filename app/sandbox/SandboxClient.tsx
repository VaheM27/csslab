"use client";

import { useState, useMemo } from "react";
import { parseCSSInput, getCSSAtViewport } from "@/app/lib/cssParser";

type Mode = "flex" | "grid" | "media";

// ─── Snippets ────────────────────────────────────────────────────────────────
const SNIPPETS: Record<Mode, { label: string; css: string }[]> = {
  flex: [
    { label: "Center", css: "display: flex;\njustify-content: center;\nalign-items: center;" },
    { label: "Space Between", css: "display: flex;\njustify-content: space-between;\nalign-items: center;" },
    { label: "Column", css: "display: flex;\nflex-direction: column;\ngap: 8px;" },
    { label: "Wrap Grid", css: "display: flex;\nflex-wrap: wrap;\ngap: 12px;" },
    { label: "Navbar", css: "display: flex;\njustify-content: space-between;\nalign-items: center;\npadding: 0 16px;" },
  ],
  grid: [
    { label: "3 Columns", css: "display: grid;\ngrid-template-columns: 1fr 1fr 1fr;\ngap: 12px;" },
    { label: "Sidebar", css: "display: grid;\ngrid-template-columns: 200px 1fr;\ngap: 16px;" },
    { label: "Auto-Fill", css: "display: grid;\ngrid-template-columns: repeat(auto-fill, minmax(80px, 1fr));\ngap: 12px;" },
    { label: "Auto-Fit", css: "display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(100px, 1fr));\ngap: 12px;" },
    { label: "Dense", css: "display: grid;\ngrid-template-columns: repeat(4, 1fr);\ngrid-auto-rows: 60px;\ngap: 8px;" },
  ],
  media: [
    { label: "Mobile Stack", css: "/* base: flex row */\n\n@media (max-width: 600px) {\n  flex-direction: column;\n}" },
    { label: "Desktop Grid", css: "/* base: flex column */\n\n@media (min-width: 768px) {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}" },
    { label: "Responsive Gap", css: "@media (max-width: 480px) {\n  gap: 4px;\n}" },
    { label: "Row Reverse", css: "@media (max-width: 560px) {\n  flex-direction: row-reverse;\n}" },
  ],
};

// ─── Property docs ────────────────────────────────────────────────────────────
const PROP_DOCS: Record<Mode, [string, string, string[]][]> = {
  flex: [
    ["flex-direction", "Main axis direction", ["row", "column", "row-reverse", "column-reverse"]],
    ["justify-content", "Main axis alignment", ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]],
    ["align-items", "Cross axis alignment", ["flex-start", "flex-end", "center", "stretch", "baseline"]],
    ["flex-wrap", "Item wrapping", ["nowrap", "wrap", "wrap-reverse"]],
    ["gap", "Space between items", ["4px", "8px", "16px", "24px"]],
    ["align-content", "Multi-line cross axis", ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"]],
  ],
  grid: [
    ["grid-template-columns", "Column track sizes", ["1fr 1fr", "repeat(3, 1fr)", "200px 1fr", "repeat(auto-fill, minmax(80px, 1fr))"]],
    ["grid-template-rows", "Row track sizes", ["auto", "repeat(3, 60px)", "100px 1fr"]],
    ["gap", "Space between tracks", ["4px", "8px", "16px"]],
    ["grid-auto-rows", "Implicit row height", ["60px", "80px", "100px", "minmax(60px, auto)"]],
    ["grid-auto-flow", "Auto-placement direction", ["row", "column", "dense", "row dense"]],
    ["place-items", "Align + justify items", ["center", "start", "end", "stretch"]],
  ],
  media: [
    ["max-width breakpoint", "Applies on small screens", ["(max-width: 480px)", "(max-width: 600px)", "(max-width: 768px)"]],
    ["min-width breakpoint", "Applies on large screens", ["(min-width: 640px)", "(min-width: 768px)", "(min-width: 1024px)"]],
    ["flex-direction", "Stack direction inside query", ["column", "row", "row-reverse", "column-reverse"]],
    ["grid-template-columns", "Grid inside query", ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]],
    ["display", "Switch layout type", ["flex", "grid", "block"]],
  ],
};

const ITEM_COLORS = ["#8b5cf6","#0ea5e9","#f43f5e","#f97316","#10b981","#a855f7","#06b6d4","#ec4899"];

const DEFAULTS: Record<Mode, string> = {
  flex: "display: flex;\njustify-content: center;\nalign-items: center;\ngap: 12px;",
  grid: "display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 12px;",
  media: "@media (max-width: 600px) {\n  flex-direction: column;\n}",
};

const BASE_CSS: Record<Mode, Record<string, string>> = {
  flex: {},
  grid: {},
  media: { display: "flex", flexDirection: "row", gap: "12px", alignItems: "center" },
};

const MODE_COLORS: Record<Mode, string> = {
  flex: "#0ea5e9",
  grid: "#8b5cf6",
  media: "#f43f5e",
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SandboxClient() {
  const [mode, setMode] = useState<Mode>("flex");
  const [css, setCss] = useState(DEFAULTS.flex);
  const [itemCount, setItemCount] = useState(5);
  const [showRef, setShowRef] = useState(true);

  const accentColor = MODE_COLORS[mode];

  const parsed = useMemo(() => {
    if (mode === "media") return BASE_CSS.media;
    return parseCSSInput(css) as React.CSSProperties;
  }, [css, mode]);

  const mobileCss = useMemo(() => {
    if (mode !== "media") return null;
    return getCSSAtViewport(css, 375, BASE_CSS.media);
  }, [css, mode]);

  const desktopCss = useMemo(() => {
    if (mode !== "media") return null;
    return getCSSAtViewport(css, 1024, BASE_CSS.media);
  }, [css, mode]);

  const handleModeChange = (m: Mode) => {
    setMode(m);
    setCss(DEFAULTS[m]);
  };

  const applyProp = (prop: string, val: string) => {
    if (mode === "media") {
      setCss(prev => prev + `\n/* ${prop}: ${val}; */`);
      return;
    }
    const lines = css.split("\n").filter(l => !l.trim().startsWith(prop));
    setCss([...lines, `${prop}: ${val};`].join("\n"));
  };

  const items = Array.from({ length: itemCount }, (_, i) => i);

  return (
    <div className="flex flex-col" style={{ minHeight: "100dvh", paddingTop: 72, background: "var(--bg)" }}>

      {/* Mode tabs */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 shrink-0"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        {(["flex", "grid", "media"] as Mode[]).map(m => (
          <button key={m}
            onClick={() => handleModeChange(m)}
            className="px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={{
              background: mode === m ? accentColor : "var(--card)",
              color: mode === m ? "#fff" : "var(--muted)",
              border: `1px solid ${mode === m ? accentColor : "var(--border)"}`,
            }}>
            {m === "flex" ? "↔ Flexbox" : m === "grid" ? "⬛ Grid" : "📱 @media"}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">

        {/* Editor panel */}
        <div className="order-2 lg:order-1 lg:w-80 xl:w-96 shrink-0 flex flex-col"
          style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>

          <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h1 className="font-black text-lg mb-0.5" style={{ color: "var(--text)" }}>Sandbox</h1>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {mode === "flex" ? "Experiment with CSS Flexbox freely."
                : mode === "grid" ? "Experiment with CSS Grid freely."
                : "Write @media rules and see mobile vs desktop side-by-side."}
            </p>
          </div>

          {/* Quick snippets */}
          <div className="p-3 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
              Quick Load
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SNIPPETS[mode].map(s => (
                <button key={s.label} onClick={() => setCss(s.css)}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "var(--card)", color: "var(--text)", border: "1px solid var(--border)" }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* CSS editor */}
          <div className="p-4 flex flex-col gap-3 flex-1">
            {mode === "media" && (
              <div className="rounded-lg p-3 text-xs"
                style={{ background: "var(--code-bg)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", color: "var(--muted)", opacity: 0.8 }}>
                {Object.entries(BASE_CSS.media).map(([k, v]) => (
                  <div key={k}>{k.replace(/([A-Z])/g, '-$1').toLowerCase()}: {v};</div>
                ))}
              </div>
            )}
            <div className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              {mode === "media" ? "Your @media Rule" : "Container CSS"}
            </div>
            <textarea value={css} onChange={e => setCss(e.target.value)}
              className="flex-1 p-3 rounded-lg text-sm resize-none outline-none"
              style={{
                background: "var(--code-bg)",
                border: `1.5px solid ${accentColor}40`,
                color: accentColor,
                fontFamily: "var(--font-mono)",
                lineHeight: 1.8,
                minHeight: 140,
              }}
              spellCheck={false} />

            {/* Item count (not for media mode) */}
            {mode !== "media" && (
              <div className="flex items-center gap-3">
                <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>Items: {itemCount}</span>
                <input type="range" min={1} max={9} value={itemCount}
                  onChange={e => setItemCount(Number(e.target.value))}
                  className="flex-1"
                  style={{ accentColor }} />
              </div>
            )}
          </div>
        </div>

        {/* Preview + Reference */}
        <div className="order-1 lg:order-2 flex-1 p-4 sm:p-6 overflow-auto">

          {/* ── FLEX / GRID SINGLE PREVIEW ─────────────────────────── */}
          {mode !== "media" && (
            <>
              <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
                Live Preview
              </div>
              <div className="rounded-2xl p-4 mb-6"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${accentColor}30`,
                  minHeight: 200,
                  ...(parsed as React.CSSProperties),
                }}>
                {items.map(i => (
                  <div key={i} className="rounded-lg flex items-center justify-center font-bold shrink-0"
                    style={{ width: 60, height: 60, background: ITEM_COLORS[i % ITEM_COLORS.length], color: "#fff", fontSize: 14 }}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── MEDIA DUAL PREVIEW ────────────────────────────────── */}
          {mode === "media" && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-2">
                {[
                  { label: "📱 Mobile (375px)", css: mobileCss },
                  { label: "🖥 Desktop (1024px)", css: desktopCss },
                ].map(({ label, css: previewCss }) => (
                  <div key={label}>
                    <div className="text-xs font-semibold mb-1.5" style={{ color: "#f43f5e" }}>{label}</div>
                    <div className="rounded-xl p-3 min-h-[140px]"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid rgba(244,63,94,0.2)",
                        ...(previewCss as React.CSSProperties ?? {}),
                      }}>
                      {[0,1,2].map(i => (
                        <div key={i} className="rounded-lg flex items-center justify-center font-bold shrink-0"
                          style={{ width: 52, height: 52, background: ITEM_COLORS[i % ITEM_COLORS.length], color: "#fff", fontSize: 14 }}>
                          {["A","B","C"][i]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-3 mb-6 text-xs"
                style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                <strong style={{ color: "var(--text)" }}>Base CSS:</strong> display:flex, flex-direction:row, gap:12px —
                write @media rules to change the layout at each breakpoint.
              </div>
            </>
          )}

          {/* Property Reference */}
          <div>
            <button onClick={() => setShowRef(r => !r)}
              className="flex items-center gap-2 text-sm font-semibold mb-3 transition-opacity hover:opacity-80"
              style={{ color: "var(--text)" }}>
              📖 Property Reference
              <span style={{ color: "var(--muted)" }}>{showRef ? "▲" : "▼"}</span>
            </button>
            {showRef && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PROP_DOCS[mode].map(([prop, desc, values]) => (
                  <div key={prop} className="rounded-xl p-4"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <code className="text-sm font-bold block mb-1"
                      style={{ color: accentColor, fontFamily: "var(--font-mono)" }}>
                      {prop}
                    </code>
                    <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>{desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {values.map(v => (
                        <button key={v} onClick={() => applyProp(prop, v)}
                          className="text-xs px-2 py-0.5 rounded transition-all hover:opacity-80"
                          style={{
                            background: "var(--surface)", color: "var(--text)",
                            border: "1px solid var(--border)", fontFamily: "var(--font-mono)",
                          }}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
