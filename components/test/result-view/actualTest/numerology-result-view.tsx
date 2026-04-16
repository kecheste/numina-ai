"use client";

import React from "react";

import AppBar from "@/components/navigation/appBar";
import { TestResultResponse } from "@/lib/api-client";
import { BluePrint } from "../../components/Blueprint";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { MobileFrame } from "@/components/layout/mobile-frame";

interface NumerologyScores {
  life_path: number;
  soul_urge: number;
  expression: number;
  birthday: number;
  birth_day?: number;
}

export interface NumerologyContent {
  title?: string;
  lifePath?: string;
  soulUrge?: string;
  expression?: string;
  birthday?: string;
  coreTraits?: string[];
  strengths?: string[];
  challenges?: string[];
  spiritualInsight?: string;
  yourBlueprint?: string;
  summary?: string;
  narrative?: string;
  tryThis?: string[];
  avoidThis?: string[];
  extracted_json?: NumerologyScores;
}

function Paragraphs({ text, className }: { text: string; className?: string }) {
  const lines = text
    .replace(/\\n/g, "\n")
    .split("\n")
    .filter((l) => l.trim().length > 0);
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <p key={i} className={i > 0 ? "mt-3" : ""}>
          {line.trim()}
        </p>
      ))}
    </div>
  );
}

function NumberSection({
  text,
  number,
  title,
}: {
  text?: string | null;
  number?: number | string | null;
  title?: string | null;
}) {
  if (!text) return null;

  return (
    <div className="grid grid-cols-6 gap-2 w-full text-left">
      <div className="col-span-1 flex items-center justify-center">
        <span
          style={{ fontFamily: "var(--font-gotham)" }}
          className="text-[58px] font-[400] text-white"
        >
          {number}
        </span>
      </div>

      <div className="col-span-1 flex items-center justify-center">
        <span className="text-[#FFFFFF] text-[48px] font-[300]">→</span>
      </div>

      <div className="col-span-4">
        <h3
          style={{ fontFamily: "var(--font-gotham)" }}
          className="text-[15px] font-[350] text-[#FFFFFF] mb-0.5"
        >
          {title}
        </h3>

        <p
          style={{ fontFamily: "var(--font-gotham)" }}
          className="text-[13px] font-[300] text-[#F2D08C]"
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export function NumerologyResultView({
  content,
  onClose,
  shellRef,
  onLogout,
}: {
  content?: TestResultResponse | null;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}) {
  const lpValue = content?.extracted_json?.lifePath;
  const suValue = content?.extracted_json?.soulUrge;
  const exValue = content?.extracted_json?.expression_number;
  const bdValue = content?.extracted_json?.birth_day;

  const lifePath = content?.llm_result_json?.lifePath;
  const soulUrge = content?.llm_result_json?.soulUrge;
  const expression = content?.llm_result_json?.expression;
  const birthday = content?.llm_result_json?.birthday;
  const coreTraits = content?.llm_result_json?.coreTraits;
  const strengths = content?.llm_result_json?.strengths;
  const challenges = Array.isArray(content?.llm_result_json?.challenges)
    ? content?.llm_result_json?.challenges
    : undefined;
  const spiritualInsight = content?.llm_result_json?.spiritualInsight;
  const blueprint =
    content?.llm_result_json?.corePattern ||
    content?.llm_result_json?.summary ||
    content?.narrative;
  const tryThis = content?.llm_result_json?.tryThis;
  const avoidThis = content?.llm_result_json?.avoidThis;

  const hasNumberSections = lifePath || soulUrge || expression || birthday;

  return (
    <div className="fixed inset-0 z-50">
      <MobileFrame
        ref={shellRef}
        scrollable={true}
        className="relative pt-2"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <h1
            style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
            className="text-[20px] font-[350] text-[#FFFFFF] mb-[40px] text-center"
          >
            Your Numerology
          </h1>

          {hasNumberSections && (
            <div className="mb-10 gap-8 flex flex-col">
              <NumberSection
                text={lifePath}
                number={lpValue}
                title={"Life Path"}
              />
              <NumberSection
                text={expression}
                number={exValue}
                title={"Expression"}
              />
              <NumberSection
                text={soulUrge}
                number={suValue}
                title={"Soul Urge"}
              />
              <NumberSection
                text={birthday}
                number={bdValue}
                title={"Birthday"}
              />
            </div>
          )}

          <BluePrint title="" blueprint={blueprint} />

          <CoreTraits coreTraits={coreTraits} />

          <Strength strengths={strengths} />

          <Challenge challenges={challenges} />

          <SpiritualInsight spiritualInsight={spiritualInsight} />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </MobileFrame>
    </div>
  );
}
