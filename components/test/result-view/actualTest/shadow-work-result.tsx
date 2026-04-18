"use client";

import React from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { BluePrint } from "../../components/Blueprint";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";

interface ShadowWorkScores {
  suppressed_expression: number;
  self_judgment: number;
  hidden_potential: number;
  [key: string]: number;
}

interface ShadowWorkResultProps {
  onClose: () => void;
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

const SHADOW_LABELS: Record<keyof ShadowWorkScores, string> = {
  suppressed_expression: "Suppressed Expression",
  self_judgment: "Self-Judgment",
  hidden_potential: "Hidden Potential",
};

export function ShadowWorkResult({ onClose, content }: ShadowWorkResultProps) {
  const router = useRouter();

  const { scores, qualitative } = React.useMemo(() => {
    if (!content) return { scores: null, qualitative: null };
    let s: any = content.extracted_json;
    if (typeof s === "string") {
      try {
        s = JSON.parse(s);
      } catch (e) {}
    }

    let extractedScores = null;
    let extractedQualitative = null;

    if (s && typeof s === "object") {
      if (s.scores && typeof s.scores === "object") {
        extractedScores = s.scores;
      } else if ("self_judgment" in s || "suppressed_expression" in s) {
        extractedScores = s;
      } else {
        const nested = Object.values(s).find(
          (v: any) =>
            v &&
            typeof v === "object" &&
            ("self_judgment" in v || "suppressed_expression" in v),
        );
        if (nested) extractedScores = nested;
      }

      extractedQualitative = {
        emotion_coping: s.emotion_coping,
        inner_critic_relationship: s.inner_critic_relationship,
        shadow_check_in_frequency: s.shadow_check_in_frequency,
      };
    }

    return { scores: extractedScores, qualitative: extractedQualitative };
  }, [content]);

  if (content === null) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center px-8 bg-black text-[#F2D08C]">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
        <p className="text-[14px] font-[350]">
          Preparing your shadow interpretation…
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2">
      <AppBar
        handleBack={onClose}
        handleLogout={() => router.push("/logout")}
      />

      <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto w-full">
        <h1
          style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
          className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
        >
          Your Shadow Work Lens
        </h1>

        <div className="flex flex-col items-center mb-[40px]">
          <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
            {content?.llm_result_json?.title?.replace("The ", "")}
          </h2>
          <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px] text-center px-4">
            {content?.llm_result_json?.oneSentenceInsight ||
              "A strong tendency to guard vulnerability through control, distance, or overthinking."}
          </p>
        </div>

        <SpiritualInsight
          title=""
          spiritualInsight={content?.llm_result_json?.shortDescription}
        />

        {scores && (
          <DimensionScores
            title="Core Dimensions"
            dimensions={Object.entries(SHADOW_LABELS).map(([key, label]) => ({
              key,
              label,
            }))}
            scores={scores}
          />
        )}

        {qualitative && (
          <div className="mb-6 space-y-2 text-left">
            {qualitative.emotion_coping && (
              <div className="rounded-xl text-[#FFFFFF] py-4">
                <p className="text-[#F2D08C] text-[10px] uppercase tracking-wider mb-1 font-[500]">
                  Emotional Response Style
                </p>
                <p className="text-white/80 text-[13px] font-[300] italic">
                  "{qualitative.emotion_coping}"
                </p>
              </div>
            )}
            {qualitative.inner_critic_relationship && (
              <div className="rounded-xl text-[#FFFFFF] py-4">
                <p className="text-[#F2D08C] text-[10px] uppercase tracking-wider mb-1 font-[500]">
                  Inner Critic Dialogue
                </p>
                <p className="text-white/80 text-[13px] font-[300] italic">
                  "{qualitative.inner_critic_relationship}"
                </p>
              </div>
            )}
            {qualitative.shadow_check_in_frequency && (
              <div className="rounded-xl text-[#FFFFFF] py-4">
                <p className="text-[#F2D08C] text-[10px] uppercase tracking-wider mb-1 font-[500]">
                  Shadow Reflection Frequency
                </p>
                <p className="text-white/80 text-[13px] font-[300] italic">
                  {qualitative.shadow_check_in_frequency}
                </p>
              </div>
            )}
          </div>
        )}

        <SpiritualInsight
          title=""
          spiritualInsight={content?.llm_result_json?.summary}
        />

        <BluePrint
          title="Shadow Pattern"
          blueprint={content?.llm_result_json?.shadowPattern}
        />
        <BluePrint
          title="Secondary Pattern"
          blueprint={content?.llm_result_json?.secondaryPattern}
        />
        <BluePrint
          title="Hidden Strength"
          blueprint={content?.llm_result_json?.hiddenStrength}
        />
        <BluePrint
          title="Growth Edge"
          blueprint={content?.llm_result_json?.growthEdge}
        />

        <TryThis tryThis={content?.llm_result_json?.tryThis || []} />

        <AvoidThis avoidThis={content?.llm_result_json?.avoidThis || []} />
      </div>
    </div>
  );
}
