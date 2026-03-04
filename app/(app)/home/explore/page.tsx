"use client";

import { useState } from "react";
import { ExplorePage as ExploreScreen } from "@/components/pages/explore-page";
import PageLoader from "@/components/custom/loader";
import { useAuth } from "@/contexts/auth-context";

export default function ExplorePage() {
  const { user } = useAuth();
  const isPremium = user?.is_premium ?? false;

  return (
    <PageLoader>
      <div className="px-[28px]">
        <ExploreScreen isPremium={isPremium} />
      </div>
    </PageLoader>
  );
}
