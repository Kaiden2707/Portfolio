"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after the layout router has had a chance to mount.
 * Use to avoid "invariant expected layout router to be mounted" when client
 * components (e.g. Link, dynamic imports) run too early.
 */
export function MountAfterLayout({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) {
    return <div className="min-h-screen bg-background" aria-hidden />;
  }
  return <>{children}</>;
}
