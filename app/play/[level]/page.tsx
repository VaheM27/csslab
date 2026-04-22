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
  return {
    title: `Level ${lvl.id}: ${lvl.title} — FlexLab`,
    description: lvl.description.replace(/\*\*/g, "").replace(/`/g, ""),
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
