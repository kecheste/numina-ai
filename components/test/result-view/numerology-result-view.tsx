"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import type { NumerologyResponse } from "@/lib/api-client";

export function NumerologyResultView({
  data,
  onClose,
  shellRef,
  onLogout,
}: {
  data: NumerologyResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
      >
        <div className="flex items-center border-b border-gray-500/30 justify-between w-full bg-black px-[28px] py-2 flex-shrink-0">
          <button onClick={onClose} className="cursor-pointer">
            <Icon icon="icons8:left-arrow" color="#D9D9D9" width={30} className="mt-1.5" />
          </button>
          <NuminaLogoIcon className="mb-2" />
          <AppDrawer isPremium={false} portalContainer={shellRef} onLogout={onLogout} />
        </div>

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <h1 className="text-[21px] font-[400] text-white mb-2" style={{ lineHeight: "33px" }}>
            Your Numerology
          </h1>
          <p className="text-[14px] font-[350] text-white/90 mb-8" style={{ lineHeight: "21px" }}>
            Based on your birth date and name
          </p>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
            <div className="col-span-1 flex items-center justify-center w-10 h-10 rounded-full border border-[#F2D08C]/50 text-[#F2D08C] text-lg font-[400]">
              {data.life_path}
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">Life Path Number</h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">
                Your core path and life theme
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-6">
            <div className="col-span-1 flex items-center justify-center w-10 h-10 rounded-full border border-[#F2D08C]/50 text-[#F2D08C] text-lg font-[400]">
              {data.soul_urge}
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">Soul Urge / Heart&apos;s Desire</h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">
                Inner motivation from the vowels in your name
              </p>
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full text-[16px] rounded-[10px] h-[56px] bg-[#F2D08C] text-black font-[400] mt-auto"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
