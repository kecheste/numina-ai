"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    router.replace("/welcome");
  }, [router, isLoading]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative">
        <div className="relative w-12 h-12 rounded-full border border-[#F2D08C]/40 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-[#F2D08C] animate-[scalePulse_1.4s_ease-in-out_infinite]" />
        </div>
      </div>

      <span
        className="mt-6 text-xs tracking-[0.3em] text-[#F2D08C]/70 uppercase"
        style={{ fontFamily: "var(--font-gotham)" }}
      >
        Loading
      </span>

      <style jsx>{`
        @keyframes scalePulse {
          0% {
            transform: scale(0.6);
            opacity: 0.6;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.6);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
