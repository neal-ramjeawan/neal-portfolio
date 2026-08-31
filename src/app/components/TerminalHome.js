"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "../data/site";
import { useViewMode } from "../context/ViewMode";
import { runTerminalCommand } from "../lib/terminalCommands";

const WELCOME = [
  { text: `${site.name} — power-user mode`, tone: "accent" },
  { text: "Everything on this site is reachable from here. Type 'help' to start." },
  { text: "Prefer scrolling? Type 'site', or use the toggle above." },
];

export default function TerminalHome() {
  const router = useRouter();
  const { setMode } = useViewMode();
  const [lines, setLines] = useState(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    const { lines: resultLines, action } = runTerminalCommand(trimmed, {
      canSwitchMode: true,
    });

    setLines((prev) => [...prev, { text: `$ ${trimmed}`, tone: "prompt" }, ...resultLines]);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);
    setValue("");

    if (action?.type === "clear") {
      setLines([]);
    } else if (action?.type === "navigate") {
      setMode("site");
      router.push(action.href);
    } else if (action?.type === "download") {
      const link = document.createElement("a");
      link.href = action.href;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action?.type === "mode") {
      setMode(action.value);
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

  const toneClass = {
    prompt: "text-accent-warm",
    accent: "text-accent",
    error: "text-[var(--danger)]",
    output: "text-text-dim",
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-bg">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="font-mono text-xs text-text-faint">neal@portfolio:~ — power-user mode</span>
        <button
          type="button"
          onClick={() => setMode("site")}
          className="font-mono text-xs text-text-dim hover:text-accent-warm border border-border rounded-md px-3 py-1.5 transition-colors"
        >
          ← site view
        </button>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto px-6 py-6 font-mono text-sm space-y-1 max-w-3xl w-full mx-auto"
      >
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${toneClass[line.tone] ?? "text-text-dim"}`}>
            {line.text || "\u00a0"}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border px-6 py-4 max-w-3xl w-full mx-auto"
      >
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
  );
}