"use client";

import React from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { TestResultResponse } from "@/lib/api-client";

interface CognitiveStyleScores {
  analytical: number;
  empathic: number;
  practical: number;
  observational: number;
  balanced: number;
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

        <div className="flex flex-col pt-4 pb-2 flex-1 overflow-y-auto">
          <div className="px-[24px] pb-12">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-full mb-2">
                <span className="text-[13px] font-[400] text-[#F2D08C] tracking-[2px]">
                  Cognitive Style
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "36px",
                }}
                className="text-[22px] font-[400] text-white mb-2"
              >
                {llm?.title || styles?.primary}
              </h1>
              {styles?.secondary && (
                <p className="text-[12px] font-[300] text-[#F2D08C]/80 uppercase tracking-widest">
                  Secondary Influence: {styles.secondary}
                </p>
              )}
            </div>

            {scores && (
              <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-[11px] font-[600] text-[#F2D08C] uppercase tracking-[1.5px] mb-8 text-center">
                  Thinking Dimensions
                </h3>
                <div className="space-y-6">
                  {Object.entries(scores).map(([key, val]) => {
                    const label = DIMENSION_LABELS[key] || key;
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-end text-[11px] font-[400] text-white/50 uppercase tracking-wider mb-1">
                          <span>{label}</span>
                          <span className="text-[#F2D08C] font-[500] text-[12px]">
                            {val}%
                          </span>
                        </div>
                        <div className="relative h-[4px] w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-[#F2D08C] transition-all duration-1000 ease-out"
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-6 space-y-4">
              {llm?.overview &&
                llm.overview.split("\n\n").map((p: string, i: number) => (
                  <p
                    key={i}
                    style={bodyTextStyle}
                    className="text-[15px] font-[300] text-white/80 leading-[1.6]"
                  >
                    {p}
                  </p>
                ))}
            </div>

            {Array.isArray(llm?.coreTraits) && (
              <div>
                <h3
                  style={sectionHeadingStyle}
                  className="text-[#F2D08C] uppercase mb-3 tracking-[1.5px] text-[11px]"
                >
                  Core Traits
                </h3>
                <div className="flex flex-wrap gap-2 mb-10">
                  {llm.coreTraits.map((trait: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[12px] font-[300] text-[#F2D08C]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 mb-12">
              <section className="space-y-4">
                <h3
                  style={sectionHeadingStyle}
                  className="text-green-300/60 uppercase tracking-[1.5px] text-[11px]"
                >
                  Strengths & Dualities
                </h3>
                <div className="space-y-4">
                  {Array.isArray(llm?.strengths) &&
                    llm.strengths.map((str: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                      >
                        <p
                          style={bodyTextStyle}
                          className="text-[14px] font-[300] text-white/90"
                        >
                          {str}
                        </p>
                      </div>
                    ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3
                  style={sectionHeadingStyle}
                  className="text-red-300/60 uppercase tracking-[1.5px] text-[11px]"
                >
                  Key Challenges
                </h3>
                <div className="space-y-3">
                  {Array.isArray(llm?.challenges) &&
                    llm.challenges.map((ch: string, idx: number) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="mt-2 h-1 w-1 rounded-full bg-white/20 shrink-0" />
                        <p
                          style={bodyTextStyle}
                          className="text-[14px] font-[300] text-white/60"
                        >
                          {ch}
                        </p>
                      </div>
                    ))}
                </div>
              </section>
            </div>

            <section className="mb-12 p-4 rounded-2xl bg-gradient-to-br from-[#F2D08C]/[0.05] to-transparent border border-[#F2D08C]/10">
              <h3
                style={sectionHeadingStyle}
                className="text-[#F2D08C] text-center mb-6 uppercase tracking-[2px]"
              >
                Your Cognitive Signature
              </h3>
              <div className="space-y-4">
                {llm?.energyBlueprint &&
                  llm.energyBlueprint
                    .split("\n\n")
                    .map((p: string, i: number) => (
                      <p
                        key={i}
                        style={bodyTextStyle}
                        className="text-[14px] font-[300] text-white/80 leading-[1.6]"
                      >
                        {p}
                      </p>
                    ))}
              </div>
            </section>

            <div className="space-y-8">
              {Array.isArray(llm?.tryThis) && llm.tryThis.length > 0 && (
                <section>
                  <h3
                    style={sectionHeadingStyle}
                    className="text-[#F2D08C] mb-2 uppercase tracking-[1.5px] text-[11px]"
                  >
                    Try This:
                  </h3>
                  <div className="space-y-4">
                    {llm.tryThis.map((item: string, idx: number) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="h-6 w-6 rounded-full bg-[#F2D08C]/10 border border-[#F2D08C]/20 flex items-center justify-center shrink-0">
                          <span className="text-[#F2D08C] text-[10px] font-bold">
                            {idx + 1}
                          </span>
                        </div>
                        <p
                          style={bodyTextStyle}
                          className="text-[13px] font-[400] text-white/80"
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {Array.isArray(llm?.avoidThis) && llm.avoidThis.length > 0 && (
                <section>
                  <h3
                    style={sectionHeadingStyle}
                    className="text-red-400/60 mb-2 uppercase tracking-[1.5px] text-[11px]"
                  >
                    Avoid This:
                  </h3>
                  <div className="space-y-3">
                    {llm.avoidThis.map((item: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex gap-3 items-start px-4 py-3 rounded-xl bg-red-400/[0.02] border border-red-400/10"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/30 shrink-0" />
                        <p
                          style={bodyTextStyle}
                          className="text-[13px] font-[300] text-white/50"
                        >
                          {item}
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
