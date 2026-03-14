"use client";

import { useRef } from "react";
import PageLoader from "../custom/loader";
import type { TestResultResponse } from "@/lib/api-client";
import AppBar from "../navigation/appBar";
import { useRouter } from "next/navigation";

interface TestResultViewProps {
  testId: number;
  testTitle: string;
  category: string;
  onBack: () => void;
  result?: TestResultResponse | null;
}

function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((x) => (typeof x === "string" ? x : String(x)));
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const normalized = trimmed.replace(/'/g, '"');
        const parsed = JSON.parse(normalized);
        if (Array.isArray(parsed)) {
          return parsed.map((x) => (typeof x === "string" ? x : String(x)));
        }
      } catch {}
    }
    return [trimmed];
  }
  return [];
}

function ensureSynchronicities(
  value: unknown,
): { test: string; connection: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (x): x is Record<string, unknown> => x != null && typeof x === "object",
    )
    .map((x) => ({
      test: typeof x.test === "string" ? x.test : String(x.test ?? ""),
      connection:
        typeof x.connection === "string"
          ? x.connection
          : String(x.connection ?? ""),
    }))
    .filter((s) => s.test || s.connection);
}

export function TestResultView({
  testId,
  testTitle,
  category,
  onBack,
  result: apiResult,
}: TestResultViewProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const llm = apiResult?.llm_result_json;
  const result: {
    subtitle?: string | null;
    mainResult?: string | null;
    description?: string | null;
    shortDescription?: string | null;
    coreTraits?: string[] | null;
    strengths?: string[] | null;
    challenges?: string[] | null;
    spiritualInsight?: string | null;
    tryThis?: string[] | null;
    avoidThis?: string[] | null;
    chartData?: {
      number: string;
      title: string;
      line2: string;
      line3: string;
    }[] | null;
    synchronicities?: { test: string; connection: string }[] | null;
    extracted_json?: any | null;
  } | null | undefined = apiResult ? {
    subtitle: "Your Result",
    mainResult: llm?.title ?? apiResult.personality_type,
    description:
      (llm?.summary && llm.summary.trim()) ||
      (apiResult.narrative && apiResult.narrative.trim()),
    shortDescription: llm?.shortDescription,
    coreTraits:
      ensureStringArray(llm?.coreTraits ?? apiResult.insights).length > 0
        ? ensureStringArray(llm?.coreTraits ?? apiResult.insights)
        : undefined,
    strengths:
      ensureStringArray(llm?.strengths ?? apiResult.insights).length > 0
        ? ensureStringArray(llm?.strengths ?? apiResult.insights)
        : undefined,
    challenges:
      ensureStringArray(llm?.challenges ?? apiResult.recommendations).length > 0
        ? ensureStringArray(llm?.challenges ?? apiResult.recommendations)
        : undefined,
    spiritualInsight: llm?.spiritualInsight && llm.spiritualInsight.trim(),
    tryThis: ensureStringArray(llm?.tryThis),
    avoidThis: ensureStringArray(llm?.avoidThis),
    chartData: Array.isArray(llm?.chartData) ? (llm.chartData as any) : undefined,
    synchronicities:
      ensureSynchronicities(llm?.synchronicities).length > 0
        ? ensureSynchronicities(llm?.synchronicities)
        : undefined,
    extracted_json: apiResult.extracted_json,
  } : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4 min-h-dvh overflow-hidden">
      <div
        ref={shellRef}
        className="
          w-full
          relative
          h-dvh 
          sm:h-auto
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          flex
          flex-col
          items-center
          text-center
          pt-2
          pb-4
          overflow-hidden
        "
      >
        <PageLoader>
          <AppBar
            handleBack={onBack}
            handleLogout={() => router.push("/welcome")}
            shellRef={shellRef}
          />

          <div className="px-[24px] py-6 pb-12 flex-1 overflow-y-scroll">
            <div className="text-center">
              <h1
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[21px] font-[400] text-white mb-1"
              >
                {testTitle}
              </h1>
              <p
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[13px] mt-4 font-[300] text-[#F2D08C]"
              >
                {result?.subtitle}
              </p>
            </div>

            <div className="text-center mb-4">
              <h2
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[21px] font-[400] text-white mb-6"
              >
                {result?.mainResult}
              </h2>
            </div>

            <div className="text-center mb-4">
              <p
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "21px" }}
                className="text-[14px] font-[300] text-white mb-3"
              >
                {result?.shortDescription}
              </p>
            </div>

            {result?.extracted_json?.confidence &&
              Object.keys(result.extracted_json.confidence).length > 0 && (
                <div className="w-full px-2 mb-6 flex flex-col gap-[14px]">
                  <h3
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[14px] font-[400] text-[#F2D08C] text-left uppercase tracking-wide"
                  >
                    Dimension Profile
                  </h3>
                  {Object.entries(result.extracted_json.confidence).map(
                    ([trait, pct]) => (
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
                    ),
                  )}
                </div>
              )}

            <div className="text-left my-4">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[15px] font-[350] text-white"
              >
                Core Traits
              </h3>
              <div className="flex flex-wrap gap-1">
                {result?.coreTraits?.map((trait: string, idx: number) => (
                  <span
                    key={idx}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[17px]"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "12px",
                    }}
                  >
                    <span className="text-[12px] font-[300] text-[#F2D08C]">
                      {trait}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="text-left mb-4">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[15px] font-[350] text-white"
              >
                Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {result?.strengths?.map((strength: string, idx: number) => (
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

            <div className="text-left mb-4">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "24px" }}
                className="text-[15px] font-[600] text-white mb-3"
              >
                Challenges
              </h3>
              <div className="flex flex-wrap gap-2">
                {result?.challenges?.map((challenge: string, idx: number) => (
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

            <div className="text-left mb-4">
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
                {result?.spiritualInsight}
              </p>
            </div>

            <div className="text-center mb-4">
              <h2
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[21px] font-[400] text-[#F2D08C] mb-2"
              >
                Your Blueprint
              </h2>
              <div
                style={{ fontFamily: "var(--font-gotham)" }}
                className="flex flex-col gap-6 text-[13px] font-[300] text-[#FFFFFF] text-left"
              >
                {result?.description
                  ?.replace(/\\n/g, "\n")
                  .split("\n")
                  .filter((line) => line.trim().length > 0)
                  .map((paragraph, idx) => (
                    <p key={idx}>{paragraph.trim()}</p>
                  ))}
              </div>
            </div>

            {result?.tryThis && result.tryThis.length > 0 && (
              <div className="text-left mb-4">
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
                  {result.tryThis.map((item: string, idx: number) => (
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

            {result?.avoidThis && result.avoidThis.length > 0 && (
              <div className="text-left mb-4">
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
                  {result.avoidThis.map((item: string, idx: number) => (
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

            {result?.chartData && result.chartData.length > 0 && (
              <div className="text-center mb-4">
                <h3
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "24px",
                  }}
                  className="text-[15px] font-[600] text-white mb-1"
                >
                  {testTitle} in Your Chart
                </h3>
                <div className="space-y-3 text-left">
                  {result.chartData.map((item, idx) => (
                    <div key={idx}>
                      <p
                        style={{ fontFamily: "var(--font-gotham)" }}
                        className="text-[14px] font-[400] text-[#F2D08C]"
                      >
                        {item.number} {item.title}
                      </p>
                      <p
                        style={{ fontFamily: "var(--font-gotham)" }}
                        className="text-[13px] font-[300] text-[#F2D08C]"
                      >
                        {item.line2}
                      </p>
                      <p
                        style={{ fontFamily: "var(--font-gotham)" }}
                        className="text-[13px] font-[400] text-[#F2D08C] italic"
                      >
                        {item.line3}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result?.synchronicities && result.synchronicities.length > 0 && (
              <div className="text-left mb-4">
                <h3
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "24px",
                  }}
                  className="text-[15px] text-center font-[600] text-white mb-1"
                >
                  Synchronicities
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "20px",
                  }}
                  className="text-[12px] font-[300] text-[#FFFFFF]"
                >
                  This Life Path overlaps with your:
                </p>
                <div className="space-y-2">
                  {result.synchronicities.map(
                    (
                      sync: { test: string; connection: string },
                      idx: number,
                    ) => (
                      <p
                        key={idx}
                        style={{
                          fontFamily: "var(--font-gotham)",
                        }}
                        className="text-[13px] font-[300] text-white"
                      >
                        • <span className="font-[600]">{sync.test}</span>:{" "}
                        {sync.connection}
                      </p>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </PageLoader>
      </div>
    </div>
  );
}
