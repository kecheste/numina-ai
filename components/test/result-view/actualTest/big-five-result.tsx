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
import { MobileFrame } from "@/components/layout/mobile-frame";

interface BigFiveResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function BigFiveResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: BigFiveResultProps) {
  const data = (result.llm_result_json as any) || {};
  const scores = (result.extracted_json as any) || {};

  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "openness", label: "Openness" },
    { key: "conscientiousness", label: "Conscientiousness" },
    { key: "extraversion", label: "Extraversion" },
    { key: "agreeableness", label: "Agreeableness" },
    { key: "neuroticism", label: "Neuroticism" },
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
            Your Big Five Personality
          </h1>

          <div className="flex flex-col items-center mb-[40px]">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {data?.title?.replace("The ", "")}
            </h2>
            {/* <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px]">
              Balance between your energy modes is currently low
            </p> */}
          </div>

          <SpiritualInsight spiritualInsight={data?.shortDescription} />

          <DimensionScores
            title="Dimension Profile"
            dimensions={dimensions}
            scores={scores}
          />

          <CoreTraits coreTraits={traits} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <BluePrint
            blueprint={data?.summary}
            title="Psychological Signature"
          />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </MobileFrame>
    </div>
  );
}
