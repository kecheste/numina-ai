"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";

interface ShellContextType {
  shellRef: React.RefObject<HTMLDivElement | null>;
  scrollable: boolean;
  setScrollable: (scrollable: boolean) => void;
  showSubscription: boolean;
  setShowSubscription: (show: boolean) => void;
}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [scrollable, setScrollable] = useState(true);
  const [showSubscription, setShowSubscription] = useState(false);

  return (
    <ShellContext.Provider 
      value={{ 
        shellRef, 
        scrollable, 
        setScrollable,
        showSubscription,
        setShowSubscription
      }}
    >
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  const context = useContext(ShellContext);
  if (context === undefined) {
    throw new Error("useShell must be used within a ShellProvider");
  }
  return context;
}
