"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { CognitiveStyleResult } from "@/components/test/result-view";

export default function OnboardingCognitiveStylePage() {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col"
      >
        <CognitiveStyleResult
          onClose={() => router.replace("/onboarding/test/mbti")}
        />
      </div>
    </div>
  );
}
