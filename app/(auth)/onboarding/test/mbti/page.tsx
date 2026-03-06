"use client";

import { useEffect, useRef, useState } from "react";
import { TestFlow } from "@/components/test/test-flow";
import { AstrologyBlueprintResult } from "@/components/test/result-view/astrology-blueprint-result";
import { NumerologyBlueprintResult } from "@/components/test/result-view/numerology-blueprint-result";
import {
  apiEnsureOnboardingLifePath,
  apiFetchOnboardingAstrologyBlueprint,
  apiFetchOnboardingNumerologyBlueprint,
  type AstrologyBlueprintResponse,
  type NumerologyBlueprintItem,
} from "@/lib/api-client";
import { useRouter } from "next/navigation";

type OnboardingStep = 0 | 1 | 2;

export default function OnboardingMbtiTestPage() {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<OnboardingStep>(0);
  const [astrologyContent, setAstrologyContent] = useState<AstrologyBlueprintResponse | null | undefined>(undefined);
  const [numerologyContent, setNumerologyContent] = useState<NumerologyBlueprintItem[] | null | undefined>(undefined);

  useEffect(() => {
    if (step !== 1) return;
    setAstrologyContent(null);
    apiFetchOnboardingAstrologyBlueprint()
      .then(setAstrologyContent)
      .catch(() => {
        setAstrologyContent({
          sun_description: "Your sun sign shapes your core personality and life direction.",
          moon_description: "Your moon sign reveals how you process emotions and seek comfort.",
          rising_description: "Your rising sign reflects how others see you and your outward style.",
          cosmic_traits_summary: "Your cosmic blueprint is unique. Explore more to deepen your understanding.",
        });
      });
  }, [step]);

  useEffect(() => {
    if (step !== 2) return;
    setNumerologyContent(null);
    apiFetchOnboardingNumerologyBlueprint()
      .then((res) => setNumerologyContent(res.items))
      .catch(() => {
        setNumerologyContent([
          { number: "1", title: "Life Path", description: "Your life path number reflects your core purpose." },
          { number: "1", title: "Soul Urge", description: "Your soul urge reveals what your heart truly desires." },
        ]);
      });
  }, [step]);

  const handleFinishOnboarding = () => {
    apiEnsureOnboardingLifePath().catch(() => {});
    router.replace("/home");
  };

  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
        <div
          ref={shellRef}
          className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
        >
          <AstrologyBlueprintResult
            onClose={() => {
              setNumerologyContent(null);
              setStep(2);
            }}
            shellRef={shellRef}
            content={astrologyContent}
          />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
        <div
          ref={shellRef}
          className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
        >
          <NumerologyBlueprintResult
            onClose={handleFinishOnboarding}
            shellRef={shellRef}
            content={numerologyContent}
          />
        </div>
      </div>
    );
  }

  return (
    <TestFlow
      testId={7}
      testTitle="MBTI Type"
      category="Psychological"
      onClose={() => router.replace("/onboarding/test/chakra")}
      onboardingNext={() => {
        setAstrologyContent(null);
        setStep(1);
      }}
    />
  );
}
