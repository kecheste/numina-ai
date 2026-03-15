"use client";

import { useRef } from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { type TestFromApi, type TestResultResponse } from "@/lib/api-client";

interface MbtiTypeResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  result: TestResultResponse;
  onLogout?: () => void;
}

function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((x) => (typeof x === "string" ? x : String(x)));
  }
  return [];
}

export function MbtiTypeResult({
  onClose,
  shellRef,
  result,
  onLogout,
}: MbtiTypeResultProps) {
  const router = useRouter();

  const typeLabel =
    result?.personality_type ??
    result?.llm_result_json?.title ??
    "Personality Type";
  const shortDescription =
    result?.llm_result_json?.shortDescription ||
    result?.narrative?.split("\n").filter(Boolean)[0] ||
    "";

  const coreTraits = ensureStringArray(
    result?.llm_result_json?.coreTraits ?? result?.insights,
  );
  const strengths = ensureStringArray(
    result?.llm_result_json?.strengths ?? result?.insights,
  );
  const challenges = ensureStringArray(
    result?.llm_result_json?.challenges ?? result?.recommendations,
  );

  const narrative = result?.narrative || result?.llm_result_json?.summary;
  const confidence =
    result?.extracted_json?.confidence || result?.llm_result_json?.confidence;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col pt-2"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout || (() => router.push("/welcome"))}
          shellRef={shellRef}
        />

        <div className="px-[24px] py-6 pb-2 flex-1 overflow-y-auto">
          <div className="text-center mb-1">
            <h1
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[21px] font-[400] text-white"
            >
              Your Personality Type
            </h1>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] mt-4 font-[300] text-[#F2D08C]"
            >
              Your Result
            </p>
          </div>

          <div className="text-center mb-4">
            <h2
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[21px] font-[400] text-white"
            >
              {typeLabel}
            </h2>
          </div>

          <div className="text-center mb-8">
            <p
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "21px" }}
              className="text-[14px] font-[300] text-white"
            >
              {shortDescription}
            </p>
          </div>

          {confidence && Object.keys(confidence).length > 0 && (
            <div className="w-full px-2 mb-8 flex flex-col gap-[14px]">
              <h3
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[14px] font-[400] text-[#F2D08C] text-left uppercase tracking-wide"
              >
                Dimension Profile
              </h3>
              {Object.entries(confidence).map(([trait, pct]) => (
                <div
                  key={trait}
                  className="flex flex-col gap-2 w-full text-left"
                >
                  <div
                    className="flex justify-between text-[#FFFFFF] text-[13px] font-[300]"
                    style={{ fontFamily: "var(--font-gotham)" }}
                  >
                    <span>{trait}</span>
                    <span className="text-[#F2D08C]">{String(pct)}%</span>
                  </div>
                  <div className="w-full h-[6px] bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F2D08C] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {coreTraits.length > 0 && (
            <div className="text-left mb-6">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[15px] font-[350] text-white"
              >
                Core Traits
              </h3>
              <div className="flex flex-wrap gap-1">
                {coreTraits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "16px",
                    }}
                  >
                    <span className="text-[12px] font-[300] text-[#F2D08C]">
                      {trait}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {strengths.length > 0 && (
            <div className="text-left mb-6">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[15px] font-[350] text-white"
              >
                Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map((strength, idx) => (
                  <span
                    key={idx}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "16px",
                    }}
                  >
                    <span className="text-[12px] font-[300] text-[#F2D08C]">
                      {strength}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {challenges.length > 0 && (
            <div className="text-left mb-8">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "24px" }}
                className="text-[15px] font-[600] text-white mb-3"
              >
                Challenges
              </h3>
              <div className="flex flex-wrap gap-2">
                {challenges.map((challenge, idx) => (
                  <span
                    key={idx}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "16px",
                    }}
                  >
                    <span className="text-[12px] font-[300] text-white">
                      {challenge}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mb-10">
            <h2
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[21px] font-[400] text-[#F2D08C] mb-4"
            >
              Your Cognitive Style
            </h2>
            <div
              style={{ fontFamily: "var(--font-gotham)" }}
              className="flex flex-col gap-6 text-[13px] font-[300] text-[#FFFFFF] text-left"
            >
              {narrative
                ?.replace(/\\n/g, "\n")
                .split("\n")
                .filter((line) => line.trim().length > 0)
                .map((paragraph, idx) => (
                  <p key={idx}>{paragraph.trim()}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
