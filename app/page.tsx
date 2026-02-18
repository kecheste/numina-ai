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
    router.replace(isAuthenticated ? "/home" : "/welcome");
  }, [router, isAuthenticated, isLoading]);

  return (
    <div className="flex h-screen bg-white sm:items-center sm:justify-center">
      <div
        className="
          relative
          w-full
          h-screen
          bg-black
          flex
          flex-col 
          items-center
          justify-center
          sm:h-auto
          sm:max-w-[450px]
          sm:aspect-[9/20]
          sm:border
          sm:border-[#1f1f1f]
        "
      >
        <NuminaLogoIcon />

        <div className="w-10 h-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mt-4" />
      </div>
    </div>
  );
}
