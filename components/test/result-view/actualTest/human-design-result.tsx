"use client";

import React from "react";
import { TestResultResponse } from "@/lib/api-client";
import AppBar from "@/components/navigation/appBar";
import { BluePrint } from "../../components/Blueprint";
import { SpiritualInsight } from "../../components/SpiritualInsight";
import { CoreTraits } from "../../components/CoreTraits";
import { Strength } from "../../components/Strength";
import { Challenge } from "../../components/Challenge";
import { TryThis } from "../../components/TryThis";
import { AvoidThis } from "../../components/AvoidThis";
import { Personality } from "../../components/Personality";
import { PersonalityTraits } from "../../components/PersonalityTraits";
interface HumanDesignResultProps {
  result: TestResultResponse;
  onClose: () => void;
  onLogout: () => void;
}

export function HumanDesignResult({
  result,
  onLogout,
  onClose,
}: HumanDesignResultProps) {
  const data = result.llm_result_json || {};
  const extracted = (result.extracted_json as any) || {};
  const personalityTraits: string[] = Array.isArray(data.personalityConscious)
    ? data.personalityConscious
    : Array.from(
        new Set(
          (Array.isArray(extracted.personality_traits)
            ? extracted.personality_traits
            : []
          ).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)),
        ),
      );

  const designTraits: string[] = Array.isArray(data.designUnconscious)
    ? data.designUnconscious
    : Array.from(
        new Set(
          (Array.isArray(extracted.design_traits)
            ? extracted.design_traits
            : []
          ).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)),
        ),
      );

  const traits = Array.isArray(data.coreTraits) ? data.coreTraits : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const challenges = Array.isArray(data.challenges) ? data.challenges : [];
  const tryThis = Array.isArray(data.tryThis) ? data.tryThis : [];
  const avoidThis = Array.isArray(data.avoidThis) ? data.avoidThis : [];

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-2 w-full">
      <AppBar
        handleBack={onClose}
        handleLogout={onLogout}
      />

      <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto w-full">
        <h1
          style={{ lineHeight: "33px", fontFamily: "var(--font-gotham)" }}
          className="text-[20px] font-[350] text-[#FFFFFF] mb-[10px] text-center"
        >
          Your Human Design
        </h1>

        <div className="flex flex-col items-center mb-[40px]">
          <h2 className="text-[16px] font-[325] px-2 text-[#F2D08C] uppercase border border-[#F2D08C] rounded-[5px]">
            {data?.title?.replace("The ", "")}
          </h2>
          {/* <p className="text-[#D9D9D9] text-[11px] font-[300] pt-[8px]">
            Balance between your energy modes is currently low
          </p> */}
        </div>

        <Personality extracted={extracted} />

        <BluePrint title="" blueprint={data?.summary} />

        <PersonalityTraits
          personality={personalityTraits}
          design={designTraits}
        />

        <SpiritualInsight
          spiritualInsight={data.consciousVsUnconscious}
          title="Conscious vs Unconscious"
        />

        <CoreTraits coreTraits={traits} />

        <Strength strengths={strengths} />

        <Challenge challenges={challenges} />

        <BluePrint
          title="Energy Architecture"
          blueprint={data.energyBlueprint}
        />

        <SpiritualInsight
          title="Decision Guidance"
          spiritualInsight={data.decisionGuidance}
        />

        <TryThis tryThis={tryThis} />

        <AvoidThis avoidThis={avoidThis} />
      </div>
    </div>
  );
}
