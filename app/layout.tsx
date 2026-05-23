import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AppChrome } from "@/components/layout/AppChrome";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { colors } from "@/lib/design-tokens";
import { buildAbsoluteUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benaoumeur.vercel.app"),
  title: {
    default:
      "Mohammed Ben Aoumeur | Full-Stack Engineer and AI Integration Specialist",
    template: "%s | Mohammed Ben Aoumeur"
  },
  description:
    "Software engineer specializing in full-stack development, backend systems, and AI integration with TypeScript, Next.js, Node.js, and Python.",
  openGraph: {
    title: "Mohammed Ben Aoumeur | Full-Stack Engineer",
    description:
      "Software engineer specializing in full-stack development, backend systems, and AI integration.",
    url: buildAbsoluteUrl("/"),
    siteName: "Mohammed Ben Aoumeur Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Ben Aoumeur portfolio"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Ben Aoumeur | Full-Stack Engineer",
    description:
      "Software engineer specializing in full-stack development, backend systems, and AI integration.",
    images: ["/images/og-image.jpg"]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: colors.light.bg },
    { media: "(prefers-color-scheme: dark)", color: colors.dark.bg }
  ]
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);return;}if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html className={inter.variable} lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className="bg-bg font-sans text-text antialiased"
        suppressHydrationWarning
      >
        <CursorGlow />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
