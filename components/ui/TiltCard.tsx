"use client";

import { useEffect, useRef, type ReactNode } from "react";
import VanillaTilt from "vanilla-tilt";
import { usePerformanceCheck } from "@/lib/use-performance-check";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

type TiltInstance = {
  destroy: () => void;
};

type TiltElement = HTMLDivElement & {
  vanillaTilt?: TiltInstance;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { canUseTilt } = usePerformanceCheck();

  useEffect(() => {
    const element = elementRef.current as TiltElement | null;
    if (!element || !canUseTilt) return;

    VanillaTilt.init(element, {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.15
    });

    const glareEl = element.querySelector(".js-tilt-glare-inner") as HTMLElement;
    if (glareEl) {
      glareEl.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(45, 212, 191, 0.15) 100%)";
    }

    return () => {
      element.vanillaTilt?.destroy();
    };
  }, [canUseTilt]);

  return (
    <div
      ref={elementRef}
      className={className}
      data-testid="tilt-card"
      data-tilt-enabled={canUseTilt ? "true" : "false"}
    >
      {children}
    </div>
  );
}
