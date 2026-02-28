"use client";

const GRID_COLOR = "89, 21, 255"; // #5915FF as rgb for rgba
const GRID_OPACITY = 0.45;
const CELL_SIZE = 48;

/**
 * Grid background for non-hero pages. Fills the content area (main + footer) only;
 * page height is determined by content, so no extra scroll.
 * Grid is visible behind content and fades out toward the edges.
 */
export function GridBackground() {
  const lineColor = `rgba(${GRID_COLOR}, ${GRID_OPACITY})`;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 w-full"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 0px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 0px, transparent 1px)
        `,
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        backgroundPosition: "0 0",
        maskImage: `
          linear-gradient(to right, transparent 0%, transparent 14%, black 24%, black 76%, transparent 86%, transparent 100%),
          linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)
        `,
        WebkitMaskImage: `
          linear-gradient(to right, transparent 0%, transparent 14%, black 24%, black 76%, transparent 86%, transparent 100%),
          linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)
        `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
      aria-hidden
    />
  );
}
