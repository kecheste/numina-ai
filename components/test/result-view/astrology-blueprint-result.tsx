"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { SunIcon } from "@/components/icons/sun-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { RisingIcon } from "@/components/icons/rising-icon";
import type { AstrologyBlueprintResponse } from "@/lib/api-client";

interface AstrologyBlueprintResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  content?: AstrologyBlueprintResponse | null;
}

const DEFAULT_SUN =
  "Your sun sign shapes your core personality and life direction.";
const DEFAULT_MOON =
  "Your moon sign reveals how you process emotions and seek comfort.";
const DEFAULT_RISING =
  "Your rising sign reflects how others see you and your outward style.";
const DEFAULT_COSMIC =
  "🜂 Element: —\n☌ Modality: —\n♇ Ruling Planet: —\n🌠 Most active house: —";

export function AstrologyBlueprintResult({
  onClose,
  shellRef,
  content = undefined,
}: AstrologyBlueprintResultProps) {
  const sunDesc = content?.sun_description?.split(". ")[0] ?? DEFAULT_SUN;
  const moonDesc = content?.moon_description?.split(". ")[0] ?? DEFAULT_MOON;
  const risingDesc =
    content?.rising_description?.split(". ")[0] ?? DEFAULT_RISING;
  const cosmicSummary = content?.cosmic_traits_summary ?? DEFAULT_COSMIC;
  const isLoading = content === null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
        <div
          ref={shellRef}
          style={{ fontFamily: "var(--font-gotham)" }}
          className="relative pt-4 w-full h-dvh sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-hidden flex flex-col items-center text-center"
        >
          <div className="flex items-center border-b justify-between w-full bg-black pb-4 px-[24px] z-40 shrink-0">
            <div />
            <NuminaLogoIcon />
            <div />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[14px] font-[350] text-[#F2D08C]"
            >
              Preparing your astrological blueprint…
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative pt-4 w-full h-dvh sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-hidden flex flex-col items-center text-center"
      >
        <div className="flex items-center border-b justify-between w-full bg-black pb-4 px-[24px] z-40 shrink-0">
          <div className="w-10" />
          <NuminaLogoIcon />
          <AppDrawer
            isPremium={false}
            portalContainer={shellRef}
            onLogout={() => {}}
          />
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto pb-4">
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
                  {sunDesc}
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
                  {moonDesc}
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
                  {risingDesc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 w-full text-left mt-2 mb-4">
              <div className="col-span-1" />
              <div className="col-span-4">
                <h3
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "33px",
                  }}
                  className="text-[21px] font-[400] text-[#F2D08C] mb-2"
                >
                  Cosmic Traits Summary:
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "21px",
                  }}
                  className="text-[13px] font-[350] text-white whitespace-pre-line"
                >
                  {cosmicSummary}
                </p>
              </div>
            </div>

            <Button
              onClick={onClose}
              style={{
                fontFamily: "var(--font-gotham)",
                fontWeight: 400,
                lineHeight: "33px",
              }}
              className="cursor-pointer mt-[10px] hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors flex-shrink-0"
            >
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
