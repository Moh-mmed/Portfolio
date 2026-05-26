"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon
} from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = typeof activeIndex === "number" ? images[activeIndex] : null;
  const activeImageIndex = typeof activeIndex === "number" ? activeIndex : 0;

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (typeof current !== "number") {
        return current;
      }

      return current === 0 ? images.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (typeof current !== "number") {
        return current;
      }

      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (typeof activeIndex !== "number") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (typeof current !== "number") {
            return current;
          }

          return current === 0 ? images.length - 1 : current - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (typeof current !== "number") {
            return current;
          }

          return current === images.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold tracking-tight text-text" id={titleId}>
        Gallery
      </h2>
      <div aria-labelledby={titleId} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            className={cn(
              "group relative aspect-[16/10] overflow-hidden rounded-[20px] border border-border bg-bg-alt text-left shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            )}
            key={image.src}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <Image
              alt={image.alt}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
              src={image.src}
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-bg/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
          role="dialog"
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[24px] border border-border bg-bg-alt shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-bg-hover">
              <Image
                alt={activeImage.alt}
                className="h-full w-full object-contain"
                fill
                priority
                sizes="100vw"
                src={activeImage.src}
              />

              {images.length > 1 ? (
                <>
                  <button
                    aria-label="Show previous image"
                    className={cn(
                      "absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white shadow-lg backdrop-blur",
                      "hover:bg-slate-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950/30"
                    )}
                    onClick={showPrevious}
                    type="button"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    aria-label="Show next image"
                    className={cn(
                      "absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white shadow-lg backdrop-blur",
                      "hover:bg-slate-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950/30"
                    )}
                    onClick={showNext}
                    type="button"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>
            <div className="space-y-4 border-t border-border px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted">{activeImage.alt}</p>
                  {images.length > 1 ? (
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      {activeImageIndex + 1} / {images.length}
                    </p>
                  ) : null}
                </div>
                <button
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-sm font-semibold text-text shadow-sm",
                    "hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  )}
                  onClick={() => setActiveIndex(null)}
                  type="button"
                >
                  <CloseIcon className="h-4 w-4" />
                  Close
                </button>
              </div>

              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {images.map((image, index) => {
                    const isCurrent = index === activeIndex;

                    return (
                      <button
                        aria-label={`Open image ${index + 1}`}
                        className={cn(
                          "relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg transition-all duration-300",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                          isCurrent
                            ? "border-accent shadow-[0_0_0_1px_rgba(13,148,136,0.18)]"
                            : "opacity-70 hover:opacity-100"
                        )}
                        key={image.src}
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      >
                        <Image
                          alt={image.alt}
                          className="h-full w-full object-cover"
                          fill
                          sizes="(min-width: 640px) 120px, 22vw"
                          src={image.src}
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
