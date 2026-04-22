"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Level, TOTAL_LEVELS } from "@/app/data/levels";

const CHAPTER_COLORS: Record<number, string> = {
  1: "#7c3aed",
  2: "#0ea5e9",
  3: "#f43f5e",
  4: "#f97316",
  5: "#10b981",
  6: "#a855f7",
};

export default function LevelSelectClient({ levels }: { levels: Level[] }) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      setProgress(JSON.parse(localStorage.getItem("flexlab_progress") ?? "{}"));
      setStreak(Number(localStorage.getItem("flexlab_streak") ?? "0"));
    } catch {}
  }, []);

  const chapters = Array.from(new Set(levels.map((l) => l.chapterIndex))).sort();
  const totalCompleted = Object.values(progress).filter(Boolean).length;
  const chaptersFinished = chapters.filter((chIdx) => {
    const chLevels = levels.filter((l) => l.chapterIndex === chIdx);
    return chLevels.every((l) => progress[l.id]);
  }).length;
  const pct = Math.round((totalCompleted / TOTAL_LEVELS) * 100);

  return (
    <div className="flex flex-col gap-10">
      {/* ── Stats bar ── */}
      <div
        className="rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-2xl font-black" style={{ color: "var(--accent)" }}>
              {totalCompleted}
              <span className="text-base font-semibold" style={{ color: "var(--muted)" }}>
                /{TOTAL_LEVELS}
              </span>
            </span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              Levels done
            </span>
          </div>

          <div className="w-px" style={{ background: "var(--border)" }} />

          <div className="flex flex-col">
            <span className="text-2xl font-black" style={{ color: "#f97316" }}>
              {streak}
            </span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              🔥 Streak
            </span>
          </div>

          <div className="w-px" style={{ background: "var(--border)" }} />

          <div className="flex flex-col">
            <span className="text-2xl font-black" style={{ color: "#10b981" }}>
              {chaptersFinished}
              <span className="text-base font-semibold" style={{ color: "var(--muted)" }}>
                /{chapters.length}
              </span>
            </span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              Chapters
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1.5 sm:w-48">
          <div className="flex justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span>Overall progress</span>
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>{pct}%</span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "var(--border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Chapter sections ── */}
      {chapters.map((chIdx) => {
        const chLevels = levels.filter((l) => l.chapterIndex === chIdx);
        const chName = chLevels[0].chapter;
        const color = CHAPTER_COLORS[chIdx] ?? "#7c3aed";
        const completedCount = chLevels.filter((l) => progress[l.id]).length;
        const allDone = completedCount === chLevels.length;

        return (
          <div key={chIdx}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-6 rounded-full" style={{ background: color }} />
              <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                Chapter {chIdx}: {chName}
              </h2>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full ml-auto font-semibold"
                style={{
                  background: allDone ? "rgba(16,185,129,0.12)" : "var(--card)",
                  color: allDone ? "#10b981" : "var(--muted)",
                  border: `1px solid ${allDone ? "rgba(16,185,129,0.3)" : "var(--border)"}`,
                }}
              >
                {allDone ? "✓ Complete" : `${completedCount}/${chLevels.length}`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {chLevels.map((level) => {
                const done = !!progress[level.id];
                return (
                  <Link
                    key={level.id}
                    href={`/play/${level.id}`}
                    className="rounded-xl p-4 flex flex-col gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: done ? "rgba(14,165,233,0.07)" : "var(--card)",
                      border: `1px solid ${done ? "rgba(14,165,233,0.25)" : "var(--border)"}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          background: done ? "var(--accent)" : "var(--border)",
                          color: done ? "#fff" : "var(--muted)",
                        }}
                      >
                        {done ? "✓" : level.id}
                      </span>
                    </div>
                    <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                      {level.title}
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>
                      {level.chapter}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
