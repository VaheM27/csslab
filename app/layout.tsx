import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://flexlab-jade.vercel.app";

export const metadata: Metadata = {
  title: "FlexLab — Learn CSS Flexbox by Playing",
  description: "Master CSS Flexbox through 20 interactive challenges. Live previews, axis visualization, and real explanations.",
  keywords: ["CSS Flexbox", "learn flexbox", "flexbox game", "CSS tutorial", "web development"],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "FlexLab — Learn CSS Flexbox by Playing",
    description: "Master CSS Flexbox through 20 interactive challenges with live previews and axis visualization.",
    type: "website",
    url: BASE_URL,
    siteName: "FlexLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexLab — Learn CSS Flexbox by Playing",
    description: "Master CSS Flexbox through 20 interactive challenges.",
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
