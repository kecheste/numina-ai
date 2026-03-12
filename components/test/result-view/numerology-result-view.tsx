"use client";
import React from "react";

import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import type { NumerologyResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

interface NumerologyScores {
  life_path: number;
  soul_urge: number;
  expression: number;
  birthday: number;
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

export function NumerologyResultView({
  data,
  content,
  onClose,
  shellRef,
  onLogout,
}: {
  data?: NumerologyResponse | null;
  content?: NumerologyContent | null;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}) {
  const scores = React.useMemo(() => {
    if (data) return data as any;
    if (!content) return null;
    let s: any = content.extracted_json;
    if (typeof s === "string") {
      try {
        s = JSON.parse(s);
      } catch (e) {}
    }
    if (s && typeof s === "object") {
      if ("life_path" in s || "life_path_number" in s) {
        return s;
      }
      const nested = Object.values(s).find(
        (v: any) =>
          v &&
          typeof v === "object" &&
          ("life_path" in v || "life_path_number" in v),
      );
      if (nested) return nested;
    }

    if ("life_path" in content || "life_path_number" in content) {
      return content as any;
    }
    return null;
  }, [data, content]);

  const lpValue = scores?.life_path || scores?.life_path_number;
  const suValue = scores?.soul_urge || scores?.soul_urge_number;
  const exValue = scores?.expression || scores?.expression_number;
  const bdValue = "birthday" in (scores || {}) ? scores?.birthday : scores?.birthday_number;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4 min-h-dvh overflow-hidden">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <h1 className="text-[21px] font-[500] text-[#FFFFFF] mb-2 text-center">
            {content?.title || "Numerology"}
          </h1>
          <h1 className="text-[18px] font-[300] text-[#F2D08C] mb-2 text-center">
            The Blueprint of Your Soul
          </h1>
          <p className="text-[13px] font-[300] text-white/90 mb-6 text-center">
            Based on your name and birth date
          </p>

          {content?.coreTraits && content.coreTraits.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {content.coreTraits.map((trait) => (
                <span
                  key={trait}
                  className="border border-[#F2D08C]/50 rounded-[20px] px-2 text-[12px] font-[350] text-[#F2D08C]"
                >
                  {trait}
                </span>
              ))}
            </div>
          )}

          {/* Key Numbers Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 mb-10">
            {lpValue != null && (
              <NumberRow
                label="Life Path"
                value={lpValue}
                description={content?.lifePath}
              />
            )}
            {suValue != null && (
              <NumberRow
                label="Soul Urge"
                value={suValue}
                description={content?.soulUrge}
              />
            )}
            {exValue != null && (
              <NumberRow
                label="Expression"
                value={exValue}
                description={content?.expression}
              />
            )}
            {bdValue != null && (
              <NumberRow
                label="Birthday"
                value={bdValue}
                description={content?.birthday}
              />
            )}
          </div>

          {/* Blueprint / Summary Section */}
          {(content?.yourBlueprint || content?.summary || content?.narrative) && (
            <>
              <h3
                className="text-[18px] text-center font-[400] text-[#F2D08C] mb-4"
                style={{ lineHeight: "33px" }}
              >
                Your Blueprint
              </h3>
              <div
                className="flex flex-col text-left gap-6 text-[13px] font-[300] text-white/90 mb-10"
                style={{ lineHeight: "20px" }}
              >
                {(content.yourBlueprint || content.summary || content.narrative)!
                  .replace(/\\n/g, "\n")
                  .split("\n")
                  .filter((line) => line.trim().length > 0)
                  .map((paragraph, idx) => (
                    <p key={idx}>{paragraph.trim()}</p>
                  ))}
              </div>
            </>
          )}

          {/* Strengths & Challenges */}
          <div className="text-left mb-10">
            <h3
              className="text-[18px] font-[400] text-[#F2D08C] mb-4"
              style={{ lineHeight: "33px" }}
            >
              Strengths & Challenges
            </h3>
            <div className="space-y-6">
              {content?.strengths && content.strengths.length > 0 && (
                <div>
                  <p className="text-[13px] font-[400] text-[#F2D08C] mb-2 uppercase tracking-wider">
                    Strengths
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {content.strengths.map((s) => (
                      <p
                        className="border border-white/30 text-[13px] font-[300] text-white rounded-md px-2 py-0.5"
                        key={s}
                      >
                        {s}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {content?.challenges && content.challenges.length > 0 && (
                <div>
                  <p className="text-[13px] font-[400] text-[#F2D08C] mb-2 uppercase tracking-wider">
                    Challenges
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {content.challenges.map((c) => (
                      <p
                        className="border border-white/30 text-[13px] font-[300] text-white rounded-md px-2 py-0.5"
                        key={c}
                      >
                        {c}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spiritual Insight */}
          {content?.spiritualInsight && (
            <div className="text-left mb-10">
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Spiritual Insight
              </h3>
              <p
                className="text-[13px] font-[350] text-white/90 italic border-l-2 border-[#F2D08C] pl-4"
                style={{ lineHeight: "20px" }}
              >
                {content.spiritualInsight}
              </p>
            </div>
          )}

          {/* Practical Path - Try/Avoid */}
          <div className="grid grid-cols-1 gap-8 text-left mb-6">
            {content?.tryThis && content.tryThis.length > 0 && (
              <div>
                <h3
                  className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                  style={{ lineHeight: "33px" }}
                >
                  Try This
                </h3>
                <ul className="list-disc list-inside text-[13px] font-[350] text-white/90 space-y-1">
                  {content.tryThis.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
            {content?.avoidThis && content.avoidThis.length > 0 && (
              <div>
                <h3
                  className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                  style={{ lineHeight: "33px" }}
                >
                  Avoid This
                </h3>
                <ul className="list-disc list-inside text-[13px] font-[350] text-white/90 space-y-1">
                  {content.avoidThis.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberRow({
  label,
  value,
  description: _description,
}: {
  label: string;
  value: any;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-16 h-16 flex items-center justify-center mb-3">
        {/* Decorative Circle Container */}
        <div className="absolute inset-0 border border-[#F2D08C]/30 rounded-full" />
        <div className="absolute inset-1 border border-[#F2D08C]/10 rounded-full" />
        <span className="text-[32px] font-light text-[#F2D08C] relative z-10 leading-none">
          {value}
        </span>
      </div>
      <h3 className="text-[13px] font-[400] text-[#F2D08C] uppercase tracking-widest mb-1">
        {label}
      </h3>
      <p className="text-[11px] font-[300] text-white/50 leading-tight uppercase tracking-wider">
        Number {value}
      </p>
    </div>
  );
}
