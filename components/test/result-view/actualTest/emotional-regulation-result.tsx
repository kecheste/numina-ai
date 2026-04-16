import React from "react";

import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";
import { BluePrint } from "../../components/Blueprint";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { MobileFrame } from "@/components/layout/mobile-frame";

interface EmotionalRegulationResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function EmotionalRegulationResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: EmotionalRegulationResultProps) {
  const router = useRouter();

  const data = (result.llm_result_json as any) || {};
  const scores = (result.extracted_json?.scores as any) || {};

  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "containment", label: "Quiet Containment" },
    { key: "reflective", label: "Reflective Processor" },
    { key: "expressive", label: "Expressive Releaser" },
    { key: "adaptive", label: "Adaptive Regulator" },
  ];

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
            Your Emotional Regulation Type
          </h1>

          <div className="flex flex-col items-center">
            <h2 className="text-[16px]  font-[325] text-[#F2D08C] mb-[40px] rounded-[5px] uppercase border border-[#F2D08C] px-2">
              {data?.title}
            </h2>
          </div>

          <DimensionScores
            title="Regulation Dynamics"
            dimensions={dimensions}
            scores={scores}
          />

          <BluePrint blueprint={data?.overview} title="" />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <BluePrint blueprint={data?.summary} title="Emotional Pattern" />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </MobileFrame>
    </div>
  );
}
