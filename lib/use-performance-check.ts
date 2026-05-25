"use client";

import { useEffect, useState } from "react";

export interface PerformanceCheck {
  canRender3D: boolean;
  prefersReducedMotion: boolean;
  isTouchLike: boolean;
  isDesktop: boolean;
  canUseTilt: boolean;
  canUseSmoothScroll: boolean;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

export function usePerformanceCheck(): PerformanceCheck {
  const [result, setResult] = useState<PerformanceCheck>({
    canRender3D: false,
    prefersReducedMotion: false,
    isTouchLike: false,
    isDesktop: false,
    canUseTilt: false,
    canUseSmoothScroll: false,
  });

  useEffect(() => {
    const checkPerformance = () => {
      // 1. Prefers reduced motion
      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const prefersReducedMotion = reducedMotionQuery.matches;

      // 2. Touch-like device check
      // A coarse pointer generally represents touch screens/controllers without mouse hover.
      const hoverQuery = window.matchMedia("(hover: none)");
      const pointerQuery = window.matchMedia("(pointer: coarse)");
      const isTouchLike = hoverQuery.matches || pointerQuery.matches;

      // 3. Desktop view gating (Tailwind lg breakpoint is 1024px)
      const isDesktop = window.innerWidth >= 1024;

      // 4. Hardware concurrency check
      const hardwareConcurrency = navigator.hardwareConcurrency || 0;

      // 5. WebGL availability check
      const webglSupported = checkWebGLSupport();

      // canRender3D requires all of:
      // - prefers-reduced-motion: no-preference (i.e. prefersReducedMotion is false)
      // - hardwareConcurrency >= 4
      // - viewport is desktop-class (lg breakpoint)
      // - non-touch device (isTouchLike is false)
      // - WebGL is supported and enabled in the browser
      const canRender3D = !prefersReducedMotion && hardwareConcurrency >= 4 && isDesktop && !isTouchLike && webglSupported;

      // canUseTilt and canUseSmoothScroll require desktop, non-touch, and reduced motion off
      const canUseTilt = isDesktop && !isTouchLike && !prefersReducedMotion;
      const canUseSmoothScroll = isDesktop && !isTouchLike && !prefersReducedMotion;

      setResult({
        canRender3D,
        prefersReducedMotion,
        isTouchLike,
        isDesktop,
        canUseTilt,
        canUseSmoothScroll,
      });
    };

    checkPerformance();

    // Listen to resize and media query changes
    const resizeListener = () => {
      checkPerformance();
    };

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: none)");

    window.addEventListener("resize", resizeListener);
    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", resizeListener);
    } else {
      // Fallback for older browsers
      reducedMotionQuery.addListener(resizeListener);
    }

    if (typeof hoverQuery.addEventListener === "function") {
      hoverQuery.addEventListener("change", resizeListener);
    } else {
      // Fallback for older browsers
      hoverQuery.addListener(resizeListener);
    }

    return () => {
      window.removeEventListener("resize", resizeListener);
      if (typeof reducedMotionQuery.removeEventListener === "function") {
        reducedMotionQuery.removeEventListener("change", resizeListener);
      } else {
        reducedMotionQuery.removeListener(resizeListener);
      }
      if (typeof hoverQuery.removeEventListener === "function") {
        hoverQuery.removeEventListener("change", resizeListener);
      } else {
        hoverQuery.removeListener(resizeListener);
      }
    };
  }, []);

  return result;
}
