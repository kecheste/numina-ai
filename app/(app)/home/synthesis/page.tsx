"use client";

import PageLoader from "@/components/custom/loader";
import { SynthesisPage } from "@/components/pages/synthesis-page";

export default function SynthesisScreen() {
  return (
    <PageLoader>
      <SynthesisPage isPremium={false} />
    </PageLoader>
  );
}
