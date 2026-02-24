"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  scrollTriggerStart?: string;
  delayBefore?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
  /** When true, this block is animated by a parent ScrollFlowWrapper instead of its own ScrollTrigger. */
  scrollFlow?: boolean;
}

function splitIntoChars(str: string): string[] {
  return Array.from(str);
}

function splitIntoWords(str: string): string[] {
  return str.trim().split(/\s+/);
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  scrollTriggerStart,
  delayBefore = 0,
  tag = "p",
  textAlign = "center",
  onLetterAnimationComplete,
  scrollFlow = false,
}) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  const useChars = splitType === "chars" || splitType === "words, chars";
  const useWords = splitType === "words" || splitType === "words, chars";
  const chunks = useWords && !useChars
    ? splitIntoWords(text)
    : useChars
      ? splitIntoChars(text)
      : [text];

  useGSAP(
    () => {
      if (scrollFlow || !ref.current || !fontsLoaded || animationCompletedRef.current) return;
      const wrapper = ref.current;
      const elements = wrapper.querySelectorAll<HTMLElement>("[data-split-item]");
      if (!elements.length) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch?.[2] ?? "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = scrollTriggerStart ?? `top ${startPct}%${sign}`;

      const tl = gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          delay: delayBefore,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: wrapper,
            start,
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === wrapper) st.kill();
        });
        tl.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        scrollTriggerStart,
        delayBefore,
        scrollFlow,
        fontsLoaded,
      ],
      scope: ref,
    }
  );

  const Tag = tag as React.ElementType;
  const style: React.CSSProperties = { textAlign, wordWrap: "break-word" };

  return (
    <Tag
      ref={ref}
      style={style}
      data-split-block={scrollFlow ? true : undefined}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
    >
      {chunks.map((chunk, i) => {
        const isSpace = useChars && chunk === " ";
        return (
          <span
            key={i}
            {...(isSpace ? {} : { "data-split-item": true })}
            className={isSpace ? "inline-block w-[0.25em] shrink-0" : "inline-block"}
            style={{ willChange: isSpace ? undefined : "transform, opacity" }}
            aria-hidden={isSpace}
          >
            {isSpace ? "\u00A0" : chunk}
            {useWords && i < chunks.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
};

export default SplitText;
