import { notFound } from "next/navigation";
import { mediaLevels, MEDIA_TOTAL_LEVELS } from "@/app/data/mediaLevels";
import MediaGameClient from "./GameClient";

export function generateStaticParams() {
  return mediaLevels.map((l) => ({ level: String(l.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const l = mediaLevels.find((x) => x.id === Number(level));
  if (!l) return {};
  return {
    title: `Level ${l.id}: ${l.title} — @media · CSSLab`,
    description: l.description.replace(/\*\*/g, ""),
  };
}

export default async function MediaLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const levelData = mediaLevels.find((l) => l.id === Number(level));
  if (!levelData) notFound();
  return <MediaGameClient level={levelData} totalLevels={MEDIA_TOTAL_LEVELS} />;
}
