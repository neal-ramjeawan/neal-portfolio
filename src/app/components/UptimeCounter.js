"use client";

import { useEffect, useState } from "react";

// Approximate start of professional engineering experience.
// TODO(Neal): set this to your actual start date — the "6+ years" stat
// on the old site implied roughly this, adjust as needed.
const CAREER_START = new Date("2020-01-01T00:00:00Z");

function formatUptime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const years = Math.floor(totalSeconds / (365.25 * 24 * 3600));
  const remAfterYears = totalSeconds - Math.floor(years * 365.25 * 24 * 3600);
  const days = Math.floor(remAfterYears / (24 * 3600));
  const hours = Math.floor((remAfterYears % (24 * 3600)) / 3600);
  const minutes = Math.floor((remAfterYears % 3600) / 60);
  const seconds = remAfterYears % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return `${years}y ${pad(days)}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function UptimeCounter() {
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    const tick = () => setDisplay(formatUptime(Date.now() - CAREER_START.getTime()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <p className="font-mono text-[11px] uppercase tracking-wide text-text-faint mb-1">
        In the field
      </p>
      <p className="font-mono text-lg text-accent tabular-nums">
        {display ?? "\u2014"}
      </p>
    </div>
  );
}