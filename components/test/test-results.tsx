"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black border border-[#1f1f1f] px-[54px] py-10 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        {/* Subtitle */}
        <p className="text-[21px] text-center text-white mb-8">
          Chakra Result Preview
        </p>

        {/* Chakra Vector */}
        <div className="flex justify-center mb-8">
          <Image
            src="/vectors/chakra-full.png"
            alt="Chakra Result"
            width={220}
            height={360}
            priority
          />
        </div>

        {/* Section title */}
        <h2
          className="text-[21px] font-semibold text-center mb-6"
          style={{ color: GOLD }}
        >
          Your Current Energetic Flow
        </h2>

        {/* Strongest chakra */}
        <div className="mb-4 text-center">
          <p className="text-[12px] text-gray-100 mb-2">
            Your strongest chakra:
          </p>
          <p className="text-[12px]" style={{ color: GOLD }}>
            “Your energy flows most freely through your Crown Chakra, indicating
            heightened intuition or spiritual awareness.”
          </p>
        </div>

        {/* Needs balance */}
        <div className="mb-8 text-center">
          <p className="text-[12px] text-gray-100 mb-2">Needs balancing:</p>
          <p className="text-[12px]" style={{ color: GOLD }}>
            “You may want to bring attention to your Root Chakra, which governs
            your sense of stability and grounding.”
          </p>
        </div>

        {/* Footer text */}
        <p className="text-[13px] text-white px-10 mb-10 text-center font-[100]">
          Your energy snapshot is only one layer of your self-discovery. Let’s
          now look deeper into your personality and patterns.
        </p>

        {/* Continue button */}
        <Button
          onClick={onClose}
          className="cursor-pointer mt-[39px] hover:bg-[#F2D08CC0] w-full h-[67px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[21px] transition-colors text-base"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
