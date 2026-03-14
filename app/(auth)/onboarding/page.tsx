"use client";

import { OnboardingInfoScreen } from "@/components/auth/onboarding-info-screen";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const userName = user?.name?.trim() || "there";

  return (
    <OnboardingInfoScreen
      userName={userName}
      onStartTest={() => router.push("/onboarding/flow")}
    />
  );
}
