"use client";

import type { ReactNode } from "react";
import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react";

const SLIDE_ANGLE = 120; // 360 / 3
const PERSPECTIVE = 1200;
const TRANSLATE_Z = 320;
const SWIPE_THRESHOLD = 50;

type Props = {
  /** One or more slide elements (e.g. tile components) */
  children: ReactNode;
  /** Auto-advance interval in ms; 0 = off */
  autoplayInterval?: number;
  /** Pause autoplay when user has reduced motion preference */
  respectReducedMotion?: boolean;
  className?: string;
};

export function Carousel3D({
  children,
  autoplayInterval = 0,
  respectReducedMotion = true,
  className = "",
}: Props) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const count = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!respectReducedMotion) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [respectReducedMotion]);

  const goTo = useCallback(
    (next: number) => {
      setCurrentIndex((prev) => (prev + next + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (autoplayInterval <= 0 || reducedMotion) return;
    const id = setInterval(() => goTo(1), autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, goTo, reducedMotion]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    swipeStart.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
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

  const rotationDeg = -currentIndex * SLIDE_ANGLE;

  if (count === 0) return null;

  return (
    <div
      className={`relative flex flex-col items-center gap-4 ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Personal highlights carousel"
    >
      <div
        className="relative w-full overflow-hidden touch-none"
        style={{
          height: 360,
          perspective: reducedMotion ? "none" : PERSPECTIVE,
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: reducedMotion ? "flat" : "preserve-3d",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              transformStyle: reducedMotion ? "flat" : "preserve-3d",
              transform: reducedMotion
                ? undefined
                : `rotateY(${rotationDeg}deg)`,
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${count}`}
                aria-hidden={i !== currentIndex}
                className="absolute left-1/2 top-1/2 w-[min(100%,280px)] max-w-[85vw] shrink-0"
                style={{
                  transform: reducedMotion
                    ? "translate(-50%,-50%)"
                    : `translate(-50%,-50%) rotateY(${i * SLIDE_ANGLE}deg) translateZ(${TRANSLATE_Z}px)`,
                  transformStyle: reducedMotion ? "flat" : "preserve-3d",
                  backfaceVisibility: "hidden",
                  pointerEvents: i === currentIndex ? "auto" : "none",
                  opacity: reducedMotion ? (i === currentIndex ? 1 : 0) : 1,
                  visibility: reducedMotion && i !== currentIndex ? "hidden" : "visible",
                  transition: reducedMotion ? "opacity 0.3s ease" : undefined,
                  zIndex: i === currentIndex ? 2 : 1,
                }}
              >
                <div className="h-full w-full">{slide}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => goTo(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40 hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
          aria-label="Previous slide"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-1.5" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 w-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                i === currentIndex ? "bg-accent scale-125" : "bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40 hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
          aria-label="Next slide"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
