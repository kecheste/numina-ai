"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChakraFullIcon } from "../icons/chakra-full";

interface TestResultsProps {
  testTitle: string;
  category: string;
  onClose: () => void;
  resultData?: {
    personalityType: string;
    insights: string[];
    recommendations: string[];
    score: number;
  } | null;
}

const GOLD = "#F2D08C";

export function TestResults({ onClose }: TestResultsProps) {
  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 h-screen overflow-hidden">
      <div
        className="
          w-full
          h-screen
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          overflow-y-auto
          sm:overflow-hidden
          flex
          flex-col
          items-center
          text-center
          px-[32px]
          sm:px-[59px]
          pb-12
          pt-4
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-book text-center text-white mb-3"
        >
          Chakra Result Preview
        </p>

        {/* Chakra Vector */}
        <div className="flex justify-center mb-6">
          <ChakraFullIcon />
        </div>

        {/* Section title */}
        <h2
          className="text-[21px] font-bold text-center mb-4"
          style={{
            color: GOLD,
            fontFamily: "var(--font-gotham)",
            fontWeight: "400",
            lineHeight: "33px",
          }}
        >
          Your Current Energetic Flow
        </h2>

        {/* Strongest chakra */}
        <div
          className="mb-2 text-center"
          style={{
            fontFamily: "var(--font-gotham)",
          }}
        >
          <p className="text-[12px] text-gray-100 mb-2 font-[350]">
            Your strongest chakra:
          </p>
          <p className="text-[12px] font-[325]" style={{ color: GOLD }}>
            “Your energy flows most freely through your Crown Chakra, indicating
            heightened intuition or spiritual awareness.”
          </p>
        </div>

        {/* Needs balance */}
        <div
          style={{
            fontFamily: "var(--font-gotham)",
          }}
          className="mb-6 text-center"
        >
          <p className="text-[12px] font-[350] text-gray-100 mb-2">
            Needs balancing:
          </p>
          <p className="text-[12px] font-[325]" style={{ color: GOLD }}>
            “You may want to bring attention to your Root Chakra, which governs
            your sense of stability and grounding.”
          </p>
        </div>

        {/* Footer text */}
        <p
          style={{
            fontFamily: "var(--font-gotham)",
          }}
          className="text-[13px] text-white text-center font-[325] mb-4"
        >
          Your energy snapshot is only one layer of your self-discovery. Let’s
          now look deeper into your personality and patterns.
        </p>

        {/* Continue button */}
        <Button
          onClick={onClose}
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer mt-auto hover:bg-[#F2D08CC0] w-full h-[67px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[21px] transition-colors text-base"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
