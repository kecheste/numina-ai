"use client";

import { useRef } from "react";
import { CHAKRA_COLORS } from "@/lib/constants/keys";
import AppBar from "@/components/navigation/appBar";
import { TestResultResponse } from "@/lib/api-client";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { BluePrint } from "../../components/Blueprint";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { Button } from "../../../ui/button";
import { RetakeIcon } from "@/components/icons/retake";
export interface ChakraAlignmentChakra {
  id: string;
  name: string;
  status: string;
  description: string;
  tryItems?: string | null;
  avoidItems?: string | null;
}

const EnergyCard = ({ chakra }: { chakra: ChakraAlignmentChakra }) => {
  const color = CHAKRA_COLORS[chakra.id] ?? "#F2D08C";
  const isImbalanced = chakra.status !== "Balanced" && chakra.status !== "Open";

  return (
    <div
      className="flex gap-4 w-full mb-[5px] group"
      style={{ fontFamily: "var(--font-gotham)" }}
    >
      <div className="flex flex-col flex-1 text-left">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-[15px] font-[350] text-[#FFFFFF]">
            {chakra.name}
          </h4>
          <span
            className="text-[13px] font-[325] uppercase px-2 py-0.5"
            style={{
              color: "#F2D08C",
              fontFamily: "var(--font-gotham)",
            }}
          >
            {chakra.status}
          </span>
        </div>

        <div
          className="flex flex-col text-left pl-[8px]"
          style={{
            borderLeft: `1px solid ${color}`,
          }}
        >
          <p className="text-[13px] font-[350px] text-[#FFFFFF] mb-[10px]">
            {chakra.description}
          </p>

          {isImbalanced && (chakra.tryItems || chakra.avoidItems) && (
            <div className="flex flex-col gap-4">
              {chakra.tryItems && (
                <div className="flex flex-col gap-0.5">
                  <span
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[15px] font-[350] text-[#FFFFFF] mb-[8px]"
                  >
                    Daily focus
                  </span>
                  <p
                    style={{ fontFamily: "var(--font-gotham)" }}
                    className="text-[13px] font-[350] text-[#D9D9D9] border-l border-[#D9D9D9] pl-2"
                  >
                    {chakra.tryItems}
                  </p>
                </div>
              )}
              {chakra.avoidItems && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-[350] text-[#FFFFFF] mb-[8px]">
                    Notice this habit
                  </span>
                  <p className="text-[13px] font-[350] text-[#D9D9D9] border-l border-[#D9D9D9] pl-2">
                    "{chakra.avoidItems}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function normalizeChakras(raw: unknown): ChakraAlignmentChakra[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  const ids = [
    "root",
    "sacral",
    "solarPlexus",
    "heart",
    "throat",
    "thirdEye",
    "crown",
  ];
  const names = [
    "Root",
    "Sacral",
    "Solar Plexus",
    "Heart",
    "Throat",
    "Third Eye",
    "Crown",
  ];

  return ids.map((id, i) => {
    const c = raw.find((item: any) =>
      item?.id?.toLowerCase().includes(id.toLowerCase()),
    );
    return {
      id,
      name: (c as any)?.name || `${names[i]} Chakra`,
      status: (c as any)?.status || "Balanced",
      description:
        (c as any)?.description ||
        "Your energy is flowing normally through this center.",
      tryItems: (c as any)?.tryItems || null,
      avoidItems: (c as any)?.avoidItems || null,
    };
  });
}

const ensureArray = (val: any) =>
  Array.isArray(val) ? val.filter(Boolean) : [];

export function ChakraAlignmentResult({
  onBack,
  onRetake,
  content,
}: {
  onBack: () => void;
  onRetake?: () => void;
  content?: TestResultResponse | null;
}) {
  const llm = content?.llm_result_json ?? {};

  const strongestChakra = llm.strongestChakra;
  const needsRebalancing = llm.needsRebalancing;
  const statusSummary = llm.statusSummary || "";
  const chakras = normalizeChakras(llm.chakras);
  const narrative = llm.summary || "";

  const strengths = ensureArray(llm.strengths);
  const challenges = ensureArray(llm.challenges);
  const coreTraits = ensureArray(llm.coreTraits);
  const tryThis = ensureArray(llm.tryThis);
  const avoidThis = ensureArray(llm.avoidThis);

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2">
      <AppBar
        handleBack={onBack}
        handleLogout={() => {}}
      />

      <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto w-full">
        <h1
          style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
          className="text-[20px] font-[350] text-[#FFFFFF] mb-[50px] text-center"
        >
          Your Chakra Alignment Scan
        </h1>

        <SpiritualInsight
          title="Primary Strength"
          spiritualInsight={strongestChakra}
        />
        <SpiritualInsight
          title="Growth Priority"
          spiritualInsight={needsRebalancing}
        />

        <BluePrint title="" blueprint={statusSummary} />

        <h3
          style={{ fontFamily: "var(--font-gotham)" }}
          className="text-[14px] font-[400] text-[#FFFFFF] mb-[40px] text-left"
        >
          Individual Centers
        </h3>

        <div className="flex flex-col gap-[30px] mb-[40px]">
          {chakras.map((chakra) => (
            <EnergyCard key={chakra.id} chakra={chakra} />
          ))}
        </div>

        <BluePrint title="Energy Patterns" blueprint={narrative} />

        <CoreTraits coreTraits={coreTraits} />

        <Strength strengths={strengths} />

        <Challenge challenges={challenges} />

        <TryThis tryThis={tryThis} />

        <AvoidThis avoidThis={avoidThis} />

        <Button
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          onClick={onRetake}
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-[12px]
            sm:gap-[20px]
            w-full
            h-[60px]
            sm:h-[67px]
            bg-[#F2D08CE0]
            hover:bg-[#F2D08CC0]
            cursor-pointer
            text-black
            rounded-[10px]
            text-[18px]
            sm:text-[18px]
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <div><RetakeIcon /></div>
          <span>Retake this module</span>
        </Button>
      </div>
    </div>
  );
}
