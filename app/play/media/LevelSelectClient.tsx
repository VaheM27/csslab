"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MediaLevel, MEDIA_TOTAL_LEVELS } from "@/app/data/mediaLevels";

const CHAPTER_COLORS: Record<number, string> = {
  1: "#f43f5e",
  2: "#f97316",
  3: "#8b5cf6",
};

export default function MediaLevelSelectClient({ levels }: { levels: MediaLevel[] }) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      setProgress(JSON.parse(localStorage.getItem("csslab_media_progress") ?? "{}"));
    } catch {}
  }, []);

  const chapters = Array.from(new Set(levels.map((l) => l.chapterIndex))).sort();
  const totalCompleted = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((totalCompleted / MEDIA_TOTAL_LEVELS) * 100);

  return (
    <div className="flex flex-col gap-10">
      {/* Stats */}
      <div className="rounded-2xl p-5 flex items-center justify-between"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-2xl font-black" style={{ color: "#f43f5e" }}>
              {totalCompleted}
              <span className="text-base font-semibold" style={{ color: "var(--muted)" }}>/{MEDIA_TOTAL_LEVELS}</span>
            </span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>Completed</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 w-48">
          <div className="flex justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span>Progress</span>
            <span style={{ color: "#f43f5e", fontWeight: 700 }}>{pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, #f43f5e, #fb923c)" }} />
          </div>
        </div>
      </div>

      {chapters.map((chIdx) => {
        const chLevels = levels.filter((l) => l.chapterIndex === chIdx);
        const chName = chLevels[0].chapter;
        const color = CHAPTER_COLORS[chIdx] ?? "#f43f5e";
        const completedCount = chLevels.filter((l) => progress[l.id]).length;
        const allDone = completedCount === chLevels.length;

        return (
          <div key={chIdx}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-6 rounded-full" style={{ background: color }} />
              <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                Chapter {chIdx}: {chName}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full ml-auto font-semibold"
                style={{
                  background: allDone ? "rgba(16,185,129,0.12)" : "var(--card)",
                  color: allDone ? "#10b981" : "var(--muted)",
                  border: `1px solid ${allDone ? "rgba(16,185,129,0.3)" : "var(--border)"}`,
                }}>
                {allDone ? "✓ Complete" : `${completedCount}/${chLevels.length}`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {chLevels.map((level) => {
                const done = !!progress[level.id];
                return (
                  <Link key={level.id} href={`/play/media/${level.id}`}
                    className="rounded-xl p-4 flex flex-col gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: done ? "rgba(244,63,94,0.06)" : "var(--card)",
                      border: `1px solid ${done ? "rgba(244,63,94,0.2)" : "var(--border)"}`,
                    }}>
                    <span className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: done ? color : "var(--border)",
                        color: done ? "#fff" : "var(--muted)",
                      }}>
                      {done ? "✓" : level.id}
                    </span>
                    <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{level.title}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{level.chapter}</div>
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
