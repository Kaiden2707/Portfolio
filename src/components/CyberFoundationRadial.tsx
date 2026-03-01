"use client";

import { useState } from "react";

type CategoryId = "offensive" | "defensive" | "infrastructure" | "application";

type Category = {
  id: CategoryId;
  label: string;
  tags: string[];
  desktopPosition: string;
  popupPosition: string;
};

const categories: Category[] = [
  {
    id: "offensive",
    label: "Offensive Security",
    tags: ["Pentest+", "Wireless Networks & Security"],
    desktopPosition: "left-[calc(50%-4.5rem)] top-[calc(50%-7.8rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "right-full mr-2 top-1/2 -translate-y-1/2",
  },
  {
    id: "defensive",
    label: "Defensive Security",
    tags: ["Security+", "SecurityX", "CySA+"],
    desktopPosition: "left-[calc(50%+9.8rem)] top-[calc(50%-5.6rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "left-full ml-2 top-1/2 -translate-y-1/2",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    tags: ["A+", "Network+", "Linux Administration"],
    desktopPosition: "left-[calc(50%+4.8rem)] top-[calc(50%+7.8rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "left-full ml-2 top-1/2 -translate-y-1/2",
  },
  {
    id: "application",
    label: "Application",
    tags: ["Frontend Development", "Secure Implementation"],
    desktopPosition: "left-[calc(50%-9rem)] top-[calc(50%+5.2rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "right-full mr-2 top-1/2 -translate-y-1/2",
  },
];

function categoryButtonClass(isActive: boolean) {
  return [
    "group inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium tracking-wide",
    "transform-gpu transition-all duration-300 ease-out motion-safe:hover:scale-105",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
    isActive
      ? "border-accent/45 bg-accent/20 text-foreground shadow-[0_0_22px_rgba(var(--accent-rgb)/0.22)]"
      : "border-border/80 bg-surface/90 text-foreground/90 hover:border-accent/30 hover:bg-surface-2 hover:shadow-[0_0_18px_rgba(var(--accent-rgb)/0.14)]",
  ].join(" ");
}

function certTagClass() {
  return [
    "rounded-full border border-accent/30 bg-surface-2/90 px-3 py-1 text-xs font-medium uppercase tracking-wide",
    "text-foreground/90 shadow-[0_0_12px_rgba(var(--accent-rgb)/0.14)]",
  ].join(" ");
}

export function CyberFoundationRadial() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  function handleCategoryClick(id: CategoryId) {
    setActiveCategory((current) => (current === id ? null : id));
  }

  return (
    <div className="w-full max-w-3xl py-2 sm:py-4 md:max-w-[42rem]">
      <div className="hidden md:block">
        <div className="relative mx-auto h-[24rem] w-full max-w-[40rem]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-accent/30 bg-surface/95 px-5 text-center text-sm font-semibold text-foreground shadow-[0_0_22px_rgba(var(--accent-rgb)/0.14)] transition-all duration-300 ease-out motion-safe:hover:scale-105 motion-safe:hover:shadow-[0_0_28px_rgba(var(--accent-rgb)/0.18)]">
              Cyber &amp; Systems Education
            </div>
          </div>

          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <div key={category.id} className={`absolute z-10 ${category.desktopPosition}`}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  className={categoryButtonClass(isActive)}
                >
                  {category.label}
                </button>
                <div
                  className={[
                    "pointer-events-none absolute z-20 min-w-[13rem] rounded-2xl border border-accent/25 bg-surface-2/95 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-250 ease-out",
                    category.popupPosition,
                    isActive
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-1 scale-95 opacity-0",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <span key={tag} className={certTagClass()}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        <div className="rounded-2xl border border-accent/30 bg-surface px-4 py-5 text-center text-sm font-semibold text-foreground shadow-[0_0_18px_rgba(var(--accent-rgb)/0.12)]">
          Cyber &amp; Systems Education
        </div>
        <div className="grid gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <div key={category.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full ${categoryButtonClass(isActive)}`}
                >
                  {category.label}
                </button>
                <div
                  className={[
                    "pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-[min(20rem,92vw)] -translate-x-1/2 rounded-2xl border border-accent/25 bg-surface-2/95 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-250 ease-out",
                    isActive
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-1 scale-95 opacity-0",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <span key={tag} className={certTagClass()}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
