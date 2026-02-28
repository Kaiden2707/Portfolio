"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

/** Full-page reveal: fades content in and moves it up once when you land on the page. */
export function PageReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setReady(true);
    } else {
      document.fonts.ready.then(() => setReady(true));
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !ready) return;
    const el = ref.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  }, [ready]);

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: "translateY(28px)" }}
    >
      {children}
    </div>
  );
}
