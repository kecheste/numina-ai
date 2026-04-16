import React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";
import { BluePrint } from "../../components/Blueprint";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { MobileFrame } from "@/components/layout/mobile-frame";

interface PastLifeVibesResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout?: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}

const ARCHETYPE_DIMENSIONS = [
  { key: "healer", label: "Ancient Healer" },
  { key: "scholar", label: "Wisdom Scholar" },
  { key: "warrior", label: "Guardian Warrior" },
  { key: "mystic", label: "Mystic Seer" },
  { key: "explorer", label: "Soul Explorer" },
  { key: "builder", label: "Sacred Builder" },
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

  const tryThis: string[] = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis: string[] = Array.isArray(data.avoidThis)
    ? data.avoidThis
    : [];

  return (
    <div className="fixed inset-0 z-50">
      <MobileFrame
        ref={shellRef}
        scrollable={true}
        className="relative pt-2"
      >
        <AppBar
          handleBack={onClose}
          handleLogout={onLogout}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <h1
            style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
            className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
          >
            Your Past Life Vibes
          </h1>

          <div className="mb-[40px] flex flex-col items-center">
            <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
              {data?.title?.replace("The ", "")}
            </h2>

            <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px] text-center px-4">
              {data?.oneSentenceInsight || "Dominant archetypal resonance"}
            </p>
          </div>

          <DimensionScores
            title="Ancient Archetypes"
            dimensions={ARCHETYPE_DIMENSIONS}
            scores={scores}
          />

          <BluePrint title="Soul Narrative" blueprint={data.soulNarrative} />

          <CoreTraits coreTraits={data.archetypeEchoes} />

          <Strength strengths={data.ancientGifts} />

          <Challenge challenges={data.karmicShadows} />

          <BluePrint title="Past Life Echoes" blueprint={data.pastLifeEchoes} />

          <TryThis tryThis={tryThis} />

          <AvoidThis avoidThis={avoidThis} />
        </div>
      </MobileFrame>
    </div>
  );
}
