"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      style={{ fontFamily: "var(--font-gotham)" }}
      className="flex flex-col h-[100dvh] w-full bg-black relative pt-4 pb-4"
    >
      <div className="bg-black border-b border-white/10 w-full flex justify-between items-center text-xs text-gray-400 pb-4 z-40 relative px-[24px] shrink-0">
        <button
          onClick={() => router.back()}
          className="cursor-pointer w-[32px] h-[32px]"
        >
          <Icon
            icon="icons8:left-arrow"
            color="#D9D9D9"
            width={30}
            className="mt-1.5"
          />
        </button>
        <NuminaLogoIcon />
        <div className="w-[32px] h-[32px]"></div>
      </div>

      <div className="flex-1 overflow-y-auto w-full pt-6">{children}</div>
    </div>
  );
}
