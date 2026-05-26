"use client";

import { useEffect, useState } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offsetRatio?: number;
}

export function useScrollSpy({
  sectionIds,
  offsetRatio = 0.35
}: UseScrollSpyOptions): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    let frame = 0;

    const updateActiveId = () => {
      const triggerLine = window.innerHeight * offsetRatio;
      let nextActiveId = elements[0].id;

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= triggerLine) {
          nextActiveId = element.id;
          continue;
        }

        break;
      }

      setActiveId((currentId) => (currentId === nextActiveId ? currentId : nextActiveId));
    };

    const queueUpdate = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveId);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, [offsetRatio, sectionIds]);

  return activeId;
}
