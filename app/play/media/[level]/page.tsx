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
  const desc = l.description.replace(/\*\*/g, "").replace(/`/g, "");
  const url = `https://flexlab-jade.vercel.app/play/media/${l.id}`;
  return {
    title: `Level ${l.id}: ${l.title} — @media · CSSLab`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `Level ${l.id}: ${l.title} — CSS @media`,
      description: desc,
      url,
      siteName: "CSSLab",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Level ${l.id}: ${l.title} — @media · CSSLab`,
      description: desc,
    },
  };
}

export default async function MediaLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const levelData = mediaLevels.find((l) => l.id === Number(level));
  if (!levelData) notFound();
  return <MediaGameClient level={levelData} totalLevels={MEDIA_TOTAL_LEVELS} />;
}
