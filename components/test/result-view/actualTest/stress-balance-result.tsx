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

interface StressBalanceResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function StressBalanceResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: StressBalanceResultProps) {
  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};
  const scores = extracted.scores || {};

  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "early_regulator", label: "Early Regulator" },
    { key: "pressure_builder", label: "Pressure Builder" },
    {
      key: "emotional_releaser",
      label: "Emotional Releaser",
    },
    { key: "shutdown", label: "Shutdown Responder" },
  ];

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
            Your Stress Balance Index
          </h1>

          <div className="flex flex-col items-center mb-[40px]">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {data?.title?.replace("The ", "")}
            </h2>
            <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px]">
              {data?.oneSentenceInsight || "Your capacity to regulate pressure needs strengthening"}
            </p>
          </div>

          <DimensionScores
            title="Stress Dimensions"
            dimensions={dimensions}
            scores={scores}
          />

          <BluePrint title="Stress Balance" blueprint={data?.overview} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <BluePrint
            title="Path to Balance"
            blueprint={data?.energyBlueprint}
          />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </div>
    </div>
  );
}
