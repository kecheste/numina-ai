"use client";

import { TestFlow } from "@/components/test/test-flow";
import { apiEnsureOnboardingLifePath } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export default function OnboardingMbtiTestPage() {
  const router = useRouter();

  const handleOnboardingNext = () => {
    apiEnsureOnboardingLifePath().catch(() => {});
    router.replace("/home");
  };

  return (
    <TestFlow
      testId={7}
      testTitle="MBTI Type"
      category="Psychological"
      onClose={() => router.replace("/onboarding/test/chakra")}
      onboardingNext={handleOnboardingNext}
    />
  );
}
