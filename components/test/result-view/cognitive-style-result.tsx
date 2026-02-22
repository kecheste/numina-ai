"use client";

import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";

interface CognitiveStyleResultProps {
  onClose: () => void;
}

export function CognitiveStyleResult({ onClose }: CognitiveStyleResultProps) {
  return (
    <div className="flex flex-col items-center text-center h-full px-[32px] pb-12">
      <div className="flex justify-center mb-12 mt-4">
        <NuminaLogoIcon />
      </div>

      <h1
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "33px",
        }}
        className="text-[18px] font-[300] text-[#FFFFFF] mb-6"
      >
        Discover Your Cognitive Blueprint
      </h1>

      <p
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "19px",
        }}
        className="text-[12px] font-[300] text-[#F2D08C] mb-6"
      >
        This quick personality test is based on the MBTI framework. It helps us
        understand how you process information, make decisions, and interact
        with the world. Your result will be used to align future insights in
        your Soul Map — from relationships to purpose.
      </p>

      <p
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "19px",
        }}
        className="text-[13px] font-[300] text-[#FFFFFF] px-12"
      >
        You'll get a basic result now, and the{"\n"}option to dive deeper later.
      </p>

      <Button
        onClick={onClose}
        style={{
          fontFamily: "var(--font-gotham)",
          fontWeight: 400,
          lineHeight: "33px",
        }}
        className="cursor-pointer mt-[100px] mb-auto hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
      >
        Continue
      </Button>
    </div>
  );
}
