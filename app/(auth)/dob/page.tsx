"use client";

import { DOBScreen } from "@/components/auth/dob-screen";
import {
  saveBirthDataToSession,
  clearDobFlowIntent,
} from "@/lib/birth-data";
import { useRouter } from "next/navigation";

export default function DOBPage() {
  const router = useRouter();

  return (
    <DOBScreen
      onContinue={(data) => {
        saveBirthDataToSession(data);
        clearDobFlowIntent();
        router.push("/about");
      }}
      onBack={() => router.push("/welcome")}
    />
  );
}
