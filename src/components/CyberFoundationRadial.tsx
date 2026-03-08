"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTheme } from "next-themes";

type CategoryId = "offensive" | "defensive" | "infrastructure" | "application";

type Category = {
  id: CategoryId;
  label: string;
  tags: string[];
  desktopPosition: string;
  popupPosition: string;
  accentRgb: string;
};

const categories: Category[] = [
  {
    id: "offensive",
    label: "Offensive Security",
    tags: ["Pentest+", "Wireless Networks & Security"],
    desktopPosition: "left-[calc(50%-4.5rem)] top-[calc(50%-7.8rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "right-full mr-2 top-1/2 -translate-y-1/2",
    accentRgb: "225, 6, 0",
  },
  {
    id: "defensive",
    label: "Defensive Security",
    tags: ["Security+", "SecurityX", "CySA+"],
    desktopPosition: "left-[calc(50%+9.8rem)] top-[calc(50%-5.6rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "left-full ml-2 top-1/2 -translate-y-1/2",
    accentRgb: "47, 129, 247",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    tags: ["A+", "Network+", "Linux Administration"],
    desktopPosition: "left-[calc(50%+4.8rem)] top-[calc(50%+7.8rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "left-full ml-2 top-1/2 -translate-y-1/2",
    accentRgb: "110, 255, 160",
  },
  {
    id: "application",
    label: "Application",
    tags: ["Frontend Development", "Secure Implementation"],
    desktopPosition: "left-[calc(50%-9rem)] top-[calc(50%+5.2rem)] -translate-x-1/2 -translate-y-1/2",
    popupPosition: "right-full mr-2 top-1/2 -translate-y-1/2",
    accentRgb: "139, 92, 246",
  },
];

function categoryButtonClass() {
  return [
    "group inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium tracking-wide text-[#f5f5f5]",
    "transform-gpu transition-all duration-300 ease-out motion-safe:hover:scale-105 motion-safe:hover:brightness-125",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
  ].join(" ");
}

function categoryButtonStyle(
  category: Category,
  isActive: boolean,
  isHovered: boolean,
  isDarkMode: boolean,
): CSSProperties {
  const glowOn = isActive || isHovered;
  const borderAlpha = isActive ? 0.72 : 0.58;
  const baseColor = isDarkMode ? "#111111" : "#f4f4ff";
  const textColor = isDarkMode ? "#f5f5f5" : "#111124";
  return {
    color: textColor,
    background: `radial-gradient(circle at center, rgba(${category.accentRgb}, ${isDarkMode ? "0.22" : "0.18"}), ${baseColor} 62%)`,
    border: `1px solid rgba(${category.accentRgb}, ${borderAlpha})`,
    boxShadow: glowOn
      ? `0 0 24px rgba(${category.accentRgb}, 0.62), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -8px 16px ${isDarkMode ? "rgba(0,0,0,0.35)" : "rgba(17,17,36,0.16)"}`
      : `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -8px 16px ${isDarkMode ? "rgba(0,0,0,0.35)" : "rgba(17,17,36,0.16)"}`,
  };
}

function categoryPopupStyle(category: Category, isDarkMode: boolean): CSSProperties {
  const baseColor = isDarkMode ? "#101221" : "#f8f8ff";
  return {
    background: `radial-gradient(circle at center, rgba(${category.accentRgb}, ${isDarkMode ? "0.14" : "0.10"}), ${baseColor} 72%)`,
    border: `1px solid rgba(${category.accentRgb}, 0.5)`,
    boxShadow: `0 8px 24px rgba(0,0,0,0.35), 0 0 16px rgba(${category.accentRgb}, 0.25)`,
  };
}

function certTagClass() {
  return [
    "rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide",
  ].join(" ");
}

