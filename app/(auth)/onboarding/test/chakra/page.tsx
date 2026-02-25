"use client";

import { TestFlow } from "@/components/test/test-flow";
import { useRouter } from "next/navigation";

export default function OnboardingChakraTestPage() {
  const router = useRouter();

  return (
    <TestFlow
      testId={13}
      testTitle="Chakra Alignment Scan"
      category="Energy"
      onClose={() => router.replace("/onboarding")}
      onboardingNext={() => router.replace("/onboarding/test/mbti")}
    />
  );
}
