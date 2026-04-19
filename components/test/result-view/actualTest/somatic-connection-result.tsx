import React from "react";
import AppBar from "@/components/navigation/appBar";
import { type TestResultResponse } from "@/lib/api-client";
import { DimensionScores } from "../../components/DimensionScores";
import { BluePrint } from "../../components/Blueprint";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { Button } from "../../../ui/button";
import { RetakeIcon } from "@/components/icons/retake";
interface SomaticConnectionResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onRetake?: () => void;
  onLogout?: () => void;
}

export function SomaticConnectionResult({
  result,
  onClose,
  onRetake,
  onLogout,
}: SomaticConnectionResultProps) {
  const data = (result.llm_result_json as any) || {};
  const extracted = (result.extracted_json as any) || {};
  const scores = extracted.scores || {};

  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  const dimensions = [
    { key: "listener", label: "Somatic Listener" },
    { key: "regulator", label: "Integrated Regulator" },
    { key: "carrier", label: "Emotional Carrier" },
    { key: "ignorer", label: "Body Ignorer" },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2">
      <AppBar
        handleBack={onClose}
        handleLogout={onLogout}
      />

      <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto w-full">
        <h1
          style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
          className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
        >
          Your Somatic Connection
        </h1>

        <div className="flex flex-col items-center mb-[40px]">
          <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
            {data?.title?.replace("The ", "")}
          </h2>
          <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px]">
            {data?.oneSentenceInsight || "Your mind-body link is present but not fully integrated yet"}
          </p>
        </div>

        <DimensionScores
          title="Somatic Dimensions"
          dimensions={dimensions}
          scores={scores}
        />

        <BluePrint title="Emotional Archive" blueprint={data?.overview} />

        <Strength strengths={strengths} />

        <Challenge challenges={challenges} />

        <BluePrint title="Body Awareness" blueprint={data?.energyBlueprint} />

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
