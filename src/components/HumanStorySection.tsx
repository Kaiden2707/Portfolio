 "use client";

import Image from "next/image";
import { useState } from "react";

type StoryStep = {
  id: string;
  title: string;
  lead: string;
  bullets: string[];
};

const storySteps: StoryStep[] = [
  {
    id: "why-i-build",
    title: "Why I Build",
    lead: "I enjoy turning ideas into real interfaces.",
    bullets: [
      "Building from nothing",
      "The feeling of something finally working after countless efforts",
      "Perfecting small UI details",
    ],
  },
  {
    id: "outside-the-screen",
    title: "Outside the Screen",
    lead: "When I am not coding, I still enjoy challenge and strategy.",
    bullets: [
      "Fitness/Hypertrophy training while pushing my limits.",
      "Competitive mindset",
      "Strategy games",
      "Design and aesthetics",
    ],
  },
  {
    id: "what-drives-me",
    title: "What Drives Me",
    lead: "I am focused on skill, impact, and building things that matter.",
    bullets: [
      "Becoming extremely skilled",
      "Building real-world projects",
      "Working remotely",
      "Creating things people actually use",
    ],
  },
  {
    id: "where-im-headed",
    title: "Where I am Headed",
    lead:
      "I am focused on becoming extremely good at building interfaces. The goal is simple - take ideas and turn them into clean, functional products.",
    bullets: [],
  },
];

export function HumanStorySection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(14rem,19rem)_minmax(2rem,1fr)_minmax(0,26rem)_minmax(2rem,1fr)]">
        <div className="mt-6 lg:mt-14 lg:self-start">
          <div className="relative mx-auto w-full max-w-[19rem]">
            <div className="pointer-events-none absolute -inset-3 rounded-[2.2rem] bg-[radial-gradient(circle_at_center,rgba(91,33,182,0.34),rgba(124,58,237,0.30),rgba(76,29,149,0.24),transparent_74%)] blur-2xl" />
            <Image
              src="/personal-image.png"
              alt="Kaiden portrait"
              width={304}
              height={352}
              quality={82}
              sizes="(min-width: 1024px) 304px, (min-width: 640px) 288px, 100vw"
              className="relative h-[22rem] w-full rounded-2xl object-cover shadow-[0_0_30px_rgba(124,58,237,0.30),0_0_52px_rgba(91,33,182,0.24),0_0_68px_rgba(76,29,149,0.20)]"
            />
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden />

        <div className="space-y-6 lg:space-y-8">
          <div className="max-w-2xl space-y-2 text-foreground/90 dark:text-white">
            <p className="text-sm leading-7 sm:text-base">
              I started coding out of curiosity. Now I build things people actually use.
            </p>
            <p className="text-sm leading-7 sm:text-base">
              I like turning ideas into real products.
            </p>
          </div>

          <div className="space-y-3 lg:max-w-[26rem]">
            {storySteps.map((step) => {
              const isActive = activeId === step.id;
              return (
                <section
                  key={step.id}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    setActiveId((current) => (current === step.id ? null : step.id))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveId((current) => (current === step.id ? null : step.id));
                    }
                  }}
                  className={[
                    "cursor-pointer select-none rounded-2xl border-4 bg-white dark:bg-black px-4 py-4 transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 sm:py-5",
                    "origin-center transform-gpu [backface-visibility:hidden] [transform:translateZ(0)] motion-safe:hover:scale-[1.02] hover:!border-fuchsia-400 hover:shadow-[0_0_22px_rgba(168,85,247,0.38)] dark:hover:!border-fuchsia-400 dark:hover:shadow-[0_0_22px_rgba(168,85,247,0.38)]",
                    isActive
                      ? "border-fuchsia-400 shadow-[0_0_20px_rgba(168,85,247,0.34)]"
                      : "!border-black/80 dark:!border-white/80",
                  ].join(" ")}
                  style={{ contain: "layout paint style" }}
                >
                  <h3
                    className={[
                      "font-nulshock text-base transition-all duration-300 sm:text-lg",
                      isActive
                        ? "text-foreground drop-shadow-[0_0_10px_rgba(var(--accent-rgb)/0.22)] dark:text-white"
                        : "text-muted",
                    ].join(" ")}
                  >
                    {step.title}
                  </h3>

                  <div
                    className={[
                      "overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-out",
                      isActive ? "mt-3 max-h-[28rem] opacity-100 pb-2" : "mt-0 max-h-0 opacity-0",
                    ].join(" ")}
                  >
                    <div>
                      <div
                        className={[
                          "translate-y-2 text-foreground/90 transition-all duration-500 ease-out dark:text-white",
                          isActive ? "translate-y-0 opacity-100" : "opacity-0",
                        ].join(" ")}
                      >
                        <p className="text-sm leading-7 sm:text-base">{step.lead}</p>
                        {step.bullets.length > 0 ? (
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 sm:text-[0.95rem]">
                            {step.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden />
      </div>
    </div>
  );
}
