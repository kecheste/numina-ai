"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function HomeIndexPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const subscription = searchParams.get("subscription");
    if (subscription === "success") {
      refreshUser().finally(() => {
        router.replace("/home/soul");
      });
      return;
    }
    if (subscription === "canceled") {
      router.replace("/home/soul");
      return;
    }
    router.replace("/home/soul");
  }, [router, searchParams, refreshUser]);

  return null;
}
