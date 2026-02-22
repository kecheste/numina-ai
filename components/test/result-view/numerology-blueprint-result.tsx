"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";

const NUMEROLOGY_DATA = [
  {
    number: "4",
    title: "Life Path",
    description:
      "You are a grounded builder. Practical, determined, structured",
  },
  {
    number: "7",
    title: "Expression",
    description:
      "You express wisdom and seek inner truth. Deep thinker, reflective",
  },
  {
    number: "6",
    title: "Soul Urge",
    description: "You long for harmony, love, and nurturing relationships",
  },
  {
    number: "15",
    title: "Birthday",
    description: "Creative and versatile. You bring charm and dynamic energy",
  },
];

interface NumerologyBlueprintResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function NumerologyBlueprintResult({
  onClose,
  shellRef,
}: NumerologyBlueprintResultProps) {
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
          {NUMEROLOGY_DATA.map((item, idx) => (
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
          Done
        </Button>
      </div>
    </div>
  );
}
