"use client";

import PageLoader from "@/components/custom/loader";
import { SoulRevealScreen } from "@/components/pages/my-soul-page";

export default function SoulPage() {
  return (
    <PageLoader>
      <div className="px-[28px]">
        <SoulRevealScreen />
      </div>
    </PageLoader>
  );
}
