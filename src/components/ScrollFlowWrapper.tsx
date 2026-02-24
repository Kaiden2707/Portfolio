"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const defaultFrom = { opacity: 0, y: 28 };
const defaultTo = { opacity: 1, y: 0 };
const duration = 0.6;
const stagger = 0.028;
const ease = "power3.out";
const gapBetweenBlocks = 0;

export function ScrollFlowWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded) return;
      const container = ref.current;
      const blocks = container.querySelectorAll<HTMLElement>("[data-split-block]");
      if (!blocks.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          once: true,
          fastScrollEnd: true,
        },
      });

      blocks.forEach((block, i) => {
        const elements = block.querySelectorAll<HTMLElement>("[data-split-item]");
        if (!elements.length) return;
        tl.fromTo(
          elements,
          { ...defaultFrom },
          {
            ...defaultTo,
            duration,
            stagger,
            ease,
            willChange: "transform, opacity",
            force3D: true,
          },
          i === 0 ? 0 : "-=0.6"
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === container) st.kill();
        });
        tl.kill();
      };
    },
    { dependencies: [fontsLoaded], scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
