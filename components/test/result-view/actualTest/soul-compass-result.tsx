"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

interface SoulCompassResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}

export function SoulCompassResult({
  result,
  onLogout,
  onClose,
  shellRef,
}: SoulCompassResultProps) {
  const data = result.llm_result_json || {};
  const extracted = result.extracted_json || {};
  const analysis = data.alignmentAnalysis || {};
  const reflection = Array.isArray(data.suggestedReflection) ? data.suggestedReflection : [];

  const mindVal = extracted.mind ?? 0;
  const heartVal = extracted.heart ?? 0;
  const bodyVal = extracted.body ?? 0;
  const soulVal = extracted.soul ?? 0;

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
            {data.title || "Your Soul Compass"}
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-2">
            Alignment Check Result
          </h2>
          {extracted.decision && (
            <p className="text-white/60 text-[11px] font-[300] italic mb-6 border-l border-[#F2D08C]/30 pl-3">
              "{extracted.decision}"
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <ValueCard label="Mind" value={mindVal} color="#A78BFA" />
            <ValueCard label="Heart" value={heartVal} color="#F472B6" />
            <ValueCard label="Body" value={bodyVal} color="#34D399" />
            <ValueCard label="Soul" value={soulVal} color="#FBBF24" />
          </div>

          {data.decisionInsight && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[350] text-[15px] mb-2">
                Decision Insight
              </h2>
              <div className="space-y-4 text-left font-[300] text-[13px] text-white/80">
                {data.decisionInsight.split("\n\n").map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 space-y-4">
            <h2 className="text-[#F2D08C] font-[350] text-[15px] mb-2">
              Alignment Analysis
            </h2>
            <AnalysisItem label="Mind" text={analysis.mind} />
            <AnalysisItem label="Heart" text={analysis.heart} />
            <AnalysisItem label="Body" text={analysis.body} />
            <AnalysisItem label="Soul" text={analysis.soul} />
          </div>

          {data.whatThisMeans && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[350] text-[15px] mb-2">
                What This Means
              </h2>
              <p className="text-white/80 text-left font-[300] text-[13px]">
                {data.whatThisMeans}
              </p>
            </div>
          )}

          {reflection.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[350] text-[15px] mb-2">
                Suggested Reflection
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-white/80 text-[13px] text-left font-[300]">
                {reflection.map((item: string, i: number) => (
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

function ValueCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-[#FFFFFF0D] border border-white/10 rounded-xl p-3 flex flex-col items-center">
      <span className="text-[11px] font-[300] text-white/60 mb-1">{label}</span>
      <span className="text-[24px] font-[500]" style={{ color }}>{value}</span>
      <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
        <div className="h-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function AnalysisItem({ label, text }: { label: string, text?: string }) {
  if (!text) return null;
  return (
    <div className="text-left">
      <span className="text-[#F2D08C] text-[13px] font-[400] mr-2">{label}:</span>
      <span className="text-white/70 text-[13px] font-[300]">{text}</span>
    </div>
  );
}
