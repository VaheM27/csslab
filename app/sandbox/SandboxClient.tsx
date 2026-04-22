"use client";

import { useState } from "react";
import { parseCSSInput } from "@/app/lib/cssParser";

const DEFAULT_CSS = `display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 12px;`;

const ITEM_COLORS = [
  "#7c3aed",
  "#0891b2",
  "#be185d",
  "#c2410c",
  "#15803d",
  "#b45309",
  "#1d4ed8",
];

const SNIPPETS = [
  { label: "Center", css: "display: flex;\njustify-content: center;\nalign-items: center;" },
  { label: "Space Between", css: "display: flex;\njustify-content: space-between;\nalign-items: center;" },
  { label: "Column", css: "display: flex;\nflex-direction: column;\ngap: 8px;" },
  { label: "Wrap Grid", css: "display: flex;\nflex-wrap: wrap;\ngap: 12px;" },
  { label: "Navbar", css: "display: flex;\njustify-content: space-between;\nalign-items: center;\npadding: 0 16px;" },
];

const PROP_DOCS: [string, string, string[]][] = [
  ["flex-direction", "Direction of the main axis", ["row", "column", "row-reverse", "column-reverse"]],
  ["justify-content", "Main axis alignment", ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]],
  ["align-items", "Cross axis alignment", ["flex-start", "flex-end", "center", "stretch", "baseline"]],
  ["flex-wrap", "Whether items wrap", ["nowrap", "wrap", "wrap-reverse"]],
  ["gap", "Space between items", ["8px", "16px", "24px"]],
  ["align-content", "Multi-line cross axis", ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"]],
];

export default function SandboxClient() {
  const [css, setCss] = useState(DEFAULT_CSS);
  const [itemCount, setItemCount] = useState(5);
  const [showRef, setShowRef] = useState(true);

  const parsed = parseCSSInput(css) as React.CSSProperties;

  return (
    <div
      className="min-h-screen pt-20 flex flex-col"
      style={{ background: "var(--bg)" }}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Left: editor */}
        <div
          className="w-80 shrink-0 flex flex-col border-r"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
            <h1
              className="font-black text-xl mb-1"
              style={{ color: "var(--text)" }}
            >
              Sandbox
            </h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Experiment freely with any flex properties.
            </p>
          </div>

          {/* Quick snippets */}
          <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <div
              className="text-xs uppercase tracking-wider mb-2"
              style={{ color: "var(--muted)" }}
            >
              Quick Load
            </div>
            <div className="flex flex-wrap gap-2">
              {SNIPPETS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setCss(s.css)}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: "var(--card)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* CSS editor */}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div
              className="text-xs uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Container CSS
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="flex-1 p-4 rounded-lg text-sm resize-none outline-none"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--accent-light)",
                fontFamily: "var(--font-mono)",
                lineHeight: 1.8,
                minHeight: 200,
              }}
              spellCheck={false}
            />

            {/* Item count */}
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: "var(--muted)" }}>
                Items: {itemCount}
              </span>
              <input
                type="range"
                min={1}
                max={10}
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="flex-1 accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Right: preview + reference */}
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-auto">
          {/* Live preview */}
          <div>
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: "var(--muted)" }}
            >
              Live Preview
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                minHeight: 200,
                ...parsed,
              }}
            >
              {Array.from({ length: itemCount }, (_, i) => (
                <div
                  key={i}
                  className="rounded-lg flex items-center justify-center font-bold shrink-0"
                  style={{
                    width: 60,
                    height: 60,
                    background: ITEM_COLORS[i % ITEM_COLORS.length],
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Reference */}
          <div>
            <button
              className="flex items-center gap-2 text-sm font-semibold mb-3 transition-opacity hover:opacity-80"
              style={{ color: "var(--text)" }}
              onClick={() => setShowRef(!showRef)}
            >
              📖 Property Reference
              <span style={{ color: "var(--muted)" }}>{showRef ? "▲" : "▼"}</span>
            </button>
            {showRef && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROP_DOCS.map(([prop, desc, values]) => (
                  <div
                    key={prop}
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <code
                      className="text-sm font-bold block mb-1"
                      style={{ color: "var(--accent-light)", fontFamily: "var(--font-mono)" }}
                    >
                      {prop}
                    </code>
                    <p
                      className="text-xs mb-2"
                      style={{ color: "var(--muted)" }}
                    >
                      {desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {values.map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            const lines = css.split("\n").filter(
                              (l) => !l.includes(prop)
                            );
                            setCss([...lines, `${prop}: ${v};`].join("\n"));
                          }}
                          className="text-xs px-2 py-0.5 rounded transition-all hover:opacity-80"
                          style={{
                            background: "var(--surface)",
                            color: "var(--text)",
                            border: "1px solid var(--border)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
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
