"use client";

import { OnboardingInfoScreen } from "@/components/auth/onboarding-info-screen";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const userName = user?.name?.trim() || "there";

  useEffect(() => {
    router.replace("/onboarding/flow");
  }, [router]);

  return null;
}
