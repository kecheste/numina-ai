"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { SunIcon } from "@/components/icons/sun-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { RisingIcon } from "@/components/icons/rising-icon";

interface AstrologyBlueprintResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function AstrologyBlueprintResult({
  onClose,
  shellRef,
}: AstrologyBlueprintResultProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between w-full bg-black px-[24px] py-2 border-b border-gray-800/30">
        <div className="w-10" />
        <NuminaLogoIcon />
        <AppDrawer
          isPremium={false}
          portalContainer={shellRef}
          onLogout={() => {}}
        />
      </div>

      <div className="flex flex-col items-center text-center flex-1 px-[32px] pt-6 pb-12 overflow-y-auto">
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[300] text-[#FFFFFF] mb-2"
        >
          Your Astrological Blueprint
        </h1>

        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "21px",
          }}
          className="text-[14px] font-[350] text-[#FFFFFF] mb-8"
        >
          The sky at the moment of your birth reveals powerful patterns that
          shape your life
        </p>

        <div className="grid grid-cols-5 gap-2 w-full text-left mb-3">
          <div className="col-span-1">
            <SunIcon />
          </div>
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[15px] font-[350] text-[#FFFFFF] mb-0.5"
            >
              Sun Sign
            </h3>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Core personality: Intense, intuitive, transformative
            </p>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              You're driven by depth, truth, and emotional mastery. You rarely
              settle for surface-level anything.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 w-full text-left mb-3">
          <div className="col-span-1">
            <MoonIcon />
          </div>
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[14px] font-[400] text-white mb-0.5"
            >
              Moon Sign
            </h3>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Emotional self: [e.g. Sensitive, nurturing, private]
            </p>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Your inner world is shaped by your moon sign, revealing how you
              process feelings and seek comfort.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
          <div className="col-span-1">
            <RisingIcon />
          </div>
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[14px] font-[400] text-white mb-0.5"
            >
              Rising Sign
            </h3>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              How others see you: [e.g. Magnetic, mysterious, calm]
            </p>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Your rising sign reflects your outward vibe — the way you move
              through the world and first impressions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 w-full text-left mt-2 mb-4">
          <div className="col-span-1" />
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[21px] font-[400] text-[#F2D08C] mb-2"
            >
              Cosmic Traits Summary:
            </h3>
            <div
              className="space-y-0.5"
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "21px" }}
            >
              <p className="text-[13px] font-[350] text-white">
                △ Element: [Water / Earth / Fire / Air]
              </p>
              <p className="text-[13px] font-[350] text-white">
                ♂ Modality: [Fixed / Mutable / Cardinal]
              </p>
              <p className="text-[13px] font-[350] text-white">
                ♇ Ruling Planet: [Pluto, etc.]
              </p>
              <p className="text-[13px] font-[350] text-white">
                🏠 Most active house: [e.g. 7th – Partnerships]
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={onClose}
          style={{
            fontFamily: "var(--font-gotham)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer mb-auto mt-[10px] hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors flex-shrink-0"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
