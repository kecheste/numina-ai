"use client";

import { ResetPasswordScreen } from "@/components/auth/reset-password-screen";
import { apiResetPassword } from "@/lib/api-client";
import { useRequestTracker } from "@/hooks/use-request-tracker";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const resetTracker = useRequestTracker(
    async (vars: { newPassword: string }) => {
      if (!token) throw new Error("Missing reset token");
      const res = await apiResetPassword(token, vars.newPassword);
      setSuccessMessage(res.message);
    },
  );

  useEffect(() => {
    if (!token) {
      setTokenError("Invalid or missing reset link. Please request a new one.");
    }
  }, [token]);

  const handleSubmit = async (newPassword: string) => {
    if (!token) return;
    resetTracker.reset();
    setTokenError(null);
    try {
      await resetTracker.execute({ newPassword });
    } catch {
      // Error shown via resetTracker.errorMessage
    }
  };

  const error = tokenError ?? resetTracker.errorMessage;

  return (
    <ResetPasswordScreen
      error={error}
      isPending={resetTracker.isPending}
      successMessage={successMessage}
      hasValidToken={!!token}
      onSubmit={handleSubmit}
      onBackToLogin={() => router.push("/login")}
      onRequestNewLink={() => router.push("/forgot-password")}
    />
  );
}
