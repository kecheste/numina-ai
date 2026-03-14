import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  apiFetchOnboardingAstrologyBlueprint,
  apiFetchOnboardingNumerologyBlueprint,
  apiFinishOnboarding,
  type AstrologyBlueprintResponse,
  type NumerologyBlueprintItem,
  type TestResultResponse,
  apiGetTestResult,
  apiListTestResults,
} from "@/lib/api-client";
import { useAuth } from "@/contexts/auth-context";

export type OnboardingStep =
  | "chakra_test"
  | "chakra_blueprint"
  | "mbti_intro"
  | "mbti_test"
  | "mbti_blueprint"
  | "astrology_blueprint"
  | "numerology_blueprint"
  | "done";

export function useOnboarding() {
  const router = useRouter();
  const { refreshUser, user } = useAuth();
  const shellRef = useRef<HTMLDivElement>(null);

  const isOnboardingComplete = Boolean(user?.onboarding_complete);

  const [step, setStep] = useState<OnboardingStep>("chakra_test");
  const [chakraResultId, setChakraResultId] = useState<number | null>(null);
  const [chakraResult, setChakraResult] = useState<TestResultResponse | null>(null);
  const [mbtiResultId, setMbtiResultId] = useState<number | null>(null);
  const [mbtiResult, setMbtiResult] = useState<TestResultResponse | null>(null);
  const [astrologyContent, setAstrologyContent] = useState<
    AstrologyBlueprintResponse | null | undefined
  >(undefined);
  const [numerologyContent, setNumerologyContent] = useState<
    NumerologyBlueprintItem[] | null | undefined
  >(undefined);

  useEffect(() => {
    let cancelled = false;
    async function resume() {
      try {
        const chakraResults = await apiListTestResults(13);
        if (cancelled || chakraResults.length === 0) return;

        const existingChakra = chakraResults[0];
        setChakraResultId(existingChakra.id);
        setChakraResult(existingChakra.status === "completed" ? existingChakra : null);

        const mbtiResults = await apiListTestResults(7);
        if (cancelled) return;

        if (mbtiResults.length > 0) {
          const existingMbti = mbtiResults[0];
          setMbtiResultId(existingMbti.id);
          setMbtiResult(existingMbti.status === "completed" ? existingMbti : null);
          setStep("mbti_blueprint");
        } else {
          setStep("chakra_blueprint");
        }
      } catch {
      }
    }
    resume();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (step !== "chakra_blueprint" || chakraResultId == null || chakraResult != null) return;
    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        const res = await apiGetTestResult(chakraResultId);
        if (res.status === "completed" && !cancelled) {
          setChakraResult(res);
          clearInterval(interval);
        }
      } catch {}
    }, 2500);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [step, chakraResultId, chakraResult]);

  useEffect(() => {
    if (step !== "mbti_blueprint" || mbtiResultId == null || mbtiResult != null) return;
    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        const res = await apiGetTestResult(mbtiResultId);
        if (res.status === "completed" && !cancelled) {
          setMbtiResult(res);
          clearInterval(interval);
        }
      } catch {}
    }, 2500);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [step, mbtiResultId, mbtiResult]);

  useEffect(() => {
    if (step !== "astrology_blueprint") return;
    let cancelled = false;
    setAstrologyContent(null);
    const poll = async () => {
      try {
        const res = await apiFetchOnboardingAstrologyBlueprint();
        if (res.status === "completed" && !cancelled) {
          setAstrologyContent(res);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Astrology blueprint failed", err);
        setAstrologyContent({
          status: "completed",
          sun_description: "Your sun sign shapes your core personality and life direction.",
          moon_description: "Your moon sign reveals how you process emotions and seek comfort.",
          rising_description: "Your rising sign reflects how others see you and your outward style.",
          cosmic_traits_summary: "🜂 Element: —\n☌ Modality: —\n♇ Ruling Planet: —\n🌠 Most active house: —",
        });
        clearInterval(interval);
      }
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [step]);

  useEffect(() => {
    if (step !== "numerology_blueprint") return;
    let cancelled = false;
    setNumerologyContent(null);
    const poll = async () => {
      try {
        const res = await apiFetchOnboardingNumerologyBlueprint();
        if (res.status === "completed" && !cancelled) {
          setNumerologyContent(res.items);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Numerology blueprint failed", err);
        setNumerologyContent([
          { number: "1", title: "Life Path", description: "Your life path number reflects your core purpose." },
          { number: "1", title: "Soul Urge", description: "Your soul urge reveals what your heart truly desires." },
        ]);
        clearInterval(interval);
      }
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [step]);

  const handleChakraComplete = (resultId: number) => {
    setChakraResultId(resultId);
    setStep("chakra_blueprint");
  };
  const handleChakraBlueprintNext = () => setStep("mbti_intro");
  const handleMbtiIntroNext = () => setStep("mbti_test");
  const handleMbtiComplete = (resultId: number) => {
    setMbtiResultId(resultId);
    setStep("mbti_blueprint");
  };
  const handleMbtiBlueprintNext = () => setStep("astrology_blueprint");
  const handleAstrologyNext = () => {
    setNumerologyContent(null);
    setStep("numerology_blueprint");
  };
  const handleNumerologyNext = async () => {
    try {
      await apiFinishOnboarding();
    } catch (err) {
      console.error("Failed to finish onboarding", err);
    }
    await refreshUser();
    router.replace("/home");
  };

  return {
    step,
    shellRef,
    chakraResult,
    mbtiResult,
    astrologyContent,
    numerologyContent,
    isOnboardingComplete,
    handleChakraComplete,
    handleChakraBlueprintNext,
    handleMbtiIntroNext,
    handleMbtiComplete,
    handleMbtiBlueprintNext,
    handleAstrologyNext,
    handleNumerologyNext,
  };
}
