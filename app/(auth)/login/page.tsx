"use client";

import { LoginScreen } from "@/components/auth/login-screen";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace("/home");
      return;
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLoginSuccess = async (email: string, password: string) => {
    setError(null);
    try {
      await login(email, password);
      router.replace("/home");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    }
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
      error={error}
      onLoginSuccess={handleLoginSuccess}
      onSwitchToRegister={() => router.push("/dob")}
    />
  );
}
