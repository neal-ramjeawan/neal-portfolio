"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "../data/site";
import { runTerminalCommand } from "../lib/terminalCommands";

const WELCOME = [
  { text: `${site.name} — interactive shell` },
  { text: "Type 'help' to see what's available. Esc to close." },
];

// Quick command palette, summoned from any page via Ctrl/Cmd+K or the
// navbar icon. Shares its command set with TerminalHome (full-page
// mode) via lib/terminalCommands — this component only owns the
// overlay chrome and how actions (navigate/download/close) get
// carried out in a modal context.
export default function Terminal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    function handleKeydown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("open-terminal", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("open-terminal", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    // canSwitchMode is false here — full terminal mode is a deliberate
    // toggle in the navbar, not something typed into the quick palette.
    const { lines: resultLines, action } = runTerminalCommand(trimmed, {
      canSwitchMode: false,
    });

    setLines((prev) => [...prev, { text: `$ ${trimmed}`, tone: "prompt" }, ...resultLines]);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);
    setValue("");

    if (action?.type === "clear") {
      setLines([]);
    } else if (action?.type === "navigate") {
      setOpen(false);
      router.push(action.href);
    } else if (action?.type === "download") {
      const link = document.createElement("a");
      link.href = action.href;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action?.type === "close") {
      setOpen(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
    }
  }

  if (!open) return null;

  const toneClass = {
    prompt: "text-accent-warm",
    accent: "text-accent",
    error: "text-[var(--danger)]",
    output: "text-text-dim",
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-20 sm:pt-28"
      role="dialog"
      aria-modal="true"
      aria-label="Site terminal"
    >
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="relative w-full max-w-xl rounded-lg border border-border-strong bg-surface shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="font-mono text-xs text-text-faint">neal@portfolio:~</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close terminal"
            className="font-mono text-xs text-text-dim hover:text-text"
          >
            esc
          </button>
        </div>

        <div
          ref={scrollRef}
          className="max-h-[50vh] overflow-y-auto px-4 py-3 font-mono text-sm space-y-1"
        >
          {lines.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap ${toneClass[line.tone] ?? "text-text-dim"}`}>
              {line.text || "\u00a0"}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-4 py-3">
          <span className="font-mono text-sm text-accent-warm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command..."
            className="flex-1 bg-transparent font-mono text-sm text-text placeholder:text-text-faint outline-none"
          />
        </form>
      </div>
    </div>
  );
}