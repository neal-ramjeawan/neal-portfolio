"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

const STORAGE_KEY = "view-mode";
const ViewModeContext = createContext(null);

function subscribe(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "terminal" ? "terminal" : "site";
}

// Always "site" during SSR — localStorage doesn't exist on the server.
// useSyncExternalStore reconciles this against the real client value
// automatically on hydration, without a manual effect or a setState
// call that could cascade renders.
function getServerSnapshot() {
  return "site";
}

export function ViewModeProvider({ children }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setMode = useCallback((next) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    // The "storage" event only fires in *other* tabs by default — dispatch
    // it manually so this tab's own toggle updates immediately too.
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  return (
    <ViewModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used within ViewModeProvider");
  return ctx;
}