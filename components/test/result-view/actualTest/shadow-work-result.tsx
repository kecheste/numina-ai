"use client";

import React from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { TestResultResponse } from "@/lib/api-client";

interface ShadowWorkScores {
  vulnerability_avoidance: number;
  self_criticism: number;
  emotional_suppression: number;
  withdrawal_avoidance: number;
}

interface ShadowWorkResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  content?: TestResultResponse | null;
}

const sectionHeadingStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "24px",
  fontSize: "13px",
  fontWeight: 600,
};

const bodyTextStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "21px",
};

const SHADOW_LABELS: Record<keyof ShadowWorkScores, string> = {
  vulnerability_avoidance: "Vulnerability Avoidance",
  self_criticism: "Self-Criticism",
  emotional_suppression: "Emotional Suppression",
  withdrawal_avoidance: "Withdrawal Avoidance",
};

export function ShadowWorkResult({
  onClose,
  shellRef,
  content,
}: ShadowWorkResultProps) {
  const router = useRouter();

  const scores = React.useMemo(() => {
    if (!content) return null;
    let s: any = content.extracted_json;
    if (typeof s === "string") {
      try {
        s = JSON.parse(s);
      } catch (e) {}
    }
    if (s && typeof s === "object") {
      if ("self_criticism" in s || "vulnerability_avoidance" in s) {
        return s;
      }
      const nested = Object.values(s).find(
        (v: any) =>
          v &&
          typeof v === "object" &&
          ("self_criticism" in v || "vulnerability_avoidance" in v),
      );
      if (nested) return nested;
    }
    if ("self_criticism" in content || "vulnerability_avoidance" in content) {
      return content;
    }
    return null;
  }, [content]);

  if (content === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 bg-black text-[#F2D08C]">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
        <p className="text-[14px] font-[350]">
          Preparing your shadow interpretation…
        </p>
      </div>
    );
  }

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
          handleLogout={() => router.push("/welcome")}
        />

        <div className="flex flex-col pt-4 pb-12 flex-1 overflow-y-auto">
          <div className="px-[24px] pb-12">
            <div className="text-center mb-6">
              <h1
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "33px",
                }}
                className="text-[21px] font-[350] text-[#FFFFFF] mb-1"
              >
                Shadow Work Lens
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "21px",
                }}
                className="text-[14px] font-[300] text-[#F2D08C] mt-2 px-4"
              >
                Your Result
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "33px",
                }}
                className="text-[17px] font-[300] text-[#FFFFFF] mb-1"
              >
                {content?.llm_result_json?.title}
              </h1>

              {typeof content?.llm_result_json?.shortDescription ===
                "string" && (
                <p
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "21px",
                  }}
                  className="text-[13px] w-full font-[300] text-white/80 mt-2 px-4"
                >
                  {content?.llm_result_json?.shortDescription}
                </p>
              )}
            </div>

            {scores && (
              <div className="mb-8 space-y-4">
                {Object.entries(scores)
                  .filter(([key]) => key in SHADOW_LABELS)
                  .map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-[400] text-white/70 uppercase tracking-wider">
                        <span>
                          {SHADOW_LABELS[key as keyof ShadowWorkScores] || key}
                        </span>
                        <span>
                          {typeof val === "number" || typeof val === "string"
                            ? val
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F2D08C] rounded-full transition-all duration-1000"
                          style={{
                            width: `${typeof val === "number" ? val : parseInt(String(val)) || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <h1
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "33px",
              }}
              className="text-[20px] font-[300] text-[#FFFFFF] mb-2"
            >
              Your Shadow Pattern
            </h1>

            {typeof content?.llm_result_json?.summary === "string" && (
              <div className="mb-8 text-left">
                <div
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-white/90 whitespace-pre-line leading-relaxed"
                >
                  {content?.llm_result_json?.summary}
                </div>
              </div>
            )}

            <div className="space-y-8 text-left">
              {typeof content?.llm_result_json?.shadowPattern === "string" && (
                <section>
                  <h2
                    style={sectionHeadingStyle}
                    className="text-[#F2D08C] mb-2 uppercase tracking-wide decoration-solid"
                  >
                    Shadow Pattern
                  </h2>
                  <div
                    style={bodyTextStyle}
                    className="text-[13px] font-[300] text-white/90 whitespace-pre-line leading-relaxed"
                  >
                    {content?.llm_result_json?.shadowPattern}
                  </div>
                </section>
              )}

              {typeof content?.llm_result_json?.secondaryPattern ===
                "string" && (
                <section>
                  <h2
                    style={sectionHeadingStyle}
                    className="text-[#F2D08C] mb-2 uppercase tracking-wide"
                  >
                    Secondary Pattern
                  </h2>
                  <p
                    style={bodyTextStyle}
                    className="text-[13px] font-[300] text-white/90 leading-relaxed"
                  >
                    {content?.llm_result_json?.secondaryPattern}
                  </p>
                </section>
              )}

              {typeof content?.llm_result_json?.howItShowsUp === "string" && (
                <section>
                  <h2
                    style={sectionHeadingStyle}
                    className="text-[#F2D08C] mb-2 uppercase tracking-wide"
                  >
                    How It Shows Up
                  </h2>
                  <p
                    style={bodyTextStyle}
                    className="text-[13px] font-[300] text-white/90 leading-relaxed"
                  >
                    {content?.llm_result_json?.howItShowsUp}
                  </p>
                </section>
              )}

              <div className="grid grid-cols-1 gap-6">
                {typeof content?.llm_result_json?.hiddenStrength ===
                  "string" && (
                  <section className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h2
                      style={sectionHeadingStyle}
                      className="text-[#F2D08C] mb-2 uppercase tracking-wide"
                    >
                      Hidden Strength
                    </h2>
                    <p
                      style={bodyTextStyle}
                      className="text-[13px] font-[300] text-white/90 leading-relaxed"
                    >
                      {content?.llm_result_json?.hiddenStrength}
                    </p>
                  </section>
                )}

                {typeof content?.llm_result_json?.growthEdge === "string" && (
                  <section className="p-4 rounded-xl bg-[#F2D08C]/5 border border-[#F2D08C]/10">
                    <h2
                      style={sectionHeadingStyle}
                      className="text-[#F2D08C] mb-2 uppercase tracking-wide"
                    >
                      Growth Edge
                    </h2>
                    <p
                      style={bodyTextStyle}
                      className="text-[13px] font-[300] text-white/90 leading-relaxed"
                    >
                      {content?.llm_result_json?.growthEdge}
                    </p>
                  </section>
                )}
              </div>

              {Array.isArray(content?.llm_result_json?.tryThis) &&
                content?.llm_result_json?.tryThis.length > 0 && (
                  <section>
                    <h2
                      style={sectionHeadingStyle}
                      className="text-[#F2D08C] mb-3 uppercase tracking-wide"
                    >
                      Try This
                    </h2>
                    <div className="space-y-3">
                      {content?.llm_result_json?.tryThis.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F2D08C] shrink-0" />
                          <p
                            style={bodyTextStyle}
                            className="text-[13px] font-[300] text-white/90 prose-p:leading-tight"
                          >
                            {typeof item === "string"
                              ? item
                              : JSON.stringify(item)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              {Array.isArray(content?.llm_result_json?.avoidThis) &&
                content?.llm_result_json?.avoidThis.length > 0 && (
                  <section>
                    <h2
                      style={sectionHeadingStyle}
                      className="text-[#F2D08C] mb-3 uppercase tracking-wide"
                    >
                      Avoid This
                    </h2>
                    <div className="space-y-3">
                      {content?.llm_result_json?.avoidThis.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/50 shrink-0" />
                          <p
                            style={bodyTextStyle}
                            className="text-[13px] font-[300] text-white/90"
                          >
                            {typeof item === "string"
                              ? item
                              : JSON.stringify(item)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
