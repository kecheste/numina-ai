"use client";

import { LoginScreen } from "@/components/auth/login-screen";
import { useAuth } from "@/contexts/auth-context";
import { setDobFlowIntent } from "@/lib/birth-data";
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
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full text-white bg-black/20 z-50 backdrop-blur-sm">
        <div className="relative">
          <div className="relative w-12 h-12 rounded-full border border-[#F2D08C]/40 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#F2D08C] animate-[scalePulse_1.4s_ease-in-out_infinite]" />
          </div>
        </div>

        <span
          className="mt-6 text-xs tracking-[0.3em] text-[#F2D08C]/70 uppercase"
          style={{ fontFamily: "var(--font-gotham)" }}
        >
          Loading
        </span>

        <style jsx>{`
          @keyframes scalePulse {
            0% {
              transform: scale(0.6);
              opacity: 0.6;
            }
            50% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0.6);
              opacity: 0.6;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <LoginScreen
      error={loginTracker.errorMessage}
      isPending={loginTracker.isPending}
      onLoginSuccess={handleLoginSuccess}
      onSwitchToRegister={() => {
        setDobFlowIntent();
        router.push("/dob");
      }}
      onForgotPassword={() => router.push("/forgot-password")}
    />
  );
}
