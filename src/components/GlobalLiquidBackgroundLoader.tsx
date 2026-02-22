"use client";

import dynamic from "next/dynamic";

const GlobalLiquidBackground = dynamic(
  () => import("@/components/GlobalLiquidBackground").then((m) => m.GlobalLiquidBackground),
  { ssr: false, loading: () => <div className="fixed inset-0 z-0" aria-hidden /> }
);

export function GlobalLiquidBackgroundLoader() {
  return <GlobalLiquidBackground />;
}
