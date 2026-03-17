"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground transition-all duration-300 ease-out hover:scale-110 hover:border-accent/50 hover:text-foreground hover:shadow-[0_0_16px_rgba(var(--accent-rgb)/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-95"
    >
      <span className="relative h-4 w-4 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
        <Sun
          className="h-4 w-4 transition-all duration-300 ease-out"
          style={{
            position: "absolute",
            inset: 0,
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0deg) scale(1)",
          }}
        />
        <Moon
          className="h-4 w-4 transition-all duration-300 ease-out"
          style={{
            position: "absolute",
            inset: 0,
            opacity: isDark ? 1 : 0,
            transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
          }}
        />
      </span>
    </button>
  );
}
