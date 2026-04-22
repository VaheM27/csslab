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
  openGraph: {
    title: "CSSLab — Learn CSS by Playing",
    description: "Master Flexbox, Grid, and @media queries through 45 interactive challenges with live previews.",
    type: "website",
    url: BASE_URL,
    siteName: "CSSLab",
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
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
