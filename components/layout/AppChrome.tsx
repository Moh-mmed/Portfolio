"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PortfolioProjectShell } from "@/components/layout/PortfolioProjectShell";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <main>{children}</main>;
  }

  if (pathname.startsWith("/projects/")) {
    return (
      <main>
        <PortfolioProjectShell>{children}</PortfolioProjectShell>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
