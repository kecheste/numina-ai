import React, { RefObject } from "react";
import { TestResultResponse } from "@/lib/api-client";
import {
  AstrologyChartResultView,
  ChakraAlignmentResult,
  LifePathResultView,
  MbtiTypeResult,
  MindMirrorResult,
  NumerologyResultView,
  ShadowWorkResult,
  StarseedOriginResultView,
  EnergyArchetypeResult,
  HumanDesignResult,
  BigFiveResult,
  CoreValuesResult,
  EmotionalRegulationResult,
  InnerChildResult,
  KarmicLessonsResult,
  PastLifeVibesResult,
  SomaticConnectionResult,
  StressBalanceResult,
} from "@/components/test/result-view/actualTest";

export type ResultComponentProps = {
  result: TestResultResponse;
  onBack: () => void;
  shellRef: RefObject<HTMLDivElement | null>;
  testTitle: string;
  onLogout?: () => void;
};

export const resultRegistry: Record<
  number,
  React.ComponentType<ResultComponentProps>
> = {
  1: (props) => (
    <AstrologyChartResultView
      result={props.result}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  2: (props) => (
    <NumerologyResultView
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
      content={props.result ?? undefined}
    />
  ),
  8: (props) => (
    <ShadowWorkResult
      onClose={props.onBack}
      shellRef={props.shellRef}
      content={props.result ?? undefined}
    />
  ),
  3: (props) => (
    <StarseedOriginResultView
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  13: (props) => (
    <ChakraAlignmentResult
      testTitle={props.testTitle}
      onBack={props.onBack}
      content={props.result ?? undefined}
    />
  ),
  7: (props) => (
    <MbtiTypeResult
      result={props.result}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout}
    />
  ),
  19: (props) => (
    <LifePathResultView
      result={props.result}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout}
    />
  ),
  12: (props) => (
    <MindMirrorResult
      {...props}
      onClose={props.onBack}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  14: (props) => (
    <EnergyArchetypeResult
      {...props}
      onClose={props.onBack}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  4: (props) => (
    <HumanDesignResult
      {...props}
      onClose={props.onBack}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  9: (props) => (
    <BigFiveResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  10: (props) => (
    <CoreValuesResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  15: (props) => (
    <EmotionalRegulationResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  16: (props) => (
    <StressBalanceResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  17: (props) => (
    <SomaticConnectionResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  21: (props) => (
    <PastLifeVibesResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  22: (props) => (
    <KarmicLessonsResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
  23: (props) => (
    <InnerChildResult
      {...props}
      onClose={props.onBack}
      shellRef={props.shellRef}
      onLogout={props.onLogout || (() => {})}
    />
  ),
};
