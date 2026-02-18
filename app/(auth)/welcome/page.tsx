"use client";

import { WelcomeScreen } from "@/components/auth/welcome-screen";
import { useRouter } from "next/navigation";

export default function DOBPage() {
  const router = useRouter();

  return (
    <WelcomeScreen
      onStartJourney={() => router.push("/dob")}
      onLogin={() => router.push("/login")}
    />
  );
}
