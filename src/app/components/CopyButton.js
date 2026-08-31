"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "./icons";

export default function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (older browser, no permission, etc.) —
      // fail silently, the value is still visible to select and copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied!" : label}
      className="inline-flex items-center justify-center rounded p-1 text-text-faint hover:text-accent-warm transition-colors shrink-0"
    >
      {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
    </button>
  );
}