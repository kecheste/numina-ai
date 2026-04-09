"use client";

import React from "react";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";

interface StarseedOriginResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function StarseedOriginResultView({
  result,
  onClose,
  onLogout,
  shellRef,
}: StarseedOriginResultProps) {
  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};
  const scores = extracted.scores || {};

  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

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
          <h1 className="text-[21px] font-[500] text-[#FFFFFF] mb-1">
            Your Starseed Origin
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-6">
            Your Result
          </h2>

          <div className="mb-8">
            <h3 className="text-[#F2D08C] text-[11px] uppercase tracking-wider mb-2 border-b border-white/10 pb-2">
              Origin Summary
            </h3>
            <p className="text-white/80 text-[13px] font-[250] leading-relaxed italic">
              {data.originSummary || data.shortDescription}
            </p>
          </div>

          <DimensionScores
            title="Cosmic Resonance Scores"
            dimensions={Object.keys(scores).map((name) => ({
              key: name,
              label: name.charAt(0).toUpperCase() + name.slice(1),
            }))}
            scores={scores}
          />

          {traits.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#FFFFFF] text-[11px] uppercase tracking-wider mb-3">
                Core Traits
              </h2>
              <ul className="space-y-1 text-[13px] text-left text-white/80 flex flex-wrap gap-1">
                {traits.map((t: string, i: number) => (
                  <li
                    className="border border-[#FFFFFF]/30 text-[#F2D08C] rounded-md px-2 py-0.5 bg-white/5"
                    style={{ lineHeight: "18px" }}
                    key={i}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-4 mb-8">
            {strengths.length > 0 && (
              <div>
                <h3 className="text-[#008049] text-[11px] uppercase tracking-wider mb-2">
                  Strengths
                </h3>
                <div className="space-y-2 flex flex-wrap gap-1">
                  {strengths.map((s: string, i: number) => (
                    <p
                      key={i}
                      style={{
                        lineHeight: "16px",
                      }}
                      className="text-white/80 text-[11px] leading-tight text-left border rounded-md px-3 border-[#F2D08C]/50"
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {challenges.length > 0 && (
              <div>
                <h3 className="text-[#F28C8C] text-[11px] uppercase tracking-wider mb-2">
                  Challenges
                </h3>
                <div className="space-y-2 flex flex-wrap gap-1">
                  {challenges.map((c: string, i: number) => (
                    <p
                      key={i}
                      style={{
                        lineHeight: "16px",
                      }}
                      className="text-white/80 text-[11px] leading-tight text-left border rounded-md px-3 border-[#F2D08C]/50"
                    >
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {data.spiritualInsight && (
            <div className="mb-8 bg-[#F28C8C1A] p-5 rounded-2xl border border-[#F28C8C33]">
              <h2 className="text-[#F28C8C] font-[500] text-[14px] mb-2 uppercase tracking-wide">
                Spiritual Insight
              </h2>
              <p className="text-white/90 text-[13px] leading-relaxed italic">
                "{data.spiritualInsight}"
              </p>
            </div>
          )}

          {(data.cosmicProfile || data.summary) && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-[500] text-[15px] mb-3 uppercase tracking-wide">
                Cosmic Profile
              </h2>
              <div className="space-y-4 text-left font-[250]">
                {(data.cosmicProfile || data.summary).split("\n\n").map((para: string, i: number) => (
                  <p
                    key={i}
                    className="text-white/80 text-[13px] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {tryThis.length > 0 && (
              <div>
                <h2 className="text-[#008049] font-[500] text-[14px] mb-3">
                  Try This:
                </h2>
                <ul className="space-y-2 text-white/80 text-[13px] text-left">
                  {tryThis.map((t: string, i: number) => (
                    <li key={i} className="flex gap-2 leading-snug">
                      <span className="text-[#008049] mt-0.5">✦</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {avoidThis.length > 0 && (
              <div>
                <h2 className="text-[#F28C8C] font-[500] text-[14px] mb-3">
                  Avoid This:
                </h2>
                <ul className="space-y-2 text-white/80 text-[13px] text-left">
                  {avoidThis.map((a: string, i: number) => (
                    <li key={i} className="flex gap-2 leading-snug">
                      <span className="text-[#F28C8C] mt-0.5">✦</span>
                      <span>{a}</span>
                    </li>
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
