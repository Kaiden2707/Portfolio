"use client";

import { useEffect, useState } from "react";
import { GlobalLiquidBackground } from "@/components/GlobalLiquidBackground";

export function GlobalLiquidBackgroundLoader() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="fixed inset-0 z-0" aria-hidden />;
  }
  return <GlobalLiquidBackground />;
}
