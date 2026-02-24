"use client";

import type { ReactNode } from "react";
import SplitText from "./SplitText";

export function Section({
  id,
  title,
  eyebrow,
  children,
  animatedTitle = true,
  titleScrollFlow = false,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  animatedTitle?: boolean;
  /** When true, the title is animated by a parent ScrollFlowWrapper instead of its own trigger. */
  titleScrollFlow?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="flex items-baseline justify-between gap-6">
          <div className="min-w-0">
            {eyebrow ? (
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {eyebrow}
              </div>
            ) : null}
            {animatedTitle ? (
              <div className="mt-2 font-comfortaa">
                <SplitText
                  text={title}
                  tag="h2"
                  className="text-2xl font-semibold tracking-tight sm:text-3xl"
                  delay={60}
                  duration={1.1}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  scrollTriggerStart={titleScrollFlow ? undefined : "top 65%"}
                  delayBefore={titleScrollFlow ? undefined : 0.2}
                  textAlign="left"
                  scrollFlow={titleScrollFlow}
                />
              </div>
            ) : (
              <h2 className="mt-2 font-comfortaa text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h2>
            )}
          </div>
          <div className="hidden h-px flex-1 bg-border sm:block" />
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
