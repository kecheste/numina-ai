"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

interface SoulUrgeResultProps {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}

// Accent colour palette per soul urge archetype
const ARCHETYPE_COLORS: Record<
  number,
  { accent: string; glow: string; label: string }
> = {
  1: { accent: "#F2A96A", glow: "#F2A96A33", label: "The Independent Drive" },
  2: { accent: "#A8C8F2", glow: "#A8C8F233", label: "The Harmonizer" },
  3: { accent: "#F2DE6A", glow: "#F2DE6A33", label: "The Expressive Heart" },
  4: { accent: "#8CF2BB", glow: "#8CF2BB33", label: "The Stabilizer" },
  5: { accent: "#F26A8C", glow: "#F26A8C33", label: "The Freedom Seeker" },
  6: { accent: "#F2B8A0", glow: "#F2B8A033", label: "The Nurturer" },
  7: { accent: "#B8A0F2", glow: "#B8A0F233", label: "The Inner Seeker" },
  8: { accent: "#F2C86A", glow: "#F2C86A33", label: "The Power Driver" },
  9: { accent: "#A0D4F2", glow: "#A0D4F233", label: "The Humanitarian" },
  11: { accent: "#D4A8F2", glow: "#D4A8F233", label: "The Intuitive Channel" },
  22: { accent: "#A8F2E4", glow: "#A8F2E433", label: "The Master Builder" },
  33: { accent: "#F2A8C8", glow: "#F2A8C833", label: "The Master Teacher" },
};

const DEFAULT_THEME = { accent: "#A8C8F2", glow: "#A8C8F233", label: "" };

function parseParas(val: unknown): string[] {
  if (typeof val === "string") return val.split("\n\n").filter(Boolean);
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  return [];
}

export function SoulUrgeResult({
  result,
  onClose,
  shellRef,
  onLogout,
}: SoulUrgeResultProps) {
  const data = (result.llm_result_json as Record<string, any>) || {};
  const extracted = (result.extracted_json as Record<string, any>) || {};

  const soulUrgeNumber: number = extracted.soulUrge ?? extracted.soul_urge ?? 0;
  const isMaster: boolean =
    extracted.is_master ?? [11, 22, 33].includes(soulUrgeNumber);
  const theme = ARCHETYPE_COLORS[soulUrgeNumber] ?? DEFAULT_THEME;

  const innerMotivations: string[] = Array.isArray(data.innerMotivations)
    ? data.innerMotivations
    : [];
  const shadowExpression: string[] = Array.isArray(data.shadowExpression)
    ? data.shadowExpression
    : [];
  const strengths: string[] = Array.isArray(data.strengths)
    ? data.strengths
    : [];
  const challenges: string[] = Array.isArray(data.challenges)
    ? data.challenges
    : [];
  const tryThis: string[] = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis: string[] = Array.isArray(data.avoidThis)
    ? data.avoidThis
    : [];

  const coreDesireParas = parseParas(data.coreDesire);
  const fulfillmentPathParas = parseParas(data.fulfillmentPath);

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
          {/* Header */}
          <h1 className="text-[21px] font-[500] text-white mb-1">
            Soul Urge / Heart&apos;s Desire
          </h1>
          <h2
            className="text-[13px] font-[300] mb-6 mt-1"
            style={{ color: theme.accent }}
          >
            Your Inner Drive
          </h2>

          {/* Soul Urge Number Badge */}
          {soulUrgeNumber > 0 && (
            <div
              className="mb-8 p-5 rounded-2xl border flex items-center gap-5"
              style={{
                borderColor: theme.accent + "44",
                background: theme.glow,
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                style={{ background: theme.accent + "22", color: theme.accent }}
              >
                {soulUrgeNumber}
              </div>
              <div>
                <p className="text-white/50 text-[11px] uppercase tracking-widest mb-1">
                  Soul Urge Number{isMaster ? " · Master" : ""}
                </p>
                <p className="text-white font-[500] text-[16px]">
                  {data.title || theme.label || `Soul Urge ${soulUrgeNumber}`}
                </p>
              </div>
            </div>
          )}

          {/* Core Desire */}
          {coreDesireParas.length > 0 && (
            <div className="mb-8">
              <h2
                className="text-[13px] font-[300] mb-3 uppercase tracking-wider"
                style={{ color: theme.accent }}
              >
                Core Desire
              </h2>
              <div className="space-y-3">
                {coreDesireParas.map((para, i) => (
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

          {/* Inner Motivations */}
          {innerMotivations.length > 0 && (
            <div className="mb-8">
              <h2
                className="text-[13px] font-[300] mb-3 uppercase tracking-wider"
                style={{ color: theme.accent }}
              >
                Inner Motivations
              </h2>
              <ul className="space-y-2 text-[13px] text-white/80">
                {innerMotivations.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      style={{ color: theme.accent }}
                      className="mt-0.5 shrink-0"
                    >
                      ›
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Shadow Expression */}
          {shadowExpression.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[13px] font-[300] mb-3 uppercase tracking-wider text-[#F28C8C]">
                Shadow Expression
              </h2>
              <ul className="space-y-2 text-[13px] text-white/80">
                {shadowExpression.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F28C8C] mt-0.5 shrink-0">›</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strengths & Challenges grid */}
          {(strengths.length > 0 || challenges.length > 0) && (
            <div className="grid grid-cols-1 gap-4 mb-8">
              {strengths.length > 0 && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3
                    className="text-[12px] uppercase tracking-wider mb-2 font-[400]"
                    style={{ color: theme.accent }}
                  >
                    Strengths
                  </h3>
                  <ul className="space-y-1.5">
                    {strengths.map((s, i) => (
                      <li key={i} className="text-white/70 text-[12px]">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {challenges.length > 0 && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="text-[12px] uppercase tracking-wider mb-2 font-[400] text-[#F28C8C]">
                    Challenges
                  </h3>
                  <ul className="space-y-1.5">
                    {challenges.map((c, i) => (
                      <li key={i} className="text-white/70 text-[12px]">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Fulfillment Path */}
          {fulfillmentPathParas.length > 0 && (
            <div className="mb-8">
              <h2
                className="text-[13px] font-[300] mb-3 uppercase tracking-wider"
                style={{ color: theme.accent }}
              >
                Fulfillment Path
              </h2>
              <div className="space-y-3">
                {fulfillmentPathParas.map((para, i) => (
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

          {/* Try This */}
          {tryThis.length > 0 && (
            <div
              className="mb-6 p-4 rounded-xl border"
              style={{
                background: theme.glow,
                borderColor: theme.accent + "44",
              }}
            >
              <h3
                className="text-[13px] font-[500] mb-3"
                style={{ color: theme.accent }}
              >
                Alignment Practices
              </h3>
              <ul className="space-y-2 text-white/80 text-[13px]">
                {tryThis.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      style={{ color: theme.accent }}
                      className="mt-0.5 shrink-0 font-bold"
                    >
                      {i + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Avoid This */}
          {avoidThis.length > 0 && (
            <div className="bg-white/5 p-4 rounded-xl border border-[#F28C8C44]">
              <h3 className="text-[#F28C8C] text-[13px] font-[500] mb-3">
                Misalignment Patterns
              </h3>
              <ul className="space-y-2 text-white/80 text-[13px]">
                {avoidThis.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F28C8C] mt-0.5 shrink-0">✕</span>
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
