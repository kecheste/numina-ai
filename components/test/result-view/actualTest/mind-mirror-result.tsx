"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

interface MindMirrorResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}

export function MindMirrorResult({
  result,
  onLogout,
  onClose,
  shellRef,
}: MindMirrorResultProps) {
  const data = result.llm_result_json || {};
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
            Your Mind Mirror
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-4">
            Your Result
          </h2>

          {data.shortDescription && (
            <p className="text-white/80 text-[13px] mb-4">
              {data.shortDescription}
            </p>
          )}

          {data.mentalPattern && (
            <div className="mb-4">
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[350] text-[15px] mb-2"
              >
                Mental Pattern
              </h2>
              <p className="text-white/80 text-left font-[300] text-[13px]">
                {data.mentalPattern}
              </p>
            </div>
          )}

          {data.emotionalTone && (
            <div className="mb-4">
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[350] text-[15px] mb-2"
              >
                Emotional Tone
              </h2>
              <p className="text-white/80 text-left font-[300] text-[13px]">
                {data.emotionalTone}
              </p>
            </div>
          )}

          {data.currentImbalance && (
            <div className="mb-4">
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[350] text-[15px] mb-2"
              >
                Current Imbalance
              </h2>
              <p className="text-white/80 text-left font-[300] text-[13px]">
                {data.currentImbalance}
              </p>
            </div>
          )}

          {data.hiddenInsight && (
            <div className="mb-4">
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[350] text-[15px] mb-2"
              >
                Hidden Insight
              </h2>
              <p className="text-white/80 text-left font-[300] text-[13px]">
                {data.hiddenInsight}
              </p>
            </div>
          )}

          {data.growthDirection && (
            <div className="mb-4">
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[350] text-[15px] mb-2"
              >
                Growth Direction
              </h2>
              <p className="text-white/80 text-left font-[300] text-[13px]">
                {data.growthDirection}
              </p>
            </div>
          )}

          {traits.length > 0 && (
            <div style={{ fontFamily: "var(--font-gotham)" }}>
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[300] text-[13px] my-2"
              >
                Core Traits
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-[13px] text-left text-white/80">
                {traits.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {strengths.length > 0 && (
            <div>
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[300] text-[13px] my-2"
              >
                Strengths
              </h2>
              <ul className="space-y-1 text-[13px] text-left text-white/80 flex flex-wrap gap-2">
                {strengths.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      lineHeight: "16px",
                    }}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[18px]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {challenges.length > 0 && (
            <div>
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[300] text-[13px] my-2"
              >
                Challenges
              </h2>
              <ul className="space-y-1 text-[13px] text-left text-white/80 flex flex-wrap gap-2">
                {challenges.map((c, i) => (
                  <li
                    key={i}
                    style={{
                      lineHeight: "16px",
                    }}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[18px]"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.summary && (
            <div>
              <h2 className="text-[#F2D08C] font-semibold mb-2 mt-6">
                Your Mental Blueprint
              </h2>
              {data.summary && (
                <div
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="space-y-4 text-left"
                >
                  {data.summary.split("\n\n").map((para: string, i: number) => (
                    <p
                      key={i}
                      style={{ fontFamily: "var(--font-gotham)" }}
                      className="text-white/80 text-[14px]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {tryThis.length > 0 && (
            <div>
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[350] text-[14px] my-2 mt-4"
              >
                Try This:
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
                {tryThis.map((item, i) => (
                  <li className="text-[13px]" key={i}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {avoidThis.length > 0 && (
            <div>
              <h2
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[#F2D08C] font-[350] text-[14px] my-2 mt-4"
              >
                Avoid This:
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
                {avoidThis.map((item, i) => (
                  <li className="text-[13px]" key={i}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
