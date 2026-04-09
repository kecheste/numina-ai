"use client";

import { SunIcon } from "@/components/icons/sun-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { RisingIcon } from "@/components/icons/rising-icon";
import { type TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { SpiritualInsight } from "../../components/SpiritualInsight";

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
          <h1
            style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
            className="text-[20px] font-[350] text-[#FFFFFF] mb-[40px] text-center"
          >
            Your Astrology Chart
          </h1>

          {traits.length > 0 && (
            <>
              <h2
                style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
                className="text-[15px] font-[350] text-[#FFFFFF] text-left mb-[10px]"
              >
                Cosmic Summary
              </h2>
              <div className="flex flex-col items-start gap-2 mb-[40px]">
                {traits.map((trait: string) => (
                  <span
                    key={trait}
                    style={{
                      fontFamily: "var(--font-gotham)",
                    }}
                    className="border border-[#F2D08C] rounded-[5px] px-2 text-[13px] font-[350] text-[#F2D08C]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-[30px]">
            <div className="col-span-1">
              <SunIcon />
            </div>
            <div className="col-span-4">
              <h3
                style={{
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[15px] font-[350] text-white mb-0.5"
              >
                Sun Sign
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[13px] font-[350] text-[#F2D08C]"
              >
                {sunDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-[30px]">
            <div className="col-span-1">
              <MoonIcon />
            </div>
            <div className="col-span-4">
              <h3
                style={{
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[15px] font-[350] text-white mb-0.5"
              >
                Moon Sign
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[13px] font-[350] text-[#F2D08C]"
              >
                {moonDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 w-full text-left mb-[30px]">
            <div className="col-span-1">
              <RisingIcon />
            </div>
            <div className="col-span-4">
              <h3
                style={{
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[15px] font-[350] text-white mb-0.5"
              >
                Rising Sign
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[13px] font-[350] text-[#F2D08C]"
              >
                {risingDesc}
              </p>
            </div>
          </div>

          {elements.length > 0 && (
            <>
              <h3
                className="text-[15px] font-[350] text-[#FFFFFF] mb-[10px] text-left"
                style={{ fontFamily: "var(--font-gotham)" }}
              >
                Element Distribution
              </h3>
              <div className="flex flex-col items-start gap-2 mb-[40px]">
                {elements.map(({ name, count }) => (
                  <span
                    key={name}
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="border border-[#F2D08C] rounded-[5px] px-2 text-[13px] font-[350] text-[#F2D08C]"
                  >
                    {name} {count}
                  </span>
                ))}
              </div>
            </>
          )}

          {narrative && (
            <>
              <h3
                className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
                style={{ fontFamily: "var(--font-gotham)" }}
              >
                Your astrological pattern
              </h3>
              <div
                className="flex flex-col text-left gap-6 text-[13px] font-[300] text-[#FFFFFF] mb-[40px]"
                style={{ fontFamily: "var(--font-gotham)" }}
              >
                {narrative
                  .replace(/\\n/g, "\n")
                  .split("\n")
                  .filter((l) => l.trim())
                  .map((p, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "var(--font-gotham)",
                        lineHeight: "19px",
                      }}
                      className="border-l border-[#F2D08C] pl-[8px] py-0 m-0 text-[13px] font-[350] text-[#FFFFFF]"
                    >
                      {p.trim()}
                    </p>
                  ))}
              </div>
            </>
          )}

          <div className="text-left mb-6">
            <Strength strengths={strengths} />
            <Challenge challenges={challenges} />
            <TryThis tryThis={tryThis} />
            <AvoidThis avoidThis={avoidThis} />
            <SpiritualInsight spiritualInsight={spiritualInsight} />
          </div>
        </div>
      </div>
    </div>
  );
}
