"use client";

import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";

import { type TestResultResponse } from "@/lib/api-client";
import { BluePrint } from "../../components/Blueprint";
import { DimensionScores } from "../../components/DimensionScores";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { MobileFrame } from "@/components/layout/mobile-frame";

interface MbtiTypeResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  result: TestResultResponse;
  onLogout?: () => void;
}

function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((x) => (typeof x === "string" ? x : String(x)));
  }
  return [];
}

export function MbtiTypeResult({
  onClose,
  shellRef,
  result,
  onLogout,
}: MbtiTypeResultProps) {
  const router = useRouter();

  const llm = result?.llm_result_json ?? {};

  const typeLabel =
    result?.personality_type ?? llm?.title ?? "Personality Type";

  const overview: string = llm?.overview ?? "";

  const cognitiveStyle: string = llm?.cognitiveStyle || "";

  const coreTraits = ensureStringArray(llm?.coreTraits ?? result?.insights);
  const strengths = ensureStringArray(llm?.strengths ?? result?.insights);
  const challenges = ensureStringArray(
    llm?.challenges ?? result?.recommendations,
  );
  const tryThis = ensureStringArray(llm?.tryThis);
  const avoidThis = ensureStringArray(llm?.avoidThis);

  const confidence = result?.extracted_json?.confidence || llm?.confidence;

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
            Your Personality Type (MBTI)
          </h1>

          <div className="flex flex-col items-center mb-[40px]">
            <h1
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[16px] font-[350] text-[#F2D08C] border border-[#F2D08C] px-2 rounded-[5px]"
            >
              {typeLabel}
            </h1>
            <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px] text-center px-4">
              {llm?.oneSentenceInsight || "Very strong preference for structure, logic, and steadiness."}
            </p>
          </div>

          <BluePrint title="" blueprint={overview} />

          <DimensionScores
            title="Dimension Profile"
            scores={confidence}
            dimensions={Object.keys(confidence).map((key) => ({
              key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
            }))}
          />

          <CoreTraits coreTraits={coreTraits} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <BluePrint title="Cognitive Style" blueprint={llm?.summary} />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </MobileFrame>
    </div>
  );
}
