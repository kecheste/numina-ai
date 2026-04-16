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
    <>
      <NuminaLogoIcon />
      <div className="w-10 h-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mt-4" />
    </>
  );
}
