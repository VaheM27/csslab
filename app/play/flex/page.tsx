import Navbar from "@/app/components/Navbar";
import { levels } from "@/app/data/levels";
import LevelSelectClient from "@/app/play/LevelSelectClient";

export const metadata = {
  title: "CSS Flexbox Challenges — CSSLab",
  description: "Master CSS Flexbox through 20 interactive challenges.",
};

export default function FlexPlayPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">↔️</span>
            <h1 className="text-4xl font-black" style={{ color: "var(--text)" }}>
              CSS Flexbox
            </h1>
          </div>
          <p className="mb-10" style={{ color: "var(--muted)" }}>
            20 levels · 6 chapters · from display:flex to real-world layouts
          </p>
          <LevelSelectClient levels={levels} />
        </div>
      </main>
    </>
  );
}
