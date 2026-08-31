"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerminalIcon } from "./icons";
import { useViewMode } from "../context/ViewMode";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { setMode } = useViewMode();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-warm">
            <span className="font-mono text-[11px] font-bold text-bg">NR</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1 font-mono text-sm">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  active
                    ? "text-accent-warm"
                    : "text-text-dim hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mode toggle + mobile toggle */}
        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-0.5 rounded-md border border-border p-0.5 font-mono text-xs"
            role="group"
            aria-label="Site view mode"
          >
            <span className="px-2.5 py-1 rounded text-accent-warm bg-accent-warm/10">
              site
            </span>
            <button
              type="button"
              onClick={() => setMode("terminal")}
              title="Switch to terminal mode — power-user view"
              className="flex items-center gap-1 px-2.5 py-1 rounded text-text-dim hover:text-text transition-colors"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              term
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMode("terminal")}
            aria-label="Switch to terminal mode"
            title="Switch to terminal mode"
            className="sm:hidden text-text-dim hover:text-accent-warm border border-border rounded-md p-1.5 transition-colors"
          >
            <TerminalIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="sm:hidden font-mono text-text-dim hover:text-text border border-border rounded-md px-3 py-1.5"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {/* Mobile panel — stays mounted so it can transition open/closed
          instead of popping in abruptly (every other interactive
          element on the site now has motion; this was the one that
          didn't). Uses the grid-rows trick to animate height without
          measuring the content. */}
      <div
        className={`sm:hidden grid overflow-hidden border-border bg-bg-elevated transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-6 py-3 flex flex-col gap-1 font-mono text-sm">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 ${active ? "text-accent-warm" : "text-text-dim hover:text-text"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}