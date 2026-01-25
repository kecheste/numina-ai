"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { TestResults } from "./test-results";

const GOLD = "#F2D08C";

interface TestResultData {
  personalityType: string;
  insights: string[];
  recommendations: string[];
  score: number;
}

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
  const [showResults, setShowResults] = useState<boolean>(false);
  const [resultData, setResultData] = useState<TestResultData | null>(null);

  if (showResults) {
    return (
      <TestResults
        testTitle={testTitle}
        category={category}
        onClose={onClose}
        resultData={resultData}
      />
    );
  }

  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 min-h-screen">
      <div
        className="
          w-full
          h-screen
          sm:h-auto
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          border
          border-[#1f1f1f]
          px-[32px]
          sm:px-[54px]
          py-10
          flex
          flex-col
        "
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-12">
          <button onClick={onClose} className="cursor-pointer">
            <Icon icon={"icons8:left-arrow"} color="#D9D9D9" width={33} />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Image src="/logo.png" alt="NuminaAI" width={150} height={36} />
          </div>

          <Icon
            icon={"material-symbols-light:menu"}
            color="#D9D9D9"
            width={40}
            className="cursor-pointer"
          />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-center font-book text-white text-[21px] font-[300] mb-4"
        >
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
          className="text-center text-[21px] mb-4"
          style={{
            color: "#F2D08C",
            fontFamily: "var(--font-gotham)",
            fontWeight: 350,
            lineHeight: "27px",
          }}
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
              style={{
                fontFamily: "var(--font-gotham)",
                fontWeight: 350,
              }}
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
          className="mt-auto mb-[107px] h-[54px] cursor-pointer rounded-[10px] text-lg font-medium"
          style={{
            backgroundColor: GOLD,
            color: "black",
            opacity: selected ? 1 : 0.5,
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          onClick={() => {
            setShowResults(true);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
