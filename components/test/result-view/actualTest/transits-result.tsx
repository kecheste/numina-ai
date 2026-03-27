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

  const phaseDescription: string = data.phaseDescription || "";
  const currentPatterns: string[] = Array.isArray(data.currentPatterns)
    ? data.currentPatterns
    : [];
  const challenges: string[] = Array.isArray(data.challenges)
    ? data.challenges
    : [];
  const tryThis: string[] = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis: string[] = Array.isArray(data.avoidThis) ? data.avoidThis : [];
  const spiritualInsight: string = data.spiritualInsight || "";

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

  const phaseParagraphs = phaseDescription
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
            {data.title || "Your Current Phase"}
          </h1>
          <h2 className="text-[13px] font-[300] text-[#A2F2CD] mb-6 tracking-wide uppercase">
            Active Transit Reading
          </h2>

          {/* Natal Context Pill Row */}
          {(natal.sun_sign || natal.moon_sign || natal.rising_sign) && (
            <div className="mb-6 flex gap-2 flex-wrap">
              {natal.sun_sign && (
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 uppercase tracking-tighter">
                  Sun: {natal.sun_sign}
                </div>
              )}
              {natal.moon_sign && (
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 uppercase tracking-tighter">
                  Moon: {natal.moon_sign}
                </div>
              )}
              {natal.rising_sign && (
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 uppercase tracking-tighter">
                  Asc: {natal.rising_sign}
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
                    <span className="text-[#A2F2CD] text-[11px] font-medium">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phase Description */}
          {phaseParagraphs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#A2F2CD] font-semibold mb-4 text-[16px] uppercase tracking-wider">
                Phase Description
              </h2>
              <div className="space-y-4 text-left">
                {phaseParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-white/80 text-[14px] leading-relaxed font-[300]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Spiritual Insight (Emphasized Box) */}
          {spiritualInsight && (
            <div className="mb-8 bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#A2F2CD]/60" />
              <h3 className="text-[#A2F2CD] text-[10px] uppercase tracking-[0.2em] mb-2 font-bold opacity-60">
                Core Truth
              </h3>
              <p className="text-white text-[15px] font-medium italic leading-relaxed">
                "{spiritualInsight}"
              </p>
            </div>
          )}

          {/* Current Patterns */}
          {currentPatterns.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#A2F2CD] font-semibold mb-3 text-[15px] uppercase tracking-wide">
                Current Patterns
              </h2>
              <ul className="space-y-3">
                {currentPatterns.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A2F2CD] mt-2 shrink-0" />
                    <span className="text-white/80 text-[14px] font-[300] leading-relaxed text-left">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {challenges.length > 0 && (
            <div className="mb-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-[#F2A2A2] font-semibold mb-4 text-[15px] uppercase tracking-wide">
                Challenges
              </h2>
              <ul className="space-y-3">
                {challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#F2A2A2] text-[18px] leading-none shrink-0">•</span>
                    <span className="text-white/70 text-[14px] font-[300] leading-snug text-left">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Try This & Avoid This */}
          <div className="space-y-6 mb-12">
            {tryThis.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#A2F2CD]/5 border border-[#A2F2CD]/20">
                <h2 className="text-[#A2F2CD] font-semibold text-[15px] mb-4 uppercase tracking-wide">
                  Try This
                </h2>
                <ul className="space-y-3">
                  {tryThis.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#A2F2CD]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#A2F2CD] text-[10px] font-bold">
                          {i + 1}
                        </span>
                      </div>
                      <span className="text-white/90 text-[14px] font-[300] leading-relaxed text-left">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {avoidThis.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#F28C8C]/5 border border-[#F28C8C]/20">
                <h2 className="text-[#F28C8C] font-semibold text-[15px] mb-4 uppercase tracking-wide">
                  Avoid This
                </h2>
                <ul className="space-y-3">
                  {avoidThis.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F28C8C] mt-2 shrink-0" />
                      <span className="text-white/90 text-[14px] font-[300] leading-relaxed text-left">
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
    </div>
  );
}
