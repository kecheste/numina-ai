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
  const shellRef = useRef<HTMLDivElement>(null);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
        <div
          ref={shellRef}
          className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
        >
          <ChakraBlueprintResult
            onClose={handleChakraBlueprintNext}
            shellRef={shellRef}
            strongestChakra={chakraResult.llm_result_json?.strongestChakra ?? null}
            needsBalance={chakraResult.llm_result_json?.needsRebalancing ?? null}
          />
        </div>
      </div>
    );
  }

  if (step === "mbti_intro") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
        <div
          ref={shellRef}
          className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col justify-center"
        >
          <MBTITypeOnboardingTestIntro onClose={handleMbtiIntroNext} />
        </div>
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
        <div
          ref={shellRef}
          className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
        >
          <MbtiBlueprintResult
            onClose={handleMbtiBlueprintNext}
            shellRef={shellRef}
            resultData={mbtiData}
          />
        </div>
      </div>
    );
  }

  if (step === "astrology_blueprint") {
    return (
      <div className="fixed inset-0 z-50">
        <AstrologyBlueprintResult
          onClose={handleAstrologyNext}
          shellRef={shellRef}
          content={astrologyContent}
        />
      </div>
    );
  }

  if (step === "numerology_blueprint") {
    return (
      <div className="fixed inset-0 z-50">
        <NumerologyBlueprintResult
          onClose={handleNumerologyNext}
          shellRef={shellRef}
          content={numerologyContent}
        />
      </div>
    );
  }

  return null;
}
