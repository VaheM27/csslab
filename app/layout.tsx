import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlexLab — Learn CSS Flexbox by Playing",
  description:
    "Master CSS Flexbox through 20 interactive challenges. See axis visualization, live previews, and real explanations. Better than Flexbox Froggy.",
  keywords: ["CSS Flexbox", "learn flexbox", "flexbox game", "CSS tutorial", "web development"],
  openGraph: {
    title: "FlexLab — Learn CSS Flexbox by Playing",
    description: "Master CSS Flexbox through 20 interactive challenges with live previews and axis visualization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--text)" }}>
        {children}
      </body>
    </html>
  );
}
