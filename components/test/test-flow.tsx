"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOLD = "#F2D08C";

export function TestFlow({
  testId,
  testTitle,
  category,
  onClose,
}: {
  testId: number;
  testTitle: string;
  category: string;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black border border-[#1f1f1f] px-[29px] py-10 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-12">
          <button onClick={onClose}>
            <ArrowLeft className="text-white cursor-pointer" size={32} />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Image src="/logo.png" alt="NuminaAI" width={150} height={36} />
          </div>

          <Menu className="text-white cursor-pointer" size={32} />
        </div>

        {/* Subtitle */}
        <p className="text-center text-white text-[21px] font-[300] mb-4">
          Discover Your Cognitive Blueprint
        </p>

        {/* Progress */}
        <div className="mb-10">
          <div className="h-[15px] w-full relative rounded-full bg-transparent border-[0.5px] border-[#F2D08C] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "37.5%", backgroundColor: GOLD }}
            />
            <p className="text-white text-[10px] font-[400] absolute right-0">
              3/8
            </p>
          </div>
        </div>

        {/* Question */}
        <h2
          className="text-center text-[20px] font-semibold leading-relaxed mb-10"
          style={{ color: GOLD }}
        >
          How do you feel about deadlines?
        </h2>

        {/* Answers */}
        <div className="space-y-4 mb-auto">
          {[
            "I like knowing what's expected and when",
            "I prefer keeping things flexible",
          ].map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`w-full h-[74px] cursor-pointer px-4 py-4 rounded-xl text-sm text-left transition-all border-[0.5px]
                ${
                  selected === option
                    ? "bg-[#F2D08C] text-black border-[#F2D08C]"
                    : "bg-transparent text-white border-[#5A4A2A]"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Continue */}
        <Button
          disabled={!selected}
          className="mt-10 h-[54px] rounded-xl text-lg font-medium"
          style={{
            backgroundColor: GOLD,
            color: "black",
            opacity: selected ? 1 : 0.5,
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
