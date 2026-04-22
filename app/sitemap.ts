import { MetadataRoute } from "next";
import { TOTAL_LEVELS } from "@/app/data/levels";

const BASE_URL = "https://flexlab-jade.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const levelRoutes = Array.from({ length: TOTAL_LEVELS }, (_, i) => ({
    url: `${BASE_URL}/play/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/play`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sandbox`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...levelRoutes,
  ];
}
