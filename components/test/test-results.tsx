"use client";

import { useRef } from "react";
import {
  CognitiveStyleResult,
  MbtiTypeResult,
  ChakraPreviewResult,
  type MbtiResultData,
} from "./result-view";

export const TEST_IDS = {
  ASTROLOGY_CHART: 1,
  NUMEROLOGY: 2,
  STARSEED_ORIGINS: 3,
  MBTI_TYPE: 7,
  COGNITIVE_STYLE: 11,
  CHAKRA_ASSESSMENT: 13,
} as const;

export interface TestResultsResultData {
  personalityType: string;
  insights: string[];
  recommendations: string[];
  score: number;
  narrative?: string | null;
  strongestChakra?: string | null;
  needsBalance?: string | null;
  extracted_json?: any | null;
}

interface TestResultsProps {
  testId: number;
  testTitle: string;
  category: string;
  onClose: () => void;
  resultData?: TestResultsResultData | null;
}

export function TestResults({
  testId,
  testTitle: _testTitle,
  category: _category,
  onClose,
  resultData,
}: TestResultsProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
      >
        {testId === TEST_IDS.COGNITIVE_STYLE && (
          <CognitiveStyleResult onClose={onClose} />
        )}

        {testId === TEST_IDS.MBTI_TYPE && (
          <MbtiTypeResult
            onClose={onClose}
            shellRef={shellRef}
            resultData={resultData as MbtiResultData | undefined}
          />
        )}

        {testId === TEST_IDS.CHAKRA_ASSESSMENT && (
          <ChakraPreviewResult
            onClose={onClose}
            shellRef={shellRef}
            strongestChakra={resultData?.strongestChakra}
            needsBalance={resultData?.needsBalance}
          />
        )}

        {testId !== TEST_IDS.COGNITIVE_STYLE &&
          testId !== TEST_IDS.MBTI_TYPE &&
          testId !== TEST_IDS.ASTROLOGY_CHART &&
          testId !== TEST_IDS.CHAKRA_ASSESSMENT && (
            <CognitiveStyleResult onClose={onClose} />
          )}
      </div>
    </div>
  );
}
