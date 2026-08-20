"use client";

import { useEffect, useRef, useState } from "react";

// Same on-scroll trigger as Reveal, but staggers each child instead of
// fading the whole block in at once. Pass a mapped array of cards as
// children and keep whatever container className you already had
// (grid, space-y-6, etc.) — each child gets wrapped in its own fade-up
// div so the layout classes on the parent keep working unchanged.
export default function StaggerReveal({
  children,
  className = "",
  itemClassName = "",
  stagger = 80,
  maxDelaySteps = 8,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={child?.key ?? i}
          className={`${visible ? "animate-fade-up" : "opacity-0"} ${itemClassName}`}
          style={{
            animationDelay: visible
              ? `${Math.min(i, maxDelaySteps) * stagger}ms`
              : undefined,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}