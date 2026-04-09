import React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";

interface SomaticConnectionResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function SomaticConnectionResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: SomaticConnectionResultProps) {
  const router = useRouter();

  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};
  const scores = extracted.scores || {};

  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "listener", label: "Somatic Listener", color: "#8CF2BC" },
    { key: "regulator", label: "Integrated Regulator", color: "#BA8CF2" },
    { key: "carrier", label: "Emotional Carrier", color: "#F2BC8C" },
    { key: "ignorer", label: "Body Ignorer", color: "#F28C8C" },
  ];

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
          <h1 className="text-[21px] font-[500] text-[#FFFFFF] mb-1">
            Somatic Connection
          </h1>
          <h2 className="text-[13px] font-[300] text-[#8CF2BC] mb-4">
            Your Result
          </h2>

          {extracted.somatic_score !== undefined && (
            <div className="mb-8 bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-[10px] text-white/40 uppercase mb-1">
                Somatic Awareness Score
              </span>
              <span className="text-[32px] text-[#8CF2BC] font-bold">
                {extracted.somatic_score}%
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#8CF2BC]"
                  style={{ width: `${extracted.somatic_score}%` }}
                />
              </div>
              <p className="text-[10px] text-white/30 mt-2 text-center">
                Strength of your mind-body emotional link
              </p>
            </div>
          )}

          <DimensionScores
            title="Somatic Dimensions"
            dimensions={dimensions}
            scores={scores}
          />

          {data.overview && (
            <div className="mb-8">
              <h2 className="text-[#8CF2BC] font-semibold mb-3 mt-4 text-[15px]">
                Emotional Archive
              </h2>
              <div className="space-y-4 text-left">
                {data.overview.split("\n\n").map((para: string, i: number) => (
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

          <div className="grid grid-cols-1 gap-4 mb-8">
            {strengths.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[#8CF2BC] text-[12px] font-semibold mb-3 uppercase tracking-wide">
                  Somatic Strengths
                </h3>
                <ul className="space-y-2">
                  {strengths.map((s: string, i: number) => (
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

            {challenges.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[#F28C8C] text-[12px] font-semibold mb-3 uppercase tracking-wide">
                  Body Disconnection Pitfalls
                </h3>
                <ul className="space-y-2">
                  {challenges.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#F28C8C] text-[14px]">•</span>
                      <span className="text-white/80 text-[13px] font-[250] leading-snug text-left">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {data.energyBlueprint && (
            <div className="mb-8">
              <h2 className="text-[#8CF2BC] font-semibold mb-3 mt-4 text-[15px]">
                Your Body Awareness
              </h2>
              <div className="space-y-4 text-left border-l border-white/10 pl-4">
                {data.energyBlueprint
                  .split("\n\n")
                  .map((para: string, i: number) => (
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

          {tryThis.length > 0 && (
            <div className="mb-6 bg-[#BA8CF2]/5 p-5 rounded-xl border border-[#BA8CF2]/20">
              <h2 className="text-[#BA8CF2] font-[500] text-[15px] mb-3 uppercase tracking-wider">
                Embodied Practices
              </h2>
              <ul className="space-y-3">
                {tryThis.map((t: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#BA8CF2]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#BA8CF2] text-[10px] font-bold">
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

          {avoidThis.length > 0 && (
            <div className="mb-12 bg-[#F28C8C]/5 p-5 rounded-xl border border-[#F28C8C]/20">
              <h2 className="text-[#F28C8C] font-[500] text-[15px] mb-3 uppercase tracking-wider">
                Disconnection Habits
              </h2>
              <ul className="space-y-3">
                {avoidThis.map((a: string, i: number) => (
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
