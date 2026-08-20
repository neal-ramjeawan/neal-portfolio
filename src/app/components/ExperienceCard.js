"use client";

import { useRef } from "react";

// Shared card content for one role — used by the About page's timeline
// and the homepage carousel, so both stay in sync automatically. Tilts
// gently toward the cursor (max ~3.5deg) — subtle enough to feel alive
// without distracting from the text.
export default function ExperienceCard({ role }) {
  const ref = useRef(null);

  function handlePointerMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(py * -3.5).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(px * 3.5).toFixed(2)}deg`);
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="tilt-card rounded-lg border border-border bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
        <h3 className="font-mono text-base font-semibold text-text">{role.company}</h3>
        <span className="font-mono text-xs text-text-faint whitespace-nowrap">{role.dates}</span>
      </div>
      <p className="font-mono text-sm text-accent-warm mb-3">{role.title}</p>
      <ul className="space-y-1.5 text-sm text-text-dim leading-relaxed list-disc list-inside">
        {role.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-4">
        {role.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border-strong px-2.5 py-1 font-mono text-[11px] text-text-dim"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}