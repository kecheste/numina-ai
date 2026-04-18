"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import {
  Flame,
  Mountain,
  Wind,
  Droplets,
  Zap,
  Target,
  RefreshCw,
} from "lucide-react";
import { BluePrint } from "../../components/Blueprint";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { TryThis } from "../../components/TryThis";
interface ZodiacElementModalityResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout: () => void;
}

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "#FF4D4D",
  Earth: "#4CAF50",
  Air: "#00BFFF",
  Water: "#9370DB",
};

const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  Fire: <Flame className="w-5 h-5" />,
  Earth: <Mountain className="w-5 h-5" />,
  Air: <Wind className="w-5 h-5" />,
  Water: <Droplets className="w-5 h-5" />,
};

const MODALITY_ICONS: Record<string, React.ReactNode> = {
  Cardinal: <Zap className="w-5 h-5" />,
  Fixed: <Target className="w-5 h-5" />,
  Mutable: <RefreshCw className="w-5 h-5" />,
};

interface ZodiacLLMResult {
  title?: string;
  energyProfile?: string;
  coreTraits?: string[];
  strengths?: string[];
  challenges?: string[];
  shadowPattern?: string;
  dailyEvolution?: string[];
}

export function ZodiacElementModalityResultView({
  result,
  onLogout,
  onClose,
}: ZodiacElementModalityResultProps) {
  const data = (result.llm_result_json as ZodiacLLMResult) || {};
  const extracted = result.extracted_json || {};

  const element = extracted.dominant_element || "Fire";
  const modality = extracted.modality || "Cardinal";
  const accentColor = ELEMENT_COLORS[element] || "#F2D08C";

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2">
      <AppBar
        handleBack={onClose}
        handleLogout={onLogout}
      />

      <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto w-full">
        <h1
          style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
          className="text-[20px] font-[350] text-[#FFFFFF] text-center"
        >
          Your zodiac element & modality
        </h1>
        <div
          className="flex items-center my-[36px] gap-2 text-[13px] font-[400] tracking-wider text-center w-full justify-center"
          style={{ color: accentColor }}
        >
          <span className="uppercase text-[#F2D08C] border border-[#F2D08C] rounded-[5px] px-2 text-[16px]">
            {modality}
          </span>
          <span className="uppercase text-[#F2D08C] border border-[#F2D08C] rounded-[5px] px-2 text-[16px]">
            {element}
          </span>
        </div>

        <BluePrint title="" blueprint={data?.energyProfile} />

        {/* Big Three Summary */}
        <div className="flex flex-col gap-[9px] mb-10 items-start">
          <SmallTraitCard label="Sun" value={extracted.sun_sign} />
          <SmallTraitCard label="Moon" value={extracted.moon_sign} />
          <SmallTraitCard label="Rising" value={extracted.rising_sign} />
        </div>

        <CoreTraits coreTraits={data.coreTraits} />
        <Strength strengths={data.strengths} />
        <Challenge challenges={data.challenges} />

        <SpiritualInsight
          title="Shadow Pattern"
          spiritualInsight={data.shadowPattern}
        />

        <TryThis tryThis={data.dailyEvolution} />
      </div>
    </div>
  );
}

function SmallTraitCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#F2D08C] rounded-[5px] px-2 flex items-center">
      <span className="text-[13px] lowercase text-[#FFFFFF]">{label} </span>
      <span className="text-[13px] text-[#F2D08C]"> - {value}</span>
    </div>
  );
}
