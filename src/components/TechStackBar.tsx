"use client";

import { useState } from "react";
import { techIconUrl, invertInDark } from "@/lib/techIcons";

const ICON_SIZE = 24;
const BAR_DURATION = "35s";

type Item = { id: string; label: string };

export function TechStackBar({
  items,
  direction,
  className = "",
}: {
  items: readonly Item[];
  direction: "left" | "right";
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const list = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max gap-8 py-3"
        style={{
          animation: `tech-bar-${direction} ${BAR_DURATION} linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {list.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="flex shrink-0 items-center gap-2 text-foreground/90"
          >
            <img
              src={techIconUrl(item.id)}
              alt=""
              width={ICON_SIZE}
              height={ICON_SIZE}
              className={`shrink-0 opacity-90 ${invertInDark(item.id) ? "tech-logo-invert" : ""}`}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
