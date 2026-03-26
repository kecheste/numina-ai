import React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";

interface TransitsResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function TransitsResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: TransitsResultProps) {
  const router = useRouter();

  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};

  const currentClimate: string = data.currentClimate || "";
  const whatIsBeingActivated: string[] = Array.isArray(data.whatIsBeingActivated)
    ? data.whatIsBeingActivated
    : [];
  const supportiveOpenings: string[] = Array.isArray(data.supportiveOpenings)
    ? data.supportiveOpenings
    : [];
  const tensionsToWatch: string[] = Array.isArray(data.tensionsToWatch)
    ? data.tensionsToWatch
    : [];
  const timingInsight: string = data.timingInsight || "";
  const tryThis: string[] = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis: string[] = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const natal = extracted.natal || {};
  const currentTransits = extracted.current_transits || {};
  const majorAspects: any[] = Array.isArray(extracted.major_aspects)
    ? extracted.major_aspects
    : [];
  const activeThemes: string[] = Array.isArray(extracted.active_themes)
    ? extracted.active_themes
    : [];

  const transitEntries = Object.entries(currentTransits) as [string, string][];

  const planetLabel = (key: string) =>
    key.replace("_sign", "").replace(/^\w/, (c) => c.toUpperCase());

  const climateParagraphs = currentClimate
    .split("\n\n")
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-hidden flex flex-col pt-2"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout || (() => router.push("/welcome"))}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          {/* Header */}
          <h1 className="text-[21px] font-[500] text-[#FFFFFF] mb-1">
            {data.title || "Your Transit Reading"}
          </h1>
          <h2 className="text-[13px] font-[300] text-[#B8A2F2] mb-6">
            Current Planetary Reading
          </h2>

          {/* Natal Placements Pill Row */}
          {(natal.sun_sign || natal.moon_sign || natal.rising_sign) && (
            <div className="mb-6 flex gap-2 flex-wrap">
              {natal.sun_sign && (
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60">
                  ☀️ {natal.sun_sign}
                </div>
              )}
              {natal.moon_sign && (
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60">
                  🌙 {natal.moon_sign}
                </div>
              )}
              {natal.rising_sign && (
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60">
                  ↑ {natal.rising_sign}
                </div>
              )}
            </div>
          )}

          {/* Current Transits Grid */}
          {transitEntries.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[#FFFFFF] text-[11px] uppercase tracking-wider mb-3 border-b border-white/10 pb-2">
                Sky Right Now
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {transitEntries.map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg border border-white/7"
                  >
                    <span className="text-white/40 text-[10px] uppercase">
                      {planetLabel(key)}
                    </span>
                    <span className="text-[#B8A2F2] text-[11px] font-medium">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Themes */}
          {activeThemes.length > 0 && (
            <div className="mb-6 bg-[#B8A2F2]/5 p-4 rounded-xl border border-[#B8A2F2]/20">
              <h3 className="text-[#B8A2F2] text-[11px] uppercase tracking-wider mb-3">
                Active Themes
              </h3>
              <div className="flex flex-col gap-2">
                {activeThemes.map((theme, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#B8A2F2] mt-2 shrink-0" />
                    <span className="text-white/70 text-[12px] font-[250] leading-relaxed capitalize">
                      {theme}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Major Aspects */}
          {majorAspects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[#FFFFFF] text-[11px] uppercase tracking-wider mb-3 border-b border-white/10 pb-2">
                Major Aspects
              </h3>
              <div className="space-y-2">
                {majorAspects.map((asp: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-lg border border-white/7 text-[11px]"
                  >
                    <span className="text-white/80">
                      {asp.transit_planet}{" "}
                      <span className="text-white/40">→</span>{" "}
                      {asp.natal_point}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#B8A2F2] capitalize">
                        {asp.aspect}
                      </span>
                      <span className="text-white/30 text-[10px]">
                        {asp.orb}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Climate */}
          {climateParagraphs.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#B8A2F2] font-semibold mb-3 text-[15px]">
                Current Climate
              </h2>
              <div className="space-y-3 text-left">
                {climateParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-white/80 text-[14px] leading-relaxed font-[250]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* What Is Being Activated */}
          {whatIsBeingActivated.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#B8A2F2] font-semibold mb-3 text-[15px]">
                What Is Being Activated
              </h2>
              <ul className="space-y-3">
                {whatIsBeingActivated.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8A2F2] mt-2 shrink-0" />
                    <span className="text-white/80 text-[14px] font-[250] leading-relaxed text-left">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Supportive Openings + Tensions */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            {supportiveOpenings.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[#8CF2BC] text-[12px] font-semibold mb-3 uppercase tracking-wide">
                  Supportive Openings
                </h3>
                <ul className="space-y-2">
                  {supportiveOpenings.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#8CF2BC] text-[14px]">•</span>
                      <span className="text-white/80 text-[13px] font-[250] leading-snug text-left">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tensionsToWatch.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[#F2C98C] text-[12px] font-semibold mb-3 uppercase tracking-wide">
                  Tensions To Watch
                </h3>
                <ul className="space-y-2">
                  {tensionsToWatch.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#F2C98C] text-[14px]">•</span>
                      <span className="text-white/80 text-[13px] font-[250] leading-snug text-left">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Timing Insight */}
          {timingInsight && (
            <div className="mb-6">
              <h2 className="text-[#B8A2F2] font-semibold mb-3 text-[15px]">
                Timing Insight
              </h2>
              <div className="border-l-2 border-[#B8A2F2]/40 pl-4">
                <p className="text-white/80 text-[14px] leading-relaxed font-[250]">
                  {timingInsight}
                </p>
              </div>
            </div>
          )}

          {/* Try This */}
          {tryThis.length > 0 && (
            <div className="mb-6 bg-[#8CF2BC]/5 p-5 rounded-xl border border-[#8CF2BC]/20">
              <h2 className="text-[#8CF2BC] font-[500] text-[15px] mb-3 uppercase tracking-wider">
                Try This
              </h2>
              <ul className="space-y-3">
                {tryThis.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#8CF2BC]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#8CF2BC] text-[10px] font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-white/90 text-[14px] font-[250] leading-relaxed text-left">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Avoid This */}
          {avoidThis.length > 0 && (
            <div className="mb-12 bg-[#F28C8C]/5 p-5 rounded-xl border border-[#F28C8C]/20">
              <h2 className="text-[#F28C8C] font-[500] text-[15px] mb-3 uppercase tracking-wider">
                Avoid This
              </h2>
              <ul className="space-y-3">
                {avoidThis.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F28C8C] mt-2 shrink-0" />
                    <span className="text-white/90 text-[14px] font-[250] leading-relaxed text-left">
                      {a}
                    </span>
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
