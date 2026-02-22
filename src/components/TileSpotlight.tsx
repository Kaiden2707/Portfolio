"use client";

import type { ReactNode, MouseEventHandler } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function TileSpotlight({ className = "", children }: Props) {
  const handleMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      className={`tile-spotlight ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

