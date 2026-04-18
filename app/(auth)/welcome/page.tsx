"use client";

import { OnboardingInfoScreen } from "@/components/auth/onboarding-info-screen";
import { setDobFlowIntent } from "@/lib/birth-data";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function WelcomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const userName = user?.name?.trim() || "there";

  return (
    <OnboardingInfoScreen
      userName={userName}
      onStartTest={() => {
        setDobFlowIntent();
        router.push("/dob");
      }}
    />
  );
}
