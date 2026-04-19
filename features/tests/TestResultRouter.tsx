import React, { RefObject } from "react";
import { TestResultResponse } from "@/lib/api-client";
import { resultRegistry } from "./resultRegistry";
import { TestResultView } from "@/components/test/test-result-view";

export type TestResultRouterProps = {
  testId: number;
  testTitle: string;
  category: string;
  result: TestResultResponse;
  onBack: () => void;
  onRetake?: () => void;
  shellRef: RefObject<HTMLDivElement | null>;
  onboardingNext?: () => void;
  onLogout?: () => void;
};

export function TestResultRouter({
  testId,
  testTitle,
  category,
  result,
  onBack,
  onRetake,
  shellRef,
  onLogout,
}: TestResultRouterProps) {
  const CustomScreen = resultRegistry[testId];
  if (CustomScreen) {
    return (
      <CustomScreen
        result={result}
        onBack={onBack}
        onRetake={onRetake}
        shellRef={shellRef}
        testTitle={testTitle}
        onLogout={onLogout}
      />
    );
  }

  return (
    <TestResultView
      testId={testId}
      testTitle={testTitle}
      category={category}
      onBack={onBack}
      onRetake={onRetake}
      result={result}
    />
  );
}
