"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  const isOnboardingRoute =
    pathname === "/about" ||
    pathname === "/onboarding" ||
    pathname?.startsWith("/onboarding/");

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated && !isOnboardingRoute) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, isOnboardingRoute, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && !isOnboardingRoute) {
    return null;
  }

  return <div className="min-h-[100dvh] overflow-y-auto">{children}</div>;
}
