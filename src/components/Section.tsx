"use client";

import type { ReactNode } from "react";

export function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
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
            <h2 className="section-heading mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
              {title}
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-border sm:block" />
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
