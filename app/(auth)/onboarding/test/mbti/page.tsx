"use client";

import { TestFlow } from "@/components/test/test-flow";
import { useRouter } from "next/navigation";

export default function OnboardingMbtiTestPage() {
  const router = useRouter();

  return (
    <TestFlow
      testId={7}
      testTitle="MBTI Type"
      category="Psychological"
      onClose={() => router.replace("/onboarding/test/chakra")}
      onboardingNext={() => router.replace("/home")}
    />
  );
}
