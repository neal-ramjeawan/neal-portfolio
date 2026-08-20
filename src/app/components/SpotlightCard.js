"use client";

import { useRef } from "react";

// Wraps a card in a cursor-following radial glow. Subtle by design: low
// opacity, small radius, disabled entirely on touch devices via the
// `spotlight-overlay` CSS (see globals.css, `@media (hover: none)`).
// `as` lets callers keep whatever tag they need (article, div, li, ...)
// while everything else (id, className, style) passes straight through.
export default function SpotlightCard({
  as: Tag = "div",
  color = "rgba(0, 173, 181, 0.12)",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const ref = useRef(null);

  function handlePointerMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`spotlight-card ${className}`}
      style={{ "--spotlight-color": color, ...style }}
      {...rest}
    >
      <span className="spotlight-overlay" aria-hidden="true" />
      {children}
    </Tag>
  );
}