"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Level } from "@/app/data/levels";
import {
  parseCSSInput,
  checkSolution,
  lockedCSSToString,
} from "@/app/lib/cssParser";

interface Props {
  level: Level;
  totalLevels: number;
}

const CAMEL_TO_KEBAB: Record<string, string> = {
  flexDirection: "flex-direction",
  flexWrap: "flex-wrap",
  justifyContent: "justify-content",
  alignItems: "align-items",
  alignContent: "align-content",
  alignSelf: "align-self",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
  rowGap: "row-gap",
  columnGap: "column-gap",
};

function toInlineStyle(css: Record<string, string>): React.CSSProperties {
  return css as React.CSSProperties;
}

function FlexContainer({
  containerCSS,
  itemCSS = {},
  items,
  height,
  showAxis,
}: {
  containerCSS: Record<string, string>;
  itemCSS?: Record<number, Record<string, string>>;
  items: Level["items"];
  height: number;
  showAxis: boolean;
}) {
  const direction = (containerCSS.flexDirection ?? containerCSS["flex-direction"] ?? "row") as string;
  const isColumn = direction.includes("column");

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Axis overlay */}
      {showAxis && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Main axis arrow */}
          <div
            className="absolute flex items-center"
            style={
              isColumn
                ? { left: 8, top: 0, bottom: 0, flexDirection: "column", width: 2 }
                : { top: 8, left: 0, right: 0, height: 2 }
            }
          >
            <div
              style={{
                flex: 1,
                background: "rgba(5,150,105,0.5)",
                height: isColumn ? "100%" : 2,
                width: isColumn ? 2 : "100%",
              }}
            />
          </div>
          <span
            className="absolute text-xs font-mono font-bold px-1 rounded"
            style={{
              color: "var(--accent)",
              background: "rgba(255,255,255,0.9)",
              fontSize: 9,
              ...(isColumn ? { left: 12, top: 4 } : { left: 4, top: 12 }),
            }}
          >
            main
          </span>

          {/* Cross axis arrow */}
          <div
            className="absolute"
            style={
              isColumn
                ? { top: 8, left: 0, right: 0, height: 2 }
                : { right: 8, top: 0, bottom: 0, width: 2 }
            }
          >
            <div
              style={{
                flex: 1,
                background: "rgba(56,189,248,0.5)",
                height: isColumn ? 2 : "100%",
                width: isColumn ? "100%" : 2,
              }}
            />
          </div>
          <span
            className="absolute text-xs font-mono font-bold px-1 rounded"
            style={{
              color: "var(--axis-cross)",
              background: "rgba(255,255,255,0.9)",
              fontSize: 9,
              ...(isColumn ? { right: 4, top: 12 } : { right: 12, bottom: 4 }),
            }}
          >
            cross
          </span>
        </div>
      )}

      {/* Flex container */}
      <div
        className="w-full h-full rounded-lg overflow-hidden"
        style={{
          ...toInlineStyle(containerCSS),
          height,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: 8,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-md flex items-center justify-center font-bold text-sm shrink-0"
            style={{
              width: item.width ?? 56,
              height: item.height ?? 56,
              background: item.bg,
              color: "#fff",
              fontSize: item.label.length > 1 ? 11 : 14,
              ...toInlineStyle(itemCSS[i] ?? {}),
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function SuccessOverlay({
  onNext,
  isLast,
  explanation,
  levelId,
}: {
  onNext: () => void;
  isLast: boolean;
  explanation: string;
  levelId: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-xl p-6 text-center"
      style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="text-5xl mb-3"
      >
        🎉
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-black text-xl mb-2"
        style={{ color: "var(--success)" }}
      >
        Level Cleared!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm leading-relaxed mb-5 max-w-xs"
        style={{ color: "var(--muted)" }}
      >
        {explanation}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {isLast ? (
          <Link
            href="/play"
            className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={{ background: "var(--success)", color: "#fff" }}
          >
            🏆 All Done!
          </Link>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={{ background: "var(--success)", color: "#fff" }}
          >
            Next Level →
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function GameClient({ level, totalLevels }: Props) {
  const [userInput, setUserInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAxis, setShowAxis] = useState(true);
  const [shakeEditor, setShakeEditor] = useState(false);

  const parsed = parseCSSInput(userInput);
  const previewContainerCSS: Record<string, string> = {
    ...level.lockedCSS,
    ...parsed,
  };

  const previewItemCSS: Record<number, Record<string, string>> =
    level.editTarget === "container"
      ? {}
      : { [level.editTarget as number]: parsed };

  const targetItemCSS = level.targetItemCSS ?? {};

  const handleCheck = useCallback(() => {
    const ok = checkSolution(parsed, level.checkProps);
    if (ok) {
      setSolved(true);
      // Save progress to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem("flexlab_progress") ?? "{}");
        saved[level.id] = true;
        localStorage.setItem("flexlab_progress", JSON.stringify(saved));
      } catch {}
    } else {
      setShakeEditor(true);
      setTimeout(() => setShakeEditor(false), 500);
    }
  }, [parsed, level]);

  // Keyboard shortcut: Ctrl+Enter to check
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleCheck();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleCheck]);

  // Reset on level change
  useEffect(() => {
    setUserInput("");
    setSolved(false);
    setShowHint(false);
    setShakeEditor(false);
  }, [level.id]);

  const lockedStr = lockedCSSToString(level.lockedCSS);
  const isLast = level.id === totalLevels;

  return (
    <div className="flex flex-col h-screen" style={{ paddingTop: 73 }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/play"
            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "var(--text)" }}
          >
            ← Levels
          </Link>
          <div
            className="h-4 w-px"
            style={{ background: "var(--border)" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--accent)" }}
          >
            {level.chapter}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: "rgba(5,150,105,0.1)",
              color: "var(--accent-light)",
            }}
          >
            {level.id} / {totalLevels}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAxis(!showAxis)}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: showAxis
                ? "rgba(5,150,105,0.15)"
                : "var(--card)",
              color: showAxis ? "var(--accent-light)" : "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            {showAxis ? "Hide" : "Show"} Axes
          </button>
          <button
            onClick={() => setShowHint(true)}
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: "var(--card)",
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: info + editor */}
        <div
          className="w-80 shrink-0 flex flex-col overflow-y-auto"
          style={{
            background: "var(--surface)",
            borderRight: "1px solid var(--border)",
          }}
        >
          {/* Level info */}
          <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
            <h1
              className="font-black text-xl mb-3"
              style={{ color: "var(--text)" }}
            >
              {level.title}
            </h1>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
              dangerouslySetInnerHTML={{
                __html: level.description.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong style="color:var(--text)">$1</strong>'
                ).replace(
                  /`(.*?)`/g,
                  '<code style="color:var(--axis-cross);font-family:var(--font-mono);font-size:12px;background:rgba(56,189,248,0.1);padding:1px 4px;border-radius:4px">$1</code>'
                ),
              }}
            />
          </div>

          {/* Editor */}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              {level.editTarget === "container"
                ? "Container CSS"
                : `Item ${level.editorLabel ?? `#${(level.editTarget as number) + 1}`} CSS`}
            </div>

            {/* Locked (pre-applied) CSS */}
            {lockedStr && (
              <div
                className="rounded-lg p-3 text-xs"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                  opacity: 0.7,
                }}
              >
                <div className="text-xs mb-1 opacity-60">/* already applied */</div>
                {lockedStr.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            )}

            {/* User textarea */}
            <motion.div
              animate={shakeEditor ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex-1"
            >
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="/* type your CSS here */&#10;justify-content: center;"
                className="w-full h-48 p-4 rounded-lg text-sm resize-none outline-none transition-all"
                style={{
                  background: "var(--card)",
                  border: `1px solid ${shakeEditor ? "var(--error)" : "var(--border)"}`,
                  color: "var(--axis-cross)",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.8,
                }}
                spellCheck={false}
              />
            </motion.div>

            <button
              onClick={handleCheck}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Check (⌘↵)
            </button>

            {shakeEditor && (
              <p className="text-xs text-center" style={{ color: "var(--error)" }}>
                Not quite right — check your values!
              </p>
            )}
          </div>
        </div>

        {/* Right panel: target + preview */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 overflow-auto">
          {/* Target */}
          <div className="flex-1 flex flex-col gap-3">
            <div
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              🎯 Target
            </div>
            <FlexContainer
              containerCSS={{
                ...level.lockedCSS,
                ...level.targetContainerCSS,
              }}
              itemCSS={targetItemCSS}
              items={level.items}
              height={level.containerHeight}
              showAxis={showAxis}
            />
          </div>

          {/* Preview */}
          <div className="flex-1 flex flex-col gap-3">
            <div
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              ✏️ Yours
            </div>
            <div className="relative">
              <FlexContainer
                containerCSS={previewContainerCSS}
                itemCSS={previewItemCSS}
                items={level.items}
                height={level.containerHeight}
                showAxis={showAxis}
              />
              <AnimatePresence>
                {solved && (
                  <SuccessOverlay
                    explanation={level.explanation}
                    onNext={() => {
                      window.location.href = `/play/${level.id + 1}`;
                    }}
                    isLast={isLast}
                    levelId={level.id}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Hint modal */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setShowHint(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-6 max-w-sm w-full"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-2xl mb-3">💡</div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: "var(--text)" }}
              >
                Hint
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--muted)" }}
                dangerouslySetInnerHTML={{
                  __html: level.hint.replace(
                    /`(.*?)`/g,
                    '<code style="color:var(--axis-cross);font-family:var(--font-mono);font-size:12px;background:rgba(56,189,248,0.1);padding:1px 4px;border-radius:4px">$1</code>'
                  ),
                }}
              />
              <button
                onClick={() => setShowHint(false)}
                className="w-full py-2 rounded-lg text-sm font-semibold"
                style={{ background: "var(--surface)", color: "var(--text)" }}
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
