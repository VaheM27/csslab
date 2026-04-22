import { notFound } from "next/navigation";
import { gridLevels, GRID_TOTAL_LEVELS } from "@/app/data/gridLevels";
import GridGameClient from "./GameClient";

export function generateStaticParams() {
  return gridLevels.map((l) => ({ level: String(l.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const l = gridLevels.find((x) => x.id === Number(level));
  if (!l) return {};
  return {
    title: `Level ${l.id}: ${l.title} — CSS Grid · CSSLab`,
    description: l.description.replace(/\*\*/g, ""),
  };
}

export default async function GridLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const levelData = gridLevels.find((l) => l.id === Number(level));
  if (!levelData) notFound();
  return <GridGameClient level={levelData} totalLevels={GRID_TOTAL_LEVELS} />;
}
