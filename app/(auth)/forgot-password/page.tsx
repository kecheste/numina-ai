"use client";

import { ForgotPasswordScreen } from "@/components/auth/forgot-password-screen";
import { apiForgotPassword } from "@/lib/api-client";
import { useRequestTracker } from "@/hooks/use-request-tracker";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const forgotTracker = useRequestTracker(
    async (vars: { email: string }) => {
      const res = await apiForgotPassword(vars.email);
      setSuccessMessage(res.message);
    },
  );

  const handleSubmit = async (email: string) => {
    forgotTracker.reset();
    try {
      await forgotTracker.execute({ email });
    } catch {
      // Error shown via forgotTracker.errorMessage
    }
  };

  return (
    <ForgotPasswordScreen
      error={forgotTracker.errorMessage}
      isPending={forgotTracker.isPending}
      successMessage={successMessage}
      onSubmit={handleSubmit}
      onBackToLogin={() => router.push("/login")}
    />
  );
}
