"use client";

import React from "react";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { BluePrint } from "../../components/Blueprint";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";

interface StarseedOriginResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function StarseedOriginResultView({
  result,
  onClose,
  onLogout,
  shellRef,
}: StarseedOriginResultProps) {
  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};
  const scores = extracted.scores || {};

  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

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
            Your Starseed Origin
          </h1>

          <div className="flex flex-col items-center mb-[40px]">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {data?.title?.replace("The ", "")}
            </h2>
            <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px] text-center px-4">
              {data?.oneSentenceInsight || "Cosmic resonance centered on freedom, sensitivity, and higher perspective."}
            </p>
          </div>

          <SpiritualInsight
            title="Origin Summary"
            spiritualInsight={data.originSummary}
          />

          <DimensionScores
            title="Cosmic Resonance Scores"
            dimensions={Object.keys(scores).map((name) => ({
              key: name,
              label: name.charAt(0).toUpperCase() + name.slice(1),
            }))}
            scores={scores}
          />

          <CoreTraits coreTraits={traits} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <SpiritualInsight spiritualInsight={data?.spiritualInsight} />

          <BluePrint blueprint={data?.cosmicProfile} title="Cosmic Profile" />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </div>
    </div>
  );
}
