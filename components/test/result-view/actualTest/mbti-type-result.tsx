"use client";

import { useRef } from "react";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";

import { type TestResultResponse } from "@/lib/api-client";

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

function ParagraphBlock({ text }: { text?: string }) {
  if (!text) return null;
  const paragraphs = text
    .replace(/\\n/g, "\n")
    .split("\n")
    .filter((p) => p.trim().length > 0);
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "22px" }}
          className="text-[13px] font-[300] text-white"
        >
          {p.trim()}
        </p>
      ))}
    </div>
  );
}

function ChipList({ items, gold }: { items: string[]; gold?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="border border-[#F2D08C]/50 rounded-[7px] px-3 text-left"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "18px" }}
        >
          <span
            className={`text-[12px] font-[300] ${gold ? "text-[#F2D08C]" : "text-white"}`}
          >
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{ fontFamily: "var(--font-gotham)" }}
      className="text-[14px] font-[400] text-[#F2D08C] uppercase tracking-wide mb-3"
    >
      {children}
    </h3>
  );
}

function Divider() {
  return <div className="w-full h-px bg-white/10 my-6" />;
}

export function MbtiTypeResult({
  onClose,
  shellRef,
  result,
  onLogout,
}: MbtiTypeResultProps) {
  const router = useRouter();

  const llm = result?.llm_result_json ?? {};

  const typeLabel =
    result?.personality_type ?? llm?.title ?? "Personality Type";

  const overview: string = llm?.overview ?? "";

  const narration: string = llm?.narrative ?? "";

  const cognitiveStyle: string = llm?.cognitiveStyle || "";

  const spiritualInsight: string = llm?.spiritualInsight || "";

  const coreTraits = ensureStringArray(llm?.coreTraits ?? result?.insights);
  const strengths = ensureStringArray(llm?.strengths ?? result?.insights);
  const challenges = ensureStringArray(
    llm?.challenges ?? result?.recommendations,
  );
  const tryThis = ensureStringArray(llm?.tryThis);
  const avoidThis = ensureStringArray(llm?.avoidThis);

  const confidence = result?.extracted_json?.confidence || llm?.confidence;

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
          {/* Header */}
          <div className="text-center mb-6">
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[12px] font-[300] text-[#F2D08C] uppercase tracking-widest mb-2"
            >
              Your Personality Type
            </p>
            <h1
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "38px" }}
              className="text-[32px] font-[500] text-white"
            >
              {typeLabel}
            </h1>
          </div>

          {/* Overview */}
          {overview && (
            <>
              <ParagraphBlock text={overview} />
              <Divider />
            </>
          )}

          {/* Dimension Profile */}
          {confidence && Object.keys(confidence).length > 0 && (
            <>
              <SectionTitle>Dimension Profile</SectionTitle>
              <div className="flex flex-col gap-[14px] mb-2">
                {Object.entries(confidence).map(([trait, pct]) => (
                  <div key={trait} className="flex flex-col gap-2 w-full">
                    <div
                      className="flex justify-between text-[#FFFFFF] text-[13px] font-[300]"
                      style={{ fontFamily: "var(--font-gotham)" }}
                    >
                      <span>{trait}</span>
                      <span className="text-[#F2D08C]">{String(pct)}%</span>
                    </div>
                    <div className="w-full h-[5px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F2D08C] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Divider />
            </>
          )}

          {/* Core Traits */}
          {coreTraits.length > 0 && (
            <>
              <SectionTitle>Core Traits</SectionTitle>
              <ChipList items={coreTraits} gold />
              <Divider />
            </>
          )}

          {/* Strengths */}
          {strengths.length > 0 && (
            <>
              <SectionTitle>Strengths</SectionTitle>
              <ChipList items={strengths} gold />
              <Divider />
            </>
          )}

          {/* Challenges */}
          {challenges.length > 0 && (
            <>
              <SectionTitle>Challenges</SectionTitle>
              <ChipList items={challenges} />
              <Divider />
            </>
          )}

          {/* Cognitive Style */}
          {cognitiveStyle && (
            <>
              <SectionTitle>Cognitive Style</SectionTitle>
              <ParagraphBlock text={cognitiveStyle} />
              <Divider />
            </>
          )}

          {/* Try This */}
          {tryThis.length > 0 && (
            <>
              <SectionTitle>Try This</SectionTitle>
              <ul className="flex flex-col gap-1 list-disc pl-4">
                {tryThis.map((item, idx) => (
                  <li key={idx}>
                    <p
                      style={{
                        fontFamily: "var(--font-gotham)",
                        lineHeight: "18px",
                      }}
                      className="text-[13px] font-[300] text-white text-left"
                    >
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
              <Divider />
            </>
          )}

          {/* Avoid This */}
          {avoidThis.length > 0 && (
            <>
              <SectionTitle>Avoid This</SectionTitle>
              <ul className="flex flex-col gap-1 list-disc pl-4">
                {avoidThis.map((item, idx) => (
                  <li key={idx}>
                    <p
                      style={{
                        fontFamily: "var(--font-gotham)",
                        lineHeight: "20px",
                      }}
                      className="text-[13px] font-[300] text-white text-left"
                    >
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
