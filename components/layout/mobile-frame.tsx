"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DesktopBackground } from "@/components/icons/desktop-background";

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

export const MobileFrame = forwardRef<HTMLDivElement, MobileFrameProps>(
  ({ children, className, scrollable: scrollableProp }, ref) => {
    const pathname = usePathname();

    // Default to scrollable unless explicitly set or on a /home route
    const isHomeRoute = pathname?.startsWith("/home");
    const scrollable =
      scrollableProp !== undefined ? scrollableProp : !isHomeRoute;

    return (
      <div className="flex items-center justify-center bg-black px-0 sm:px-4 min-h-dvh overflow-hidden relative">
        {/* Desktop Background SVG - Only visible on sm screens and up */}
        <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none">
          <DesktopBackground className="w-full h-full max-w-[1200px]" />
        </div>

        <div
          ref={ref}
          className={cn(
            "w-full h-dvh sm:h-[90vh] sm:max-w-[420px] sm:aspect-[9/19.5] bg-black flex flex-col items-center text-center relative z-10 sm:rounded-[40px] sm:border-[8px] sm:border-[#1A1A1A] sm:shadow-2xl sm:overflow-hidden",
            scrollable ? "overflow-y-auto" : "overflow-hidden",
            className,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

MobileFrame.displayName = "MobileFrame";
