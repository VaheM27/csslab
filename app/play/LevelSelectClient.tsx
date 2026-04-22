"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Level } from "@/app/data/levels";

const CHAPTER_COLORS: Record<number, string> = {
  1: "#7c3aed",
  2: "#0891b2",
  3: "#be185d",
  4: "#c2410c",
  5: "#15803d",
  6: "#b45309",
};

export default function LevelSelectClient({ levels }: { levels: Level[] }) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      setProgress(JSON.parse(localStorage.getItem("flexlab_progress") ?? "{}"));
    } catch {}
  }, []);

  const chapters = Array.from(new Set(levels.map((l) => l.chapterIndex))).sort();

  return (
    <div className="flex flex-col gap-10">
      {chapters.map((chIdx) => {
        const chLevels = levels.filter((l) => l.chapterIndex === chIdx);
        const chName = chLevels[0].chapter;
        const color = CHAPTER_COLORS[chIdx] ?? "#7c3aed";
        const completedCount = chLevels.filter((l) => progress[l.id]).length;

        return (
          <div key={chIdx}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-2 h-6 rounded-full"
                style={{ background: color }}
              />
              <h2
                className="font-bold text-lg"
                style={{ color: "var(--text)" }}
              >
                Chapter {chIdx}: {chName}
              </h2>
              <span
                className="text-xs px-2 py-0.5 rounded ml-auto"
                style={{
                  background: "var(--card)",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {completedCount}/{chLevels.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {chLevels.map((level) => {
                const done = !!progress[level.id];
                return (
                  <Link
                    key={level.id}
                    href={`/play/${level.id}`}
                    className="rounded-xl p-4 flex flex-col gap-1 transition-all hover:scale-[1.02] hover:opacity-90 group"
                    style={{
                      background: done
                        ? "rgba(74,222,128,0.08)"
                        : "var(--card)",
                      border: `1px solid ${done ? "rgba(74,222,128,0.3)" : "var(--border)"}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-bold"
                        style={{ color: done ? "var(--green)" : color }}
                      >
                        {done ? "✓" : level.id}
                      </span>
                      {done && (
                        <span className="text-xs" style={{ color: "var(--green)" }}>
                          ✓
                        </span>
                      )}
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text)" }}
                    >
                      {level.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--muted)" }}
                    >
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
