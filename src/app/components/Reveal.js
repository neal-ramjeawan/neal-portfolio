"use client";

import { useEffect, useRef, useState } from "react";

// Fades content up once it scrolls into view. Respects reduced-motion
// via the global CSS rule that zeroes animation-duration — the reveal
// still happens (content becomes visible), just without the motion.
export default function Reveal({ children, className = "" }) {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${visible ? "animate-fade-up" : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}