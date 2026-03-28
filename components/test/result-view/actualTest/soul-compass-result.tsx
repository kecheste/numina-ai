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

const DIMENSION_CONFIG = {
  mind: { label: "Mind", sublabel: "Clarity", color: "#A78BFA" },
  heart: { label: "Heart", sublabel: "Emotion", color: "#F472B6" },
  body: { label: "Body", sublabel: "Grounding", color: "#34D399" },
  soul: { label: "Soul", sublabel: "Purpose", color: "#FBBF24" },
} as const;

const STATE_COLORS: Record<string, string> = {
  Aligned: "#34D399",
  "Partial Alignment": "#FBBF24",
  Misaligned: "#F28C8C",
};

function parseParas(val: unknown): string[] {
  if (typeof val === "string") return val.split("\n\n").filter(Boolean);
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  return [];
}

export function SoulCompassResult({
  result,
  onClose,
  shellRef,
  onLogout,
}: SoulCompassResultProps) {
  const data = (result.llm_result_json as Record<string, any>) || {};
  const extracted = (result.extracted_json as Record<string, any>) || {};

  const analysis =
    typeof data.alignmentAnalysis === "object" && !Array.isArray(data.alignmentAnalysis)
      ? (data.alignmentAnalysis as Record<string, string>)
      : {};
  const reflection = Array.isArray(data.suggestedReflection)
    ? data.suggestedReflection
    : [];
  const decisionParas = parseParas(data.decisionInsight);

  const alignmentState: string = extracted.alignment_state ?? "";
  const alignmentScore: number = extracted.alignment_score ?? 0;
  const stateColor = STATE_COLORS[alignmentState] ?? "#A8C8F2";

  const dims: Array<{ key: keyof typeof DIMENSION_CONFIG; value: number }> = [
    { key: "mind", value: extracted.mind ?? 0 },
    { key: "heart", value: extracted.heart ?? 0 },
    { key: "body", value: extracted.body ?? 0 },
    { key: "soul", value: extracted.soul ?? 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col pt-2"
      >
        <AppBar handleBack={onClose} shellRef={shellRef} handleLogout={onLogout} />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          {/* Header */}
          <h1 className="text-[21px] font-[500] text-white mb-1">Soul Compass</h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-4">
            Alignment Check
          </h2>

          {/* Decision context */}
          {extracted.decision && extracted.decision !== "Not specified" && (
            <div className="mb-6 border-l-2 border-[#F2D08C]/40 pl-3">
              <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">
                Decision
              </p>
              <p className="text-white/80 text-[13px] italic">
                {extracted.decision}
              </p>
            </div>
          )}

          {/* Alignment Score badge */}
          <div
            className="mb-8 p-4 rounded-2xl border flex items-center gap-4"
            style={{ borderColor: stateColor + "44", background: stateColor + "11" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
              style={{ background: stateColor + "22", color: stateColor }}
            >
              {alignmentScore}
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">
                Alignment Score
              </p>
              <p className="font-[500] text-[15px]" style={{ color: stateColor }}>
                {alignmentState || "Unknown"}
              </p>
              {extracted.imbalance !== undefined && (
                <p className="text-white/40 text-[11px] mt-0.5">
                  Imbalance gap: {extracted.imbalance} pts
                </p>
              )}
            </div>
          </div>

          {/* 4-slider value grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {dims.map(({ key, value }) => {
              const cfg = DIMENSION_CONFIG[key];
              return (
                <div
                  key={key}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[12px] font-[400] text-white/80">{cfg.label}</p>
                      <p className="text-[10px] text-white/40">{cfg.sublabel}</p>
                    </div>
                    <span className="text-[20px] font-[500]" style={{ color: cfg.color }}>
                      {value}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${value}%`, backgroundColor: cfg.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decision Insight */}
          {decisionParas.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] mb-3 uppercase tracking-wider">
                Decision Insight
              </h2>
              <div className="space-y-3">
                {decisionParas.map((p, i) => (
                  <p key={i} className="text-white/80 text-[14px] leading-relaxed font-[300]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Alignment Analysis */}
          {Object.keys(analysis).length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] mb-3 uppercase tracking-wider">
                Alignment Analysis
              </h2>
              <div className="space-y-3">
                {dims.map(({ key }) => {
                  const text = analysis[key];
                  if (!text) return null;
                  const cfg = DIMENSION_CONFIG[key];
                  return (
                    <div key={key} className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <span
                        className="text-[12px] font-[500] uppercase tracking-wider"
                        style={{ color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                      <p className="text-white/70 text-[13px] font-[300] mt-1 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* What This Means */}
          {data.whatThisMeans && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-[300] text-[13px] mb-3 uppercase tracking-wider">
                What This Means
              </h2>
              <p className="text-white/80 text-[14px] leading-relaxed font-[300]">
                {data.whatThisMeans}
              </p>
            </div>
          )}

          {/* Suggested Reflection */}
          {reflection.length > 0 && (
            <div className="bg-white/5 p-4 rounded-xl border border-[#F2D08C]/20">
              <h2 className="text-[#F2D08C] font-[400] text-[13px] mb-3">
                Suggested Reflection
              </h2>
              <ul className="space-y-3">
                {reflection.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-white/70 font-[300]">
                    <span className="text-[#F2D08C]/60 shrink-0 mt-0.5">›</span>
                    <span>{item}</span>
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
