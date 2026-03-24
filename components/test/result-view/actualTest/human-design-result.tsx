"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

interface HumanDesignResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}

export function HumanDesignResult({
  result,
  onLogout,
  onClose,
  shellRef,
}: HumanDesignResultProps) {
  const data = result.llm_result_json || {};
  const extracted = (result.extracted_json as any) || {};
  const personalityTraits: string[] = Array.isArray(data.personalityConscious)
    ? data.personalityConscious
    : Array.from(
        new Set(
          (Array.isArray(extracted.personality_traits)
            ? extracted.personality_traits
            : []
          ).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)),
        ),
      );

  const designTraits: string[] = Array.isArray(data.designUnconscious)
    ? data.designUnconscious
    : Array.from(
        new Set(
          (Array.isArray(extracted.design_traits)
            ? extracted.design_traits
            : []
          ).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)),
        ),
      );

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

        <div className="flex flex-col px-[32px] pt-6 pb-6 flex-1 overflow-y-auto">
          <h1 className="text-[21px] font-[500] text-[#FFFFFF] mb-1">
            Your Human Design
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-6">
            Your Result
          </h2>

          <div className="mb-8 grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex flex-col items-center text-center">
              <span className="text-[10px] text-white/40 uppercase mb-1">
                Type
              </span>
              <span className="text-[13px] text-[#F2D08C] font-medium leading-tight">
                {extracted.type}
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex flex-col items-center text-center">
              <span className="text-[10px] text-white/40 uppercase mb-1">
                Strategy
              </span>
              <span className="text-[13px] text-[#F2D08C] font-medium leading-tight">
                {extracted.strategy}
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex flex-col items-center text-center">
              <span className="text-[10px] text-white/40 uppercase mb-1">
                Authority
              </span>
              <span className="text-[13px] text-[#F2D08C] font-medium leading-tight">
                {extracted.authority}
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex flex-col items-center text-center">
              <span className="text-[10px] text-white/40 uppercase mb-1">
                Profile
              </span>
              <span className="text-[13px] text-[#F2D08C] font-medium leading-tight">
                {extracted.profile}
              </span>
            </div>
          </div>

          {data.summary && (
            <div className="mb-8 space-y-4">
              {data.summary.split("\n\n").map((para: string, i: number) => (
                <p
                  key={i}
                  className="text-white/80 text-[14px] leading-relaxed font-[250]"
                >
                  {para}
                </p>
              ))}
            </div>
          )}

          {(personalityTraits.length > 0 || designTraits.length > 0) && (
            <div className="mb-8 grid grid-cols-1 gap-4">
              {personalityTraits.length > 0 && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="text-[#F2D08C] text-[11px] uppercase tracking-wider mb-3">
                    Personality (Conscious)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {personalityTraits.map((trait, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-[#F2D08C]/90 bg-[#F2D08C]/10 border border-[#F2D08C]/20 px-2 py-1 rounded-md leading-snug"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {designTraits.length > 0 && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="text-[#F28C8C] text-[11px] uppercase tracking-wider mb-3">
                    Design (Unconscious)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {designTraits.map((trait, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-[#F28C8C]/90 bg-[#F28C8C]/10 border border-[#F28C8C]/20 px-2 py-1 rounded-md leading-snug"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {data.consciousVsUnconscious && (
            <div className="mb-8 bg-white/5 p-5 rounded-r-xl border border-white/10 border-l-2 border-l-[#F2D08C]">
              <h3 className="text-[#F2D08C] text-[13px] font-semibold mb-2 uppercase tracking-wide">
                Conscious vs Unconscious
              </h3>
              <p className="text-white/80 text-[14px] leading-relaxed italic font-[300]">
                {data.consciousVsUnconscious}
              </p>
            </div>
          )}

          {traits.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#FFFFFF] font-[300] text-[13px] mb-2 uppercase tracking-wider">
                Core Traits
              </h2>
              <ul className="space-y-1 text-[13px] text-left text-white/80 flex flex-wrap gap-1">
                {traits.map((t, i) => (
                  <li
                    className="border border-[#FFFFFF]/30 text-white/90 rounded-md px-2 py-0.5 bg-white/5"
                    style={{
                      lineHeight: "18px",
                    }}
                    key={i}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {strengths.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] mb-2 uppercase tracking-wider">
                Strengths
              </h2>
              <ul className="space-y-1 text-[13px] text-left text-white/80 flex flex-wrap gap-2">
                {strengths.map((s, i) => (
                  <li
                    key={i}
                    style={{ lineHeight: "16px" }}
                    className="border border-[#F2D08C]/40 rounded-[7px] px-2 py-1 bg-[#F2D08C]/5 text-[#F2D08C]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {challenges.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F28C8C] font-[300] text-[13px] mb-2 uppercase tracking-wider">
                Challenges
              </h2>
              <ul className="space-y-1 text-[13px] text-left text-white/80 flex flex-wrap gap-2">
                {challenges.map((c, i) => (
                  <li
                    key={i}
                    style={{ lineHeight: "16px" }}
                    className="border border-[#F28C8C]/40 rounded-[7px] px-2 py-1 bg-[#F28C8C]/5 text-[#F28C8C]"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.energyBlueprint && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-semibold mb-3 mt-4 text-[15px]">
                Your Energy Architecture
              </h2>
              <div className="space-y-4 text-left">
                {data.energyBlueprint
                  .split("\n\n")
                  .map((para: string, i: number) => (
                    <p
                      key={i}
                      className="text-white/80 text-[14px] leading-relaxed font-[250]"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {data.decisionGuidance && (
            <div className="mb-8 bg-[#F2D08C]/5 p-5 rounded-xl border border-[#F2D08C]/20">
              <h2 className="text-[#F2D08C] font-semibold mb-3 text-[15px]">
                Decision Guidance
              </h2>
              <div className="space-y-4 text-left">
                {data.decisionGuidance
                  .split("\n\n")
                  .map((para: string, i: number) => (
                    <p
                      key={i}
                      className="text-[#F2D08C]/90 text-[14px] leading-relaxed font-[300]"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {tryThis.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#008049] font-[500] text-[14px] mb-2">
                Try This
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
                {tryThis.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {avoidThis.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F28C8C] font-[500] text-[14px] mb-2">
                Avoid This
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
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
