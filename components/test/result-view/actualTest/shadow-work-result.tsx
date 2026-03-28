"use client";

import React from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { TestResultResponse } from "@/lib/api-client";

interface ShadowWorkScores {
  suppressed_expression: number;
  self_judgment: number;
  hidden_potential: number;
}

interface ShadowWorkResultProps {
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

const SHADOW_LABELS: Record<keyof ShadowWorkScores, string> = {
  suppressed_expression: "Suppressed Expression",
  self_judgment: "Self-Judgment",
  hidden_potential: "Hidden Potential",
};

export function ShadowWorkResult({
  onClose,
  shellRef,
  content,
}: ShadowWorkResultProps) {
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
      <div className="flex-1 flex flex-col items-center justify-center px-8 bg-black text-[#F2D08C]">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
        <p className="text-[14px] font-[350]">
          Preparing your shadow interpretation…
        </p>
      </div>
    );
  }

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

        <div className="flex flex-col pt-4 pb-2 flex-1 overflow-y-auto">
          <div className="px-[24px] pb-12">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-full mb-4">
                <span className="text-[13px] font-[400] text-[#F2D08C] tracking-[2px]">
                  Shadow Work Lens
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "40px",
                }}
                className="text-[20px] font-[300] text-white mb-2"
              >
                {content?.llm_result_json?.title}
              </h1>
              {typeof content?.llm_result_json?.shortDescription ===
                "string" && (
                <p
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "22px",
                  }}
                  className="text-[14px] font-[300] text-white/60 max-w-[380px] mx-auto italic"
                >
                  {content?.llm_result_json?.shortDescription}
                </p>
              )}
            </div>

            {scores && (
              <div className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-[11px] font-[600] text-[#F2D08C] uppercase tracking-[1.5px] mb-6 text-center">
                  Core Dimensions
                </h3>
                <div className="space-y-6">
                  {Object.entries(scores)
                    .filter(([key]) => key in SHADOW_LABELS)
                    .map(([key, val]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-[12px] font-[350] text-white/80 tracking-wide">
                          <span>
                            {SHADOW_LABELS[key as keyof ShadowWorkScores] ||
                              key}
                          </span>
                          <span className="font-[500] text-[#F2D08C]">
                            {typeof val === "number" || typeof val === "string"
                              ? val
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-[#F2D08C] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(242,208,140,0.4)]"
                            style={{
                              width: `${typeof val === "number" ? val : parseInt(String(val)) || 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {qualitative && (
              <div className="mb-6 space-y-2">
                {qualitative.emotion_coping && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mx-2">
                    <p className="text-[#F2D08C] text-[10px] uppercase tracking-wider mb-1 font-[500]">
                      Emotional Response Style
                    </p>
                    <p className="text-white/80 text-[13px] font-[300] italic">
                      "{qualitative.emotion_coping}"
                    </p>
                  </div>
                )}
                {qualitative.inner_critic_relationship && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mx-2">
                    <p className="text-[#F2D08C] text-[10px] uppercase tracking-wider mb-1 font-[500]">
                      Inner Critic Dialogue
                    </p>
                    <p className="text-white/80 text-[13px] font-[300] italic">
                      "{qualitative.inner_critic_relationship}"
                    </p>
                  </div>
                )}
                {qualitative.shadow_check_in_frequency && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mx-2">
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

            <div className="mb-10">
              {typeof content?.llm_result_json?.summary === "string" && (
                <div
                  style={bodyTextStyle}
                  className="text-[14px] font-[300] text-white/70 leading-[1.6] text-justify"
                >
                  {content?.llm_result_json?.summary}
                </div>
              )}
            </div>

            <div className="space-y-10 text-left">
              {typeof content?.llm_result_json?.shadowPattern === "string" && (
                <section className="relative overflow-hidden p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h3
                    style={sectionHeadingStyle}
                    className="text-[#F2D08C] mb-3 uppercase tracking-[1.5px] text-[11px]"
                  >
                    Shadow Pattern
                  </h3>
                  <div
                    style={bodyTextStyle}
                    className="text-[14px] font-[300] text-white/80 leading-[1.6]"
                  >
                    {content?.llm_result_json?.shadowPattern}
                  </div>
                </section>
              )}

              {typeof content?.llm_result_json?.secondaryPattern ===
                "string" && (
                <section className="px-4">
                  <h3
                    style={sectionHeadingStyle}
                    className="text-[#F2D08C] mb-3 uppercase tracking-[1.5px] text-[11px]"
                  >
                    Secondary Pattern
                  </h3>
                  <p
                    style={bodyTextStyle}
                    className="text-[14px] font-[300] text-white/70 leading-[1.6]"
                  >
                    {content?.llm_result_json?.secondaryPattern}
                  </p>
                </section>
              )}

              <div className="grid grid-cols-1 gap-4">
                {typeof content?.llm_result_json?.hiddenStrength ===
                  "string" && (
                  <section className="p-4 rounded-xl bg-white/[0.03] border border-white/10 group">
                    <h3
                      style={sectionHeadingStyle}
                      className="text-[#F2D08C] mb-3 uppercase tracking-[1.5px] text-[11px]"
                    >
                      Hidden Strength
                    </h3>
                    <p
                      style={bodyTextStyle}
                      className="text-[14px] font-[300] text-white/80 leading-[1.6]"
                    >
                      {content?.llm_result_json?.hiddenStrength}
                    </p>
                  </section>
                )}

                {typeof content?.llm_result_json?.growthEdge === "string" && (
                  <section className="p-4 rounded-xl bg-[#F2D08C]/[0.02] border border-[#F2D08C]/10">
                    <h3
                      style={sectionHeadingStyle}
                      className="text-[#F2D08C] mb-3 uppercase tracking-[1.5px] text-[11px]"
                    >
                      Growth Edge
                    </h3>
                    <p
                      style={bodyTextStyle}
                      className="text-[14px] font-[300] text-white/80 leading-[1.6]"
                    >
                      {content?.llm_result_json?.growthEdge}
                    </p>
                  </section>
                )}
              </div>

              {Array.isArray(content?.llm_result_json?.tryThis) &&
                content?.llm_result_json?.tryThis.length > 0 && (
                  <section className="rounded-2xl bg-white/[0.01] border border-white/5">
                    <h3
                      style={sectionHeadingStyle}
                      className="text-[#F2D08C] mb-4 uppercase tracking-[1.5px] text-[11px]"
                    >
                      Try This:
                    </h3>
                    <div className="space-y-4">
                      {content?.llm_result_json?.tryThis.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="mt-[6px] h-[5px] w-[5px] rounded-full bg-[#F2D08C] shadow-[0_0_4px_#F2D08C] shrink-0" />
                          <p
                            style={bodyTextStyle}
                            className="text-[14px] font-[350] text-white/70 leading-[1.5]"
                          >
                            {typeof item === "string"
                              ? item
                              : JSON.stringify(item)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              {Array.isArray(content?.llm_result_json?.avoidThis) &&
                content?.llm_result_json?.avoidThis.length > 0 && (
                  <section className="">
                    <h3
                      style={sectionHeadingStyle}
                      className="text-red-400/80 mb-4 uppercase tracking-[1.5px] text-[11px]"
                    >
                      Avoid This:
                    </h3>
                    <div className="space-y-4">
                      {content?.llm_result_json?.avoidThis.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="mt-[6px] h-[5px] w-[5px] rounded-full bg-red-400/40 shrink-0" />
                          <p
                            style={bodyTextStyle}
                            className="text-[14px] font-[350] text-white/60 leading-[1.5]"
                          >
                            {typeof item === "string"
                              ? item
                              : JSON.stringify(item)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
