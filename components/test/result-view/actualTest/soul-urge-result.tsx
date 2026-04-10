"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import { BluePrint } from "../../components/Blueprint";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { InnerMotivations } from "../../components/InnerMotivations";
import { ShadowExpression } from "../../components/ShadowExpression";

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
          handleLogout={onLogout}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <h1
            style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
            className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
          >
            Your Soul Urge / Heart's Desire
          </h1>

          <div className="flex flex-col items-center mb-[40px]">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {data?.title?.replace("The ", "")}
            </h2>
            {/* <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px]">
              Balance between your energy modes is currently low
            </p> */}
          </div>

          <BluePrint title="Core Desire" blueprint={data?.coreDesire} />

          <InnerMotivations innerMotivations={innerMotivations} />

          <ShadowExpression shadowExpression={shadowExpression} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <SpiritualInsight
            spiritualInsight={data.fulfillmentPath}
            title="Fulfillment Path"
          />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </div>
    </div>
  );
}
