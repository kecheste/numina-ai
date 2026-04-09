import React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";

interface PastLifeVibesResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

const ARCHETYPE_DIMENSIONS = [
  { key: "healer", label: "Ancient Healer", color: "#F2D08C" },
  { key: "scholar", label: "Wisdom Scholar", color: "#BA8CF2" },
  { key: "warrior", label: "Guardian Warrior", color: "#F28C8C" },
  { key: "mystic", label: "Mystic Seer", color: "#8CCBF2" },
  { key: "explorer", label: "Soul Explorer", color: "#8CF2BC" },
  { key: "builder", label: "Sacred Builder", color: "#F2BC8C" },
];

function parseParas(val: unknown): string[] {
  if (typeof val === "string") return val.split("\n\n").filter(Boolean);
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  return [];
}

export function PastLifeVibesResult({
  result,
  onClose,
  onLogout,
  shellRef,
}: PastLifeVibesResultProps) {
  const router = useRouter();

  const data = (result.llm_result_json as Record<string, any>) || {};
  const extracted = (result.extracted_json as Record<string, any>) || {};
  const scores = extracted.scores || {};

  const archetypeEchoes: string[] = Array.isArray(data.archetypeEchoes)
    ? data.archetypeEchoes
    : [];
  const ancientGifts: string[] = Array.isArray(data.ancientGifts)
    ? data.ancientGifts
    : [];
  const karmicShadows: string[] = Array.isArray(data.karmicShadows)
    ? data.karmicShadows
    : [];
  const tryThis: string[] = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis: string[] = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const soulNarrativeParas = parseParas(data.soulNarrative);
  const pastLifeEchoesParas = parseParas(data.pastLifeEchoes);

  const accentColor = "#8CCBF2";

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
          <h1 className="text-[21px] font-[500] text-white mb-1">Past Life Vibes</h1>
          <h2 className="text-[13px] font-[300] mb-4" style={{ color: accentColor }}>
            {data.title || "Archetypal Insight Report"}
          </h2>

          {/* Resonance Score */}
          {extracted.resonance_score !== undefined && (
            <div
              className="mb-8 p-4 rounded-2xl border flex items-center gap-4"
              style={{ borderColor: accentColor + "44", background: accentColor + "11" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{ background: accentColor + "22", color: accentColor }}
              >
                {extracted.resonance_score}%
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">
                  Archetypal Resonance
                </p>
                <p className="text-white/80 text-[13px] font-[300]">
                  {extracted.primary_type}
                  {extracted.secondary_type && ` · ${extracted.secondary_type}`}
                </p>
              </div>
            </div>
          )}

          {/* Dimension Scores */}
          <DimensionScores
            title="Ancient Archetypes"
            dimensions={ARCHETYPE_DIMENSIONS}
            scores={scores}
          />

          {/* Soul Narrative */}
          {soulNarrativeParas.length > 0 && (
            <div className="mb-8">
              <h2
                className="font-[350] mb-3 text-[13px] uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                Soul Narrative
              </h2>
              <div className="space-y-3">
                {soulNarrativeParas.map((para, i) => (
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

          {/* Archetypal Echoes */}
          {archetypeEchoes.length > 0 && (
            <div className="mb-8">
              <h2
                className="font-[350] mb-3 text-[13px] uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                Archetypal Echoes
              </h2>
              <ul className="space-y-3">
                {archetypeEchoes.map((trait, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="text-white/80 text-[14px] font-[250] leading-relaxed">
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ancient Gifts + Karmic Shadows */}
          <div className="space-y-4 mb-8">
            {ancientGifts.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[#8CF2BC] text-[12px] font-[400] mb-3 uppercase tracking-wide">
                  Ancient Gifts
                </h3>
                <ul className="space-y-2">
                  {ancientGifts.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#8CF2BC] shrink-0 mt-0.5">›</span>
                      <span className="text-white/80 text-[13px] font-[250] leading-snug">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {karmicShadows.length > 0 && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[#F28C8C] text-[12px] font-[400] mb-3 uppercase tracking-wide">
                  Karmic Shadows
                </h3>
                <ul className="space-y-2">
                  {karmicShadows.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#F28C8C] shrink-0 mt-0.5">›</span>
                      <span className="text-white/80 text-[13px] font-[250] leading-snug">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Past Life Echoes */}
          {pastLifeEchoesParas.length > 0 && (
            <div className="mb-8">
              <h2
                className="font-[350] mb-3 text-[13px] uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                Past Life Echoes
              </h2>
              <div className="space-y-3 border-l-2 pl-4" style={{ borderColor: accentColor + "30" }}>
                {pastLifeEchoesParas.map((para, i) => (
                  <p
                    key={i}
                    className="text-white/80 text-[14px] leading-relaxed font-[250] italic"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Resonance Practices */}
          {tryThis.length > 0 && (
            <div className="mb-6 bg-[#8CF2BC]/5 p-5 rounded-xl border border-[#8CF2BC]/20">
              <h2 className="text-[#8CF2BC] font-[400] text-[13px] mb-3 uppercase tracking-wider">
                Resonance Practices
              </h2>
              <ul className="space-y-3">
                {tryThis.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#8CF2BC]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#8CF2BC] text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <span className="text-white/90 text-[13px] font-[250] leading-relaxed">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Archetypal Traps */}
          {avoidThis.length > 0 && (
            <div className="mb-12 bg-[#F28C8C]/5 p-5 rounded-xl border border-[#F28C8C]/20">
              <h2 className="text-[#F28C8C] font-[400] text-[13px] mb-3 uppercase tracking-wider">
                Archetypal Traps
              </h2>
              <ul className="space-y-3">
                {avoidThis.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#F28C8C] shrink-0 mt-0.5">✕</span>
                    <span className="text-white/90 text-[13px] font-[250] leading-relaxed">
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
