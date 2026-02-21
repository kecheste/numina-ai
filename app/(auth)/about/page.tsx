"use client";

import AboutYourself from "@/components/auth/about-yourself";
import { useAuth } from "@/contexts/auth-context";
import {
  getBirthDataFromSession,
  clearBirthDataFromSession,
  hasBirthDataInSession,
} from "@/lib/birth-data";
import { useRequestTracker } from "@/hooks/use-request-tracker";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const router = useRouter();
  const { register: doRegister, isAuthenticated, isLoading } = useAuth();
  const [isRegistration, setIsRegistration] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const registerTracker = useRequestTracker(
    async (payload: {
      email: string;
      password: string;
      name: string;
      birth_year: number;
      birth_month: number;
      birth_day: number;
      birth_time?: string;
      birth_place?: string;
    }) => {
      await doRegister(payload);
    }
  );

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
        setValidationError("Email and password are required.");
        return;
      }
      if ((data.password?.length ?? 0) < 8) {
        setValidationError("Password must be at least 8 characters.");
        return;
      }
      setValidationError(null);
      registerTracker.reset();
      try {
        await registerTracker.execute({
          email: data.email!,
          password: data.password!,
          name: data.name.trim(),
          birth_year: parseInt(birthData.birthYear, 10),
          birth_month: parseInt(birthData.birthMonth, 10),
          birth_day: parseInt(birthData.birthDay, 10),
          birth_time: birthData.birthTime || undefined,
          birth_place: birthData.birthPlace || undefined,
          // Always send so backend persists; use null when missing (JSON keeps keys)
          birth_place_lat: birthData.birthPlaceLat ?? null,
          birth_place_lng: birthData.birthPlaceLng ?? null,
          birth_place_timezone: birthData.birthPlaceTimezone ?? null,
        });
        clearBirthDataFromSession();
        router.replace("/home");
      } catch {
        // error is on registerTracker
      }
      return;
    }

    clearBirthDataFromSession();
    router.push("/onboarding");
  };

  const error = validationError ?? registerTracker.errorMessage;

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
      isPending={registerTracker.isPending}
    />
  );
}
