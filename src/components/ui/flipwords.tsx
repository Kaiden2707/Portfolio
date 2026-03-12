"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeWords = words.length > 0 ? words : [""];
  const currentWord = safeWords[currentIndex % safeWords.length];
  const wordsKey = useMemo(() => safeWords.join("|"), [safeWords]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [wordsKey]);

  useEffect(() => {
    if (safeWords.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeWords.length);
    }, duration);
    return () => window.clearInterval(intervalId);
  }, [duration, safeWords.length, wordsKey]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        initial={{
          opacity: 0,
          y: 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        exit={{
          opacity: 0,
          y: -30,
          x: 56,
          scale: 1.14,
          filter: "blur(10px)",
          transition: {
            duration: 0.86,
            ease: [0.16, 0.78, 0.2, 1],
          },
        }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-0 align-baseline origin-left",
          className
        )}
        style={{ willChange: "transform, opacity, filter" }}
        key={`${currentWord}-${currentIndex}`}
      >
        {currentWord.split(" ").map((word, wordIndex, wordArray) => (
          <span key={word + wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordIndex * 0.45 + letterIndex * 0.13,
                  duration: 0.58,
                  ease: "easeOut",
                }}
                className="inline-block"
                style={{ willChange: "transform, opacity" }}
              >
                {letter}
              </motion.span>
            ))}
            {wordIndex < wordArray.length - 1 ? (
              <span className="inline-block">&nbsp;</span>
            ) : null}
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};
