"use client";

import { useState } from "react";
import { ExplorePage as ExploreScreen } from "@/components/pages/explore-page";
import PageLoader from "@/components/custom/loader";

export default function ExplorePage() {
  return (
    <PageLoader>
      <div className="px-[28px]">
        <ExploreScreen isPremium={false} />
      </div>
    </PageLoader>
  );
}
