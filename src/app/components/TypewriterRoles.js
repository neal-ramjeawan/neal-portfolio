"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const ROLES = ["Cloud Platform Engineer", "DevOps Engineer", "SRE / Systems Engineer"];
const TYPE_MS = 55;
const ERASE_MS = 28;
const PAUSE_MS = 1200;

function subscribe(callback) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Always "false" during SSR — matchMedia doesn't exist on the server.
// useSyncExternalStore reconciles this with the real client value on
// hydration, the same pattern used by the ViewMode context.
function getServerSnapshot() {
  return false;
}

// Types out each role, pauses, erases, moves to the next — and stops on
// the last one rather than looping forever. Runs once per page load.
// A screen-reader-only span always carries the full, final text so
// assistive tech isn't read a stream of partial words as it types.
export default function TypewriterRoles() {
  const reduceMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [text, setText] = useState(() => (reduceMotion ? ROLES.join(" \u00b7 ") : ""));
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) return;

    cancelledRef.current = false;
    let timeoutId;
    const wait = (ms) => new Promise((resolve) => (timeoutId = setTimeout(resolve, ms)));

    async function run() {
      for (let i = 0; i < ROLES.length; i++) {
        const role = ROLES[i];

        for (let c = 1; c <= role.length; c++) {
          if (cancelledRef.current) return;
          await wait(TYPE_MS);
          setText(role.slice(0, c));
        }

        await wait(PAUSE_MS);
        if (cancelledRef.current) return;

        for (let c = role.length; c >= 0; c--) {
          if (cancelledRef.current) return;
          await wait(ERASE_MS);
          setText(role.slice(0, c));
        }
      }

      // Final phase: type out the full joined list and stop there —
      // same end state the reduced-motion fallback shows immediately.
      const full = ROLES.join(" \u00b7 ");
      for (let c = 1; c <= full.length; c++) {
        if (cancelledRef.current) return;
        await wait(TYPE_MS);
        setText(full.slice(0, c));
      }
    }

    run();
    return () => {
      cancelledRef.current = true;
      clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <>
      <span className="sr-only">{ROLES.join(", ")}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {text}
        <span className="ml-0.5 inline-block w-[2px] h-[1em] bg-accent-warm animate-pulse" />
      </span>
    </>
  );
}