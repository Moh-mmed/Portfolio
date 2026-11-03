"use client";

import type { ReactNode } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";

export function PortfolioProjectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <MobileNav activeSection="projects" />

      <div className="lg:flex lg:min-h-screen">
        <PortfolioSidebar activeSection="projects" />
        <div className="lg:w-[60%] lg:flex-1">
          <div className="px-5 py-10 lg:px-12 lg:py-16 xl:px-16">{children}</div>
        </div>
      </div>
    </div>
  );
}
