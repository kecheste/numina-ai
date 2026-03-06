"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import type { NumerologyBlueprintResponse } from "@/lib/api-client";

const DEFAULT_NUMEROLOGY_DATA: NumerologyBlueprintResponse["items"] = [
  {
    number: "4",
    title: "Life Path",
    description:
      "Your life path number reflects your core purpose and the lessons you're here to learn.",
  },
  {
    number: "7",
    title: "Soul Urge",
    description:
      "Your soul urge reveals what your heart truly desires and what motivates you from within.",
  },
];

interface NumerologyBlueprintResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  content?: NumerologyBlueprintResponse["items"] | null;
}

export function NumerologyBlueprintResult({
  onClose,
  shellRef,
  content = undefined,
}: NumerologyBlueprintResultProps) {
  const items =
    content && content.length > 0 ? content : DEFAULT_NUMEROLOGY_DATA;
  const isLoading = content === null;

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-black">
        <div className="flex items-center justify-between w-full bg-black px-[24px] py-2 border-b border-gray-800/30">
          <div className="w-10" />
          <NuminaLogoIcon />
          <div className="w-10" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
          <p
            style={{ fontFamily: "var(--font-gotham)" }}
            className="text-[14px] font-[350] text-[#F2D08C]"
          >
            Preparing your numerology blueprint…
          </p>
        </div>
      </div>
    );
  }

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

      <div className="flex flex-col items-center text-center flex-1 px-[32px] pt-8 pb-12">
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[300] text-[#FFFFFF] mb-8"
        >
          Your Numerology Blueprint
        </h1>

        <div className="w-full space-y-6 mb-6">
          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-2 w-full text-left">
              <div className="col-span-1 flex items-center justify-center">
                <span
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[58px] font-[400] text-white"
                >
                  {item.number}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-[#FFFFFF] text-[48px] font-[300]">→</span>
              </div>
              <div className="col-span-4">
                <h3
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[15px] font-[400] text-[#FFFFFF] mb-0.5"
                >
                  {item.title}
                </h3>
                <p
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[13px] font-[350] text-[#F2D08C]"
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={onClose}
          style={{
            fontFamily: "var(--font-gotham)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer mt-[150px] mb-auto hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
