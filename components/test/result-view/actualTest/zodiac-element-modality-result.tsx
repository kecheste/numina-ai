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
  Activity,
  ShieldAlert,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface ZodiacElementModalityResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
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
  shellRef,
}: ZodiacElementModalityResultProps) {
  const data = (result.llm_result_json as ZodiacLLMResult) || {};
  const extracted = result.extracted_json || {};

  const element = extracted.dominant_element || "Fire";
  const modality = extracted.modality || "Cardinal";
  const accentColor = ELEMENT_COLORS[element] || "#F2D08C";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col pt-2"
      >
        <AppBar
          handleBack={onClose}
          shellRef={shellRef}
          handleLogout={onLogout}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-[20px] font-[500] text-[#FFFFFF] leading-tight mb-2">
              Zodiac Element & Modality
            </h1>
            <div
              className="flex items-center gap-2 text-[13px] font-[400] tracking-wider text-center w-full justify-center"
              style={{ color: accentColor }}
            >
              <span className="uppercase">{modality}</span>
              <span className="opacity-30">•</span>
              <span className="uppercase">{element}</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="space-y-4">
              {data.energyProfile?.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-white/90 text-[14px] leading-relaxed font-[300]"
                >
                  {paragraph}
                </p>
              )) || (
                <p className="text-white/90 text-[14px] leading-relaxed font-[300]">
                  Parsing your energy signature...
                </p>
              )}
            </div>
          </div>

          {/* Big Three Summary */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            <SmallTraitCard label="Sun" value={extracted.sun_sign} />
            <SmallTraitCard label="Moon" value={extracted.moon_sign} />
            <SmallTraitCard label="Rising" value={extracted.rising_sign} />
          </div>

          {/* Core Traits (Exactly 3) */}
          <div className="mb-10">
            <h2 className="text-white/40 text-[11px] uppercase tracking-[2px] font-[500] mb-4">
              Core Traits
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {(data.coreTraits || [])
                .slice(0, 3)
                .map((trait: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="text-white/90 text-[13px] font-[300]">
                      {trait}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-1 gap-4 mb-10">
            <div className="bg-[#A2F2CD]/5 border border-[#A2F2CD]/10 p-4 rounded-2xl">
              <h2 className="text-[#A2F2CD] text-[10px] uppercase tracking-[2px] font-[500] mb-3">
                Strengths
              </h2>
              <div className="space-y-2">
                {(data.strengths || [])
                  .slice(0, 3)
                  .map((s: string, i: number) => (
                    <p
                      key={i}
                      className="text-white/90 text-[12px] font-[400] leading-tight"
                    >
                      • {s}
                    </p>
                  ))}
              </div>
            </div>
            <div className="bg-[#F2A2A2]/5 border border-[#F2A2A2]/10 p-4 rounded-2xl">
              <h2 className="text-[#F2A2A2] text-[10px] uppercase tracking-[2px] font-[500] mb-3">
                Challenges
              </h2>
              <div className="space-y-2">
                {(data.challenges || [])
                  .slice(0, 3)
                  .map((c: string, i: number) => (
                    <p
                      key={i}
                      className="text-white/70 text-[12px] font-[300] leading-tight"
                    >
                      • {c}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Shadow Pattern */}
          {data.shadowPattern && (
            <div className="mb-10 p-5 bg-white/[0.02] border-t border-b border-white/10">
              <h2 className="text-white/40 text-[11px] uppercase tracking-[2px] font-[500] mb-3 flex justify-center gap-2">
                Shadow Pattern
              </h2>
              <p className="text-white/70 text-[13px] leading-relaxed font-[300]">
                {data.shadowPattern}
              </p>
            </div>
          )}

          {/* Daily Evolution */}
          {(data.dailyEvolution || []).length > 0 && (
            <div className="mb-12">
              <h2 className="text-white/40 text-[11px] uppercase tracking-[2px] font-[500] mb-4 flex justify-center gap-2">
                Daily Evolution
              </h2>
              <div className="space-y-4">
                {(data.dailyEvolution || [])
                  .slice(0, 2)
                  .map((tip: string, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full border border-amber-200/30" />
                      <p className="text-white/90 text-[13px] font-[300] leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Energy Breakdown Icons */}
          <div className="mt-auto pt-8 border-t border-white/5 flex justify-around opacity-30 pb-4">
            <div className="flex flex-col items-center gap-1">
              {ELEMENT_ICONS[element]}
              <span className="text-[9px] uppercase tracking-wider">
                {element}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              {MODALITY_ICONS[modality]}
              <span className="text-[9px] uppercase tracking-wider">
                {modality}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallTraitCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#FFFFFF0D] border border-white/5 rounded-xl py-3 px-2 flex flex-col items-center justify-center">
      <span className="text-[9px] uppercase tracking-[1px] text-white/40 mb-1">
        {label}
      </span>
      <span className="text-[12px] font-[400] text-white/90 truncate w-full text-center">
        {value}
      </span>
    </div>
  );
}
