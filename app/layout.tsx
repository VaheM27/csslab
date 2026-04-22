import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://flexlab-jade.vercel.app";

export const metadata: Metadata = {
  title: "CSSLab — Learn CSS by Playing",
  description: "Master CSS Flexbox, Grid, and @media queries through 45 interactive challenges. Live previews, visual explanations, and real examples.",
  keywords: ["CSS Flexbox", "CSS Grid", "media queries", "learn CSS", "CSS game", "CSS tutorial", "web development"],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "CSSLab — Learn CSS by Playing",
    description: "Master Flexbox, Grid, and @media queries through 45 interactive challenges with live previews.",
    type: "website",
    url: BASE_URL,
    siteName: "CSSLab",
    images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: "CSSLab — Learn CSS by Playing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSSLab — Learn CSS by Playing",
    description: "Master Flexbox, Grid, and @media queries through 45 interactive challenges.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistMono.variable} suppressHydrationWarning>
      <head>
        {/* Anti-flash: set theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('flexlab_theme')||'light';document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://flexlab-jade.vercel.app/#website",
                  "url": "https://flexlab-jade.vercel.app",
                  "name": "CSSLab",
                  "description": "Learn CSS Flexbox, Grid, and @media queries through interactive challenges with live previews.",
                  "inLanguage": "en",
                },
                {
                  "@type": "LearningResource",
                  "@id": "https://flexlab-jade.vercel.app/#learning",
                  "name": "CSSLab — Interactive CSS Challenges",
                  "description": "45 interactive CSS challenges covering Flexbox, Grid, and @media queries. Live previews, instant feedback, and visual explanations.",
                  "url": "https://flexlab-jade.vercel.app",
                  "educationalLevel": "Beginner to Intermediate",
                  "teaches": ["CSS Flexbox", "CSS Grid", "CSS Media Queries", "Responsive Web Design"],
                  "learningResourceType": "Interactive Exercise",
                  "inLanguage": "en",
                  "isAccessibleForFree": true,
                  "author": {
                    "@type": "Person",
                    "name": "Vahe Mnatsakanyan",
                    "url": "https://vahemn.dev/",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
