"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import { BluePrint } from "../../components/Blueprint";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { InnerMotivations } from "../../components/InnerMotivations";
import { DimensionGrid } from "../../components/DimensionGrid";
import { AlignmentAnalysis } from "../../components/AlignmentAnalysis";
interface SoulCompassResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout: () => void;
}

const DIMENSION_CONFIG = {
  mind: { label: "Mind", sublabel: "Clarity" },
  heart: { label: "Heart", sublabel: "Emotion" },
  body: { label: "Body", sublabel: "Grounding" },
  soul: { label: "Soul", sublabel: "Purpose" },
} as const;

function parseParas(val: unknown): string[] {
  if (typeof val === "string") return val.split("\n\n").filter(Boolean);
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  return [];
}

export function SoulCompassResult({
  result,
  onClose,
  onLogout,
}: SoulCompassResultProps) {
  const data = (result.llm_result_json as Record<string, any>) || {};
  const extracted = (result.extracted_json as Record<string, any>) || {};

  const analysis =
    typeof data.alignmentAnalysis === "object" &&
    !Array.isArray(data.alignmentAnalysis)
      ? (data.alignmentAnalysis as Record<string, string>)
      : {};
  const reflection = Array.isArray(data.suggestedReflection)
    ? data.suggestedReflection
    : [];

  const dims: Array<{ key: keyof typeof DIMENSION_CONFIG; value: number }> = [
    { key: "mind", value: extracted.mind ?? 0 },
    { key: "heart", value: extracted.heart ?? 0 },
    { key: "body", value: extracted.body ?? 0 },
    { key: "soul", value: extracted.soul ?? 0 },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2">
      <AppBar
        handleBack={onClose}
        handleLogout={onLogout}
      />

      <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto w-full">
        <h1
          style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
          className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
        >
          Your Soul Compass
        </h1>

        <div className="flex flex-col items-center mb-[40px]">
          <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
            {data?.title?.replace("The ", "")}
          </h2>
        </div>

        <DimensionGrid
          dims={dims}
          dimensionConfig={DIMENSION_CONFIG}
        />

        <BluePrint
          title="Decision Insight"
          blueprint={data.decisionInsight}
        />

        <AlignmentAnalysis
          dims={dims}
          analysis={analysis}
          dimensionConfig={DIMENSION_CONFIG}
        />

        <SpiritualInsight
          title="What This Means"
          spiritualInsight={data?.whatThisMeans}
        />

        <InnerMotivations
          innerMotivations={reflection}
          title="Suggested Reflection"
        />
      </div>
    </div>
  );
}
