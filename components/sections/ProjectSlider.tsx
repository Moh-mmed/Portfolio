"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "@/components/sections/ProjectCard";
import type { Project } from "@/lib/types";

interface ProjectSliderProps {
  projects: Project[];
}

export function ProjectSlider({ projects }: ProjectSliderProps) {
  if (projects.length === 0) {
    return null;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 35
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Handle keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!emblaApi) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      };
  }, [emblaApi]);

  return (
    <section
      aria-label="Projects carousel"
      aria-roledescription="carousel"
      className="relative space-y-6 overflow-hidden"
      data-testid="project-slider"
      onKeyDown={(event) => {
        if (!emblaApi) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          emblaApi.scrollNext();
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          emblaApi.scrollPrev();
        }
      }}
      tabIndex={0}
    >
      <div className="overflow-hidden rounded-[20px]" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {projects.map((project, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={project.slug}
                className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_75%] lg:flex-[0_0_68%]"
                data-testid="project-slide"
              >
                <div
                  className="h-full py-2 transition-[transform,opacity] duration-500 ease-[0.22,1,0.36,1]"
                  style={{
                    transform: isSelected ? "scale(1)" : "scale(0.965)",
                    opacity: isSelected ? 1 : 0.62
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2" data-testid="slider-dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              aria-current={index === selectedIndex ? "true" : "false"}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-6 bg-accent" : "w-2 bg-border hover:bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              type="button"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-alt text-text transition hover:bg-bg-hover"
            data-testid="slider-prev"
            aria-label="Previous slide"
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-alt text-text transition hover:bg-bg-hover"
            data-testid="slider-next"
            aria-label="Next slide"
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
