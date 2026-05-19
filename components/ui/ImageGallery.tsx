"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = typeof activeIndex === "number" ? images[activeIndex] : null;

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950" id={titleId}>
        Gallery
      </h2>
      <div aria-labelledby={titleId} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            className={cn(
              "group relative aspect-[16/10] overflow-hidden rounded-[20px] border border-slate-200 bg-white/70 text-left shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            )}
            key={image.src}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <Image
              alt={image.alt}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
              src={image.src}
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[24px] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-slate-100">
              <Image
                alt={activeImage.alt}
                className="h-full w-full object-contain"
                fill
                priority
                sizes="100vw"
                src={activeImage.src}
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-4">
              <p className="text-sm text-slate-600">{activeImage.alt}</p>
              <button
                className={cn(
                  "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm",
                  "hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                )}
                onClick={() => setActiveIndex(null)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

