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
import { MobileFrame } from "@/components/layout/mobile-frame";

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

  return (
    <div className="fixed inset-0 z-50">
      <MobileFrame
        ref={shellRef}
        scrollable={true}
        className="relative pt-2"
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

          <div className="flex flex-col items-center mb-[40px]">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {data?.title?.replace("The ", "")}
            </h2>
            <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px]">
              {data?.oneSentenceInsight || "Balance between your energy modes is currently low"}
            </p>
          </div>

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
      </MobileFrame>
    </div>
  );
}
