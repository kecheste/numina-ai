"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ShellProvider, useShell } from "@/contexts/ShellContext";
import { MobileFrame } from "@/components/layout/mobile-frame";

function ShellContainer({ children }: { children: React.ReactNode }) {
  const { shellRef, scrollable } = useShell();
  return (
    <MobileFrame ref={shellRef} scrollable={scrollable}>
      {children}
    </MobileFrame>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60 * 1000 },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ShellProvider>
        <ShellContainer>{children}</ShellContainer>
      </ShellProvider>
    </QueryClientProvider>
  );
}
