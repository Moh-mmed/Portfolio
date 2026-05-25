"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePerformanceCheck } from "@/lib/use-performance-check";

export function SmoothScroll() {
  const { canUseSmoothScroll } = usePerformanceCheck();

  useEffect(() => {
    if (!canUseSmoothScroll) {
      document.documentElement.classList.remove("lenis");
      document.documentElement.classList.remove("lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true
    });

    let frameId = 0;

    const frame = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, [canUseSmoothScroll]);

  return null;
}
