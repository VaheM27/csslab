import { MetadataRoute } from "next";
import { TOTAL_LEVELS } from "@/app/data/levels";
import { GRID_TOTAL_LEVELS } from "@/app/data/gridLevels";
import { MEDIA_TOTAL_LEVELS } from "@/app/data/mediaLevels";

const BASE_URL = "https://flexlab-jade.vercel.app";

const monthly = "monthly" as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const flexRoutes = Array.from({ length: TOTAL_LEVELS }, (_, i) => ({
    url: `${BASE_URL}/play/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: monthly,
    priority: 0.8,
  }));

  const gridRoutes = Array.from({ length: GRID_TOTAL_LEVELS }, (_, i) => ({
    url: `${BASE_URL}/play/grid/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: monthly,
    priority: 0.8,
  }));

  const mediaRoutes = Array.from({ length: MEDIA_TOTAL_LEVELS }, (_, i) => ({
    url: `${BASE_URL}/play/media/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: monthly,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL,                              lastModified: new Date(), changeFrequency: monthly, priority: 1.0 },
    { url: `${BASE_URL}/play`,                    lastModified: new Date(), changeFrequency: monthly, priority: 0.9 },
    { url: `${BASE_URL}/play/flex`,               lastModified: new Date(), changeFrequency: monthly, priority: 0.9 },
    { url: `${BASE_URL}/play/grid`,               lastModified: new Date(), changeFrequency: monthly, priority: 0.9 },
    { url: `${BASE_URL}/play/media`,              lastModified: new Date(), changeFrequency: monthly, priority: 0.9 },
    { url: `${BASE_URL}/sandbox`,                 lastModified: new Date(), changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE_URL}/play/flex/complete`,      lastModified: new Date(), changeFrequency: monthly, priority: 0.5 },
    { url: `${BASE_URL}/play/grid/complete`,      lastModified: new Date(), changeFrequency: monthly, priority: 0.5 },
    { url: `${BASE_URL}/play/media/complete`,     lastModified: new Date(), changeFrequency: monthly, priority: 0.5 },
    ...flexRoutes,
    ...gridRoutes,
    ...mediaRoutes,
  ];
}
