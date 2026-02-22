"use client";

import { StarseedOriginResult } from "./result-view";

/** @deprecated Use StarseedOriginResult from @/components/test/result-view */
export function TestResultStarseedView({
  testTitle,
  onBack,
}: {
  testTitle: string;
  onBack: () => void;
}) {
  return <StarseedOriginResult testTitle={testTitle} onBack={onBack} />;
}
