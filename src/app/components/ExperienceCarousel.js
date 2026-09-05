"use client";

import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export default function ExperienceCarousel({ roles }) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pausedRef = useRef(false);
  const viewportRef = useRef(null);
  const dragRef = useRef({ startX: 0, startY: 0, axis: null });

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

  function handlePointerDown(event) {
    if (roles.length <= 1) return;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      axis: null,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    const drag = dragRef.current;
    if (!drag.startX) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.axis) {
      if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) return;
      drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
    }

    if (drag.axis !== "horizontal") return;
    event.preventDefault();
    setDragging(true);
    setDragOffset(deltaX);
  }

  function handlePointerUp(event) {
    const drag = dragRef.current;
    if (drag.axis === "horizontal") {
      const width = viewportRef.current?.clientWidth ?? 1;
      const threshold = Math.min(120, width * 0.2);
      if (Math.abs(dragOffset) >= threshold) {
        goTo(index + (dragOffset < 0 ? 1 : -1));
      }
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = { startX: 0, startY: 0, axis: null };
    setDragOffset(0);
    setDragging(false);
  }

  return (
    <div
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        ref={viewportRef}
        className="overflow-hidden touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={`flex ${dragging ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))` }}
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