import React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";

interface BigFiveResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

export function BigFiveResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: BigFiveResultProps) {
  const router = useRouter();

  const data = (result.llm_result_json as any) || {};
  const scores = (result.extracted_json as any) || {};

  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "openness", label: "Openness", color: "#F2D08C" },
    { key: "conscientiousness", label: "Conscientiousness", color: "#8CF2BC" },
    { key: "extraversion", label: "Extraversion", color: "#8CCBF2" },
    { key: "agreeableness", label: "Agreeableness", color: "#BA8CF2" },
    { key: "neuroticism", label: "Neuroticism", color: "#F28C8C" },
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
            Big Five Personality
          </h1>
          <h2 className="text-[13px] font-[300] text-[#F2D08C] mb-4">
            {data.title || "The Big Five Explorer"}
          </h2>

          <p className="text-white/80 text-[13px] mb-8 font-[250] leading-relaxed">
            {data.shortDescription}
          </p>

          <div className="mb-8 space-y-4">
            <h3 className="text-[#FFFFFF] text-[11px] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Dimension Profile
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

          {traits.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#FFFFFF] font-[300] text-[13px] mb-2 uppercase tracking-wider">
                Core Traits
              </h2>
              <ul className="space-y-1 text-[13px] text-left text-white/80 flex flex-wrap gap-1">
                {traits.map((t: string, i: number) => (
                  <li
                    className="border border-[#FFFFFF]/30 text-[#F2D08C] rounded-md px-2 py-0.5 bg-white/5"
                    style={{ lineHeight: "18px" }}
                    key={i}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {strengths.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F2D08C] font-[500] text-[14px] mb-2">
                Key Strengths
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
                {strengths.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {challenges.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#F28C8C] font-[500] text-[14px] mb-2">
                Discovery Areas
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
                {challenges.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {data.yourBlueprint && (
            <div className="mb-8">
              <h2 className="text-[#F2D08C] font-semibold mb-3 mt-4 text-[15px]">
                Your Psychological Blueprint
              </h2>
              <div className="space-y-4 text-left">
                {data.summary.split("\n\n").map((para: string, i: number) => (
                  <p
                    key={i}
                    className="text-white/80 text-[13px] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {tryThis.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[#008049] font-[500] text-[14px] mb-2">
                Try This
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
                {tryThis.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {avoidThis.length > 0 && (
            <div className="mb-12">
              <h2 className="text-[#F28C8C] font-[500] text-[14px] mb-2">
                Avoid This
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-white/80 text-[13px] text-left">
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
