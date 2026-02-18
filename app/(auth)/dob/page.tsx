"use client";

import { DOBScreen } from "@/components/auth/dob-screen";
import { saveBirthDataToSession } from "@/lib/birth-data";
import { useRouter } from "next/navigation";

export default function DOBPage() {
  const router = useRouter();

  return (
    <DOBScreen
      onContinue={(data) => {
        saveBirthDataToSession(data);
        router.push("/about");
      }}
      onBack={() => router.push("/welcome")}
    />
  );
}
