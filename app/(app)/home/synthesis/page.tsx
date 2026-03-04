"use client";

import PageLoader from "@/components/custom/loader";
import { SynthesisPage } from "@/components/pages/synthesis-page";
import { useAuth } from "@/contexts/auth-context";

export default function SynthesisScreen() {
  const { user } = useAuth();
  const isPremium = user?.is_premium ?? false;

  return (
    <PageLoader>
      <SynthesisPage isPremium={isPremium} />
    </PageLoader>
  );
}
