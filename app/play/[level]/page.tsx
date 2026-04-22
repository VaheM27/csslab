import { notFound } from "next/navigation";
import { getLevelById, TOTAL_LEVELS } from "@/app/data/levels";
import Navbar from "@/app/components/Navbar";
import GameClient from "./GameClient";

export function generateStaticParams() {
  return Array.from({ length: TOTAL_LEVELS }, (_, i) => ({
    level: String(i + 1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const lvl = getLevelById(Number(level));
  if (!lvl) return {};
  const desc = lvl.description.replace(/\*\*/g, "").replace(/`/g, "");
  const url = `https://flexlab-jade.vercel.app/play/${lvl.id}`;
  return {
    title: `Level ${lvl.id}: ${lvl.title} — Flexbox · CSSLab`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `Level ${lvl.id}: ${lvl.title} — CSS Flexbox`,
      description: desc,
      url,
      siteName: "CSSLab",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Level ${lvl.id}: ${lvl.title} — CSS Flexbox · CSSLab`,
      description: desc,
    },
  };
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const lvl = getLevelById(Number(level));
  if (!lvl) notFound();

  return (
    <>
      <Navbar />
      <GameClient level={lvl} totalLevels={TOTAL_LEVELS} />
    </>
  );
}