function certTagStyle(category: Category, isDarkMode: boolean): CSSProperties {
  const baseColor = isDarkMode ? "#0f1016" : "#f3f4ff";
  const textColor = isDarkMode ? "#f5f5f5" : "#111124";
  return {
    color: textColor,
    background: `radial-gradient(circle at center, rgba(${category.accentRgb}, ${isDarkMode ? "0.18" : "0.14"}), ${baseColor} 66%)`,
    border: `1px solid rgba(${category.accentRgb}, 0.5)`,
    boxShadow: `0 0 14px rgba(${category.accentRgb}, 0.24)`,
  };
}

export function CyberFoundationRadial() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<CategoryId | null>(null);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  const autoCloseTimeoutRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme !== "light";

  function clearAutoCloseTimer() {
    if (autoCloseTimeoutRef.current !== null) {
      window.clearTimeout(autoCloseTimeoutRef.current);
      autoCloseTimeoutRef.current = null;
    }
  }

  function startAutoCloseTimer() {
    clearAutoCloseTimer();
    autoCloseTimeoutRef.current = window.setTimeout(() => {
      setActiveCategory(null);
      setHoveredCategory(null);
      setIsPopupHovered(false);
      autoCloseTimeoutRef.current = null;
    }, 6000);
  }

  useEffect(() => {
    if (!activeCategory || isPopupHovered) {
      clearAutoCloseTimer();
      return;
    }
    startAutoCloseTimer();
    return clearAutoCloseTimer;
  }, [activeCategory, isPopupHovered]);

  useEffect(() => {
    if (!activeCategory) setIsPopupHovered(false);
  }, [activeCategory]);

  useEffect(() => {
    return clearAutoCloseTimer;
  }, []);

  function handleCategoryClick(id: CategoryId) {
    setIsPopupHovered(false);
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
              <div key={category.id} className={`group/node absolute z-10 ${category.desktopPosition}`}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory((current) => (current === category.id ? null : current))}
                  className={categoryButtonClass()}
                  style={categoryButtonStyle(category, isActive, hoveredCategory === category.id, isDarkMode)}
                >
                  {category.label}
                </button>
                <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider text-white/65 opacity-0 transition-opacity duration-200 group-hover/node:opacity-100 dark:text-white/65">
                  click
                </span>
                <div
                  className={[
                    "absolute z-20 min-w-[13rem] rounded-2xl p-3 transition-all duration-250 ease-out",
                    category.popupPosition,
                    isActive ? "pointer-events-auto" : "pointer-events-none",
                    isActive
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-1 scale-95 opacity-0",
                  ].join(" ")}
                  style={categoryPopupStyle(category, isDarkMode)}
                  onMouseEnter={() => {
                    if (isActive) setIsPopupHovered(true);
                  }}
                  onMouseLeave={() => setIsPopupHovered(false)}
                >
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <span key={tag} className={certTagClass()} style={certTagStyle(category, isDarkMode)}>
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
              <div key={category.id} className="group/node relative">
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory((current) => (current === category.id ? null : current))}
                  className={`w-full ${categoryButtonClass()}`}
                  style={categoryButtonStyle(category, isActive, hoveredCategory === category.id, isDarkMode)}
                >
                  {category.label}
                </button>
                <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider text-white/65 opacity-0 transition-opacity duration-200 group-hover/node:opacity-100 dark:text-white/65">
                  click
                </span>
                <div
                  className={[
                    "absolute left-1/2 top-full z-10 mt-2 w-[min(20rem,92vw)] -translate-x-1/2 rounded-2xl p-3 transition-all duration-250 ease-out",
                    isActive ? "pointer-events-auto" : "pointer-events-none",
                    isActive
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-1 scale-95 opacity-0",
                  ].join(" ")}
                  style={categoryPopupStyle(category, isDarkMode)}
                  onMouseEnter={() => {
                    if (isActive) setIsPopupHovered(true);
                  }}
                  onMouseLeave={() => setIsPopupHovered(false)}
                >
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <span key={tag} className={certTagClass()} style={certTagStyle(category, isDarkMode)}>
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
