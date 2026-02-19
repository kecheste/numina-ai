"use client";

import { LoginScreen } from "@/components/auth/login-screen";
import { useAuth } from "@/contexts/auth-context";
import { useRequestTracker } from "@/hooks/use-request-tracker";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const loginTracker = useRequestTracker(
    async (vars: { email: string; password: string }) => {
      await login(vars.email, vars.password);
    },
  );

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace("/home");
      return;
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLoginSuccess = async (email: string, password: string) => {
    loginTracker.reset();
    try {
      await loginTracker.execute({ email, password });
      router.replace("/home");
    } catch {}
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-10 w-10 rounded-full border-2 border-[#F2D08C] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <LoginScreen
      error={loginTracker.errorMessage}
      isPending={loginTracker.isPending}
      onLoginSuccess={handleLoginSuccess}
      onSwitchToRegister={() => router.push("/dob")}
    />
  );
}
