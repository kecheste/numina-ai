import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
    const scrollable = scrollableProp !== undefined ? scrollableProp : !isHomeRoute;

    return (
      <div className="flex items-center justify-center bg-white px-0 sm:px-4 min-h-dvh overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "w-full h-dvh sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black flex flex-col items-center text-center",
            scrollable ? "overflow-y-auto" : "overflow-hidden",
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

MobileFrame.displayName = "MobileFrame";
