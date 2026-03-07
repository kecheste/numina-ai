"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { apiListTestResults } from "@/lib/api-client";

const ONBOARDING_TEST_IDS = [13, 7, 19] as const;

export default function HomeIndexPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const navigateAfterChecks = async () => {
      try {
        await refreshUser();
      } catch {}

      if (cancelled) return;

      const subscription = searchParams.get("subscription");

      if (subscription === "success") {
        try {
          await refreshUser();
        } catch {}
      }

      if (cancelled) return;

      try {
        const results = await apiListTestResults();
        if (cancelled) return;

        const takenOnboardingIds = new Set<number>();
        for (const r of results) {
          if (
            (r.status === "completed" || r.status === "pending_ai") &&
            ONBOARDING_TEST_IDS.includes(
              r.test_id as (typeof ONBOARDING_TEST_IDS)[number],
            )
          ) {
            takenOnboardingIds.add(r.test_id);
          }
        }

        const hasCompletedOnboarding = ONBOARDING_TEST_IDS.every((id) =>
          takenOnboardingIds.has(id),
        );

        if (!hasCompletedOnboarding) {
          router.replace("/onboarding");
        } else {
          router.replace("/home/soul");
        }
      } catch {
        if (!cancelled) {
          router.replace("/home/soul");
        }
      }
    };

    void navigateAfterChecks();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, refreshUser]);

  return null;
}
