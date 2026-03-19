import React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";

interface InnerChildResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function InnerChildResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: InnerChildResultProps) {
  const router = useRouter();

  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};
  const scores = extracted.scores || {};

  const coreTraits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "nurturer", label: "Self-Nurturer", color: "#F2D08C" },
    { key: "avoidant", label: "Avoidant Protector", color: "#BA8CF2" },
    { key: "critic", label: "Inner Critic", color: "#F28C8C" },
    { key: "support", label: "Support Seeker", color: "#8CCBF2" },
    { key: "awareness", label: "Self-Aware Observer", color: "#8CF2BC" },
    { key: "integrator", label: "Healing Integrator", color: "#F2BC8C" },
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
            Inner Child Dialogue
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-4">
            Your Result
          </h2>

          {extracted.healing_score !== undefined && (
            <div className="mb-8 bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-[10px] text-white/40 uppercase mb-1">
                Healing Score
              </span>
              <span className="text-[32px] text-[#F2D08C] font-bold">
                {extracted.healing_score}%
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#F2D08C]"
                  style={{ width: `${extracted.healing_score}%` }}
                />
              </div>
            </div>
          )}

          <div className="mb-8 space-y-4">
            <h3 className="text-[#FFFFFF] text-[11px] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Dialogue Dynamics
            </h3>
            {dimensions.map((dim) => (
              <div key={dim.key} className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/60">{dim.label}</span>
                  <span style={{ color: dim.color }} className="font-medium">
                    {scores[dim.key] ?? 0}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${scores[dim.key] ?? 0}%`,
                      backgroundColor: dim.color,
                      boxShadow: `0 0 10px ${dim.color}40`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {data.summary && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-semibold mb-3 mt-4 text-[15px]">
                Overview
              </h2>
              <div className="space-y-4 text-left">
                {data.summary.split("\n\n").map((para: string, i: number) => (
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

          {coreTraits.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-semibold mb-3 text-[15px]">
                Core Traits
              </h2>
              <ul className="space-y-3">
                {coreTraits.map((trait: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2D08C] mt-2 shrink-0" />
                    <span className="text-white/80 text-[14px] font-[250] leading-relaxed text-left">
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 mb-8">
            {strengths.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[#8CF2BC] text-[12px] font-semibold mb-3 uppercase tracking-wide">
                  Strengths
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
                  Challenges
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
              <h2 className="text-[#F2D08C] font-semibold mb-3 mt-4 text-[15px]">
                Your Healing Blueprint
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
            <div className="mb-6 bg-[#8CF2BC]/5 p-5 rounded-xl border border-[#8CF2BC]/20">
              <h2 className="text-[#8CF2BC] font-[500] text-[15px] mb-3 uppercase tracking-wider">
                Self-Healing Practices
              </h2>
              <ul className="space-y-3">
                {tryThis.map((t: string, i: number) => (
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

          {avoidThis.length > 0 && (
            <div className="mb-12 bg-[#F28C8C]/5 p-5 rounded-xl border border-[#F28C8C]/20">
              <h2 className="text-[#F28C8C] font-[500] text-[15px] mb-3 uppercase tracking-wider">
                Emotional Traps to Avoid
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
