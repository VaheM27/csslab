import Navbar from "@/app/components/Navbar";
import { gridLevels } from "@/app/data/gridLevels";
import GridLevelSelectClient from "./LevelSelectClient";

export const metadata = {
  title: "CSS Grid Challenges — CSSLab",
  description: "Master CSS Grid through 15 interactive challenges. Learn grid-template-columns, span, place-items, minmax() and more with live previews.",
  alternates: { canonical: "https://flexlab-jade.vercel.app/play/grid" },
  openGraph: {
    title: "CSS Grid Challenges — CSSLab",
    description: "15 interactive CSS Grid challenges with live previews. From display:grid to responsive auto-fill layouts.",
    url: "https://flexlab-jade.vercel.app/play/grid",
    siteName: "CSSLab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Grid Challenges — CSSLab",
    description: "15 interactive CSS Grid challenges with live previews.",
  },
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
            20 levels · 6 chapters · from display:grid to responsive auto-fill layouts
          </p>
          <GridLevelSelectClient levels={gridLevels} />
        </div>
      </main>
    </>
  );
}
