"use client";

import AboutYourself from "@/components/auth/about-yourself";
import { useAuth } from "@/contexts/auth-context";
import {
  getBirthDataFromSession,
  clearBirthDataFromSession,
  hasBirthDataInSession,
} from "@/lib/birth-data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const router = useRouter();
  const { register: doRegister, isAuthenticated, isLoading } = useAuth();
  const [isRegistration, setIsRegistration] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsRegistration(hasBirthDataInSession());
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      clearBirthDataFromSession();
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleContinue = async (data: {
    name: string;
    email?: string;
    password?: string;
  }) => {
    const birthData = getBirthDataFromSession();

    if (isRegistration && birthData) {
      if (!data.email?.trim() || !data.password) {
        setError("Email and password are required.");
        return;
      }
      if ((data.password?.length ?? 0) < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      setError(null);
      try {
        await doRegister({
          email: data.email!,
          password: data.password!,
          name: data.name.trim(),
          birth_year: parseInt(birthData.birthYear, 10),
          birth_month: parseInt(birthData.birthMonth, 10),
          birth_day: parseInt(birthData.birthDay, 10),
          birth_time: birthData.birthTime || undefined,
          birth_place: birthData.birthPlace || undefined,
        });
        clearBirthDataFromSession();
        router.replace("/home");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Registration failed");
      }
      return;
    }

    clearBirthDataFromSession();
    router.push("/onboarding");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <AboutYourself
      onContinue={handleContinue}
      registrationMode={isRegistration}
      error={error}
    />
  );
}
