"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const SWIPE_THRESHOLD = 50;

type Props = {
  /** Image srcs (e.g. /personal-image.png, /personal-image-2.png) */
  images: { src: string; alt: string }[];
  className?: string;
};

export function ImageCarousel({ images, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;

  const goTo = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + count) % count);
    },
    [count]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    swipeStart.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      const start = swipeStart.current;
      swipeStart.current = null;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= SWIPE_THRESHOLD) {
        goTo(dx > 0 ? -1 : 1);
      }
    },
    [goTo]
  );

  if (count === 0) return null;

  return (
    <div className={`relative flex flex-col gap-3 ${className}`}>
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-accent dark:border-white bg-surface-2 touch-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${(i - index) * 100}%)`,
              zIndex: i === index ? 1 : 0,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 ease-out hover:scale-110"
              sizes="(max-width: 640px) 100vw, 288px"
            />
          </div>
        ))}
      </div>
      {count > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40 hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Previous image"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                  i === index ? "bg-accent scale-125" : "bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40 hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Next image"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
