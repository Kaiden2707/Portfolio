"use client";

import LiquidEther from "./LiquidEther";

export function GlobalLiquidBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0"
      style={{ width: "100%", height: "100%", position: "fixed" }}
    >
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={19}
        cursorSize={75}
        isViscous
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
}
