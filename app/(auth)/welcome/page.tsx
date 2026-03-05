"use client";

import { WelcomeScreen } from "@/components/auth/welcome-screen";
import { setDobFlowIntent } from "@/lib/birth-data";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <WelcomeScreen
      onStartJourney={() => {
        setDobFlowIntent();
        router.push("/dob");
      }}
      onLogin={() => router.push("/login")}
    />
  );
}
