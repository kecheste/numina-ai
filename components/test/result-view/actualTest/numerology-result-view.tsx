"use client";
import React from "react";

import AppBar from "@/components/navigation/appBar";
import { TestResultResponse } from "@/lib/api-client";

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
    : null;
  const spiritualInsight = content?.llm_result_json?.spiritualInsight;
  const blueprint =
    content?.llm_result_json?.corePattern ||
    content?.llm_result_json?.summary ||
    content?.narrative;
  const tryThis = content?.llm_result_json?.tryThis;
  const avoidThis = content?.llm_result_json?.avoidThis;

  const hasNumberSections = lifePath || soulUrge || expression || birthday;
  const hasStrengthsChallenges =
    (strengths && strengths.length > 0) ||
    (challenges && challenges.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4 min-h-dvh overflow-hidden">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 pt-2 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-16 flex-1 overflow-y-auto">
          <h1 className="text-[21px] font-[300] text-[#FFFFFF] mb-1 text-center tracking-widest">
            Your Numerology
          </h1>
          <p className="text-[12px] font-[300] text-[#F2D08C] mt-1 mb-8 text-center tracking-[0.2em]">
            Your Result
          </p>

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

          {blueprint && (
            <div className="mb-10">
              <Paragraphs
                text={blueprint}
                className="text-[13px] font-[300] text-white/85 leading-relaxed text-center"
              />
            </div>
          )}

          <div>
            <h3
              className="text-[16px] font-[400] text-[#FFFFFF] mb-4"
              style={{ lineHeight: "24px" }}
            >
              Core Traits
            </h3>
            {coreTraits && coreTraits.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {coreTraits.map((trait) => (
                  <span
                    key={trait}
                    className="border border-[#F2D08C]/50 rounded-[20px] px-3 py-1 text-[11px] font-[350] text-[#F2D08C]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            )}
          </div>

          {hasStrengthsChallenges && (
            <div className="mb-10">
              <h3
                className="text-[16px] font-[400] text-[#F2D08C] mb-4"
                style={{ lineHeight: "24px" }}
              >
                Strengths &amp; Challenges
              </h3>
              <div className="space-y-5">
                {strengths && strengths.length > 0 && (
                  <div>
                    <p className="text-[11px] font-[400] text-[#F2D08C] mb-2 uppercase tracking-widest">
                      Strengths
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {strengths.map((s) => (
                        <span
                          key={s}
                          className="border border-white/25 text-[12px] font-[300] text-white rounded-md px-2 py-0.5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {challenges && challenges.length > 0 && (
                  <div>
                    <p className="text-[11px] font-[400] text-[#F2D08C] mb-2 uppercase tracking-widest">
                      Challenges
                    </p>
                    <div className="flex flex-wrap gap-2 text-left">
                      {challenges.map((c) => (
                        <span
                          key={c}
                          className="border border-white/25 text-[12px] font-[300] text-white rounded-md px-2 py-0.5"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {spiritualInsight && (
            <div className="mb-8">
              <h3
                className="text-[16px] font-[400] text-[#F2D08C] mb-3"
                style={{ lineHeight: "24px" }}
              >
                Spiritual Insight
              </h3>
              <p
                className="text-[13px] font-[300] text-white/85 italic border-l-2 border-[#F2D08C]/60 pl-4"
                style={{ lineHeight: "20px" }}
              >
                {spiritualInsight}
              </p>
            </div>
          )}

          {tryThis && tryThis.length > 0 && (
            <div className="mb-4 text-left">
              <h3
                className="text-[16px] font-[400] text-[#F2D08C] mb-3"
                style={{ lineHeight: "24px" }}
              >
                Try This
              </h3>
              <ul className="list-disc pl-5">
                {tryThis.map((t, i) => (
                  <li
                    key={i}
                    className="text-[12px] font-[300] text-white/85"
                    style={{ lineHeight: "20px" }}
                  >
                    <div className="flex gap-2">
                      <span>{t}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {avoidThis && avoidThis.length > 0 && (
            <div className="text-left">
              <h3
                className="text-[16px] font-[400] text-[#F2D08C] mb-3"
                style={{ lineHeight: "24px" }}
              >
                Avoid This
              </h3>

              <ul className=" list-disc pl-5">
                {avoidThis.map((a, i) => (
                  <li
                    key={i}
                    className="text-[12px] font-[300] text-white/85"
                    style={{ lineHeight: "20px" }}
                  >
                    <div className="flex gap-2">
                      <span>{a}</span>
                    </div>
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
