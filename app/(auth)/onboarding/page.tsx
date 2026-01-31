"use client";

import { OnboardingInfoScreen } from "@/components/auth/onboarding-info-screen";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <OnboardingInfoScreen
      userName={"Nikoloz"}
      onStartTest={() => router.push("/test")}
    />
  );
}
