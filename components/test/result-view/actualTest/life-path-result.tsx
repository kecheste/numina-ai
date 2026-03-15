"use client";

import { useRef } from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { type TestResultResponse } from "@/lib/api-client";

interface LifePathResultViewProps {
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

export function LifePathResultView({
  onClose,
  shellRef,
  result,
  onLogout,
}: LifePathResultViewProps) {
  const router = useRouter();

  const llm = result?.llm_result_json;

  const title = llm?.title ?? result?.test_title ?? "Life Path Number";
  const shortDescription =
    llm?.shortDescription ||
    result?.narrative?.split("\n").filter(Boolean)[0] ||
    "";

  const coreTraits = ensureStringArray(llm?.coreTraits ?? result?.insights);
  const strengths = ensureStringArray(llm?.strengths ?? result?.insights);
  const challenges = ensureStringArray(
    llm?.challenges ?? result?.recommendations,
  );

  const spiritualInsight = llm?.spiritualInsight;
  const narrative = result?.narrative || llm?.summary;

  const tryThis = ensureStringArray(llm?.tryThis);
  const avoidThis = ensureStringArray(llm?.avoidThis);

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

        <div className="px-[24px] py-6 pb-4 flex-1 overflow-y-auto">
          <div className="text-center mb-1">
            <h1
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[21px] font-[400] text-white"
            >
              Your Life Path
            </h1>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] mt-4 font-[300] text-[#F2D08C]"
            >
              Your Result
            </p>
          </div>

          <div className="text-center mb-8 mt-4">
            <p
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "21px" }}
              className="text-[14px] font-[300] text-white"
            >
              {shortDescription}
            </p>
          </div>

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
                      lineHeight: "14px",
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
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[17px]"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "12px",
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
            <div className="text-left mb-6">
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
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[17px]"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "12px",
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

          {spiritualInsight && (
            <div className="text-left mb-8">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "24px" }}
                className="text-[15px] font-[600] text-white mb-1"
              >
                Spiritual Insight
              </h3>
              <p
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[13px] font-[300] text-white"
              >
                {spiritualInsight}
              </p>
            </div>
          )}

          <div className="text-center mb-10">
            <h2
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[21px] font-[400] text-[#F2D08C] mb-4"
            >
              Your Life Path Pattern
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

          {tryThis.length > 0 && (
            <div className="text-left mb-6">
              <h3
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "24px",
                }}
                className="text-[15px] font-[600] text-white mb-2"
              >
                Try This
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {tryThis.map((item, idx) => (
                  <li
                    key={idx}
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[13px] font-[300] text-[#F2D08C]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {avoidThis.length > 0 && (
            <div className="text-left mb-10">
              <h3
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "24px",
                }}
                className="text-[15px] font-[600] text-white mb-2"
              >
                Avoid This
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {avoidThis.map((item, idx) => (
                  <li
                    key={idx}
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[13px] font-[300] text-white/90"
                  >
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
