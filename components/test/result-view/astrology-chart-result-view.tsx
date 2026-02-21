"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { SunIcon } from "@/components/icons/sun-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { RisingIcon } from "@/components/icons/rising-icon";
import type { AstrologyChartResponse } from "@/lib/api-client";

function formatSign(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AstrologyChartResultView({
  chart,
  onClose,
  shellRef,
  onLogout,
}: {
  chart: AstrologyChartResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}) {
  const el = chart.element_distribution;
  const elements = [
    el.fire > 0 && { name: "Fire", count: el.fire },
    el.earth > 0 && { name: "Earth", count: el.earth },
    el.air > 0 && { name: "Air", count: el.air },
    el.water > 0 && { name: "Water", count: el.water },
  ].filter(Boolean) as { name: string; count: number }[];

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
            Your Astrology Chart
          </h1>
          <p className="text-[14px] font-[350] text-white/90 mb-8" style={{ lineHeight: "21px" }}>
            Based on your birth date, time, and place
          </p>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
            <div className="col-span-1">
              <SunIcon />
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">Sun Sign</h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">{formatSign(chart.sun_sign)}</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
            <div className="col-span-1">
              <MoonIcon />
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">Moon Sign</h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">{formatSign(chart.moon_sign)}</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-6">
            <div className="col-span-1">
              <RisingIcon />
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">Rising Sign</h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">{formatSign(chart.rising_sign)}</p>
            </div>
          </div>

          <h3 className="text-[18px] font-[400] text-[#F2D08C] mb-2" style={{ lineHeight: "33px" }}>
            Element distribution
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {elements.length > 0 ? (
              elements.map(({ name, count }) => (
                <span
                  key={name}
                  className="border border-[#F2D08C]/50 rounded-[8px] px-3 py-1.5 text-[13px] font-[350] text-[#F2D08C]"
                >
                  {name} {count}
                </span>
              ))
            ) : (
              <span className="text-[13px] text-white/70">—</span>
            )}
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
