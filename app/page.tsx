"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

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
