"use client";

import { useRef } from "react";
import { useOnboarding } from "@/hooks/useOnboarding";
import { TestFlow } from "@/components/test/test-flow";
import {
  ChakraBlueprintResult,
  MbtiBlueprintResult,
  AstrologyBlueprintResult,
  NumerologyBlueprintResult,
} from "@/components/test/result-view/blueprint";
import { MBTITypeOnboardingTestIntro } from "@/components/test/result-view/onboarding-mbti-intro";
import AIPreparing from "@/components/custom/AIPreparing";
import type { MbtiResultData } from "@/components/test/result-view/blueprint/mbti-blueprint-result";

export default function OnboardingFlowPage() {
  const {
    step,
    chakraResult,
    mbtiResult,
    astrologyContent,
    numerologyContent,
    handleChakraComplete,
    handleChakraBlueprintNext,
    handleMbtiIntroNext,
    handleMbtiComplete,
    handleMbtiBlueprintNext,
    handleAstrologyNext,
    handleNumerologyNext,
  } = useOnboarding();

  if (step === "chakra_test") {
    return (
      <TestFlow
        testId={13}
        testTitle="Chakra Alignment Scan"
        category="Energy"
        onClose={() => {}}
        onComplete={handleChakraComplete}
        onboardingNext={() => {}}
      />
    );
  }

  if (step === "chakra_blueprint") {
    if (!chakraResult) {
      return <AIPreparing />;
    }
    return (
      <ChakraBlueprintResult
        onClose={handleChakraBlueprintNext}
        strongestChakra={chakraResult.llm_result_json?.strongestChakra ?? null}
        needsBalance={chakraResult.llm_result_json?.needsRebalancing ?? null}
      />
    );
  }

  if (step === "mbti_intro") {
    return (
      <div className="flex flex-col flex-1 justify-center">
        <MBTITypeOnboardingTestIntro onClose={handleMbtiIntroNext} />
      </div>
    );
  }

  if (step === "mbti_test") {
    return (
      <TestFlow
        testId={7}
        testTitle="MBTI Type"
        category="Psychological"
        onClose={() => {}}
        onComplete={handleMbtiComplete}
      />
    );
  }

  if (step === "mbti_blueprint") {
    if (!mbtiResult) {
      return <AIPreparing />;
    }
    const mbtiData: MbtiResultData = {
      personalityType: mbtiResult.personality_type ?? "INFJ – The Advocate",
      insights: Array.isArray(mbtiResult.insights) ? mbtiResult.insights : [],
      recommendations: Array.isArray(mbtiResult.recommendations)
        ? mbtiResult.recommendations
        : [],
      score: 0,
      narrative: mbtiResult.narrative,
      extracted_json: mbtiResult.extracted_json as any,
    };
    return (
      <MbtiBlueprintResult
        onClose={handleMbtiBlueprintNext}
        resultData={mbtiData}
      />
    );
  }

  if (step === "astrology_blueprint") {
    return (
      <AstrologyBlueprintResult
        onClose={handleAstrologyNext}
        content={astrologyContent}
      />
    );
  }

  if (step === "numerology_blueprint") {
    return (
      <NumerologyBlueprintResult
        onClose={handleNumerologyNext}
        content={numerologyContent}
      />
    );
  }

  return null;
}
