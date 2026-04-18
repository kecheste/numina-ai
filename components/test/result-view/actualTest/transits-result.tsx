import React from "react";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { BluePrint } from "../../components/Blueprint";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { AvoidThis } from "../../components/AvoidThis";
import { TryThis } from "../../components/TryThis";
interface TransitsResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
}

export function TransitsResult({
  result,
  onClose,
  onLogout,
}: TransitsResultProps) {
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
  const avoidThis: string[] = Array.isArray(data.avoidThis)
    ? data.avoidThis
    : [];
  const spiritualInsight: string = data.spiritualInsight || "";

  const natal = extracted.natal || {};
  const currentTransits = extracted.current_transits || {};

  const transitEntries = Object.entries(currentTransits) as [string, string][];

  const planetLabel = (key: string) =>
    key.replace("_sign", "").replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2 w-full">
      <AppBar handleBack={onClose} handleLogout={onLogout} />

      <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto w-full">
        <h1
          style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
          className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
        >
          Your Transits
        </h1>

        <div className="flex flex-col items-center mb-[40px]">
          <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
            {data?.title?.replace("The ", "")}
          </h2>
        </div>

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

        <BluePrint title="Phase Description" blueprint={phaseDescription} />

        <SpiritualInsight spiritualInsight={spiritualInsight} />

        <Strength strengths={currentPatterns} />

        <Challenge challenges={challenges} />

        <TryThis tryThis={tryThis} />

        <AvoidThis avoidThis={avoidThis} />
      </div>
    </div>
  );
}
