import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buildAbsoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://benaoumeur.vercel.app"),
  title: {
    default: "Mohammed Ben Aoumeur | Full-Stack Engineer and AI Integration Specialist",
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="text-slate-950 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
