"use client";

import { useEffect, useRef, useState } from "react";
import { TestFlow } from "@/components/test/test-flow";
import { AstrologyBlueprintResult } from "@/components/test/result-view/astrology-blueprint-result";
import { NumerologyBlueprintResult } from "@/components/test/result-view/numerology-blueprint-result";
import { useAuth } from "@/contexts/auth-context";
import {
  apiFetchOnboardingAstrologyBlueprint,
  apiFetchOnboardingNumerologyBlueprint,
  apiFinishOnboarding,
  type AstrologyBlueprintResponse,
  type NumerologyBlueprintItem,
} from "@/lib/api-client";
import { useRouter } from "next/navigation";

type OnboardingStep = 0 | 1 | 2;

export default function OnboardingMbtiTestPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const shellRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<OnboardingStep>(0);
  const [astrologyContent, setAstrologyContent] = useState<
    AstrologyBlueprintResponse | null | undefined
  >(undefined);
  const [numerologyContent, setNumerologyContent] = useState<
    NumerologyBlueprintItem[] | null | undefined
  >(undefined);

  useEffect(() => {
    if (step !== 1) return;
    setAstrologyContent(null);

    let interval: NodeJS.Timeout;

    const poll = async () => {
      try {
        const res = await apiFetchOnboardingAstrologyBlueprint();
        if (res.status === "completed") {
          setAstrologyContent(res);
          clearInterval(interval);
        } else {
          setAstrologyContent(null);
        }
      } catch (err) {
        console.error("Astrology blueprint failed", err);
        setAstrologyContent({
          status: "completed",
          sun_description:
            "Your sun sign shapes your core personality and life direction.",
          moon_description:
            "Your moon sign reveals how you process emotions and seek comfort.",
          rising_description:
            "Your rising sign reflects how others see you and your outward style.",
          cosmic_traits_summary:
            "🜂 Element: —\n☌ Modality: —\n♇ Ruling Planet: —\n🌠 Most active house: —",
        });
        clearInterval(interval);
      }
    };

    poll();
    interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step !== 2) return;
    setNumerologyContent(null);

    let interval: NodeJS.Timeout;

    const poll = async () => {
      try {
        const res = await apiFetchOnboardingNumerologyBlueprint();
        if (res.status === "completed") {
          setNumerologyContent(res.items);
          clearInterval(interval);
        } else {
          setNumerologyContent(null);
        }
      } catch (err) {
        console.error("Numerology blueprint failed", err);
        setNumerologyContent([
          {
            number: "1",
            title: "Life Path",
            description: "Your life path number reflects your core purpose.",
          },
          {
            number: "1",
            title: "Soul Urge",
            description: "Your soul urge reveals what your heart truly desires.",
          },
        ]);
        clearInterval(interval);
      }
    };

    poll();
    interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [step]);

  const handleFinishOnboarding = async () => {
    try {
      await apiFinishOnboarding();
    } catch (err) {
      console.error("Failed to finish onboarding", err);
    }
    await refreshUser();
    router.replace("/home");
  };

  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50">
        <AstrologyBlueprintResult
          onClose={() => {
            setNumerologyContent(null);
            setStep(2);
          }}
          shellRef={shellRef}
          content={astrologyContent}
        />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="fixed inset-0 z-50">
        <NumerologyBlueprintResult
          onClose={handleFinishOnboarding}
          shellRef={shellRef}
          content={numerologyContent}
        />
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
