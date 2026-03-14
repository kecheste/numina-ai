"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

interface EnergyArchetypeResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}

export function EnergyArchetypeResult({
  result,
  onLogout,
  onClose,
  shellRef,
}: EnergyArchetypeResultProps) {
  const data = result.llm_result_json || {};
  const extracted = result.extracted_json || {};
  const scores = extracted.scores || {};
  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const archetypeColors: Record<string, string> = {
    visionary: "#F2D08C",
    analyst: "#8CB8F2",
    integrator: "#8CF2BB",
    overloaded: "#F28C8C",
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
            Energy Archetype
          </h1>

          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-4 mt-2">
            Your Result
          </h2>

          {extracted.balance_score !== undefined && (
            <div className="mb-8">
              <p className="text-white/60 text-[12px] uppercase">
                Balance Score
              </p>
              <p className="text-[#F2D08C] font-bold text-[18px]">
                {extracted.balance_score}%
              </p>
              <p className="text-white/40 text-[11px] mt-2 italic">
                Reflects the alignment between your Integrator and Overloaded
                Circuit dimensions.
              </p>
            </div>
          )}

          {scores && Object.keys(scores).length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] mb-4 uppercase tracking-wider">
                Dimension Profile
              </h2>

              <div className="space-y-4">
                {Object.entries(scores).map(([key, value]) => {
                  const color = archetypeColors[key.toLowerCase()] || "#F2D08C";

                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-white/80 capitalize">{key}</span>
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
              <h2 className="text-[#F2D08C] font-[300] text-[13px] my-2 uppercase tracking-wider">
                Core Traits
              </h2>

              <ul className="list-disc ml-5 space-y-2 text-[13px] text-white/80 text-left">
                {traits.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {strengths.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] my-2 uppercase tracking-wider">
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
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] my-2 uppercase tracking-wider ">
                Challenges
              </h2>

              <ul className="list-disc ml-5 space-y-2 text-[13px] text-white/80 text-left">
                {challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {data.spiritualInsight && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-[500] text-[14px] mb-3 italic">
                Spiritual Insight
              </h2>

              <p className="text-white/80 text-[14px] leading-relaxed italic">
                "{data.spiritualInsight}"
              </p>
            </div>
          )}

          {data.summary && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] mb-4 uppercase tracking-wider">
                Your Blueprint
              </h2>

              <div className="space-y-4 text-left">
                {data.summary.split("\n\n").map((para: string, i: number) => (
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

          {tryThis.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[500] text-[14px] mb-3">
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
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[500] text-[14px] mb-3">
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
  );
}
