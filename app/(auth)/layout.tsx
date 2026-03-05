"use client";

import { useAuth } from "@/contexts/auth-context";
import { hasBirthDataInSession, hasDobFlowIntent } from "@/lib/birth-data";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  const isOnboardingRoute =
    pathname === "/onboarding" || pathname?.startsWith("/onboarding/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      if (pathname === "/dob" || pathname === "/about") {
        router.replace("/home");
        return;
      }
      if (!isOnboardingRoute) {
        router.replace("/home");
      }
      return;
    }

    if (pathname === "/onboarding" || pathname?.startsWith("/onboarding/")) {
      router.replace("/welcome");
      return;
    }
    if (pathname === "/dob") {
      if (!hasDobFlowIntent()) {
        router.replace("/welcome");
      }
      return;
    }
    if (pathname === "/about") {
      if (!hasBirthDataInSession()) {
        router.replace("/welcome");
      }
    }
  }, [isLoading, isAuthenticated, pathname, isOnboardingRoute, router]);

  const isProtectedUnauthRoute =
    pathname === "/dob" ||
    pathname === "/about" ||
    pathname === "/onboarding" ||
    pathname?.startsWith("/onboarding/");

  if (isLoading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && !mounted && isProtectedUnauthRoute) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (
    isAuthenticated &&
    pathname !== "/onboarding" &&
    !pathname?.startsWith("/onboarding/")
  ) {
    return null;
  }

  if (!isAuthenticated && mounted) {
    if (pathname === "/onboarding" || pathname?.startsWith("/onboarding/"))
      return null;
    if (pathname === "/dob" && !hasDobFlowIntent()) return null;
    if (pathname === "/about" && !hasBirthDataInSession()) return null;
  }

  return <div className="min-h-[100dvh] overflow-y-auto">{children}</div>;
}
