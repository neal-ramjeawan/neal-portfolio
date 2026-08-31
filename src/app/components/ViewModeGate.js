"use client";

import { ViewModeProvider, useViewMode } from "../context/ViewMode";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Terminal from "./Terminal";
import TerminalHome from "./TerminalHome";

function Gate({ children }) {
  const { mode } = useViewMode();

  if (mode === "terminal") {
    return <TerminalHome />;
  }

  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <Terminal />
    </>
  );
}

export default function ViewModeGate({ children }) {
  return (
    <ViewModeProvider>
      <Gate>{children}</Gate>
    </ViewModeProvider>
  );
}