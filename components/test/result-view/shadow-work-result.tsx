"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";

interface ShadowWorkScores {
  vulnerability_avoidance: number;
  self_criticism: number;
  emotional_suppression: number;
  withdrawal_avoidance: number;
}

interface ShadowWorkContent {
  title: string;
  summary: string;
  shortDescription: string;
  shadowPattern: string;
  secondaryPattern: string;
  howItShowsUp: string;
  hiddenStrength: string;
  growthEdge: string;
  tryThis: string[];
  avoidThis: string[];
  extracted_json?: ShadowWorkScores;
}

interface ShadowWorkResultProps {
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  content?: ShadowWorkContent | null;
}

const sectionHeadingStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "24px",
  fontSize: "13px",
  fontWeight: 600,
};

const bodyTextStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "18px",
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
  const scores = content?.extracted_json;

  if (content === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 bg-black text-[#F2D08C]">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin mb-4" />
        <p className="text-[14px] font-[350]">Preparing your shadow interpretation…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-black">
      <AppBar
        hideBackButton
        shellRef={shellRef}
        handleLogout={() => router.push("/welcome")}
      />

      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <div className="px-[24px] pt-4 pb-12">
          <div className="text-center mb-6">
             <h1
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "33px",
              }}
              className="text-[21px] font-[300] text-[#FFFFFF] mb-1"
            >
              {content?.title || "Shadow Work Lens"}
            </h1>
            
            {content?.shortDescription && (
              <p
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "21px" }}
                className="text-[14px] font-[300] text-white/80 mt-2 px-4"
              >
                {content.shortDescription}
              </p>
            )}
          </div>

          {/* Scores Visualization */}
          {scores && (
            <div className="mb-8 space-y-4">
              {Object.entries(scores).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-[400] text-white/70 uppercase tracking-wider">
                    <span>{SHADOW_LABELS[key as keyof ShadowWorkScores]}</span>
                    <span>{val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#F2D08C] rounded-full transition-all duration-1000"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Section */}
          {content?.summary && (
            <div className="mb-8 text-left">
               <div
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-white/90 whitespace-pre-line leading-relaxed"
                >
                  {content.summary}
                </div>
            </div>
          )}

          {/* Interpretation Sections */}
          <div className="space-y-8 text-left">
            {content?.shadowPattern && (
              <section>
                <h2 style={sectionHeadingStyle} className="text-[#F2D08C] mb-2 uppercase tracking-wide decoration-solid">
                  Shadow Pattern
                </h2>
                <div
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-white/90 whitespace-pre-line leading-relaxed"
                >
                  {content.shadowPattern}
                </div>
              </section>
            )}

            {content?.secondaryPattern && (
              <section>
                <h2 style={sectionHeadingStyle} className="text-[#F2D08C] mb-2 uppercase tracking-wide">
                  Secondary Pattern
                </h2>
                <p
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-white/90 leading-relaxed"
                >
                  {content.secondaryPattern}
                </p>
              </section>
            )}

            {content?.howItShowsUp && (
              <section>
                <h2 style={sectionHeadingStyle} className="text-[#F2D08C] mb-2 uppercase tracking-wide">
                  How It Shows Up
                </h2>
                <p
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-white/90 leading-relaxed"
                >
                  {content.howItShowsUp}
                </p>
              </section>
            )}

            <div className="grid grid-cols-1 gap-6">
              {content?.hiddenStrength && (
                <section className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h2 style={sectionHeadingStyle} className="text-[#F2D08C] mb-2 uppercase tracking-wide">
                    Hidden Strength
                  </h2>
                  <p
                    style={bodyTextStyle}
                    className="text-[13px] font-[300] text-white/90 leading-relaxed"
                  >
                    {content.hiddenStrength}
                  </p>
                </section>
              )}

              {content?.growthEdge && (
                <section className="p-4 rounded-xl bg-[#F2D08C]/5 border border-[#F2D08C]/10">
                  <h2 style={sectionHeadingStyle} className="text-[#F2D08C] mb-2 uppercase tracking-wide">
                    Growth Edge
                  </h2>
                  <p
                    style={bodyTextStyle}
                    className="text-[13px] font-[300] text-white/90 leading-relaxed"
                  >
                    {content.growthEdge}
                  </p>
                </section>
              )}
            </div>

            {content?.tryThis && content.tryThis.length > 0 && (
              <section>
                <h2 style={sectionHeadingStyle} className="text-[#F2D08C] mb-3 uppercase tracking-wide">
                  Try This
                </h2>
                <div className="space-y-3">
                  {content.tryThis.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F2D08C] shrink-0" />
                      <p style={bodyTextStyle} className="text-[13px] font-[300] text-white/90 prose-p:leading-tight">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content?.avoidThis && content.avoidThis.length > 0 && (
              <section>
                <h2 style={sectionHeadingStyle} className="text-[#F2D08C] mb-3 uppercase tracking-wide">
                  Avoid This
                </h2>
                <div className="space-y-3">
                  {content.avoidThis.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400/50 shrink-0" />
                      <p style={bodyTextStyle} className="text-[13px] font-[300] text-white/90">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <Button
            onClick={onClose}
            style={{
              fontFamily: "var(--font-gotham)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            className="cursor-pointer mt-12 hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-black rounded-[10px] text-[18px] transition-colors"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
