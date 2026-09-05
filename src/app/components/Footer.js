"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs text-text-faint">
        <div className="display-face text-lg text-text">NR<span className="text-accent-dim">.</span></div>
        <div className="flex items-center gap-5">
          <Link href="/projects" className="hover:text-text-dim transition-colors">
            projects
          </Link>
          <Link href="/about" className="hover:text-text-dim transition-colors">
            about
          </Link>
          <Link href="/contact" className="hover:text-text-dim transition-colors">
            contact
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-terminal"))}
            title="Open the terminal command palette"
            className="flex items-center gap-1.5 hover:text-text-dim transition-colors"
          >
            <span>Press</span>
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-dim">
              &#8984;K
            </kbd>
            <span className="hidden sm:inline">for the terminal</span>
          </button>
          <span aria-hidden="true">&middot;</span>
          <p>&copy; {new Date().getFullYear()} Neal Ramjeawan</p>
        </div>
      </div>
    </footer>
  );
}