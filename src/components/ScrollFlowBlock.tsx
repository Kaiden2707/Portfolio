"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Wraps content so it participates in a parent ScrollFlowWrapper's scroll-driven animation. */
export function ScrollFlowBlock({ children, className = "" }: Props) {
  return (
    <div data-split-block className={className}>
      <div data-split-item>{children}</div>
    </div>
  );
}
