"use client";

import AboutYourself from "@/components/auth/about-yourself";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return <AboutYourself onContinue={() => router.push("/onboarding")} />;
}
