"use client";

import AppBar from "@/components/navigation/appBar";

import { type TestResultResponse } from "@/lib/api-client";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { BluePrint } from "../../components/Blueprint";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { MobileFrame } from "@/components/layout/mobile-frame";

interface LifePathResultViewProps {
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

export function LifePathResultView({
  onClose,
  shellRef,
  result,
  onLogout,
}: LifePathResultViewProps) {
  const llm = result?.llm_result_json;

  const title = llm?.title ?? result?.test_title ?? "Life Path Number";
  const shortDescription =
    llm?.shortDescription ||
    result?.narrative?.split("\n").filter(Boolean)[0] ||
    "";

  const coreTraits = ensureStringArray(llm?.coreTraits ?? result?.insights);
  const strengths = ensureStringArray(llm?.strengths ?? result?.insights);
  const challenges = ensureStringArray(
    llm?.challenges ?? result?.recommendations,
  );

  const spiritualInsight = llm?.spiritualInsight;
  const rawNarrative = result?.narrative || llm?.summary;
  const narrative = typeof rawNarrative === "string" ? rawNarrative : "";

  const tryThis = ensureStringArray(llm?.tryThis);
  const avoidThis = ensureStringArray(llm?.avoidThis);

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
            Your Life Path
          </h1>

          <div className="flex flex-col items-center mb-[40px]">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {title?.replace("The ", "")}
            </h2>
            {/* <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px]">
              Balance between your energy modes is currently low
            </p> */}
          </div>

          <SpiritualInsight spiritualInsight={shortDescription} title="" />

          <CoreTraits coreTraits={coreTraits} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <SpiritualInsight spiritualInsight={spiritualInsight} />

          <BluePrint blueprint={narrative} title="Life Path Pattern" />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </MobileFrame>
    </div>
  );
}
