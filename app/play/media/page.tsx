import Navbar from "@/app/components/Navbar";
import { mediaLevels } from "@/app/data/mediaLevels";
import MediaLevelSelectClient from "./LevelSelectClient";

export const metadata = {
  title: "@media Challenges — CSSLab",
  description: "Master CSS media queries through 10 interactive challenges.",
};

export default function MediaPlayPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📱</span>
            <h1 className="text-4xl font-black" style={{ color: "var(--text)" }}>
              @media Queries
            </h1>
          </div>
          <p className="mb-10" style={{ color: "var(--muted)" }}>
            10 levels · 3 chapters · from your first breakpoint to responsive grid layouts
          </p>
          <MediaLevelSelectClient levels={mediaLevels} />
        </div>
      </main>
    </>
  );
}
