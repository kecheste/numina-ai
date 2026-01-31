"use client";

import { DOBScreen } from "@/components/auth/dob-screen";
import { useRouter } from "next/navigation";

export default function DOBPage() {
  const router = useRouter();

  return (
    <DOBScreen
      onContinue={() => router.push("/about")}
      onBack={() => router.push("/welcome")}
    />
  );
}
