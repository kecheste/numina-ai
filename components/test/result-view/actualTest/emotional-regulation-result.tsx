import React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";

interface EmotionalRegulationResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function EmotionalRegulationResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: EmotionalRegulationResultProps) {
  const router = useRouter();

  const data = (result.llm_result_json as any) || {};
  const scores = (result.extracted_json?.scores as any) || {};

  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "containment", label: "Quiet Containment", color: "#F2D08C" },
    { key: "reflective", label: "Reflective Processor", color: "#BA8CF2" },
    { key: "expressive", label: "Expressive Releaser", color: "#8CCBF2" },
    { key: "adaptive", label: "Adaptive Regulator", color: "#8CF2BC" },
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
            Your Emotional Regulation
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-4">
            {data.title || "Your Profile"}
          </h2>

          <div className="mb-8 space-y-4">
            <h3 className="text-[#FFFFFF] text-[11px] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Regulation Dynamics
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

          {data.overview && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-semibold mb-3 mt-4 text-[15px]">
                Overview
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

          {strengths.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[500] text-[15px] mb-2">
                Strengths
              </h2>
              <div className="text-white/80 text-[14px] font-[250] flex flex-wrap gap-1">
                {strengths.map((s: string, i: number) => (
                  <p
                    key={i}
                    style={{
                      lineHeight: "17px",
                    }}
                    className="px-2 border rounded-md border-[#FFFFFF]/50"
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>
          )}

          {challenges.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F28C8C] font-[500] text-[15px] mb-2">
                Challenges
              </h2>
              <div className="text-white/80 text-[14px] font-[250] flex flex-wrap gap-1">
                {challenges.map((c: string, i: number) => (
                  <p
                    key={i}
                    style={{
                      lineHeight: "17px",
                    }}
                    className="px-2 border rounded-md border-[#F2D08C]/50"
                  >
                    {c}
                  </p>
                ))}
              </div>
            </div>
          )}

          {data.summary && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-semibold mb-3 mt-4 text-[15px]">
                Your Emotional Pattern
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

          {tryThis.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#8CF2BC] font-[500] text-[15px] mb-2">
                Try This
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-white/80 text-[14px] font-[250] text-left">
                {tryThis.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {avoidThis.length > 0 && (
            <div className="mb-12">
              <h2 className="text-[#F28C8C] font-[500] text-[15px] mb-2">
                Avoid This
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-white/80 text-[14px] font-[250] text-left">
                {avoidThis.map((a: string, i: number) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
