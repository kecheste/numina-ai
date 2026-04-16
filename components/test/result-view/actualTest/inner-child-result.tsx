import React from "react";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";
import { BluePrint } from "../../components/Blueprint";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { MobileFrame } from "@/components/layout/mobile-frame";

interface InnerChildResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function InnerChildResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: InnerChildResultProps) {
  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};
  const scores = extracted.scores || {};

  const coreTraits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "nurturer", label: "Self-Nurturer" },
    { key: "avoidant", label: "Avoidant Protector" },
    { key: "critic", label: "Inner Critic" },
    { key: "support", label: "Support Seeker" },
    { key: "awareness", label: "Self-Aware Observer" },
    { key: "integrator", label: "Healing Integrator" },
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
            Your Inner Child Dialogue
          </h1>

          <div className="flex flex-col items-center mb-[40px]">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {data?.title?.replace("The ", "")}
            </h2>
            <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px] text-center px-4">
              {data?.oneSentenceInsight || "A protective emotional pattern is present, with a strong need for reassurance and softness."}
            </p>
          </div>

          <DimensionScores
            title="Dialogue Dynamics"
            dimensions={dimensions}
            scores={scores}
          />

          <BluePrint title="" blueprint={data?.summary} />

          <CoreTraits coreTraits={coreTraits} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <BluePrint
            title="Healing Blueprint"
            blueprint={data?.energyBlueprint}
          />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </MobileFrame>
    </div>
  );
}
