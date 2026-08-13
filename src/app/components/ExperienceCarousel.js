"use client";

import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export default function ExperienceCarousel({ roles }) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (roles.length <= 1) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % roles.length);
      }
    }, 6000);
    return () => clearInterval(id);
  }, [roles.length]);

  const goTo = (i) => setIndex(((i % roles.length) + roles.length) % roles.length);

  return (
    <div
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {roles.map((role) => (
            <div key={role.company} className="w-full flex-shrink-0 px-0.5">
              <ExperienceCard role={role} />
            </div>
          ))}
        </div>
      </div>

      {roles.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous role"
            className="rounded-md border border-border-strong p-1.5 text-text-dim hover:text-text hover:bg-surface transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {roles.map((role, i) => (
              <button
                key={role.company}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${role.company}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent-warm" : "w-1.5 bg-border-strong"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next role"
            className="rounded-md border border-border-strong p-1.5 text-text-dim hover:text-text hover:bg-surface transition-colors"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}