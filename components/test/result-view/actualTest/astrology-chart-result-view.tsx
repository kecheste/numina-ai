"use client";

import { SunIcon } from "@/components/icons/sun-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { RisingIcon } from "@/components/icons/rising-icon";
import { type TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";

export function AstrologyChartResultView({
  result,
  onClose,
  shellRef,
  onLogout,
}: {
  result: TestResultResponse;
  onClose: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
  onLogout: () => void;
}) {
  const llm = result?.llm_result_json;
  const extracted = result?.extracted_json as
    | Record<string, any>
    | null
    | undefined;

  const sunDesc =
    extracted?.sun_description ?? "Your sun sign shapes your core personality.";
  const moonDesc =
    extracted?.moon_description ??
    "Your moon sign reveals how you process emotions.";
  const risingDesc =
    extracted?.rising_description ??
    "Your rising sign reflects how others see you.";
  const cosmicSummary = extracted?.cosmic_traits_summary ?? null;

  const el = (extracted?.element_distribution ?? {}) as Record<string, number>;
  const elements = (["fire", "earth", "air", "water"] as const)
    .filter((k) => (el[k] ?? 0) > 0)
    .map((k) => ({
      name: k.charAt(0).toUpperCase() + k.slice(1),
      count: el[k],
    }));

  const traits = llm?.coreTraits ?? [];
  const strengths = llm?.strengths ?? [];
  const challenges = llm?.challenges ?? [];
  const tryThis = llm?.tryThis ?? [];
  const avoidThis = llm?.avoidThis ?? [];
  const spiritualInsight = llm?.spiritualInsight ?? null;
  const overlaps = (llm?.synchronicities ?? []) as {
    label?: string;
    description?: string;
  }[];
  const narrative = result.narrative ?? null;

  const sunSign = extracted?.sun_sign ?? null;
  const moonSign = extracted?.moon_sign ?? null;
  const risingSign = extracted?.rising_sign ?? null;

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
          <h1 className="text-[21px] font-[500] text-[#FFFFFF] mb-1">
            Your Astrology Chart
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-4">
            Your Result
          </h2>

          {traits.length > 0 && (
            <>
              <h2 className="text-[16px] font-[400] text-[#FFFFFF] text-left mb-2">
                Core Traits:
              </h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {traits.map((trait: string) => (
                  <span
                    key={trait}
                    className="border border-[#F2D08C]/50 rounded-[20px] px-2 text-[12px] font-[350] text-[#F2D08C]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
            <div className="col-span-1">
              <SunIcon />
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">
                Sun Sign {sunSign ? `— ${sunSign}` : ""}
              </h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">{sunDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
            <div className="col-span-1">
              <MoonIcon />
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">
                Moon Sign {moonSign ? `— ${moonSign}` : ""}
              </h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">
                {moonDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-6">
            <div className="col-span-1">
              <RisingIcon />
            </div>
            <div className="col-span-4">
              <h3 className="text-[15px] font-[350] text-white mb-0.5">
                Rising Sign {risingSign ? `— ${risingSign}` : ""}
              </h3>
              <p className="text-[13px] font-[400] text-[#F2D08C]">
                {risingDesc}
              </p>
            </div>
          </div>

          {elements.length > 0 && (
            <>
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Element Distribution
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {elements.map(({ name, count }) => (
                  <span
                    key={name}
                    className="border border-[#F2D08C]/50 rounded-[20px] px-2 text-[12px] font-[350] text-[#F2D08C]"
                  >
                    {name} {count}
                  </span>
                ))}
              </div>
            </>
          )}

          {cosmicSummary && (
            <>
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Cosmic Traits Summary
              </h3>
              <p
                className="text-[13px] text-left font-[350] text-white/90 mb-6 whitespace-pre-line"
                style={{ lineHeight: "20px" }}
              >
                {cosmicSummary}
              </p>
            </>
          )}

          {narrative && (
            <>
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2 text-center"
                style={{ lineHeight: "33px" }}
              >
                Your Astrological Pattern
              </h3>
              <div
                className="flex flex-col text-left gap-6 text-[13px] font-[300] text-white/90 mb-6"
                style={{ lineHeight: "20px" }}
              >
                {narrative
                  .replace(/\\n/g, "\n")
                  .split("\n")
                  .filter((l) => l.trim())
                  .map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
              </div>
            </>
          )}

          {(strengths.length > 0 || challenges.length > 0) && (
            <div className="text-left mb-6">
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Strengths & Challenges
              </h3>
              {strengths.length > 0 && (
                <>
                  <p className="text-[13px] font-[400] text-[#F2D08C] mb-1">
                    Strengths
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {strengths.map((s: string) => (
                      <p
                        key={s}
                        className="border border-white/40 text-[13px] font-[300] rounded-md px-2"
                      >
                        {s}
                      </p>
                    ))}
                  </div>
                </>
              )}
              {challenges.length > 0 && (
                <>
                  <p className="text-[13px] font-[400] text-[#F2D08C] mb-1">
                    Challenges
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {challenges.map((c: string) => (
                      <p
                        key={c}
                        className="border border-white/40 text-[13px] font-[300] rounded-md px-2"
                      >
                        {c}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {tryThis.length > 0 && (
            <div className="text-left mb-6">
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Try This
              </h3>
              <ul className="list-disc list-inside text-[13px] font-[350] text-white/90 space-y-0.5">
                {tryThis.map((t: string) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {avoidThis.length > 0 && (
            <div className="text-left mb-6">
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Avoid This
              </h3>
              <div className="flex flex-wrap gap-1">
                {avoidThis.map((a: string) => (
                  <p
                    key={a}
                    className="border border-white/40 text-[13px] font-[300] rounded-md px-2"
                  >
                    {a}
                  </p>
                ))}
              </div>
            </div>
          )}

          {overlaps.length > 0 && (
            <div className="text-left mb-6">
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Synchronicities
              </h3>
              <ul className="space-y-2">
                {overlaps.map((o, i) => (
                  <li key={i}>
                    <span className="text-[13px] font-[400] text-[#F2D08C]">
                      {o.label}:{" "}
                    </span>
                    <span className="text-[13px] font-[350] text-white/90">
                      {o.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {spiritualInsight && (
            <div className="text-left">
              <h3
                className="text-[18px] font-[400] text-[#F2D08C] mb-2"
                style={{ lineHeight: "33px" }}
              >
                Spiritual Insight
              </h3>
              <p
                className="text-[13px] font-[350] text-white/90"
                style={{ lineHeight: "20px" }}
              >
                {spiritualInsight}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
