"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { ChakraFullIcon } from "@/components/icons/chakra-full";

const GOLD = "#F2D08C";

const DEFAULT_STRONGEST =
  "Your energy flows most freely through your Crown Chakra, indicating heightened intuition or spiritual awareness.";
const DEFAULT_NEEDS_BALANCE =
  "You may want to bring attention to your Root Chakra, which governs your sense of stability and grounding.";

interface ChakraPreviewResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  strongestChakra?: string | null;
  needsBalance?: string | null;
}

export function ChakraPreviewResult({
  onClose,
  shellRef,
  strongestChakra,
  needsBalance,
}: ChakraPreviewResultProps) {
  const strongest = strongestChakra?.trim() || DEFAULT_STRONGEST;
  const needs = needsBalance?.trim() || DEFAULT_NEEDS_BALANCE;

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center justify-between w-full bg-black px-[24px] py-2 border-b border-gray-800/30 flex-shrink-0">
        <div className="w-10" />
        <NuminaLogoIcon />
        <AppDrawer
          isPremium={false}
          portalContainer={shellRef}
          onLogout={() => {}}
        />
      </div>

      <div className="flex flex-col items-center text-center flex-1 overflow-y-auto px-[32px] sm:px-[59px] pt-6 pb-8">
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[350] text-white mb-8"
        >
          Chakra Result Preview
        </p>

        <div className="flex justify-center mb-8">
          <ChakraFullIcon />
        </div>

        <h2
          className="text-[21px] text-center mb-6"
          style={{
            color: GOLD,
            fontFamily: "var(--font-gotham)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
        >
          Your Current Energetic Flow
        </h2>

        <div
          className="mb-4 text-center"
          style={{ fontFamily: "var(--font-gotham)" }}
        >
          <p className="text-[12px] text-gray-100 mb-2 font-[350]">
            Your strongest chakra:
          </p>
          <p className="text-[12px] font-[325]" style={{ color: GOLD }}>
            {strongest}
          </p>
        </div>

        <div
          className="mb-8 text-center"
          style={{ fontFamily: "var(--font-gotham)" }}
        >
          <p className="text-[12px] font-[350] text-gray-100 mb-2">
            Needs balancing:
          </p>
          <p className="text-[12px] font-[325]" style={{ color: GOLD }}>
            {needs}
          </p>
        </div>

        <p
          style={{ fontFamily: "var(--font-gotham)" }}
          className="text-[13px] text-white px-2 mb-8 text-center font-[325]"
        >
          Your energy snapshot is only one layer of your self-discovery. Let's
          now look deeper into your personality and patterns.
        </p>

        <Button
          onClick={onClose}
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer hover:bg-[#F2D08CC0] w-full h-[67px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[21px] transition-colors flex-shrink-0"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
