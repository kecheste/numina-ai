"use client";

import { ChakraAlignmentResult } from "./result-view";

/** @deprecated Use ChakraAlignmentResult from @/components/test/result-view */
export function TestResultChakraView({
  testTitle,
  onBack,
}: {
  testTitle: string;
  onBack: () => void;
}) {
  return <ChakraAlignmentResult testTitle={testTitle} onBack={onBack} />;
}
