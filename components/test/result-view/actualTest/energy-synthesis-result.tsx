"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

interface EnergySynthesisResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}

export function EnergySynthesisResult({
  result,
  onLogout,
  onClose,
  shellRef,
}: EnergySynthesisResultProps) {
  const data = (result.llm_result_json as Record<string, any>) || {};
  const extracted = (result.extracted_json as Record<string, any>) || {};
  const scores = extracted.scores || {};
  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const archetypeColors: Record<string, string> = {
    heart_led: "#F28C8C", // red-ish
    mind_led: "#8CB8F2", // blue-ish
    sequential: "#F2D08C", // yellow-ish
    unified: "#8CF2BB", // green-ish
    conflict_tension: "#D3D3D3", // grey
  };

  const formatLabel = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
          handleLogout={onLogout}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <h1 className="text-[21px] font-[500] text-white mb-1">
            Energy Synthesis
          </h1>

          <h2 className="text-[13px] font-[300] text-[#8CF2BB] mb-4 mt-2">
            Your Result
          </h2>

          {extracted.integration_score !== undefined && (
            <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-md">
              <p className="text-white/60 text-[12px] uppercase mb-1">
                Integration Score
              </p>
              <p className="text-[#8CF2BB] font-bold text-[24px]">
                {extracted.integration_score}%
              </p>
              <p className="text-white/50 text-[11px] mt-2 italic">
                Reflects how naturally you unify emotion and logic when making
                decisions.
              </p>
            </div>
          )}

          {data.overview && (
            <div className="mb-8">
              <h2 className="text-[#8CF2BB] font-[300] text-[13px] mb-4 uppercase tracking-wider">
                {data.title || "Mind-Heart Fusion"}
              </h2>

              <div className="space-y-4 text-left">
                {(Array.isArray(data.overview) ? data.overview : (typeof data.overview === 'string' ? data.overview.split("\n\n") : [])).map((para: string, i: number) => (
                  <p
                    key={i}
                    className="text-white/80 text-[14px] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {scores && Object.keys(scores).length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#8CF2BB] font-[300] text-[13px] mb-4 uppercase tracking-wider">
                Synthesis Dimensions
              </h2>

              <div className="space-y-4">
                {Object.entries(scores).map(([key, value]) => {
                  const color = archetypeColors[key.toLowerCase()] || "#8CF2BB";

                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-white/80">
                          {formatLabel(key)}
                        </span>
                        <span style={{ color }} className="font-medium">
                          {value as number}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-700"
                          style={{
                            width: `${value}%`,
                            backgroundColor: color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {traits.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#8CF2BB] font-[300] text-[13px] my-2 uppercase tracking-wider">
                Core Traits
              </h2>

              <ul className="list-disc ml-5 space-y-2 text-[13px] text-white/80 text-left">
                {traits.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 mb-6">
            {strengths.length > 0 && (
              <div>
                <h2 className="text-[#8CF2BB] font-[300] text-[13px] my-2 uppercase tracking-wider">
                  Strengths
                </h2>
                <ul className="list-disc ml-5 space-y-2 text-[13px] text-white/80 text-left">
                  {strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {challenges.length > 0 && (
              <div>
                <h2 className="text-[#F28C8C] font-[300] text-[13px] my-2 uppercase tracking-wider ">
                  Challenges
                </h2>
                <ul className="list-disc ml-5 space-y-2 text-[13px] text-white/80 text-left">
                  {challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {data.decisionBlueprint && (
            <div className="mb-8">
              <h2 className="text-[#8CF2BB] font-[300] text-[13px] mb-4 uppercase tracking-wider">
                Energy Synthesis Map
              </h2>

              <div className="space-y-4 text-left">
                {(Array.isArray(data.decisionBlueprint)
                  ? data.decisionBlueprint
                  : typeof data.decisionBlueprint === "string"
                    ? data.decisionBlueprint.split("\n\n")
                    : []
                ).map((para: string, i: number) => (
                  <p
                    key={i}
                    className="text-white/80 text-[14px] leading-relaxed italic"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 mb-6">
            {tryThis.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h2 className="text-[#8CF2BB] font-[500] text-[14px] mb-3">
                  Try This
                </h2>
                <ul className="list-disc ml-5 space-y-2 text-white/80 text-[13px]">
                  {tryThis.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {avoidThis.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h2 className="text-[#F28C8C] font-[500] text-[14px] mb-3">
                  Avoid This
                </h2>
                <ul className="list-disc ml-5 space-y-2 text-white/80 text-[13px]">
                  {avoidThis.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
