"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import { DimensionScores } from "../../components/DimensionScores";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { BluePrint } from "../../components/Blueprint";

interface EnergyArchetypeResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}

export function EnergyArchetypeResult({
  result,
  onLogout,
  onClose,
  shellRef,
}: EnergyArchetypeResultProps) {
  const data = result.llm_result_json || {};
  const extracted = result.extracted_json || {};
  const scores = extracted.scores || {};
  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const archetypeColors: Record<string, string> = {
    visionary: "#F2D08C",
    analyst: "#8CB8F2",
    integrator: "#8CF2BB",
    overloaded: "#F28C8C",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col pt-2"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <h1
            style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
            className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
          >
            Your Energy Archetype
          </h1>

          {extracted.balance_score !== undefined && (
            <div className="mb-[40px] flex flex-col items-center">
              <p className="text-[#F2D08C] text-[13px] uppercase">
                Balance Score
              </p>
              <p className="text-[#F2D08C] px-4 pt-1 border border-[#F2D08C] rounded-[5px] font-bold text-[18px]">
                {extracted.balance_score}%
              </p>
              <p className="text-[#D9D9D9] text-[11px] pt-[12px] px-[40px]">
                Reflects the alignment between your Integrator and Overloaded
                Circuit dimensions.
              </p>
            </div>
          )}

          <DimensionScores
            title="Dimension Profile"
            dimensions={[
              { key: "visionary", label: "Visionary" },
              { key: "analyst", label: "Analyst" },
              { key: "integrator", label: "Integrator" },
              { key: "overloaded", label: "Overloaded Circuit" },
            ]}
            scores={scores}
          />

          <CoreTraits coreTraits={traits} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <SpiritualInsight spiritualInsight={data.spiritualInsight} />

          <BluePrint title="Energy Archetype" blueprint={data.summary} />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </div>
    </div>
  );
}
