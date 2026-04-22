import Navbar from "@/app/components/Navbar";
import { gridLevels } from "@/app/data/gridLevels";
import GridLevelSelectClient from "./LevelSelectClient";

export const metadata = {
  title: "CSS Grid Challenges — CSSLab",
  description: "Master CSS Grid through 15 interactive challenges.",
};

export default function GridPlayPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⬛</span>
            <h1 className="text-4xl font-black" style={{ color: "var(--text)" }}>
              CSS Grid
            </h1>
          </div>
          <p className="mb-10" style={{ color: "var(--muted)" }}>
            15 levels · 5 chapters · from display:grid to responsive auto-fill layouts
          </p>
          <GridLevelSelectClient levels={gridLevels} />
        </div>
      </main>
    </>
  );
}
