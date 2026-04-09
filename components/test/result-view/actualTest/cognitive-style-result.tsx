"use client";

import React from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";

interface CognitiveStyleScores {
  analytical: number;
  empathic: number;
  practical: number;
  observational: number;
  balanced: number;
  [key: string]: number;
}

interface CognitiveStyleResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  content?: TestResultResponse | null;
}

const sectionHeadingStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "24px",
  fontSize: "13px",
  fontWeight: 600,
};

const bodyTextStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "21px",
};

const DIMENSION_LABELS: Record<string, string> = {
  analytical: "Analytical",
  empathic: "Empathic",
  practical: "Practical",
  observational: "Observational",
  balanced: "Balanced Integrator",
};

export function CognitiveStyleResult({
  onClose,
  shellRef,
  content,
}: CognitiveStyleResultProps) {
  const router = useRouter();

  const { scores, styles } = React.useMemo(() => {
    if (!content) return { scores: null, styles: null };
    let s: any = content.extracted_json;
    if (typeof s === "string") {
      try {
        s = JSON.parse(s);
      } catch (e) {}
    }

    return {
      scores: s?.scores as CognitiveStyleScores | null,
      styles: {
        primary: s?.primary_style || content.personality_type,
        secondary: s?.secondary_style,
      },
    };
  }, [content]);

  if (content === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 bg-black text-[#F2D08C]">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
        <p className="text-[14px] font-[350]">
          Analyzing your cognitive patterns…
        </p>
      </div>
    );
  }

  const llm = content?.llm_result_json;

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
          handleLogout={() => router.push("/welcome")}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto text-left">
          <h1
            style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
            className="text-[20px] font-[350] text-[#FFFFFF] mb-[8px] text-center"
          >
            Your Cognitive Style
          </h1>

          <div className="flex items-center justify-center">
            <h1
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[16px] font-[325] text-[#F2D08C] rounded-[5px] px-[8px] uppercase border border-[#F2D08C]/70 mb-[8px]"
            >
              {llm?.title || styles?.primary}
            </h1>
          </div>

          <h1
            style={{ lineHeight: "23px", fontFamily: "var(--font-gotham)" }}
            className="text-[11px] font-[300] text-[#D9D9D9] px-[8px] mb-[40px] text-center"
          >
            Secondary Influence: {styles?.secondary}
          </h1>

          {scores && (
            <DimensionScores
              title="Thinking Dimensions"
              dimensions={Object.keys(scores).map((key) => ({
                key,
                label: DIMENSION_LABELS[key] || key,
              }))}
              scores={scores}
            />
          )}

          <div className="mb-[40px] space-y-[20px] text-left">
            {llm?.overview &&
              llm.overview.split("\n\n").map((p: string, i: number) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "19px",
                  }}
                  className="border-l border-[#F2D08C] pl-[8px] py-0 m-0 text-[13px] font-[350] text-[#FFFFFF]"
                >
                  {p}
                </p>
              ))}
          </div>

          <CoreTraits
            coreTraits={Array.isArray(llm?.coreTraits) ? llm.coreTraits : []}
          />

          <Strength
            strengths={Array.isArray(llm?.strengths) ? llm.strengths : []}
          />

          <Challenge
            challenges={Array.isArray(llm?.challenges) ? llm.challenges : []}
          />

          <div className="mb-[40px] space-y-[10px] text-left">
            <h3 className="text-[#FFFFFF] text-[15px] font-[350]">
              Cognitive Signature
            </h3>
            <div className="space-y-4">
              {llm?.energyBlueprint &&
                llm.energyBlueprint
                  .split("\n\n")
                  .map((p: string, i: number) => (
                    <p
                      key={i}
                      style={bodyTextStyle}
                      className="border-l border-[#F2D08C] pl-[8px] py-0 m-0 text-[13px] font-[350] text-[#F2D08C]"
                    >
                      {p}
                    </p>
                  ))}
            </div>
          </div>

          <TryThis tryThis={Array.isArray(llm?.tryThis) ? llm.tryThis : []} />

          <AvoidThis
            avoidThis={Array.isArray(llm?.avoidThis) ? llm.avoidThis : []}
          />
        </div>
      </div>
    </div>
  );
}
